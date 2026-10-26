# Focused working-group discussions

One core proposal supports two initial technical conversations, with an optional third when the topic fits. Each conversation should make one concrete contribution and use selective links.

| Group | Material | Technical question |
| --- | --- | --- |
| Security & Privacy | Core rollup, scoped audit references and a shared-state enforcement scenario | Which guarantees belong to proof validity, state acceptance and the external service's action gate? |
| Identity & Trust | SantaClawz **and** AMBA | How should discovered agent identity connect to the principal, runtime holder and bounded authority for a consequential action? |
| Agentic Commerce — optional third | x402-Zeko **and** Magic City | How should payment authorization, work commitments and conditional release refer to the same accepted mission state? |

Identity venues: `#wg-idt-critical-use-cases`, then a relevant architecture thread if invited. Security venue: `#wg-spaa-threat-modeling` or the main WG channel according to current context. Commerce venue: `#wg-agentic-commerce`. Channel names come from supplied Discord screenshots; live conversations and posting rules must be read before sending.

Describe each pair as one connected story. Reuse existing blog explanations and concrete examples, checking publication links and current implementation before citation. The core proposal is the common context; a focused reference page can provide the paired implementation links.

The application may briefly describe relevance to other WG concerns. Additional promotion across those groups is not planned.

**Proposal URL:** not yet filed.

**Posting status:** no messages sent.

**Official proposal author:** zekoxyz. Do not create the issue from Evan-k-global. These are review drafts; no community messages are authorized for sending by this document.

## Security & Privacy: reference and draft

Lead with core Zeko and one shared-resource case. Offer the scoped audit index separately from the new integration's test evidence. The action gate, state authority, data availability and operator remain explicit parts of the security analysis.

Draft, before filing:

> We are preparing a Sandbox proposal for Zeko: rollup infrastructure for verifiable shared state across agent applications. One question we would like to compare with the WG's threat model is what an external service must check before acting on a proof-backed resource reservation.
>
> We have a runnable MCP/AMBA example with real application proofs and negative cases for replay, changed inputs and conflicting consumption. Its local state authority is labeled separately from a deployed rollup. Would a worked example separating proof validity, accepted state and external enforcement be useful to the threat-modeling workstream?

After filing, replace the opening with an accurate reference to the zekoxyz-authored proposal. Use one focused artifact link and the proposal link; do not paste the whole portfolio.

## Identity & Trust: SantaClawz and AMBA

[SantaClawz](https://github.com/zeko-labs/santa_clawz-private_agents) makes discovered agent identity and cross-party work concrete. [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) supplies the complementary mission, principal/holder and action-time authority model. The [ID-JAG integration](integrations/id-jag/README.md) exercises the identity-to-resource-access boundary; resource access alone does not authorize every mission action.

Draft:

> We are looking at the handoff from discovering an agent to authorizing a specific piece of work. SantaClawz supplies the discovery/work context; AMBA binds a human-approved mission to a holder and bounded actions.
>
> Our reference sandbox now connects existing AMBA OAuth, ID-JAG exchanges and an MCP tool, with tests for identity/context mismatches and action-time restrictions. We would value feedback on which identity and delegation references should survive this handoff without treating reputation or successful login as authority to act.

Link this focused reference and the filed proposal rather than posting separate announcements for SantaClawz and AMBA.

## Agentic Commerce: optional third conversation

[x402-Zeko](https://github.com/zeko-labs/x402-zeko) supplies payment primitives; [Magic City](https://github.com/zeko-labs/magic-city-agentic-internet) illustrates user-approved agent execution. Discuss a shared lifecycle, not marketplace promotion. Standard x402 behavior and custom reservation/conditional-release extensions need separate labels.

Draft:

> We are mapping how payment authorization, work delivery and conditional release should refer to the same approved task. x402-Zeko supplies payment primitives, while Magic City illustrates the user-approval and execution flow.
>
> A useful boundary case is an interrupted request: a service may have acted even though the caller has no final response. We would like to compare the evidence needed for retry, release or refund with the WG's commerce lifecycle, keeping payment settlement distinct from proof of delivery.

Use only if it fits an active technical discussion. It is not a third mandatory launch announcement.
