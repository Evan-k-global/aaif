# Instructions for agents extending the ecosystem examples

Read the repository-root [AGENTS.md](../AGENTS.md), the target project's README and [DEVELOPMENT.md](DEVELOPMENT.md) before changing an integration. Each project README has a specific next milestone and acceptance criteria. Preserve the user's fork → upstream PR → manual merge workflow. Do not file the official AAIF issue or send community messages.

## Start with a bounded, reproducible change

1. Identify the project folder, pinned upstream version, current evidence level and checks. Read its `demo.mjs` and any Python or packaged-script entry point.
2. Reproduce that project from the repository root with the README's demo and proof commands. Use Node.js 24, the isolated Python environment and the documented native platform. OpenSandbox also needs local Docker and prepared image digests.
3. Select one next milestone from that README. State the observable acceptance/failure behavior before implementation. Keep a working local path with synthetic inputs; a real provider, funded transaction or remote deployment is a distinct profile requiring authorization.
4. Implement the narrow extension in the owning project adapter. Change shared code only when the behavior is shared. Run the affected checks, update the guide and generate evidence that matches the code.

## Preserve the enforcing boundary

- The local broker is a trusted test orchestrator. `runtime.approve()` binds exact units and an action ID to an existing synthetic client's signed AMBA context; it is not a production approval API.
- Clients, prompts, skills, gateway routes and worker output cannot grant themselves new authority. Keep approval checks, holder binding and protected effects in the service boundary.
- A proof of a valid transition, acceptance by an authoritative state service and optional Ethereum verification/settlement are different evidence levels. The existing writer is local, not a Zeko sequencer/DA deployment.
- Use stable action IDs and explicit state domains. On unknown outcomes, reconcile before retrying; do not generate a fresh ID to bypass replay protection.
- The current proof statement and reservation data are public. Do not claim privacy, TEE protection, correct arbitrary worker execution, universal upstream compatibility or improved model quality from this suite.

## Keep local execution reproducible

Use the pinned packages, schema, binaries and OCI digests. Setup is the explicit dependency-download phase; runtime remains local. Preserve the minimal child environment, network/redirect guards, isolated configuration, timeouts and cleanup. Never read existing real provider/wallet credentials to make a demo pass. Keep capabilities on stdin rather than in logs or command arguments.

For OpenSandbox, only the host coordinator/lifecycle server may access the local Docker socket. Keep the worker free of host binds, Docker access and authority/provider credentials; retain limits, loopback SDK ports, deny-by-default egress and the synthetic canary. Never prune unrelated Docker resources.

The nested `agents-md/workspace/AGENTS.md` and `agent-skills/skills/zeko-state-actions/SKILL.md` are executable-demo inputs. Editing them changes the artifact under test and must be reflected in evidence. They do not replace these contributor instructions.

## Complete the handoff

Document what runs, how the integration benefits from Zeko, exact changed files, remaining trust assumptions, reproducible commands and the next bounded task. Update pins when an integration boundary changes. Do not label a planned milestone as implemented.

Follow [verification and evidence](DEVELOPMENT.md#verification-and-evidence). A project report belongs to the selected project; it must not be presented as a full-suite result. Keep generated keys, caches and environment material untracked. Reusable protocol/application changes belong in their canonical repository; keep cross-project orchestration and tests here.
