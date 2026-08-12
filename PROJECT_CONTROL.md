# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-13

---

## Current Phase

**MVP Learning Loop Implementation — Learning Activity Integration**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The Authoritative Lesson Context first slice and the Authoritative Curriculum Entry slice are now verified and closed. The dependency-correct path from structured curriculum into authoritative lesson context is established.

The next responsibility is to derive the first bounded learning-activity integration into authoritative lesson context. No learning-activity implementation is authorized until repository evidence determines the correct existing ownership and smallest file-level slice.

---

## Current Branch

```text
migration-next16-to-root
```

Verified implementation commit:

```text
10330e672ffb108c37a9fff1aa3531fa79ce208f
Add authoritative curriculum entry
```

GitHub Actions workflow `Verify`, run 76, completed successfully for that exact commit.

---

## Product Authority

Permanent product authority remains:

- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

The dependency-correct MVP integration direction remains:

```text
Authenticated learner
        ↓
Structured curriculum
        ↓
Authoritative lesson context
        ↓
Learning activities
        ↓
Learner-related result/progress
```

The first two product seams below learner identity are now established:

```text
Structured curriculum → Authoritative lesson context
```

The next seam to derive is:

```text
Authoritative lesson context → Learning activities
```

Learning Principles remain authority; existing features are implementation evidence and candidate mechanisms only.

---

## Closed Slice — Authoritative Lesson Context

Implemented route:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

Implementation commit:

```text
a817cb687c24a34f371d3d373dfd5ca9e384bb27
Add authoritative lesson context route
```

Tooling repair commit:

```text
58aafb825a35748a8b8739a214d325767132c3e9
Make dev output copy portable in CI
```

GitHub Actions passed after the bounded tooling repair.

**Authoritative Lesson Context first slice: VERIFIED AND CLOSED.**

---

## Closed Slice — Authoritative Curriculum Entry

Implemented file:

```text
app/pensum/page.tsx
```

Implementation commit:

```text
10330e672ffb108c37a9fff1aa3531fa79ce208f
Add authoritative curriculum entry
```

The page is an async Server Component that:

- uses the typed Supabase server client;
- loads courses, chapters, and lessons through existing repository functions;
- renders only published curriculum entities;
- derives lesson links from authoritative course/chapter/lesson slugs;
- links directly to the established hierarchical lesson route;
- handles an empty published curriculum state without hardcoded fallback;
- introduces no flashcard, quiz, progress, scheduler, mastery, adaptive-learning, or legacy-route migration behavior.

GitHub Actions workflow `Verify`, run 76, completed with `success` for `10330e672ffb108c37a9fff1aa3531fa79ce208f`.

**Authoritative Curriculum Entry slice: VERIFIED AND CLOSED.**

---

## Current Verified Integration State

The repository now contains a dependency-correct authoritative curriculum path:

```text
/pensum
  ↓
published course
  ↓
published chapter
  ↓
published lesson link
  ↓
/pensum/{course.slug}/{chapter.slug}/{lesson.slug}
  ↓
authoritative lesson content
```

This establishes curriculum and lesson context ownership but does not yet establish learning-activity integration.

The MVP requires flashcards and quiz to be usable in relation to lesson context. Their existing repository/routes/components must therefore be inspected before selecting the next implementation slice.

---

## Current Risks

### R1 – Parallel identity models

**Status: ACTIVE but reduced.**

The authoritative `/pensum` entry now points to hierarchical lesson URLs. The legacy hardcoded `app/pensum/[slug]/page.tsx` remains repository evidence but is not authoritative navigation.

### R2 – Database content availability

**Status: OPEN.**

Code-level curriculum traversal is verified. Actual end-to-end traversal through published remote curriculum rows remains a runtime data-state question.

### R3 – Learning-activity identity drift

**Status: ACTIVE.**

Existing flashcard and quiz surfaces may use topic slugs or other legacy identity. They must not be connected to authoritative lessons until their data and routing contracts are inspected.

### R4 – Learning-principle overclaim

**Status: ACTIVE.**

Integrating an existing flashcard or quiz mechanism does not automatically certify Active Retrieval, Informative Correction, Distributed Practice, Adaptive Guidance, or Objective-Aligned Demonstration.

---

## Code Change Gate

**Product implementation: CLOSED pending bounded Learning Activity Integration inspection and file-level plan.**

No product-code file change is currently authorized.

Repository inspection and control synchronization are allowed.

---

## Current Task

Derive the smallest dependency-correct learning-activity integration slice from the authoritative lesson context.

The derivation must determine which existing learning activity should be integrated first based on current repository architecture and data ownership, not feature preference or historical implementation order.

---

## Next Allowed Action

Inspect the current flashcard and quiz implementation surfaces and their data contracts in relation to authoritative `lesson.id`.

At minimum verify:

- existing flashcard routes/components/data sources;
- existing quiz routes/components/data sources;
- repository functions for flashcards and quiz questions;
- whether those records are already keyed by `lesson_id`;
- whether existing activity routes use authoritative lesson identity or legacy topic identity;
- the authoritative lesson route as the candidate integration ownership point;
- whether authentication is required for activity use itself or only for later learner-related progress persistence.

Then select exactly one smallest dependency-correct first activity integration slice and synchronize `PROJECT_CONTROL.md` with a bounded file-level plan before reopening the product-code gate.

Do not implement both activity families at once. Do not add progress persistence, adaptive sequencing, spaced repetition, mastery logic, broad UI redesign, or legacy-route deletion during this inspection.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
