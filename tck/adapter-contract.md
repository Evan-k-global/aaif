# Adapter contract v0.1

This contract makes agent authority and shared-state behavior independently testable. Adapters connect implementations to the same public checks, supporting open interoperability and accountable execution.

An adapter is an explicitly selected Node ES module exporting:

```js
export const manifest = {
  name: 'adapter name', revision: 'exact source revision',
  evidence: 'local-real-proof', // or 'deployed-real-proof', 'live-identity-integration'
  profiles: ['zeko-shared-state-v0.1']
};

export async function runCase({ id, profile, setup, steps, signal }) {
  // Materialize semantic fixtures, exercise the real implementation and observe its result.
  return { accepted: 1, effects: 1, remaining: 30 };
}
```

Select the case ID to interpret its setup/steps. `expected` is never passed to the adapter. Numeric resource quantities use integer units. `concurrent` steps must dispatch from two separately authenticated logical callers and join both outcomes. Each case starts with isolated state.

Semantic `valid`, `tampered` and `wrong-domain` evidence selectors tell the adapter which actual proof/token artifacts to construct. A boolean pretending a proof verified is not an implementation. The shared-state profile requires real proof generation/checking and a pinned application verification key; a local test double cannot report `local-real-proof` honestly.

Result keys are normalized observations specified by each fixture. Do not echo credentials or raw protocol traffic. Record protected trace/proof/state artifacts separately and provide redacted, digest-addressed evidence for published runs. The runner compares expectations to observations but does not audit the adapter's implementation.

The `signal` enforces a per-case deadline; use it for network requests and cancel outstanding work on abort. An unknown result after timeout must be reconciled, not retried as if no action occurred. Resource setup/funding/deployment is the operator's responsibility and is not implicitly authorized by invoking fixture validation.
