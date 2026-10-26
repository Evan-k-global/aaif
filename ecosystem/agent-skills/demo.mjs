import { resolve } from 'node:path';
import { runProcess, python } from '../_shared/process.mjs';
export async function demo(runtime) {
  const validation = JSON.parse((await runProcess(python, [resolve('ecosystem/agent-skills/validate.py')])).trim());
  const action = runtime.approve('skill-reservation', 70), input = JSON.stringify({ ...runtime.pythonConfig(), action });
  const script = resolve('ecosystem/agent-skills/skills/zeko-state-actions/scripts/reserve.mjs');
  const first = JSON.parse(await runProcess(process.execPath, [script], { input }));
  const replay = JSON.parse(await runProcess(process.execPath, [script], { input }));
  return { level: 'official skills-ref validator + executable packaged skill script', checks: {
    ...validation, skillScriptAccepted: first.ok, scriptReplayRejected: !replay.ok,
    singleEffect: runtime.sandbox.state.effects === 1
  } };
}
