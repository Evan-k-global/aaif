import { body, send } from './runtime.mjs';

export function installChatFixture(runtime, action) {
  const calls = [];
  runtime.routes.set('/v1/chat/completions', async (req, res) => {
    const request = await body(req); calls.push(request);
    const tool = request.tools?.find(x => x.function?.name?.includes('reserve_resource'));
    const hasResult = request.messages?.some(x => x.role === 'tool');
    const message = hasResult || !tool
      ? { role: 'assistant', content: 'Local reservation workflow completed. Inspect the state receipt for the outcome.' }
      : { role: 'assistant', content: null, tool_calls: [{ id: 'local_call_1', type: 'function', function: { name: tool.function.name, arguments: JSON.stringify(action) } }] };
    const finish = message.tool_calls ? 'tool_calls' : 'stop';
    if (request.stream) {
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      const base = { id: 'chatcmpl_fixture', object: 'chat.completion.chunk', created: 1, model: request.model };
      const delta = message.tool_calls ? { role: 'assistant', tool_calls: [{ index: 0, ...message.tool_calls[0] }] } : message;
      res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta, finish_reason: null }] })}\n\n`);
      res.write(`data: ${JSON.stringify({ ...base, choices: [{ index: 0, delta: {}, finish_reason: finish }], usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 } })}\n\n`);
      return res.end('data: [DONE]\n\n');
    }
    send(res, 200, { id: 'chatcmpl_fixture', object: 'chat.completion', created: 1, model: request.model,
      choices: [{ index: 0, message, finish_reason: finish }], usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 } });
  });
  runtime.routes.set('/v1/models', (_req, res) => send(res, 200, { object: 'list', data: [{ id: 'local-fixture', object: 'model', created: 1, owned_by: 'local-fixture' }] }));
  return calls;
}
