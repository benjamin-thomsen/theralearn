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

**Documentation Consolidation and Authority Repair**

The historical reconstruction is considered methodically complete enough to proceed without loading additional historical chats by default.

The current task is to transfer reconstructed permanent knowledge into authoritative repository documentation and remove documentation drift.

This phase is not a new architecture-design phase. Existing certified principles are being consolidated and checked against the current repository and implementation.

---

## Current Branch

```text
migration-next16-to-root
```

This branch contains the current reconstructed and verified development state.

`main` has not yet been updated with this development history.

---

## Verified Implementation Baseline

The current branch includes the following development milestones:

```text
Migrate project root to Next.js 16
Complete project foundation and development workflow
Implement MVP database schema
Generate Supabase database types
Add typed Supabase client layer
Complete Developer Toolkit workflow
Add repository layer foundation
Establish authoritative project overview
```

The local development history was published to GitHub after verification and Git author identity correction.

---

## Verified Technical State

### Application

- Next.js 16.2.12 is in use.
- TypeScript compilation passes.
- Production build passes.
- 21 application routes/pages are generated or server-rendered by the verified build.
- A non-blocking `metadataBase` warning remains registered for future resolution.

### Supabase

- Supabase CLI workflow was established.
- MVP database migration exists and was previously pushed to the remote Supabase project.
- Generated database types exist in `types/database.ts`.
- Typed Supabase client/server/proxy integration exists.

### Repository Layer

A repository-layer foundation exists under `lib/repositories/`.

Verified implemented areas include:

- courses;
- chapters;
- lessons;
- flashcards;
- shared repository types;
- shared repository error handling.

`lib/repositories/quizQuestions.ts` currently exists as an empty placeholder and must not be treated as a completed repository implementation.

### Developer Toolkit

The Developer Toolkit includes verified workflows for:

- help;
- documentation check;
- project verification;
- project/Git status;
- file output;
- edit preparation;
- replace preparation;
- clipboard copy;
- project search.

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

These gaps are currently treated as archival/revision gaps rather than blockers for documentation consolidation. Historical material should only be reloaded again if a specific unresolved documentation claim requires it.

---

## Documentation Audit Findings

The repository has an extensive documentation directory structure, but significant documentation drift has been verified.

### Empty authoritative/intended files identified

At the start of the consolidation phase, the following important files were verified as empty:

- `PROJECT_HANDBOOK.md`;
- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/meetings/decisions-log.md`;
- `docs/architecture/system-overview.md`;
- `docs/architecture/backend-architecture.md`;
- `docs/architecture/frontend-architecture.md`;
- `docs/architecture/database.md`;
- `docs/architecture/authentication.md`;
- `docs/development/project-structure.md`;
- `docs/development/git-workflow.md`.

### Damaged or stale documentation identified

- `docs/README.md` contains corrupted/repeated content and historical shell material.
- Root `README.md` remains the default Create Next App README and does not describe TheraLearn.
- `docs/development/IMPROVEMENT_BACKLOG.md` contains items marked Planned that have already been implemented.
- `docs/development/DOCUMENTATION_TOOL_ROADMAP.md` understates the current Developer Toolkit implementation state.

### Repository anomaly identified

A root-level file named:

```text
-name package-lock.json
```

exists alongside the normal `package-lock.json`.

Its origin and relevance have not yet been verified. It must not be deleted until verified.

---

## Documentation Repair Progress

### Completed

- Historical project context reconstructed.
- Current local codebase identified.
- Local development work separated into logical commits.
- Developer Toolkit changes committed.
- Repository-layer foundation committed.
- Git author identity corrected across the unpublished development history.
- Current development branch pushed to GitHub.
- GitHub repository access verified.
- Documentation structure audited at the control level.
- `PROJECT_OVERVIEW.md` established as the authoritative stable project overview.
- `PROJECT_CONTROL.md` established as the authoritative current-state document.

### Not yet completed

- Populate `PROJECT_HANDBOOK.md`.
- Repair `docs/README.md`.
- Establish authoritative Foundation/method documentation placement.
- Populate or validate empty architecture documents.
- Populate or validate product documentation.
- Update stale Developer Toolkit roadmap/backlog documentation.
- Verify the root README role and replace the default template when appropriate.
- Verify the anomalous `-name package-lock.json` file.
- Determine the correct long-term branch integration strategy for `main`.

---

## Current Risks

### R1 – Documentation drift

Implementation and historical decisions are ahead of several documentation files.

**Mitigation:** complete the current documentation consolidation before resuming ordinary feature development.

### R2 – Chat-dependent knowledge

Historically, important project knowledge remained in working chats because intended permanent files were empty or incomplete.

**Mitigation:** transfer permanent knowledge to its authoritative repository location and use chats only as working sessions.

### R3 – Duplicate authority

Reconstructing documentation can accidentally duplicate the same rule across Overview, Handbook, Control, and domain documents.

**Mitigation:** enforce the Information Placement rule: one permanent home per piece of information, with references elsewhere.

### R4 – Stale roadmap/backlog state

Tooling documentation no longer fully reflects implemented capabilities.

**Mitigation:** update roadmap/backlog only after authoritative control documents are established.

### R5 – Unverified repository artifact

`-name package-lock.json` may be an accidental historical artifact.

**Mitigation:** inspect before deletion or retention decision.

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes are currently allowed only when they are necessary to:

- repair the documentation/control system;
- verify repository state;
- correct a demonstrated workflow/system defect;
- keep documentation tooling aligned with the established workflow.

New product features should not be started until the authority repair has reached a stable checkpoint.

---

## Current Task

Establish the authoritative project-control layer so future work can recover project context from the repository rather than from historical chats.

The control layer consists of:

```text
PROJECT_OVERVIEW.md
PROJECT_CONTROL.md
PROJECT_HANDBOOK.md
```

`PROJECT_OVERVIEW.md` and `PROJECT_CONTROL.md` are now established.

---

## Next Allowed Action

Populate and verify `PROJECT_HANDBOOK.md` as the project governance and navigation entry point.

The Handbook must:

- define document authority and information ownership;
- define the working-session → documentation lifecycle;
- define the project workflow gate;
- route stable identity to `PROJECT_OVERVIEW.md`;
- route current state to `PROJECT_CONTROL.md`;
- route domain knowledge to `docs/`;
- preserve the rule that information has one permanent home;
- avoid duplicating detailed domain content.

After the Handbook is established, the next phase is domain-document repair and synchronization.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters:

- current phase;
- current task;
- next allowed action;
- implementation baseline;
- verification state;
- known risks;
- documentation-repair progress;
- code-change permission.

Historical detail should not accumulate here unless it is required to understand the current state.
