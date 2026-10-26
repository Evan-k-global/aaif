# ID-JAG to MCP to mission-authorized state

## Purpose

Use existing enterprise-managed access to reach a Zeko-backed MCP service. ID-JAG establishes a cross-application authorization-grant flow. AMBA narrows the mission's permitted actions. Zeko provides verifiable shared state for accepted consequential transitions. A grant, mission capability and state proof serve different roles.

Baseline: [MCP Enterprise-Managed Authorization, 2026-07-28](https://github.com/modelcontextprotocol/ext-auth/blob/15ca394e00a66434520b9ade26294999295a43ae/specification/stable/enterprise-managed-authorization/2026-07-28/enterprise-managed-authorization.mdx), blob `5f5f4e5c25d0ff16d1df29dd58c867aa8fce512f`; [IETF ID-JAG draft-04](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-identity-assertion-authz-grant-04), an active Internet-Draft when checked on 26 October 2026. Pin versions and review changes before claiming compatibility. Discovery inconsistencies between a pinned profile and a newer upstream draft must be resolved explicitly with implementers.

## Integration sequence

1. An MCP client completes existing enterprise SSO and obtains an identity assertion.
2. The client requests an ID-JAG from its IdP using OAuth token exchange. The audience identifies the resource authorization server; this pilot explicitly supplies the MCP resource identifier as well.
3. The client exchanges the ID-JAG at that resource authorization server for a resource access token, using the JWT bearer grant and its separately registered resource-client credentials.
4. The client calls the MCP service with the access token. The resource validates the token using its trusted authorization infrastructure. The ID-JAG is not sent as a bearer credential to the resource or to a chain.
5. Server-side policy maps the verified issuer/tenant/subject/client/resource context to an AMBA mission authority and holder. This mapping is explicit configuration; decoding untrusted JWT claims is not sufficient.
6. The action gateway calls AMBA's stateful enforcement path before the effect, binds the exact action to the selected Zeko domain and verifies the required state acceptance. AMBA's portable budget bookkeeping and the shared Zeko state must have a defined reservation/reconciliation design; they must not become two contradictory authorities.

The mission may narrow upstream rights, never expand them. The MCP service checks current access and mission state according to their respective lifetime/revocation policies. Historical proof is not a replacement for present authority.

## What exists in this repository

`client.mjs` implements the two client-side token requests, with explicit endpoint/credential inputs, bounded network waits and sanitized errors. It currently supports an OIDC ID token as the initial assertion. It uses an existing IdP and resource authorization server; it does not implement SSO, JWT signature verification, discovery, an authorization server or an MCP server.

Its helper tests use controlled doubles. The [runnable sandbox](../../sandbox/README.md) additionally exercises real signed JWTs and HTTPS requests through the canonical AMBA OAuth code, metadata discovery and an official-SDK MCP client/server. Seventeen selected profile cases cover successful access, denial, claim/token confusion and signature/algorithm/lifetime failures. The local synthetic-user IdP is not a commercial provider or a full-standard certification. The helper returns only the resource access token and does not print credentials.

## Next implementation work

- Replace the sandbox issuer/AS with a real ID-JAG-capable enterprise provider when production-provider evidence is useful. Generic OIDC support alone does not establish ID-JAG support.
- Exercise provider-specific client-ID/tenant mapping and account linking beyond the sandbox's explicit registrations.
- Extend current discovery with other provider layouts and registration/authentication methods as needed. The pilot uses preregistered clients and explicit endpoint-origin trust.
- Reuse the implemented `reserve_resource` MCP tool and canonical AMBA context adapter against real Zeko acceptance rather than local state.

Raw tokens, client secrets and personal identities stay out of ledger records and published reports. Reports identify versions, test IDs and redacted result artifacts.

## Completion criteria

The local sandbox now demonstrates the selected two-hop access flow and rejection cases, plus a separately verified application proof. The commercial-provider and core-rollup acceptance paths remain separate evidence targets. Run `npm run tck:idjag` to reproduce the selected identity profile.
