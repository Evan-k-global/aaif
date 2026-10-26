# AAIF submission package and manual filing guide

This folder contains the draft proposal for core Zeko and the public supporting work intended for an AAIF review.

**Proposed contribution:** core Zeko rollup infrastructure for verifiable shared state across agent applications.

**Status:** proposal preparation. No filed proposal URL or AAIF admission is claimed.

**GitHub review:** the user has authorized publishing the full package through [Evan-k-global/aaif](https://github.com/Evan-k-global/aaif) and a PR into zeko-labs/aaif. Review happens on GitHub before manual merge and official filing.

**Official issue author: zekoxyz. Do not create the submission from Evan-k-global.** The user has explicitly instructed this agent not to file. Evan-k-global is used only for engineering changes through a fork and PR. No zekoxyz credentials or SSH access are available or needed for preparing this package.

| Document | Purpose |
| --- | --- |
| [Full plan and strategy](project-plan.md) | Positioning, ownership, engineering, outreach, milestones and completion gates |
| [Application matching the official form](application.md) | Field-by-field draft, with owner inputs clearly marked |
| [Sandbox thesis](proposal.md) | Core value proposition, intended users, contribution scope and Growth objectives |
| [Working-group notes](working-groups.md) | Two focused technical conversations, with an optional third |
| [Evidence](evidence/README.md) | Current local results, source digest and exact scope |
| [Progress](progress.md) | Dated artifacts, decisions and reproducible results |

Core and product source remain in their authoritative repositories linked from the [reference hub](README.md). Deployment manifests, compatibility fixtures and runnable examples belong in the corresponding technical areas of the hub as they are implemented. This folder links to that evidence rather than becoming another copy of the core.

## Issue or pull request?

The [official process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) requires a GitHub **issue** in `aaif/project-proposals`. A PR to that repository is not the submission route. A PR to our own `zeko-labs/aaif` repository is how we review and publish the supporting package.

Manual copy/paste is not technically necessary for every GitHub issue: authenticated automation can create one. However, this submission must originate from zekoxyz and the user has explicitly prohibited this agent from creating it. The appropriate path here is manual filing by zekoxyz using the official form. Do not substitute the connected Evan-k-global identity or create an issue first and attempt to change its author later.

## Filing checklist for zekoxyz

1. Finish every `[OWNER INPUT]` in [application.md](application.md), including current maintainers, actual governance, contribution/assets, release evidence, contact and authorized signatory information.
2. Publish the reviewed supporting documents through **Evan-k-global fork → PR → manual merge**. Verify the final public links, the candidate revision and the evidence labels. Convert relative references in the copied application to public URLs.
3. Sign in to GitHub as **zekoxyz** and open the [Project Proposal form](https://github.com/aaif/project-proposals/issues/new?template=project-proposal.yml). Verify the account before filing.
4. Use title **[Project Proposal] Zeko**, choose **Sandbox**, and copy each application section into its matching field. Leave the sponsor field blank if none is identified. Review the license, governance and signatory entries carefully.
5. The authorized owner must personally decide and complete the trademark/accounts agreement checkbox. This package does not decide or accept it.
6. Review the entire form and submit from zekoxyz when the owner is ready. Record the resulting issue URL here and in the focused WG notes. This agent will not perform this step.
7. Keep the issue as the durable Q&A record. Link focused technical replies back to the same issue rather than opening duplicate proposals.

## Review sequence after filing

Expect CTO intake, TC Q&A and voting, Governing Board review, legal execution and technical onboarding. A TC presentation is requested only when needed. Coordinate paperwork with AAIF staff after intake; prepare for the required transfer and charter obligations before the later approval gates. See the current [process](https://github.com/aaif/technical-committee/blob/main/project_proposal_process.md) for the governing details.

Sandbox status is not an endorsement. No acceptance announcement should be made before the full admission process completes. Filing a proposal, publishing this hub and having a successful sandbox run are each distinct from admission.

The application includes the owner-supplied repository, maintainer, contact, support and signatory details, plus the latest checked core candidate and passing CI. The project asset schedule, governance and remaining preparation notes still need review. Nothing here creates an issue or agrees to transfer project assets.
