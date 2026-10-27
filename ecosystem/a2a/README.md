# A2A: agent exchanges tied to a commitment

Upstream: [project source](https://github.com/a2aproject/a2a-js). Pins: [versions](../versions.json).

## What runs

The official A2A SDK discovers an agent card and exchanges JSON-RPC messages with a local agent executor. The executor submits a preapproved action to the common authority and returns its result. A second message repeats the action.

```sh
npm run ecosystem:demo -- --project a2a
npm run ecosystem:proofs -- --project a2a
```

## How A2A can benefit from Zeko as an agentic internet protocol

A2A lets separately operated agents discover capabilities and exchange work. The receiving agent may use different models, tools and internal processes from the sender. Zeko can give those parties a common application record for consequential task events: a bounded work commitment, resource reservation, accepted delivery or release condition. They can exchange messages without treating every message as a new state-changing instruction.

A practical example is one agent commissioning another to review a change. The parties can associate the agreed scope and job reference with a shared commitment, then attach delivery evidence to that commitment. A repeated message should refer to existing work, while a changed scope should require a new approval. The local example implements the narrower reservation boundary: two real A2A wire messages reach the executor, but only one action is accepted and one protected effect occurs.

| Integration point | A2A responsibility | Zeko application responsibility |
| --- | --- | --- |
| Discovery | Agent card and advertised skills | Describe the application's state/receipt capability |
| Work exchange | Message, context and task references | Bind an authorized action to the agreed work reference |
| Task progress | Transport and task-lifecycle semantics | Record only transitions that require shared acceptance |
| Delivery | Return artifacts or structured results | Correlate a result commitment with accepted application state |

A2A task identifiers and Zeko action identifiers should have an explicit mapping; they should not be silently treated as interchangeable. Agent discovery is also distinct from authority to spend or commit work. The current A2A route has no peer authentication, and the trusted fixture supplies the AMBA context. Authenticated peer-to-mission mapping is a concrete extension, not an implemented property of this demo.

## Checks and scope

Two wire messages reach the executor; only one commitment is accepted; the repeated action is rejected and cannot dispatch another effect.

This is a native v1 SDK client/server exchange with a synthetic agent, not a language-model worker. It exercises a narrow message/action scenario rather than the whole long-running task, cancellation or push-notification lifecycle.

## Continue this integration

**Next runnable milestone: a task-to-commitment lifecycle.** Replace the single message-action example with a small local task that reserves once, produces a deterministic artifact and reports a terminal result.

1. Extend the executor and `InMemoryTaskStore` wiring in [`demo.mjs`](demo.mjs). Define a mapping from A2A task/context IDs to the application action ID and input/result commitments.
2. Add duplicate delivery, changed-input and cancel-before-acceptance cases. Define cancel-after-acceptance separately: cancelling transport/task work must not silently erase an accepted state transition.
3. Add a synthetic authenticated peer fixture and explicit principal-to-AMBA policy mapping before claiming delegated cross-operator authority. Use the shared boundary rather than bypassing it inside the executor.

**Done when:** task status and the accepted receipt remain correlated, duplicates do not dispatch work twice, changed scope fails without new approval, and cancellation reports what happened to already accepted work. Describe the in-memory task store's restart limitation until persistence is implemented.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project a2a
npm run ecosystem:proofs -- --project a2a --report .cache/ecosystem/a2a-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
