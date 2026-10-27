# goose: a real agent client with a local model fixture

People choose their agents and models. Our goose integration keeps approved resources and accepted state outside one session, preserving user control across tool interactions.

Upstream: [project source](https://github.com/aaif-goose/goose). Pins: [versions](../versions.json).

## What runs

The pinned native goose CLI loads a real streamable-HTTP MCP extension. A deterministic loopback chat provider returns one tool call, then a final response after goose supplies the tool output. No hosted inference or model weights are used.

```sh
npm run ecosystem:demo -- --project goose
npm run ecosystem:proofs -- --project goose
```

## How goose benefits from Zeko’s agentic internet protocol

goose turns a person's task into model and tool interactions. Zeko keeps consequential authority and accepted state outside the session. The working example uses the real goose CLI and MCP extension against a bounded action service.

A person authorizes bounded review work. goose discovers the MCP tool, requests a reservation and receives state evidence. The service checks the mission and remaining quota before accepting the action. Authority stays with the person and enforcing service; the model proposes the tool call.

| Integration point | goose responsibility | Zeko application responsibility |
| --- | --- | --- |
| User task | Translate the task into a tool request | Preserve the approved scope, resource and expiry |
| Provider choice | Run the selected model/provider integration | Keep authority and state acceptance independent of that choice |
| Tool dispatch | Invoke the MCP extension and consume its result | Enforce one accepted action and return a receipt |
| Restart or handoff | Restore or transfer workflow context | Reconcile the existing action instead of spending twice |

The real goose CLI and MCP dispatch run here. The chat provider is a deterministic local script, so the demo establishes the integration path rather than model quality or reliable instruction following. The local broker supplies a preapproved synthetic context; native goose ID-JAG integration is not established. The core-backed adapter is the next deployment milestone. Ethereum settlement follows the workflow's acceptance policy.

## Checks and scope

The model fixture is called locally; goose dispatches the real MCP tool; one effect consumes 70 units; a later replay is rejected.

The test runs the actual goose tool-dispatch loop with no default extensions, no persistent session and an isolated configuration directory. Its model output is scripted, so it does not measure model quality or prove an agent will obey every instruction. Native ID-JAG support in goose is not claimed; the local broker supplies the synthetic approved context.

## Development roadmap

Our next milestone is to demonstrate two isolated goose sessions recovering the same task context, with a rejected or previously accepted action explained through tool results. The service will remain responsible for authority enforcement, and the sessions will share one acceptance boundary. This will extend the native tool-dispatch example while retaining the deterministic local provider for reproduction.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
