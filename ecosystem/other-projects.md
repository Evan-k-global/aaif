# Supporting connections across the AAIF stack

The [AAIF project roster](https://aaif.io/projects), checked on 26 October 2026, lists ten hosted projects. The five [lead guides](README.md) cover the most useful initial demonstrations for this proposal. The remaining five have complementary roles:

| Project | Proposed connection | Useful demonstration | Current status |
| --- | --- | --- | --- |
| Agent Router | A model/tool traffic control plane can route requests that consume shared application resources | Preserve authorized task context while routed clients contend for the same budget | Planned; assess its own interface independently of agentgateway |
| Open Responses | An application using the shared response API can correlate tool calls/results with a state-action receipt | The same task/action identity survives request retries and provider changes | Mapping required; no integration run |
| OpenEnv | An agent training/evaluation environment can exercise a shared-resource coordination scenario | Evaluate attempted overspend, replay and recovery as observable behaviors | Mapping required; task quality and state validity remain separate measurements |
| Agent Skills | A reusable skill can explain how to invoke the tool, interpret receipts and handle failures | Package prerequisites, required authority and a reproducible example without credentials | Packaging planned; skill text is not a state-acceptance protocol |
| AGENTS.md | Repository instructions guide a coding agent's use and maintenance of the integration | Keep build/test commands, source ownership and evidence boundaries discoverable | Instructions present in this repo; no runtime/settlement conformance claim |

These are proposed application connections inferred from each project's role. They are not integration results or upstream commitments. The right check depends on the component: instruction formats need clear packaging and reproducible instructions; clients and gateways need live interaction tests; execution/evaluation environments need scenario-specific runs.

The integration target is reusable application-state acceptance across useful combinations of these projects. Choosing every component is not a prerequisite for using Zeko. See the [compatibility matrix](../compatibility.md) for implementation status and the [plan](../project-plan.md) for the broader sequence.
