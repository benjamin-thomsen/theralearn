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

**MVP Implementation Gap Assessment**

The bounded product-authority repair is complete for the minimal product model required to evaluate MVP implementation.

Established and verified product authorities:

- `docs/product/README.md` — product-domain navigation and placement;
- `docs/product/PRODUCT_VISION.md` — permanent product intent;
- `docs/product/LEARNING_MODEL.md` — evidence-backed learning structure;
- `docs/product/mvp.md` — durable initial MVP scope and acceptance boundary.

Ordinary MVP feature coding remains paused until the current implementation has been assessed against the authoritative MVP boundary and the first exact implementation gap has been selected.

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

Recent verified product/control checkpoints include:

- product documentation ownership model: `7e1cfe948695fa15244cf4cb0d8ef897503e798f`;
- product documentation authority map: `1763274933383b818de1092897c6dc669a52edaa`;
- Product Vision transfer: `f1d7c814da26aeec1ac5cbc19bc4ae13011122af`;
- Learning Model transfer: `38760eb66974217c9d966f6b0617f4049be76d69`;
- MVP scope transfer authorization: `9f0fb1f6ccc2223e4116f9fbb04ef592a46fdd7e`;
- MVP scope transfer: `790b68a8c68c23046b6613407bf2db8c17d803e7`.

`docs/product/mvp.md` was re-read from the authoritative branch after transfer and verified to define product scope rather than implementation status.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Historical Reconstruction Status

**Status: No historical retrieval currently authorized**

Historical material remains evidence, not automatic authority.

The MVP implementation gap assessment must use current product authority and current repository implementation. Historical recovery is not required unless a concrete bounded evidence gap appears that cannot be resolved from those sources.

---

## Product Authority Status

**Status: MINIMAL PRODUCT AUTHORITY LAYER ESTABLISHED**

### Product Vision

TheraLearn is an integrated structured learning platform, initially applied to psychotherapy education, with curriculum content and supported learning activities organized as a coherent learning experience.

### Learning Model

The current evidence-backed learning structure is:

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

### Initial MVP acceptance boundary

The MVP is product-complete when an authenticated learner can:

1. enter the structured curriculum;
2. navigate into a lesson/content context;
3. work with required learning activities in that context, including flashcards and quiz;
4. receive or view basic result/progress information tied to the learning context;
5. complete the core learning loop without depending on capabilities outside the initial MVP boundary.

Required MVP capabilities are therefore:

- structured curriculum/pensum;
- lesson/content context;
- flashcards in lesson context;
- quiz in lesson context;
- basic learner progress/results tied to learning context;
- authentication/user identity sufficient for learner-related progress.

Reading support and multilingual support remain Product Vision capabilities but are outside the initial MVP acceptance boundary.

---

## Documentation Audit Status

Product authority repair is sufficient for MVP gap assessment.

Remaining documentation/repository findings are not currently authorized to block the bounded MVP assessment merely because they remain unresolved:

- deferred product placeholders;
- empty `docs/meetings/decisions-log.md`;
- empty development placeholders beyond the already repaired roadmap/backlog;
- anomalous root artifact `-name package-lock.json`;
- empty implementation placeholders whose MVP relevance has not yet been established.

These remain future bounded targets unless the MVP gap assessment demonstrates that one directly blocks the core learning loop.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for the minimal initial MVP assessment.**

The product-domain authority layer now contains the required navigation, Product Vision, Learning Model, and durable MVP boundary.

### R2 – Responsibility-model transfer fidelity

**Status: CLOSED**

### R3 – Stale roadmap/backlog state

**Status: CLOSED**

### R4 – Anomalous repository artifact

**Status: OPEN but not currently MVP-blocking.**

Preserve until separately authorized.

### R5 – Branch divergence

The authoritative repaired state is on `migration-next16-to-root`; `main` is behind.

**Mitigation:** no integration until a later verified integration decision.

### R6 – Foundation certification evidence incompleteness

**Status: CLOSED for current permanent Foundation ownership needs.**

### R7 – Unknown MVP implementation completeness

**Status: ACTIVE — current primary risk.**

The repository contains many relevant routes, components, database structures, and auth flows, but existence has not yet been verified against the end-to-end MVP acceptance boundary.

**Mitigation:** perform a bounded implementation-vs-MVP gap assessment before authorizing product code changes.

---

## Code Change Gate

**Ordinary product feature development: PAUSED pending MVP gap assessment**

No product feature code change is authorized yet.

Read-only repository inspection and verification are authorized for the gap assessment.

After the gap assessment selects one exact implementation gap, `PROJECT_CONTROL.md` must be synchronized before implementation is authorized.

---

## Current Task

Perform a bounded implementation-vs-MVP gap assessment against the authoritative acceptance boundary in `docs/product/mvp.md`.

For each required MVP capability, classify current implementation as:

- **Verified Complete** — evidence supports the capability as part of the required end-to-end learning loop;
- **Partial** — relevant implementation exists but the MVP capability or integration is incomplete/unverified;
- **Missing** — required capability has no sufficient implementation evidence;
- **Blocked/Unknown** — current evidence is insufficient to classify without a narrower verification step.

Assessment scope:

1. authentication/user identity;
2. structured curriculum/pensum navigation;
3. lesson/content context;
4. flashcards in lesson context;
5. quiz in lesson context;
6. basic results/progress tied to learning context;
7. end-to-end connectivity of the complete core learning loop.

---

## Next Allowed Action

Inspect the current repository implementation read-only against the seven assessment areas above.

Do not modify product code during the assessment.

Do not treat file/route existence as proof of MVP completion. Verify actual data flow, navigation/integration, and user-related behavior where repository evidence permits.

Produce a bounded gap classification and select exactly one highest-priority implementation gap or narrower verification target.

Then synchronize `PROJECT_CONTROL.md` before any product implementation change is authorized.

A complete local build/TypeScript/documentation verification may be required as part of or immediately after this assessment, but it does not replace functional MVP-gap verification.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
