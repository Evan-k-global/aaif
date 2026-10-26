# Reproducible local evidence

Current results, 26 October 2026:

- **21 unit/integration tests passed**, 0 failed/skipped: `npm run test:sandbox`. This includes two network-isolation checks.
- **17 ID-JAG/MCP profile cases and 13 shared-state profile cases passed**, with real proofs in the shared-state profile: [report](sandbox-run-2026-10-26.json).
- **All 10 ecosystem examples passed with real application proofs**, covering 48 scenario checks: [ecosystem report](ecosystem-run-2026-10-26.json).

The ecosystem results distinguish native components, official SDK clients/types, protocol/schema fixtures and instruction-format companions. They are not ten identical claims of full runtime conformance. Start with the [suite overview](../ecosystem/README.md) and [runbook](../ecosystem/RUNBOOK.md).

Source digests recorded in the reports:

- Compatibility profiles: `9680ac8469e8bd3265a79161e4e516ba688a13f13995fa3b70a7f9add90544d8`.
- Ecosystem examples: `ddcb16fe25695d62f8caf0798f4880f23f1f532f160f1d75d80a4ae433a9456c`.

The reports include exact source-file lists, environment, case results and scope. They do not export temporary credentials. The core candidate and its independent upstream build are recorded [separately](core-candidate-2026-10-26.md).

Reproduce with Node.js 24, Python 3.12+ and the native suite's documented macOS arm64 prerequisites:

```sh
npm ci --ignore-scripts
npm run test:sandbox
npm run sandbox:evidence
npm run ecosystem:setup
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json
```

The local authority is a serialized application model; the provider and external effects are controlled fixtures. No commercial identity-provider, Zeko core sequencer/DA deployment, Ethereum settlement or arbitrary worker-execution guarantee is claimed. The [earlier harness-only record](2026-10-26-local-validation.md) is historical. Hosted CI results are separate from these recorded local runs.
