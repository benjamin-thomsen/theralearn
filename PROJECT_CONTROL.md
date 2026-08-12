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

The architecture domain has reached a verified repair checkpoint. The Foundation domain, its entry point, the upstream `FOUNDATION_MODEL.md`, and the authoritative `RESPONSIBILITY_MODEL.md` are established.

The bounded Responsibility Model transfer is complete and verified. The subsequent bounded ownership assessment has now identified one concrete remaining Foundation evidence gap: the permanent Foundation certification conclusion and certification scope. Derivation rules and the certification method are already owned by `docs/foundation/FOUNDATION_MODEL.md` and must not be re-derived or duplicated.

Targeted historical recovery is authorized only for the missing Foundation certification conclusion and certification scope evidence defined below.

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

The repaired core architecture/control documents, `docs/foundation/README.md`, `docs/foundation/FOUNDATION_MODEL.md`, and `docs/foundation/RESPONSIBILITY_MODEL.md` have been re-read from the target GitHub branch after their commits.

The Responsibility Model transfer checkpoint was verified on branch `migration-next16-to-root` at commit `4e2d7ebcfca75166e583a379a1153bbd701b59c8`, parent `00aa95a90b801379b243196a60f91c2714c97960`. The transfer commit adds only `docs/foundation/RESPONSIBILITY_MODEL.md`.

The project-control synchronization checkpoint was verified at commit `7010f9c3d56d57b0be01cc8e210d038ef2b0607f`, parent `4e2d7ebcfca75166e583a379a1153bbd701b59c8`.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; targeted Foundation certification conclusion/scope recovery authorized**

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

Targeted Historical Recovery recovered the original full contracts for all six responsibilities in Implementation Responsibility Model v1.0, and that bounded evidence has been transferred into `docs/foundation/RESPONSIBILITY_MODEL.md` and verified from the authoritative branch.

Known gaps in the wider reloaded historical evidence include parts of the detailed falsification sequence, including falsification attempt 12 and the full individual history between attempts 20 and 119. Current evidence reports a historical certification conclusion of 120 passed falsification attempts and methodological saturation.

Those detailed sequence gaps remain archival/revision gaps. They are not authorization to recover all individual falsification attempts.

The only newly authorized historical retrieval scope is evidence required to establish the permanent Foundation certification conclusion and certification scope: what was certified, the scope of that certification, the permanent conclusion, the methodological basis necessary to understand that conclusion, and its consequence for downstream authority.

Historical material remains evidence rather than automatic authority.

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

**Status: Core Foundation ownership established; certification conclusion/scope evidence gap explicitly bounded**

### Established

- `docs/foundation/README.md` — Foundation authority boundary, placement, transfer rule, and ownership routing;
- `docs/foundation/FOUNDATION_MODEL.md` — upstream methodological core governing derivation, authority/placement, information lifecycle/state transition, phase separation, implementation dependency, certification through refutation, semantic preservation, and refutation posture;
- `docs/foundation/RESPONSIBILITY_MODEL.md` — authoritative Implementation Responsibility Model v1.0 containing all six locked responsibility contracts plus the bounded horizontal and minimality analyses.

`RESPONSIBILITY_MODEL.md` was transferred without reconstruction or re-derivation and verified from the authoritative branch after commit.

### Bounded ownership result

The existing Foundation authority establishes that historical phase names do not automatically become permanent ownership units.

The bounded ownership assessment therefore concludes:

- derivation rules already have permanent authority in `docs/foundation/FOUNDATION_MODEL.md`;
- the certification method already has permanent authority in `docs/foundation/FOUNDATION_MODEL.md`, including Certification Through Refutation and the Open for Refutation posture;
- no separate derivation document is justified merely by the historical Architecture Derivation or Implementation Architecture Derivation phase names;
- the concrete remaining Foundation evidence gap is the permanent certification conclusion and certification scope.

The missing bounded evidence concerns:

- what Foundation material was actually certified;
- the scope and boundary of the certification;
- the permanent certification conclusion;
- the methodological basis necessary to interpret that conclusion without reproducing historical chronology;
- what the certification means for downstream derivation and authority.

This gap does not itself establish a new child-document name or permanent ownership unit. Permanent ownership must be verified after sufficient evidence is recovered and before any new Foundation document is created.

Transfer rule:

