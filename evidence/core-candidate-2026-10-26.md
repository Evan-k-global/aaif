# Core Zeko candidate — 26 October 2026

Open-source sovereignty depends on inspectable code and build evidence. This record identifies the core Zeko commit selected for the AAIF proposal and its passing upstream CI.

We selected the latest `compatible` branch head checked on this date as the core proposal candidate. The record identifies the commit and its upstream build evidence.

| Item | Verified record |
| --- | --- |
| Core repository | [zeko-labs/zeko](https://github.com/zeko-labs/zeko) |
| Branch | `compatible` |
| Candidate commit | [`28223900e4fbb69d04025b5ca8b9a044d493e6ed`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed) |
| Core implementation | [Pinned `src/app/zeko`](https://github.com/zeko-labs/zeko/tree/28223900e4fbb69d04025b5ca8b9a044d493e6ed/src/app/zeko) |
| Commit subject | Open Zeko-authored code under Apache-2.0 (#443) |
| Core CI | [Run 40358110682](https://github.com/zeko-labs/zeko/actions/runs/40358110682), completed successfully |
| Verified job steps | [Build & Test](https://github.com/zeko-labs/zeko/actions/runs/40358110682/job/121695924557): Zeko package build and sequencer-test steps succeeded |
| Most recent published release returned | [v1.0.5](https://github.com/zeko-labs/zeko/releases/tag/v1.0.5), 22 June 2026; the selected branch head is newer |
| Audit documentation | [PR #444](https://github.com/zeko-labs/zeko/pull/444), open and unmerged at this check; target is the core repository's `audits/` documentation |

The branch head and CI were read through the public GitHub API. The candidate is separate from the local integration sandbox's pinned dependencies and source digest. This record does not say that the sandbox ran against a deployed core sequencer, or that this CI run verified an Ethereum settlement deployment.
