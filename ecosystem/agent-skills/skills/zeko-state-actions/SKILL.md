---
name: zeko-state-actions
description: Exercise a preapproved resource reservation and inspect its receipt in the local Zeko interoperability demo. Use for bounded action, replay and shared-budget demonstrations.
license: Apache-2.0
compatibility: Requires Node.js 24 and this repository's running loopback fixture. Uses synthetic approval data; no wallet, deployed service or model-provider account.
---

# Local verifiable-state action

Use the fixture's existing human approval. A skill supplies instructions and a tool wrapper; it does not grant authority.

1. Read the supplied action ID and units. Do not widen them or create new approvals.
2. Invoke `scripts/reserve.mjs` with the runner's JSON context on stdin. The context contains only an ephemeral loopback fixture capability.
3. Inspect `ok`, the receipt and the authority profile. A rejection means stop; do not retry a consequential action with a different ID to bypass the decision.
4. Distinguish local proof verification, authoritative state acceptance and Ethereum finality. This demo uses a local state authority.

Only loopback HTTP/HTTPS URLs are supported. Do not load production credentials, fetch funds, deploy contracts or call hosted services. Never include credentials in a receipt or exported evidence.
