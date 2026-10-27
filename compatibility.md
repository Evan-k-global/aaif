# Compatibility work matrix

All ten currently listed AAIF projects have a dedicated [ecosystem folder](ecosystem/README.md), executable examples or appropriate instruction artifacts, and explicit evidence levels. These results apply to selected local profiles.

| Surface | Implemented local path | Remaining boundary |
| --- | --- | --- |
| MCP | Official SDK client/server, discovery, competing reservations and replay rejection | Deployed core acceptance and other client profiles |
| ID-JAG | HTTPS synthetic IdP/resource-AS; 17 profile cases pass | Commercial provider and broader profile conformance |
| A2A | Official v1 SDK JSON-RPC client/server; action/reply exchange and replay rejection | Broader task/cancellation/authentication lifecycle |
| goose | Native CLI plus real MCP extension, using a scripted loopback model | Real model/provider behavior and native enterprise authorization |
| agentgateway | Native HTTP routing to MCP; changed-action/replay rejection | Deployment-specific identity policies and additional route modes |
| Agent Router | Native aigw/Envoy model and MCP routing to local fixtures | Kubernetes and deployment-specific identity profiles |
| Open Responses | Official archived schema; local non-streaming tool/result exchange and receipt binding | Full API/streaming compliance and independent provider reproduction |
| OpenSandbox | Official SDK/server, Docker execd worker, deny-by-default egress, result commitment and replay rejection | Core-rollup acceptance, pre-execution admission and production recovery |
| OpenEnv | Official typed in-process Environment; shared quota survives reset | Hosted/server client profiles and actual training/evaluation workloads |
| Agent Skills | Reference validator plus executable packaged action script | Independent consuming-agent reproduction |
| AGENTS.md | Workspace instructions plus executable companion | Behavior of specific coding agents consuming the instructions |

The proof-backed suite passes all ten examples. State acceptance remains a local single-writer model, with no deployed core rollup/DA or Ethereum settlement. [Evidence](evidence/README.md) records versions and source digests; [the runbook](ecosystem/RUNBOOK.md) describes isolation and reproduction.

These are proposed compatibility profiles and reference examples, not an AAIF certification. Refresh the hosted-project roster before filing and test each additional deployment boundary explicitly.
