# Working-group relevance

Our proposed core contribution is verifiable shared-state infrastructure. Three working-group areas make its application to agent systems especially concrete: shared-state security, identity-to-authority mapping and commerce lifecycle coordination.

## Security & Privacy

A proof-backed resource reservation raises several separate questions: is the transition valid, has the authoritative state accepted it, and what must an external service check before acting? Our core rollup and [local MCP/AMBA scenario](sandbox/README.md) provide concrete material for examining those boundaries.

The example includes replay, changed inputs, conflicting resource consumption and wrong-context/proof cases. Its local authority and public proof fields are explicit, while core sequencing, data availability, recovery and deployment-specific privacy remain separate concerns. Our [audit references](https://github.com/zeko-labs/zeko/pull/444) describe the core's independent zkSecurity assessments; the new integration has its own [test evidence](evidence/README.md).

We are interested in reusable threat-model and design-pattern work around acceptance before effects, reconciliation after interruptions and privacy across service boundaries.

## Identity & Trust

[SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) supplies agent discovery and cross-party work examples. [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) connects a human-approved mission to a principal, runtime holder and bounded actions. Together they make the transition from discovering an agent to authorizing particular work concrete.

Our [ID-JAG integration](integrations/id-jag/README.md) demonstrates the two-hop resource-access flow, followed by mission and holder checks at the action boundary. Successful login, reputation or discovery alone does not establish permission for every consequential action.

We welcome discussion of which identity/delegation references should survive cross-agent interactions, how authority narrows across boundaries and how revocation, domain context and accepted commitments should interact.

## Agentic Commerce

[x402-Zeko](https://github.com/zeko-labs/x402-zeko) provides machine-payment primitives. [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) illustrates user-approved agent workflows. Shared state can connect payment authorization, work commitment, delivery evidence and conditional release to the same task context.

An interrupted request is a useful example: work may have occurred even though the caller received no final response. Retry, release and refund decisions then depend on the evidence and accepted state. Standard x402 behavior, custom lifecycle extensions, payment settlement and delivery acceptance have distinct roles.

## Broader connections

The [ten-project ecosystem suite](ecosystem/README.md) also touches workflow integration, observability, reliability and governance through explicit action/receipt contracts and reproducible failure cases. Taxonomy & Landscape is relevant to describing these roles consistently across working groups. zkTLS external-data evidence is a supporting primitive, demonstrated by the prediction-market implementation and a partner-motivated verification PoC.

Our [application](application.md) and [Sandbox thesis](proposal.md) provide the common contribution context. We welcome focused technical feedback through [issues](https://github.com/zeko-labs/aaif/issues).
