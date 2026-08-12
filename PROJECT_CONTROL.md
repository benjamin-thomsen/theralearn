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

The historical reconstruction and authoritative project-control kernel are established.

The architecture domain has reached a verified repair checkpoint. The Foundation domain, its entry point, and the upstream `FOUNDATION_MODEL.md` are now established.

The current task is to determine whether the detailed Implementation Responsibility Model can be transferred next from current authority or whether targeted historical evidence is required.

---

## Current Branch

```text
migration-next16-to-root
```

This branch contains the current reconstructed and verified development state plus the authoritative control, Foundation documentation, and repaired architecture documents.

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

The repaired core architecture/control documents, `docs/foundation/README.md`, and `docs/foundation/FOUNDATION_MODEL.md` have been re-read from the target GitHub branch after their commits.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; detailed evidence selectively incomplete**

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

These gaps remain archival/revision gaps unless a specific detailed Foundation transfer requires evidence not preserved in current authority.

---

## Authoritative Control Kernel

**Status: Established**

The project has three explicit root control documents:

- `PROJECT_HANDBOOK.md` — governance, authority map, workflow entry point, information lifecycle, and context-recovery procedure;
- `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
- `PROJECT_CONTROL.md` — current verified state, workflow gate, risks, and next allowed action.

The control kernel remains above domain documentation and does not become the detailed methodology archive.

---

## Foundation Documentation Status

**Status: Upstream model established; next ownership unit under evidence review**

### Established

- `docs/foundation/README.md` — Foundation authority boundary, placement, transfer rule, and ownership routing;
- `docs/foundation/FOUNDATION_MODEL.md` — upstream methodological core governing derivation, authority/placement, information lifecycle/state transition, phase separation, implementation dependency, and refutation posture.

`FOUNDATION_MODEL.md` was transferred from current authoritative project evidence without historical chat reload and explicitly excludes the detailed six-responsibility model and certification chronology.

### Candidate next ownership unit

The next logical Foundation unit is the detailed methodological responsibility model because:

- the Foundation Model already establishes Responsibility before Components and conceptual separation of authority/execution;
- `PROJECT_OVERVIEW.md` and `PROJECT_HANDBOOK.md` both preserve the six responsibility names;
- the historical reconstruction confirms that Implementation Responsibility Model followed Implementation Architecture Derivation and preceded Completeness Analysis.

However, the current root documents preserve only the names and high-level role of the six responsibilities. They do not currently preserve the full historical contract for each responsibility, such as purpose, authority, inputs, outputs, allowed/forbidden dependencies, preserved properties, verifiable boundaries, and certification criteria.

Therefore a full detailed responsibility-model transfer must not be written from names alone.

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

Remaining empty architecture topics have been classified against current evidence and are not to be populated merely to eliminate empty files.

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
- `docs/foundation/` selected as the permanent home for detailed certified methodology.
- `docs/foundation/README.md` created and verified.
- `docs/foundation/FOUNDATION_MODEL.md` created and verified from current authority.

### Not yet completed

- Recover sufficient evidence for the detailed responsibility-model ownership unit.
- Determine and transfer later Foundation ownership units, including responsibility and certification material where supported.
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

### R2 – Responsibility-model reconstruction from insufficient evidence

The six responsibility names are preserved, but their detailed contracts are not currently present in the authoritative root files.

**Mitigation:** do not reconstruct detailed responsibility definitions from names or implementation structure. Search current repository documentation first; if insufficient, recover only the targeted historical responsibility evidence required for authoritative transfer.

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

Determine whether sufficient detailed responsibility-model evidence already exists anywhere in the current repository documentation before requesting historical evidence.

The target is not to write the responsibility model yet. The target is to identify the authoritative evidence needed to transfer it without guessing.

---

## Next Allowed Action

Search the current repository documentation for detailed responsibility-model material using the preserved responsibility names and known contract fields.

Search for evidence covering:

- interpretation responsibility;
- authority responsibility;
- state responsibility;
- placement responsibility;
- execution responsibility;
- verification responsibility;
- responsibility contract;
- purpose;
- authority;
- input/output;
- allowed/forbidden dependencies;
- preserved architectural properties;
- verifiable boundaries;
- certification criteria.

Do not create a responsibility-model document during this search.

If current repository documentation contains sufficient detailed evidence, classify its authority and update `PROJECT_CONTROL.md` with a bounded transfer scope.

If repository documentation is insufficient, identify the exact missing responsibility evidence and then use targeted historical review material only for those missing definitions/contracts. Do not restart broad historical chat reconstruction.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, next allowed action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless it is required to understand the current state.
