# Zeko project roadmap

**Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications.** We built it to give people freedom, sovereignty and control over AI. Our AAIF Sandbox proposal contributes this core infrastructure and its integration interfaces, supported by working examples and reproducible evidence.

Our mission is to democratize AI and advance human flourishing. Operators choose their models and agents, run their own systems and define bounded authority. We publish the code and integration work under open-source licenses.

## Contribution and architecture

Agent interfaces connect systems. Consequential workflows also need shared rules for authority consumed, resources reserved, work committed and results accepted. Zeko provides an application-defined state and verification layer for those interactions.

| Repository | Role |
| --- | --- |
| [Zeko core](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko) | Rollup, sequencing, proving and data-availability implementation |
| [Ethereum integration](https://github.com/zeko-labs/ethereum-settlement) | Verification, settlement, bridging and deployment interfaces |
| [AAIF integration](https://github.com/zeko-labs/aaif) | Compatibility profiles, reference integrations, examples and evidence |
| [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) | Mission-scoped authority, holder binding and action enforcement |
| SantaClawz, x402-Zeko and Magic City | Supporting identity, work and commerce applications |

The formal contribution schedule will identify the included code and assets. Supporting applications illustrate the core's uses and are separately maintained.

## Working implementation

Our reference scenario connects existing enterprise identity to a bounded task: ID-JAG establishes resource access, AMBA constrains the action, an MCP tool requests a reservation and a real application proof verifies the transition statement. Competing requests, changed inputs, wrong contexts and replay are rejected at the corresponding boundary.

The current local evidence records **21 unit/integration tests, 30 compatibility cases and ten ecosystem demos with 62 checks**. Native goose, agentgateway and Agent Router/Envoy, official MCP/A2A SDKs, actual OpenSandbox Docker execution, OpenEnv types, Open Responses schemas and instruction-format examples have individually documented evidence levels. See the [evidence record](evidence/README.md).

The authority in these examples is a local single-writer application model. Core-rollup acceptance, commercial identity providers and Ethereum verification are separately measured deployment milestones.

## Engineering milestones

| Milestone | Planned result | Validation |
| --- | --- | --- |
| Independent reproduction | Reproducible setup and outside implementation feedback | Attributable runs against pinned sources and profiles |
| Recovery and reconciliation | Stable action references, receipt lookup and durable accepted state | Restart, stale-state and interrupted-response cases |
| Project-specific extensions | Task lifecycle, cross-client coordination, route failover and result verification | The [ten-project roadmap](ecosystem/README.md#development-roadmap) |
| Core acceptance adapter | The same application interface backed by a pinned core Zeko deployment | Actual sequencing/DA acceptance and independent state reads |
| Ethereum verification | Explicit verification/settlement profile | Recorded versions, contracts, image digests and real-verifier configuration |
| Broader identity interoperability | A commercial ID-JAG-capable provider profile | Tenant/client/resource mappings and negative access cases |
| Open stewardship | Public decisions and a contributor-to-maintainer path | Adopted governance and outside participation |

We will publish evidence for each milestone as it is completed. Target sequencing depends on maintainer capacity and deployment resources. A Sandbox checkpoint and Growth preparation will follow the applicable [AAIF lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

## Sovereign operation and Ethereum

Enterprises and agent swarms can operate their own rollups with control over keys, configuration and application policy. Ethereum is our primary blockchain compatibility, settlement and bridging focus. Zeko's Mina origin and prior mainnet deployment provide technical heritage; our Ethereum testnet work and [sovereign-rollup guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) extend that foundation.

Application validity, rollup acceptance, external settlement and bridging are distinct stages. The published tutorial identifies mock and real Ethereum verifier profiles. Optional [Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) illustrates infrastructure modularity; hardware attestation and application proofs address different trust questions.

## Ecosystem collaboration

Our closest working-group connections are [Security & Privacy, Identity & Trust and Agentic Commerce](working-groups.md). The core contribution concerns shared state; SantaClawz/AMBA and x402-Zeko/Magic City make identity, delegation, work and commerce examples concrete. zkTLS external-data evidence is a further primitive, demonstrated in the prediction-market implementation, with reusable extraction and verifier hardening on its roadmap.

We aim to reuse common application semantics where possible while preserving each project's protocol and operator choices. Shared profiles can reduce bespoke pairwise integration without eliminating policy, trust or runtime differences.

## Stewardship and support

Zeko Labs maintains this work with support from Zeko Labs and its investors. The [maintainer roster](MAINTAINERS.md) identifies the current contacts. We are developing formal governance, release and specification procedures alongside the contribution asset schedule and dependency inventories.

We commit to neutral stewardship and an open path for outside contributors. Growth evidence will include independently operated production use, contributions from other organizations and a sponsor-reviewed plan under the policy applicable at that time. Our [Sandbox thesis](proposal.md) and [full application](application.md) describe the proposed contribution and current review status.
