# OpenEnv: evaluate shared-resource behavior across resets

Upstream: [project source](https://github.com/openenv/OpenEnv). Pins: [versions](../versions.json).

## What runs

The demo subclasses the official typed Environment, Action, Observation and State interfaces. Its step submits to the shared loopback action service. Reset creates a new local episode without changing external quota. A second actor then attempts an overspend.

```sh
npm run ecosystem:demo -- --project openenv
npm run ecosystem:proofs -- --project openenv
```

## How OpenEnv can benefit from Zeko as an agentic internet protocol

OpenEnv can express agent tasks as typed environments with actions, observations and rewards. Zeko can hold the consequential shared state outside an individual environment instance. This gives evaluation authors a way to examine cross-agent resource coordination, restart behavior and accepted commitments without letting an episode reset silently recreate a common budget.

A useful scenario is several agents competing or collaborating over one pool of delegated capacity. An environment can expose observations of the shared balance and reward the desired coordination behavior, while the state service applies the same rules to every actor. The current example accepts one 70-unit action, resets the local episode, observes the same remaining 30 units and rejects another 70-unit request. The reset is an environment event, not authority to rewrite the external resource state.

| Integration point | OpenEnv responsibility | Zeko application responsibility |
| --- | --- | --- |
| Action | Define the typed step request | Check the approved action and state-dependent limits |
| Observation | Present the environment's view | Include accepted/rejected state and a checkable receipt reference |
| Reset | Start an episode under an explicit scenario policy | Preserve or deliberately initialize the authoritative resource domain |
| Reward | Score the behavior the scenario measures | Keep reward calculations separate from proof/state validity |

A verified reservation can make the resource rule auditable; it does not make an arbitrary reward function correct or prove better models. Evaluation isolation also needs a deliberate policy: sharing one resource domain across episodes tests persistent scarcity, while a fresh domain per independent trial avoids unintended cross-run contamination. The demo uses official OpenEnv types in process. It has not yet exercised an OpenEnv server/client transport, training loop or deployment on a core Zeko rollup.

## Checks and scope

The first 70-unit action succeeds; resetting preserves remaining quota 30; the second 70-unit action fails; observations and scenario reward reflect that outcome.

This is an in-process custom environment using official types, not an RL training run, hosted dataset or containerized OpenEnv server. Reward describes only this coordination scenario and says nothing about general model quality.

## Development roadmap

We plan to run two environment instances against one resource domain and test concurrency, resets and stale observations. Independent trials will use explicitly separate domains. This will make persistent shared scarcity and trial isolation observable without treating a scenario reward as a claim about general model quality. A local server/client profile is a further milestone.

The implementation is in [`demo.mjs`](demo.mjs). Our [integration architecture](../DEVELOPMENT.md) describes the shared service, receipt contract and path to a core-backed deployment. Reproduction commands and prerequisites are in the [runbook](../RUNBOOK.md); measured results are in the [evidence record](../../evidence/README.md).
