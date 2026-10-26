# agentgateway: routed access to a shared-state service

**Upstream role.** [agentgateway](https://github.com/agentgateway/agentgateway) is an open-source proxy for agent, model and tool traffic. Its upstream README describes MCP/A2A routing, authentication and observability.

**Connection to Zeko.** The gateway could route an authenticated tool request to the MCP/state service while preserving the verified principal and correlation context. AMBA and the backend acceptance service would enforce the approved action and shared-state rule. This design does not require the gateway itself to generate or validate Zeko proofs.

## Concrete example

An enterprise exposes several agent tools through one gateway. Two callers reach the reservation service through different routes. Both must consume the same authoritative quota under the same application policy; choosing a different route must not create another independent budget or bypass the mission gate.

The potential benefit is consistent application-state acceptance across routed services, with useful request-to-receipt correlation. Existing gateway controls and observability retain their roles. A log entry is not itself a proof of accepted state.

## Current evidence and next step

**Proposed integration:** no agentgateway route or enterprise-authentication configuration has been tested against this sandbox. Its advertised OAuth support does not by itself establish our selected ID-JAG flow.

**Next:** pin a gateway version and route configuration; define which party validates the token and how trusted identity reaches the backend. Reject spoofed identity context, changed resource/audience and attempts to access the backend without the required checks. Exercise two routes contending for one state resource and verify their receipts independently.

Keep the state-action gate at the backend even when routing succeeds. A deployed Zeko acceptance test and any Ethereum finality requirement remain separately identified parts of the profile.
