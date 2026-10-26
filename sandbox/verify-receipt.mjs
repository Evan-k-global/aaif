import { verifyReceiptProof } from './proof.mjs';
let raw = '';
for await (const chunk of process.stdin) raw += chunk;
try {
  const { proof, statement, trustedVerificationKey } = JSON.parse(raw);
  const valid = await verifyReceiptProof(proof, statement, trustedVerificationKey);
  console.log(JSON.stringify({ valid }));
  if (!valid) process.exitCode = 1;
} catch { console.log(JSON.stringify({ valid: false })); process.exitCode = 1; }
