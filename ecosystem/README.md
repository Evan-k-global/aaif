# AAIF ecosystem: local demos with verifiable shared state

Ten project folders show how the [current AAIF suite](https://aaif.io/projects) can participate in workflows using Zeko's application-state model. The common benefit is bounded authority and a shared, checkable record of resource consumption and accepted commitments across different clients and services.

The suite runs locally without a hosted model, commercial identity provider, wallet, funded transaction, deployed rollup or remote container cluster. Setup downloads pinned open-source dependencies. Host APIs bind to loopback; OpenSandbox uses a local Docker worker with deny-by-default egress and a synthetic local canary. The full native reference run is supported on **macOS arm64, Node.js 24, Python 3.12+ and a running local Docker daemon** (tested with OrbStack).

## Run the suite

```sh
npm ci --ignore-scripts
npm run ecosystem:setup -- --docker
npm run ecosystem:demo
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json
```

For one project, add `-- --project mcp` to the demo or proof command. See the [runbook](RUNBOOK.md) for setup, isolation, evidence and limitations.

## Development roadmap

We are extending these examples with recovery, cross-client coordination and stronger receipt verification. The next milestones build on the working local suite; core-rollup acceptance and optional Ethereum verification remain separate deployment work.

| Project | Next local milestone | Completion evidence |
| --- | --- | --- |
| [MCP](mcp/README.md#development-roadmap) | Receipt/status lookup and reconnect reconciliation | Another client recovers an accepted result without another effect |
| [A2A](a2a/README.md#development-roadmap) | Task-to-commitment lifecycle | Delivery, changed scope and cancellation stay correlated with state |
| [goose](goose/README.md#development-roadmap) | Two-session handoff and visible rejection | Restart/provider-session changes do not widen authority or repeat work |
| [agentgateway](agentgateway/README.md#development-roadmap) | Two gateway routes sharing one authority | Competing routes consume one budget; failover cannot duplicate an effect |
| [Agent Router](agent-router/README.md#development-roadmap) | Controlled route failover and reconciliation | Preserved action identity and one accepted effect after a lost response |
| [Open Responses](open-responses/README.md#development-roadmap) | Multi-call bindings and independent proof checking | Swapped, altered and unaccepted receipts fail |
| [OpenSandbox](opensandbox/README.md#development-roadmap) | Admission before execution and explicit result lifecycle | Rejected work creates no worker; duplicate delivery cannot charge twice |
| [OpenEnv](openenv/README.md#development-roadmap) | Multiple environment instances and explicit trial domains | Shared scarcity survives resets; independent trials remain isolated |
| [Agent Skills](agent-skills/README.md#development-roadmap) | Packaged receipt verification and rejected-action handling | Portable script, reference validation and safe machine-readable outcomes |
| [AGENTS.md](agents-md/README.md#development-roadmap) | Reproducible coding-agent maintenance exercise | Actual implementation behavior is checked separately from document presence |

## Project-by-project coverage

| Project | What actually executes | Benefit exercised |
| --- | --- | --- |
| [MCP](mcp/README.md) | Official SDK clients and server; concurrent resource calls | Two clients cannot spend the same remaining quota; replay cannot dispatch again |
| [A2A](a2a/README.md) | Official SDK v1 JSON-RPC client/server | An agent exchange can carry an action backed by one accepted commitment |
| [goose](goose/README.md) | Native goose CLI and real MCP extension; deterministic local model fixture | An agent client uses a bounded task and receives state evidence without a hosted model |
| [agentgateway](agentgateway/README.md) | Native gateway routing MCP traffic to the local broker | Routing preserves the common action gate; changed requests and replay are rejected |
| [Agent Router](agent-router/README.md) | Native `aigw` plus Envoy, routing local model and MCP requests | The control plane can expose the same stateful tool while sharing authoritative quota |
| [Open Responses](open-responses/README.md) | Official schema validation and local non-streaming function-call exchange | Tool call IDs and accepted receipts remain correlated; changed call IDs fail |
| [OpenSandbox](opensandbox/README.md) | Official SDK, lifecycle server, execd Docker worker and egress sidecar | A real job's input/image/result commitment is accepted once; modified results and replay fail; outbound traffic to a local canary is denied |
| [OpenEnv](openenv/README.md) | Official typed Environment implemented in process | An episode reset cannot replenish an independently held shared budget |
| [Agent Skills](agent-skills/README.md) | Official reference validator and an executable packaged skill script | Reusable instructions and tooling consume existing authority rather than granting it |
| [AGENTS.md](agents-md/README.md) | Workspace instructions with an executable companion scenario | Coding-agent instructions describe the same bounded action and receipt workflow |

These are selected integration examples, not certification of every feature or production configuration. OpenSandbox executes a real container; OpenEnv is an in-process environment. Agent Skills and AGENTS.md are instruction formats, not settlement engines. The evidence records these distinctions rather than treating all ten as equivalent runtime tests.

## One shared application boundary

Each scenario uses the same backend and state profile. Canonical AMBA OAuth and ID-JAG run against a synthetic local provider. A trusted test approver binds a mission to an exact action before its state write. In OpenSandbox, the host verifies a completed job's deterministic result before approving its commitment; this is result recording, not pre-execution compute-budget enforcement. The loopback broker accepts only preapproved action IDs and units, then invokes the authenticated MCP/AMBA backend. It is test orchestration, not an enterprise identity broker implementation.

```mermaid
flowchart LR
  C[Clients and agent exchanges] --> T[Tools and routing]
  I[Instructions and skill scripts] --> B[Preapproved local action broker]
  T --> B
  X[Execution and evaluation fixtures] --> B
  B --> A[AMBA action gate]
  A --> P[Real application proof and verification]
  P --> L[Local shared-state authority]
  L -. deployment adapter still required .-> Z[Zeko rollup]
  Z -. separate acceptance profile .-> E[Ethereum]
```

A successful action returns a receipt containing its domain/action commitment, state version and remaining quota. Proof mode adds a real o1js reservation proof. The circuit proves quota arithmetic and version advancement with public domain/action commitments; AMBA authorization is checked separately by the service. Proofs and sandbox receipts do not establish canonical Zeko core state or Ethereum finality.

## Technical Committee question

The examples demonstrate a practical integration seam: different agent interfaces can use the same bounded state action while preserving their own client, transport, routing, execution or instruction role. Observable benefits are rejected duplicate/changed actions, consistent resource accounting and correlated result evidence. These results do not establish improved model quality, lower cost or production adoption for every upstream implementation.

The next deployment milestone is a pinned adapter that replaces local state acceptance with a core Zeko application/sequencer/DA path. Ethereum verification/settlement is a separately tested profile. The local suite makes that boundary explicit while giving implementers useful code and fixtures now.

Sources and pins: [component versions](versions.json), [binary checksums](binaries.json), [Python lock](requirements.lock), [current evidence](../evidence/README.md), [compatibility matrix](../compatibility.md).
