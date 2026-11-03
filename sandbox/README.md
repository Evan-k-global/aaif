# Runnable AAIF integration sandbox

This integration connects human-approved authority with verifiable application state through AMBA OAuth, ID-JAG, an MCP tool and real o1js proofs. The [compatibility matrix](../compatibility.md) defines its tested scope.

## Run

Use Node.js 24 (`.nvmrc`) and OpenSSL. Install the exact dependency lock without lifecycle scripts:

```sh
npm ci --ignore-scripts
npm run demo
npm run demo:proofs
npm run test:sandbox
npm run tck:idjag
npm run tck:proofs
npm run sandbox:evidence
```

The launcher creates a short-lived local TLS certificate and starts its child process with that certificate explicitly trusted. Servers bind to `127.0.0.1` on temporary ports. Expired certificates regenerate. JWT/mission keys are generated locally; no production credentials are loaded. Do not publish `.cache/` or `node_modules/`.

The proof run compiles a small real o1js circuit and verifies its proofs. The first run is slower; compilation artifacts are cached. The evidence command writes a redacted JSON report under `evidence/` with fixture/source digests and scope labels.

## What actually runs

1. Canonical AMBA OAuth code performs discovery, authorization-code/PKCE exchange, JWKS signature and issuer/audience checks, nonce validation and identity-attestation creation.
2. A local protocol-test IdP exchanges that signed identity assertion for an ID-JAG. A separately identified resource authorization server validates the signed grant and issues a resource access token.
3. The integration discovers protected-resource and authorization-server metadata, including the ID-JAG profile. Pinned issuers and allowed endpoint origins constrain discovery.
4. A client built with the official MCP SDK calls the HTTPS `reserve_resource` tool. The service checks the access-token signature/type/issuer/audience, tenant, client and scope.
5. Actual AMBA policy, capability, Ed25519 boundary-event and stateful-checkpoint functions check the mission, holder, action payload and budget.
6. In the proof profile, a real o1js proof binds the reservation arithmetic/version to a domain and action commitment. The local verifier compares the statement to current state, then accepts it through a single-writer action gate.
7. Two separately registered SDK clients contend for the same resource. A separate process verifies the accepted receipt using a pinned verification key without the original web session.

Canonical AMBA dependency: `4b5bb5c6915c7ee17e716ab2320e50d985dfc0d5`, Apache-2.0. MCP SDK: 1.26.0. jose: 6.1.3. o1js: 2.13.0. See the lockfile and upstream license notices.

## Verification contract

The resource-AS and MCP roles use distinct issuer identities and keys within one test process. The circuit proves reservation arithmetic and version advancement and binds public domain/action commitments. AMBA authorization is checked separately by the gateway. Reservation fields are public.

Accepted actions increment a protected-effect counter. An unknown-outcome case injects an interrupted response and prevents automatic re-dispatch. The state service serializes acceptance; the proof establishes the transition statement. The [architecture guide](../ecosystem/DEVELOPMENT.md) describes this contract in detail.

## Remaining extensions

- Reuse the client/discovery interfaces with a commercial ID-JAG-capable IdP and resource AS.
- Replace local state acceptance with a pinned Zeko application and core sequencer, including DA/recovery behavior.
- Add an Ethereum-verified state-acceptance profile using the sovereign-rollup runbook's real-verification configuration.
- Reuse the [reference integrations](../ecosystem/README.md) for actual native goose/gateway and A2A integration, then obtain outside reproduction or an independently implemented MCP client; the two clients in this sandbox use the same official MCP SDK.

The [project roadmap](../project-plan.md#engineering-milestones) covers recovery, core-backed acceptance and broader identity interoperability.
