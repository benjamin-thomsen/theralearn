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

The architecture repair checkpoint and root control kernel are established.

Foundation authority is consolidated in `docs/foundation/`. Core architecture documentation is repaired. Developer Toolkit roadmap/backlog documentation is synchronized. The root `README.md` is repaired and verified.

The product documentation domain is now the highest-priority remaining authority gap before ordinary MVP development can resume.

A bounded product authority/placement assessment has now been completed. It established a minimal ownership model without populating or deleting any product placeholder.

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
- root README repair target selection: `920c7a36edaeef943a2519f50732cc5103ab3b6f`;
- README write authorization: `5a17a63df0d2fa2840d5173fbcb8e349eebba791`;
- root README repair: `0284b31788a27c71231b14018e2ce5df16f6b46b`;
- control synchronization after README repair: `2e1a32da30fb4b2c7e978eeaf0448b0d5d4eefac`;
- product documentation authority target selection: `47b1df40fce16e56dacdd57ac2760b3e8184b228`.

The repaired root `README.md` was re-read from the authoritative branch after its transfer commit, and its branch-ref was verified.

The product authority/placement assessment inspected current product placeholders and existing project authority without mutating product files.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical evidence has already served the bounded Foundation recovery tasks required for current continuation.

Historical material remains evidence, not automatic authority.

No product-history retrieval is currently authorized. The ownership model can be established from current authority without historical reconstruction. Historical recovery may only be authorized later for a concrete product fact that cannot be established from current authority or implementation evidence.

---

## Foundation Documentation Status

**Status: Consolidated Foundation authority established for current known permanent needs**

Established ownership units:

- `docs/foundation/README.md`;
- `docs/foundation/FOUNDATION_MODEL.md`;
- `docs/foundation/RESPONSIBILITY_MODEL.md`.

No current evidence demonstrates another concrete Foundation ownership gap requiring historical retrieval.

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

**Status: Bounded ownership model derived; product files not yet populated**

The current `docs/product/` directory is an empty placeholder set. Empty files alone do not establish separate authority needs.

The minimal product-document model is:

### `docs/product/README.md`

Owns product-domain navigation, authority boundaries, placement rules, and routing between product documents.

It must not duplicate detailed product content.

### `docs/product/PRODUCT_VISION.md`

Intended owner of detailed permanent product vision that is more specific than the stable high-level identity already owned by `PROJECT_OVERVIEW.md`.

`docs/product/vision.md` is currently a duplicate/overlap candidate and must not be independently populated unless a distinct responsibility is later demonstrated.

### `docs/product/LEARNING_MODEL.md`

Intended owner of the permanent learning model: how TheraLearn is expected to support learning, including learning mechanisms and their relationships when those facts are verified.

`docs/product/learning-philosophy.md` is currently an overlap candidate and must not be independently populated unless a separate responsibility is demonstrated.

### `docs/product/mvp.md`

Intended owner of durable MVP scope and product acceptance boundary once verified.

Current workflow state, current implementation task, and Next Allowed Action remain owned by `PROJECT_CONTROL.md` and must not be copied here.

### Deferred / not yet justified as separate authorities

The following placeholders do not currently have enough evidence to justify independent authority documents:

- `docs/product/feature-catalog.md`;
- `docs/product/release-plan.md`;
- `docs/product/roadmap.md`;
- `docs/product/target-users.md`;
- `docs/product/vision.md`;
- `docs/product/learning-philosophy.md`.

Their concepts may later be placed in one of the three substantive product owners above or promoted to separate documents only if a distinct durable responsibility is demonstrated.

This classification is a placement decision, not a deletion authorization.

---

## Documentation Audit Findings

Current unresolved documentation/repository findings include:

- the product-domain authority files remain empty pending bounded transfer;
- empty `docs/meetings/decisions-log.md`;
- empty development placeholders including `docs/development/project-structure.md` and `docs/development/git-workflow.md`;
- anomalous root artifact `-name package-lock.json`, verified to contain pager/`less` help text rather than package-lock data;
- empty implementation placeholders `lib/repositories/quizQuestions.ts` and `components/PensumCard.tsx`.

Development documentation is not wholly empty: substantive Developer Toolkit architecture documents plus synchronized roadmap/backlog already exist.

No empty or anomalous artifact is authorized for deletion, population, or implementation merely because it exists.

---

## Documentation Repair Progress

### Completed

- Root control kernel established.
- Core architecture documentation repaired and verified.
- Foundation authority consolidated and verified.
- Developer Toolkit roadmap and Improvement Backlog synchronized.
- Root `README.md` repaired, re-read, and branch-ref verified.
- Post-README reprioritization completed.
- Product documentation selected as highest-priority remaining authority domain.
- Bounded product authority/placement assessment completed.
- Minimal product-document ownership model derived.

### Not yet completed

- Establish `docs/product/README.md` as the product-domain authority/navigation entry point.
- Transfer verified product vision into its authoritative owner.
- Transfer verified learning-model knowledge into its authoritative owner.
- Establish verified MVP scope authority.
- Decide later whether deferred product placeholders should be retained or removed.
- Development-domain documentation audit beyond roadmap/backlog.
- Retention/deletion decision for `-name package-lock.json`.
- Decisions-log placement/need assessment.
- Long-term integration decision for `main`.
- New complete local verification after documentation-only repair commits.

---

## Current Risks

### R1 – Product domain authority gap

**Status: ACTIVE — highest current documentation risk.**

The ownership model is now defined, but product-domain authority files remain empty. Ordinary MVP development before product authority is established could allow implementation or chat to become de facto product authority.

**Mitigation:** establish the product-domain entry point first, then transfer product knowledge one bounded owner at a time.

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

Establish `docs/product/README.md` as the product-domain authority and navigation entry point using the derived minimal ownership model.

This is a bounded documentation transfer. It must define placement and routing only; it must not invent detailed product vision, learning-model content, MVP scope, target-user detail, roadmap, feature catalog, or release plan.

---

## Next Allowed Action

Perform a bounded write of only `docs/product/README.md`.

The document must:

- define the product-domain purpose and authority boundary;
- route stable high-level identity to `PROJECT_OVERVIEW.md`;
- route detailed product vision to `PRODUCT_VISION.md`;
- route learning-model knowledge to `LEARNING_MODEL.md`;
- route durable MVP scope to `mvp.md`;
- route current workflow/state to `PROJECT_CONTROL.md`;
- classify the remaining product placeholders as unassigned/deferred overlap candidates rather than active authorities;
- state that empty placeholders must not be populated merely because they exist.

Do not modify any other product file in the same bounded action.

After the write, re-read `docs/product/README.md`, verify authority consistency, then synchronize `PROJECT_CONTROL.md` and select exactly one subsequent bounded product transfer.

No historical retrieval is authorized unless a new concrete bounded evidence gap is identified and recorded first.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
