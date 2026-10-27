# Zeko: verifiable shared state across agent applications

**Zeko is a public good for AI freedom, sovereignty and privacy.** We built an open-source agentic rollup protocol that gives independent agent applications verifiable shared state. Our AAIF contribution advances open interoperability, human control and human flourishing.

Sandbox application draft, 26 October 2026. [Full application](application.md) · [Evidence](evidence/README.md) · [Roadmap](project-plan.md).

## Problem and contribution

Agents increasingly act across organizations and services. Connectivity alone does not tell participants which authority remains, which resources are committed, or whether an accepted state change followed their shared rules. A signature or log can record an assertion without establishing that the underlying computation was valid.

Zeko is an open-source agentic rollup protocol for this shared state. Developers define application rules and proof-authorized transitions; sequencing and recursive proof aggregation let participants verify specified computation and accepted state. Applications include resource reservations, bounded budgets, work commitments and conditional payments. External services must enforce the required acceptance conditions before acting.

The proposed contribution is core Zeko infrastructure with agreed deployment and integration interfaces. The AAIF support repository supplies compatibility profiles, reference integrations and reproducible evidence. Existing applications illustrate uses; they are not automatically included in the contribution. Neutral stewardship gives outside implementers a role in shared semantics, deployment profiles and alternative integrations. Our governance roadmap defines the formal participation process.

## Intended users and importance before adoption

We publish Zeko and its integration work so anyone can operate, inspect and extend the infrastructure. Sovereign operation, bounded delegation and provider choice put human control into the application architecture.

Zeko serves enterprises operating agent fleets, cross-organization agent services, and applications coordinating consequential resources. They need independently verifiable state while preserving choice of operator, agent runtime and model provider.

First-party examples make this concrete: SantaClawz and AMBA connect agent identity to delegated work and bounded authority; x402-Zeko and Magic City explore payments and user-approved workflows. zkTLS external-data evidence is another primitive, demonstrated by the prediction market and a partner-motivated verification PoC. Reusable extraction and verifier hardening remain work. The [reference catalog](README.md#application-and-primitive-references) links their implementations.

These examples establish development contexts, not unaffiliated production adoption. The importance-before-adoption case is that independent agents need common, reviewable state and acceptance semantics before provider-specific conventions become entrenched. Human agency is expressed through bounded delegation, revocation, understandable consent, independent operation and provider choice.

## Deployment and Ethereum focus

Enterprises and agent-swarm operators can run sovereign rollups with operator-controlled keys, configuration and application policy. The [independent Sepolia guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) supplies a container-based deployment reference. Ethereum is the primary blockchain compatibility, settlement and bridging focus. Zeko originated in Mina and was deployed on Mina mainnet; its Ethereum testnet deployment extends that operational experience.

Application-state validity, rollup acceptance, external settlement and asset bridging are distinct stages. The Sepolia tutorial is Ethereum-connected and distinguishes a default mock Ethereum verifier from real verification configuration. Deployment records must identify the profile used. New destination adapters require their own validation; architectural extensibility is not universal platform compatibility.

[Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) is an optional modular infrastructure example. Hardware attestation and cryptographic proofs address complementary trust questions. Rollups serve workflows that require independently verifiable shared state.

## Working implementation and Sandbox program

Zeko complements existing agent interfaces: MCP retains its tool role, A2A its task role, and identity systems their authority-establishment role. A versioned compatibility profile can reduce bespoke integration where semantics align.

The [local reference sandbox](sandbox/README.md) reuses canonical AMBA OAuth, signed capabilities, holder checks and stateful enforcement. HTTPS ID-JAG exchanges establish resource access; the official MCP SDK exposes a reservation tool; real o1js proofs bind reservation arithmetic and version advancement to public domain/action commitments. Two client registrations exercise contention, and a separate process verifies receipt proofs.

Current results are 17 ID-JAG/MCP profile cases and 13 shared-state cases passing, plus 21 unit/integration tests. The source-digested evidence records exact versions and scope. Identity and state authority are explicit local sandbox implementations; both original clients use the same SDK. AMBA enforcement is separate from the small proof circuit. Commercial providers, deployed core sequencing/DA and Ethereum settlement are separate validation targets. The evidence applies to these versioned local profiles.

Sandbox work will extend the adapter to a pinned core deployment, exercise another AAIF client/gateway, publish versioned fixtures and collect outside reproduction. The [ecosystem suite](ecosystem/README.md) now adds ten local project examples, all passing with real application proofs and 62 scenario checks. This includes actual OpenSandbox Docker execution, result-commitment recording, egress denial and cleanup. Native client/gateway and official SDK/runtime evidence is distinguished from protocol fixtures and instruction artifacts. The [compatibility matrix](compatibility.md) records the remaining deployment boundaries. Contributors will have a public path from fixes and test vectors to maintainership.

## Security and Growth objectives

Core Zeko has independent zkSecurity audit history. The [audit documentation](https://github.com/zeko-labs/zeko/pull/444) indexes the authoritative reports, component scope and published finding responses; the audit index will have its canonical repository location after merge. Application, demo and integration assurance remains separate. Each deployment must document state authority, proof verification, data availability, permissions and recovery.

Sandbox success means reproducible deployments, a maintained compatibility profile, useful outside feedback and open governance. Growth preparation will pursue the applicable graduation criteria: production use by two unaffiliated organizations, contributions from two organizations over the preceding six months, and a sponsor-accepted growth plan. The roadmap targets the six-month checkpoint and a Growth application within twelve months when criteria are met.
