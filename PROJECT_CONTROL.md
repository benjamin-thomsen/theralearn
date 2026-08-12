# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-13

---

## Purpose

This document owns the current verified state of the TheraLearn project: current phase, verified facts, current task, unresolved risks, code-change permission, and Next Allowed Action.

Stable project identity and permanent principles belong in `PROJECT_OVERVIEW.md`. Governance and workflow rules belong in `PROJECT_HANDBOOK.md`. Domain-specific permanent knowledge belongs under `docs/`.

---

## Current Phase

**Learning Science Evidence Review — Authority Transfer Complete; MVP Boundary Alignment in Progress**

The bounded external learning-science synthesis, all five individual principle certifications, the final minimum-set coherence test, and the permanent Learning Model authority transfer are complete.

The certified science-derived learning principles now live in `docs/product/LEARNING_MODEL.md` as permanent product authority.

Product implementation remains paused until the MVP boundary is explicitly aligned with the certified Learning Model and the next implementation task is reselected from the verified implementation gap.

---

## Current Branch

```text
migration-next16-to-root
```

The authoritative project state currently lives on this branch. `main` remains behind and must not be merged or rewritten until a later verified integration decision.

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

- Product Vision transfer: `f1d7c814da26aeec1ac5cbc19bc4ae13011122af`;
- Learning Model transfer: `38760eb66974217c9d966f6b0617f4049be76d69`;
- MVP scope transfer: `790b68a8c68c23046b6613407bf2db8c17d803e7`;
- Learning Science Evidence Review opened: `2bb3b9e90914c0e29ed10c6a4fd4be81639b2fd6`;
- initial learning-science evidence synthesis recorded: `3376c32820c0e023cc0a876df74a250afa90791a`;
- bounded Active Retrieval certification: `2d9e817b95dfa911eacb886f94e4131ae8af8222`;
- bounded Distributed Relearning certification: `5948d31137414b8b697e9b7e674fb4e76f012325`;
- bounded Informative Correction certification: `8b81b73ee1f10dd7b8e07ac3b0264ba33b764e43`;
- bounded Adaptive Guidance certification: `b31c28559bf489f2b6c9400d727a27cce3f0dc2e`;
- bounded Objective-Aligned Demonstration certification: `d62d4c950150ab0dbb569d5f0b7dc90d16387550`;
- final minimum learning-principle set certified: `3ed50ed6a7bd236f18958193cd2b4fd103776565`;
- certified learning principles transferred into permanent Learning Model authority: `8a79c7a819bb9c96c513086053415d7b0a1f8f40`.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Product Authority Status

**Status: SCIENCE-DERIVED LEARNING PRINCIPLES TRANSFERRED TO PERMANENT PRODUCT AUTHORITY**

Established authorities:

- `docs/product/README.md`;
- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

`docs/product/LEARNING_MODEL.md` now owns both the structural learning hierarchy and the final certified learning-principle set:

1. Active Retrieval Principle;
2. Distributed Practice Principle;
3. Informative Correction Principle;
4. Adaptive Guidance Principle;
5. Objective-Aligned Demonstration Principle.

Mechanisms such as flashcards, quizzes, self-explanation, interleaving, worked examples, successive relearning, and specific spaced-repetition schedules remain mechanisms rather than principles.

---

## MVP Boundary Alignment Result

**Status: INITIAL SCIENCE-ALIGNMENT TEST COMPLETE — NO MVP SCOPE EXPANSION REQUIRED AT THIS CHECKPOINT**

The existing MVP defines one coherent core learning loop within structured curriculum context. It does not claim to prove durable retention across an extended retention horizon, generalized mastery, or far transfer.

Therefore the certified principles constrain MVP quality where applicable but do not automatically add new named capabilities.

### Principle-by-principle MVP effect

