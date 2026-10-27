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

Open Responses is an API specification. This is a schema-validated local implementation of a selected function-tool subset, not a hosted model or full reference compliance suite. The user’s “open resources” reference is interpreted as Open Responses.

## Continue this integration

**Next runnable milestone: multiple calls with independent receipt verification.** Replace hard-coded `resp_local`/`call_local` values with a bounded local call registry and explicit call-to-action bindings.

1. Extend [`demo.mjs`](demo.mjs). Track response ID, call ID, tool name, normalized arguments and expected action commitment; validate against the pinned archived schema rather than a fetched runtime schema.
2. Test two calls, swapped outputs, a structurally valid but unaccepted receipt, an altered receipt and a repeated call ID. Add separate-process proof checking using the trusted-key pattern in [`../../sandbox/verify-receipt.mjs`](../../sandbox/verify-receipt.mjs).
3. Keep streaming and broader API coverage as later, versioned profiles. Do not advertise full compliance based on this non-streaming function-tool subset.

**Done when:** each output is bound to exactly its own call/action, swapping or changing evidence fails, an independent verifier rejects wrong-key/wrong-statement proofs, and no invalid output creates another state effect.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project open-responses
npm run ecosystem:proofs -- --project open-responses --report .cache/ecosystem/open-responses-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
