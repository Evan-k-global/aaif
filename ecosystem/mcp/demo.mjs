import assert from 'node:assert/strict';
export async function demo(runtime) {
  const first = runtime.approve('mcp-a', 70), second = runtime.approve('mcp-b', 70, { actor: 'b' });
  const a = await runtime.mcp(), b = await runtime.mcp();
  try {
    const tools = await a.client.listTools();
    const results = await Promise.all([a.call(first), b.call(second)]);
    assert.equal(results.filter(x => x.ok).length, 1);
    assert.equal((await a.call(first)).ok, false);
    assert.equal(runtime.sandbox.state.remaining, 30);
    return { level: 'official SDK client/server', checks: {
      toolDiscovered: tools.tools.some(x => x.name === 'reserve_resource'),
      concurrentOverspendRejected: results.filter(x => !x.ok).length === 1,
      singleEffect: runtime.sandbox.state.effects === 1,
      replayRejected: runtime.calls.at(-1).accepted === false
    } };
  } finally { await a.client.close(); await b.client.close(); }
}
