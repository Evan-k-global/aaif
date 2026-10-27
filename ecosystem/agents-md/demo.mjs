import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
export async function demo(runtime) {
  const instructions = await readFile('ecosystem/agents-md/workspace/AGENTS.md', 'utf8');
  const action = runtime.approve('agents-md-companion', 70);
  const first = await runtime.reserve(action), changed = await runtime.reserve({ ...action, units: 20 }), replay = await runtime.reserve(action);
  return { level: 'AGENTS.md instruction artifact + executable companion; no agent-behavior certification',
    instructionSha256: createHash('sha256').update(instructions).digest('hex'), checks: {
      workspaceInstructionsPresent: instructions.includes('preapproved fixture action'),
      companionActionAccepted: first.ok, changedApprovalRejected: !changed.ok,
      repeatedDispatchRejected: !replay.ok, singleEffect: runtime.sandbox.state.effects === 1
    } };
}
