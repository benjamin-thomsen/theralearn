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

**MVP Learning Loop Implementation — Task Selection Complete**

The Learning Science Evidence Review is complete. The five certified principles are permanent authority in `docs/product/LEARNING_MODEL.md`, and the existing MVP boundary has been explicitly retained.

A bounded read-only implementation-gap reselection has now been completed against the authoritative Learning Model and MVP acceptance boundary.

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

Recent verified control/product checkpoints include:

- final minimum learning-principle set certified: `3ed50ed6a7bd236f18958193cd2b4fd103776565`;
- certified learning principles transferred: `8a79c7a819bb9c96c513086053415d7b0a1f8f40`;
- MVP boundary aligned with certified Learning Model: `d352c0fa4e48556a2dc65f5d00a10f0f77bed900`.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Product Authority Status

**Status: ESTABLISHED FOR CURRENT MVP IMPLEMENTATION**

Permanent authorities:

- `docs/product/PRODUCT_VISION.md` — product intent;
- `docs/product/LEARNING_MODEL.md` — structural learning model and certified learning principles;
- `docs/product/mvp.md` — initial MVP acceptance boundary.

The certified Learning Model principles are:

1. Active Retrieval;
2. Distributed Practice;
3. Informative Correction;
4. Adaptive Guidance;
5. Objective-Aligned Demonstration.

---

## MVP Boundary Status

**Status: RETAINED — NO SCIENCE-DRIVEN SCOPE EXPANSION REQUIRED**

The MVP remains one coherent authenticated learning loop within structured curriculum context. It does not require a spaced-repetition algorithm, adaptive-learning system, universal mastery threshold, or longitudinal proof of durable retention.

The certified principles constrain implementation quality without silently adding advanced capabilities.

---

## Bounded Implementation-Gap Reselection

### Verified implementation evidence

#### Curriculum / lesson context

The current `app/pensum/[slug]/page.tsx` is a substantial hardcoded content surface with learning objectives, but it does not use the established repository/data authority for courses, chapters, or lessons and does not connect the lesson context to required learning activities.

Classification: **Partial / disconnected**.

#### Flashcards

A typed Supabase repository already exists at `lib/repositories/flashcards.ts`, including `getFlashcardsByLessonId`. The repository therefore has a data-access foundation for lesson-linked flashcards.

No flashcard product route/flow exists in the current `app/` tree, and no current lesson surface exposes a learner flashcard interaction.

Classification: **Missing at product-flow level, with repository foundation present**.

#### Quiz

The current quiz flow is substantial and interactive. `app/quiz/[slug]/page.tsx` supports answer selection, checking, score calculation, explanatory feedback, restart, and completion state.

It currently imports hardcoded `data/quiz.ts` rather than the Supabase `quiz_questions` authority. The `lib/repositories/quizQuestions.ts` repository file exists but is empty. Quiz routing is slug-based and not yet integrated with authoritative lesson/user data.

The current quiz interaction already provides explanatory feedback after answers, which is compatible with Informative Correction at the interaction level, but this does not solve lesson/user integration or persistence.

Classification: **Partial / substantial but disconnected from lesson/user authority**.

#### Learner progress

`app/hooks/useQuizProgress.ts` delegates progress to `lib/progress.ts`, which stores quiz results in browser storage under `quiz-progress` and keys them by slug.

This is not authenticated learner authority and is not authoritative lesson-level progress. It cannot satisfy the MVP's authenticated user-related progress requirement as the permanent implementation.

Classification: **Partial / non-authoritative**.

#### End-to-end loop

The current application has separate pensum, quiz, result/progress, authentication, and repository foundations, but no verified path currently composes them into:

```text
Authenticated learner
        ↓
Authoritative lesson context
        ↓
Required learning activity
        ↓
Learner-related result/progress
```

Classification: **Missing / not integrated**.

---

## Task Selection Decision

**Selected next implementation responsibility: establish the authoritative lesson learning-context seam before adding or migrating activity flows.**

