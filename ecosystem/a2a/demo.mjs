import assert from 'node:assert/strict';
import express from 'express';
import { randomUUID } from 'node:crypto';
import { A2A_PROTOCOL_VERSION, AGENT_CARD_PATH, Role } from '@a2a-js/sdk';
import { InMemoryTaskStore, DefaultRequestHandler, AgentEvent } from '@a2a-js/sdk/server';
import { agentCardHandler, jsonRpcHandler, UserBuilder } from '@a2a-js/sdk/server/express';
import { ClientFactory } from '@a2a-js/sdk/client';
import { listen, closeServer } from '../_shared/runtime.mjs';
import http from 'node:http';

export async function demo(runtime) {
  const approved = runtime.approve('a2a-task-reservation', 70);
  let received = 0;
  const executor = {
    async cancelTask() {},
    async execute(context, bus) {
      const input = JSON.parse(context.userMessage.parts[0].content.value);
      const result = await runtime.reserve(input); received++;
      bus.publish(AgentEvent.message({
        messageId: randomUUID(), role: Role.ROLE_AGENT,
        parts: [{ content: { $case: 'text', value: JSON.stringify({ ok: result.ok, remaining: result.receipt?.remaining, rejectedAt: result.rejectedAt }) }, mediaType: 'text/plain', filename: '' }],
        contextId: context.contextId, taskId: context.taskId, extensions: [], referenceTaskIds: [], metadata: {}
      }));
      bus.finished();
    }
  };
  const app = express();
  const server = http.createServer(app), base = await listen(server);
  const card = {
    name: 'Zeko local commitment agent', description: 'Synthetic bounded task; no provider or deployed rollup', version: '0.1.0',
    supportedInterfaces: [{ url: `${base}/`, protocolBinding: 'JSONRPC', protocolVersion: A2A_PROTOCOL_VERSION, tenant: '' }],
    capabilities: { streaming: false, pushNotifications: false, extendedAgentCard: false, extensions: [] },
    securitySchemes: {}, securityRequirements: [], defaultInputModes: ['text'], defaultOutputModes: ['text'], signatures: [],
    skills: [{ id: 'reserve', name: 'Reserve approved resource', description: 'Local fixture', tags: ['demo'], examples: [], inputModes: ['text'], outputModes: ['text'], securityRequirements: [] }]
  };
  const handler = new DefaultRequestHandler(card, new InMemoryTaskStore(), executor);
  app.use(`/${AGENT_CARD_PATH}`, agentCardHandler({ agentCardProvider: handler }));
  app.use(jsonRpcHandler({ requestHandler: handler, userBuilder: UserBuilder.noAuthentication }));
  try {
    const client = await new ClientFactory().createFromUrl(base);
    async function send(input) {
      return await client.sendMessage({ message: {
        messageId: randomUUID(), role: Role.ROLE_USER,
        parts: [{ content: { $case: 'text', value: JSON.stringify(input) }, mediaType: 'text/plain', filename: '' }],
        extensions: [], referenceTaskIds: [], metadata: {}
      } });
    }
    const first = await send(approved), replay = await send(approved);
    assert.equal(runtime.sandbox.state.accepted, 1); assert.equal(received, 2);
    assert.equal(runtime.calls[1].accepted, false);
    return { level: 'official A2A SDK v1 JSON-RPC client/server', checks: {
      twoWireMessages: received === 2, singleAcceptedCommitment: runtime.sandbox.state.accepted === 1,
      replayRejected: !runtime.calls[1].accepted, structuredReply: !!first && !!replay
    } };
  } finally { await closeServer(server); }
}
