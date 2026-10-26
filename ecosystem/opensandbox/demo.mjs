import { resolve } from 'node:path';
import { runProcess, python } from '../_shared/process.mjs';
export async function demo(runtime) {
  const action = runtime.approve('opensandbox-worker', 70);
  const output = await runProcess(python, [resolve('ecosystem/opensandbox/demo.py')], { input: JSON.stringify({ ...runtime.pythonConfig(), action }) });
  return { level: 'official OpenSandbox SDK with in-memory control-plane/execd transport fixture; no container isolation', checks: JSON.parse(output.trim().split('\n').at(-1)) };
}
