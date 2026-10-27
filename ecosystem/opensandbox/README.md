# OpenSandbox: real local worker and accepted result commitment

Agent execution needs bounded authority and accountable results. Our OpenSandbox integration runs a real local worker and records a verified result commitment, supporting independent operators and human control.

Upstream: [project source](https://github.com/opensandbox-group/OpenSandbox), [server configuration](https://github.com/opensandbox-group/OpenSandbox/blob/main/server/configuration.md). Pins: [versions](../versions.json), [immutable image references](images.json), [Python lock](../requirements.lock).

## What runs

The official Python SDK talks to the actual local OpenSandbox lifecycle server. The server uses Docker to provision an execd worker and the upstream egress sidecar. The SDK runs a deterministic synthetic job inside the worker and decodes its real SSE command output. The host verifies the expected result, then approves and records a commitment to the job input, worker image and result through the common AMBA/shared-state boundary.

```sh
# Start the local Docker runtime first (OrbStack was tested).
npm run ecosystem:setup -- --docker
npm run ecosystem:demo -- --project opensandbox
npm run ecosystem:proofs -- --project opensandbox
```

Runtime uses locally cached images and a local Unix Docker socket. `AAIF_DOCKER_HOST` can select another local socket. Missing images or an unavailable daemon produce a failure; the demo does not silently fall back to a simulated runtime.

## How OpenSandbox benefits from Zeko’s agentic internet protocol

OpenSandbox supplies the execution boundary. Zeko supplies shared application state for authorized work and accepted results. The working example connects a real SDK/server/execd job to a bounded commitment that the state service accepts once.

Our working example executes a Docker job through the official SDK/server/execd path. The host checks its result and commits the input, worker image and output in the approved action ID. AMBA and the state service accept that action once. Replay and changed results fail.

| Integration point | OpenSandbox responsibility | Zeko application responsibility |
| --- | --- | --- |
| Job provisioning | Create the worker and enforce configured runtime limits | Associate the agreed job with a bounded mission and state domain |
| Execution | Run commands and return output through execd | Avoid treating process completion alone as result acceptance |
| Result acceptance | Deliver evidence for the job output | Bind input/image/output to a permitted state transition |
| Retry and cleanup | Manage worker lifecycle | Reconcile accepted work before charging or dispatching again |

The example records a completed job. Pre-execution admission and release/refund rules are the next lifecycle milestone. The proof verifies the reservation statement and binds its job commitment. The host checks the deterministic job result. Docker provides execution isolation; confidential hosting adds a separate hardware/attestation profile.

## Checks and scope

The demo checks the actual SDK/server create/info/command/kill lifecycle; pinned worker image; CPU, memory and PID limits; no privilege escalation; no host bind mounts or worker Docker socket; loopback-only SDK ports; and absence of authority/provider credentials in the worker.

The upstream `dns+nft` egress component uses a deny-by-default policy with no allow rules. A separate synthetic Docker service is confirmed listening, then a worker connection to it must fail. This exercises a real denied outbound connection without contacting an external service. The egress sidecar has the networking capability required by upstream; the job worker is unprivileged. Container isolation is provided by Docker, not by TEE hardware or a nested bubblewrap profile.

The SDK must delete the actual worker and egress sidecar. The coordinator cleans up its canary and temporary server files, with failure cleanup restricted to this run's owned containers. Downloaded images remain cached for reproduction. The host coordinator/lifecycle server have local Docker operator access; no such access is passed into the job.

Deployment scope: local Docker execution and local application-state acceptance. Core acceptance, Ethereum settlement and confidential hosting have separate profiles.

## Development roadmap

Our next milestone is to add admission before worker creation and an explicit reserve/execute/accept lifecycle. A versioned job record will connect input and image commitments to execution attempts, result acceptance and defined failure/release rules. The example will test worker failure, timeout, duplicate delivery and reconciliation while retaining local Docker isolation, deny-by-default egress and automatic cleanup.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
