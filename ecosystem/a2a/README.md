# A2A: agent exchanges tied to a commitment

Independent agents need open communication and bounded authority. Our A2A example links agent requests to one accepted commitment, preserving human control across operators.

Upstream: [project source](https://github.com/a2aproject/a2a-js). Pins: [versions](../versions.json).

## What runs

The official A2A SDK discovers an agent card and exchanges JSON-RPC messages with a local agent executor. The executor submits a preapproved action to the common authority and returns its result. A second message repeats the action.

```sh
npm run ecosystem:demo -- --project a2a
npm run ecosystem:proofs -- --project a2a
```

## How A2A benefits from Zeko’s agentic internet protocol

A2A connects independently operated agents. Zeko supplies shared application state for work commitments, resource reservations and accepted results. Agent operators keep their own models, tools and internal processes while verifying the same application rules.

A cross-agent review task links agreed scope, work references and delivery evidence. Repeated messages retain the original action reference; changed scope requires new approval. The working example tests the reservation boundary: two A2A messages reach the executor, one action is accepted and one protected effect occurs.

| Integration point | A2A responsibility | Zeko application responsibility |
| --- | --- | --- |
| Discovery | Agent card and advertised skills | Describe the application's state/receipt capability |
| Work exchange | Message, context and task references | Bind an authorized action to the agreed work reference |
| Task progress | Transport and task-lifecycle semantics | Record only transitions that require shared acceptance |
| Delivery | Return artifacts or structured results | Correlate a result commitment with accepted application state |

Task IDs identify the A2A workflow; action IDs identify state changes. The integration requires an explicit mapping between them. The current route uses a trusted local AMBA context without peer authentication. Authenticated peer-to-mission mapping is the next identity milestone.

## Checks and scope

Two wire messages reach the executor; only one commitment is accepted; the repeated action is rejected and cannot dispatch another effect.

This is a native v1 SDK client/server exchange with a synthetic agent, not a language-model worker. It exercises a narrow message/action scenario rather than the whole long-running task, cancellation or push-notification lifecycle.

## Development roadmap

Our next A2A example will follow a task from reservation through deterministic delivery to a terminal result. It will map task/context IDs to application commitments and cover duplicate delivery, changed scope and cancellation. A cancelled task will report the status of any already accepted work rather than silently erasing it. Authenticated peer-to-mission mapping is a further integration milestone.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
