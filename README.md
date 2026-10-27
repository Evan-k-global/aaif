# Zeko: Open Infrastructure for Sovereign AI

**Zeko is a public good for AI freedom, sovereignty and privacy.** We built open-source rollup infrastructure for verifiable shared state across agent applications. People and organizations control their infrastructure, application rules and delegated authority. Our mission is to democratize AI and advance human flourishing.

We deployed Zeko on Mina mainnet and Ethereum testnet. zkSecurity audited core components. This repository contains working AAIF integrations, compatibility tests and reproducible evidence. The rollup implementation lives in [Zeko core](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko).

## Run an authorized agent action

Use Node.js 24 and OpenSSL. This example needs no wallet, provider account or Docker daemon.

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
| Agent interfaces | [Ecosystem adapters](ecosystem/README.md) | Connect clients, gateways, messages, workers and instruction formats |

The examples use a local serialized state authority and synthetic identity/model fixtures. Their proofs cover public reservation statements. Connecting this interface to a core Zeko sequencer/DA deployment and Ethereum verification is the next backend milestone. The [architecture guide](ecosystem/DEVELOPMENT.md) explains the action/receipt contract and acceptance stages.

## Choose an AAIF integration

| What you are building | Example | What it demonstrates |
| --- | --- | --- |
| Agent tools and personal-agent clients | [MCP](ecosystem/mcp/README.md), [goose](ecosystem/goose/README.md) | Approved tool calls, shared quota and replay rejection |
| Work between independent agents | [A2A](ecosystem/a2a/README.md) | Agent messages tied to one accepted commitment |
| Model and tool routing | [agentgateway](ecosystem/agentgateway/README.md), [Agent Router](ecosystem/agent-router/README.md) | Native routing that preserves the backend action gate |
| Provider-neutral tool responses | [Open Responses](ecosystem/open-responses/README.md) | Call/result correlation and accepted receipt checks |
| Isolated agent jobs | [OpenSandbox](ecosystem/opensandbox/README.md) | Real Docker execution, denied egress and a verified result commitment |
| Shared-resource evaluation | [OpenEnv](ecosystem/openenv/README.md) | A common budget that survives episode resets |
| Portable agent tooling | [Agent Skills](ecosystem/agent-skills/README.md), [AGENTS.md](ecosystem/agents-md/README.md) | Validated skill packaging and executable instruction companions |

Each guide contains the Zeko integration, source entry point, run command, measured scope and next development milestone. Run an individual Node example after the basic install:

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

The [published evidence](evidence/README.md) records 21 unit/integration tests, 30 compatibility cases and 62 checks across ten proof-backed ecosystem examples. Reports identify source digests, component versions and acceptance scope. The [compatibility matrix](compatibility.md) separates tested interfaces from deployment milestones.

## Deploy a sovereign rollup

The [Ethereum Sepolia deployment guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) launches an operator-owned stack with its own keys, genesis, contracts and bridge/explorer tooling. The guide distinguishes its default mock Ethereum verifier from real-verification configuration. [Ethereum architecture](https://ethereum.docs.zeko.io/overview) covers settlement and bridging; [Phala hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) adds an optional confidential-computing deployment path.

The [core audit index](https://github.com/zeko-labs/zeko/pull/444) links zkSecurity's assessments and component scope. The [core candidate record](evidence/core-candidate-2026-10-26.md) identifies the selected revision and passing upstream build.

## Application and primitive references

| Capability | Code and examples |
| --- | --- |
| Agent discovery and bounded delegation | [SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) and [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) |
| Machine payments and approved workflows | [x402-Zeko](https://github.com/zeko-labs/x402-zeko) and [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) |
| zkTLS external-data evidence | [Prediction-market implementation](https://github.com/zeko-labs/developer_demos/tree/main/perfect-weather_prediction_market) and [partner verification PoC](https://github.com/zeko-labs/zk-verify-poc) |

The prediction market demonstrates zkTLS; extracting a reusable adapter is the next step. These applications have their own review and deployment scopes, separate from the core audits.

## Contribute

Submit fixes, test vectors and independent reproductions through the [contribution process](CONTRIBUTING.md). The [project roadmap](project-plan.md) covers recovery, core-backed acceptance and stewardship. [Maintainers and contact](MAINTAINERS.md) identify the team responsible for the work.

## AAIF proposal

We propose core Zeko for the AAIF Sandbox stage. Review the [full application](application.md) and [short thesis](proposal.md). The application remains a draft. Our [public-good commitment](PUBLIC_GOOD.md) and [working-group relevance](working-groups.md) explain the mission and ecosystem contribution.
