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

Foundation authority is consolidated, core architecture documentation is repaired, Developer Toolkit roadmap/backlog documentation is synchronized, and the root repository `README.md` is repaired.

The product documentation domain remains the highest-priority authority repair area before ordinary MVP development can resume.

The product ownership model, product-domain authority map, Product Vision, and Learning Model are now established and verified. Durable MVP scope is the remaining substantive product authority gap.

---

## Current Branch

```text
migration-next16-to-root
```

The authoritative repaired project state currently lives on this branch. `main` remains behind and must not be merged or rewritten until a later verified integration decision.

---

## Verification State

The most recent complete local verification before documentation repair reported:

```text
Build: PASS
TypeScript: PASS
Documentation structure: PASS
Overall verification: PASS
```

Recent verified documentation/control checkpoints include:

- Documentation Tool roadmap synchronization: `a6568a35012c9704bc63221baeaa46553876fbff`;
- Improvement Backlog synchronization: `7288e5d53019b644f9a7c47f654afd2bdcbb5972`;
- root README repair: `0284b31788a27c71231b14018e2ce5df16f6b46b`;
- product documentation ownership model: `7e1cfe948695fa15244cf4cb0d8ef897503e798f`;
- product documentation authority map: `1763274933383b818de1092897c6dc669a52edaa`;
- Product Vision transfer: `f1d7c814da26aeec1ac5cbc19bc4ae13011122af`;
- Learning Model transfer authorization: `5b0bf61ae7e6ddaa012dc344f52914e924bc2d1c`;
- Learning Model transfer: `38760eb66974217c9d966f6b0617f4049be76d69`.

`docs/product/LEARNING_MODEL.md` was re-read from the authoritative branch after transfer. It establishes the evidence-backed structural learning model while explicitly leaving unsupported pedagogical mechanisms unestablished.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

No MVP historical recovery is authorized by default. The durable MVP boundary must first be derived from current Product Vision, Learning Model, current repository implementation, and existing verified project authority. If a required MVP inclusion or acceptance criterion cannot be established, the exact bounded evidence gap must be recorded before historical recovery is considered.

---

## Foundation Documentation Status

**Status: Consolidated Foundation authority established for current known permanent needs**

Established ownership units:

- `docs/foundation/README.md`;
- `docs/foundation/FOUNDATION_MODEL.md`;
- `docs/foundation/RESPONSIBILITY_MODEL.md`.

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

## Product Documentation Ownership Model

**Status: Established**

- `docs/product/README.md` — **ESTABLISHED AND VERIFIED**;
- `docs/product/PRODUCT_VISION.md` — **ESTABLISHED AND VERIFIED**;
- `docs/product/LEARNING_MODEL.md` — **ESTABLISHED AND VERIFIED**;
- `docs/product/mvp.md` — intended owner of durable MVP scope and product acceptance boundary.

Deferred/overlap placeholders remain non-authoritative and are not authorized for population or deletion.

---

## Learning Model Status

**Status: ESTABLISHED AND VERIFIED**

The authoritative Learning Model establishes:

```text
Structured curriculum context
        ↓
Course
        ↓
Chapter
        ↓
Lesson
        ↓
Learning objectives
        ↓
Supporting learning activities
        ↓
Learner progress in relation to the lesson
```

It establishes lesson as the current central learning-context unit and relates lesson content/objectives to flashcards, quiz questions, and learner progress without inventing unsupported pedagogical mechanisms.

---

## Documentation Audit Findings

Current unresolved findings include:

- `docs/product/mvp.md` remains empty pending bounded evidence-based scope analysis and transfer;
- empty/deferred product placeholders remain classified but unresolved for eventual retention/deletion;
- empty `docs/meetings/decisions-log.md`;
- empty development placeholders including `docs/development/project-structure.md` and `docs/development/git-workflow.md`;
- anomalous root artifact `-name package-lock.json`, verified to contain pager/`less` help text rather than package-lock data;
- empty implementation placeholders `lib/repositories/quizQuestions.ts` and `components/PensumCard.tsx`.

No empty or anomalous artifact is authorized for deletion, population, or implementation merely because it exists.

---

## Documentation Repair Progress

### Completed

- Root control kernel established.
- Core architecture documentation repaired and verified.
- Foundation authority consolidated and verified.
- Developer Toolkit roadmap and Improvement Backlog synchronized.
- Root `README.md` repaired and verified.
- Product authority/placement assessment completed.
- Minimal product-document ownership model derived.
- `docs/product/README.md` established and verified.
- `docs/product/PRODUCT_VISION.md` established and verified.
- `docs/product/LEARNING_MODEL.md` established and verified.

### Not yet completed

- Analyze and establish verified MVP scope authority in `docs/product/mvp.md`.
- Decide later whether deferred product placeholders should be retained or removed.
- Development-domain documentation audit beyond roadmap/backlog.
- Retention/deletion decision for `-name package-lock.json`.
- Decisions-log placement/need assessment.
- Long-term integration decision for `main`.
- New complete local verification after documentation-only repair commits.

---

## Current Risks

### R1 – Product domain authority gap

**Status: ACTIVE, narrowly bounded.**

Product placement authority, Product Vision, and Learning Model are established. Durable MVP scope is now the only remaining substantive product-authority gap identified by the current product ownership model.

**Mitigation:** derive and establish the bounded MVP scope before ordinary product development resumes.

### R2 – Responsibility-model transfer fidelity

**Status: CLOSED**

### R3 – Stale roadmap/backlog state

**Status: CLOSED**

### R4 – Anomalous repository artifact

`-name package-lock.json` contains pager/`less` command help, not package-lock data, while a separate valid `package-lock.json` exists.

**Mitigation:** preserve until a separate bounded retention/deletion decision is authorized.

### R5 – Branch divergence

The authoritative repaired state is on `migration-next16-to-root`; `main` is behind.

**Mitigation:** no integration until documentation consolidation reaches a verified checkpoint and an integration strategy is explicitly reviewed.

### R6 – Foundation certification evidence incompleteness

**Status: CLOSED for current permanent Foundation ownership needs.**

---

## Code Change Gate

**Ordinary product feature development: PAUSED**

Code changes remain allowed only when necessary for documentation/control repair, repository verification, demonstrated workflow/system repair, or alignment of documentation tooling with the established workflow.

No product feature implementation is currently authorized.

---

## Current Task

Perform a bounded pre-write evidence analysis for `docs/product/mvp.md`.

The analysis must determine the durable minimum product scope and acceptance boundary that can be established from current authority and verified implementation evidence.

It must distinguish:

- Product Vision capabilities from actual MVP requirements;
- Learning Model structures from MVP completion criteria;
- already implemented capabilities from required-but-incomplete MVP capabilities;
- durable MVP scope from current implementation progress;
- MVP acceptance boundary from current project workflow state.

---

## Next Allowed Action

Inspect current Product Vision, Learning Model, repository implementation, and existing verified project authority to derive the minimal evidence-backed MVP scope and acceptance boundary.

Do not write `docs/product/mvp.md` during this analysis.

Do not assume every existing feature is required for MVP, and do not assume every Product Vision capability must be complete in the MVP unless evidence supports that inclusion.

Do not use historical chat material by default. If a necessary MVP inclusion or acceptance criterion cannot be established from current authority or implementation evidence, record the exact bounded evidence gap before any historical recovery is authorized.

After the analysis, synchronize `PROJECT_CONTROL.md` with the result before any MVP document write.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
