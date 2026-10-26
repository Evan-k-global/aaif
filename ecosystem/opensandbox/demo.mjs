import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { runProcess, python } from '../_shared/process.mjs';

export async function demo(runtime) {
  const images = JSON.parse(await readFile('ecosystem/opensandbox/images.json'));
  const dockerHost = process.env.AAIF_DOCKER_HOST ?? process.env.DOCKER_HOST ?? 'unix:///var/run/docker.sock';
  assert(dockerHost.startsWith('unix:///'), 'Use a local Docker Unix socket via AAIF_DOCKER_HOST');
  const job = { jobId: 'synthetic-review-001', values: [3, 5, 8] };
  // The container receives only synthetic data. It cannot authorize a state write.
  const output = await runProcess(python, [resolve('ecosystem/opensandbox/demo.py')], {
    input: JSON.stringify({ dockerHost, images, job }), timeout: 150000
  });
  const worker = JSON.parse(output.trim().split('\n').at(-1));
  assert.deepEqual(worker.result, { jobId: job.jobId, sum: 16, squares: 98 });
  const commitment = result => createHash('sha256').update(JSON.stringify({ job, result, image: images.worker })).digest('hex');
  const action = runtime.approve(`opensandbox-result-${commitment(worker.result)}`, 70);
  const accepted = await runtime.reserve(action);
  const replay = await runtime.reserve(action);
  const changed = await runtime.reserve({ ...action,
    actionId: `opensandbox-result-${commitment({ ...worker.result, sum: 999 })}` });
  return {
    level: 'official OpenSandbox SDK + lifecycle server + Docker execd worker and deny-by-default egress sidecar; host-side result commitment',
    images,
    checks: { ...worker.checks,
      deterministicJobResultVerified: true,
      jobAndImageAndResultBoundToApprovedAction: accepted.ok && runtime.sandbox.state.usedActions.has(action.actionId)
        && /^[a-f0-9]{64}$/.test(accepted.receipt.actionCommitment),
      resultAcceptedOnce: accepted.ok && !replay.ok,
      changedResultCommitmentRejected: !changed.ok && changed.rejectedAt === 'synthetic-approval-binding' }
  };
}
