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

The product documentation domain is the highest-priority remaining authority gap before ordinary MVP development can resume.

The product ownership model and product-domain authority map are established. The bounded pre-write evidence analysis for detailed Product Vision is now complete.

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
- product documentation authority target selection: `47b1df40fce16e56dacdd57ac2760b3e8184b228`;
- product documentation ownership model: `7e1cfe948695fa15244cf4cb0d8ef897503e798f`;
- product documentation authority map: `1763274933383b818de1092897c6dc669a52edaa`;
- product vision target selection/control sync: `57b954aa542a18ba8d8bda2ba5c554baad778d36`.

`docs/product/README.md` was re-read from the authoritative branch after its transfer commit and verified to preserve the intended authority boundaries.

The Product Vision pre-write analysis found sufficient current authority for a minimal permanent Product Vision without historical reconstruction.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

No historical recovery is required for the bounded Product Vision transfer. Current authority supports the minimal vision scope. More detailed product strategy must not be reconstructed or invented merely to make the Product Vision more comprehensive.

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

- `docs/product/README.md` — established and verified product-domain navigation, authority boundaries, and placement rules;
- `docs/product/PRODUCT_VISION.md` — detailed permanent product vision;
- `docs/product/LEARNING_MODEL.md` — permanent learning model and verified learning mechanisms;
- `docs/product/mvp.md` — durable MVP scope and product acceptance boundary.

Deferred/overlap placeholders remain non-authoritative and are not authorized for population or deletion.

---

## Product Vision Pre-Write Result

**Status: COMPLETE — bounded write can proceed without historical recovery**

The current evidence supports the following minimal permanent Product Vision:

- TheraLearn is a structured learning platform, with psychotherapy education as the initial content domain;
- the platform identity is broader than the initial psychotherapy domain;
- the intended product experience integrates structured curriculum content with multiple learning activities around the same learning context rather than treating those activities as unrelated standalone tools;
- currently verified high-level learning/product capabilities include curriculum/syllabus content, flashcards, quizzes, learning progress, reading support, and multilingual support initially in Danish and English;
- detailed learning mechanisms and pedagogical relationships belong in `LEARNING_MODEL.md`, not Product Vision;
- durable MVP inclusion/acceptance boundaries belong in `mvp.md`, not Product Vision.

The current evidence does not justify adding:

- detailed target-user personas;
- pricing or business model;
- commercial positioning;
- detailed success metrics;
- release strategy;
- a prioritized feature roadmap;
- unsupported future feature commitments.

These omissions are deliberate authority boundaries, not evidence gaps requiring historical recovery for the current bounded transfer.

---

## Documentation Audit Findings

Current unresolved findings include:

- `PRODUCT_VISION.md`, `LEARNING_MODEL.md`, and `mvp.md` remain empty pending bounded evidence-based transfer;
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
- Product Vision pre-write evidence analysis completed.

### Not yet completed

- Transfer the bounded verified Product Vision into `docs/product/PRODUCT_VISION.md`.
- Transfer verified learning-model knowledge into `docs/product/LEARNING_MODEL.md`.
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

**Status: ACTIVE, reduced.**

Product placement authority is established and the Product Vision transfer scope is now verified, but the substantive product owners are not yet fully established.

**Mitigation:** transfer the bounded Product Vision, then proceed one substantive owner at a time.

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

Transfer the bounded verified Product Vision into `docs/product/PRODUCT_VISION.md`.

The document must remain a permanent product-intent authority and must not absorb learning-model mechanics, MVP scope, current workflow state, commercial strategy, roadmap commitments, or unsupported product claims.

---

## Next Allowed Action

Perform a bounded write of only `docs/product/PRODUCT_VISION.md` using the verified Product Vision scope recorded above.

After the write:

1. re-read `PRODUCT_VISION.md` from the authoritative branch;
2. verify its boundary against `PROJECT_OVERVIEW.md`, `LEARNING_MODEL.md`, `mvp.md`, and `PROJECT_CONTROL.md`;
3. synchronize `PROJECT_CONTROL.md`;
4. stop before modifying another product authority.

No historical retrieval is authorized for this transfer.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
