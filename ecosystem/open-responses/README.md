# Open Responses: tool/result correlation with accepted state

Upstream: [project source](https://github.com/openresponses/openresponses). Pins: [versions](../versions.json).

## What runs

A local non-streaming Responses endpoint emits a function call. The demo validates requests and responses against the official archived OpenAPI schema, executes the approved call through MCP, and returns the accepted receipt as the function output.

```sh
npm run ecosystem:demo -- --project open-responses
npm run ecosystem:proofs -- --project open-responses
```

## How this can use and benefit from Zeko

A provider-neutral response format can carry stable tool call IDs and checkable state evidence across an agent workflow. The application can reject a mismatched call ID or a reported receipt that does not match accepted state.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Selected request/response payloads validate; the accepted receipt digest is correlated; a changed call ID is rejected; repeating the state action cannot dispatch again.

Open Responses is an API specification. This is a schema-validated local implementation of a selected function-tool subset, not a hosted model or full reference compliance suite. The user’s “open resources” reference is interpreted as Open Responses.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
