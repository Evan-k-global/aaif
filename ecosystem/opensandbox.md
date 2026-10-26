# OpenSandbox: sovereign execution with checkable commitments

**Upstream role.** [OpenSandbox](https://github.com/opensandbox-group/OpenSandbox) provides isolated environments for agent work on operator-controlled infrastructure, with local Docker and Kubernetes deployment paths described upstream.

**Connection to Zeko.** An execution service could bind an approved job, resource reservation and output-artifact commitment to shared application state. OpenSandbox would supply the execution environment; AMBA would constrain authority at the service boundary; Zeko would provide the configured state-transition and acceptance semantics.

## Concrete example

An operator runs a code-review worker in an isolated environment. The application records the approved task and input revision before dispatch. The worker returns an artifact digest, and a defined acceptance policy determines whether the reservation completes, expires or needs human review. A restarted worker must not silently dispatch the same consequential job twice.

This could support an operator's choice of execution infrastructure while preserving common task commitments across workers. It is a sovereignty connection, not a claim that a rollup isolates processes or that a sandbox provides confidential computing by default.

## Current evidence and next step

**Proposed integration:** this repository has not launched or tested an OpenSandbox worker. Its own local HTTPS “sandbox” is a protocol test environment, not an OpenSandbox integration.

**Next:** pin an OpenSandbox version, run one bounded worker scenario and bind the job/input/output references to a reservation receipt. Test network-boundary enforcement, changed outputs, timeout, restart and an interrupted response. Record the operator and acceptance policy that select authoritative state.

A reservation proof covers its defined application statement, not arbitrary container execution. Confidentiality, TEE attestation and proof of a computation require separately specified evidence. Connect the accepted state to a real Zeko deployment before claiming a deployed shared-state guarantee.
