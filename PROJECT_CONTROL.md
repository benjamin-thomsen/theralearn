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

This document owns the current verified state of the TheraLearn project: current phase, verified facts, current task, unresolved risks, code-change permission, and Next Allowed Action.

Stable project identity and permanent principles belong in `PROJECT_OVERVIEW.md`. Governance and workflow rules belong in `PROJECT_HANDBOOK.md`. Domain-specific permanent knowledge belongs under `docs/`.

---

## Current Phase

**Domain Documentation Repair and Synchronization**

The architecture repair checkpoint and root control kernel are established. The Foundation entry point, `FOUNDATION_MODEL.md`, and `RESPONSIBILITY_MODEL.md` are established.

The Responsibility Model transfer is complete and verified. The next bounded ownership assessment has identified one concrete remaining Foundation evidence gap: **Foundation certification conclusion + certification scope**.

Derivation rules and the certification method are already owned by `docs/foundation/FOUNDATION_MODEL.md`; they must not be re-derived or duplicated.

Targeted historical recovery is now authorized only for the bounded certification conclusion/scope gap defined below.

---

## Current Branch

```text
migration-next16-to-root
```

The authoritative repaired project state currently lives on this branch. `main` remains behind and must not be merged or rewritten until a later verified integration decision.

---

## Verified Technical Baseline

### Application

- Next.js 16.2.12 is in use.
- TypeScript compilation passes.
- Production build passes.
- 21 application routes/pages were generated or server-rendered by the most recent complete verification.
- A non-blocking `metadataBase` warning remains registered for later resolution.

### Supabase and repository layer

- Supabase CLI workflow and remote MVP migration were established.
- Generated database types exist in `types/database.ts`.
- Typed Supabase client/server/proxy integration exists.
- Repository-layer foundations exist for courses, chapters, lessons, flashcards, shared types, and shared error handling.
- `lib/repositories/quizQuestions.ts` remains an empty placeholder.

### Frontend transitional state

- Next.js App Router structure, global CSS, and colocated CSS Modules are in use.
- `components/PensumCard.tsx` remains an empty placeholder.
- Browser-local quiz progress persists through `lib/progress.ts` and `lib/storage.ts`.
- Broad frontend repository adoption is not yet verified.

### CI and Developer Toolkit

- `.github/workflows/verify.yml` runs on push and pull request using `.nvmrc`, `npm ci`, and `./scripts/dev verify`.
- The Developer Toolkit supports the established documentation/project verification and inspection workflows.
- The Toolkit implements the workflow; it does not define project methodology.

---

## Verification State

The most recent complete local verification before documentation repair reported:

```text
Build: PASS
TypeScript: PASS
Documentation structure: PASS
Overall verification: PASS
```

The documentation structure check proves directory existence, not documentation completeness or authority.

The repaired core architecture/control documents and all three current Foundation files have been re-read from the target branch after their relevant commits.

Verified checkpoints:

- Responsibility Model transfer: `4e2d7ebcfca75166e583a379a1153bbd701b59c8`, parent `00aa95a90b801379b243196a60f91c2714c97960`;
- prior project-control synchronization: `7010f9c3d56d57b0be01cc8e210d038ef2b0607f`, parent `4e2d7ebcfca75166e583a379a1153bbd701b59c8`.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for continuation; targeted Foundation certification conclusion/scope recovery authorized**

The recovered methodological chain is:

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

Targeted Responsibility Model recovery is complete and its bounded evidence has been transferred into `docs/foundation/RESPONSIBILITY_MODEL.md`.

Known wider historical gaps include falsification attempt 12 and the complete individual sequence between attempts 20 and 119. Current evidence reports a historical certification conclusion of 120 passed falsification attempts and methodological saturation.

Those detailed gaps remain archival/revision gaps. They do **not** authorize recovery of the complete falsification chronology.

The only newly authorized retrieval scope is evidence necessary to establish the permanent Foundation certification conclusion and certification scope.

Historical material is evidence, not automatic authority.

---

## Authoritative Control Kernel

**Status: Established**

