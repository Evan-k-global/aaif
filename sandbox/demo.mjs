import { startSandbox } from './server.mjs';
const backend = process.argv.includes('--proofs') ? await (await import('./proof.mjs')).proofBackend() : null;
const sandbox = await startSandbox({ proofBackend: backend });
try {
  const client = await sandbox.authorize();
  const tools = await client.listTools();
  const input = client.prepare({ units: 70, actionId: 'demo-reservation' });
  const first = await client.call(input);
  const replay = await client.call(input);
  console.log(JSON.stringify({
    mode: backend?.evidence ?? 'live-local-identity-with-transactional-state',
    oauthBlueprint: 'canonical AMBA authorization-code/PKCE/JWKS implementation',
    tools: tools.tools.map(t => t.name), authorizedReservation: first.ok, replayRejected: !replay.ok,
    accepted: sandbox.state.accepted, effects: sandbox.state.effects, remaining: sandbox.state.remaining,
    verifierProfile: backend ? 'local application proof; no core sequencer or Ethereum settlement' : 'local state model; no ZK proof',
    ...sandbox.inspectPublicEvidence()
  }, null, 2));
  if (!first.ok || replay.ok) process.exitCode = 1;
} finally { await sandbox.close(); }
