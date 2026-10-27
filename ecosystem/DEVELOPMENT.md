# Continue an AAIF ecosystem integration

This is the shared engineering handoff for the ten [project examples](README.md#project-by-project-coverage). Each project's README describes its value, working implementation, next runnable milestone and acceptance criteria. The examples are useful integration code and evidence; they do not establish a deployed Zeko backend for every upstream feature.

## First reproduction

Work from the repository root, with the native platform and prerequisites in the [runbook](RUNBOOK.md). Use Node.js 24 and Python 3.12+. Prepare dependencies explicitly:

```sh
npm ci --ignore-scripts
npm run ecosystem:setup -- --docker
npm run ecosystem:demo -- --project mcp
npm run ecosystem:proofs -- --project mcp --report .cache/ecosystem/mcp-baseline.json
```

Replace `mcp` with the target folder ID. The setup's `--docker` step is needed for OpenSandbox and the full suite; setup without it prepares the other examples. No provider account, wallet or cloud service is needed. Each demo receives a fresh authority and synthetic client contexts; the suite does not share one budget across all ten projects.

Read the selected JSON result: `passed`, the named `checks`, `accepted`, `rejected`, `effects`, `remaining`, `proofVerified`, `level` and the explicit deployment flags. Current cases accept one action, dispatch one synthetic protected effect and leave 30 of 100 units. Proof mode must actually verify the proof. Do not interpret a process exit, printed success message or API schema validation alone as that evidence.

## Files and ownership

| File or directory | Responsibility | Change it when |
| --- | --- | --- |
| Each project's `demo.mjs` | Native/SDK/format adapter, scenario orchestration and observable checks | Extending that project's integration |
| Project Python or skill scripts | Upstream typed environment, actual worker lifecycle or packaged tool client | Extending that executable surface |
| [`_shared/runtime.mjs`](_shared/runtime.mjs) | Loopback broker, fixture approvals, official MCP interface and runtime summary | Several projects need the same application boundary |
| [`_shared/process.mjs`](_shared/process.mjs) | Minimal environment, local process/network policy, ports, timeouts and cleanup | A shared process-lifecycle requirement changes |
| [`_shared/network.mjs`](_shared/network.mjs) | Node fetch/socket/redirect guard | A local transport needs an explicitly reviewed change; do not broadly allow external traffic |
| [`_shared/model-fixture.mjs`](_shared/model-fixture.mjs) | Deterministic chat/tool-call fixture | A native client needs another local model interaction |
| [`../sandbox/server.mjs`](../sandbox/server.mjs) | Synthetic identity/resource AS, authoritative local reservation writer and protected effect counter | Changing state acceptance or its failure behavior |
| [`../sandbox/amba-gate.mjs`](../sandbox/amba-gate.mjs) | Canonical AMBA integration and synthetic mission/holder orchestration | Changing identity-to-action test policy |
| [`../sandbox/proof.mjs`](../sandbox/proof.mjs) | Reservation circuit, trusted-key verification and expected public statement | Changing the statement being proved |
| [`../tck/adapters/shared-state-sandbox.mjs`](../tck/adapters/shared-state-sandbox.mjs) | Shared-state profile adapter and independent-process verification | Changing the compatibility profile implementation |
| [`versions.json`](versions.json), [`binaries.json`](binaries.json), [`requirements.lock`](requirements.lock), [`opensandbox/images.json`](opensandbox/images.json) | Exact upstream/dependency/artifact pins | Changing a dependency or runtime boundary |
| [`run.mjs`](run.mjs) | Project selection, proof-mode execution, report and source digest | Adding a scenario entry point or evidence field |

Keep core protocol, settlement, AMBA and application implementation changes in their canonical repositories. Import pinned versions here and test the integration. Do not silently fork their logic into a demo.

## Shared application contract

The small contract below is an integration seam implemented by this repository. It is not an AAIF standard, an upstream extension all projects implement, or a production Zeko RPC API.

| Operation | Actual behavior | Required invariant |
| --- | --- | --- |
| `runtime.approve(actionId, units, { actor })` | Test orchestration binds an exact action and units to one existing synthetic client's signed AMBA context; returns `{ actionId, units }` | Unique action ID; no caller-selected widening after approval |
| `runtime.reserve({ actionId, units })` | Checks the fixture approval, then calls the protected MCP/AMBA service | Unknown/changed approval cannot mutate state or dispatch an effect |
| MCP `reserve_resource` | Official SDK tool taking the same two fields | Tool transport does not replace authorization/state checks |
| `POST /action` | Loopback Python/script bridge, requiring an ephemeral fixture bearer | Never expose this trusted fixture as a public approval service |
| `GET /state` | Local fixture observation of remaining quota, accepted count and version | Observation is not a mutation capability or a production disclosure policy |
| Receipt | Domain, action commitment, version, remaining quota, outcome and evidence level; proof mode also supplies the proof and statement | Correlate with the expected action/domain and verify under a trusted key |

A successful result has `{ ok: true, receipt }`. A rejected result has `ok: false` and a rejection boundary such as `synthetic-approval-binding`, `mission-gate`, `shared-state` or `proof-verifier`. Preserve distinct rejection/unknown outcomes instead of normalizing them all to transport success or “try again.” An HTTP request can succeed while its application action is rejected.

The accepted receipt's `actionCommitment` is a digest of mission, action ID and boundary-event context; it is not the raw action ID. See the writer and AMBA digest helper for the actual serialization. Cross-language applications need a versioned canonical encoding before claiming interoperable commitments. The OpenSandbox adapter additionally constructs its own job/input/image/output commitment, then includes that in the approved action ID.

The writer serializes local reservations, checks replay/quota, verifies the required proof, consumes mission authority and records a synthetic protected effect. This is a local implementation of the application rules. A real external effect needs durable dispatch/reconciliation and an explicit required acceptance level; the existing effect counter is not universal exactly-once execution.

## Proofs, trust and privacy

[`../sandbox/proof.mjs`](../sandbox/proof.mjs) proves positive reservation units, quota subtraction and version advancement, with public domain/action commitments. AMBA authorization is checked separately by the service; it is not proved inside this circuit. The caller must supply the expected statement and an independently trusted verification key. Do not trust a key merely because it arrived beside a proof.

Use [`../sandbox/verify-receipt.mjs`](../sandbox/verify-receipt.mjs) and the shared-state adapter as the existing independent-process verification pattern. A valid proof still needs a policy for which state history/domain the service accepts. It does not establish data availability, canonical rollup history, Ethereum finality, private reservations or correct arbitrary worker execution.

Keep JWTs, holder material, approval capabilities, raw sensitive inputs and provider credentials out of reports and committed examples. The present fixtures use public reservation statements; privacy extensions need their own statement, data-flow and disclosure tests. A hash commitment is not an automatic confidentiality guarantee for guessable inputs.

## Path from the local model to core Zeko

The next common backend milestone is an explicitly versioned adapter for accepted state in the canonical [Zeko core](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko). Ethereum is the principal blockchain integration focus: use the [sovereign-rollup operator guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) and [Ethereum architecture documentation](https://ethereum.docs.zeko.io/overview) as deployment references. The current ten-project suite does not launch that stack.

A proposed adapter should keep the clients' action/result semantics while making these boundaries explicit:

1. **Submission and identity:** bind the application action to the correct deployment, principal/mission and exact inputs. Obtain operator configuration explicitly; do not reuse a developer's existing keys.
2. **Acceptance:** expose submitted, accepted, rejected and unknown/reconciling outcomes. A valid local proof or successful submission is not canonical core acceptance.
3. **Independent reading:** retrieve the accepted state/receipt from the deployment's actual read/DA path and verify the expected proof, version and domain. Test competing submissions and stale state.
4. **Effects and recovery:** require the configured acceptance level before releasing consequential work. Persist the action reference and reconcile disconnects/restarts before retrying.
5. **Optional Ethereum profile:** record the exact verifier/settlement configuration and state what was actually verified. Tutorial mock-verifier results must not be labeled real Ethereum proof verification. Workflows that need only sovereign application acceptance should not be forced to settle each tool call.

A local, deterministic deployment/replay fixture can develop this adapter boundary without a funded network. A live operator deployment, real provider integration or funded transaction is a separate authorized milestone. The acceptance tests should identify that boundary rather than quietly replacing local fixtures with real services.

## Verification and evidence

For documentation-only work, check local links, commands, version/status claims and section completeness; do not add implementation-mirroring tests. The evidence source inventory includes `AGENTS.md` and `SKILL.md` inputs. If those files or executable/pinned sources change, regenerate the relevant report so its source list/digest remains current.

For an implementation change:

1. Run the target project's non-proof and real-proof commands from its README. Add meaningful success/failure cases for the new behavior. Keep the existing named checks passing.
2. Run `npm run test:sandbox` when shared/runtime enforcement changes. If the ID-JAG or shared-state profile implementation changes, run its relevant TCK profile; `npm run sandbox:evidence` refreshes both recorded compatibility profiles.
3. Run the full suite when shared adapters, dependencies, proof logic or report inputs affect several projects. To refresh the published suite evidence, use:

```sh
npm run ecosystem:proofs -- --report evidence/ecosystem-run-2026-10-26.json
```

Use a new report filename when the date changes; update the [evidence index](../evidence/README.md) and links deliberately. A single-project run belongs in a separate report and must never overwrite an all-ten report. Review generated output for secrets, exact component levels, passed checks and a matching source digest. Update counts/claims only after the relevant run passes.

Before handoff, record the changed files, tested version/profile, exact command/result, remaining assumptions and next bounded milestone. Publish through the fork and leave merging manual. The official AAIF proposal remains a separate manual filing by zekoxyz.

## Troubleshooting without widening scope

| Symptom | Check | Preserve |
| --- | --- | --- |
| Node/runtime or native startup error | Node 24, macOS arm64 reference platform, pinned setup logs and executable paths | Do not download a new runtime dependency during the offline demo |
| Python import or validator failure | `.cache/ecosystem/python`, `AAIF_SETUP_PYTHON`/`AAIF_DEMO_PYTHON`, exact lock and `pip check` | Do not fall back to unrelated global packages |
| Docker socket/image failure | Running OrbStack/local daemon, local Unix endpoint and `setup -- --docker` | Do not use a remote daemon, mount host secrets or weaken worker isolation |
| Agent Router startup failure | Port 1975 free, pinned Envoy and short runtime directory | Do not terminate an unrelated process using that port |
| Local TLS error | Launch through `sandbox/run.mjs`/npm scripts so the generated local CA is configured | Do not disable TLS verification globally |
| Rejected state action | Exact action ID/units, mission status, domain, holder and remaining quota | Do not grant broader authority to make a test green |
| Timed-out or unknown outcome | Existing action/receipt state and child cleanup | Do not dispatch again under a new action ID |
| Proof failure | Expected public statement, trusted verification key and proof-mode dependencies | Do not silently skip verification or substitute a fixture proof |
