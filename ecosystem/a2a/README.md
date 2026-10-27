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

## Development roadmap

Our next A2A example will follow a task from reservation through deterministic delivery to a terminal result. It will map task/context IDs to application commitments and cover duplicate delivery, changed scope and cancellation. A cancelled task will report the status of any already accepted work rather than silently erasing it. Authenticated peer-to-mission mapping is a further integration milestone.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
