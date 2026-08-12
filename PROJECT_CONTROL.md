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

The product ownership model, product-domain authority map, Product Vision, and Learning Model are established and verified. The bounded MVP scope analysis is now complete and a minimal durable MVP acceptance boundary has been derived.

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
- Learning Model transfer: `38760eb66974217c9d966f6b0617f4049be76d69`;
- MVP scope analysis target selection: `d0ddb1e8cdf0fe5e5275a33b8797e6bb25818cb4`.

The MVP scope analysis inspected the established Product Vision and Learning Model together with current repository implementation. The repository contains concrete product surfaces for curriculum/pensum, quiz, results/progress, dashboard, and authentication, plus the data structures that relate flashcards, quiz questions, and learner progress to lesson context.

A new complete local build/TypeScript/documentation verification has not yet been run after these documentation-only changes.

---

## Historical Reconstruction Status

**Status: Methodically complete for current continuation; no historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

No historical recovery is required for the bounded minimal MVP scope transfer. Current Product Vision, Learning Model, repository implementation, and verified project authority are sufficient to define a minimal durable MVP boundary.

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
- `docs/product/mvp.md` — durable MVP scope and product acceptance boundary; bounded transfer now authorized.

Deferred/overlap placeholders remain non-authoritative and are not authorized for population or deletion.

---

## MVP Scope Pre-Write Result

**Status: COMPLETE — bounded minimal write can proceed without historical recovery**

### Required MVP capabilities

The minimal MVP requires:

- structured curriculum/pensum navigation;
- lesson/content context within the structured curriculum;
- flashcards operating within lesson context;
- quiz capability operating within lesson context;
- basic learner progress/result visibility tied to learning context;
- authentication/user identity sufficient to support user-related progress.

### Supporting but not defining the MVP

- dashboard/navigation surfaces may support the user experience but are not themselves part of the durable MVP definition;
- general informational/about surfaces are not MVP-defining capabilities.

### Product Vision capabilities not required for the initial MVP boundary

Current evidence does not require these for the initial MVP acceptance boundary:

- reading support;
- Danish/English multilingual support.

They remain valid Product Vision capabilities and may be implemented after the initial MVP without changing Product Vision.

### Not established as MVP requirements

- notes;
- detailed target-user features;
- advanced/adaptive learning;
- spaced repetition;
- mastery learning;
- commercial/pricing capabilities;
- release/roadmap functionality.

### Durable MVP acceptance boundary

The MVP is product-complete when an authenticated learner can:

1. enter the structured curriculum;
2. navigate into a lesson/content context;
3. work with the required learning activities in that context, including flashcards and quiz;
4. receive or view basic result/progress information tied to the learning context;
5. complete this core learning loop without relying on unsupported or out-of-scope Product Vision capabilities.

This is a durable product acceptance boundary, not a statement that the current implementation already satisfies every step.

Current implementation progress and the next implementation action remain owned by `PROJECT_CONTROL.md`.

---

## Documentation Audit Findings

Current unresolved findings include:

- `docs/product/mvp.md` remains empty pending the now-authorized bounded transfer;
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
- MVP scope pre-write evidence analysis completed.

### Not yet completed

- Transfer the bounded MVP scope into `docs/product/mvp.md`.
- Verify current implementation against the newly established MVP acceptance boundary.
- Decide later whether deferred product placeholders should be retained or removed.
- Development-domain documentation audit beyond roadmap/backlog.
- Retention/deletion decision for `-name package-lock.json`.
- Decisions-log placement/need assessment.
- Long-term integration decision for `main`.
- New complete local verification after documentation-only repair commits.

---

## Current Risks

### R1 – Product domain authority gap

**Status: ACTIVE, near closure.**

Product placement authority, Product Vision, and Learning Model are established. MVP scope is derived but not yet transferred to its permanent owner.

**Mitigation:** transfer the bounded MVP scope, then verify the implementation against the resulting acceptance boundary.

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

Transfer the bounded minimal MVP scope and durable acceptance boundary into `docs/product/mvp.md`.

The document must define product scope, not current implementation progress. It must not claim that an MVP requirement is already complete merely because related files or code exist.

---

## Next Allowed Action

Perform a bounded write of only `docs/product/mvp.md` using the verified MVP scope recorded above.

After the write:

1. re-read `mvp.md` from the authoritative branch;
2. verify its boundary against Product Vision, Learning Model, architecture, and Project Control;
3. synchronize `PROJECT_CONTROL.md`;
4. stop before implementation changes;
5. the subsequent methodological task should be a bounded implementation-vs-MVP gap assessment, not immediate feature coding.

No historical retrieval is authorized for this transfer.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
