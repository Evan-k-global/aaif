# AGENTS.md: coding-agent instructions for the same state contract

Upstream: [project source](https://github.com/agentsmd/agents.md). Pins: [versions](../versions.json).

## What runs

The workspace contains an AGENTS.md explaining the local action, approval boundary, receipt interpretation, test command and failure handling. Its executable companion reads the artifact and exercises an approved, changed and repeated action.

```sh
npm run ecosystem:demo -- --project agents-md
npm run ecosystem:proofs -- --project agents-md
```

## How AGENTS.md can benefit from Zeko as an agentic internet protocol

AGENTS.md gives coding agents repository-specific instructions. It can make a Zeko integration easier to maintain across contributors by naming the authority boundary, exact reproduction commands, evidence requirements and rules for handling accepted or unknown outcomes. This is valuable when many personal or organizational agents work on the same tools and applications.

For example, an agent modifying a reservation tool should learn that client-side counters are not authoritative, a timeout is not permission to dispatch again and the proof key must come from trusted configuration. Putting those constraints beside the code helps the next agent preserve the application contract while adding features. Zeko supplies the enforcing state/permission behavior; AGENTS.md helps agents find and work with it correctly.

| Integration point | AGENTS.md responsibility | Zeko application responsibility |
| --- | --- | --- |
| Repository orientation | Point to code, commands and ownership | Define the actual state/authority implementation |
| Change guidance | Explain invariants and review expectations | Enforce them independently of whether instructions are followed |
| Reproduction | Name the local profile and evidence to regenerate | Produce checkable receipts and failure-case results |
| Handoff | State what is implemented and the next bounded task | Keep planned deployment features distinct from demonstrated guarantees |

This folder is an instruction-format example with an executable companion, not a new transport standard. The companion reads and hashes the fixture document, then demonstrates the approved/changed/repeated action behavior. It does not run a language-model coding agent or prove universal instruction compliance. The real contributor instructions for this ecosystem live in [`../AGENTS.md`](../AGENTS.md); the nested workspace document is a demo artifact with its own scope.

## Checks and scope

The instruction artifact is present and hashed in evidence; the approved companion action succeeds; changed approval and replay are rejected; there is one protected effect.

AGENTS.md is Markdown guidance, not a network protocol or a settlement engine. There is no formal parser or language-model behavior certification in this example. The companion demonstrates the described state action; it does not claim to prove that every coding agent follows the document.

## Continue this integration

**Next runnable milestone: a reproducible coding-agent handoff exercise.** Give a fresh local consumer enough information to locate, run and extend the companion while preserving the protected action boundary.

1. Keep the example instructions in [`workspace/AGENTS.md`](workspace/AGENTS.md) aligned with the actual scenario in [`demo.mjs`](demo.mjs). Record which consumer/tool version is used if adding an agent execution profile.
2. Add a small, bounded maintenance task such as exposing a receipt/status read without granting mutation authority. Check the resulting code and executable behavior; a prose assertion that the agent followed instructions is insufficient.
3. Test accepted, changed and repeated actions after the maintenance task. Preserve the document hash in generated evidence, and keep fixture instructions distinguishable from the real repository's contributor rules.

**Done when:** the consumer can reproduce the example from repository-relative instructions, the requested maintenance result passes the action-boundary checks, and the evidence distinguishes document presence, actual agent execution and verified application behavior.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project agents-md
npm run ecosystem:proofs -- --project agents-md --report .cache/ecosystem/agents-md-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
