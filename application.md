# AAIF Project Proposal — Zeko

**Review draft, 26 October 2026. Not submitted.** Prepared against the [current issue form](https://github.com/aaif/project-proposals/blob/main/.github/ISSUE_TEMPLATE/project-proposal.yml), [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) and [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

Proposed issue title: **[Project Proposal] Zeko**

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

Other AAIF projects remain complementary: A2A can carry task/artifact references; clients such as goose and infrastructure such as agentgateway can exercise the same tool and acceptance profile; execution environments and response APIs can preserve authority and result correlation. Selected local examples now exercise the official A2A SDK and native goose, agentgateway and Agent Router/Envoy, alongside schema/SDK or instruction-format examples for the other hosted projects. These are local integration results with explicit fixture boundaries, not full conformance or deployed settlement claims.

The [compatibility matrix](compatibility.md) records tested versus planned boundaries. We propose versioned profiles and reference tests to reduce bespoke pairwise integration, without replacing existing identity, transport or task protocols. ID-JAG is an authorization-flow component, not a replacement for application authority checks or a token to send directly to an MCP resource.

The [ecosystem suite](ecosystem/README.md) has a dedicated folder for each of the ten hosted projects. All ten local examples pass in real-proof mode, with 62 scenario checks. OpenSandbox uses its actual SDK/server/execd Docker lifecycle and deny-by-default egress; a host-verified input/image/result commitment is accepted once, with replay and changed results rejected. Each guide explains the application benefit, what actually executes and the next validation required.

## Example Use Cases and Evidence of Adoption

Initial users are enterprises operating agent fleets, developers of cross-organization agent services, and applications where multiple parties must coordinate resources, commitments or payments under shared rules.

Our working reference scenario connects user authorization, enterprise identity, an MCP tool, AMBA mission constraints and a proof-backed reservation. It includes negative cases for replay, changed inputs, invalid context and conflicting resource consumption. The [local evidence](evidence/README.md) records 17 ID-JAG/MCP cases and 13 shared-state cases passing, plus 21 unit/integration tests. The provider and state authority are explicitly local sandbox implementations. The additional ten-project suite demonstrates selected native client/gateway, SDK, schema and instruction-format paths against the same application boundary.

Related first-party applications provide examples:

- [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth): identity, discovery, delegated work and mission-bounded authority.
- [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet): machine payments, conditional release and user-approved workflows.
- [zkTLS in the prediction-market demo](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market): external-data evidence as a primitive, with [zk-verify-poc](https://github.com/zeko-labs/zk-verify-poc) as another use case. Reusable extraction and verifier hardening are development work.

These are implementation and demonstration evidence, not unaffiliated production adoption. We apply on the Sandbox importance-before-adoption basis: consequential agent workflows need verifiable shared state and neutral interfaces before one provider's deployment becomes the default. We will add attributable outside usage only when supported by public evidence.

We are consolidating the deployment evidence into revision, network, operator and contract/verifier records for the proposed contribution.

## Technical Committee Sponsor (if identified)

Not identified. We welcome guidance through the intake process.

## GitHub Repository URL

https://github.com/zeko-labs/zeko

The proposed core lives under `src/app/zeko` on the `compatible` branch. The supporting AAIF integration repository is https://github.com/zeko-labs/aaif. The Ethereum integration is https://github.com/zeko-labs/ethereum-settlement.

Our proposed core rollup repository is `zeko-labs/zeko`, which also contains the core audit documentation work. The current candidate is [`28223900e4fbb69d04025b5ca8b9a044d493e6ed`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed), the latest `compatible` head checked on 26 October 2026. Separate application repositories remain supporting examples. The precise transfer schedule for project assets and any separately hosted Ethereum integration will be agreed with AAIF; it is not inferred from these reference links.

## License

Apache-2.0 for Zeko-authored and repository-maintained code, subject to identified upstream and third-party notices. See the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md) and [protocol license](https://github.com/zeko-labs/zeko/blob/compatible/src/app/zeko/LICENSE.md). The AAIF integration code is also Apache-2.0.

## Governance Model

The project is currently developed within Zeko Labs through public repositories and pull requests. Zeko Labs identifies the `zekoxyz` team handle and Martin Ondejka (`MartinOndejka`) as core maintainers. See the [maintainer roster](MAINTAINERS.md). Zeko-specific governance procedures are being formalized alongside the existing contribution guide.

Formal governance documentation is in development, covering merge/release authority, technical decisions, disputes, governance changes and new maintainers. The contribution scope and technical charter will be agreed through the AAIF process.

The proposed direction is transparent technical decisions, public specification discussion and a documented route for contributors from other organizations to become maintainers. This direction remains a proposal until adopted.

## CI/CD & Release Workflow

The core's [GitHub Actions workflow](https://github.com/zeko-labs/zeko/blob/compatible/.github/workflows/ci.yaml) sets up the OCaml/OPAM, Rust and Go build environment, builds the sequencer, DA layer and signer, and invokes sequencer tests. Container build automation is also present in the repository.

The AAIF support repository pins Node dependencies and exposes reproducible sandbox, profile and real-proof commands. Local evidence includes 21 unit/integration tests and 30 profile cases. A GitHub Actions configuration is supplied. The evidence record distinguishes local results from hosted CI.

The current core candidate is [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed), the latest `compatible` branch head checked on 26 October 2026. Its [CI run](https://github.com/zeko-labs/zeko/actions/runs/40358110682) completed successfully, including package-build and sequencer-test steps. The most recent published release recorded on this date was [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5); this proposal selects the newer commit candidate. See the [candidate record](evidence/core-candidate-2026-10-26.md).

Container release digests and release approval/signing procedures are being consolidated. No fixed release cadence is proposed in this draft.

## Public-Facing Contribution Process for Specifications

The core has a public [contribution guide](https://github.com/zeko-labs/zeko/blob/compatible/CONTRIBUTING.md) and an RFC directory. The AAIF support repository has a [contribution workflow](CONTRIBUTING.md), versioned profiles and fixtures.

For compatibility changes, the proposed process is a public issue or PR describing the normative change, affected versions, positive and negative test vectors, migration impact and reviewer decision. Reusable code belongs in its canonical project; cross-project fixtures remain in `aaif`.

We are formalizing Zeko-specific specification approval, normative-document ownership and contributor terms alongside this proposal.

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
| A2A JavaScript SDK | 1.3.0 | Apache-2.0 |
| Express | 5.1.0 | MIT |
| Ajv | 8.17.1 | MIT |

Native/Python component versions and checksums are recorded in the [ecosystem pins](ecosystem/versions.json), [binary manifest](ecosystem/binaries.json) and [Python lock](ecosystem/requirements.lock). Their direct license attributions are in NOTICE.

These identifiers were checked against installed package metadata. They are not a complete transitive license inventory. The Ethereum repository separately [documents Apache and third-party licensing scope](https://github.com/zeko-labs/ethereum-settlement#licensing).

A candidate-specific core, Ethereum, container and transitive dependency/license inventory is in preparation, distinguishing required runtime components from optional integrations and test tools.

## Maintainers & Contributors

The maintainers identified by Zeko Labs are:

- **Zeko Labs team handle — [zekoxyz](https://github.com/zekoxyz)**: team maintainer account.
- **Martin Ondejka — [MartinOndejka](https://github.com/MartinOndejka)**: core rollup maintainer. Recent contributions include [durable Ethereum settlement recovery](https://github.com/zeko-labs/zeko/commit/7acd9a9b23d11282517381e04c15690c5198cbea) and [serialization behind settlement finality](https://github.com/zeko-labs/zeko/commit/67a453c25d8606ddc55f6e0e0f3e2eb531ac2c2b).

The [roster](MAINTAINERS.md) distinguishes the team handle from individual maintainership. Contributor growth will be supported through public issues, reproducible fixtures and a documented path for outside contributors to become maintainers.

## Leadership Team & Decision Process

Technical stewardship is provided by the Zeko Labs maintainers listed above. Evan Kereiakes serves as AAIF Liaison and application contact. We are formalizing merge/release approval and escalation procedures in the governance documentation.

## Lifecycle Stage Evidence

The [Sandbox thesis](proposal.md) covers intended users, the importance-before-adoption case, the working contribution and what would justify Growth. The [project plan](project-plan.md) sets out the roadmap and contributor goals; the [evidence record](evidence/README.md) links reproducible results and explicit limits.

Sandbox objectives are a maintained compatibility profile, reproducible core/integration deployment evidence, outside implementer feedback and an open contributor-to-maintainer process. Growth preparation will pursue two unaffiliated production organizations, contributions from two organizations over the preceding six months and a sponsor-accepted growth plan, under the applicable policy at that time.

## Security

Core Zeko has independent zkSecurity audit history. The [audit documentation](https://github.com/zeko-labs/zeko/pull/444) indexes the two authoritative assessments, reviewed component scope and published finding responses. The audit index will have its canonical repository location after merge.

Application and demo assurance is separate. Application-specific code review and bug-bounty work do not extend the core audit to the full portfolio. The new AAIF integration is a reference sandbox with explicit trust boundaries and no claimed OpenSSF badge or AAIF certification.

The [sandbox scope](sandbox/README.md) describes the synthetic provider, local state authority, public proof fields, gateway enforcement and instrumented external effects. Core-rollup deployment, data availability, commercial-provider interoperability and Ethereum settlement require their own evidence. Deployment records distinguish mock and real verifier profiles.

Project contact: contact@zeko.io. A dedicated vulnerability-reporting policy and consolidated security/release record are pending publication.

## Website URL

https://zeko.io

Documentation: https://docs.zeko.io and https://ethereum.docs.zeko.io/overview

## Documented Governance Practices (if any)

Formal Zeko governance and technical-charter documents are in development. Current stewardship is described in the maintainer and leadership sections above.

## Links to Social Media Accounts

Official social-account and communication-channel references will be added to the final proposal.

## Trademark and accounts

Formal trademark/account contribution terms remain under review; this draft does not record acceptance of the agreement.

The contributing entity is **Zeko Labs Inc.**, with **Evan Kereiakes, AAIF Liaison**, designated as signatory. The project-specific schedule of contributed trademarks, domains, accounts and other assets is being finalized. Supporting applications and unrelated corporate assets are outside the proposed scope unless expressly included.

## Details of Existing Financial Sponsorship

Development and infrastructure are supported by **Zeko Labs and its investors**.

## Infrastructure Needs or Requests

Proposed request: standard source hosting, issue tracking, documentation and CI support appropriate to Sandbox. Our existing local example needs no funded wallet or commercial IdP account. Larger proof-generation jobs and persistent independent rollup deployments require an explicit resource budget and operator commitment.

The infrastructure request and resource budget are under review, including CI/proving, persistent hosting, Ethereum transactions and optional providers.

## Additional Information

The [public-good purpose](PUBLIC_GOOD.md) makes this repository a durable record of work offered to the wider ecosystem. Dated progress, versioned code, reproducible results and public technical feedback should demonstrate both the usefulness of the contribution and our responsiveness to implementers. Sovereignty includes control over infrastructure, keys, application policy and delegated agent authority. Neutral stewardship is a goal with explicit governance work, rather than an unsupported claim that independent governance already exists.

We have prepared an AAIF-specific integration repository to make technical discussion reproducible. Its initial path connects existing enterprise identity mechanisms to mission authorization and verifiable application state, with tested failure cases and separately labeled future deployment work.

Our focused community contribution is core shared-state security, identity-to-authority mapping through SantaClawz/AMBA, and optionally commerce lifecycle evidence through x402-Zeko/Magic City. The broader portfolio illustrates extensibility rather than multiple simultaneous project submissions.

The proposal remains a draft for public review.

## Application contact name(s) and email(s)

**Evan Kereiakes — contact@zeko.io**

## Contributing or sponsoring entity signatory information

| Name | Address | Type | Signatory name and title | Email address |
| --- | --- | --- | --- | --- |
| Zeko Labs Inc. | 16192 Coastal Highway, Lewes, DE 19958 | Corporation | Evan Kereiakes, AAIF Liaison | contact@zeko.io |
