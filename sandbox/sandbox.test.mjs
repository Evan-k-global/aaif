import test from 'node:test';
import assert from 'node:assert/strict';
import { startSandbox } from './server.mjs';

test('AMBA OAuth, ID-JAG and MCP work together; replay cannot dispatch a second effect', async () => {
  const sandbox = await startSandbox();
  try {
    const client = await sandbox.authorize();
    assert.deepEqual((await client.listTools()).tools.map(t => t.name), ['reserve_resource']);
    const input = client.prepare({ units: 70, actionId: 'once' });
    assert.equal((await client.call(input)).ok, true);
    assert.equal((await client.call(input)).ok, false);
    assert.equal(sandbox.state.effects, 1);
    assert.equal(sandbox.state.remaining, 30);
    assert.deepEqual(sandbox.inspectPublicEvidence(), { exportContainsCredentials: false, publicStateContainsIdentity: false });
  } finally { await sandbox.close(); }
});

test('valid access token does not authorize a changed payload or a different mission holder', async () => {
  const sandbox = await startSandbox();
  try {
    const client = await sandbox.authorize();
    const changed = client.prepare({ units: 20, actionId: 'changed' }); changed.units = 30;
    const wrongHolder = client.prepare({ units: 20, actionId: 'wrong-holder', wrongHolder: true });
    for (const input of [changed, wrongHolder]) {
      const result = await client.call(input);
      assert.equal(result.ok, false); assert.equal(result.rejectedAt, 'mission-gate');
    }
    assert.equal(sandbox.state.effectAttempts, 0);
    assert.equal(sandbox.state.remaining, 100);
  } finally { await sandbox.close(); }
});

test('AMBA checks the OIDC nonce rather than accepting a signed but unrelated identity token', async () => {
  const sandbox = await startSandbox({ mutation: 'oidc-nonce-mismatch' });
  try {
    await assert.rejects(sandbox.authorize(), /nonce mismatch/);
    assert.equal(sandbox.state.effectAttempts, 0);
  } finally { await sandbox.close(); }
});

test('independent SDK clients contend against one state authority', async () => {
  const sandbox = await startSandbox();
  try {
    const first = await sandbox.authorize();
    const second = await sandbox.authorize({ secondClient: true });
    const results = await Promise.all([
      first.call(first.prepare({ units: 70, actionId: 'client-a' })),
      second.call(second.prepare({ units: 70, actionId: 'client-b' }))
    ]);
    assert.equal(results.filter(r => r.ok).length, 1);
    assert.equal(sandbox.state.remaining, 30);
    assert.equal(sandbox.state.effects, 1);
  } finally { await sandbox.close(); }
});

test('missing ID-JAG metadata fails before OAuth or tool access', async () => {
  const sandbox = await startSandbox({ mutation: 'metadata-missing-idjag' });
  try {
    await assert.rejects(sandbox.authorize(), e => e.stage === 'discovery');
    assert.equal(sandbox.state.effectAttempts, 0);
  } finally { await sandbox.close(); }
});
