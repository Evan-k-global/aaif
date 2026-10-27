# Zeko: Open Infrastructure for Sovereign AI

**Zeko is a public good for AI freedom, sovereignty and privacy.** We built open-source rollup infrastructure for verifiable shared state across agent applications. People and organizations control their infrastructure, application rules and delegated agent authority.

Zeko lets enterprises and agent swarms operate sovereign rollups with their own keys and policies. Recursive proofs verify application computation. Ethereum integrations provide state settlement and asset bridging. Our mission is to democratize AI and advance human flourishing through open infrastructure.

We deployed Zeko on Mina mainnet and Ethereum testnet. zkSecurity audited core components. This repository connects that foundation to the AAIF ecosystem through runnable examples, compatibility profiles and reproducible evidence.

Our contribution advances open interoperability and human control. The [AAIF application](application.md) proposes core Zeko for the Sandbox stage. The application is a review draft; the protocol and examples already exist.

## Start here

- [Public-good purpose, sovereignty and neutral stewardship](PUBLIC_GOOD.md)
- [AAIF proposal and supporting work](submission-guide.md)
- [Project roadmap](project-plan.md)
- [Application matching the official issue form](application.md)
- [Core proposal draft](proposal.md)
- [Working-group relevance](working-groups.md)
- [Progress](progress.md)
- [AAIF engineering work and delivery sequence](aaif-work.md)
- [Technology compatibility kit](tck/README.md)
- [ID-JAG integration](integrations/id-jag/README.md)
- [Compatibility backlog](compatibility.md)
- [All ten AAIF project demos and integration guides](ecosystem/README.md)
- [Local ecosystem suite runbook](ecosystem/RUNBOOK.md)
- [Integration architecture](ecosystem/DEVELOPMENT.md)
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

The independent deployment guide provides a container-based reference stack, operator-owned keys, genesis and contracts, and bridge/explorer tooling. The tutorial identifies its default mock Ethereum verifier and the separate real-verification configuration. Zeko-side proofs are real in both documented profiles.

## Application and primitive references

| Capability | Reference |
| --- | --- |
| Agent identity, discovery and cross-party work | [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) |
| Mission-scoped delegated authority | [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) |
| Machine payments and conditional release | [x402-Zeko](https://github.com/zeko-labs/x402-zeko) |
| User-approved agent workflows | [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) |
| zkTLS external-data evidence | [Prediction-market implementation](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market), with [zk-verify-poc](https://github.com/zeko-labs/zk-verify-poc) as another use case |

The prediction market demonstrates the zkTLS feature; extraction of a reusable adapter is a development target. Reference applications have their own trust boundaries, deployment profiles and security-review status. Their inclusion illustrates uses of the core and does not extend the core audit to their code.

The local sandbox reuses AMBA's OAuth implementation, performs ID-JAG exchanges over HTTPS, and serves an actual MCP tool using the official SDK. It includes 17 identity-profile cases and 13 shared-state cases with real o1js application proofs. The ecosystem suite adds ten project-specific examples, all passing in real-proof mode, with native clients/gateways, official SDKs and explicit fixture or instruction-format boundaries. Core-rollup acceptance, commercial-provider validation and Ethereum settlement remain distinct deployment work. The [evidence record](evidence/README.md) identifies each tested profile and deployment boundary.

```sh
npm ci --ignore-scripts
npm run demo
npm run demo:proofs
npm run sandbox:evidence
npm run ecosystem:setup -- --docker
npm run ecosystem:proofs
```
