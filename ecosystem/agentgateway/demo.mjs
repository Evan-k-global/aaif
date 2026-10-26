import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { freePort, startProcess, waitFor, writeConfig } from '../_shared/process.mjs';
export async function demo(runtime) {
  const port = await freePort();
  const config = { config: { enableIpv6: false, adminAddr: 'off', statsAddr: 'off', readinessAddr: 'off', connectionTerminationDeadline: '0s' }, binds: [{ port, listeners: [{ protocol: 'HTTP', routes: [{ backends: [{ host: runtime.base.replace('http://', '') }] }] }] }] };
  const path = await writeConfig('agentgateway.json', JSON.stringify(config));
  const gateway = await startProcess(resolve('.cache/ecosystem/bin/agentgateway'), ['-f', path], { env: { RUST_LOG: 'warn', ADMIN_ADDR: '127.0.0.1:0' } });
  let client;
  try {
    await waitFor(async () => (await fetch(`http://127.0.0.1:${port}/health`)).ok, gateway);
    client = await runtime.mcp(`http://127.0.0.1:${port}/mcp`);
    const approved = runtime.approve('gateway-routed', 70);
    const first = await client.call(approved), changed = await client.call({ ...approved, units: 20 }), replay = await client.call(approved);
    assert.equal(first.ok, true); assert.equal(changed.ok, false); assert.equal(replay.ok, false);
    return { level: 'upstream agentgateway native binary; HTTP-routed MCP', checks: {
      routedToolAccepted: first.ok, changedActionRejected: !changed.ok, replayRejected: !replay.ok,
      singleEffect: runtime.sandbox.state.effects === 1
    } };
  } finally { await client?.client.close(); await gateway.close(); }
}
