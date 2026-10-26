# AAIF Project Proposal — Zeko

**Review draft, 26 October 2026. Not submitted.** Prepared against the [current issue form](https://github.com/aaif/project-proposals/blob/main/.github/ISSUE_TEMPLATE/project-proposal.yml), [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) and [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

**Required author: zekoxyz. Do not file from Evan-k-global.** Open the [official form](https://github.com/aaif/project-proposals/issues/new?template=project-proposal.yml) while signed in as zekoxyz. Copy each section below into the matching field after resolving every `[OWNER INPUT]` item. Replace local supporting-document references with public, reviewed URLs before filing. This document is not an agreement to transfer assets.

Suggested issue title: **[Project Proposal] Zeko**

## Project Name

Zeko

## Project Description

Zeko is open-source rollup infrastructure for verifiable shared state across agent applications. Developers define application rules and proof-authorized state transitions; sequencing and recursive proof aggregation let other participants verify accepted computation without re-executing it all or relying solely on an operator's assertion.

For agents operating across services and organizations, the shared state can represent resource reservations, authority consumed, budgets, work commitments and conditional payments. A receiving service can check the relevant evidence before taking a consequential action. External enforcement, data availability and recovery remain explicit parts of the deployment design.

Enterprises and agent-swarm operators can deploy independently operated rollups with their own keys, configuration and application policy. Ethereum is the primary blockchain compatibility and settlement focus, with documented verification and bridging integrations. External settlement and bridging are distinct integration choices; each supported deployment profile documents its requirements.

Zeko originated in the Mina ecosystem and has previously been deployed on Mina mainnet. It has also been deployed on Ethereum testnet. The [independent Sepolia deployment guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) provides an operator-owned reference stack; deployment records should identify the versions, contracts and verifier configuration used.

The proposed contribution is core Zeko infrastructure and its agreed deployment/integration interfaces. The AAIF support repository supplies compatibility work and reference evidence. Separate application repositories illustrate uses and are not automatically included in the contribution.

## Preferred Lifecycle Stage (if known)

Sandbox

## Alignment with AAIF Mission

Zeko is being built as a public good for AI freedom, sovereignty and privacy. We offer open-source infrastructure, reference integrations and compatibility work for others to inspect, use, modify and build upon under their published licenses. Our ambition is to democratize the future of AI so that people and organizations can operate their own systems and participate in its benefits.

Agents need interoperable interfaces and a reliable way to coordinate consequential state across independent systems. Zeko contributes a reusable state and verification layer that complements existing agent protocols and permits independent operation, inspection and implementation.

The intended benefit is practical human control: people and organizations can delegate bounded work, choose their agent/model providers, inspect acceptance rules and operate their own infrastructure. A rollup is useful where participants need independently verifiable common state; the integration should explain its additional assurance and cost.

Neutral governance would let implementers beyond the originating team contribute shared semantics, compatibility fixtures and deployment profiles. The initial proposal includes working integration evidence and a defined contributor-growth path rather than claiming broad production adoption prematurely.

## Relation to Existing AAIF Projects

MCP retains its tool interface and authorization roles. Our local reference integration uses the official MCP SDK, enterprise-managed ID-JAG exchanges and AMBA's existing OAuth and mission checks to expose a bounded reservation tool. Real application proofs and portable receipts illustrate the state-verification boundary.

Other AAIF projects remain complementary: A2A can carry task/artifact references; clients such as goose and infrastructure such as agentgateway can exercise the same tool and acceptance profile; execution environments and response APIs can preserve authority and result correlation. These additional integrations are roadmap items, not current conformance claims.

The [compatibility matrix](compatibility.md) records tested versus planned boundaries. We propose versioned profiles and reference tests to reduce bespoke pairwise integration, without replacing existing identity, transport or task protocols. ID-JAG is an authorization-flow component, not a replacement for application authority checks or a token to send directly to an MCP resource.

## Example Use Cases and Evidence of Adoption

Initial users are enterprises operating agent fleets, developers of cross-organization agent services, and applications where multiple parties must coordinate resources, commitments or payments under shared rules.

Our working reference scenario connects user authorization, enterprise identity, an MCP tool, AMBA mission constraints and a proof-backed reservation. It includes negative cases for replay, changed inputs, invalid context and conflicting resource consumption. The [local evidence](evidence/README.md) records 17 ID-JAG/MCP cases and 13 shared-state cases passing, plus 19 unit/integration tests. The provider and state authority are explicitly local sandbox implementations.

Related first-party applications provide examples:

- [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth): identity, discovery, delegated work and mission-bounded authority.
- [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet): machine payments, conditional release and user-approved workflows.
- [zkTLS in the prediction-market demo](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market): external-data evidence as a primitive, with [zk-verify-poc](https://github.com/zeko-labs/zk-verify-poc) as another use case. Reusable extraction and verifier hardening are development work.

These are implementation and demonstration evidence, not unaffiliated production adoption. We apply on the Sandbox importance-before-adoption basis: consequential agent workflows need verifiable shared state and neutral interfaces before one provider's deployment becomes the default. We will add attributable outside usage only when supported by public evidence.

[OWNER INPUT: attach a concise deployment record for the prior Mina mainnet and Ethereum testnet deployments: revision, operator, network, contract/address references and verification profile.]

## Technical Committee Sponsor (if identified)

Not identified. We welcome guidance through the intake process.

## GitHub Repository URL

https://github.com/zeko-labs/zeko

The proposed core lives under `src/app/zeko` on the `compatible` branch. The supporting AAIF integration repository is https://github.com/zeko-labs/aaif. The Ethereum integration is https://github.com/zeko-labs/ethereum-settlement.

Zeko Labs confirms `zeko-labs/zeko` as the core rollup repository being proposed and the home of the audit documentation. The current candidate is [`28223900e4fbb69d04025b5ca8b9a044d493e6ed`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed), the latest `compatible` head checked on 26 October 2026. Separate application repositories remain supporting examples. The precise transfer schedule for project assets and any separately hosted Ethereum integration will be agreed with AAIF; it is not inferred from these reference links.

## License

Apache-2.0 for Zeko-authored and repository-maintained code, subject to identified upstream and third-party notices. See the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md) and [protocol license](https://github.com/zeko-labs/zeko/blob/compatible/src/app/zeko/LICENSE.md). The AAIF integration code is also Apache-2.0.

## Governance Model

The project is currently developed within Zeko Labs through public repositories and pull requests. Zeko Labs identifies the `zekoxyz` team handle and Martin Ondejka (`MartinOndejka`) as core maintainers. See the [maintainer roster](MAINTAINERS.md). The current core contribution guide includes inherited upstream procedures; it should not be treated as a complete statement of Zeko's present governance.

[BEFORE FILING: document the actual merge/release authority, decision, dispute, governance-change and new-maintainer processes; link adopted documents. Confirm the LF technical charter and contribution scope with the authorized owner.]

The proposed direction is transparent technical decisions, public specification discussion and a documented route for contributors from other organizations to become maintainers. This direction remains a proposal until adopted.

## CI/CD & Release Workflow

The core's [GitHub Actions workflow](https://github.com/zeko-labs/zeko/blob/compatible/.github/workflows/ci.yaml) sets up the OCaml/OPAM, Rust and Go build environment, builds the sequencer, DA layer and signer, and invokes sequencer tests. Container build automation is also present in the repository.

The AAIF support repository pins Node dependencies and exposes reproducible sandbox, profile and real-proof commands. Local evidence includes 19 unit/integration tests and 30 profile cases. A GitHub Actions configuration is supplied; hosted results are tracked on the review PR. Passing local tests are not described as a hosted CI run.

The current core candidate is [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed), the latest `compatible` branch head checked on 26 October 2026. Its [CI run](https://github.com/zeko-labs/zeko/actions/runs/40358110682) completed successfully, including package-build and sequencer-test steps. The most recent published release returned was [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5); this proposal selects the newer commit candidate. See the [candidate record](evidence/core-candidate-2026-10-26.md).

[BEFORE FILING: record container image digests and release approval/signing mechanics. No fixed release cadence is asserted. Refresh the candidate after the audit documentation merges, and update the support-repository CI status after publication.]

## Public-Facing Contribution Process for Specifications

The core has a public [contribution guide](https://github.com/zeko-labs/zeko/blob/compatible/CONTRIBUTING.md) and an RFC directory. The AAIF support repository has a [contribution workflow](CONTRIBUTING.md), versioned profiles and fixtures.

For compatibility changes, the proposed process is a public issue or PR describing the normative change, affected versions, positive and negative test vectors, migration impact and reviewer decision. Reusable code belongs in its canonical project; cross-project fixtures remain in `aaif`.

[OWNER INPUT: publish the Zeko-specific specification change and approval process, identify normative documents and confirm contributor/IP terms. Existing inherited guidance does not establish that this proposed process is already adopted.]

## Publicly Accessible Issue Tracker

https://github.com/zeko-labs/zeko/issues

AAIF-specific compatibility work: https://github.com/zeko-labs/aaif/issues

## External Project Dependencies

The core builds on Mina-derived ledger, cryptographic and transaction components, with preserved upstream notices. Its dependency and build definitions are in the public repository. Ethereum acceptance adds the separately maintained settlement contracts, gateway and SP1 proof-verification path; deployed infrastructure adds configured storage, messaging and data-availability services.

Direct dependencies of the reproducible AAIF integration are pinned as follows:

| Dependency | Version/revision | License |
| --- | --- | --- |
| AMBA | `4b5bb5c6915c7ee17e716ab2320e50d985dfc0d5` | Apache-2.0 |
| MCP TypeScript SDK | 1.26.0 | MIT |
| jose | 6.1.3 | MIT |
| zod | 3.25.76 | MIT |
| o1js | 2.13.0 | Apache-2.0 |

These identifiers were checked against installed package metadata. They are not a complete transitive license inventory. The Ethereum repository separately [documents Apache and third-party licensing scope](https://github.com/zeko-labs/ethereum-settlement#licensing).

[OWNER INPUT: attach the candidate-specific core, Ethereum, container and transitive dependency/license inventory; distinguish required runtime dependencies from optional providers and test tools.]

## Maintainers & Contributors

The maintainers identified by Zeko Labs are:

- **Zeko Labs team handle — [zekoxyz](https://github.com/zekoxyz)**: team maintainer account and required official submission author.
- **Martin Ondejka — [MartinOndejka](https://github.com/MartinOndejka)**: core rollup maintainer. Recent contributions include [durable Ethereum settlement recovery](https://github.com/zeko-labs/zeko/commit/7acd9a9b23d11282517381e04c15690c5198cbea) and [serialization behind settlement finality](https://github.com/zeko-labs/zeko/commit/67a453c25d8606ddc55f6e0e0f3e2eb531ac2c2b).

The [roster](MAINTAINERS.md) distinguishes the team handle from individual maintainership. Contributor growth will be supported through public issues, reproducible fixtures and a documented path for outside contributors to become maintainers.

The official application author is **zekoxyz**. The preparatory engineering fork/PR identity is **Evan-k-global**. Submission authorship does not substitute for a confirmed active-maintainer roster.

## Leadership Team & Decision Process

Technical stewardship is provided by the Zeko Labs maintainers listed above. Evan Kereiakes serves as AAIF Liaison and application contact. The specific merge/release approval and escalation process must be recorded in the governance documentation before filing; no additional permission or voting arrangement is asserted in this draft.

## Lifecycle Stage Evidence

The [Sandbox thesis](proposal.md) covers intended users, the importance-before-adoption case, the working contribution and what would justify Growth. The [project plan](project-plan.md) sets out the roadmap and contributor goals; the [evidence record](evidence/README.md) links reproducible results and explicit limits.

Sandbox objectives are a maintained compatibility profile, reproducible core/integration deployment evidence, outside implementer feedback and an open contributor-to-maintainer process. Growth preparation will pursue two unaffiliated production organizations, contributions from two organizations over the preceding six months and a sponsor-accepted growth plan, under the applicable policy at that time.

[OWNER INPUT: replace these relative links with public reviewed document URLs and confirm roadmap capacity.]

## Security

Core Zeko has independent zkSecurity audit history. The [audit documentation](https://github.com/zeko-labs/zeko/pull/444) indexes the two authoritative assessments, reviewed component scope and published finding responses. Use the canonical audit-folder URL after the documentation merges.

Application and demo assurance is separate. Local Codex-assisted review and bug-bounty activity should be attributed to the exact project and revision, rather than represented as independent audits of the whole portfolio. The new AAIF integration is a reference sandbox with explicit trust boundaries and no claimed OpenSSF badge or AAIF certification.

The [sandbox scope](sandbox/README.md) describes the synthetic provider, local state authority, public proof fields, gateway enforcement and instrumented external effects. Core-rollup deployment, data availability, commercial-provider interoperability and Ethereum settlement require their own evidence. Deployment records distinguish mock and real verifier profiles.

[OWNER INPUT: link the current private vulnerability-reporting/security policy and candidate-specific security/release records. Do not publish vulnerability details or credentials in the proposal.]

## Website URL

https://zeko.io

Documentation: https://docs.zeko.io and https://ethereum.docs.zeko.io/overview

## Documented Governance Practices (if any)

[OWNER INPUT: link the adopted Zeko GOVERNANCE.md/technical charter and maintainer process when available. Do not substitute a proposed document for adopted practices.]

## Links to Social Media Accounts

[OWNER INPUT: confirm project-owned social accounts and official communication channels, with ownership and contribution scope.]

## Trademark and accounts

**Leave the agreement checkbox undecided in this draft.** The authorized owner must review and complete it in the official form. Preparing this application does not accept the transfer obligation.

The contributing entity is **Zeko Labs Inc.**, with **Evan Kereiakes, AAIF Liaison**, designated as signatory. The exact trademarks, domains, accounts and other required assets still need a project-specific schedule. Do not include unrelated Zeko Labs applications or corporate assets by implication.

## Details of Existing Financial Sponsorship

Development and infrastructure are supported by **Zeko Labs and its investors**.

## Infrastructure Needs or Requests

Proposed request: standard source hosting, issue tracking, documentation and CI support appropriate to Sandbox. Our existing local example needs no funded wallet or commercial IdP account. Larger proof-generation jobs and persistent independent rollup deployments require an explicit resource budget and operator commitment.

[OWNER INPUT: confirm actual requests, expected CI/prover resource usage and who pays for cloud hosting, Ethereum transactions and optional providers.]

## Additional Information

The [public-good purpose](PUBLIC_GOOD.md) makes this repository a durable record of work offered to the wider ecosystem. Dated progress, versioned code, reproducible results and public technical feedback should demonstrate both the usefulness of the contribution and our responsiveness to implementers. Sovereignty includes control over infrastructure, keys, application policy and delegated agent authority. Neutral stewardship is a goal with explicit governance work, rather than an unsupported claim that independent governance already exists.

We have prepared an AAIF-specific integration repository to make technical discussion reproducible. Its initial path connects existing enterprise identity mechanisms to mission authorization and verifiable application state, with tested failure cases and separately labeled future deployment work.

Our focused community contribution is core shared-state security, identity-to-authority mapping through SantaClawz/AMBA, and optionally commerce lifecycle evidence through x402-Zeko/Magic City. The broader portfolio illustrates extensibility rather than multiple simultaneous project submissions.

The official proposal will be filed by **zekoxyz** after owner review. It has not been filed by the agent preparing these materials.

## Application contact name(s) and email(s)

**Evan Kereiakes — contact@zeko.io**

## Contributing or sponsoring entity signatory information

| Name | Address | Type | Signatory name and title | Email address |
| --- | --- | --- | --- | --- |
| Zeko Labs Inc. | 16192 Coastal Highway, Lewes, DE 19958 | Corporation | Evan Kereiakes, AAIF Liaison | contact@zeko.io |

Entity, address, signatory, title and contact details supplied by the user for this application. State of incorporation is not inferred from the mailing address. The trademark/accounts agreement checkbox remains for the authorized owner to complete manually.
