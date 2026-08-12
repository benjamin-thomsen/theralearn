# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-12

---

## Purpose

This document owns the current verified state of the TheraLearn project.

It answers:

- What is the current phase?
- What has been verified?
- What is currently being worked on?
- What is unresolved?
- What risks or inconsistencies are known?
- Are code changes currently allowed?
- What is the next allowed action?

Stable project identity and permanent principles belong in `PROJECT_OVERVIEW.md`.
Project governance, authority rules, and documentation navigation belong in `PROJECT_HANDBOOK.md`.
Domain-specific knowledge belongs under `docs/`.

---

## Current Phase

**Domain Documentation Repair and Synchronization**

The historical reconstruction and the authoritative project-control kernel are established.

The architecture-domain repair/audit has reached a verified checkpoint. The current task now moves to determining the permanent documentation home for the certified Foundation/method material below the root control layer.

This is not a new architecture-design phase. Existing certified principles are being consolidated and checked against current repository authority without redefining them.

---

## Current Branch

```text
migration-next16-to-root
```

This branch contains the current reconstructed and verified development state plus the authoritative control and repaired architecture documents.

`main` has not yet been updated with this development history.

---

## Verified Technical Baseline

### Application

- Next.js 16.2.12 is in use.
- TypeScript compilation passes.
- Production build passes.
- 21 application routes/pages are generated or server-rendered by the most recent complete verification.
- A non-blocking `metadataBase` warning remains registered for future resolution.

### Supabase

- Supabase CLI workflow was established.
- MVP database migration exists and was previously pushed to the remote Supabase project.
- Generated database types exist in `types/database.ts`.
- Typed Supabase client/server/proxy integration exists.

### Repository Layer

A repository-layer foundation exists under `lib/repositories/`.

Verified implemented areas include courses, chapters, lessons, flashcards, shared repository types, and shared repository error handling.

`lib/repositories/quizQuestions.ts` is an empty placeholder and must not be treated as completed repository functionality.

### Frontend Transitional State

- Next.js App Router routing/presentation structure is established.
- Global CSS and colocated CSS Modules are in use.
- Reusable UI components exist, but `components/PensumCard.tsx` is an empty placeholder.
- Browser-local quiz progress persists through `lib/progress.ts` and `lib/storage.ts` using `window.localStorage`.
- Supabase/repository persistence exists separately and broad frontend repository adoption is not yet verified.

### CI Verification

- `.github/workflows/verify.yml` runs on push and pull request.
- CI uses Ubuntu, the Node version from `.nvmrc`, `npm ci`, and `./scripts/dev verify`.
- Public Supabase configuration used during verification is supplied through GitHub Secrets.
- This is verified CI behavior and is not by itself evidence of a deployment architecture.

### Developer Toolkit

The Developer Toolkit includes verified workflows for help, documentation check, project verification, project/Git status, file output, edit preparation, replace preparation, clipboard copy, and project search.

The Toolkit launcher automatically copies command output to the clipboard except for the dedicated `copy` command.

The Toolkit implements the workflow; it does not define the project methodology.

---

## Verification State

The most recent complete local verification before documentation repair reported:

```text
Build: PASS
TypeScript: PASS
Documentation structure: PASS
Overall verification: PASS
```

The documentation structure check confirms directory existence. It does not prove that documentation content is complete, current, or authoritative.

The following repaired architecture/control entry documents have been re-read from the target GitHub branch after commit:

- `docs/README.md`;
- `docs/architecture/README.md`;
- `docs/architecture/system-overview.md`;
- `docs/architecture/database.md`;
- `docs/architecture/authentication.md`;
- `docs/architecture/backend-architecture.md`;
- `docs/architecture/frontend-architecture.md`.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation**

The historical review re-established the development chain:

```text
Foundation Design
    ↓
Mechanism Design
    ↓
Foundation Validation
    ↓
Foundation Certification
    ↓
Architecture Derivation
    ↓
Implementation Architecture Derivation
    ↓
Implementation Responsibility Model
    ↓
Completeness Analysis
    ↓
Historical Certification Review
```

