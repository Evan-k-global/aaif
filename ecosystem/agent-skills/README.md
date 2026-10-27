# Agent Skills: reusable instructions plus an executable action wrapper

Portable skills make open tools accessible across agents. Our Zeko skill packages a bounded state-action workflow while keeping authority with the approving person and enforcing service.

Upstream: [project source](https://github.com/agentskills/agentskills/tree/main/skills-ref). Pins: [versions](../versions.json).

## What runs

The folder contains a SKILL.md package with metadata, instructions and a Node action script. The official skills-ref library validates the package, reads its properties and generates its prompt entry. The script exercises the approved reservation twice.

```sh
npm run ecosystem:demo -- --project agent-skills
npm run ecosystem:proofs -- --project agent-skills
```

## How Agent Skills benefits from Zeko’s agentic internet protocol

Agent Skills packages reusable instructions and resources. Our Zeko example includes a validated skill and an executable action script. The skill describes the workflow; the service enforces the existing mission and approved action.

A team shares one skill for reserving an approved review budget and interpreting its receipt. The package supplies instructions and a client script. Approval and spending authority remain with the principal and service. The validator checks the format; the script submits the exact action through stdin; the state boundary rejects replay.

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

## Development roadmap

Our next milestone is to add trusted-key receipt verification and stable machine-readable accepted, rejected and unknown outcomes to the packaged script. The package will be exercised from an isolated working directory with malformed input, changed amounts and missing approval. A consuming-agent example will provide separate evidence beyond format validation and script execution.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
