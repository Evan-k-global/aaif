# MCP: a tool interface to verifiable state

**Upstream role.** MCP connects agent applications to tools and data. The [official SDK](https://github.com/modelcontextprotocol/typescript-sdk) provides the client/server interface used by this repository; see the [authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) for its access boundary.

**Connection to Zeko.** An MCP tool can expose an application-defined state action. The service checks identity and mission authority, submits the state transition to its configured acceptance backend, and returns a receipt the caller can check. MCP remains the tool protocol; Zeko would supply verifiable shared-state acceptance.

## Concrete example

Two agents call `reserve_resource` against one shared quota. Each request is bound to the approved mission, holder, action and intended state domain. The service must reject a duplicate, changed action or conflicting consumption before performing the protected effect. A receiving participant checks the accepted receipt at the required acceptance level.

The benefit is a common state boundary across tools and independently operated services, rather than a separate uncheckable budget in every client. The service must enforce that boundary; a proof returned after an unguarded action would not provide the same control.

## Current evidence and next step

**Implemented locally:** official SDK client/server, HTTPS identity discovery/exchanges, AMBA action checks, real o1js reservation proofs and separate-process verification. The existing suites pass 17 identity-profile and 13 shared-state cases. See [the implementation](../sandbox/README.md) and [evidence](../evidence/README.md).

**Next:** replace the local state authority with a pinned Zeko deployment and test accepted state, conflicts, replay, unavailable state/DA and recovery. Record Ethereum settlement independently when required. Current local results do not establish deployed rollup acceptance or all-MCP-client compatibility.
