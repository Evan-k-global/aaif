import { startSandbox } from '../../sandbox/server.mjs';

export const manifest = {
  name: 'AMBA + signed-JWT HTTPS sandbox + official MCP SDK', revision: 'working-tree-v0.2',
  evidence: 'live-local-protocol-sandbox; no commercial IdP', profiles: ['id-jag-mcp-v0.1']
};

export async function runCase({ steps, signal }) {
  signal.throwIfAborted();
  const mutation = steps[0].mutation;
  const sandbox = await startSandbox({ mutation });
  try {
    let client;
    try { client = await sandbox.authorize({ deniedMission: mutation === 'valid-access-token-mission-out-of-scope' }); }
    catch (error) {
      return { authorized: false, effectAttempts: sandbox.state.effectAttempts,
        rejectedAt: error.stage === 'idp' ? 'idp' : error.stage === 'resource' ? 'resource-as' : 'resource' };
    }
    const result = await client.call(client.prepare({ units: 70, actionId: 'identity-profile-reservation' }));
    return {
      authorized: result.ok, effectAttempts: sandbox.state.effectAttempts,
      ...(!result.ok ? { rejectedAt: result.rejectedAt } : {}), ...sandbox.inspectPublicEvidence()
    };
  } finally { await sandbox.close(); }
}
