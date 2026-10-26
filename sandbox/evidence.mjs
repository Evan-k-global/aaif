import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { platform, arch } from 'node:os';
import { runSuite } from '../tck/run.mjs';
import * as identity from '../tck/adapters/id-jag-sandbox.mjs';
import * as state from '../tck/adapters/shared-state-sandbox.mjs';

async function sourceFiles(directory) {
  const all = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory() && entry.name !== 'results') all.push(...await sourceFiles(path));
    else if (entry.isFile() && /\.(mjs|json)$/.test(path)) all.push(path);
  }
  return all;
}
const files = ['package.json', 'package-lock.json', ...await sourceFiles('sandbox'), ...await sourceFiles('integrations'), ...await sourceFiles('tck')].sort();
const hash = createHash('sha256');
for (const file of files) hash.update(file + '\n').update(await readFile(file));
const sourceSha256 = hash.digest('hex');
const reports = [];
for (const [file, module] of [['id-jag-mcp-v0.1.json', identity], ['shared-state-v0.1.json', state]]) {
  const raw = await readFile(`tck/fixtures/${file}`, 'utf8');
  const suite = JSON.parse(raw);
  const adapter = { manifest: { ...module.manifest, revision: `source-sha256:${sourceSha256}` }, runCase: module.runCase };
  console.error(`Running ${suite.profile} (${suite.cases.length} cases).`);
  const report = await runSuite(suite, adapter, { timeoutMs: 120000, onCase: r => console.error(`${r.id}: ${r.status}`) });
  reports.push({ ...report, fixtureSha256: createHash('sha256').update(raw).digest('hex') });
}
const report = {
  generatedAt: new Date().toISOString(), sourceSha256, sourceFiles: files,
  environment: { node: process.version, platform: platform(), architecture: arch() },
  scope: {
    identityProvider: 'local HTTPS protocol sandbox with real RSA-signed JWTs',
    oauthImplementation: 'canonical AMBA 4b5bb5c6915c7ee17e716ab2320e50d985dfc0d5',
    mcp: 'official TypeScript SDK 1.26.0; distinct client registrations',
    proof: 'real o1js 2.13.0 reservation proof',
    stateAuthority: 'local serialized state, not the Zeko core sequencer',
    externalEffect: 'sandbox effect counter with unknown-outcome fault injection',
    ethereumSettlementTested: false, commercialIdpTested: false, coreRollupDeploymentTested: false
  },
  passed: reports.every(r => r.passed), reports
};
await mkdir('evidence', { recursive: true });
const path = `evidence/sandbox-run-${report.generatedAt.slice(0,10)}.json`;
await writeFile(path, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ file: path, passed: report.passed, sourceSha256, cases: reports.reduce((n,r) => n+r.results.length,0) }));
if (!report.passed) process.exitCode = 1;
