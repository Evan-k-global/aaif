# Local state-action workspace

This workspace is a documentation-format example for the AAIF AGENTS.md project.

Use the preapproved fixture action supplied by the demo runner. Instructions do not create authority. Preserve its action ID, units and intended domain; submit it to the loopback action service and inspect the accepted receipt.

Run the companion example from the repository root:

```sh
npm run ecosystem:demo -- --project agents-md
```

Stop on rejection, changed approval or an unknown result. Do not bypass a shared budget by resetting the agent session or choosing another action ID. A valid application proof is not a statement that all external work occurred.

Use synthetic credentials and loopback fixtures only. Do not load wallets, call hosted models, deploy services or send transactions. Keep temporary capabilities and private keys out of logs and evidence. The demo's state acceptance is local, with no Ethereum settlement.
