# Run the AAIF ecosystem examples locally

## Prerequisites and setup

The full native reference suite is tested on macOS arm64 with Node.js 24, Python 3.12+, OpenSSL, tar and macOS sandbox-exec. No Docker daemon is needed. Other platforms have not been validated for the full native suite.

```sh
npm ci --ignore-scripts
npm run ecosystem:setup
```

If Python 3.12 is not on PATH, set `AAIF_SETUP_PYTHON` to its executable when running setup. An already prepared environment can select its isolated Python via `AAIF_DEMO_PYTHON`.

Setup downloads public open-source artifacts, checksum-verifies the native binaries and schema, and installs the exact Python lock in `.cache/ecosystem/python`. It does not create cloud resources, accounts, containers or blockchain deployments. Downloaded binaries, TLS material, caches and temporary configuration remain ignored by Git.

## Execute

```sh
# All ten project examples, using local state without a proof
npm run ecosystem:demo

# All ten, generating and verifying real application proofs
npm run ecosystem:proofs -- --report evidence/ecosystem-run-local.json

# One project, with or without proofs
npm run ecosystem:demo -- --project goose
npm run ecosystem:proofs -- --project agent-router

# Existing compatibility profiles and meaningful unit/integration checks
npm run test:sandbox
npm run sandbox:evidence
```

Project IDs are `mcp`, `a2a`, `goose`, `agentgateway`, `agent-router`, `open-responses`, `opensandbox`, `openenv`, `agent-skills` and `agents-md`. “Open resources” is interpreted as Open Responses, the API-format project on the AAIF roster.

Agent Router's standalone auto-configuration uses local port 1975; the demo checks that it is free before starting. It must not conflict with another process. Other fixture ports are selected dynamically. Each demo creates fresh synthetic approvals and a fresh local shared authority; each child service is stopped at the end of its case.

## Offline and authority boundaries

The JavaScript runner rejects non-loopback fetches and sockets and prevents automatic redirects. Native and Python children receive a minimal environment, synthetic provider values and isolated configuration paths. On the reference macOS platform, sandbox-exec also restricts their network access to loopback and local Unix sockets. A native proxy may open a wildcard listener internally; the OS policy denies non-loopback network traffic.

No real provider or wallet credentials are read. The native goose client uses a scripted model response, the identity provider is synthetic, and the OpenSandbox SDK uses an in-memory control-plane transport. The OpenEnv environment uses real upstream types in process. AGENTS.md is an instruction artifact with a companion execution; Agent Skills additionally has reference validation and a runnable script.

A trusted fixture approver pre-binds an action ID and exact units to an AMBA mission before a component runs. The local broker cannot widen an approval from arbitrary caller input. It is deliberately simpler than a production deployment and should not be exposed as an enterprise approval service.

Proof mode checks each accepted receipt against the real o1js proof backend. The circuit proves reservation arithmetic/version advance and binds public domain/action commitments. AMBA authorization and the choice of authoritative state are separate service checks. Reservation fields are public. No Zeko sequencer, DA deployment or Ethereum verifier is exercised.

## Evidence

The JSON report contains component-specific evidence levels, concrete check outcomes, accepted/effect counts, remaining quota and proof status, plus a combined source digest and source-file list. It deliberately excludes JWTs, TLS keys, temporary capabilities and model-provider transcripts.

The report can establish that selected local paths compose with this shared application boundary. It does not certify every upstream feature, all identity-provider configurations, arbitrary worker execution, production readiness or deployed settlement. A recorded core acceptance adapter and separate Ethereum profile are the next steps toward those stronger claims.
