import { proofBackend } from './proof.mjs';
console.error('Compiling real o1js reservation proof system (two prover workers).');
const started = Date.now();
const backend = await proofBackend();
const request = { before: 100, units: 70, version: 0, domain: 'compile-check', action: 'reservation-1' };
const proof = await backend.prove(request);
const verified = await backend.check(proof, request);
console.log(JSON.stringify({ evidence: backend.evidence, verified, verificationKeyHash: backend.verificationKey.hash.toString(), elapsedMs: Date.now() - started }));
if (!verified) process.exitCode = 1;
