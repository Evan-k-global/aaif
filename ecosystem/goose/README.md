# goose: a real agent client with a local model fixture

Upstream: [project source](https://github.com/aaif-goose/goose). Pins: [versions](../versions.json).

## What runs

The pinned native goose CLI loads a real streamable-HTTP MCP extension. A deterministic loopback chat provider returns one tool call, then a final response after goose supplies the tool output. No hosted inference or model weights are used.

```sh
npm run ecosystem:demo -- --project goose
npm run ecosystem:proofs -- --project goose
```

## How goose can benefit from Zeko as an agentic internet protocol

goose is an agent client that can turn a person's task into model/tool interactions. Zeko can keep consequential authority and accepted application state outside one goose session or model provider. A personal agent can change models, restart or hand work to another client while using the same bounded task and shared acceptance rules.

For example, a user could authorize a limited amount of external review work. goose discovers the relevant MCP tool, asks for a reservation and receives state evidence. The tool service decides whether the mission and remaining quota permit it. The model's request is a proposal to act; it is not itself permission. This makes a verifiable shared-state service useful even when the agent's reasoning and user interface remain entirely within goose.

| Integration point | goose responsibility | Zeko application responsibility |
| --- | --- | --- |
| User task | Translate the task into a tool request | Preserve the approved scope, resource and expiry |
| Provider choice | Run the selected model/provider integration | Keep authority and state acceptance independent of that choice |
| Tool dispatch | Invoke the MCP extension and consume its result | Enforce one accepted action and return a receipt |
| Restart or handoff | Restore or transfer workflow context | Reconcile the existing action instead of spending twice |

The real goose CLI and MCP dispatch run here. The chat provider is a deterministic local script, so the demo establishes the integration path rather than model quality or reliable instruction following. The local broker supplies a preapproved synthetic context; native goose ID-JAG integration is not established. A Zeko deployment would replace the local state authority behind the tool, with Ethereum settlement available only when the workflow's acceptance policy requires it.

## Checks and scope

The model fixture is called locally; goose dispatches the real MCP tool; one effect consumes 70 units; a later replay is rejected.

The test runs the actual goose tool-dispatch loop with no default extensions, no persistent session and an isolated configuration directory. Its model output is scripted, so it does not measure model quality or prove an agent will obey every instruction. Native ID-JAG support in goose is not claimed; the local broker supplies the synthetic approved context.

## Continue this integration

**Next runnable milestone: a two-session handoff with rejection visible to the agent.** Have a second isolated goose invocation encounter the first session's accepted action and report the prior outcome without another effect.

1. Extend [`demo.mjs`](demo.mjs) and the scripted provider in [`../_shared/model-fixture.mjs`](../_shared/model-fixture.mjs). Keep `--no-profile`, explicit extension selection and the isolated goose configuration directory.
2. Add a scripted changed-amount request followed by a safe terminal response. Verify rejection at the service, rather than interpreting natural-language output as proof that the agent was constrained.
3. Add explicit receipt/status tooling for restart recovery before testing real model variation. A real provider run is a separately authorized profile; it must not be enabled by reading an existing user API key.

**Done when:** both native sessions run against local fixtures, the second obtains an explainable prior/rejected result, exactly one protected effect occurs, and no session/provider choice widens the approved action.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project goose
npm run ecosystem:proofs -- --project goose --report .cache/ecosystem/goose-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
