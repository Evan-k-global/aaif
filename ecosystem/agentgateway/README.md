# agentgateway: native routing to the action service

Upstream: [project source](https://github.com/agentgateway/agentgateway). Pins: [versions](../versions.json).

## What runs

The pinned native gateway proxies HTTP MCP requests to the loopback action broker. The official MCP client discovers and calls the routed tool, then changes the units and replays the original action.

```sh
npm run ecosystem:demo -- --project agentgateway
npm run ecosystem:proofs -- --project agentgateway
```

## How this can use and benefit from Zeko

Different routed clients can consume one common application budget with a backend acceptance gate. A route change does not create an independent quota or turn routing success into mission authority.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Routed MCP discovery/call succeeds; changed action and replay fail; exactly one effect is dispatched. The backend verifies a real proof when proof mode is selected.

This tests the HTTP routing path and backend enforcement. The gateway does not generate the proof, and its own enterprise identity policies are not configured or certified here. The AMBA/ID-JAG backend and synthetic broker have separate roles.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
