# Integration architecture

Human control is the governing rule of this architecture. Approved authority gates consequential actions; verifiable receipts record accepted state. We built the shared interface to preserve open interoperability and independent operation across agent systems.

We built the [AAIF ecosystem examples](README.md) around one shared application boundary: an approved action changes a resource state, and the caller receives evidence of the accepted transition. Each project keeps its own role in discovery, transport, execution, routing or instructions. Zeko provides the proposed verifiable shared-state layer behind those interfaces.

## Components

| Component | Implementation | Role |
| --- | --- | --- |
| Project adapters | Each project's `demo.mjs`, with Python or packaged scripts where appropriate | Exercise the actual native component, SDK or format |
| Local broker | [`_shared/runtime.mjs`](_shared/runtime.mjs) | Bind synthetic approvals to exact actions and expose the MCP/Python/script interfaces |
| Process isolation | [`_shared/process.mjs`](_shared/process.mjs), [`_shared/network.mjs`](_shared/network.mjs) | Isolated configuration, local transport, bounded execution and cleanup |
| Identity and mission checks | [`../sandbox/amba-gate.mjs`](../sandbox/amba-gate.mjs), [`../integrations/id-jag/README.md`](../integrations/id-jag/README.md) | Canonical AMBA OAuth and holder checks, plus ID-JAG resource access |
| State authority | [`../sandbox/server.mjs`](../sandbox/server.mjs) | Serialize reservations, check quota/replay and record accepted transitions |
| Application proof | [`../sandbox/proof.mjs`](../sandbox/proof.mjs) | Prove reservation arithmetic/version advancement and bind public commitments |
| Independent verification | [`../sandbox/verify-receipt.mjs`](../sandbox/verify-receipt.mjs) | Check the proof and expected statement under a trusted verification key |
| Compatibility profiles | [`../tck/README.md`](../tck/README.md) | Test the declared identity and shared-state boundaries |

The broker is test orchestration. The current authority is a local single-writer application model; it is not a deployed core sequencer or data-availability network. Each project runs against a fresh state domain and synthetic client contexts.

## Action and receipt contract

The local integration seam is deliberately small. It is our reference interface, rather than a proposed change to every upstream AAIF protocol.

| Operation | Behavior |
| --- | --- |
| `runtime.approve(actionId, units, { actor })` | Bind exact units and an action ID to an existing synthetic client's signed AMBA context |
| `runtime.reserve({ actionId, units })` | Check the approval and invoke the protected MCP/AMBA service |
| MCP `reserve_resource` | Expose the action through the official MCP SDK |
| `POST /action` | Bridge local Python and packaged scripts using an ephemeral fixture bearer |
| `GET /state` | Observe remaining quota, accepted count and version in the local fixture |

Accepted actions return `{ ok: true, receipt }`. The receipt contains the domain, action commitment, version, remaining quota, outcome and evidence level. Proof mode also supplies the proof and public statement. Rejected actions return `ok: false` with the enforcement boundary that rejected them.

The receipt's `actionCommitment` binds mission, action ID and boundary-event context; it is not the raw action ID. OpenSandbox additionally commits the job input, worker image and verified output through its approved action reference. A versioned canonical encoding is part of the cross-language adapter roadmap.

## Authorization, proof and acceptance

Our service checks current access and AMBA mission/holder constraints before accepting a protected action. The small circuit separately proves positive reservation units, quota subtraction and version advancement, with public domain/action commitments. Authorization is enforced by the service rather than proved inside that circuit.

Verification uses the expected statement and a trusted key supplied independently of the receipt. Proof validity does not by itself select a canonical history, establish data availability or confirm Ethereum finality. These are separate deployment properties.

Stable action references support replay prevention and recovery. An unknown external outcome requires reconciliation before another dispatch. The local protected-effect counter demonstrates this boundary; durable external execution needs its own dispatch and recovery design.

The current reservation fields are public. Private application state, hardware confidentiality and correct execution of arbitrary worker code require additional statements and threat models. Our examples identify the exact evidence they provide.

## Core Zeko and Ethereum integration

The next common backend milestone connects the same application contract to accepted state in [core Zeko](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko). We plan to preserve the client interfaces while recording the deployment identity, state domain, expected verification key and required acceptance stage.

That adapter will distinguish submission, authoritative acceptance, rejection and unknown/reconciling outcomes. Independent reads will use the deployment's actual state/data-availability path. Competing submissions, stale state, process restarts and interrupted responses are central recovery cases.

Ethereum is our principal blockchain compatibility, settlement and bridging focus. The [sovereign-rollup operator guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) describes deployment options. Ethereum verification/settlement will have a separately recorded profile with its exact verifier configuration. Sovereign application acceptance need not require settlement for every tool call.

## Reproduction and evidence

The [runbook](RUNBOOK.md) covers Node.js 24, Python 3.12+, the tested macOS arm64 platform and local Docker for OpenSandbox. Dependencies, native binaries, schemas and OCI images have exact [version pins](versions.json), [checksums](binaries.json) and [image references](opensandbox/images.json).

```sh
npm ci --ignore-scripts
npm run ecosystem:setup -- --docker
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json
```

Reports identify each component's evidence level, named checks, accepted/effect counts, remaining quota, proof status and combined source digest. Current scenarios accept one action and leave 30 of 100 resource units. The [evidence index](../evidence/README.md) records the published runs.

Our [development roadmap](README.md#development-roadmap) covers receipt lookup, task lifecycle, multi-client recovery, route failover, result verification and core-backed acceptance. Contributions and independent reproductions are welcome through the [public contribution process](../CONTRIBUTING.md).
