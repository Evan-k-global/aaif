# Engineering progress

We deliver open infrastructure for AI freedom, sovereignty and privacy. This record documents completed engineering work and measured results.

## 26 October 2026

We published a review package for Zeko's proposed AAIF Sandbox contribution: an open-source agentic rollup protocol for verifiable shared state across agent applications.

- Built an HTTPS identity/MCP reference integration using canonical AMBA OAuth, ID-JAG exchanges, signed holder-bound actions and real o1js application proofs.
- Recorded 17 identity-profile and 13 shared-state cases, plus 21 unit/integration tests. Cases cover concurrency, replay, changed inputs, incorrect context, invalid proofs and independent receipt verification.
- Added dedicated examples for all ten hosted AAIF projects. The real-proof suite passes 62 checks, with native, SDK, schema and instruction-format evidence identified separately.
- Ran actual OpenSandbox SDK/server/execd Docker execution with pinned images, worker limits, deny-by-default egress, a synthetic local canary, result-commitment checks and cleanup.
- Published project-specific Zeko integration explanations, reproduction commands, measured scope and development roadmaps, plus the shared architecture and compatibility matrix.
- Recorded the core candidate [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed) and its [passing core CI](https://github.com/zeko-labs/zeko/actions/runs/40358110682), separately from local integration evidence.

Our [evidence index](evidence/README.md) contains source-digested results and exact scope. These local runs use synthetic identity/model fixtures and a local application authority; they do not represent a deployed core rollup or Ethereum settlement run.

The [application](application.md) is a review draft. Our next engineering priorities are independent reproduction, recovery/reconciliation and a core-backed acceptance adapter. See the [roadmap](project-plan.md).
