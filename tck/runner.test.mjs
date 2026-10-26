import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSuite, runSuite } from './run.mjs';

const suite = () => ({ format: 'zeko-aaif-cases-v1', profile: 'runner-test-only', cases: [
  { id: 'test-case', requirements: ['R1'], setup: { quota: 100 }, steps: [{ op: 'reserve', units: 70 }], expected: { accepted: 1, remaining: 30 } }
] });
const manifest = () => ({ name: 'controlled runner test double', revision: 'test-fixture', evidence: 'test-double-only', profiles: ['runner-test-only'] });

test('duplicate cases fail fixture validation', () => {
  const s = suite(); s.cases.push(structuredClone(s.cases[0]));
  assert.throws(() => validateSuite(s));
});

test('adapter receives no expected answer or mutable fixture reference', async () => {
  const s = suite();
  const report = await runSuite(s, { manifest: manifest(), runCase: async input => {
    assert.equal(Object.hasOwn(input, 'expected'), false);
    input.setup.quota = 0;
    return { accepted: 1, remaining: 30 };
  } });
  assert.equal(report.passed, true);
  assert.equal(s.cases[0].setup.quota, 100);
  assert.equal(report.adapter.declaredEvidence, 'test-double-only');
});

test('incorrect state and skipped required cases both fail', async () => {
  for (const observed of [{ accepted: 2, remaining: -40 }, { skipped: true, accepted: 1, remaining: 30 }]) {
    const report = await runSuite(suite(), { manifest: manifest(), runCase: async () => observed });
    assert.equal(report.passed, false);
    assert.equal(report.results[0].status, 'fail');
  }
});

test('missing declared profile cannot run', async () => {
  await assert.rejects(runSuite(suite(), { manifest: { ...manifest(), profiles: [] }, runCase: async () => ({}) }));
});

test('case timeout is an error and raw adapter exceptions are redacted', async () => {
  for (const runCase of [async () => { throw new Error('secret-token'); }, async () => new Promise(() => {})]) {
    const report = await runSuite(suite(), { manifest: manifest(), runCase }, { timeoutMs: 5 });
    assert.equal(report.passed, false);
    assert.equal(report.results[0].status, 'error');
    assert.equal(JSON.stringify(report).includes('secret-token'), false);
  }
});
