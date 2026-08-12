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

The product ownership model, product-domain authority map, and Product Vision are established. The bounded Learning Model pre-write evidence analysis is now complete.

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
- Product Vision transfer authorization: `663853df330eedc64df7b5454671f39214a30950`;
- Product Vision transfer: `f1d7c814da26aeec1ac5cbc19bc4ae13011122af`;
- Learning Model analysis target selection: `7eebad3d2258b1f032c647d50f96c6994cf386eb`.

`docs/product/PRODUCT_VISION.md` was re-read and verified after transfer.

The Learning Model pre-write analysis inspected current product authority and generated database types. Current implementation verifies a Course → Chapter → Lesson content hierarchy; lessons contain learning objectives; flashcards and quiz questions are attached to lessons; and lesson progress is tracked per user and lesson. These facts establish structural learning context but do not by themselves prove a broader pedagogical theory.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

No historical recovery is required for the bounded minimal Learning Model transfer. Current authority and implementation evidence are sufficient to establish the structural learning model while leaving unsupported pedagogical mechanisms explicitly open.

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
- `docs/product/LEARNING_MODEL.md` — permanent learning model and verified learning mechanisms;
- `docs/product/mvp.md` — durable MVP scope and product acceptance boundary.

Deferred/overlap placeholders remain non-authoritative and are not authorized for population or deletion.

---

## Learning Model Pre-Write Result

**Status: COMPLETE — bounded minimal write can proceed without historical recovery**

The verified minimal learning model is:

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

The evidence supports these permanent conclusions:

- learning is organized in a structured curriculum hierarchy of courses, chapters, and lessons;
- the lesson is the central learning-context unit currently evidenced by the implementation;
- lessons can define learning objectives;
- flashcards are attached to lessons and therefore operate within lesson context;
- quiz questions are attached to lessons and therefore operate within lesson context;
- learner progress is tracked in relation to lessons;
- these mechanisms support the Product Vision principle of an integrated learning environment around shared curriculum context rather than unrelated standalone tools.

The current evidence does **not** authorize claims that TheraLearn uses or requires:

- spaced repetition;
- a specific retrieval-practice methodology;
- mastery learning;
- adaptive learning;
- prescribed repetition intervals;
- a fixed pedagogical progression algorithm;
- a specific pedagogical role for reading support or multilingual support beyond their established product capability status.

Implementation demonstrates available structures and relationships; it does not independently create pedagogical intent.

---

## Documentation Audit Findings

Current unresolved findings include:

- `LEARNING_MODEL.md` and `mvp.md` remain empty pending bounded transfer;
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
- Learning Model pre-write evidence analysis completed.

### Not yet completed

- Transfer the bounded minimal Learning Model into `docs/product/LEARNING_MODEL.md`.
- Establish verified MVP scope authority in `docs/product/mvp.md`.
- Decide later whether deferred product placeholders should be retained or removed.
- Development-domain documentation audit beyond roadmap/backlog.
- Retention/deletion decision for `-name package-lock.json`.
- Decisions-log placement/need assessment.
- Long-term integration decision for `main`.
- New complete local verification after documentation-only repair commits.

---

## Current Risks

### R1 – Product domain authority gap

**Status: ACTIVE, materially reduced.**

Product placement authority and Product Vision are established. The Learning Model transfer scope is verified, and durable MVP scope remains unresolved.

**Mitigation:** transfer the bounded Learning Model, then establish MVP scope.

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

Transfer the bounded minimal Learning Model into `docs/product/LEARNING_MODEL.md`.

The document must establish only the verified structural learning context and evidence-backed relationships. It must not invent unsupported pedagogical mechanisms or turn current implementation details into universal learning principles.

---

## Next Allowed Action

Perform a bounded write of only `docs/product/LEARNING_MODEL.md` using the verified Learning Model scope recorded above.

After the write:

1. re-read `LEARNING_MODEL.md` from the authoritative branch;
2. verify its boundary against Product Vision, MVP scope, architecture, and Project Control;
3. synchronize `PROJECT_CONTROL.md`;
4. stop before modifying `mvp.md` or another target.

No historical retrieval is authorized for this transfer.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