- **Active Retrieval:** existing flashcard and quiz capabilities can satisfy this principle only if their design actually requires active recall where durable retention is intended. No new named capability is required.
- **Informative Correction:** existing learning activities should provide sufficient correction when learner attempts reveal learning-relevant errors or gaps. This is a quality constraint on existing activities, not a new feature class.
- **Adaptive Guidance:** lesson/activity design should avoid both under-guidance and unnecessary persistent support where task complexity and learner knowledge make this relevant. The MVP does not require adaptive-learning software or an AI tutor.
- **Objective-Aligned Demonstration:** basic results/progress must not be interpreted as generalized mastery beyond the performance actually observed. The MVP does not require a comprehensive mastery or competence system.
- **Distributed Practice:** the permanent Learning Model requires repeated learning opportunities to be distributed across time when durable retention itself requires repetition. However, the current MVP acceptance boundary does not require demonstrating durable retention across time. Therefore spaced repetition, a scheduler, or prescribed intervals do not become MVP requirements by implication.

### Distributed Practice decision

**Decision: RETAIN CURRENT MVP BOUNDARY.**

The current MVP statement that it does not require spaced repetition or prescribed repetition intervals remains compatible with the Learning Model because:

1. Distributed Practice is a conditional requirement triggered when durable retention requires repeated opportunities;
2. the MVP currently validates one coherent learning loop, not longitudinal durable-retention performance;
3. the principle does not prescribe spaced-repetition software, one algorithm, or one interval schedule;
4. a later post-MVP or explicit MVP scope decision may introduce repeated cross-session learning when longitudinal durability becomes part of the acceptance target.

No edit to `docs/product/mvp.md` is required solely because the science-derived principles were transferred.

---

## Implementation Gap Baseline

The verified implementation gap remains:

- authentication/user identity — **Partial**;
- curriculum/pensum — **Partial**;
- lesson/content — **Partial / substantial**;
- flashcards — **Missing at product-flow level**;
- quiz — **Partial / substantial**;
- results/progress — **Partial, currently local-browser based rather than authenticated learner/lesson authority**;
- complete end-to-end learning loop — **Missing / not integrated**.

The Learning Science Evidence Review did not erase this baseline. It changes the quality constraints under which missing or partial capabilities must be completed.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for the current MVP and Learning Model.**

### R2 – Learning-science authority gap

**Status: CLOSED for the certified minimum principle set.**

The five science-derived principles are now permanent Learning Model authority.

### R3 – MVP implementation integration gap

**Status: ACTIVE.**

The application still lacks one integrated authenticated learning loop across curriculum, lesson context, required learning activities, and learner-related results/progress.

### R4 – Learning-principle implementation drift

**Status: ACTIVE.**

Future implementation could superficially include flashcards, quizzes, feedback, or progress while failing the underlying certified principles.

**Mitigation:** implementation tasks must be derived from both MVP acceptance criteria and `LEARNING_MODEL.md`; feature presence alone is not sufficient verification.

### R5 – Anomalous repository artifact

**Status: OPEN but not currently blocking.**

### R6 – Branch divergence

**Status: OPEN.**

No integration with `main` until a later verified decision.

---

## Code Change Gate

**Product implementation: PAUSED pending implementation-task reselection.**

The science review no longer blocks implementation in principle, but no product code change is authorized until the next implementation task is reselected against the now-authoritative Learning Model and existing MVP gap.

Documentation/read-only repository inspection required for task reselection is authorized.

---

## Current Task

Re-evaluate the verified MVP implementation gap against the now-authoritative Learning Model and select the smallest next implementation task that advances the integrated MVP learning loop without violating the certified principles.

Task selection must consider both:

- product necessity for the end-to-end MVP acceptance boundary;
- learning-quality constraints derived from the certified principles.

Do not choose work merely because a route, component, or database table already exists.

---

## Next Allowed Action

Perform a bounded read-only implementation-gap reselection focused on the integrated learning loop:

```text
Authenticated learner
        ↓
Structured curriculum
        ↓
Lesson context
        ↓
Learning activity
        ↓
Learning-relevant result/progress
```

Determine which missing or partial responsibility is the smallest dependency-correct next implementation task.

Specifically compare at minimum:

- flashcard product flow;
- quiz integration with lesson/user authority;
- learner-progress persistence/authority;
- end-to-end lesson learning-loop integration.

Use the certified Learning Model as a constraint, not as a reason to introduce advanced learning systems beyond the current MVP.

After selecting the task, synchronize `PROJECT_CONTROL.md` again and explicitly set the code-change gate before implementation begins.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
