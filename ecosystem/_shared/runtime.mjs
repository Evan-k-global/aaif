import http from 'node:http';
import { randomBytes } from 'node:crypto';
import assert from 'node:assert/strict';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { z } from 'zod';
import { startSandbox } from '../../sandbox/server.mjs';

export function send(res, status, data, headers = {}) {
  res.writeHead(status, { 'content-type': 'application/json', ...headers }); res.end(JSON.stringify(data));
}
export async function body(req) {
  let raw = ''; for await (const part of req) { raw += part; if (raw.length > 1000000) throw new Error('Request too large'); }
  return JSON.parse(raw || '{}');
}
export async function listen(server) {
  await new Promise((ok, no) => server.once('error', no).listen(0, '127.0.0.1', ok));
  return `http://127.0.0.1:${server.address().port}`;
}
export async function closeServer(server) {
  server.closeAllConnections?.(); await new Promise(ok => server.close(ok));
}
export async function createRuntime({ backend } = {}) {
  const sandbox = await startSandbox({ proofBackend: backend });
  const first = await sandbox.authorize(), second = await sandbox.authorize({ secondClient: true });
  const approvals = new Map(), calls = [], routes = new Map();
  const fixtureToken = randomBytes(24).toString('hex');
  function approve(actionId, units = 70, { actor = 'a' } = {}) {
    if (approvals.has(actionId)) throw new Error('Approval already exists');
    const client = actor === 'b' ? second : first;
    approvals.set(actionId, { units, client, input: client.prepare({ units, actionId }) });
    return { actionId, units };
  }
  async function reserve(input) {
    const approved = approvals.get(input.actionId);
    let result;
    if (!approved || input.units !== approved.units) result = { ok: false, rejectedAt: 'synthetic-approval-binding' };
    else result = await approved.client.call(approved.input);
    if (result.ok && backend) assert.equal(await backend.check(result.receipt.proof, result.receipt.statement), true);
    calls.push({ actionId: input.actionId, units: input.units, accepted: result.ok, rejectedAt: result.rejectedAt });
    return result;
  }
  const server = http.createServer(async (req, res) => {
    try {
      const path = new URL(req.url, 'http://127.0.0.1').pathname;
      if (routes.has(path)) return await routes.get(path)(req, res);
      if (path === '/health') return send(res, 200, { ok: true });
      if (path === '/state') return send(res, 200, { remaining: sandbox.state.remaining, accepted: sandbox.state.accepted, version: sandbox.state.version });
      if (path === '/action') {
        if (req.headers.authorization !== `Bearer ${fixtureToken}`) return send(res, 401, { error: 'fixture_capability_required' });
        return send(res, 200, await reserve(await body(req)));
      }
      if (path === '/mcp' && req.method === 'POST') {
        const mcp = new McpServer({ name: 'zeko-local-mission-broker', version: '0.1.0' });
        mcp.registerTool('reserve_resource', {
          description: 'Exercise a preapproved synthetic reservation. Local demo only.',
          inputSchema: { units: z.number().int().positive(), actionId: z.string() }
        }, async input => { const result = await reserve(input); return { content: [{ type: 'text', text: JSON.stringify(result) }], isError: !result.ok }; });
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
        await mcp.connect(transport); res.once('close', () => { void transport.close(); void mcp.close(); });
        return await transport.handleRequest(req, res, await body(req));
      }
      send(res, 404, { error: 'fixture_route_not_found' });
    } catch (error) { if (!res.headersSent) send(res, 500, { error: 'fixture_error' }); else res.end(); }
  });
  const base = await listen(server);
  return {
    sandbox, base, fixtureToken, approve, reserve, routes, calls,
    pythonConfig() { return { base, fixtureToken }; },
    async mcp(url = `${base}/mcp`) {
      const client = new Client({ name: 'ecosystem-local-client', version: '0.1.0' });
      await client.connect(new StreamableHTTPClientTransport(new URL(url)));
      return { client, async call(input) { const r = await client.callTool({ name: 'reserve_resource', arguments: input }); return JSON.parse(r.content[0].text); } };
    },
    summary() {
      return { accepted: sandbox.state.accepted, rejected: calls.filter(x => !x.accepted).length,
        remaining: sandbox.state.remaining, effects: sandbox.state.effects,
        proofVerified: backend ? sandbox.state.receipts.every(x => !!x.proof) : false,
        stateAuthority: 'local single-writer model', proof: backend ? 'real o1js application proof' : 'not enabled',
        coreRollupDeployed: false, ethereumSettlementTested: false };
    },
    async close() { await closeServer(server); await sandbox.close(); }
  };
}
