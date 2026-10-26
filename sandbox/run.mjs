import { mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execFileSync, spawn } from 'node:child_process';

mkdirSync('.cache/tls', { recursive: true });
const cert = resolve('.cache/tls/cert.pem'), key = resolve('.cache/tls/key.pem');
let usable = existsSync(cert) && existsSync(key);
if (usable) {
  try { execFileSync('openssl', ['x509', '-checkend', '300', '-noout', '-in', cert], { stdio: 'ignore' }); }
  catch { usable = false; }
}
if (!usable) {
  execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-sha256', '-nodes', '-days', '2',
    '-subj', '/CN=localhost', '-addext', 'subjectAltName=DNS:localhost,IP:127.0.0.1', '-keyout', key, '-out', cert], { stdio: 'ignore' });
}
const [mode = 'demo', ...args] = process.argv.slice(2);
const commands = {
  demo: ['sandbox/demo.mjs', ...args],
  ecosystem: ['ecosystem/run.mjs', ...args],
  tck: ['tck/run.mjs', ...args],
  test: ['--test', 'integrations/id-jag/client.test.mjs', 'tck/runner.test.mjs', 'sandbox/sandbox.test.mjs', 'ecosystem/_shared/network.test.mjs'],
  evidence: ['sandbox/evidence.mjs', ...args]
};
if (!commands[mode]) throw new Error('Unknown sandbox command');
const child = spawn(process.execPath, commands[mode], {
  stdio: 'inherit', env: { ...process.env, NODE_EXTRA_CA_CERTS: cert }
});
child.on('error', () => { console.error('Sandbox process failed to start'); process.exitCode = 1; });
child.on('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
