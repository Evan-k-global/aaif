# OpenSandbox: real local worker and accepted result commitment

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

## How OpenSandbox can benefit from Zeko as an agentic internet protocol

OpenSandbox provides an execution boundary for agent jobs. Zeko can provide the shared application-state boundary around that execution: what work was committed, which resources were authorized and which result was accepted. These are useful together when a job producer, executor and result consumer are different parties, or when a swarm spreads work across independently operated sandboxes.

For example, a bounded review job can have a stable input/image commitment, an execution result and an acceptance record. An executor retry or duplicated result should not become a second charge or second accepted delivery. The working local demo executes an actual Docker job through the official SDK/server/execd path. The host recomputes its expected result, binds the input, worker image and output into the approved action ID, and records that action once through AMBA/shared state. Changed results produce an unapproved commitment.

| Integration point | OpenSandbox responsibility | Zeko application responsibility |
| --- | --- | --- |
| Job provisioning | Create the worker and enforce configured runtime limits | Associate the agreed job with a bounded mission and state domain |
| Execution | Run commands and return output through execd | Avoid treating process completion alone as result acceptance |
| Result acceptance | Deliver evidence for the job output | Bind input/image/output to a permitted state transition |
| Retry and cleanup | Manage worker lifecycle | Reconcile accepted work before charging or dispatching again |

The current example records a completed job; it does not reserve compute before dispatch. A fuller application can add admission and explicit release/refund rules. Proof mode verifies a reservation proof whose action commitment includes the approved job reference; it does not prove arbitrary container execution. Correctness of this tiny job is checked by the host. Optional confidential hosting would add a separate hardware trust model and attestation policy; Docker isolation does not establish TEE confidentiality.

## Checks and scope

The demo checks the actual SDK/server create/info/command/kill lifecycle; pinned worker image; CPU, memory and PID limits; no privilege escalation; no host bind mounts or worker Docker socket; loopback-only SDK ports; and absence of authority/provider credentials in the worker.

The upstream `dns+nft` egress component uses a deny-by-default policy with no allow rules. A separate synthetic Docker service is confirmed listening, then a worker connection to it must fail. This exercises a real denied outbound connection without contacting an external service. The egress sidecar has the networking capability required by upstream; the job worker is unprivileged. Container isolation is provided by Docker, not by TEE hardware or a nested bubblewrap profile.

The SDK must delete the actual worker and egress sidecar. The coordinator cleans up its canary and temporary server files, with failure cleanup restricted to this run's owned containers. Downloaded images remain cached for reproduction. The host coordinator/lifecycle server have local Docker operator access; no such access is passed into the job.

No funded transaction, deployed Zeko core, Ethereum settlement, TEE confidentiality or production sandbox-hardening certification is claimed.

## Development roadmap

We plan to add admission before worker creation and an explicit reserve/execute/accept lifecycle. A versioned job record will connect input and image commitments to execution attempts, result acceptance and defined failure/release rules. The example will test worker failure, timeout, duplicate delivery and reconciliation while retaining local Docker isolation, deny-by-default egress and automatic cleanup.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
