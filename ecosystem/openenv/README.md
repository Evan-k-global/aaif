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

## Continue this integration

**Next runnable milestone: two environment instances sharing one resource domain.** Demonstrate that resets and concurrent steps across separate local instances preserve the same authority.

1. Refactor the classes in [`demo.py`](demo.py) into an importable module without changing their official interface, then orchestrate two instances from [`demo.mjs`](demo.mjs).
2. Test concurrent overspend, reset-after-acceptance, stale observations and a new independently initialized trial domain. Add receipt references to observations if needed; avoid putting JWTs or holder keys into observations or rewards.
3. Add a separate local server/client profile only after verifying the pinned OpenEnv transport interfaces. Keep training and any model/provider integration outside this deterministic reproduction unless explicitly authorized.

**Done when:** one shared budget is enforced across both instances, an episode reset cannot replenish it, isolated trial domains do not interfere, and reward/observation expectations state exactly which coordination behavior they measure.

Run these from the repository root after following the [setup instructions](../RUNBOOK.md#prerequisites-and-setup):

```sh
npm run ecosystem:demo -- --project openenv
npm run ecosystem:proofs -- --project openenv --report .cache/ecosystem/openenv-next.json
```

The report must have `passed: true`; proof-mode results must have `proofVerified: true`. The current accepted-action count is one and remaining quota is 30. If a new scenario changes those expectations, define and check the new invariant explicitly. Run the [handoff verification steps](../DEVELOPMENT.md#verification-and-evidence) appropriate to the files changed before publishing new claims.

Read the [ecosystem agent instructions](../AGENTS.md) and [development contract](../DEVELOPMENT.md) before implementation. They document ownership, the shared API, receipt semantics, troubleshooting and the separate path to a core-backed adapter.

See the [suite runbook](../RUNBOOK.md), [shared boundary](../README.md#one-shared-application-boundary) and [evidence](../../evidence/README.md).
