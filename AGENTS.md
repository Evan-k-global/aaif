# Contributor instructions

Use the Evan-k-global fork and open a PR to zeko-labs/aaif. Leave merging to the maintainer.

The user has authorized publishing the full package for review on GitHub, superseding the earlier pre-review push hold. Push to Evan-k-global/aaif and open a PR into zeko-labs/aaif; leave merging to the maintainer. This does not authorize filing the official AAIF issue.

Preserve the repository's public-good purpose: free open-source work for AI freedom, sovereignty and privacy, with dated reproducible evidence and open participation. Let that commitment stand on its own; do not qualify it with language about AAIF acceptance or rejection. Distinguish the commitment to neutral stewardship from independent governance not yet established. Never backdate a GitHub publication or present local-only work as already published.

Do not create the official AAIF submission. The user requires its issue author to be zekoxyz, not Evan-k-global. Prepare reviewable documents and manual form instructions only. No credentials or SSH control for zekoxyz are available. Repository PR authorship and official AAIF submission authorship are separate.

Use Node.js 24 and `npm ci --ignore-scripts`. Run `npm run test:sandbox` and the applicable TCK profile after changing its implementation. `npm run sandbox:evidence` generates a redacted local evidence report for both profiles. Real application proofs are local and use no funded wallet or deployed contract.

Ecosystem demos live in one subfolder per AAIF project. For implementation changes, run the affected project demo and refresh relevant evidence. The full native suite is tested on macOS arm64 with Python 3.12+; `npm run ecosystem:setup` prepares pinned dependencies and `npm run ecosystem:proofs` runs all ten examples. Runtime uses synthetic credentials and local fixtures only. Preserve the distinction between native components, SDK/schema fixtures, instruction-format companions and deployed rollup acceptance.

Before extending an ecosystem project, read `ecosystem/AGENTS.md`, `ecosystem/DEVELOPMENT.md` and the target folder's README. Each guide specifies its Zeko benefit, next runnable milestone, files to change and acceptance criteria. Keep completed work and future milestones distinct; update the handoff alongside implementation.

OpenSandbox uses real local Docker containers (OrbStack tested). Prepare immutable images with `npm run ecosystem:setup -- --docker`. Only the host coordinator/lifecycle server may use the local Docker socket; never mount it or host credentials into the job worker. Keep SDK ports on loopback, preserve deny-by-default egress and the synthetic local canary check, and clean up only this run's owned containers. Its proof records a host-verified result commitment; it does not attest arbitrary container execution or pre-execution compute admission.

Keep generated TLS keys, caches, environment credentials and node_modules untracked. The local IdP automatically authorizes a synthetic user for protocol testing and is not a production identity provider. Keep sandbox, commercial-provider, core-rollup and Ethereum-settlement evidence labels explicit.

Reuse the pinned AMBA dependency. Preserve the core protocol/application code in its canonical repository. Update the version pins and evidence record when changing the integration boundary.
