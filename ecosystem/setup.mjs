import { readFile, writeFile, mkdir, chmod, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

if (Number(process.versions.node.split('.')[0]) < 24) throw new Error('Use Node.js 24 for this suite');
if (process.platform !== 'darwin' || process.arch !== 'arm64') throw new Error('Full native reference suite currently supports macOS arm64 with sandbox-exec. SDK-only examples can be adapted separately.');
const root = resolve('.cache/ecosystem'); await mkdir(`${root}/bin`, { recursive: true });
const exists = async path => { try { await access(path); return true; } catch { return false; } };
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
async function artifact(url, expected, path) {
  if (await exists(path) && sha(await readFile(path)) === expected) return;
  const response = await fetch(url); if (!response.ok) throw new Error(`Dependency download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (sha(bytes) !== expected) throw new Error('Dependency SHA-256 mismatch');
  await mkdir(resolve(path, '..'), { recursive: true }); await writeFile(path, bytes);
}
let bootstrapPython = process.env.AAIF_SETUP_PYTHON;
if (!bootstrapPython) {
  for (const candidate of ['python3.12', 'python3']) {
    try { execFileSync(candidate, ['-c', 'import sys; assert sys.version_info >= (3,12)'], { stdio: 'ignore' }); bootstrapPython = candidate; break; } catch {}
  }
}
if (!bootstrapPython) throw new Error('Python 3.12+ required; set AAIF_SETUP_PYTHON to its executable');
function extract(archive, target, basename) {
  execFileSync(bootstrapPython, ['-c', 'import tarfile,sys,pathlib; t=tarfile.open(sys.argv[1]); m=next(x for x in t.getmembers() if x.isfile() and pathlib.PurePosixPath(x.name).name==sys.argv[3]); pathlib.Path(sys.argv[2]).write_bytes(t.extractfile(m).read())', archive, target, basename]);
}
const pins = JSON.parse(await readFile('ecosystem/binaries.json'));
for (const [name, pin] of Object.entries(pins)) {
  const asset = pin.assets.find(x => x.name.includes('darwin'));
  const target = `${root}/bin/${name}`;
  if (name === 'goose') {
    const archive = `${root}/bin/${asset.name}`;
    await artifact(asset.url, asset.sha256, archive); extract(archive, target, 'goose');
  } else await artifact(asset.url, asset.sha256, target);
  await chmod(target, 0o755); console.log(`${name} ${pin.version}: checksum-verified`);
}
const envoyArchive = `${root}/envoy.tar.xz`;
await artifact('https://archive.tetratelabs.io/envoy/download/v1.39.2/envoy-v1.39.2-darwin-arm64.tar.xz',
  '288366020af5c2f9e3ff30abc1079f99b3d424844b461f4c597cafc971a4bc1b', envoyArchive);
const envoy = `${root}/data/aigw/envoy-versions/1.39.2/bin/envoy`;
await mkdir(resolve(envoy, '..'), { recursive: true }); extract(envoyArchive, envoy, 'envoy'); await chmod(envoy, 0o755);
await artifact('https://raw.githubusercontent.com/openresponses/openresponses/main/public/openapi/2026-04-24/openapi.json',
  'd598753c3a86fd8a2434828fe39dcc8786a7a694bbe46080a0d24c9fa40e72df', `${root}/openresponses-openapi.json`);
const python = `${root}/python/bin/python`;
if (!await exists(python)) execFileSync(bootstrapPython, ['-m', 'venv', `${root}/python`], { stdio: 'inherit' });
execFileSync(python, ['-m', 'pip', '--isolated', 'install', '--disable-pip-version-check', '--only-binary=:all:', '--cache-dir', `${root}/pip`,
  '--index-url', 'https://pypi.org/simple', '-r', 'ecosystem/requirements.lock'], { stdio: 'inherit' });
if (process.argv.includes('--docker')) {
  // Explicit online preparation only. Runtime requires these images locally.
  const images = JSON.parse(await readFile('ecosystem/opensandbox/images.json'));
  const env = { ...process.env };
  if (env.AAIF_DOCKER_HOST) env.DOCKER_HOST = env.AAIF_DOCKER_HOST;
  for (const image of Object.values(images)) {
    if (!/^[a-z0-9/-]+@sha256:[a-f0-9]{64}$/.test(image)) throw new Error('Expected an immutable image digest');
    execFileSync('docker', ['pull', image], { stdio: 'inherit', env });
  }
}
console.log('Setup complete. OpenSandbox needs a running local Docker daemon and image preparation with --docker. No real provider, wallet or blockchain deployment.');
