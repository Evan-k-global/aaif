import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import Ajv from 'ajv/dist/2020.js';
import { body, send } from '../_shared/runtime.mjs';

export async function demo(runtime) {
  const raw = await readFile('.cache/ecosystem/openresponses-openapi.json');
  assert.equal(createHash('sha256').update(raw).digest('hex'), 'd598753c3a86fd8a2434828fe39dcc8786a7a694bbe46080a0d24c9fa40e72df');
  const spec = JSON.parse(raw), ajv = new Ajv({ strict: false, validateFormats: false });
  ajv.addSchema(spec, 'openresponses');
  const requestValid = ajv.compile({ $ref: 'openresponses#/components/schemas/CreateResponseBody' });
  const responseValid = ajv.compile({ $ref: 'openresponses#/components/schemas/ResponseResource' });
  const approved = runtime.approve('responses-reservation', 70);
  const tools = [{ type: 'function', name: 'reserve_resource', description: 'Local approved reservation', strict: true,
    parameters: { type: 'object', properties: { units: { type: 'integer' }, actionId: { type: 'string' } }, required: ['units', 'actionId'], additionalProperties: false } }];
  const receiptDigest = x => createHash('sha256').update(JSON.stringify(x)).digest('hex');
  const response = (output, metadata = {}) => ({
    id: 'resp_local', object: 'response', created_at: 1, completed_at: 2, status: 'completed', incomplete_details: null,
    model: 'local-fixture', previous_response_id: null, instructions: null, output, error: null, tools, tool_choice: 'auto',
    truncation: 'disabled', parallel_tool_calls: false, text: { format: { type: 'text' } }, top_p: 1, top_logprobs: 0,
    presence_penalty: 0, frequency_penalty: 0, temperature: 1, reasoning: { effort: null, summary: null }, usage: null,
    max_output_tokens: null, max_tool_calls: null, store: false, background: false, service_tier: 'default', metadata,
    safety_identifier: null, prompt_cache_key: null
  });
  runtime.routes.set('/v1/responses', async (req, res) => {
    const input = await body(req);
    if (!requestValid(input)) return send(res, 400, { error: 'schema_invalid' });
    const output = Array.isArray(input.input) && input.input.find(x => x.type === 'function_call_output');
    if (output) {
      if (input.previous_response_id !== 'resp_local' || output.call_id !== 'call_local') return send(res, 400, { error: 'call_binding_mismatch' });
      const reported = JSON.parse(output.output), accepted = runtime.sandbox.state.receipts[0];
      if (!accepted || receiptDigest(reported.receipt) !== receiptDigest(accepted)) return send(res, 400, { error: 'receipt_not_accepted' });
      return send(res, 200, response([], { accepted_receipt_digest: receiptDigest(accepted) }));
    }
    send(res, 200, response([{ id: 'fc_local', type: 'function_call', name: 'reserve_resource', call_id: 'call_local', arguments: JSON.stringify(approved), status: 'completed' }]));
  });
  const initial = { model: 'local-fixture', input: 'Reserve the approved resource', tools, stream: false, store: false };
  assert.equal(requestValid(initial), true, JSON.stringify(requestValid.errors));
  const first = await (await fetch(`${runtime.base}/v1/responses`, { method: 'POST', body: JSON.stringify(initial) })).json();
  assert.equal(responseValid(first), true, JSON.stringify(responseValid.errors));
  const mcp = await runtime.mcp();
  try {
    const result = await mcp.call(JSON.parse(first.output[0].arguments)); assert.equal(result.ok, true);
    const follow = { model: 'local-fixture', previous_response_id: first.id,
      input: [{ type: 'function_call_output', call_id: 'call_local', output: JSON.stringify({ receipt: result.receipt }) }] };
    const completed = await (await fetch(`${runtime.base}/v1/responses`, { method: 'POST', body: JSON.stringify(follow) })).json();
    assert.equal(responseValid(completed), true, JSON.stringify(responseValid.errors));
    const changed = structuredClone(follow); changed.input[0].call_id = 'wrong-call';
    const wrong = await fetch(`${runtime.base}/v1/responses`, { method: 'POST', body: JSON.stringify(changed) });
    const replay = await mcp.call(approved);
    return { level: 'official Open Responses schema; local non-streaming function-tool fixture', checks: {
      requestSchemaValid: requestValid(initial), responseSchemaValid: responseValid(completed),
      acceptedReceiptCorrelated: completed.metadata.accepted_receipt_digest === receiptDigest(result.receipt),
      changedCallIdRejected: wrong.status === 400, duplicateActionRejected: !replay.ok
    } };
  } finally { await mcp.client.close(); }
}
