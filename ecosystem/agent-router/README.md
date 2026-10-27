# Agent Router: native Envoy routes with shared action state

Provider choice requires a stable authority boundary. Our Agent Router integration separates model/tool routing from approved resource consumption, preserving operator sovereignty.

Upstream: [project source](https://github.com/theagentrouter/agent-router). Pins: [versions](../versions.json).

## What runs

The pinned aigw CLI runs its actual external processor and native Envoy. Its model backend is the deterministic loopback chat fixture, and its MCP backend is the same preapproved reservation service. The client discovers the routed tool and invokes it.

```sh
npm run ecosystem:demo -- --project agent-router
npm run ecosystem:proofs -- --project agent-router
```

## How Agent Router benefits from Zeko’s agentic internet protocol

Agent Router supplies the control plane for model and tool traffic. Zeko supplies verifiable application state behind the tools. Routing chooses where a request goes; the protected service decides whether its exact action is authorized and accepted.

For example, a model route can propose a tool action, and a separate MCP route can deliver it to a stateful service. Zeko's role is to make the consequential reservation or work commitment checkable across participants. The router's role remains routing and control. This demo uses the actual `aigw` process and Envoy, verifies local model routing, discovers the routed MCP tool and demonstrates that changed/repeated requests do not gain new authority.

| Integration point | Agent Router responsibility | Zeko application responsibility |
| --- | --- | --- |
| Model routes | Select and proxy the inference backend | Keep application authority outside provider-generated text |
| Tool routes | Advertise and forward MCP capabilities | Maintain one action/receipt contract across backends |
| Provider or route changes | Change traffic placement | Preserve the action ID, domain and required acceptance level |
| Operational visibility | Expose routing health and request correlation | Report accepted versus rejected state transitions and receipt references |

Provider portability is useful only if failover does not silently change the approved action or duplicate external work. Proof verification and authoritative state acceptance belong at the protected service boundary. The local example does not demonstrate a Kubernetes deployment, router-native enterprise authorization or deployed Zeko consensus. Those are separately testable profiles, rather than properties inherited from using Envoy.

## Checks and scope

Local inference routing and MCP tool discovery succeed; an approved action is accepted once; changed arguments and replay fail; one effect consumes the shared quota.

Envoy is prepared and checksum-pinned during setup; runtime pins its version and cannot download a new one. The demo reserves local port 1975 and cleans up the child processes. It tests one standalone route, not a Kubernetes installation or all gateway identity policies.

## Development roadmap

Our next example will exercise controlled route failover after a lost response. Model and MCP routing will preserve the original action and state domain while the client reconciles the outcome before retrying. We will test changed approvals and unknown outcomes alongside failover, using the existing pinned Envoy runtime.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
