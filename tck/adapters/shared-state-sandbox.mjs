import { spawn } from 'node:child_process';
import { startSandbox } from '../../sandbox/server.mjs';
import { proofBackend } from '../../sandbox/proof.mjs';

export const manifest = {
  name: 'MCP + AMBA + real o1js reservation proofs', revision: 'working-tree-v0.2',
  evidence: 'local-o1js-application-proof; local single-writer authority; no core sequencer or Ethereum',
  profiles: ['zeko-shared-state-v0.1']
};

async function independentlyVerify(receipt, key) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, ['sandbox/verify-receipt.mjs'], { stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = ''; child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', () => {});
    child.on('error', () => resolve(false));
    child.on('exit', code => { try { resolve(code === 0 && JSON.parse(stdout).valid); } catch { resolve(false); } });
    child.stdin.end(JSON.stringify({ proof: receipt.proof, statement: receipt.statement, trustedVerificationKey: key.data }));
  });
}

export async function runCase({ setup, steps, signal }) {
  const backend = await proofBackend();
  const sandbox = await startSandbox({ proofBackend: backend, domain: setup.domain, initialQuota: setup.initialQuota });
  let outcome, independentVerification;
  try {
    const first = await sandbox.authorize({ ttlMs: setup.missionExpiresAt <= setup.now ? -1000 : 300000 });
    let second;
    async function execute(step, client = first) {
      signal.throwIfAborted();
      const input = client.prepare({ units: step.units, actionId: step.actionId });
      if (step.effectResponse) input.effectResponse = step.effectResponse;
      if (step.evidence !== 'valid' && sandbox.state.remaining >= step.units) {
        const request = sandbox.proofRequest(input);
        if (step.evidence === 'valid-for-prior-state') request.before += 100;
        if (step.evidence === 'valid-for-different-domain') request.domain += '-other';
        if (step.evidence === 'valid-for-different-amount') request.units -= 1;
        input.providedProof = await backend.prove(request);
        if (step.evidence === 'tampered-proof') {
          const encoded = input.providedProof.proof, pos = Math.floor(encoded.length / 2);
          input.providedProof.proof = encoded.slice(0, pos) + (encoded[pos] === 'A' ? 'B' : 'A') + encoded.slice(pos + 1);
        }
        if (step.evidence === 'valid-under-untrusted-key') input.offeredVerificationKeyHash = 'untrusted-verification-key';
      }
      const result = await client.call(input);
      if (result.ok && result.receipt.outcome === 'unknown') outcome = 'unknown';
      return result;
    }
    for (const step of steps) {
      if (step.op === 'reserve') await execute(step);
      else if (step.op === 'concurrent') {
        second ??= await sandbox.authorize({ secondClient: true });
        await Promise.all(step.requests.map((request, i) => execute(request, i ? second : first)));
      } else if (step.op === 'revoke-mission') first.context.revoked = true;
      else if (step.op === 'disable-required-verifier') sandbox.state.verifierEnabled = false;
      else if (step.op === 'reconcile-before-retry') outcome = sandbox.state.receipts.at(-1)?.outcome;
      else if (step.op === 'verify-receipt-in-independent-process') independentVerification = await independentlyVerify(sandbox.state.receipts.at(-1), backend.verificationKey);
      else throw new Error('Unsupported step');
    }
    return {
      accepted: sandbox.state.accepted, rejected: sandbox.state.rejected, effects: sandbox.state.effects,
      remaining: sandbox.state.remaining, effectAttempts: sandbox.state.effectAttempts,
      ...(outcome ? { outcome, retryAuthorized: outcome !== 'unknown' } : {}),
      ...(independentVerification === undefined ? {} : { independentVerification })
    };
  } finally { await sandbox.close(); }
}
