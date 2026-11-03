# Zeko: Open Infrastructure for Sovereign AI

**Zeko is a public good for AI freedom, sovereignty and privacy.** Zeko is an open-source agentic rollup protocol for verifiable shared state across agent applications. People and organizations control their infrastructure, application rules and delegated authority. Our mission is to democratize AI and advance human flourishing.

AI agents work across applications, businesses and the open internet. Coordinating that work requires shared rules for permissions, resources, payments and accepted results. Zeko gives developers a common foundation for those rules: application state that independent participants verify with cryptographic proofs. Personal agents, enterprises and agent swarms retain their choice of models, services and infrastructure. For the AI industry, Zeko is an open coordination layer that connects independent systems and keeps control with the people who use them.

## AAIF Sandbox contribution

We propose core Zeko and its Ethereum settlement integration for AAIF Sandbox. Zeko has deployed on Mina mainnet and Ethereum testnet. Review the [application](application.md) and [short thesis](proposal.md).

This repository provides reference integrations for AAIF projects, compatibility tests and reproducible evidence for Zeko's open-source agentic rollup protocol. The protocol implementation and Ethereum settlement integration remain in their canonical repositories.

- **Core protocol:** [Rollup implementation](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko).
- **Ethereum:** [Settlement integration](https://github.com/zeko-labs/ethereum-settlement).
- **Audits:** [Canonical zkSecurity reports and scope](https://github.com/zeko-labs/zeko/tree/compatible/audits).
- **Revision and CI:** [Selected core candidate and passing build](evidence/core-candidate-2026-11-03.md).

The reference integrations use local identity and state services with real application proofs; deployed core acceptance and Ethereum settlement are separate integration milestones. The [compatibility matrix](compatibility.md) defines tested scope.

## Run an authorized agent action

Use Node.js 24 and OpenSSL. This integration needs no wallet, provider account or Docker daemon.

```sh
git clone https://github.com/zeko-labs/aaif.git
cd aaif
npm ci --ignore-scripts
npm run demo
npm run demo:proofs
```

The workflow signs in a synthetic user, exchanges an ID-JAG for resource access, calls an MCP tool and enforces an AMBA mission. It reserves 70 of 100 resource units, then rejects a repeated action. Both runs return these results:

```json
{
  "authorizedReservation": true,
  "replayRejected": true,
  "accepted": 1,
  "effects": 1,
  "remaining": 30
}
```

`demo:proofs` also generates and verifies a real o1js application proof. The first proof run compiles the circuit and caches the build. See the [sandbox guide](sandbox/README.md) for the complete flow and output scope.

## Understand the integration

The request path is **SSO → ID-JAG resource access → MCP tool → AMBA action gate → proof verification → accepted state**. Identity establishes access. The mission limits the exact action. The state service prevents conflicting consumption and replay.

| Component | Implementation | Responsibility |
| --- | --- | --- |
| Enterprise access | [ID-JAG integration](integrations/id-jag/README.md) | Discovery, two-hop token exchange and resource context |
| Bounded authority | [AMBA integration](sandbox/amba-gate.mjs) | Mission approval, holder binding and action checks |
| Accepted state | [State service](sandbox/server.mjs) | Serialize reservations, enforce quota and gate effects |
| Verifiable transition | [Proof program](sandbox/proof.mjs) | Prove reservation arithmetic and bind domain/action commitments |
| Agent interfaces | [Reference integrations](ecosystem/README.md) | Connect clients, gateways, messages, workers and instruction formats |

The [architecture guide](ecosystem/DEVELOPMENT.md) explains the action/receipt contract and acceptance stages.

## Choose a reference integration

| What you are building | Reference integration | What it demonstrates |
| --- | --- | --- |
| Agent tools and personal-agent clients | [MCP](ecosystem/mcp/README.md), [goose](ecosystem/goose/README.md) | Approved tool calls, shared quota and replay rejection |
| Work between independent agents | [A2A](ecosystem/a2a/README.md) | Agent messages tied to one accepted commitment |
| Model and tool routing | [agentgateway](ecosystem/agentgateway/README.md), [Agent Router](ecosystem/agent-router/README.md) | Native routing that preserves the backend action gate |
| Provider-neutral tool responses | [Open Responses](ecosystem/open-responses/README.md) | Call/result correlation and accepted receipt checks |
| Isolated agent jobs | [OpenSandbox](ecosystem/opensandbox/README.md) | Real Docker execution, denied egress and a verified result commitment |
| Shared-resource evaluation | [OpenEnv](ecosystem/openenv/README.md) | A common budget that survives episode resets |
| Portable agent tooling | [Agent Skills](ecosystem/agent-skills/README.md), [AGENTS.md](ecosystem/agents-md/README.md) | Validated skill packaging and executable instruction companions |

Each guide contains the Zeko integration, source entry point, run command, measured scope and next development milestone. Run one Node reference integration after the basic install:

```sh
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp
```

The full ten-project suite uses macOS arm64, Python 3.12+ and a running local Docker daemon; OrbStack is the tested runtime. Prepare the pinned native/Python dependencies and Docker images, then run:

```sh
npm run ecosystem:setup -- --docker
npm run ecosystem:proofs -- --report .cache/ecosystem/full-suite.json
```

The [runbook](ecosystem/RUNBOOK.md) covers prerequisites, local networking, cleanup and report interpretation.

## Verify the guarantees

| Command | Checks |
| --- | --- |
| `npm run test:sandbox` | Identity/client helpers, enforcement, harness behavior and network guards |
| `npm run tck:idjag` | Signed grants, tenant/client/resource context and denied access |
| `npm run tck:proofs` | Invalid proofs, wrong keys/domains, concurrency, replay and independent verification |

The [published evidence](evidence/README.md) records 21 unit/integration tests, 30 compatibility cases and 62 checks across ten proof-backed reference integrations for AAIF projects. Reports identify source digests, component versions and acceptance scope.

The compatibility profiles are not an AAIF certification. AAIF Sandbox status is not an endorsement.

## Deploy a sovereign rollup

The [Ethereum Sepolia deployment guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) launches an operator-owned stack with its own keys, genesis, contracts and bridge/explorer tooling. The guide distinguishes its default mock Ethereum verifier from real-verification configuration. [Phala hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) adds an optional confidential-computing deployment path.

## Application and primitive references

| Capability | Code and examples |
| --- | --- |
| Agent discovery and bounded delegation | [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) |
| Machine payments and approved workflows | [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) |
| zkTLS external-data evidence | [Prediction-market implementation](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market) and [partner verification PoC](https://github.com/zeko-labs/zk-verify-poc) |

The prediction market demonstrates zkTLS; extracting a reusable adapter is the next step. These applications have their own review and deployment scopes, separate from the core audits.

## Contribute

Submit fixes, test vectors and independent reproductions through the [contribution process](CONTRIBUTING.md). The [project roadmap](project-plan.md) covers recovery, core-backed acceptance and stewardship. [Maintainers, contributors and contact](MAINTAINERS.md) identify the people responsible for the work. Our [public-good commitment](PUBLIC_GOOD.md) and [working-group relevance](working-groups.md) explain the mission and technical contribution.
