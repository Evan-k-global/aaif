import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'node:net';

export const cache = resolve('.cache/ecosystem');
export const python = resolve(process.env.AAIF_DEMO_PYTHON ?? '.cache/ecosystem/python/bin/python');
export async function freePort() {
  const server = createServer();
  await new Promise((ok, no) => server.once('error', no).listen(0, '127.0.0.1', ok));
  const port = server.address().port;
  await new Promise(ok => server.close(ok));
  return port;
}
export function cleanEnv(extra = {}) {
  return {
    PATH: `${resolve('.cache/ecosystem/bin')}:${process.env.PATH ?? '/usr/bin:/bin'}`,
    LANG: 'en_US.UTF-8', TMPDIR: process.env.TMPDIR ?? '/tmp',
    XDG_CONFIG_HOME: `${cache}/config`, XDG_STATE_HOME: `${cache}/state`, XDG_DATA_HOME: `${cache}/data`,
    NODE_EXTRA_CA_CERTS: resolve('.cache/tls/cert.pem'),
    GRADIO_ANALYTICS_ENABLED: 'false', HF_HUB_OFFLINE: '1', DO_NOT_TRACK: '1',
    OPENSANDBOX_DISABLE_METRICS: '1', OTEL_SDK_DISABLED: 'true',
    ...extra
  };
}
export async function startProcess(command, args = [], { env = {}, input, timeout = 60000 } = {}) {
  await mkdir(cache, { recursive: true });
  // Native binaries have no access to real provider credentials. On macOS,
  // additionally enforce loopback-only network access at the OS boundary.
  let executable = command, parameters = args;
  if (process.platform === 'darwin') {
    const policy = '(version 1)(allow default)(deny network*)(allow network-inbound (local ip "localhost:*"))(allow network-outbound (remote ip "localhost:*"))(allow network-bind)(allow network-outbound (remote unix-socket))(allow network-inbound (local unix-socket))';
    executable = '/usr/bin/sandbox-exec'; parameters = ['-p', policy, command, ...args];
  }
  const child = spawn(executable, parameters, { env: cleanEnv(env), stdio: ['pipe', 'pipe', 'pipe'] });
  let output = '';
  for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => { output = (output + chunk).slice(-200000); });
  child.stdin.on('error', () => {});
  child.stdin.end(input);
  let settled = false;
  const done = new Promise((resolveResult, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => { settled = true; clearTimeout(timer); resolveResult({ code, signal, output }); });
  });
  const timer = setTimeout(() => { child.kill('SIGTERM'); setTimeout(() => { if (!settled) child.kill('SIGKILL'); }, 1500).unref(); }, timeout);
  return {
    child, done, output: () => output,
    async close() { if (!settled) { child.kill('SIGTERM'); const kill = setTimeout(() => child.kill('SIGKILL'), 2000); await done; clearTimeout(kill); } }
  };
}
export async function runProcess(command, args, options) {
  const process = await startProcess(command, args, options);
  const result = await process.done;
  if (result.code !== 0) throw new Error(`Local subprocess failed (${result.code ?? result.signal}): ${result.output.slice(-5000)}`);
  return result.output;
}
export async function waitFor(check, process, timeout = 30000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await check().catch(() => false)) return;
    if (process?.child.exitCode !== null) throw new Error(process.output().slice(-5000));
    await new Promise(ok => setTimeout(ok, 100));
  }
  throw new Error(`Local service readiness timed out: ${process?.output().slice(-5000) ?? ''}`);
}
export async function writeConfig(name, text) {
  const path = resolve(cache, name); await mkdir(cache, { recursive: true }); await writeFile(path, text); return path;
}
