# goose: a user-controlled agent consuming shared-state tools

**Upstream role.** [goose](https://github.com/aaif-goose/goose) is an open-source agent with desktop, CLI and API interfaces. Its upstream README describes model-provider choice and extensions through MCP.

**Connection to Zeko.** A goose workflow could invoke the stateful MCP tool instead of relying solely on a budget or commitment kept in one agent session. A human approves a bounded mission; the tool service applies AMBA checks and the configured Zeko acceptance condition. A second client could inspect the same accepted state.

## Concrete example

A developer asks goose to commission a bounded code-review task. Before dispatch, the service reserves the approved resource or payment budget against a task and repository revision. Another worker cannot consume that same reservation again. Completion can refer to an artifact digest and a separately evaluated release condition.

This would let a person change models or agent clients while retaining an application-defined record of approved commitments. A receipt establishes the stated acceptance rule; it does not establish the quality of a code review or prove all agent reasoning.

## Current evidence and next step

**Proposed integration:** goose has not been connected to this repository's tool service. Existing MCP SDK tests use separately registered SDK clients, not goose.

**Next:** pin a goose version, configure the MCP extension and exercise the actual authentication it supports. Standard MCP connectivity alone does not establish support for our enterprise ID-JAG profile; document any identity broker or adapter needed. Run the approved action, replay, changed-action and restart cases and independently inspect the accepted receipt.

The first goose integration can use the existing local state fixture with that label. Demonstrating Zeko's deployed benefit requires the separate core-rollup adapter described in the [MCP guide](mcp.md).
