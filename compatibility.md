# Compatibility work matrix

This is the integration backlog for the AAIF application, not a compatibility claim or an outreach schedule. First: MCP enterprise-managed access into a mission-authorized Zeko state action.

| Surface | Work | Status |
| --- | --- | --- |
| MCP | Enterprise-managed authorization; `reserve_resource` tool; action/result correlation | Official SDK client/server work in local HTTPS sandbox; two client registrations tested |
| ID-JAG | Two-hop OIDC flow; issuer/client/tenant/resource binding | 17 profile cases pass against signed-JWT sandbox roles; commercial-provider validation remains |
| A2A | Bind task/artifact identity to a mission/state receipt | Planned after MCP |
| goose | Exercise the MCP tool with unchanged shared fixtures | Planned |
| agentgateway | Route authenticated context and required acceptance profile | Planned |
| Agent Router | Test its supported routing boundary independently | Planned |
| Open Responses | Preserve tool/result correlation and authority boundaries | Mapping required |
| OpenSandbox | Run the adapter in its execution environment | Mapping required |
| OpenEnv | Reproducible scenario with observable effects/failures | Mapping required |
| Agent Skills | Instructions and prerequisites for the completed tool | Planned packaging |
| AGENTS.md | Build/test contributor instructions | Present in this repo; instructions do not establish protocol conformance |

Refresh the hosted-project roster before filing. Test each project's relevant boundary; instruction formats are not network authorization protocols. Version pins and run evidence replace planned status only as integrations are completed.
