import { resolve } from 'node:path';
import { runProcess, python } from '../_shared/process.mjs';
export async function demo(runtime) {
  const actions = [runtime.approve('openenv-a', 70), runtime.approve('openenv-b', 70, { actor: 'b' })];
  const output = await runProcess(python, [resolve('ecosystem/openenv/demo.py')], { input: JSON.stringify({ ...runtime.pythonConfig(), actions }), timeout: 60000 });
  return { level: 'official OpenEnv typed Environment in process; local shared-state backend', checks: JSON.parse(output.trim().split('\n').at(-1)) };
}
