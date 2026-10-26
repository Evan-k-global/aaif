import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

export function validateSuite(suite) {
  if (suite?.format !== 'zeko-aaif-cases-v1' || typeof suite.profile !== 'string' ||
      !Array.isArray(suite.cases) || suite.cases.length === 0) throw new Error('Invalid suite');
  const ids = new Set();
  for (const c of suite.cases) {
    if (typeof c.id !== 'string' || !c.id || ids.has(c.id) ||
        !Array.isArray(c.requirements) || !c.requirements.length ||
        !Array.isArray(c.steps) || !c.steps.length ||
        !c.expected || typeof c.expected !== 'object' || Array.isArray(c.expected) ||
        !Object.keys(c.expected).length) throw new Error('Invalid or duplicate case');
    ids.add(c.id);
  }
  return suite;
}

export async function runSuite(suite, adapter, { timeoutMs = 30000, onCase = () => {} } = {}) {
  validateSuite(suite);
  if (!adapter?.manifest?.profiles?.includes(suite.profile) ||
      !adapter.manifest.name || !adapter.manifest.revision || !adapter.manifest.evidence ||
      typeof adapter.runCase !== 'function') throw new Error('Adapter does not declare the selected profile');
  const results = [];
  for (const c of suite.cases) {
    const controller = new AbortController();
    let timer;
    try {
      const deadline = new Promise((_, reject) => {
        timer = setTimeout(() => { controller.abort(); reject(new Error('deadline')); }, timeoutMs);
      });
      const input = structuredClone({ id: c.id, profile: suite.profile, setup: c.setup ?? {}, steps: c.steps });
      const observed = await Promise.race([adapter.runCase({ ...input, signal: controller.signal }), deadline]);
      const match = observed && !observed.skipped && Object.entries(c.expected).every(
        ([key, value]) => Object.hasOwn(observed, key) && isDeepStrictEqual(observed[key], value)
      );
      results.push({ id: c.id, status: match ? 'pass' : 'fail' });
    } catch {
      // Adapter errors can contain credentials. Publish only the case's error status.
      results.push({ id: c.id, status: 'error' });
    } finally { clearTimeout(timer); }
    onCase(results.at(-1));
  }
  return {
    profile: suite.profile, adapter: {
      name: adapter.manifest.name, revision: adapter.manifest.revision,
      declaredEvidence: adapter.manifest.evidence
    },
    passed: results.every(r => r.status === 'pass'), results
  };
}

async function main() {
  const args = process.argv.slice(2);
  const value = flag => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
  const names = ['zeko-shared-state-v0.1', 'id-jag-mcp-v0.1'];
  const selected = value('--profile');
  if (selected && !names.includes(selected)) throw new Error('Unknown profile');
  if (!args.includes('--validate') && (!selected || !value('--adapter'))) {
    throw new Error('Specify --profile and --adapter, or use --validate for structure checks only');
  }
  for (const profile of selected ? [selected] : names) {
    const name = profile === names[0] ? 'shared-state-v0.1.json' : 'id-jag-mcp-v0.1.json';
    const raw = await readFile(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
    const suite = validateSuite(JSON.parse(raw));
    const fixtureSha256 = createHash('sha256').update(raw).digest('hex');
    if (args.includes('--validate')) {
      console.log(JSON.stringify({ profile, cases: suite.cases.length, fixtureSha256, structureValid: true, integrationTested: false }));
    } else {
      const adapter = await import(pathToFileURL(resolve(value('--adapter'))).href);
      const timeoutMs = Number(value('--timeout-ms') ?? 30000);
      if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) throw new Error('Invalid timeout');
      const report = await runSuite(suite, adapter, { timeoutMs });
      console.log(JSON.stringify({ ...report, fixtureSha256 }, null, 2));
      if (!report.passed) process.exitCode = 1;
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(() => { console.error('TCK setup failed; check profile, fixture and adapter configuration.'); process.exitCode = 2; });
}
