# Agent Skills: reusable instructions plus an executable action wrapper

Upstream: [project source](https://github.com/agentskills/agentskills/tree/main/skills-ref). Pins: [versions](../versions.json).

## What runs

The folder contains a SKILL.md package with metadata, instructions and a Node action script. The official skills-ref library validates the package, reads its properties and generates its prompt entry. The script exercises the approved reservation twice.

```sh
npm run ecosystem:demo -- --project agent-skills
npm run ecosystem:proofs -- --project agent-skills
```

## How this can use and benefit from Zeko

A portable skill can teach different agents how to request bounded work, interpret receipts and stop on rejection. The authority comes from the existing mission and acceptance service, rather than from installing skill text.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Reference validation and metadata/prompt generation pass; the packaged script consumes the approved action once; replay cannot dispatch another effect.

Agent Skills is an instruction/package format with reference validation code. The example validates and executes a companion script; it does not certify behavior of all skill-consuming agents. All capability material is generated for the local fixture and sent through stdin.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
