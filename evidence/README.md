# Reproducible local evidence

Current results, 26 October 2026:

- **21 unit/integration tests passed**, 0 failed/skipped: `npm run test:sandbox`. This includes two network-isolation checks.
- **17 ID-JAG/MCP profile cases and 13 shared-state profile cases passed**, with real proofs in the shared-state profile: [report](sandbox-run-2026-10-26.json).
- **All 10 ecosystem examples passed with real application proofs**, covering 62 scenario checks: [ecosystem report](ecosystem-run-2026-10-26.json). OpenSandbox includes an actual local Docker worker, deny-by-default egress, a blocked connection to a synthetic local canary, result-commitment replay checks and SDK container cleanup.

The ecosystem results distinguish native components, official SDK clients/types, protocol/schema fixtures and instruction-format companions. They are not ten identical claims of full runtime conformance. Start with the [suite overview](../ecosystem/README.md) and [runbook](../ecosystem/RUNBOOK.md).

Source digests recorded in the reports:

- Compatibility profiles: `9680ac8469e8bd3265a79161e4e516ba688a13f13995fa3b70a7f9add90544d8`.
- Ecosystem examples: `15295be1a9e746460ba6b5c646aa748a4afdd020d8e51043d7684c51818a360f`.

The reports include exact source-file lists, environment, case results and scope. They do not export temporary credentials. The core candidate and its independent upstream build are recorded [separately](core-candidate-2026-10-26.md).

Reproduce with Node.js 24, Python 3.12+, a running local Docker daemon and the native suite's documented macOS arm64 prerequisites:

```sh
npm ci --ignore-scripts
npm run test:sandbox
npm run sandbox:evidence
npm run ecosystem:setup -- --docker
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json
```

The local authority is a serialized application model; the provider and external effects are controlled fixtures. No commercial identity-provider, Zeko core sequencer/DA deployment, Ethereum settlement or arbitrary worker-execution guarantee is claimed. The [earlier harness-only record](2026-10-26-local-validation.md) is historical. Hosted CI results are separate from these recorded local runs.
