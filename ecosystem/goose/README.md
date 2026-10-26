# goose: a real agent client with a local model fixture

Upstream: [project source](https://github.com/aaif-goose/goose). Pins: [versions](../versions.json).

## What runs

The pinned native goose CLI loads a real streamable-HTTP MCP extension. A deterministic loopback chat provider returns one tool call, then a final response after goose supplies the tool output. No hosted inference or model weights are used.

```sh
npm run ecosystem:demo -- --project goose
npm run ecosystem:proofs -- --project goose
```

## How this can use and benefit from Zeko

A person can choose an agent/model provider while keeping approved resources and state acceptance outside a single agent session. Replacing the client does not require replacing the state-action contract.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

The model fixture is called locally; goose dispatches the real MCP tool; one effect consumes 70 units; a later replay is rejected.

The test runs the actual goose tool-dispatch loop with no default extensions, no persistent session and an isolated configuration directory. Its model output is scripted, so it does not measure model quality or prove an agent will obey every instruction. Native ID-JAG support in goose is not claimed; the local broker supplies the synthetic approved context.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
