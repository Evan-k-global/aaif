import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { startProcess, waitFor, freePort, cache } from '../_shared/process.mjs';
import { installChatFixture } from '../_shared/model-fixture.mjs';

export async function demo(runtime) {
  // aigw's standalone autoconfiguration uses this documented local port.
  const probe = createServer();
  await new Promise((ok, no) => probe.once('error', no).listen(1975, '127.0.0.1', ok));
  await new Promise(ok => probe.close(ok));
  const runDir = await mkdtemp('/tmp/aaif-router-');
  const action = runtime.approve('agent-router-approved', 70);
  const modelCalls = installChatFixture(runtime, action);
  const router = await startProcess(resolve('.cache/ecosystem/bin/agent-router'), [
    'run', '--admin-port', String(await freePort()), '--mcp-json', JSON.stringify({ mcpServers: { zeko: { type: 'http', url: `${runtime.base}/mcp` } } })
  ], { env: {
    AIGW_CONFIG_HOME: `${cache}/router-config`, AIGW_DATA_HOME: `${cache}/data/aigw`,
    AIGW_STATE_HOME: `${cache}/router-state`, AIGW_RUNTIME_DIR: runDir,
    ENVOY_PATH: `${cache}/data/aigw/envoy-versions/1.39.2/bin/envoy`, ENVOY_VERSION: '1.39.2', ENVOY_PROXY_VERSION: '1.39.2',
    OPENAI_API_KEY: 'synthetic-local-fixture-not-a-real-key', OPENAI_BASE_URL: `${runtime.base}/v1`,
    OTEL_TRACES_EXPORTER: 'none', OTEL_METRICS_EXPORTER: 'none', OTEL_LOGS_EXPORTER: 'none'
  }, timeout: 90000 });
  let client;
  try {
    await waitFor(async () => {
      const r = await fetch('http://127.0.0.1:1975/v1/chat/completions', { method: 'POST',
        headers: { 'content-type': 'application/json' }, body: JSON.stringify({ model: 'local-fixture', messages: [{ role: 'user', content: 'local readiness' }] }) });
      return r.ok;
    }, router, 60000);
    client = new Client({ name: 'router-local-client', version: '0.1.0' });
    await client.connect(new StreamableHTTPClientTransport(new URL('http://127.0.0.1:1975/mcp')));
    const tools = await client.listTools();
    const name = tools.tools.find(x => x.name.includes('reserve_resource'))?.name;
    assert(name, 'Routed reservation tool not advertised');
    async function call(input) {
      const r = await client.callTool({ name, arguments: input }); return JSON.parse(r.content[0].text);
    }
    const first = await call(action), changed = await call({ ...action, units: 20 }), replay = await call(action);
    return { level: 'upstream Agent Router + native Envoy; local model/MCP backends', checks: {
      inferenceRoutedLocally: modelCalls.length > 0, routedToolDiscovered: !!name,
      sharedStateActionAccepted: first.ok, changedApprovalRejected: !changed.ok, replayRejected: !replay.ok,
      singleEffect: runtime.sandbox.state.effects === 1
    } };
  } finally { await client?.close(); await router.close(); await rm(runDir, { recursive: true, force: true }); }
}
