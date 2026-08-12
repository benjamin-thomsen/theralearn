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

The product ownership model is now established, and `docs/product/README.md` has been transferred as the verified product-domain navigation and placement authority.

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
- control synchronization after README repair: `2e1a32da30fb4b2c7e978eeaf0448b0d5d4eefac`;
- product documentation authority target selection: `47b1df40fce16e56dacdd57ac2760b3e8184b228`;
- product documentation ownership model: `7e1cfe948695fa15244cf4cb0d8ef897503e798f`;
- product documentation authority map: `1763274933383b818de1092897c6dc669a52edaa`.

`docs/product/README.md` was re-read from the authoritative branch after its transfer commit and verified to preserve the intended authority boundaries.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

No product-history retrieval is currently authorized. The next task is first to determine the bounded product-vision content that can be transferred from current authority and verified implementation evidence. If a required permanent product-vision fact cannot be established, the exact evidence gap must be recorded before historical recovery is considered.

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

### `docs/product/README.md`

**Status: ESTABLISHED AND VERIFIED**

Owns product-domain navigation, authority boundaries, placement rules, and routing between product documents.

### `docs/product/PRODUCT_VISION.md`

Intended owner of detailed permanent product vision that is more specific than the stable high-level identity and product direction already owned by `PROJECT_OVERVIEW.md`.

### `docs/product/LEARNING_MODEL.md`

Intended owner of the permanent learning model and verified learning mechanisms.

### `docs/product/mvp.md`

Intended owner of durable MVP scope and product acceptance boundary.

Current workflow state remains owned by `PROJECT_CONTROL.md`.

### Deferred / overlap candidates

The following placeholders are not active independent authorities:

- `docs/product/feature-catalog.md`;
- `docs/product/release-plan.md`;
- `docs/product/roadmap.md`;
- `docs/product/target-users.md`;
- `docs/product/vision.md`;
- `docs/product/learning-philosophy.md`.

Their existence does not authorize population or deletion.

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
- Product documentation selected as highest-priority remaining authority domain.
- Product authority/placement assessment completed.
- Minimal product-document ownership model derived.
- `docs/product/README.md` established, re-read, and verified as product-domain authority/navigation entry point.

### Not yet completed

- Transfer verified detailed product vision into `docs/product/PRODUCT_VISION.md`.
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

Product placement authority is now established, but the three substantive product owners remain empty. Ordinary MVP development before the required product authority is transferred could still allow implementation or chat to become de facto product authority.

**Mitigation:** transfer one substantive product owner at a time using current verified evidence, beginning with detailed product vision.

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

Perform a bounded pre-write evidence analysis for `docs/product/PRODUCT_VISION.md`.

The analysis must determine which detailed permanent product-vision facts can be transferred from current repository authority and verified implementation evidence without inventing missing product strategy.

It must preserve the boundary with:

- `PROJECT_OVERVIEW.md`, which owns stable project identity and high-level product direction;
- `LEARNING_MODEL.md`, which owns how learning is supported;
- `mvp.md`, which owns durable MVP scope and acceptance boundary;
- `PROJECT_CONTROL.md`, which owns current workflow state.

---

## Next Allowed Action

Inspect current repository authority and implementation evidence relevant to detailed product vision and derive the minimal evidence-backed scope for `docs/product/PRODUCT_VISION.md`.

Do not write `PRODUCT_VISION.md` during this analysis.

Do not use historical chat material by default. If a necessary detailed product-vision fact cannot be established from current authority or implementation evidence, record the exact bounded evidence gap before any historical recovery is authorized.

After the analysis, synchronize `PROJECT_CONTROL.md` with the result before any product-vision write.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
