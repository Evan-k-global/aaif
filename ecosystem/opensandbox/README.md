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

## How this can use and benefit from Zeko

Execution isolation and shared-state acceptance solve different parts of a cross-party job. OpenSandbox runs the job. The host-side adapter binds its input/image/output commitment to a bounded state action that another participant can inspect. Replaying a completed result cannot consume the shared quota twice, and changing the result produces an unapproved commitment.

This example records a result after execution; it does not reserve compute capacity before admitting the job. A deployment adapter could extend the workflow to reserve capacity before dispatch and release payment or quota only under explicit result-acceptance rules.

Proof mode generates and verifies a real o1js reservation proof, whose action commitment includes the approved job commitment. The state authority remains local. The proof establishes the reservation statement, not correct execution of arbitrary container code. Here the host verifies correctness by recomputing the tiny deterministic job.

## Checks and scope

The demo checks the actual SDK/server create/info/command/kill lifecycle; pinned worker image; CPU, memory and PID limits; no privilege escalation; no host bind mounts or worker Docker socket; loopback-only SDK ports; and absence of authority/provider credentials in the worker.

The upstream `dns+nft` egress component uses a deny-by-default policy with no allow rules. A separate synthetic Docker service is confirmed listening, then a worker connection to it must fail. This exercises a real denied outbound connection without contacting an external service. The egress sidecar has the networking capability required by upstream; the job worker is unprivileged. Container isolation is provided by Docker, not by TEE hardware or a nested bubblewrap profile.

The SDK must delete the actual worker and egress sidecar. The coordinator cleans up its canary and temporary server files, with failure cleanup restricted to this run's owned containers. Downloaded images remain cached for reproduction. The host coordinator/lifecycle server have local Docker operator access; no such access is passed into the job.

No funded transaction, deployed Zeko core, Ethereum settlement, TEE confidentiality or production sandbox-hardening certification is claimed.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
