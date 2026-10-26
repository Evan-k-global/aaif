# A2A: commitments across independent agents

**Upstream role.** [A2A](https://github.com/a2aproject/A2A) supports discovery and collaboration between agent applications, including long-running work while their internals remain opaque.

**Connection to Zeko.** An A2A task could refer to a commitment recorded in shared application state: the agreed work, bounded authority, reserved resources and accepted result. The integration would bind task and artifact references to the appropriate mission and state receipt, while preserving A2A's task/message semantics.

## Concrete example

One organization delegates a review task to another agent operator. The application commits the agreed repository revision, task scope and budget. The worker returns an artifact digest; an authorized verifier accepts or rejects the defined result condition. Retries and interrupted responses must refer to the same commitment rather than triggering duplicate payment or dispatch.

This could give independent operators a common, checkable record without requiring either to expose its entire agent implementation. It does not prove that every private action occurred or that the artifact is correct merely because its digest is committed.

## Current evidence and next step

**Proposed integration:** no A2A SDK/task flow has been implemented or run here. The existing MCP profile does not substitute for an A2A interoperability result.

**Next:** pin an A2A implementation, specify the exact task/artifact-to-mission binding and add a receipt-carrying example. Test changed artifacts, a different receiving operator, duplicate completion, narrowed authority, cancellation and an unknown external outcome. State which event reserves resources and which event authorizes release.

Keep sensitive artifacts off the public state path where the chosen design requires that. Publish only the statement and data needed by the particular acceptance profile. Validate deployed Zeko acceptance separately from the A2A transport exchange.
