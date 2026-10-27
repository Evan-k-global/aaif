# Agent Skills: reusable instructions plus an executable action wrapper

Upstream: [project source](https://github.com/agentskills/agentskills/tree/main/skills-ref). Pins: [versions](../versions.json).

## What runs

The folder contains a SKILL.md package with metadata, instructions and a Node action script. The official skills-ref library validates the package, reads its properties and generates its prompt entry. The script exercises the approved reservation twice.

```sh
npm run ecosystem:demo -- --project agent-skills
npm run ecosystem:proofs -- --project agent-skills
```

## How Agent Skills can benefit from Zeko as an agentic internet protocol

Agent Skills packages reusable instructions and supporting resources for different agent implementations. A Zeko-oriented skill can make bounded, verifiable state actions easier to discover and use: how to request work, what evidence to expect, how to interpret a rejection and when to stop or reconcile. The skill supplies a portable workflow; authority still comes from the principal's approved mission and the enforcing service.

For example, a team can share one skill for reserving an approved review budget and checking its receipt. Installing that package should not create a wallet, grant spending authority or authorize arbitrary tool parameters. The working package demonstrates the separation: the reference validator checks the skill format, the packaged Node script consumes a synthetic action supplied through stdin, and replay is rejected by the state boundary.

| Integration point | Agent Skills responsibility | Zeko application responsibility |
| --- | --- | --- |
| Discovery | Describe when the skill is useful | Expose the available state-action capability and its limits |
| Instructions | Teach the invocation and rejection/recovery workflow | Specify required approval, domain and evidence checks |
| Supporting script | Package a reproducible tool client | Submit only the exact approved action and interpret its receipt |
| Portability | Let different agents consume the same skill | Keep state/authority rules consistent across those clients |

A skill can help personal agents participate in shared-state applications without coupling their instructions to one model vendor. Zeko's role is the enforcing application protocol behind the action, not trust in the skill's prose. The current package has actual format validation and script execution, but no live skill-consuming agent behavior test. Its proof covers the accepted reservation; it does not prove that an agent read or obeyed every instruction.

## Checks and scope

Reference validation and metadata/prompt generation pass; the packaged script consumes the approved action once; replay cannot dispatch another effect.

Agent Skills is an instruction/package format with reference validation code. The example validates and executes a companion script; it does not certify behavior of all skill-consuming agents. All capability material is generated for the local fixture and sent through stdin.

## Continue this integration

**Next runnable milestone: receipt verification and a safe rejected-action workflow in the packaged skill.** Make the companion expose accepted, rejected and unknown outcomes in a stable machine-readable form.

1. Update [`skills/zeko-state-actions/SKILL.md`](skills/zeko-state-actions/SKILL.md) and [`skills/zeko-state-actions/scripts/reserve.mjs`](skills/zeko-state-actions/scripts/reserve.mjs) together. Keep secret/capability input on stdin, never in committed examples or command-line arguments.
2. Extend [`demo.mjs`](demo.mjs) and [`validate.py`](validate.py) to cover changed amounts, malformed input, missing approval and rejection handling. Add proof verification against a trusted key supplied by the caller, not a key accepted from the receipt itself.
3. Verify the package from a fresh isolated working directory, then add one explicitly configured consuming-agent fixture as a separate test. If the package becomes generally useful, move reusable behavior to its canonical owning repository and keep cross-project cases here.

**Done when:** reference validation still passes, the packaged script runs without relying on this developer's machine paths, invalid inputs cannot dispatch an action, and the agent-facing instructions accurately describe rejection and reconciliation.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project agent-skills
npm run ecosystem:proofs -- --project agent-skills --report .cache/ecosystem/agent-skills-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
