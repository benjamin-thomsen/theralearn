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

The architecture-domain repair/audit has reached a verified checkpoint. Foundation/method documentation placement has now also been determined.

The current task is to establish the Foundation documentation entry point before transferring any detailed certified methodology.

This is not a new methodology-design phase. Existing certified material is being given an authoritative permanent home without redefining it.

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

The repaired core architecture/control documents have been re-read from the target GitHub branch after commit.

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

These gaps are currently archival/revision gaps rather than blockers. Historical material should only be reloaded again if a specific unresolved Foundation claim requires it.

---

## Authoritative Control Kernel

**Status: Established**

The project has three explicit root control documents:

- `PROJECT_HANDBOOK.md` — governance, authority map, workflow entry point, information lifecycle, and context-recovery procedure;
- `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
- `PROJECT_CONTROL.md` — current verified state, workflow gate, risks, and next allowed action.

The control kernel remains above domain documentation and does not become the detailed methodology archive.

---

## Foundation Documentation Placement

**Status: Placement determined; content transfer not yet started**

The documentation tree was inspected for an existing permanent home for detailed certified Foundation/method material.

### `docs/decisions/`

Not selected as the Foundation home.

The directory currently contains an empty README and empty ADR template. Its intended role is durable decision records and traceability for discrete decisions, not ownership of the complete certified methodological foundation.

### `docs/references/`

Not selected as the Foundation home.

Its existing structure is for supporting reference material such as dependencies, external resources, glossary, and terminology. Reference material may support the methodology but must not become the normative authority for it.

### `docs/development/`

Not selected as the Foundation home.

This domain owns engineering workflow, Developer Toolkit architecture, implementation conventions, roadmaps, and related development documentation. Development and Tooling implement/support the established methodology; they must not become the authority that defines it.

### Existing other domains

Architecture, product, design, guides, meetings, company, changelog, and templates each have narrower domain purposes and would create either duplication or an incorrect authority direction if they owned the complete Foundation/method model.

### Placement decision

A new dedicated domain is required:

```text
docs/foundation/
```

This domain will own detailed permanent certified methodology below the root control kernel and above implementation-specific domain interpretation.

The intended authority relationship is:

```text
PROJECT_HANDBOOK.md
PROJECT_OVERVIEW.md
PROJECT_CONTROL.md
        ↓
docs/foundation/
        ↓
docs/architecture/
docs/product/
docs/development/
other domain documentation
        ↓
implementation
```

This is an information-placement decision, not a new methodological principle.

---

## Foundation Domain Boundary

The future `docs/foundation/` domain may own detailed certified material such as:

- Foundation definitions and invariants;
- certified methodological dependency chain;
- derived responsibility model;
- certification status and scope where permanent;
- detailed methodological boundaries required to interpret downstream architecture correctly.

It must not own:

- current project state — `PROJECT_CONTROL.md`;
- project governance/workflow — `PROJECT_HANDBOOK.md`;
- stable high-level project identity — `PROJECT_OVERVIEW.md`;
- detailed implementation architecture — `docs/architecture/`;
- product/learning-domain definitions — `docs/product/`;
- Developer Toolkit implementation — `docs/development/`;
- historical chat transcripts or raw reconstruction evidence.

Historical evidence may support Foundation repair when needed, but evidence and permanent authority remain distinct.

---

## Architecture Documentation Status

**Status: Core architecture repaired; remaining topics classified**

Repaired and verified:

- `docs/architecture/README.md`;
- `docs/architecture/system-overview.md`;
- `docs/architecture/database.md`;
- `docs/architecture/authentication.md`;
- `docs/architecture/backend-architecture.md`;
- `docs/architecture/frontend-architecture.md`.

Remaining empty architecture topics have been classified against current evidence. They are not to be populated merely to eliminate empty files.

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
- Root control kernel established.
- `docs/README.md` repaired and verified.
- Core architecture documentation repaired and verified.
- Remaining architecture topics classified against current evidence.
- Existing documentation domains inspected for Foundation/method authority.
- `docs/foundation/` selected as the required permanent home for detailed certified methodology.

### Not yet completed

- Establish the `docs/foundation/` entry point and minimal document structure.
- Transfer and verify detailed certified Foundation/method content into its authoritative home.
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

### R2 – Foundation duplication during transfer

Detailed certified methodology could be copied into multiple documents or reinterpreted during transfer.

**Mitigation:** establish the Foundation entry point and document ownership map before transferring detailed content; move permanent information to one home and reference it elsewhere.

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

Establish the `docs/foundation/` domain entry point and define a minimal ownership structure before transferring detailed certified methodology.

The structure must be derived from the already reconstructed methodological chain and authority boundaries, but must not duplicate detailed content yet.

---

## Next Allowed Action

Create and verify only:

```text
docs/foundation/README.md
```

Creating this file will establish the `docs/foundation/` directory in Git.

The Foundation README must:

- define the purpose and authority boundary of the domain;
- place the domain below the root control kernel and above downstream domain interpretation;
- define how Foundation differs from decisions, references, architecture, product, and development documentation;
- establish the rule that certified methodology is transferred, not re-derived;
- define a minimal future ownership map based on the verified methodological chain without yet creating all child documents;
- state that historical chats/reconstruction material are evidence sources only when a specific unresolved claim requires them;
- avoid copying detailed Foundation content before its exact source and destination are verified.

Do not create additional Foundation files in the same step.

After `docs/foundation/README.md` is created and verified, update `PROJECT_CONTROL.md` before transferring any detailed methodological content.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, next allowed action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless it is required to understand the current state.
