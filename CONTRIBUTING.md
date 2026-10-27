# Contributing

We welcome implementation fixes, test vectors, independent reproductions, interoperability feedback and documentation improvements. Our public-good purpose centers on AI freedom, sovereignty, privacy and broad participation. See [our purpose](PUBLIC_GOOD.md).

## Propose a change

Open an [issue](https://github.com/zeko-labs/aaif/issues) or submit a pull request from your fork to `zeko-labs/aaif`. Include the problem, affected integration/version, resulting behavior and relevant validation. Maintainers review changes before merging.

Core protocol and application source remain in their canonical repositories. This repository owns cross-project adapters, compatibility fixtures, examples and evidence. Dependencies are pinned so another developer can reproduce the same integration boundary.

## Reproduce and validate

The [runbook](ecosystem/RUNBOOK.md) covers setup and local execution. Each [ecosystem folder](ecosystem/README.md) describes its implementation, Zeko integration, measured scope and development roadmap. The [architecture guide](ecosystem/DEVELOPMENT.md) explains shared interfaces and proof/acceptance semantics.

Implementation changes should include meaningful success and failure cases. The relevant project/profile run and source-digested report should match the changed code. Local results, deployed-system evidence and planned extensions have distinct labels. Reports exclude credentials, private keys and personal data.

For specification/profile changes, we welcome a public issue or PR describing the affected semantics, versions, positive/negative vectors and migration impact. Adopted governance and maintainer processes will document decision rights as the project develops.
