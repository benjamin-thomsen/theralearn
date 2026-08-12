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

The current task is to repair domain documentation, remove documentation drift, and ensure that permanent knowledge is placed in its intended authoritative home.

This is not a new architecture-design phase. Existing certified principles are being consolidated and checked against the current repository and implementation.

---

## Current Branch

```text
migration-next16-to-root
```

This branch contains the current reconstructed and verified development state plus the new authoritative control documents.

`main` has not yet been updated with this development history.

---

## Verified Technical Baseline

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

Verified implemented areas include courses, chapters, lessons, flashcards, shared repository types, and shared repository error handling.

`lib/repositories/quizQuestions.ts` currently exists as an empty placeholder and must not be treated as a completed repository implementation.

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

`docs/README.md`, `docs/architecture/README.md`, `docs/architecture/system-overview.md`, and `docs/architecture/database.md` have now been repaired and re-read from the target GitHub branch to verify their committed content. A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

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

The project now has three explicit control documents:

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

## Documentation Audit Findings

The repository has an extensive documentation directory structure, but significant documentation drift has been verified.

### Important empty domain files identified

- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/meetings/decisions-log.md`;
- `docs/architecture/backend-architecture.md`;
- `docs/architecture/frontend-architecture.md`;
- `docs/architecture/authentication.md`;
- `docs/development/project-structure.md`;
- `docs/development/git-workflow.md`.

The architecture directory still contains multiple zero-byte placeholder documents. Their existence must not be interpreted as completed architecture documentation.

`PROJECT_HANDBOOK.md`, `docs/architecture/README.md`, `docs/architecture/system-overview.md`, and `docs/architecture/database.md` were empty at audit start but have now been repaired where applicable.

### Damaged or stale documentation identified

- Root `README.md` remains the default Create Next App README and does not describe TheraLearn.
- `docs/development/IMPROVEMENT_BACKLOG.md` contains items marked Planned that have already been implemented.
- `docs/development/DOCUMENTATION_TOOL_ROADMAP.md` understates the current Developer Toolkit implementation state.

`docs/README.md` was previously corrupted and contained repeated text, stale structure claims, and historical shell material. It has now been repaired and verified on the target branch.

### Repository anomaly identified

A root-level file named `-name package-lock.json` exists alongside the normal `package-lock.json`.

Its origin and relevance have not yet been verified. It must not be deleted until verified.

---

## Documentation Repair Progress

### Completed

- Historical project context reconstructed.
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
- Authority model, information-placement rule, working-session lifecycle, workflow gate, and new-chat context recovery are now permanently documented.
- `docs/README.md` repaired as the domain-documentation entry point and verified after commit.
- `docs/architecture/README.md` repaired as the architecture-domain entry point and verified after commit.
- `docs/architecture/system-overview.md` established from inspected repository and implementation evidence and verified after commit.
- `docs/architecture/database.md` established from the complete MVP migration, generated database contract, and persistence boundary evidence and verified after commit.

### Not yet completed

- Establish authoritative Foundation/method documentation placement below the control layer.
- Populate or validate remaining architecture topic documents based on verified architecture and implementation evidence.
- Populate or validate product documentation.
- Update stale Developer Toolkit roadmap/backlog documentation.
- Verify the root README role and replace the default template when appropriate.
- Verify the anomalous `-name package-lock.json` file.
- Determine the correct long-term branch integration strategy for `main`.

---

## Current Risks

### R1 – Domain documentation drift

Implementation and historical decisions are ahead of several domain documentation files.

**Mitigation:** complete domain documentation repair before resuming ordinary feature development.

### R2 – Duplicate authority during reconstruction

Repair work can accidentally duplicate the same rule across Overview, Handbook, Control, and domain documents.

**Mitigation:** enforce one permanent home per piece of information and use references elsewhere.

### R3 – Stale roadmap/backlog state

Tooling documentation no longer fully reflects implemented capabilities.

**Mitigation:** synchronize roadmap/backlog against verified implementation after the highest-authority domain entry points are repaired.

### R4 – Unverified repository artifact

`-name package-lock.json` may be an accidental historical artifact.

**Mitigation:** inspect before deletion or retention decision.

### R5 – Branch divergence

The authoritative repaired project state currently lives on `migration-next16-to-root`, while `main` remains behind.

**Mitigation:** do not merge or rewrite `main` until documentation consolidation reaches a verified checkpoint and integration strategy is reviewed.

### R6 – Incomplete architecture topic documentation

The architecture entry point, system overview, and database architecture are now established, but multiple narrower architecture topic files remain empty placeholders while verified implementation evidence already exists.

**Mitigation:** repair narrower architecture topics one at a time, following direct implementation dependencies and using cross-references instead of duplicating established database or system-level authority.

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes are currently allowed only when necessary to repair documentation/control infrastructure, verify repository state, correct a demonstrated workflow/system defect, or keep documentation tooling aligned with the established workflow.

New product features should not be started until documentation authority and domain synchronization reach a stable checkpoint.

---

## Current Task

Establish the authentication and session architecture now that the database identity/profile boundary has been documented.

The next target is `docs/architecture/authentication.md`, currently a zero-byte placeholder.

This target follows database architecture because authentication identity, application profiles, session propagation, and database RLS are directly connected. The repository already contains concrete login/signup flows, an auth confirmation route, browser/server Supabase clients, session proxy logic, and database policies that provide direct evidence for this boundary.

---

## Next Allowed Action

Inspect the complete authentication/session implementation and relevant database identity/RLS evidence; then repair and verify `docs/architecture/authentication.md`.

The inspection must include, where relevant:

- login actions and login UI behavior;
- signup behavior;
- `/auth/confirm` route handling;
- browser Supabase client construction;
- server Supabase client construction and cookie behavior;
- root proxy and Supabase session-update proxy;
- profile creation linkage to `auth.users`;
- RLS policies that depend on `auth.uid()`.

The authentication architecture document must:

- distinguish authentication identity from application profile data;
- describe only verified login, signup, confirmation, client, server, cookie, and session-refresh behavior;
- distinguish authentication from database authorization/RLS while documenting their verified connection;
- avoid claiming route protection or authorization behavior that is not present in inspected implementation;
- avoid documenting future password-reset, OAuth, role, admin, or other auth capabilities unless verified in the current repository.

After `authentication.md` is repaired and verified, update `PROJECT_CONTROL.md` before selecting the next architecture topic.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, next allowed action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless it is required to understand the current state.
