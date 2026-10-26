import asyncio
import json
import sys
import urllib.request
import httpx
from opensandbox import Sandbox
from opensandbox.config import ConnectionConfig

config = json.load(sys.stdin)
assert config['base'].startswith('http://127.0.0.1:')
calls = []
info = {'id': 'local-fixture', 'status': {'state': 'Running'}, 'entrypoint': ['fixture-worker'],
    'createdAt': '2026-10-26T00:00:00Z', 'image': {'uri': 'fixture-only:no-image-pulled'}}

async def transport(request):
    assert request.url.host == '127.0.0.1'
    path = request.url.path.removeprefix('/v1')
    calls.append(request.method + ' ' + path)
    if request.method == 'POST' and path == '/sandboxes':
        return httpx.Response(202, json=info)
    if '/endpoints/' in path:
        return httpx.Response(200, json={'endpoint': '127.0.0.1:1', 'headers': {}})
    if request.method == 'GET' and path == '/sandboxes/local-fixture':
        return httpx.Response(200, json=info)
    if request.method == 'DELETE' and path == '/sandboxes/local-fixture':
        return httpx.Response(204)
    if path == '/command':
        payload = json.loads(request.content)
        action = json.loads(payload['command'])
        req = urllib.request.Request(config['base'] + '/action', data=json.dumps(action).encode(),
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config['fixtureToken']})
        with urllib.request.urlopen(req, timeout=20) as result:
            accepted = json.load(result)
        events = [{'type': 'init', 'text': 'fixture-exec', 'timestamp': 1},
            {'type': 'stdout', 'text': json.dumps({'ok': accepted['ok'], 'remaining': accepted.get('receipt', {}).get('remaining')}), 'timestamp': 2},
            {'type': 'execution_complete', 'timestamp': 3, 'execution_time_in_millis': 1}]
        return httpx.Response(200, headers={'Content-Type': 'text/event-stream'}, content=''.join('data: ' + json.dumps(e) + '\n\n' for e in events))
    raise AssertionError('Unexpected SDK fixture route: ' + path)

async def main():
    connection = ConnectionConfig(domain='127.0.0.1:1', protocol='http', api_key='synthetic-fixture-only',
        disable_metrics=True, transport=httpx.MockTransport(transport))
    sandbox = await Sandbox.create('fixture-only:no-image-pulled', connection_config=connection, skip_health_check=True)
    try:
        details = await sandbox.get_info()
        first = await sandbox.commands.run(json.dumps(config['action']))
        replay = await sandbox.commands.run(json.dumps(config['action']))
        a = json.loads(first.logs.stdout[0].text)
        b = json.loads(replay.logs.stdout[0].text)
        assert a['ok'] and not b['ok']
        await sandbox.kill()
        print(json.dumps({'officialSdkLifecycle': details.id == 'local-fixture', 'sdkCommandSseDecoded': first.id == 'fixture-exec',
            'acceptedOnce': a['ok'] and not b['ok'], 'fixtureLifecycleClosed': 'DELETE /sandboxes/local-fixture' in calls}))
    finally:
        await sandbox.close()

asyncio.run(main())
