# AAIF Project Proposal — Zeko

**Zeko is a public good for AI freedom, sovereignty and privacy.** Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. Our contribution puts privacy, sovereignty and interoperability at the center of an agent internet protocol suite.

Application draft, 26 October 2026. The submission follows the [current issue form](https://github.com/aaif/project-proposals/blob/main/.github/ISSUE_TEMPLATE/project-proposal.yml), [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) and [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

Proposed issue title: **[Project Proposal] Zeko**

## Project Name

Zeko

## Project Description

Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. We built it so people, agents and organizations can control their AI infrastructure, application rules and delegated authority while remaining interoperable with other agents and services on the open internet. Zeko provides instant transaction confirmation at the rollup level, so concurrent agents coordinate against newly accepted state without waiting for Ethereum settlement. Applications use that state for resource reservations, budgets, work commitments and conditional payments.

Developers define the rules for application state changes, and cryptographic proofs establish that each accepted transition satisfies those rules. Sequencing and recursive proof aggregation let participants verify the specified computation without re-executing every operation. For privacy, applications define what their proofs establish, which information they disclose and who has access; zero-knowledge proofs verify statements without revealing private proof inputs. Security combines these verifiable application rules with permissions that bound agent authority. Core Zeko components have undergone two independent zkSecurity assessments, documented in the [core audit index and reports](https://github.com/zeko-labs/zeko/pull/444).

Enterprises and agent swarms run sovereign rollups with their own keys, configuration and policies, choosing the hosting, identity and confidential-computing integrations their applications need. Ethereum is our primary blockchain compatibility, settlement and bridging layer, with optional settlement connecting independently operated rollups to shared public infrastructure. Zeko originated in Mina and inherited its cryptography and ZK smart contracts. It deployed on Mina mainnet and expanded native settlement options by developing a separate Ethereum settlement architecture with o1Labs and SP1, and deploying Zeko on Ethereum testnet; the [independent Sepolia guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) provides the stack for operators to launch their own Ethereum-connected rollup.

Our proposed AAIF Sandbox contribution is core Zeko, with its Ethereum integration. This repository provides supporting local examples of how AAIF projects use verifiable application state. The applications referenced below are supporting examples, maintained in their own repositories.

## Preferred Lifecycle Stage (if known)

Sandbox

## Alignment with AAIF Mission

Zeko advances AI freedom, sovereignty, privacy and human flourishing through a common, composable protocol for scaling private, sovereign enterprise agents on the open internet. People and organizations retain control over their infrastructure, data, application rules and delegated authority as their agents work across services and organizational boundaries.

The internet protocol suite predates autonomous AI agents and was not designed to govern their shared resources, delegated authority or commitments. Zeko supplies verifiable shared state for that coordination, with reusable interfaces that reduce bespoke pairwise integrations as agent networks grow. Developers compose this layer with existing identity, messaging, tool and execution protocols, while operators choose their models, runtimes and deployment infrastructure.

We publish the protocol and reference integrations under open-source licenses so developers can inspect, use and extend them. Our proposed contribution gives the AAIF community a working protocol to build on, with local examples showing how it fits alongside existing projects.

## Relation to Existing AAIF Projects

Zeko complements existing AAIF interfaces with verifiable shared state:

- **MCP and A2A:** Applications get a shared record of resource reservations and work commitments, so agents coordinate against the same accepted state.
- **goose, agentgateway and Agent Router:** Requests from different clients and routes use the same budget and replay checks, keeping resource accounting consistent across those entry points.
- **Open Responses:** Tool outputs carry receipts tied to accepted state changes, letting applications correlate a reported result with the action it records.
- **OpenSandbox and OpenEnv:** Applications get a common record for job-result commitments and resource consumption, including budgets that remain in force across environment resets.
- **AGENTS.md and Agent Skills:** Teams document and package the same bounded state-action workflow for different agents, with permissions enforced by the application service.

Our [local reference examples](ecosystem/README.md) demonstrate these connections. The MCP example combines a local ID-JAG exchange, AMBA's OAuth and mission checks, and an application proof of the reservation calculation. The examples use a local state service rather than a deployed core rollup or Ethereum settlement; the [compatibility matrix](compatibility.md) records each example's tested scope.

## Example Use Cases and Evidence of Adoption

Initial users are enterprises operating agent fleets, developers of cross-organization agent services, and applications where multiple parties must coordinate resources, commitments or payments under shared rules using internet rails.

Zeko Labs' applications illustrate these uses:

- [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth): identity, discovery, delegated work and mission-bounded authority.
- [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet): machine payments, conditional release and user-approved workflows.
- [zkTLS as an external-data evidence primitive in the prediction-market demo](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market).

These are first-party applications and demos, rather than evidence of independent production adoption. The [local integration results](evidence/README.md) provide reproducible examples, including rejection of replayed requests and conflicting reservations.

Our Sandbox case is that agents working across organizations need shared state they can independently verify. Zeko provides that foundation while letting each operator retain control of its infrastructure and application rules.

## Technical Committee Sponsor (if identified)

Not identified.

## GitHub Repository URL

https://github.com/zeko-labs/zeko

Core implementation: [`src/app/zeko` on `compatible`](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko). The Ethereum settlement integration is maintained in [ethereum-settlement](https://github.com/zeko-labs/ethereum-settlement), and supporting AAIF examples are in [aaif](https://github.com/zeko-labs/aaif).

## License

Apache-2.0 for Zeko-authored and repository-maintained code. See the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md) and [protocol license](https://github.com/zeko-labs/zeko/blob/compatible/src/app/zeko/LICENSE.md). The AAIF integration code is also Apache-2.0.

## Governance Model

Zeko Labs maintains the project. Core maintainers [zekoxyz](https://github.com/zekoxyz) and [Martin Ondejka](https://github.com/MartinOndejka) review contributions through public pull requests.

## CI/CD & Release Workflow

The core's [GitHub Actions workflow](https://github.com/zeko-labs/zeko/blob/compatible/.github/workflows/ci.yaml) builds the sequencer, data-availability layer and signer, and runs sequencer tests. Container build automation is also included.

The selected core candidate is [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed). Its [CI run](https://github.com/zeko-labs/zeko/actions/runs/40358110682) passed the package-build and sequencer-test steps. The latest published release checked on 26 October 2026 was [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5); the selected commit is newer. See the [candidate record](evidence/core-candidate-2026-10-26.md).

The supporting AAIF examples have pinned dependencies, reproducible commands and separately recorded [local test results](evidence/README.md).

## Public-Facing Contribution Process for Specifications

The core repository contains an [inherited contribution guide](https://github.com/zeko-labs/zeko/blob/compatible/CONTRIBUTING.md) and [RFC process](https://github.com/zeko-labs/zeko/tree/compatible/rfcs).

For the AAIF examples, contributors propose interface and compatibility changes through public issues or pull requests, including affected versions and relevant tests. See the [contribution guide](CONTRIBUTING.md).

## Publicly Accessible Issue Tracker

https://github.com/zeko-labs/zeko/issues

## External Project Dependencies

Core Zeko uses Mina-derived ledger, cryptographic and transaction components, with upstream license notices preserved as described in the [core licensing statement](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md). The Ethereum integration uses settlement contracts, a gateway and SP1 proof verification; its [licensing documentation](https://github.com/zeko-labs/ethereum-settlement#licensing) covers Apache and third-party components.

Dependencies for the supporting local examples are listed separately in the [ecosystem dependency record](ecosystem/DEPENDENCIES.md).

## Maintainers & Contributors

The maintainers identified by Zeko Labs are:

- **Zeko Labs — [zekoxyz](https://github.com/zekoxyz)**: team maintainer account.
- **Martin Ondejka, Zeko Labs — [MartinOndejka](https://github.com/MartinOndejka)**: core rollup maintainer. Recent contributions include [durable Ethereum settlement recovery](https://github.com/zeko-labs/zeko/commit/7acd9a9b23d11282517381e04c15690c5198cbea) and [serialization behind settlement finality](https://github.com/zeko-labs/zeko/commit/67a453c25d8606ddc55f6e0e0f3e2eb531ac2c2b).

The [roster](MAINTAINERS.md) lists the maintainers and application contact. Outside contributions are welcome through public issues and pull requests.

## Leadership Team & Decision Process

The Zeko Labs maintainers listed above provide technical leadership, with technical discussions and code review conducted through public issues and pull requests. Evan Kereiakes is the AAIF Liaison and application contact.

## Lifecycle Stage Evidence

The [Sandbox thesis](proposal.md) describes intended users, the case for importance before adoption and what would justify Growth graduation. The [roadmap](project-plan.md) and [evidence record](evidence/README.md) provide supporting detail.

The proposed Sandbox work is to test the reference integration against a core deployment and gather independent implementer feedback. Growth graduation would require the production adoption, contributor participation and growth plan specified in the [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

## Security

zkSecurity independently audited core Zeko components in two assessments. The [core audit documentation](https://github.com/zeko-labs/zeko/pull/444) links the reports, reviewed scope and finding responses.

These audits cover core protocol components. Supporting applications and demos are outside their scope.

Security contact: contact@zeko.io.

## Website URL

https://zeko.io

Documentation: https://docs.zeko.io

## Documented Governance Practices (if any)

Zeko Labs maintains the project through [zekoxyz](https://github.com/zekoxyz) and [Martin Ondejka](https://github.com/MartinOndejka). Contributions are submitted through public issues and pull requests for maintainer review; see the [contribution guide](CONTRIBUTING.md).

## Links to Social Media Accounts

[X](https://x.com/ZekoLabs) · [Discord](https://discord.gg/vSDxqAchUY) · [Telegram](https://t.me/zekoprotocol) · [Medium](https://medium.com/zekolabs)

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
