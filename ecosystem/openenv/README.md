# OpenEnv: evaluate shared-resource behavior across resets

Upstream: [project source](https://github.com/openenv/OpenEnv). Pins: [versions](../versions.json).

## What runs

The demo subclasses the official typed Environment, Action, Observation and State interfaces. Its step submits to the shared loopback action service. Reset creates a new local episode without changing external quota. A second actor then attempts an overspend.

```sh
npm run ecosystem:demo -- --project openenv
npm run ecosystem:proofs -- --project openenv
```

## How this can use and benefit from Zeko

Agent evaluations can observe consistent resource-consumption rules across agents and episode restarts. A reset cannot silently replenish a shared budget held outside the environment.

The local example uses the same action contract intended for a Zeko deployment adapter. Proof mode generates and checks a real o1js application proof; the state authority remains local.

## Checks and scope

The first 70-unit action succeeds; resetting preserves remaining quota 30; the second 70-unit action fails; observations and scenario reward reflect that outcome.

This is an in-process custom environment using official types, not an RL training run, hosted dataset or containerized OpenEnv server. Reward describes only this coordination scenario and says nothing about general model quality.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
