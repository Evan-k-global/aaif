# MCP: shared state through a tool interface

Upstream: [project source](https://github.com/modelcontextprotocol/typescript-sdk). Pins: [versions](../versions.json).

## What runs

The official MCP SDK exposes and invokes the reservation tool. Two independent client registrations submit conflicting reservations against a shared quota, then replay an action.

```sh
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp
```

## How MCP can benefit from Zeko as an agentic internet protocol

MCP makes tools discoverable and callable across agent clients. When several clients act for the same person, enterprise or swarm, a successful tool invocation also needs an answer to a state question: was this work already accepted, and how much delegated capacity remains? Zeko can provide a shared, verifiable application-state layer behind those tools. A reservation, work commitment or result-acceptance record can then outlive any particular MCP connection.

Consider two agents trying to reserve the last available compute or review budget. Independent client counters can both approve the request. The shared authority must order the competing transitions and accept only the valid consumption. This demo exercises that outcome with two distinct client registrations: two 70-unit requests compete for 100 units, exactly one succeeds, and the remaining quota is 30. A deployed Zeko adapter is the next step toward other operators verifying the accepted state rather than trusting this local writer.

| Integration point | MCP responsibility | Zeko application responsibility |
| --- | --- | --- |
| Discovery and invocation | Advertise the tool and its argument schema | Describe the state domain and required acceptance level |
| Delegation | Carry the client/resource authorization context | Enforce the mission, holder, action and quota at the protected service |
| State change | Deliver the request and response | Accept one permitted transition and return a correlated receipt |
| Verification | Let another client consume the result | Verify the proof under a trusted key and check authoritative acceptance |

The useful interface is a normal tool with a precise result contract; clients need not become blockchain wallets merely to call it. Identity authorization, valid computation, canonical state acceptance and optional Ethereum settlement remain separate decisions. The current proof covers reservation arithmetic/version advancement and public commitments, while AMBA checks authorization in the service.

## Checks and scope

Tool discovery; one winner for conflicting 70-unit reservations against a 100-unit resource; remaining quota 30; replay rejection; one protected effect.

The example runs real MCP transports and the common AMBA backend. Both clients use the same SDK. In proof mode, accepted reservations carry real application proofs. Deployed Zeko state acceptance and other client implementations remain separate validation.

## Continue this integration

**Next runnable milestone: request reconciliation through MCP.** Add a read-only receipt/status tool so a second client can recover the outcome of an action after a dropped response. Reuse the original action ID; a retry must not create another reservation. Persistence across authority restarts is the separate [sandbox recovery milestone](../../sandbox/README.md#agent-handoff-and-next-local-milestone).

1. Extend tool registration in [`../_shared/runtime.mjs`](../_shared/runtime.mjs) and the scenario in [`demo.mjs`](demo.mjs). Keep protected state mutation in [`../../sandbox/server.mjs`](../../sandbox/server.mjs); do not move it into client code.
2. Test accepted, unknown and rejected action IDs, two authorized clients reading the same accepted receipt, denied cross-tenant/domain lookups and repeated submission after reconciliation. Define read authorization explicitly; do not infer authorization to retry from a transport error.
3. Keep a later core-backed adapter behind the same tool contract. Identify the deployed state domain, trusted verification key and acceptance policy before allowing it to release an external effect.

**Done when:** an authorized client can reconnect, retrieve the original accepted result, verify its proof in proof mode and demonstrate unchanged quota/version/effect count after retry; an unauthorized reader cannot retrieve it. Keep all existing concurrency and replay checks passing.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp --report .cache/ecosystem/mcp-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
