# AAIF Project Proposal — Zeko

**Zeko is a public good for AI freedom, sovereignty and privacy.** Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. Zeko gives people control over their AI agents and provides open, verifiable infrastructure for those agents to work across applications and organizations.

Application draft, 26 October 2026. The submission follows the [current issue form](https://github.com/aaif/project-proposals/blob/main/.github/ISSUE_TEMPLATE/project-proposal.yml), [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) and [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

Proposed issue title: **[Project Proposal] Zeko**

## Project Name

Zeko

## Project Description

Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. We built it to advance AI freedom, sovereignty, privacy and human flourishing by giving people and organizations control over their AI infrastructure, application rules and delegated authority. This shared foundation lets independent agents coordinate resource reservations, budgets, work commitments and conditional payments across applications and organizations.

Developers define the rules for application state changes, and cryptographic proofs establish that each accepted transition satisfies those rules. Sequencing and recursive proof aggregation let participants verify the specified computation without re-executing every operation. For privacy, applications define what their proofs establish, which information they disclose and who has access; zero-knowledge proofs verify statements without revealing private proof inputs. Security combines these verifiable application rules with permissions that bound agent authority. Core Zeko components have undergone two independent zkSecurity assessments, documented in the [core audit index and reports](https://github.com/zeko-labs/zeko/pull/444).

Enterprises and agent swarms run sovereign rollups with their own keys, configuration and policies, choosing the hosting, identity and confidential-computing integrations their applications need. Ethereum is our primary blockchain compatibility, settlement and bridging layer, with optional settlement connecting independently operated rollups to shared public infrastructure. Zeko originated in Mina and deployed on Mina mainnet before expanding to Ethereum testnet; the [independent Sepolia guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) provides the stack for operators to launch their own Ethereum-connected rollup.

Our proposed AAIF Sandbox contribution is core Zeko, with its Ethereum integration. This repository provides supporting local examples of how AAIF projects use verifiable application state. The applications referenced below are supporting examples, maintained in their own repositories.

## Preferred Lifecycle Stage (if known)

Sandbox

## Alignment with AAIF Mission

Zeko advances AI freedom, sovereignty, privacy and human flourishing through a common, composable protocol for scaling private, sovereign enterprise agents on the open internet. People and organizations retain control over their infrastructure, data, application rules and delegated authority as their agents work across services and organizational boundaries.

The internet protocol suite predates autonomous AI agents and was not designed to govern their shared resources, delegated authority or commitments. Zeko supplies verifiable shared state for that coordination, with reusable interfaces that reduce bespoke pairwise integrations as agent networks grow. Developers compose this layer with existing identity, messaging, tool and execution protocols, while operators choose their models, runtimes and deployment infrastructure.

We publish the protocol and reference integrations under open-source licenses so developers can inspect, use and extend them. Our proposed contribution gives the AAIF community a working protocol to build on, with local examples showing how it fits alongside existing projects.

## Relation to Existing AAIF Projects

Zeko complements AAIF projects by providing verifiable shared state for the work agents perform through them. MCP connects agents to tools, A2A supports communication between agents, and runtimes and gateways execute and route their requests. Zeko gives applications a common way to verify changes to shared resources, budgets and commitments within those workflows.

Our [reference examples](ecosystem/README.md) explore these connections across the AAIF ecosystem. The MCP example uses the official SDK and a local ID-JAG exchange for tool access, with AMBA's OAuth and mission checks bounding the reservation request. An application proof verifies the reservation calculation. Other examples connect the same state action to A2A, goose, agentgateway and Agent Router, or illustrate its use with execution environments and instruction formats.

These examples run locally with a local state service; they do not run against a deployed core rollup or settle on Ethereum. The [compatibility matrix](compatibility.md) identifies what each example exercises and what remains to be tested.

## Example Use Cases and Evidence of Adoption

Intended users include enterprises operating agent fleets and developers coordinating work across organizations. Example uses are shared resource reservations, agent spending limits, work commitments and conditional payments.

Zeko Labs' applications illustrate these uses:

- [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth): identity, discovery, delegated work and mission-bounded authority.
- [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet): machine payments, conditional release and user-approved workflows.
- [zkTLS external-data evidence](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market): demonstrated in the prediction-market application. Standalone extraction remains development work.

These are first-party applications and demos, rather than evidence of independent production adoption. The [local integration results](evidence/README.md) provide reproducible examples, including rejection of replayed requests and conflicting reservations.

Our Sandbox case is that agents working across organizations need shared state they can independently verify. Zeko provides that foundation while letting each operator retain control of its infrastructure and application rules.

## Technical Committee Sponsor (if identified)

Not identified.

## GitHub Repository URL

https://github.com/zeko-labs/zeko

Core implementation: [`src/app/zeko` on `compatible`](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko). The Ethereum integration is maintained in [ethereum-settlement](https://github.com/zeko-labs/ethereum-settlement), and supporting AAIF examples are in [aaif](https://github.com/zeko-labs/aaif).

## License

Apache-2.0 for Zeko-authored and repository-maintained code, subject to identified upstream and third-party notices. See the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md) and [protocol license](https://github.com/zeko-labs/zeko/blob/compatible/src/app/zeko/LICENSE.md). The AAIF integration code is also Apache-2.0.

## Governance Model

Zeko Labs maintains the project through public repositories, issues and pull requests. The core maintainers are the `zekoxyz` team account and Martin Ondejka (`MartinOndejka`); see the [maintainer roster](MAINTAINERS.md).

A consolidated Zeko-specific governance document covering merge and release authority, technical decisions and new maintainers is not yet published. The proposed AAIF governance structure will be agreed through the technical charter.

## CI/CD & Release Workflow

The core's [GitHub Actions workflow](https://github.com/zeko-labs/zeko/blob/compatible/.github/workflows/ci.yaml) builds the sequencer, data-availability layer and signer, and runs sequencer tests. Container build automation is also included.

The selected core candidate is [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed). Its [CI run](https://github.com/zeko-labs/zeko/actions/runs/40358110682) passed the package-build and sequencer-test steps. The latest published release checked on 26 October 2026 was [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5); the selected commit is newer. A fixed release cadence and formal release-approval process are not documented. See the [candidate record](evidence/core-candidate-2026-10-26.md).

The supporting AAIF examples have pinned dependencies, reproducible commands and separately recorded [local test results](evidence/README.md).

## Public-Facing Contribution Process for Specifications

The core repository contains an [inherited contribution guide](https://github.com/zeko-labs/zeko/blob/compatible/CONTRIBUTING.md) and [RFC process](https://github.com/zeko-labs/zeko/tree/compatible/rfcs). A separate Zeko-specific specification process is not yet published.

For the AAIF examples, contributors propose interface and compatibility changes through public issues or pull requests, including affected versions and relevant tests. See the [contribution guide](CONTRIBUTING.md).

## Publicly Accessible Issue Tracker

https://github.com/zeko-labs/zeko/issues

AAIF-specific compatibility work: https://github.com/zeko-labs/aaif/issues

## External Project Dependencies

Core Zeko uses Mina-derived ledger, cryptographic and transaction components, with upstream license notices preserved as described in the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md). The Ethereum integration uses settlement contracts, a gateway and SP1 proof verification; its [licensing documentation](https://github.com/zeko-labs/ethereum-settlement#licensing) covers Apache and third-party components.

Dependencies for the supporting local examples are listed separately in the [ecosystem dependency record](ecosystem/DEPENDENCIES.md).

## Maintainers & Contributors

The maintainers identified by Zeko Labs are:

- **Zeko Labs — [zekoxyz](https://github.com/zekoxyz)**: team maintainer account.
- **Martin Ondejka, Zeko Labs — [MartinOndejka](https://github.com/MartinOndejka)**: core rollup maintainer. Recent contributions include [durable Ethereum settlement recovery](https://github.com/zeko-labs/zeko/commit/7acd9a9b23d11282517381e04c15690c5198cbea) and [serialization behind settlement finality](https://github.com/zeko-labs/zeko/commit/67a453c25d8606ddc55f6e0e0f3e2eb531ac2c2b).

The [roster](MAINTAINERS.md) lists the maintainers and application contact. Outside contributions are welcome through public issues and pull requests.

## Leadership Team & Decision Process

The Zeko Labs maintainers listed above provide technical leadership. Evan Kereiakes is the AAIF Liaison and application contact. Technical changes are reviewed through public pull requests; a consolidated description of approval and escalation rights is not yet published.

## Lifecycle Stage Evidence

The [Sandbox thesis](proposal.md) describes intended users, the case for importance before adoption and what would justify Growth graduation. The [roadmap](project-plan.md) and [evidence record](evidence/README.md) provide supporting detail.

The proposed Sandbox work is to test the reference integration against a core deployment and gather independent implementer feedback. Growth graduation would require the production adoption, contributor participation and growth plan specified in the [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

## Security

zkSecurity independently audited core Zeko components in two assessments. The [core audit documentation](https://github.com/zeko-labs/zeko/pull/444) links the reports, reviewed scope and finding responses.

The applications and local AAIF examples have separate review and test scope; the core audits do not cover them. The [sandbox documentation](sandbox/README.md) describes the local examples' security assumptions.

Security contact: contact@zeko.io.

## Website URL

https://zeko.io

Documentation: https://docs.zeko.io and https://ethereum.docs.zeko.io/overview

## Documented Governance Practices (if any)

A consolidated Zeko-specific governance document is not yet published. Current stewardship is described in the Governance Model and Leadership Team sections above.

## Links to Social Media Accounts

[Zeko Labs on X](https://twitter.com/ZekoLabs), linked from the [core repository](https://github.com/zeko-labs/zeko).

## Trademark and accounts

- [ ] If the project is accepted, I agree to transfer all project trademarks and accounts to the Linux Foundation under the contribution agreement.

The project-specific asset schedule remains to be agreed with AAIF.

## Details of Existing Financial Sponsorship

Development and infrastructure are supported by **Zeko Labs and its investors**.

## Infrastructure Needs or Requests

Standard source hosting, issue tracking, documentation and CI support appropriate to Sandbox. Zeko Labs currently supports development and infrastructure.

## Additional Information

Our [public-good commitment](PUBLIC_GOOD.md) describes the project's purpose: open-source technology that gives people control over their AI infrastructure, sovereignty and privacy.

## Application contact name(s) and email(s)

**Evan Kereiakes — contact@zeko.io**

## Contributing or sponsoring entity signatory information

| Name | Address | Type | Signatory name and title | Email address |
| --- | --- | --- | --- | --- |
| Zeko Labs Inc. | 16192 Coastal Highway, Lewes, DE 19958 | Corporation | Evan Kereiakes, AAIF Liaison | contact@zeko.io |
