# AAIF Project Proposal — Zeko

**Zeko is a public good for AI freedom, sovereignty and privacy.** Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. Our contribution puts privacy, sovereignty and interoperability at the center of an agent internet protocol suite.

Submission answers, reviewed 3 November 2026 against the [official issue form](https://github.com/aaif/project-proposals/blob/main/.github/ISSUE_TEMPLATE/project-proposal.yml), [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) and [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

Proposed issue title: **[Project Proposal] Zeko**

## Project Name

Zeko

## Project Description

Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. We built it so people, agents and organizations can control their AI infrastructure, application rules and delegated authority while remaining interoperable with other agents and services on the open internet. Zeko provides instant transaction confirmation at the rollup level, so concurrent agents coordinate against newly accepted state without waiting for Ethereum settlement. Applications use that state for resource reservations, budgets, work commitments and conditional payments.

Developers define application rules and permissions, and cryptographic proofs verify the specified state transitions. Sequencing and recursive proof aggregation let participants verify computation without re-executing every operation. Applications choose what information to disclose and who has access; zero-knowledge proofs verify statements without revealing private proof inputs. Core Zeko components have undergone two separate zkSecurity assessments, documented in the [core audit index](https://github.com/zeko-labs/zeko/tree/compatible/audits).

Enterprises and agent swarms run sovereign rollups with their own keys, configuration and policies, choosing the hosting, identity and confidential-computing integrations their applications need. Ethereum is our primary blockchain compatibility, settlement and bridging layer. Zeko originated in Mina and inherited its cryptography and ZK smart contracts. It deployed on Mina mainnet and expanded native settlement options by developing a separate Ethereum settlement architecture with o1Labs and SP1, and deploying Zeko on Ethereum testnet. The [independent Sepolia guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) provides the stack for operators to launch their own Ethereum-connected rollup. Its default demo profile uses a mock Ethereum verifier; the guide separately documents real SP1 verification configuration. [Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) is one optional deployment example.

Our proposed AAIF Sandbox contribution is [core Zeko](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko), with its [Ethereum settlement integration](https://github.com/zeko-labs/ethereum-settlement). The [AAIF integration repository](https://github.com/zeko-labs/aaif) provides local compatibility examples. Supporting applications remain in their own repositories.

## Preferred Lifecycle Stage (if known)

Sandbox

## Alignment with AAIF Mission

Zeko advances AI freedom, sovereignty, privacy and human flourishing through a common, composable protocol for scaling private, sovereign enterprise agents on the open internet. People and organizations retain control over their infrastructure, data, application rules and delegated authority as their agents work across services and organizational boundaries.

The internet protocol suite predates autonomous AI agents and was not designed to govern their shared resources, delegated authority or commitments. Zeko supplies verifiable shared state for that coordination, with reusable interfaces that reduce bespoke pairwise integrations as agent networks grow. Developers compose this layer with existing identity, messaging, tool and execution protocols, while operators choose their models, runtimes and deployment infrastructure.

We publish the protocol and reference integrations under open-source licenses so developers can inspect, use and extend them. Our proposed contribution gives the AAIF community a working protocol to build on, with local examples showing how it fits alongside existing projects.

## Relation to Existing AAIF Projects

Zeko gives applications built with AAIF projects shared, verifiable state for resource use and work commitments:

- **MCP and A2A:** Concurrent agents coordinate tool actions, reservations and work commitments against the same accepted state, with instant confirmation at the rollup level.
- **goose:** User-approved resource limits are enforced by the application service and recorded outside the model's context, keeping delegated authority under the user's control.
- **agentgateway and Agent Router:** Independently operated services share verifiable resource accounting, so requests arriving through different gateways compete against the same available budget.
- **Open Responses:** Tool results carry receipts linked to accepted application-state changes, giving clients evidence of the recorded action alongside the response.
- **OpenSandbox:** Job inputs, runtime images and submitted results are bound into shared commitments, making accepted work traceable outside temporary containers.
- **OpenEnv:** Shared resource limits persist outside an episode, allowing evaluations to test competition and overspending across environment resets.
- **AGENTS.md and Agent Skills:** Reusable instructions and scripts invoke actions whose permissions are enforced by application code, giving different agents consistent operational rules.

Our [local reference examples](https://github.com/zeko-labs/aaif/blob/main/ecosystem/README.md) demonstrate these connections. The MCP example combines a local ID-JAG exchange, AMBA's OAuth and mission checks, and an application proof of the reservation calculation. The [technology compatibility kit](https://github.com/zeko-labs/aaif/blob/main/tck/README.md) tests the selected identity and state profiles. These examples use local identity and state services; the [compatibility matrix](https://github.com/zeko-labs/aaif/blob/main/compatibility.md) records their tested scope and the remaining core-deployment integration.

## Example Use Cases and Evidence of Adoption

Initial users are enterprises operating agent fleets, developers of cross-organization agent services, and applications where multiple parties must coordinate resources, commitments or payments under shared rules using internet rails.

Zeko Labs' applications illustrate these uses:

- [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth): identity, discovery, delegated work and mission-bounded authority.
- [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet): machine payments, conditional release and user-approved workflows.
- [zkTLS as an external-data evidence primitive in the prediction-market demo](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market).

The [developer demos](https://github.com/zeko-labs/developer_demos) also include agent execution escrow, a verifiable AI runtime, private order books and programmable asset flows. The [public Zeko agent skill](https://github.com/zeko-labs/zeko-skills) packages practical bridging, endpoint and development guidance.

These are first-party applications and demos, rather than evidence of independent production adoption. The [local integration results](https://github.com/zeko-labs/aaif/blob/main/evidence/README.md) provide reproducible examples, including rejection of replayed requests and conflicting reservations.

Our Sandbox case is that agents working across organizations need shared state they can independently verify. Zeko provides that foundation while letting each operator retain control of its infrastructure and application rules.

## Technical Committee Sponsor (if identified)

Not identified.

## GitHub Repository URL

https://github.com/zeko-labs/zeko

## License

Apache-2.0

## Governance Model

Zeko Labs maintains the project. Core maintainers [zekoxyz](https://github.com/zekoxyz) and [Martin Ondejka](https://github.com/MartinOndejka) review contributions through public pull requests.

Zeko Labs agrees to adopt the Linux Foundation technical charter as part of AAIF admission.

## CI/CD & Release Workflow

The core's [GitHub Actions workflow](https://github.com/zeko-labs/zeko/blob/compatible/.github/workflows/ci.yaml) builds the sequencer, data-availability layer and signer, and runs sequencer tests. Container build automation is also included.

The selected core commit is [`49fb253de86ce9188bcd289a8d5bb09e04164084`](https://github.com/zeko-labs/zeko/commit/49fb253de86ce9188bcd289a8d5bb09e04164084), the current `compatible` head checked on 3 November 2026. Its [CI run](https://github.com/zeko-labs/zeko/actions/runs/40560236657) completed successfully. Releases are published as GitHub tags; the latest published release is [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5), dated 22 June 2026. See the [candidate record](https://github.com/zeko-labs/aaif/blob/main/evidence/core-candidate-2026-11-03.md).

The supporting AAIF examples have pinned dependencies, reproducible commands and separately recorded [local test results](https://github.com/zeko-labs/aaif/blob/main/evidence/README.md).

## Public-Facing Contribution Process for Specifications

The core repository publishes a [contribution guide](https://github.com/zeko-labs/zeko/blob/compatible/CONTRIBUTING.md) and [RFC directory](https://github.com/zeko-labs/zeko/tree/compatible/rfcs). Protocol changes are proposed through public issues and pull requests for maintainer review.

Changes to the AAIF compatibility profiles include affected versions and relevant tests; see the [contribution guide](https://github.com/zeko-labs/aaif/blob/main/CONTRIBUTING.md).

## Publicly Accessible Issue Tracker

https://github.com/zeko-labs/zeko/issues

## External Project Dependencies

Principal dependencies are Mina and the Pickles/Kimchi proof systems (Apache-2.0), Snarky (MIT), and o1js (Apache-2.0). The Ethereum settlement integration uses SP1 (MIT/Apache-2.0) and OpenZeppelin contracts (MIT); its [licensing documentation](https://github.com/zeko-labs/ethereum-settlement#licensing) identifies Apache-2.0 and MIT components. Exact dependency definitions are in the core [OPAM export](https://github.com/zeko-labs/zeko/blob/compatible/opam.export), [submodules](https://github.com/zeko-labs/zeko/blob/compatible/.gitmodules) and Ethereum [Cargo workspace](https://github.com/zeko-labs/ethereum-settlement/blob/main/Cargo.toml).

Dependencies for the supporting local examples are listed separately in the [ecosystem dependency record](https://github.com/zeko-labs/aaif/blob/main/ecosystem/DEPENDENCIES.md).

## Maintainers & Contributors

The maintainers identified by Zeko Labs are:

- **Zeko Labs — [zekoxyz](https://github.com/zekoxyz)**: team maintainer account.
- **Martin Ondejka, Zeko Labs — [MartinOndejka](https://github.com/MartinOndejka)**: core rollup maintainer. Recent contributions include [durable Ethereum settlement recovery](https://github.com/zeko-labs/zeko/commit/7acd9a9b23d11282517381e04c15690c5198cbea) and [serialization behind settlement finality](https://github.com/zeko-labs/zeko/commit/67a453c25d8606ddc55f6e0e0f3e2eb531ac2c2b).

The [roster](https://github.com/zeko-labs/aaif/blob/main/MAINTAINERS.md) lists the maintainers and application contact. Outside contributions are welcome through public issues and pull requests.

## Leadership Team & Decision Process

The Zeko Labs maintainers listed above provide technical leadership, with technical discussions and code review conducted through public issues and pull requests. Evan Kereiakes is the AAIF Liaison and application contact.

## Lifecycle Stage Evidence

The [Sandbox thesis](https://github.com/zeko-labs/aaif/blob/main/proposal.md) describes intended users, the case for importance before adoption and what would justify Growth graduation. The [roadmap](https://github.com/zeko-labs/aaif/blob/main/project-plan.md) and [evidence record](https://github.com/zeko-labs/aaif/blob/main/evidence/README.md) provide supporting detail.

Sandbox priorities are a core-backed integration, independent reproduction and contributions from outside Zeko Labs. Growth graduation would be justified by production use at two unaffiliated organizations, commits from at least two organizations over the preceding six months, and a sponsor-accepted growth plan, as required by the [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

## Security

zkSecurity audited core Zeko components in two separate assessments: [circuits and bridge rules in 2025](https://reports.zksecurity.xyz/reports/zeko/), and [circuit changes, sequencer/prover pipeline, DA, deployment and recovery in 2026](https://reports.zksecurity.xyz/reports/zeko-2/). The [core audit index](https://github.com/zeko-labs/zeko/tree/compatible/audits) links the reviewed scope and finding responses.

These audits cover core protocol components. Supporting applications and demos are outside their scope.

Security contact: contact@zeko.io.

## Website URL

https://zeko.io

## Documented Governance Practices (if any)

Zeko Labs maintains the project through [zekoxyz](https://github.com/zekoxyz) and [Martin Ondejka](https://github.com/MartinOndejka). Contributions are submitted through public issues and pull requests for maintainer review; see the [contribution guide](https://github.com/zeko-labs/aaif/blob/main/CONTRIBUTING.md).

## Links to Social Media Accounts

[X](https://x.com/ZekoLabs) · [Discord](https://discord.gg/vSDxqAchUY) · [Telegram](https://t.me/zekoprotocol) · [Medium](https://medium.com/zekolabs)

## Trademark and accounts

Zeko Labs agrees to transfer all project trademarks and accounts to the Linux Foundation under the contribution agreement.

## Details of Existing Financial Sponsorship

Development and infrastructure are supported by **Zeko Labs and its investors**.

## Infrastructure Needs or Requests

Standard source hosting, issue tracking, documentation and CI support appropriate to Sandbox. Zeko Labs currently supports development and infrastructure.

## Additional Information

Our [public-good commitment](https://github.com/zeko-labs/aaif/blob/main/PUBLIC_GOOD.md) describes the project's purpose: open-source technology that gives people control over their AI infrastructure, sovereignty and privacy. Technical and deployment documentation is published at [docs.zeko.io](https://docs.zeko.io).

## Application contact name(s) and email(s)

**Evan Kereiakes — contact@zeko.io**

## Contributing or sponsoring entity signatory information

| Name | Address | Type | Signatory name and title | Email address |
| --- | --- | --- | --- | --- |
| Zeko Labs Inc. | 16192 Coastal Highway, Lewes, DE 19958 | Corporation | Evan Kereiakes, AAIF Liaison | contact@zeko.io |
