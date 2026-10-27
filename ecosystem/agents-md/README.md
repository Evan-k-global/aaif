# AGENTS.md: coding-agent instructions for the same state contract

Open development requires clear, reproducible project guidance. This AGENTS.md example documents bounded state actions and verifies their behavior with an executable companion.

Upstream: [project source](https://github.com/agentsmd/agents.md). Pins: [versions](../versions.json).

## What runs

The workspace contains an AGENTS.md explaining the local action, approval boundary, receipt interpretation, test command and failure handling. Its executable companion reads the artifact and exercises an approved, changed and repeated action.

```sh
npm run ecosystem:demo -- --project agents-md
npm run ecosystem:proofs -- --project agents-md
```

## How AGENTS.md benefits from Zeko’s agentic internet protocol

AGENTS.md supplies repository instructions for coding agents. Our example documents the authority boundary, reproduction command and receipt semantics. Zeko supplies the enforcing state behavior; the companion checks the approved, changed and repeated action paths.

The example documents three concrete rules: the service owns the budget, unknown outcomes require reconciliation, and proof verification uses a trusted key. The companion tests the application contract. Instructions describe the rules; the service enforces them.

| Integration point | AGENTS.md responsibility | Zeko application responsibility |
| --- | --- | --- |
| Repository orientation | Point to code, commands and ownership | Define the actual state/authority implementation |
| Change guidance | Explain invariants and review expectations | Enforce them independently of whether instructions are followed |
| Reproduction | Name the local profile and evidence to regenerate | Produce checkable receipts and failure-case results |
| Handoff | State what is implemented and the next bounded task | Keep planned deployment features distinct from demonstrated guarantees |

This folder is an instruction-format example with an executable companion, not a new transport standard. The companion reads and hashes the fixture document, then demonstrates the approved/changed/repeated action behavior. It does not run a language-model coding agent or prove universal instruction compliance. The nested workspace document is the example artifact used by this demo.

## Checks and scope

The instruction artifact is present and hashed in evidence; the approved companion action succeeds; changed approval and replay are rejected; there is one protected effect.

AGENTS.md is Markdown guidance, not a network protocol or a settlement engine. There is no formal parser or language-model behavior certification in this example. The companion demonstrates the described state action; it does not claim to prove that every coding agent follows the document.

## Development roadmap

Our next milestone is to exercise the example with an explicitly identified coding-agent consumer performing a bounded maintenance task. Verification will assess the resulting implementation and its acceptance/rejection behavior separately from document presence. This will extend the current companion example without treating instructions themselves as an authorization or enforcement mechanism.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
