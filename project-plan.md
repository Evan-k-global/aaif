# Zeko AAIF project plan and strategy

Working plan, 26 October 2026. No AAIF submission has been filed. The official proposal must be filed by **zekoxyz**. Evan-k-global is the engineering fork/PR identity only.

## Decision and thesis

The repository has a lasting public purpose: establish a public record of useful infrastructure offered freely under open-source licenses for AI freedom, sovereignty and privacy. See the [public-good commitment](PUBLIC_GOOD.md).

Propose **core Zeko rollup infrastructure for verifiable shared state across agent applications**, at the Sandbox stage. The [short thesis](proposal.md) explains the contribution; the [application](application.md) follows the official form.

Agent interfaces connect systems, but independently operated systems also need to agree on consequential state: which authority remains, which budget is reserved, what work was committed, and which result was accepted. Zeko lets application developers define state-transition rules and lets other participants verify the specified computation. Recursive aggregation makes this useful as shared infrastructure across applications.

Lead with the coordination problem and a working example, then explain the proofs and rollup. Ethereum is the principal blockchain compatibility, settlement and bridging focus. Briefly reference Mina origin and prior mainnet deployment as technical heritage and operational experience.

Blockchain and proofs should earn their place through the guarantee they add. A workflow that only needs a conventional service does not need to adopt a rollup. The target is independently operated participants who need verifiable common state and explicit acceptance rules. Human freedom and flourishing translate into bounded delegation, revocation, understandable consent, operator choice and freedom to change agent/model providers.

## Contribution boundary and repository ownership

The proposal concerns the core infrastructure, not an automatic contribution of the whole Zeko Labs application portfolio. The exact repository, path, dependency and asset schedule must be approved by the owner with AAIF staff. The `aaif` repository supports the proposal; it must not be mistaken for the entire proposed core contribution.

