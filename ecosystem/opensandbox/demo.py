"""Actual upstream SDK/server/execd lifecycle on a local Docker daemon."""
import asyncio
from datetime import timedelta
import json
import os
from pathlib import Path
import socket
import shlex
import subprocess
import sys
import tempfile
import uuid

import docker
import httpx
from opensandbox import Sandbox
from opensandbox.config import ConnectionConfig
from opensandbox.models.sandboxes import NetworkPolicy

config = json.load(sys.stdin)
assert config['dockerHost'].startswith('unix:///'), 'Only local Unix-socket Docker is supported'
os.environ['DOCKER_HOST'] = config['dockerHost']
client = docker.from_env()


async def main():
    client.ping()
    for image in config['images'].values():
        # Fail before startup if setup did not prefetch these exact digests.
        client.images.get(image)
    run_id = 'aaif-opensandbox-' + uuid.uuid4().hex
    label = 'org.zeko.aaif.demo'
    canary = None
    sandbox = None
    killed = False
    server = None
    checks = {}
    with tempfile.TemporaryDirectory(prefix='opensandbox-', dir='.cache/ecosystem') as directory:
        directory = Path(directory).resolve()
        with socket.socket() as probe:
            probe.bind(('127.0.0.1', 0))
            port = probe.getsockname()[1]
        key = 'synthetic-local-' + uuid.uuid4().hex
        settings = directory / 'config.toml'
        settings.write_text(f'''[server]
host = "127.0.0.1"
port = {port}
api_key = "{key}"
max_sandbox_timeout_seconds = 180
[runtime]
type = "docker"
execd_image = "{config['images']['execd']}"
[proxy]
resolve_internal = false
[docker]
network_mode = "bridge"
publish_host = "127.0.0.1"
pids_limit = 256
no_new_privileges = true
[egress]
image = "{config['images']['egress']}"
mode = "dns+nft"
[log]
level = "WARNING"
[store]
type = "sqlite"
path = "{directory / 'state.db'}"
''')
        # HOME isolates upstream metadata/log defaults; the worker never sees it.
        env = {**os.environ, 'HOME': str(directory), 'OTEL_SDK_DISABLED': 'true'}
        log_path = directory / 'server.log'
        try:
            # A synthetic local service lets us test a real denied connection,
            # without probing any external service or address.
            canary = client.containers.run(config['images']['worker'],
                ['python', '-u', '-c', 'import socket; s=socket.socket(); s.bind(("0.0.0.0",44666)); s.listen(); print("ready",flush=True);\nwhile True:\n c,a=s.accept(); c.close()'],
                detach=True, name=run_id + '-canary', labels={label: run_id},
                network='bridge', mem_limit='64m', pids_limit=32, cap_drop=['ALL'],
                security_opt=['no-new-privileges'])
            for _ in range(100):
                if b'ready' in canary.logs():
                    break
                await asyncio.sleep(0.05)
            else:
                raise RuntimeError('Local canary did not start')
            canary.reload()
            canary_ip = canary.attrs['NetworkSettings']['Networks']['bridge']['IPAddress']
            alive = canary.exec_run(['python', '-c', 'import socket; s=socket.create_connection(("127.0.0.1",44666),1); s.close()'])
            checks['localCanaryIsListening'] = alive.exit_code == 0
            with log_path.open('w') as log:
                server = subprocess.Popen([sys.executable, '-c',
                    'from opensandbox_server.cli import main; main()', '--config', str(settings)],
                    env=env, stdout=log, stderr=log)
            base = f'http://127.0.0.1:{port}'
            async with httpx.AsyncClient(trust_env=False, timeout=2) as http:
                for _ in range(300):
                    if server.poll() is not None:
                        raise RuntimeError('Local OpenSandbox server exited: ' + log_path.read_text()[-4000:])
                    try:
                        if (await http.get(base + '/health')).status_code == 200:
                            break
                    except httpx.TransportError:
                        pass
                    await asyncio.sleep(0.1)
                else:
                    raise RuntimeError('Local OpenSandbox server did not become ready')
                denied = await http.get(base + '/v1/sandboxes')
                checks['lifecycleApiRequiresSyntheticKey'] = denied.status_code == 401
            connection = ConnectionConfig(domain=f'127.0.0.1:{port}', protocol='http', api_key=key,
                disable_metrics=True)
            sandbox = await Sandbox.create(config['images']['worker'], connection_config=connection,
                timeout=timedelta(seconds=120), ready_timeout=timedelta(seconds=60),
                entrypoint=['sleep', '120'], metadata={label: run_id},
                resource={'cpu': '500m', 'memory': '256Mi'},
                network_policy=NetworkPolicy(default_action='deny', egress=[]))
            details = await sandbox.get_info()
            containers = client.containers.list(filters={'label': f'opensandbox.io/id={sandbox.id}'})
            assert len(containers) == 1, 'Expected one isolated job container'
            worker = containers[0]
            worker.reload()
            attrs = worker.attrs
            host = attrs['HostConfig']
            sidecars = client.containers.list(filters={'label': f'opensandbox.io/egress-sidecar-for={sandbox.id}'})
            assert len(sidecars) == 1
            sidecar = sidecars[0]
            sidecar.reload()
            policy = await sandbox.get_egress_policy()
            bindings = sidecar.attrs['HostConfig']['PortBindings']
            checks.update({
                'officialSdkServerLifecycle': details.id == sandbox.id and attrs['State']['Running'],
                'workerImageDigestPinned': attrs['Image'] == client.images.get(config['images']['worker']).id,
                'denyByDefaultEgressPolicy': policy.default_action == 'deny' and not policy.egress
                    and host['NetworkMode'] == 'container:' + sidecar.id,
                'portsPublishedOnlyOnLoopback': bool(bindings) and all(
                    binding['HostIp'] == '127.0.0.1'
                    for ports in bindings.values() for binding in ports),
                'noHostBindsOrDockerSocket': not any(m['Type'] == 'bind' for m in attrs['Mounts']),
                'workerResourceLimits': host['Memory'] == 256 * 1024 * 1024 and host['NanoCpus'] == 500000000
                    and host['PidsLimit'] == 256,
                'noPrivilegeEscalation': host['Privileged'] is False
                    and any(opt in ('no-new-privileges', 'no-new-privileges=true') for opt in host['SecurityOpt']),
            })
            # Real command through upstream execd and its SDK SSE decoder.
            # No authority token, Docker socket or real credentials enter this code.
            program = '''import json,sys,pathlib,os,socket
job=json.loads(sys.argv[1])
values=job['values']
blocked=False
try:
 s=socket.create_connection((sys.argv[2],44666),0.5); s.close()
except OSError:
 blocked=True
assert blocked, 'Outbound connection reached the local canary'
assert not pathlib.Path('/var/run/docker.sock').exists()
assert not any(k in os.environ for k in ('OPENAI_API_KEY','AWS_ACCESS_KEY_ID','AAIF_FIXTURE_TOKEN'))
print(json.dumps({'jobId':job['jobId'],'sum':sum(values),'squares':sum(x*x for x in values),'canaryBlocked':blocked,'noWorkerCredentials':True}))
'''
            # execd 1.1.0 uses shell-text commands; quote every argument explicitly.
            execution = await sandbox.commands.run(shlex.join(['python', '-c', program, json.dumps(config['job']), canary_ip]))
            assert not execution.error, str(execution.error)
            result = json.loads(''.join(line.text for line in execution.logs.stdout))
            checks['realExecdCommandAndSseOutput'] = bool(execution.id) and result['jobId'] == config['job']['jobId']
            checks['workerOutboundToLocalCanaryBlocked'] = result.pop('canaryBlocked') is True
            checks['workerHasNoAuthorityOrProviderCredentials'] = result.pop('noWorkerCredentials') is True
            await sandbox.kill()
            killed = True
            checks['sdkKilledWorkerAndEgressSidecar'] = not client.containers.list(all=True,
                filters={'label': f'opensandbox.io/id={sandbox.id}'}) and not client.containers.list(all=True,
                filters={'label': f'opensandbox.io/egress-sidecar-for={sandbox.id}'})
        finally:
            if sandbox is not None:
                if not killed:
                    try:
                        await sandbox.kill()
                    except Exception:
                        pass  # Owned-container fallback below handles partial failures.
                await sandbox.close()
            if server is not None:
                server.terminate()
                try:
                    server.wait(timeout=8)
                except subprocess.TimeoutExpired:
                    server.kill()
                    server.wait(timeout=3)
            # Failure cleanup only touches containers with this unique run label.
            owned = client.containers.list(all=True, filters={'label': f'{label}={run_id}'})
            sandbox_ids = [c.labels['opensandbox.io/id'] for c in owned if 'opensandbox.io/id' in c.labels]
            for container in owned:
                container.remove(force=True, v=True)
            for sandbox_id in sandbox_ids:
                for container in client.containers.list(all=True,
                        filters={'label': f'opensandbox.io/egress-sidecar-for={sandbox_id}'}):
                    container.remove(force=True, v=True)
            checks['temporaryDemoContainersRemoved'] = not client.containers.list(all=True,
                filters={'label': f'{label}={run_id}'})
    assert all(checks.values()), checks
    print(json.dumps({'checks': checks, 'result': result, 'images': config['images']}))


try:
    asyncio.run(main())
finally:
    client.close()