- `PROJECT_HANDBOOK.md` — governance, authority map, workflow entry point, information lifecycle, and context recovery;
- `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
- `PROJECT_CONTROL.md` — current verified state, workflow gate, risks, and Next Allowed Action.

The control kernel does not become the detailed methodology archive.

---

## Foundation Documentation Status

**Status: Core Foundation ownership established; certification conclusion/scope gap explicitly bounded**

### Established

- `docs/foundation/README.md` — Foundation authority boundary, placement, transfer rule, and ownership routing;
- `docs/foundation/FOUNDATION_MODEL.md` — upstream methodological core, including derivation rules, Certification Through Refutation, semantic preservation, phase separation, and Open for Refutation posture;
- `docs/foundation/RESPONSIBILITY_MODEL.md` — authoritative Implementation Responsibility Model v1.0 with all six locked responsibility contracts plus bounded horizontal and minimality analyses.

### Bounded ownership result

Repository authority supports the following conclusion:

- derivation rules already have permanent authority in `FOUNDATION_MODEL.md`;
- the certification method already has permanent authority in `FOUNDATION_MODEL.md`;
- historical Architecture Derivation and Implementation Architecture Derivation phase names do not justify a separate derivation document;
- the concrete remaining Foundation evidence gap is the permanent **certification conclusion + certification scope**.

The bounded missing evidence concerns:

- what Foundation material was actually certified;
- the scope and boundaries of that certification;
- the permanent certification conclusion;
- the methodological basis necessary to interpret that conclusion without reproducing the historical process;
- what the certification means for downstream derivation and authority.

This evidence gap does not establish a new child-document name. Permanent ownership must be verified after sufficient evidence is recovered and before any new Foundation document is created.

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

Remaining empty architecture topics must not be populated merely to eliminate empty files.

---

## Documentation Audit Findings

Important unresolved documentation drift includes empty product/development/meeting files, the default root Create Next App README, stale Developer Toolkit roadmap/backlog state, the unverified root artifact `-name package-lock.json`, and the two empty implementation placeholders `lib/repositories/quizQuestions.ts` and `components/PensumCard.tsx`.

No such artifact is authorized for deletion or implementation merely because it has been identified.

---

## Documentation Repair Progress

### Completed

- Historical context reconstructed to the level required for continuation.
- Root control kernel established.
- `docs/README.md` repaired and verified.
- Core architecture documentation repaired and verified.
- Foundation domain placement and entry point established.
- `FOUNDATION_MODEL.md` established and verified from current authority.
- Targeted Responsibility Model recovery completed.
- `RESPONSIBILITY_MODEL.md` transferred and verified through the safe Git-object procedure.
- Responsibility Model transfer fidelity closed as R2.
- Next bounded Foundation ownership assessment completed.
- Derivation rules verified as already owned by `FOUNDATION_MODEL.md`.
- Certification method verified as already owned by `FOUNDATION_MODEL.md`.
- Foundation certification conclusion/scope identified as the concrete remaining bounded Foundation evidence gap.

### Not yet completed

- Targeted historical recovery for Foundation certification conclusion/scope.
- Verification of permanent ownership for that recovered certification information.
- Any later transfer of certification conclusion/scope.
- Product documentation repair.
- Developer Toolkit roadmap/backlog synchronization.
- Development-domain documentation audit.
- Root README repair.
- Investigation of `-name package-lock.json`.
- Long-term integration decision for `main`.

---

## Current Risks

### R1 – Domain documentation drift

Implementation and historical decisions remain ahead of several non-architecture documentation files.

**Mitigation:** continue documentation repair before ordinary feature development.

### R2 – Responsibility-model transfer fidelity

**Status: CLOSED**

The six responsibility contracts plus horizontal and minimality analyses are transferred and verified in `docs/foundation/RESPONSIBILITY_MODEL.md`.

### R3 – Stale roadmap/backlog state

Tooling documentation does not fully reflect implemented capabilities.

**Mitigation:** synchronize it after Foundation authority placement is stable.

### R4 – Unverified repository artifact

`-name package-lock.json` may be accidental.

**Mitigation:** inspect before any deletion/retention decision.

### R5 – Branch divergence

The authoritative repaired state is on `migration-next16-to-root`; `main` is behind.

**Mitigation:** no integration until documentation consolidation reaches a verified checkpoint.

### R6 – Foundation certification evidence incompleteness

Current authority owns the certification method and reports a historical conclusion, but certification conclusion/scope is not yet sufficiently evidenced for authoritative transfer.

**Mitigation:** perform only the bounded targeted recovery authorized below. Do not expand to the complete falsification chronology without a new explicit control authorization.

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes are allowed only when necessary for documentation/control repair, repository verification, demonstrated workflow/system repair, or alignment of documentation tooling with the established workflow.

The current Next Allowed Action is historical evidence retrieval and analysis only. It does not authorize product code changes or creation of a new Foundation document.

---

## Current Task

Perform targeted historical recovery exclusively for the bounded **Foundation certification conclusion + certification scope** evidence gap.

Recover only evidence necessary to determine:

- what was actually certified as Foundation v1.0;
- the certification scope and explicit boundaries;
- the permanent certification conclusion;
- the methodological basis necessary to interpret the conclusion, without re-deriving the already-owned certification method;
- the downstream authority consequence of certification.

Do not reconstruct the complete Foundation Certification phase or full falsification chronology.

---

## Next Allowed Action

Begin targeted historical recovery only for **Foundation certification conclusion + certification scope**.

The retrieval boundary is strict:

1. seek primary historical evidence that states or directly supports the certification conclusion and scope;
2. recover only enough surrounding context to preserve those claims' meaning;
3. compare recovered claims against current `FOUNDATION_MODEL.md` authority and do not re-derive rules already owned there;
4. stop when conclusion, scope, required interpretive basis, and downstream authority consequence are sufficiently evidenced;
5. then determine the single permanent ownership location before any Foundation document is created or changed.

Explicitly forbidden:

- broad historical recovery;
- automatic recovery of all 120 falsification attempts;
- recovery of missing individual attempts merely to complete chronology;
- re-derivation of Foundation, derivation rules, or certification method;
- creation of a new Foundation document before permanent ownership and sufficient evidence are verified;
- MVP feature development.

If a specific missing falsification attempt proves necessary to establish a required permanent certification claim, stop and update `PROJECT_CONTROL.md` with that narrower evidence need before retrieving it.

**Transfer – do not re-derive.**

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
