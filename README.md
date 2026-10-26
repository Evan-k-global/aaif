# Zeko: Open Infrastructure for Sovereign AI

Open-source work toward **rollups as infrastructure for verifiable shared state across agent applications**.

We are building Zeko as a public good so people and organizations can use AI with freedom, sovereignty and privacy. We offer the code, reference integrations and compatibility work freely under their published open-source licenses. Our ambition is to democratize the future of AI: more people able to operate their own systems, control delegated authority and participate in the benefits of AI.

Zeko provides an open-source rollup framework for applications whose participants need to verify shared-state transitions under application-defined rules. Sovereign deployments let enterprises and agent-swarm operators run their own infrastructure, with modular connections to Ethereum for state settlement and asset bridging.

This repository is a record of that engineering work and our proposed AAIF contribution: runnable examples, deployment references, compatibility profiles, dated progress and reproducible evidence. The authoritative implementation remains in the linked project repositories. The proposal is a draft; an AAIF submission issue has not yet been filed.

Read our [public-good purpose and sovereignty principles](PUBLIC_GOOD.md). Zeko Labs currently maintains this work; the plan distinguishes our commitment to neutral stewardship from governance still to be formalized.

## Start here

- [Public-good purpose, sovereignty and neutral stewardship](PUBLIC_GOOD.md)
- [AAIF proposal and supporting work](submission-guide.md)
- [Full project plan and strategy](project-plan.md)
- [Application matching the official issue form](application.md)
- [Core proposal draft](proposal.md)
- [Focused working-group discussions](working-groups.md)
- [Progress](progress.md)
- [AAIF engineering work and delivery sequence](aaif-work.md)
- [Technology compatibility kit](tck/README.md)
- [ID-JAG integration](integrations/id-jag/README.md)
- [Compatibility backlog](compatibility.md)
- [How AAIF projects connect to Zeko](ecosystem/README.md)
- [Local validation evidence](evidence/2026-10-26-local-validation.md)
- [Current sandbox evidence](evidence/README.md)
- [Current core candidate and passing CI](evidence/core-candidate-2026-10-26.md)
- [Maintainers and application contact](MAINTAINERS.md)
- [Runnable sandbox and exact scope](sandbox/README.md)

## Core and deployment

- [Zeko core](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko)
- [Launch an independent Ethereum Sepolia rollup](https://docs.zeko.io/operators/guides/launch-sepolia-rollup)
- [Ethereum architecture, settlement and bridge documentation](https://ethereum.docs.zeko.io/overview)
- [Optional Phala confidential-computing deployment example](https://docs.zeko.io/operators/guides/rollup-on-phala)
- [Core audit documentation PR](https://github.com/zeko-labs/zeko/pull/444), linking the authoritative zkSecurity assessments

The independent deployment guide provides a container-based reference stack, operator-owned keys, genesis and contracts, and bridge/explorer tooling. Its default tutorial profile uses real Zeko-side proofs and a mock Ethereum SP1 verifier; the guide separately describes real Ethereum verification configuration. Deployment evidence should identify the profile used.

## Application and primitive references

| Capability | Reference |
| --- | --- |
| Agent identity, discovery and cross-party work | [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) |
| Mission-scoped delegated authority | [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) |
| Machine payments and conditional release | [x402-Zeko](https://github.com/zeko-labs/x402-zeko) |
| User-approved agent workflows | [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) |
| zkTLS external-data evidence | [Prediction-market implementation](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market), with [zk-verify-poc](https://github.com/zeko-labs/zk-verify-poc) as another use case |

The prediction market demonstrates the zkTLS feature; extraction of a reusable adapter is a development target. Reference applications have their own trust boundaries, deployment profiles and security-review status. Their inclusion illustrates uses of the core and does not extend the core audit to their code.

The local sandbox reuses AMBA's OAuth implementation, performs ID-JAG exchanges over HTTPS, and serves an actual MCP tool using the official SDK. It includes 17 identity-profile cases and 13 shared-state cases with real o1js application proofs. Core-rollup acceptance, commercial-provider validation and Ethereum settlement remain distinct deployment work. This is reproducible application-support evidence, not an AAIF certification.

The official AAIF submission must be filed manually by **zekoxyz** after owner review. **Evan-k-global** is the engineering fork/PR identity only. This agent has been instructed not to create the submission.

```sh
npm ci --ignore-scripts
npm run demo
npm run demo:proofs
npm run sandbox:evidence
```
