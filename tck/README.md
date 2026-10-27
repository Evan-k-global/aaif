# Technology compatibility kit: first profiles

This kit tests a declared integration boundary. It is Zeko's proposed application-support work, not an AAIF-approved certification scheme.

## Profiles

- **`zeko-shared-state-v0.1`**: 13 application-boundary scenarios using real o1js proofs and a local single-writer state authority. Covers proof/payload/domain/key rejection, replay, concurrency, authority, unknown effects and independent-process receipt verification. A core-rollup/Ethereum adapter remains separate work.
- **`id-jag-mcp-v0.1`**: 17 scenarios against local HTTPS identity, authorization and MCP roles, with actual AMBA OAuth and mission enforcement. A commercial-provider run remains separate work.

See [profile requirements](profiles.md), [adapter contract](adapter-contract.md) and [work sequence](../aaif-work.md).

## Run

Use Node.js 24 and the pinned dependencies. No cloud credentials or funded accounts are needed for the supplied sandbox adapters.

```sh
npm ci --ignore-scripts
npm run test:sandbox
npm run tck:validate
npm run tck:idjag
npm run tck:proofs
npm run sandbox:evidence
```

Validation checks structure only. The supplied [sandbox adapters](adapters/) run actual HTTP/JWT/MCP/AMBA operations; the proof adapter generates and verifies real application proofs. Unit tests also contain controlled doubles. Reports distinguish these evidence levels. Missing required capabilities or skipped cases fail a run.

The adapter receives setup and scenario steps, not expected outputs. It must exercise the real system and independently observe resulting state. Reports contain fixture digests, adapter revision/evidence labels and case results; they omit tokens, secrets, raw observations and personally identifying data. Adapter-provided evidence labels are declarations, not independent proof that the adapter is honest. Publish supporting redacted artifacts and reproducibility records for review.

## Next contribution

Extend the supplied action adapter from local application state to a real Zeko deployment, with pinned circuit/verifier, core, DA and acceptance configuration. Add an outside implementation/reproduction before claiming cross-implementation or production-provider compatibility. See the [sandbox scope](../sandbox/README.md).

## Development roadmap

We are developing a clearer acceptance-stage contract for the future core adapter: submitted, accepted, rejected and unknown/reconciling outcomes. Deterministic fixtures will cover delayed acceptance, stale state and disconnect recovery; actual core deployments will carry distinct provenance. The existing real-proof adapter remains the local baseline, including independent receipt verification. See the [integration architecture](../ecosystem/DEVELOPMENT.md).
