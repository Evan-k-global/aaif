# AAIF-specific engineering work

We built this integration work to put human control, open interoperability and verifiable state into agent workflows. The repository contains working compatibility profiles, reference integrations and reproducible evidence. Core protocol and application code remain in their canonical repositories.

## First cross-system scenario

An enterprise user authorizes an agent to reserve a bounded amount of a shared resource. The agent accesses an MCP service using enterprise-managed authorization. The service applies AMBA mission constraints at the action boundary. A Zeko application records the accepted reservation; a second service can verify the accepted state. Two concurrent requests cannot both consume the same remaining budget.

The scenario now runs locally: actual AMBA OAuth and mission checks, signed JWTs, HTTPS discovery/exchanges, an official-SDK MCP tool and a real o1js reservation proof. Its state authority and identity provider are explicit local sandbox implementations. Core-rollup/DA/Ethereum acceptance and commercial-provider validation remain extension targets. See [the runnable sandbox](sandbox/README.md).

## Delivery sequence

| Milestone | Concrete artifact | Acceptance evidence |
| --- | --- | --- |
| 1. Specify and exercise the harness | Versioned profiles, fixtures, runner and ID-JAG client helper | Fixture validation; meaningful helper/harness tests; explicit status labels |
| 2. Wire enterprise access | One actual IdP, resource authorization server and MCP service | Successful two-hop exchange and negative issuer/audience/client/resource tests |
| 3. Bind mission authority | Server-side mapping of verified access context to AMBA scope and holder | Wrong-holder, changed-action, expired/revoked-mission rejection |
| 4. Implement proof-backed state adapter | Reservation proof program plus a real-proof adapter for the TCK | Valid transition accepted; concurrent conflict/replay/invalid proof rejected; no external action before required state acceptance |
| 5. Demonstrate outside-client reuse | A second client consumes the same service/profile | Unchanged shared fixtures, versions and independently checkable results |
| 6. Extend selectively | A2A handoff, an AAIF gateway/client, Ethereum settlement profile | Separate evidence for each integration; no umbrella conformance claim |

Milestones 1–4 have local sandbox implementations; milestone 5 now also has a real native goose client, native gateway examples and A2A SDK exchanges, with separate-process proof verification retained. The all-ten [ecosystem suite](ecosystem/README.md) distinguishes actual components from service/schema fixtures and instruction companions. No cloud tenant or funded deployment is required to reproduce this work. Real operator/provider deployment evidence and broader AAIF adapters remain Sandbox work.

## Initial boundaries

- ID-JAG integration: [roles, sequence and requirements](integrations/id-jag/README.md).
- State profile and test contract: [TCK](tck/README.md).
- Optional Ethereum settlement is a separately identified acceptance stage. Base-layer finality is not inferred from an MCP response or sequencer acknowledgement.
- Phala, zkTLS and commerce examples remain supporting extension paths, after the first identity-to-state scenario works.

Use the core audit index for core assurance. Review new adapters separately. This work does not imply that the TC has adopted this profile or an AAIF certification program.
