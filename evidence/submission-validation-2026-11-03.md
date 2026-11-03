# Submission validation — 3 November 2026

## Local checks

- **21 unit/integration tests passed**, with no failures or skips, using Node.js 24 and `node sandbox/run.mjs test`.
- **17 ID-JAG/MCP cases and 13 shared-state cases passed**, including real o1js application proofs: [fresh report](sandbox-run-2026-11-03.json).
- Both profile fixture files passed structural validation.

The compatibility source digest remains `9680ac8469e8bd3265a79161e4e516ba688a13f13995fa3b70a7f9add90544d8`. The report records the exact source files, runtime and case results. The synthetic identity provider and local state authority require no production credentials or funded accounts.

## Evidence retained from earlier runs

The [ten-project ecosystem report](ecosystem-run-2026-10-26.json) records the 26 October run: ten local examples and 62 checks passed. The full native/Docker ecosystem suite was not rerun for this submission refresh. Its source digest and implementation scope remain recorded in that report.

## Current core

The [core candidate record](core-candidate-2026-11-03.md) selects commit `49fb253de86ce9188bcd289a8d5bb09e04164084` and links its successful upstream CI. It also points to the now-merged canonical audit folder and deployment documentation.

The local application proofs establish the declared reservation statements. They do not substitute for core-rollup acceptance, data availability, commercial identity-provider testing or Ethereum finality.
