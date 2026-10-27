# agentgateway: native routing to the action service

Upstream: [project source](https://github.com/agentgateway/agentgateway). Pins: [versions](../versions.json).

## What runs

The pinned native gateway proxies HTTP MCP requests to the loopback action broker. The official MCP client discovers and calls the routed tool, then changes the units and replays the original action.

```sh
npm run ecosystem:demo -- --project agentgateway
npm run ecosystem:proofs -- --project agentgateway
```

## How agentgateway can benefit from Zeko as an agentic internet protocol

agentgateway sits on the request path between agents, tools and services. Zeko can give the services behind those routes a common application-state boundary, so quotas and commitments remain consistent when requests arrive through different routes or gateway instances. Routing, access policy and accepted shared state can then have explicit, complementary responsibilities.

Imagine two departments using different gateway endpoints to access the same pool of agent services. A per-route counter could create two apparent budgets. A common Zeko-backed application can instead apply the same reservation rules regardless of the ingress route. The current native gateway example shows that routing preserves the backend's approved action: the initial request succeeds, changed units fail and replay cannot dispatch again.

| Integration point | agentgateway responsibility | Zeko application responsibility |
| --- | --- | --- |
| Ingress and routing | Expose and route the MCP service | Identify the application state domain behind the service |
| Identity policy | Authenticate/authorize according to gateway configuration | Verify the downstream mission and exact action context |
| Admission | Apply gateway-level traffic/resource policy | Enforce shared state-dependent admission before the protected effect |
| Observability | Correlate routed requests and responses | Return an accepted-state receipt that can be correlated without exposing credentials |

A successful proxy response is not proof of accepted state. Conversely, a valid proof is not proof that gateway identity policy was configured correctly. The gateway does not generate the application proof in this demo; the backend does. The current gateway configuration tests HTTP routing, while enterprise policy and identity-context propagation remain additional work. Keeping that boundary explicit allows gateway operators to adopt shared-state tools without making every routed service depend on a rollup.

## Checks and scope

Routed MCP discovery/call succeeds; changed action and replay fail; exactly one effect is dispatched. The backend verifies a real proof when proof mode is selected.

This tests the HTTP routing path and backend enforcement. The gateway does not generate the proof, and its own enterprise identity policies are not configured or certified here. The AMBA/ID-JAG backend and synthetic broker have separate roles.

## Development roadmap

We plan to route competing requests through two independent local gateway instances backed by one state authority. The example will test shared quota, cross-route retry and explicit identity-context mapping. Success will mean that route changes preserve the same accepted action and cannot create a second copy of the budget.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
