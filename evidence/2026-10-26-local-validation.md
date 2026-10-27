# Local integration-scaffolding validation

We publish the engineering record so developers can inspect and reproduce our open infrastructure. This page preserves an early harness-validation snapshot.

Historical early snapshot. Superseded for current status by [the sandbox evidence](README.md).

Run on 26 October 2026 against the local, uncommitted working tree. This is helper/harness evidence; neither complete integration profile has run against a deployed system.

```sh
node --test integrations/id-jag/client.test.mjs tck/runner.test.mjs
node tck/run.mjs --validate
```

- 14 tests passed, 0 failed, 0 skipped.
- 13 shared-state scenario definitions validated.
- 14 ID-JAG/MCP scenario definitions validated.
- Profile integration runs: **not executed**; real system adapters are pending.

Tests exercise two-hop request parameters, client/token role separation, denial/error handling, endpoint restrictions, missing registration and malformed responses. Harness tests cover expected-output isolation, wrong results, required cases and timeout/error redaction. Test doubles do not provide live identity or proof evidence.

| Fixture suite | SHA-256 |
| --- | --- |
| `zeko-shared-state-v0.1` | `69b1dcc5a85c50ca4efc74e762b186a754c15b7662867ff0f13bdfbc98477d97` |
| `id-jag-mcp-v0.1` | `7ce8e4d57ee33d4ad0f1d96cf5add5717ebc6e8a70194d70c3f520c900e55f2b` |

Update after relevant changes. Integration evidence must additionally pin adapter/application/core versions, identity roles, deployment identity, verification key, proof-verification configuration and acceptance stage. Publish appropriately redacted artifacts without credentials.