| Repository | Responsibility |
| --- | --- |
| [zeko](https://github.com/zeko-labs/zeko/tree/compatible/src/app/zeko) | Canonical rollup, circuits, sequencing, proving and data-availability implementation |
| [ethereum-settlement](https://github.com/zeko-labs/ethereum-settlement) | Canonical Ethereum verification, settlement, bridge and associated deployment interfaces; confirm its inclusion in the asset schedule |
| [aaif](https://github.com/zeko-labs/aaif) | AAIF compatibility profiles, integration orchestration, reference fixtures, reproducible evidence, proposal and roadmap |
| [AMBA](https://github.com/zeko-labs/agent-mission-bound-auth) | Reusable identity/authorization support, mission constraints, holder binding and enforcement |
| SantaClawz, x402-Zeko and Magic City | Their respective application implementations and product integrations |

Import pinned upstream implementations. Keep synthetic providers, reservation examples and compatibility fixtures in `aaif`. Move a generally reusable adapter into its owning project when it becomes useful beyond this example; keep its cross-project tests here.

Publication workflow: **Evan-k-global/aaif → PR to zeko-labs/aaif → manual maintainer merge**. The user has supplied [the fork](https://github.com/Evan-k-global/aaif). The user has authorized pushing the full package to the fork and opening a PR for GitHub review, superseding the earlier pre-review push hold. Leave the PR unmerged. It is separate from the official issue, which only zekoxyz should file.

Publish the public-good statement, runnable work and evidence in the review PR. After publication, add a reviewed link from the canonical Zeko README/documentation so people evaluating the core can find this record. The form can remain visibly a draft until owner facts are complete.

## Demonstration strategy

Use one coherent story: a person approves a bounded task; an agent obtains resource access; the tool checks mission authority; a reservation changes shared state; another participant verifies the resulting evidence. Show rejected actions as well as successful ones.

| Layer | Evidence available now | Remaining validation |
| --- | --- | --- |
| Enterprise identity | HTTPS discovery, signed ID-JAG exchanges and resource token validation | Commercial ID-JAG-capable provider and resource-AS configuration |
| MCP | Official SDK client/server and two client registrations | Another client implementation or AAIF client/gateway |
| AMBA | Canonical OAuth, mission, holder and stateful action checks | Deployment-specific identity-to-mission policy review |
| Application proof | Real o1js reservation proofs and separate-process verification | Core-rollup acceptance and recovery adapter |
| State authority | Explicit local single-writer sandbox | Sequencer/DA acceptance and conflicting-request recovery in a deployed rollup |
| Ethereum | Public sovereign-rollup deployment and settlement documentation | A separately recorded deployment with the exact verifier configuration |

Current local results: **19 unit/integration tests, 17 ID-JAG/MCP profile cases and 13 shared-state profile cases pass**. See [evidence](evidence/README.md) and [scope](sandbox/README.md). These results establish selected local behavior, not commercial-provider certification, a deployed Zeko core integration or Ethereum settlement.

The compatibility suite is our proposed profile and reference test kit. AAIF has not adopted or certified it. The TC's TCK/ID-JAG priorities reported by the user guide our engineering; they should not be presented as published universal admission requirements.

## Deployment and sovereignty framing

The [independent Sepolia guide](https://docs.zeko.io/operators/guides/launch-sepolia-rollup) makes operator-owned deployment concrete through a container stack and operator-controlled keys, genesis, configuration and contracts. Its default tutorial uses a mock Ethereum verifier; real verification is a separately configured profile. Record which profile was actually demonstrated.

Separate application-state validity, rollup acceptance, external state settlement and asset bridging. Explain which acceptance level a service needs before acting. Settlement adapters make the architecture extensible; portability to an arbitrary platform needs a tested integration. Do not equate the Ethereum-connected tutorial with evidence for a deployed no-settlement profile.

[Phala confidential hosting](https://docs.zeko.io/operators/guides/rollup-on-phala) illustrates optional infrastructure modularity. Its published guide should not be represented as a reproduction of the latest Ethereum stack. Hardware attestation and proof verification address different trust questions.

## Focused community campaign

Two initial working groups, with one optional third. Read current channel context before posting. Introduce a useful question and one focused artifact, then use the filed proposal as context. Do not post every repository across groups or ask for generic endorsements.

| Order | Working group | Contribution and framing |
| --- | --- | --- |
| 1 | Security & Privacy | Core rollup plus a reproducible shared-state violation: replay, conflicting consumption or wrong-domain proof. Ask about the boundary between validity, state acceptance and external enforcement. |
| 2 | Identity & Trust | **SantaClawz and AMBA together**: discovered agent identity → principal/holder → bounded task authority. Bring the ID-JAG/MCP sandbox as concrete interoperability evidence. |
| 3, optional | Agentic Commerce | **x402-Zeko and Magic City together**: payment authorization, work commitments, delivery and conditional release referring to the same task context. Keep standard x402 behavior separate from custom extensions. |

Channel routing and paired examples are in [working-groups.md](working-groups.md). Other groups, including Taxonomy & Landscape, remain internal mapping and technical context rather than an expanded promotional schedule. The user has not authorized sending community messages.

zkTLS is a supporting primitive: extract a reusable external-data evidence interface, with the prediction market as its working demonstration and the partner-motivated PoC as a second use case. Keep extraction and verifier-hardening work explicit. Do not frame the market itself as the core submission or inherit core audit claims for either demo.

## Delivery plan

The sequence below is a proposed work plan, not a promised AAIF review schedule. Dates depend on maintainer capacity and access to deployment resources.

| Phase | Deliverables | Completion condition |
| --- | --- | --- |
| Complete locally | HTTPS ID-JAG/MCP/AMBA integration, real proof example, versioned fixtures and evidence | Current 19 tests plus 30 profile cases pass; boundaries recorded |
| Before filing | Publish the reviewed hub through the fork/PR workflow; finalize application and short thesis | Public links resolve, candidate revision pinned, maintainer review complete |
| Before filing | Confirm contribution/assets, named maintainer, governance, licenses, releases and contacts | Required form fields contain verified facts; authorized owner decides the agreement checkbox |
| Filing | zekoxyz manually submits the official issue | Correct author, complete form, actual issue URL recorded; no issue created by this agent |
| First 30 days of engineering | Reproduce from a clean checkout, run hosted CI, publish a versioned profile and invite one outside reproduction | Public run artifacts and at least one attributable reproduction or actionable report |
| Days 30–90 | Replace the local state adapter with a pinned core-rollup integration; exercise one additional AAIF client/gateway; validate a commercial IdP if available | Separate evidence for each integration and acceptance level; do not wait for every integration before filing |
| Months 3–6 | Hardening, recovery/DA tests, dependency inventory, profile revisions and contributor onboarding | Reviewed failure behavior, documented maintainer path and checkpoint evidence |
| Months 6–12 | Pursue independently operated deployments, outside contributions and a sponsor-reviewed Growth plan | Evidence mapped to the then-current graduation criteria; apply for Growth when met |

A real Ethereum verification profile is a separately budgeted deployment milestone. Commercial-provider access, a new cloud host and funded transactions are follow-on needs, not prerequisites for the existing sandbox or for showing a thoughtful integration plan.

## All-AAIF compatibility path

The [ecosystem folder](ecosystem/README.md) explains the strongest project connections and their proposed workflows separately from the runnable integration and implementation backlog. It includes an individual guide for MCP, goose, agentgateway, A2A and OpenSandbox, plus the supporting map for the other hosted projects.

Reuse one versioned state/action interface and add narrow adapters rather than a bespoke protocol for every pair. This can reduce integration sprawl where semantics align; it does not eliminate all N:N relationships or business-policy differences.

MCP is the first executable interface. Next choose one practical client/gateway, such as goose or agentgateway, then A2A task/artifact binding. Map Agent Router, Open Responses, OpenSandbox, OpenEnv, Agent Skills and AGENTS.md to their relevant boundaries. Instruction formats, runtimes and transport protocols need different tests. See the [compatibility matrix](compatibility.md); there is no current claim of compatibility with every hosted project. Refresh the roster before filing and before adding commitments.

## What strengthens the acceptance case

Serve the public through dated implementations, exact versions, reproducible evidence and substantive responses to technical feedback. Let that record demonstrate responsiveness and care. Treat broad participation, sovereign operation and human benefit as enduring project goals, with neutral governance made concrete through documented decisions and an outside-maintainer path.

Make the contribution independently useful, easy to reproduce and open to implementers beyond Zeko Labs. Provide a credible importance-before-adoption thesis instead of inflating first-party demos into outside adoption. Explain why neutral stewardship improves the shared interfaces, rather than using foundation hosting as a marketing credential.

Use the core audit index and authoritative zkSecurity reports for the core's security history. Keep application reviews, bug-bounty findings and demo assurance separately attributed. The [audit documentation PR](https://github.com/zeko-labs/zeko/pull/444) is currently open; use its canonical folder URL after merge. No numeric acceptance probability is justified by the proposal history.

Likely reviewer questions: why is this agent infrastructure; where does the operator remain trusted; how does the action gate prevent bypass; which deployment actually ran; what exactly is contributed; who maintains it; and how does it relate to existing interfaces? The thesis, evidence labels and owner-completion checklist answer these directly.

## Official process and filing controls

The [proposal process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) makes an issue the official record. A PR in our repository is draft review, not formal intake. Use the [current form](https://github.com/aaif/project-proposals/issues/new?template=project-proposal.yml) from zekoxyz.

The review proceeds through CTO intake, TC Q&A, TC vote, GB review, legal execution and onboarding. Four TC acknowledgments are needed before advancing from Q&A; a presentation is on demand. Prepare contributor paperwork in parallel after intake, with agreed documents ready before the GB vote. Do not promise a review completion date or announce acceptance before all gates close.

The [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md) permits a Sandbox importance-before-adoption case. Plan for the six-month checkpoint and expected Growth application within twelve months. Growth needs two unaffiliated production users, contributions from two organizations over the preceding six months and a sponsor-accepted growth plan. These are graduation goals, not requirements to invent for the Sandbox application.

## Confirmed owner facts and remaining preparation

- Core contribution repository: `zeko-labs/zeko`, with the rollup in `src/app/zeko` on `compatible` and audit documentation being added in that repository. Applications remain supporting examples.
- Maintainers supplied by Zeko Labs: `zekoxyz` (team handle) and Martin Ondejka (`MartinOndejka`). See the [roster](MAINTAINERS.md) and public contribution links.
- Current candidate: [`28223900e4`](https://github.com/zeko-labs/zeko/commit/28223900e4fbb69d04025b5ca8b9a044d493e6ed), latest `compatible` head checked on 26 October 2026, with [passing core CI](https://github.com/zeko-labs/zeko/actions/runs/40358110682). Refresh after the audit documentation merges.
- Application contact: Evan Kereiakes, contact@zeko.io.
- Support: Zeko Labs and its investors.
- Contributing entity and signatory: Zeko Labs Inc., 16192 Coastal Highway, Lewes, DE 19958; Evan Kereiakes, AAIF Liaison, contact@zeko.io.

Remaining preparation is the precise project asset schedule, adopted governance/decision and specification processes, release mechanics, dependency inventory, official channels and infrastructure request. Separately hosted Ethereum assets are not automatically included by reference. Contacts, signatory and candidate no longer need to be guessed or requested again.

The [application](application.md) marks these fields rather than guessing. No zekoxyz credentials are requested. Nothing in this plan accepts transfer terms or authorizes filing.