The review recovered the permanent methodological principles needed to continue the project.

Known gaps in the reloaded historical evidence include parts of the detailed falsification sequence, including falsification attempt 12 and the full individual history between attempts 20 and 119. The historical certification conclusion reports 120 passed falsification attempts and methodological saturation.

These gaps are currently archival/revision gaps rather than blockers. Historical material should only be reloaded again if a specific unresolved documentation claim requires it.

---

## Authoritative Control Kernel

**Status: Established**

The project has three explicit root control documents:

- `PROJECT_HANDBOOK.md` — governance, authority map, workflow entry point, information lifecycle, and context-recovery procedure;
- `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
- `PROJECT_CONTROL.md` — current verified state, workflow gate, risks, and next allowed action.

A new working session should recover context by reading:

```text
PROJECT_HANDBOOK.md
        ↓
PROJECT_OVERVIEW.md
        ↓
PROJECT_CONTROL.md
        ↓
Relevant domain documentation
        ↓
Relevant implementation
```

Historical chats are no longer the default context-recovery mechanism.

---

## Architecture Documentation Status

**Status: Core architecture repaired; remaining topics classified**

### Repaired and verified architecture documents

- `docs/architecture/README.md`;
- `docs/architecture/system-overview.md`;
- `docs/architecture/database.md`;
- `docs/architecture/authentication.md`;
- `docs/architecture/backend-architecture.md`;
- `docs/architecture/frontend-architecture.md`.

### Remaining topic classification

#### `api.md`

**Classification: topic not currently represented by a distinct implemented architecture boundary.**

A specific authentication route handler exists, but no general REST, GraphQL, RPC, or application API architecture has been verified. The file remains empty rather than inventing a general API layer.

#### `integrations.md`

**Classification: topic not currently represented by a distinct implemented architecture boundary.**

Supabase is a verified platform dependency, but its persistence and authentication boundaries already have permanent homes in `database.md` and `authentication.md`. No separate integration architecture has been established that would justify duplicating those definitions.

#### `security.md`

**Classification: empty placeholder without enough current evidence for a responsible standalone document.**

Verified security-relevant mechanisms include authentication/session behavior and database RLS, but those are already documented in their authoritative domains. A broader security architecture has not yet been established from inspected evidence.

#### `deployment.md`

**Classification: empty placeholder without enough current evidence for a responsible standalone document.**

GitHub Actions CI verification is implemented and verified. However, no `vercel.json` exists on the branch, `next.config.ts` contains no deployment-specific configuration, and repository search did not establish a deployment pipeline/configuration that could support an authoritative deployment architecture document.

CI verification must not be mislabeled as deployment architecture.

#### `scalability.md`

**Classification: empty placeholder without enough current evidence for a responsible standalone document.**

No distinct caching, queueing, horizontal-scaling, CDN, load-distribution, or other scalability architecture has been established from the current repository evidence.

### Architecture completion rule

The architecture domain is considered repaired to the level supported by current verified evidence.

Empty topic files are not treated as defects merely because they are empty. They remain non-authoritative placeholders until a distinct verified architecture boundary exists and the workflow authorizes documentation of it.

---

## Documentation Audit Findings

The repository still contains significant non-architecture documentation drift.

### Important empty domain files identified

- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/meetings/decisions-log.md`;
- `docs/development/project-structure.md`;
- `docs/development/git-workflow.md`.

### Damaged or stale documentation identified

- Root `README.md` remains the default Create Next App README and does not describe TheraLearn.
- `docs/development/IMPROVEMENT_BACKLOG.md` contains items marked Planned that have already been implemented.
- `docs/development/DOCUMENTATION_TOOL_ROADMAP.md` understates the current Developer Toolkit implementation state.

### Repository anomalies/placeholders identified

