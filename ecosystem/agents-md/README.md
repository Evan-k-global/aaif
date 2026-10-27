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

This folder is an instruction-format example with an executable companion, not a new transport standard. The companion reads and hashes the fixture document, then demonstrates the approved/changed/repeated action behavior. It does not run a language-model coding agent or prove universal instruction compliance. The nested workspace document is the example artifact used by this demo.

## Checks and scope

The instruction artifact is present and hashed in evidence; the approved companion action succeeds; changed approval and replay are rejected; there is one protected effect.

AGENTS.md is Markdown guidance, not a network protocol or a settlement engine. There is no formal parser or language-model behavior certification in this example. The companion demonstrates the described state action; it does not claim to prove that every coding agent follows the document.

## Development roadmap

We plan to exercise the example with an explicitly identified coding-agent consumer performing a bounded maintenance task. Verification will assess the resulting implementation and its acceptance/rejection behavior separately from document presence. This will extend the current companion example without treating instructions themselves as an authorization or enforcement mechanism.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
