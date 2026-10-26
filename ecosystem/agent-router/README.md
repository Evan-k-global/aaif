# Agent Router: native Envoy routes with shared action state

Upstream: [project source](https://github.com/theagentrouter/agent-router). Pins: [versions](../versions.json).

## What runs

The pinned aigw CLI runs its actual external processor and native Envoy. Its model backend is the deterministic loopback chat fixture, and its MCP backend is the same preapproved reservation service. The client discovers the routed tool and invokes it.

```sh
npm run ecosystem:demo -- --project agent-router
npm run ecosystem:proofs -- --project agent-router
```

## How this can use and benefit from Zeko

A control plane can route model/tool traffic while independently operated state services maintain consistent quotas and commitments. Provider and routing choices retain the same application acceptance boundary.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Local inference routing and MCP tool discovery succeed; an approved action is accepted once; changed arguments and replay fail; one effect consumes the shared quota.

Envoy is prepared and checksum-pinned during setup; runtime pins its version and cannot download a new one. The demo reserves local port 1975 and cleans up the child processes. It tests one standalone route, not a Kubernetes installation or all gateway identity policies.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
