# OpenSandbox: SDK lifecycle and command evidence

Upstream: [project source](https://github.com/opensandbox-group/OpenSandbox). Pins: [versions](../versions.json).

## What runs

The official Python SDK creates, inspects, executes a command in and terminates a synthetic sandbox through an in-memory httpx transport fixture. The simulated execd endpoint submits the preapproved action to the loopback authority and returns its result through the SDK’s SSE parser.

```sh
npm run ecosystem:demo -- --project opensandbox
npm run ecosystem:proofs -- --project opensandbox
```

## How this can use and benefit from Zeko

An operator-controlled worker can bind job/input/output context to approved commitments and shared resources. A repeated command result can be distinguished from a second accepted action.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

Official SDK create/info/endpoint/command/delete paths execute; SSE output is decoded; the action is accepted once and replay rejected; fixture lifecycle cleanup occurs.

No Docker daemon, image, actual container or isolated worker is created. This demonstrates the official client lifecycle and command/result boundary; it does not demonstrate OpenSandbox process isolation, TEE confidentiality or proof of arbitrary execution. The common proof covers the reservation statement.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
