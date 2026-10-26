# AGENTS.md: coding-agent instructions for the same state contract

Upstream: [project source](https://github.com/agentsmd/agents.md). Pins: [versions](../versions.json).

## What runs

The workspace contains an AGENTS.md explaining the local action, approval boundary, receipt interpretation, test command and failure handling. Its executable companion reads the artifact and exercises an approved, changed and repeated action.

```sh
npm run ecosystem:demo -- --project agents-md
npm run ecosystem:proofs -- --project agents-md
```

## How this can use and benefit from Zeko

Contributors and coding agents can discover how to preserve authority and state guarantees while maintaining or using a Zeko-backed tool. The instructions make the contract reproducible across coding environments.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

The instruction artifact is present and hashed in evidence; the approved companion action succeeds; changed approval and replay are rejected; there is one protected effect.

AGENTS.md is Markdown guidance, not a network protocol or a settlement engine. There is no formal parser or language-model behavior certification in this example. The companion demonstrates the described state action; it does not claim to prove that every coding agent follows the document.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
