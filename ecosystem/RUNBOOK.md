# Run the AAIF ecosystem examples locally

## Prerequisites and setup

The full native reference suite is tested on macOS arm64 with Node.js 24, Python 3.12+, OpenSSL, tar, macOS sandbox-exec and a running local Docker daemon. OpenSandbox uses actual containers; OrbStack is the tested runtime. Other platforms have not been validated for the full native suite.

```sh
npm ci --ignore-scripts
npm run ecosystem:setup -- --docker
```

If Python 3.12 is not on PATH, set `AAIF_SETUP_PYTHON` to its executable when running setup. An already prepared environment can select its isolated Python via `AAIF_DEMO_PYTHON`.

Setup downloads public open-source artifacts, checksum-verifies the native binaries and schema, installs the exact Python lock in `.cache/ecosystem/python`, and with `--docker` pulls the three immutable image references in [images.json](opensandbox/images.json). It does not start containers or create cloud resources, accounts or blockchain deployments. Downloaded binaries, TLS material, caches and temporary configuration remain ignored by Git. Setup without `--docker` prepares the other nine demos; the full suite requires the image preparation too.

The OpenSandbox runtime defaults to `unix:///var/run/docker.sock`. Set `AAIF_DOCKER_HOST=unix:///absolute/path/docker.sock` for another local socket. It rejects remote Docker endpoints. OrbStack normally supplies the default socket symlink. The demo needs Docker operator access; only its host coordinator and lifecycle server get that access, never the job worker.

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

No real provider or wallet credentials are read. The native goose client uses a scripted model response and the identity provider is synthetic. OpenSandbox runs the official SDK, lifecycle server and execd in a real Docker worker; its official egress sidecar enforces a deny-by-default `dns+nft` policy. A synthetic local canary verifies a blocked outbound connection without using an external service. The worker has CPU/memory/PID limits, no host bind mounts, no Docker socket and no authority/provider credentials. SDK-access ports publish on loopback. Owned containers and temporary server files are cleaned up; downloaded images remain cached. The OpenEnv environment uses real upstream types in process. AGENTS.md is an instruction artifact with a companion execution; Agent Skills additionally has reference validation and a runnable script.

A trusted fixture approver binds an action ID and exact units to an AMBA mission before a state write. OpenSandbox first completes a synthetic job, then the host verifies its expected result and approves a commitment covering the input, image and result. Its action records a completed job; it does not enforce compute admission before execution. The local broker cannot widen an approval from arbitrary caller input. It is deliberately simpler than a production deployment and should not be exposed as an enterprise approval service.

Proof mode checks each accepted receipt against the real o1js proof backend. The circuit proves reservation arithmetic/version advance and binds public domain/action commitments. AMBA authorization and the choice of authoritative state are separate service checks. Reservation fields are public. No Zeko sequencer, DA deployment or Ethereum verifier is exercised.

## Evidence

The JSON report contains component-specific evidence levels, concrete check outcomes, accepted/effect counts, remaining quota and proof status, plus a combined source digest and source-file list. It deliberately excludes JWTs, TLS keys, temporary capabilities and model-provider transcripts.

The report can establish that selected local paths compose with this shared application boundary. It does not certify every upstream feature, all identity-provider configurations, arbitrary worker execution, production readiness or deployed settlement. A recorded core acceptance adapter and separate Ethereum profile are the next steps toward those stronger claims.

## Architecture and development

Our [integration architecture](DEVELOPMENT.md) describes the shared runtime, state and proof boundary, and the [development roadmap](README.md#development-roadmap) lists the next milestone for each project. Each folder links its implementation and measured evidence.
