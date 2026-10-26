# A2A: agent exchanges tied to a commitment

Upstream: [project source](https://github.com/a2aproject/a2a-js). Pins: [versions](../versions.json).

## What runs

The official A2A SDK discovers an agent card and exchanges JSON-RPC messages with a local agent executor. The executor submits a preapproved action to the common authority and returns its result. A second message repeats the action.

```sh
npm run ecosystem:demo -- --project a2a
npm run ecosystem:proofs -- --project a2a
```

## How this can use and benefit from Zeko

Independent agent operators can bind agreed work and resource use to an accepted commitment while retaining opaque internal implementations. A receipt can distinguish accepted work state from a repeated request.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Two wire messages reach the executor; only one commitment is accepted; the repeated action is rejected and cannot dispatch another effect.

This is a native v1 SDK client/server exchange with a synthetic agent, not a language-model worker. It exercises a narrow message/action scenario rather than the whole long-running task, cancellation or push-notification lifecycle.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
