# MCP: shared state through a tool interface

Upstream: [project source](https://github.com/modelcontextprotocol/typescript-sdk). Pins: [versions](../versions.json).

## What runs

The official MCP SDK exposes and invokes the reservation tool. Two independent client registrations submit conflicting reservations against a shared quota, then replay an action.

```sh
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp
```

## How this can use and benefit from Zeko

Tool providers and clients can agree on bounded resource consumption instead of keeping unrelated client-side counters. The same accepted receipt can be checked by another participant.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Tool discovery; one winner for conflicting 70-unit reservations against a 100-unit resource; remaining quota 30; replay rejection; one protected effect.

The example runs real MCP transports and the common AMBA backend. Both clients use the same SDK. In proof mode, accepted reservations carry real application proofs. Deployed Zeko state acceptance and other client implementations remain separate validation.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
