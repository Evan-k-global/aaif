# Core Zeko candidate — 3 November 2026

The application selects the latest `compatible` head checked on this date.

| Item | Verified record |
| --- | --- |
| Core repository | [zeko-labs/zeko](https://github.com/zeko-labs/zeko) |
| Selected commit | [`49fb253de86ce9188bcd289a8d5bb09e04164084`](https://github.com/zeko-labs/zeko/commit/49fb253de86ce9188bcd289a8d5bb09e04164084) |
| Core implementation | [Pinned `src/app/zeko`](https://github.com/zeko-labs/zeko/tree/49fb253de86ce9188bcd289a8d5bb09e04164084/src/app/zeko) |
| Commit subject | Add ZKSecurity audit guides, finding indexes, and scope documentation (#444) |
| Core CI | [Run 40560236657](https://github.com/zeko-labs/zeko/actions/runs/40560236657), completed successfully |
| Published release | [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5), 22 June 2026; the selected commit is newer |
| Audit documentation | [Canonical `audits/` folder](https://github.com/zeko-labs/zeko/tree/compatible/audits); PR #444 merged on 27 October 2026 |
| Core licensing | [LICENSING.md](https://github.com/zeko-labs/zeko/blob/compatible/LICENSING.md) and [protocol license](https://github.com/zeko-labs/zeko/blob/compatible/src/app/zeko/LICENSE.md) |

## Audit sources

- [2025 authoritative circuits and bridge-rule report](https://reports.zksecurity.xyz/reports/zeko/).
- [2026 authoritative circuit-change, sequencer, DA and deployment report](https://reports.zksecurity.xyz/reports/zeko-2/).

The audit index identifies reviewed components and published finding responses. Supporting applications and the AAIF examples have their own review and test scope.

## Deployment and integration references

- [Independent Ethereum Sepolia rollup](https://docs.zeko.io/operators/guides/launch-sepolia-rollup).
- [Ethereum settlement implementation](https://github.com/zeko-labs/ethereum-settlement).
- [Current deployment security model](https://docs.zeko.io/architecture/security-model).
- [Optional Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala).

The Ethereum integration is an experimental testnet deployment. The operator guide distinguishes mock and real verifier configuration. The AAIF reference examples use local state acceptance and do not establish a deployed core or Ethereum settlement result.

This record supersedes the [26 October candidate](core-candidate-2026-10-26.md) for the current application; that earlier record remains historical.