**Transfer – do not re-derive.**

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
- Targeted Historical Recovery completed for all six detailed Implementation Responsibility Model contracts.
- Historical evidence for the Responsibility Model horizontal analysis and minimality analysis recovered.
- The concrete Responsibility Model evidence gap closed.
- `docs/foundation/RESPONSIBILITY_MODEL.md` transferred through the verified Git-object procedure and re-read from the authoritative branch.
- Responsibility Model horizontal analysis and minimality analysis transferred within the bounded ownership scope.
- Responsibility Model transfer fidelity verified; R2 closed.
- The next bounded Foundation ownership assessment completed against current repository authority.
- Derivation rules verified as already owned by `FOUNDATION_MODEL.md`.
- Certification method verified as already owned by `FOUNDATION_MODEL.md`.
- Foundation certification conclusion/scope identified as the concrete remaining bounded Foundation evidence gap.

### Not yet completed

- Perform targeted historical recovery only for Foundation certification conclusion and certification scope.
- Determine permanent ownership for recovered certification conclusion/scope only after sufficient evidence is verified.
- Transfer certification conclusion/scope only if one authoritative home is established and the evidence supports transfer.
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

### R2 – Responsibility-model transfer fidelity

**Status: CLOSED**

The six responsibility contracts, horizontal analysis, and minimality analysis have been transferred to `docs/foundation/RESPONSIBILITY_MODEL.md` and re-read from the authoritative branch. The transfer commit changes only that ownership unit relative to its clean parent checkpoint.

No further mitigation is required unless later verification produces contradictory evidence.

### R3 – Stale roadmap/backlog state

Tooling documentation no longer fully reflects implemented capabilities.

**Mitigation:** synchronize roadmap/backlog against verified implementation after authority placement is stable.

### R4 – Unverified repository artifact

`-name package-lock.json` may be an accidental historical artifact.

**Mitigation:** inspect before deletion or retention decision.

### R5 – Branch divergence

The authoritative repaired project state currently lives on `migration-next16-to-root`, while `main` remains behind.

**Mitigation:** do not merge or rewrite `main` until documentation consolidation reaches a verified checkpoint and integration strategy is reviewed.

### R6 – Foundation certification evidence incompleteness

Current authority preserves the certification method and reports the historical conclusion, but the permanent certification conclusion and certification scope are not yet sufficiently evidenced for authoritative transfer.

**Mitigation:** perform only the explicitly bounded targeted historical recovery authorized by this control state. Do not expand retrieval to the complete falsification chronology unless a specific required certification claim cannot otherwise be established and `PROJECT_CONTROL.md` is updated again to authorize that narrower need.

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes are currently allowed only when necessary to repair documentation/control infrastructure, verify repository state, correct a demonstrated workflow/system defect, or keep documentation tooling aligned with the established workflow.

The currently authorized next action is historical evidence retrieval and analysis only. It does not authorize product code changes or creation of a new Foundation document.

New product features should not be started until documentation authority and domain synchronization reach a stable checkpoint.

---

## Current Task

Perform targeted historical recovery exclusively for the bounded Foundation certification conclusion and certification scope evidence gap.

Recover only evidence necessary to determine:

- what was actually certified as Foundation v1.0;
- the certification scope and its explicit boundaries;
- the permanent certification conclusion;
- the methodological basis necessary to interpret the conclusion, without re-deriving the already-owned certification method;
- the downstream authority consequence of the certification.

The task must not become a reconstruction of the complete Foundation Certification phase or the full falsification chronology.

Historical evidence is evidence, not automatic authority.

---

## Next Allowed Action

Begin targeted historical recovery only for **Foundation certification conclusion + certification scope**.

The retrieval boundary is strict:

1. seek primary historical evidence that states or directly supports the certification conclusion and scope;
2. recover only enough surrounding context to preserve the meaning of those claims;
3. compare recovered claims against current `FOUNDATION_MODEL.md` authority and do not re-derive rules already owned there;
4. stop when the certification conclusion, scope, methodological basis required for interpretation, and downstream authority consequence are sufficiently evidenced;
5. after recovery, determine the single permanent ownership location before any Foundation document is created or changed.

Explicitly forbidden under this authorization:

- broad historical recovery;
- automatic recovery of all 120 falsification attempts;
- recovery of missing individual attempts merely to complete chronology;
- re-derivation of Foundation, derivation rules, or certification method;
- creation of a new Foundation document before permanent ownership and sufficient evidence are verified;
- MVP feature development.

If the bounded recovery reveals that a specific missing individual falsification attempt is necessary to establish one of the required permanent certification claims,