- A root-level file named `-name package-lock.json` exists alongside the normal `package-lock.json`; its origin and relevance remain unverified.
- `lib/repositories/quizQuestions.ts` is an empty placeholder.
- `components/PensumCard.tsx` is an empty placeholder while its CSS Module exists.

No such artifact should be deleted or implemented merely because it has been identified during documentation repair.

---

## Documentation Repair Progress

### Completed

- Historical project context reconstructed to the level required for continuation.
- Current local codebase identified.
- Previously uncommitted Developer Toolkit work reviewed and committed.
- Repository-layer foundation reviewed and committed.
- Git author identity corrected across the unpublished development history.
- Current development branch pushed to GitHub.
- GitHub repository access verified.
- Documentation structure audited at the control level.
- `PROJECT_OVERVIEW.md` established.
- `PROJECT_CONTROL.md` established.
- `PROJECT_HANDBOOK.md` established.
- Authority model, information-placement rule, working-session lifecycle, workflow gate, and new-chat context recovery permanently documented.
- `docs/README.md` repaired and verified.
- Core architecture documentation repaired and verified.
- Remaining architecture topics classified against current evidence without inventing missing architecture.

### Not yet completed

- Establish authoritative Foundation/method documentation placement below the control layer.
- Populate or validate product documentation.
- Update stale Developer Toolkit roadmap/backlog documentation.
- Audit development-domain entry/structure documentation.
- Verify the root README role and replace the default template when appropriate.
- Verify the anomalous `-name package-lock.json` file.
- Determine the correct long-term branch integration strategy for `main`.

---

## Current Risks

### R1 – Domain documentation drift

Implementation and historical decisions are ahead of several non-architecture domain documentation files.

**Mitigation:** continue documentation repair before resuming ordinary feature development.

### R2 – Duplicate authority during reconstruction

Repair work can accidentally duplicate the same rule across Overview, Handbook, Control, Foundation/method documentation, and domain documents.

**Mitigation:** establish the permanent Foundation/method documentation home before transferring detailed certified methodology below the root control layer.

### R3 – Stale roadmap/backlog state

Tooling documentation no longer fully reflects implemented capabilities.

**Mitigation:** synchronize roadmap/backlog against verified implementation after authority placement is stable.

### R4 – Unverified repository artifact

`-name package-lock.json` may be an accidental historical artifact.

**Mitigation:** inspect before deletion or retention decision.

### R5 – Branch divergence

The authoritative repaired project state currently lives on `migration-next16-to-root`, while `main` remains behind.

**Mitigation:** do not merge or rewrite `main` until documentation consolidation reaches a verified checkpoint and integration strategy is reviewed.

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes are currently allowed only when necessary to repair documentation/control infrastructure, verify repository state, correct a demonstrated workflow/system defect, or keep documentation tooling aligned with the established workflow.

New product features should not be started until documentation authority and domain synchronization reach a stable checkpoint.

---

## Current Task

Determine the permanent authoritative placement for detailed certified Foundation/method documentation below the root control kernel.

The root control documents intentionally contain only governance, stable high-level project principles, and current state. The historical reconstruction contains more detailed certified methodology that should not be copied indiscriminately into architecture, development, or product documentation.

Before creating or populating any Foundation/method document, the existing `docs/` structure must be inspected for an appropriate current home and for any existing files that already claim this authority.

---

## Next Allowed Action

Inspect the current documentation tree for Foundation/methodology-related files, including relevant files under `docs/decisions/`, `docs/references/`, `docs/development/`, and any other existing location whose name/content suggests methodological authority.

Then determine whether:

1. an existing document/location already owns the detailed certified Foundation/method material and should be repaired;
2. an existing domain should own it but lacks the necessary entry/document;
3. a new authoritative location is genuinely required.

Do not create a new document before this placement inspection is complete.

Do not reload historical chats unless the placement decision or a later specific Foundation claim cannot be resolved from current authoritative files and repository evidence.

After placement is determined, update `PROJECT_CONTROL.md` before transferring detailed Foundation/method content.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, next allowed action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless it is required to understand the current state.
