# Draft profile requirements

Normative words below apply to these local draft profiles, not to all AAIF systems.

## Zeko shared state v0.1

| ID | Required behavior |
| --- | --- |
| SS-01 | Bind action, amount, holder/mission context and deployment identity to the accepted transition. Reject changed inputs. |
| SS-02 | Use the authoritative current state and transactional reservation rule. Concurrent requests cannot overspend the shared quota. |
| SS-03 | A repeated action cannot consume state or authorize the external effect twice. |
| SS-04 | Reject invalid proofs, mismatched statements or untrusted/wrong verification keys and deployment domains. |
| SS-05 | Expired or revoked authority cannot authorize a new transition. Define the freshness rule used. |
| SS-06 | Missing required proof verification fails closed; no signature-only or mock downgrade. |
| SS-07 | Gate an external effect on the declared acceptance stage; represent interrupted effects as unknown until reconciled. |
| SS-08 | A second process can verify a redacted receipt against pinned verifier/state identity without the originating web session. |

The quota/reservation circuit is new reference application work, not an existing audited feature of the core. State acceptance must name its checkpoint/order rule. An Ethereum-settled profile must additionally establish destination acceptance; these tests do not infer base-layer finality from a sequencer response. Disabled Ethereum proof verification does not satisfy that profile.

## ID-JAG/MCP v0.1

| ID | Required behavior and owner |
| --- | --- |
| IJ-01 | The client distinguishes the IdP token exchange from the resource-AS JWT bearer exchange and supplies the expected audience/resource. |
| IJ-02 | The IdP evaluates permitted client/user/resource/scopes; denied access does not fall back to direct OIDC-to-resource use. |
| IJ-03 | The resource AS validates the signed grant using trusted issuer and key configuration, correct token type, lifetime and client binding. |
| IJ-04 | Tenant/subject resolution and client-ID mapping follow the pinned issuer/registration model. Resource grants cannot expand requested/allowed rights. |
| IJ-05 | The MCP resource accepts its resource access token; identity tokens and ID-JAGs are not interchangeable resource bearer tokens. |
| IJ-06 | Server-side AMBA mapping is based on verified resource-access context, with separate mission-holder/scope/expiry/revocation checks. |
| IJ-07 | No raw credentials or identity data appear in public state or exported evidence. |

Primary baseline: MCP Enterprise-Managed Authorization 2026-07-28, pinned in [integration notes](../integrations/id-jag/README.md), and IETF draft-04. The helper implements a selected OIDC initial-assertion flow, not the whole standard or SAML branch. AS/resource cryptographic validation and metadata discovery remain integration work. ID-JAG grant replay rules must be tested according to the selected draft/AS policy; do not conflate them with the application's once-only state-consumption requirement.
