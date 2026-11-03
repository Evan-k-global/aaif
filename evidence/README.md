# Reproducible local evidence

Open infrastructure requires inspectable results. We publish exact versions, reproducible checks and source digests so developers can verify Zeko's integration work and retain control of their own deployments.

Current identity/shared-state validation: **3 November 2026**. The full reference-integration run below is dated **26 October 2026**. See the [submission validation record](submission-validation-2026-11-03.md).

- **21 unit/integration tests passed**, 0 failed/skipped: `npm run test:sandbox`. This includes two network-isolation checks.
- **17 ID-JAG/MCP profile cases and 13 shared-state profile cases passed**, with real proofs in the shared-state profile: [report](sandbox-run-2026-11-03.json).
- **All 10 Zeko reference integrations for AAIF projects passed with real application proofs**, covering 62 scenario checks: [integration report](ecosystem-run-2026-10-26.json). OpenSandbox includes an actual local Docker worker, deny-by-default egress, a blocked connection to a synthetic local canary, result-commitment replay checks and SDK container cleanup.

The results identify native components, official SDK clients/types, protocol/schema fixtures and instruction-format companions separately. Start with the [reference integrations](../ecosystem/README.md) and [runbook](../ecosystem/RUNBOOK.md); the [compatibility matrix](../compatibility.md) defines their tested scope.

Source digests recorded in the reports:

- Compatibility profiles: `9680ac8469e8bd3265a79161e4e516ba688a13f13995fa3b70a7f9add90544d8`.
- Reference integrations: `04860d95281d1096ba0251327789696cc398aec51d2e088bc7b4b8ceabdbb31b`.

The reports include exact source-file lists, environment, case results and scope. They do not export temporary credentials. The core candidate and its independent upstream build are recorded [separately](core-candidate-2026-11-03.md).

Reproduce with Node.js 24, Python 3.12+, a running local Docker daemon and the native suite's documented macOS arm64 prerequisites:

```sh
npm ci --ignore-scripts
npm run test:sandbox
npm run sandbox:evidence
npm run ecosystem:setup -- --docker
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json
```

The [earlier harness-only record](2026-10-26-local-validation.md) is historical. Hosted CI results are separate from these recorded local runs.
