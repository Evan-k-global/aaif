# Zeko: verifiable shared state across agent applications

**Zeko is a public good for AI freedom, sovereignty and privacy.** We built an open-source agentic rollup protocol that lets independently operated agents share verifiable application state while people retain control of their infrastructure and delegated authority.

Sandbox thesis, reviewed 3 November 2026. [Application](application.md) · [Core candidate](evidence/core-candidate-2026-11-03.md) · [Evidence](evidence/README.md).

## Contribution

Agents coordinate resources, budgets, work and payments across applications and organizations. They need a common way to determine which actions are authorized and which state changes have been accepted. Zeko supplies that shared-state layer. Developers define application rules and permissions; cryptographic proofs verify specified state transitions, and recursive aggregation makes those transitions independently checkable without re-executing every operation.

Zeko provides instant transaction confirmation at the rollup level, so concurrent agents coordinate against newly accepted state without waiting for Ethereum settlement. Confirmation, proof verification and external settlement remain distinct stages. Applications choose their disclosure rules and private proof inputs.

Enterprises and agent swarms operate sovereign rollups with their own keys, configuration and policies. They choose their models, agent runtimes, identity systems and hosting. Ethereum is our principal blockchain compatibility, settlement and bridging focus. Zeko originated in Mina, inherited its cryptography and ZK smart contracts, deployed on Mina mainnet and expanded to Ethereum testnet through a separate settlement architecture with o1Labs and SP1. The [Sepolia operator guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) documents independent deployment; [Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) is an optional infrastructure example.

The proposed contribution is [core Zeko](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko), with its [Ethereum settlement integration](https://github.com/zeko-labs/ethereum-settlement). The code is Apache-2.0 for Zeko-authored components. Supporting applications remain separately maintained. The [audit index](https://github.com/zeko-labs/zeko/tree/compatible/audits) links two independent zkSecurity assessments of core components and their published finding responses.

## Intended users and importance before adoption

Initial users are enterprises operating agent fleets, developers of cross-organization agent services, and applications where multiple parties must coordinate resources, commitments or payments under shared rules using internet rails.

First-party implementations make the uses concrete: [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) connect identity, delegated work and bounded authority; [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) explore payments and approved workflows. [zkTLS external-data evidence](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market) is demonstrated in the prediction market. These implementations are supporting evidence, not a claim of independent production adoption.

The importance-before-adoption case is practical: shared resources and commitments need independently verifiable rules as agents begin working across organizational boundaries. A common protocol reduces bespoke integration while preserving operator choice. AAIF offers a place to develop that interoperability with the projects agents already use.

## Working implementation and ecosystem fit

MCP and A2A carry tool and agent interactions; goose invokes tools; gateways route requests; Open Responses carries tool outputs; execution environments and instruction formats retain their existing roles. Zeko adds shared application state behind those interfaces.

Our [local integration](sandbox/README.md) combines AMBA OAuth and mission enforcement, an ID-JAG exchange, the official MCP SDK and real o1js reservation proofs. On 3 November, 21 unit/integration tests and all 30 identity/shared-state profile cases passed. The [ten-project examples](ecosystem/README.md) also have recorded local results. Their identity and state services are local fixtures; deployed core acceptance and Ethereum settlement are separate integration work.

## Sandbox objectives and Growth graduation

Sandbox priorities are connecting the reference profile to a core deployment, obtaining independent reproduction and growing contributions beyond Zeko Labs. We welcome outside code, test vectors and deployment feedback through public pull requests.

Growth would be justified by production use at two unaffiliated organizations, commits from at least two organizations over the preceding six months, a documented committer-acceptance process and a sponsor-accepted growth plan under the [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md).

Zeko Labs maintains the project through zekoxyz and Martin Ondejka. Evan Kereiakes is the AAIF Liaison and application contact at contact@zeko.io. Zeko Labs agrees to transfer project trademarks and accounts under the contribution agreement. Our purpose is open infrastructure for privacy, sovereignty, interoperability and human flourishing.
