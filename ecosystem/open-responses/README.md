# Open Responses: tool/result correlation with accepted state

Upstream: [project source](https://github.com/openresponses/openresponses). Pins: [versions](../versions.json).

## What runs

A local non-streaming Responses endpoint emits a function call. The demo validates requests and responses against the official archived OpenAPI schema, executes the approved call through MCP, and returns the accepted receipt as the function output.

```sh
npm run ecosystem:demo -- --project open-responses
npm run ecosystem:proofs -- --project open-responses
```

## How Open Responses can benefit from Zeko as an agentic internet protocol

Open Responses gives implementations a common response format, including function-call and function-output exchanges. Zeko can make consequential tool outputs refer to accepted application state rather than relying only on model-generated claims. This is useful when a workflow crosses response providers or when another participant needs to verify what a reported result actually represents.

Consider an agent that reports a reservation as complete. The response format can preserve the function `call_id`, while the tool output includes a receipt for the corresponding accepted action. A consumer should validate both the API-level correlation and the application evidence. The local example checks its chosen schema subset, submits the real action through MCP and accepts a follow-up output only when its receipt matches the local accepted record. A changed call ID is rejected.

| Integration point | Open Responses responsibility | Zeko application responsibility |
| --- | --- | --- |
| Request/response structure | Define interoperable API payloads | Define the application-specific tool and result schema |
| Function invocation | Correlate function name, arguments and `call_id` | Bind the approved action to exact application inputs |
| Function output | Carry structured tool output | Supply receipt/proof references and acceptance status |
| Consumer verification | Validate API shape and call correlation | Check the trusted key, state domain and authoritative receipt |

Call correlation and shared-state acceptance are distinct checks: valid JSON is not accepted state, and an accepted receipt must not be attached to an unrelated call. The fixture currently correlates one local call and one receipt, using an in-memory accepted-record comparison. A production verifier needs independently supplied trust configuration and the exact expected statement. No Open Responses specification change, global on-chain transcript or hosted model is required by this example.

## Checks and scope

Selected request/response payloads validate; the accepted receipt digest is correlated; a changed call ID is rejected; repeating the state action cannot dispatch again.

Open Responses is an API specification. This is a schema-validated local implementation of a selected function-tool subset, not a hosted model or full reference compliance suite.

## Development roadmap

We plan to extend the example to multiple function calls with explicit response/call/action bindings and independent receipt verification. Tests will cover swapped outputs, changed evidence, unaccepted receipts and repeated call IDs. Streaming and broader API coverage will have separate profiles so the evidence identifies the exact supported subset.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
