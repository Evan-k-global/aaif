# MCP: shared state through a tool interface

MCP keeps agent tools open. Our Zeko integration enforces bounded resource use and returns verifiable receipts. People retain control of delegated authority across clients.

Upstream: [project source](https://github.com/modelcontextprotocol/typescript-sdk). Pins: [versions](../versions.json).

## What runs

The official MCP SDK exposes and invokes the reservation tool. Two independent client registrations submit conflicting reservations against a shared quota, then replay an action.

```sh
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp
```

## How MCP benefits from Zeko’s agentic internet protocol

MCP makes tools discoverable and callable across agent clients. Zeko supplies the shared application-state layer behind consequential tool actions. The service checks the approved authority, accepts a valid transition and returns a receipt. Resource reservations and work commitments persist beyond a client connection.

Consider two agents trying to reserve the last available compute or review budget. Independent client counters can both approve the request. The shared authority must order the competing transitions and accept only the valid consumption. This demo exercises that outcome with two distinct client registrations: two 70-unit requests compete for 100 units, exactly one succeeds, and the remaining quota is 30. The next deployment milestone connects this interface to core Zeko acceptance and independent state reads.

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

## Development roadmap

Our next milestone is to add authorized receipt/status lookup so a client can reconnect after a dropped response and recover the original accepted result. The extension will preserve action identity, reject cross-tenant/domain reads and demonstrate that reconciliation does not consume the budget twice. Persistence across authority restarts is part of our shared recovery work.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
