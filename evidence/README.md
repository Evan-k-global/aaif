# Reproducible sandbox evidence

Current result, 26 October 2026:

- **19 unit/integration tests passed**, 0 failed/skipped: `npm run test:sandbox`.
- **17 ID-JAG/MCP profile cases passed** against real HTTPS exchanges and signed JWTs in the local sandbox.
- **13 shared-state profile cases passed** using real o1js application proofs, including a separate-process receipt verifier.

The [machine-readable report](sandbox-run-2026-10-26.json) records case results, fixture digests, runtime, implementation scope and a combined source digest. Its source digest is `a1afc4f580650017db0983cfb4d51366ffa92ca5bcb995af2aada86eb64e9f4e`.

Reproduce with Node.js 24 and OpenSSL:

```sh
npm ci --ignore-scripts
npm run test:sandbox
npm run sandbox:evidence
```

The sandbox uses canonical AMBA `4b5bb5c6915c7ee17e716ab2320e50d985dfc0d5` for OAuth and mission checks, MCP SDK 1.26.0, jose 6.1.3, and o1js 2.13.0. All credentials are temporary local test credentials. No funds are used and no contracts are deployed.

These are selected local interoperability and application-proof results. The identity provider is a protocol fixture with a synthetic user; external effects are an instrumented counter. State acceptance uses a local single-writer authority. A commercial IdP, live core sequencer/DA deployment and Ethereum proof-verification/settlement path were not tested in this run. See the [sandbox scope](../sandbox/README.md).

The [earlier harness-only record](2026-10-26-local-validation.md) is retained as historical progress; the machine-readable sandbox report supersedes it for current status. CI configuration is supplied; hosted results are tracked on the review PR and are separate from this local evidence record.
