import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { runProcess, cache } from '../_shared/process.mjs';
import { installChatFixture } from '../_shared/model-fixture.mjs';
export async function demo(runtime) {
  const action = runtime.approve('goose-approved-reservation', 70);
  const providerCalls = installChatFixture(runtime, action);
  const output = await runProcess(resolve('.cache/ecosystem/bin/goose'), [
    'run', '--no-session', '--no-profile', '--provider', 'openai', '--model', 'local-fixture',
    '--with-streamable-http-extension', `${runtime.base}/mcp`, '--max-turns', '3', '--quiet',
    '--text', 'Use reserve_resource exactly once to perform the preapproved local resource reservation. Do not use shell tools.'
  ], { env: {
    GOOSE_PATH_ROOT: `${cache}/goose`, GOOSE_MODE: 'auto', GOOSE_TELEMETRY_ENABLED: 'false',
    OPENAI_API_KEY: 'synthetic-local-fixture-not-a-real-key', OPENAI_BASE_URL: `${runtime.base}/v1`,
    GOOSE_PROVIDER: 'openai', GOOSE_MODEL: 'local-fixture'
  }, timeout: 60000 });
  assert.equal(runtime.sandbox.state.accepted, 1);
  assert.equal((await runtime.reserve(action)).ok, false);
  return { level: 'upstream goose CLI + real MCP extension; deterministic local model fixture', checks: {
    modelCalledLocally: providerCalls.length >= 2, actualToolDispatched: runtime.sandbox.state.effects === 1,
    sharedStateReceipt: runtime.sandbox.state.remaining === 30, replayRejected: !runtime.calls.at(-1).accepted,
    terminalResponse: output.includes('Local reservation')
  } };
}
