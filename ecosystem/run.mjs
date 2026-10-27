import assert from 'node:assert/strict';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRuntime } from './_shared/runtime.mjs';
import { installOfflineGuard } from './_shared/network.mjs';

const projects = ['mcp', 'a2a', 'goose', 'agentgateway', 'agent-router', 'open-responses', 'opensandbox', 'openenv', 'agent-skills', 'agents-md'];
const args = process.argv.slice(2), pick = args.indexOf('--project');
const selected = pick < 0 ? projects : [args[pick + 1]];
assert(selected.every(x => projects.includes(x)), 'Unknown ecosystem project');
installOfflineGuard();
const backend = args.includes('--proofs') ? await (await import('../sandbox/proof.mjs')).proofBackend() : null;
const results = [];
for (const project of selected) {
  console.error(`Running local ${project} demo`);
  const runtime = await createRuntime({ backend });
  try {
    const module = await import(`./${project}/demo.mjs`);
    const result = await module.demo(runtime);
    assert(runtime.sandbox.state.accepted >= 1, 'Scenario did not reach accepted state');
    assert(Object.keys(result.checks).length > 0 && Object.values(result.checks).every(x => x === true), `${project}: check failed`);
    results.push({ project, passed: true, ...result, ...runtime.summary() });
    console.error(`${project}: passed (${result.level})`);
  } catch (error) {
    results.push({ project, passed: false, error: error.message, ...runtime.summary() });
    console.error(`${project}: FAILED: ${error.message}`);
  } finally { await runtime.close(); }
}
async function sources(directory) {
  const all = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) all.push(...await sources(path));
    else if (/\.(mjs|json|py|ya?ml|lock)$/.test(path) || /\/(SKILL|AGENTS)\.md$/.test(path)) all.push(path);
  }
  return all;
}
const files = ['package.json', 'package-lock.json', ...await sources('ecosystem'), ...await sources('sandbox'), ...await sources('integrations')].sort();
const hash = createHash('sha256');
for (const file of files) hash.update(file + '\n').update(await readFile(file));
const report = { generatedAt: new Date().toISOString(), sourceSha256: hash.digest('hex'), sourceFiles: files,
  environment: { node: process.version, platform: process.platform, architecture: process.arch },
  scope: { services: 'loopback host APIs; local Docker worker/egress and synthetic canary; synthetic model and identity', stateAuthority: 'local single-writer model',
    realApplicationProofs: !!backend, coreRollupDeployed: false, ethereumSettlementTested: false, productionCredentialsUsed: false },
  passed: results.every(x => x.passed), results };
const out = args.indexOf('--report');
if (out >= 0) await writeFile(args[out + 1], JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
