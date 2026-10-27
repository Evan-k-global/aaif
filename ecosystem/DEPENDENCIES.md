# Local example dependencies

The ecosystem examples share the local MCP/AMBA sandbox and use the dependencies below. This record covers the supporting examples; core Zeko and its Ethereum integration maintain their dependency definitions in their own repositories.

## Node.js dependencies

Direct dependencies are pinned in [package.json](../package.json) and [package-lock.json](../package-lock.json).

| Dependency | Version/revision | License |
| --- | --- | --- |
| AMBA | `4b5bb5c6915c7ee17e716ab2320e50d985dfc0d5` | Apache-2.0 |
| MCP TypeScript SDK | 1.26.0 | MIT |
| jose | 6.1.3 | MIT |
| zod | 3.25.76 | MIT |
| o1js | 2.13.0 | Apache-2.0 |
| A2A JavaScript SDK | 1.3.0 | Apache-2.0 |
| Express | 5.1.0 | MIT |
| Ajv | 8.17.1 | MIT |

## Native, Python and container components

Component versions and checksums are recorded in the [ecosystem pins](versions.json), [binary manifest](binaries.json), [Python lock](requirements.lock) and [OpenSandbox image pins](opensandbox/images.json).

Direct license attributions are in [NOTICE](../NOTICE). Dependencies retain their upstream license and notice files. This record is not a complete transitive license inventory.