The smallest dependency-correct task is to make a lesson-level product context resolve through the established repository layer and become the stable integration point for lesson-linked learning activities.

### Why this precedes flashcard UI

Flashcards are the only required MVP activity currently missing at product-flow level, but implementing a standalone flashcard route first would reproduce the current architectural problem: another disconnected learning utility. The Learning Model explicitly requires activities to live in shared curriculum/lesson context.

The flashcard repository already supports lesson IDs. The missing prerequisite is a product-level lesson context that can supply the authoritative lesson identity to that repository.

### Why this precedes quiz migration

The quiz flow already has substantial learner interaction and informative correction. Migrating its data source before establishing the lesson integration seam would still leave quiz as a separate slug-based utility rather than part of the coherent lesson loop.

### Why this precedes progress persistence

Authenticated progress must attach to an authoritative learning context. Persisting the current slug-based quiz progress first would risk cementing the wrong identity model. Lesson context must be authoritative before learner progress can be correctly keyed and interpreted.

### Why this is smaller than end-to-end integration

Full loop integration spans several responsibilities and would violate the project's one-bounded-change workflow. Establishing the lesson seam is the smallest prerequisite shared by flashcards, quiz integration, and learner progress.

---

## Selected Implementation Task

**Authoritative Lesson Context Integration — first bounded implementation slice**

The first implementation slice must establish a repository-backed lesson context without yet implementing flashcards, migrating quiz data, or persisting progress.

Required outcome:

1. a lesson product surface resolves an authoritative lesson through the existing repository layer;
2. the surface preserves curriculum context rather than becoming a standalone utility;
3. the lesson identity is available as the future integration key for flashcards, quiz questions, and learner progress;
4. existing hardcoded content is not silently treated as authoritative database content;
5. no advanced learning mechanism is introduced.

Before code is changed, inspect the exact current lesson repository API, course/chapter relationships, current pensum routing, Supabase server-client boundary, and available database fields to derive the smallest file-level implementation plan.

---

## Current Risks

### R1 – Learning-principle implementation drift

**Status: ACTIVE.**

Feature presence must not be treated as proof that a Learning Model principle is satisfied.

### R2 – Parallel identity models

**Status: ACTIVE / immediate.**

The application currently mixes hardcoded slugs/content with database IDs and repository-backed entities. Adding new flows before establishing the authoritative lesson seam could deepen this split.

### R3 – Progress authority mismatch

**Status: ACTIVE.**

Browser-local slug-based quiz progress must not become the basis for authenticated learner progress.

### R4 – Branch divergence

**Status: OPEN.**

No integration with `main` until a later verified decision.

---

## Code Change Gate

**Product implementation: NOT YET OPEN — implementation planning authorized.**

The next responsibility has been selected, but code changes remain blocked until the exact repository APIs, routing seam, server/client boundary, and file-level change set have been inspected and recorded.

Read-only repository inspection and `PROJECT_CONTROL.md` synchronization are authorized.

---

## Current Task

Derive the bounded implementation plan for **Authoritative Lesson Context Integration**.

Inspect only what is necessary to answer:

- which current route should own the authoritative lesson context;
- how a lesson is resolved from the current URL/routing model;
- which repository functions and Supabase client are appropriate on that route;
- what course/chapter context is required to preserve curriculum hierarchy;
- which exact files must change in the first slice;
- how the slice will be verified without pulling flashcards, quiz migration, or progress persistence into scope.

---

## Next Allowed Action

Read the current implementations of:

- `lib/repositories/lessons.ts`;
- relevant course/chapter repository functions;
- the Supabase server client boundary;
- `app/pensum/page.tsx` and `app/pensum/[slug]/page.tsx`;
- any existing route or component that already consumes repository-backed course/chapter/lesson data.

Then define the smallest exact file-level implementation plan and synchronize `PROJECT_CONTROL.md` with the plan and explicit code-change permission.

Do not implement flashcards, migrate quiz data, or change progress persistence during this planning step.

No historical chat recovery is authorized.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
