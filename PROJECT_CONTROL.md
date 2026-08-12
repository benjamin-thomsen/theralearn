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

**MVP Learning Loop Implementation — Quiz Authority Integration**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The Authoritative Lesson Context, Authoritative Curriculum Entry, and first Authoritative Flashcard Integration slices are now verified and closed.

The next dependency-correct responsibility is to establish authoritative lesson-scoped quiz data access before any quiz UI is integrated into the authoritative lesson context.

---

## Current Branch

```text
migration-next16-to-root
```

Verified flashcard implementation commit:

```text
731c9d4c9b87322848b9845c952e7f8dde904ac8
Integrate authoritative lesson flashcards
```

GitHub Actions workflow `Verify`, run 79, completed successfully for that exact commit.

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

The first authoritative learning activity is now connected to lesson context through `lesson.id`.

---

## Closed Slice — Authoritative Flashcard Integration

Implemented file:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

Implementation commit:

```text
731c9d4c9b87322848b9845c952e7f8dde904ac8
Integrate authoritative lesson flashcards
```

The route now:

- preserves authoritative course → chapter → lesson resolution;
- queries flashcards only after lesson resolution;
- uses `getFlashcardsByLessonId(client, lesson.id)`;
- renders only published flashcards;
- uses authoritative `front_text` and `back_text`;
- provides retrieval-before-reveal interaction with native `<details>` / `<summary>`;
- remains a Server Component;
- introduces no client state, scheduler, repetition interval, score, mastery, adaptive sequencing, progress persistence, authentication write, new CSS, or new activity route.

GitHub Actions workflow `Verify`, run 79, completed with `success` for `731c9d4c9b87322848b9845c952e7f8dde904ac8`.

**Authoritative Flashcard Integration first slice: VERIFIED AND CLOSED.**

---

## Current Verified Learning-Activity State

The authoritative learning path now reaches a real lesson-scoped retrieval activity:

```text
/pensum
  ↓
published curriculum hierarchy
  ↓
authoritative lesson
  ↓
lesson.id
  ↓
published flashcards
  ↓
retrieval-before-reveal interaction
```

This establishes the first learning-activity seam. It does not establish distributed scheduling, learner-specific adaptation, mastery, or progress persistence.

---

## Verified Quiz Evidence

The database schema already defines `public.quiz_questions` with a required `lesson_id` foreign key to `public.lessons(id)` and fields for question, options, correct answer, explanation, publication state, and ordering.

RLS permits published quiz questions to be read by anonymous and authenticated clients only through a fully published course → chapter → lesson tree.

`lib/repositories/types.ts` already exposes typed `QuizQuestion`, `QuizQuestionInsert`, and `QuizQuestionUpdate` aliases from generated database types.

However:

```text
lib/repositories/quizQuestions.ts
```

is currently empty.

The existing:

```text
app/quiz/[slug]/page.tsx
```

is a client-side legacy quiz implementation that reads hardcoded:

```text
data/quiz.ts
```

and selects questions using a legacy topic `slug` rather than authoritative `lesson.id`.

Therefore the next dependency-correct step is not to connect the legacy quiz UI to lessons. The missing repository contract must be established first.

---

## Current Risks

### R1 – Quiz data authority gap

**Status: ACTIVE.**

The database owns authoritative lesson-scoped quiz questions, but the repository access layer is absent and the current UI still reads hardcoded legacy data.

### R2 – Learning-principle overclaim

**Status: ACTIVE.**

Flashcards and future quiz interactions are mechanisms. Their existence alone does not certify all requirements of Active Retrieval, Informative Correction, Distributed Practice, Adaptive Guidance, or Objective-Aligned Demonstration.

### R3 – Remote activity availability

**Status: OPEN.**

Current remote published flashcard and quiz-question rows have not yet been certified. Code-level contracts are separate from runtime content availability.

### R4 – Parallel legacy surfaces

**Status: ACTIVE but bounded.**

Legacy pensum and quiz routes remain repository evidence and are not yet migrated or deleted.

---

## Code Change Gate

**Product implementation: CLOSED pending bounded quiz repository inspection and file-level plan.**

No product UI change is authorized.

Repository inspection and control synchronization are allowed.

---

## Current Task

Derive the smallest repository-layer slice required to expose authoritative published quiz questions by `lesson.id` using the established repository conventions.

---

## Next Allowed Action

Inspect:

- `lib/repositories/flashcards.ts` as the nearest established sibling repository pattern;
- `lib/repositories/quizQuestions.ts`;
- `lib/repositories/types.ts`;
- generated `quiz_questions` database types as needed;
- the schema ordering and publication fields for quiz questions;
- repository error-handling conventions.

Then synchronize `PROJECT_CONTROL.md` with one bounded file-level implementation plan for the quiz repository before opening the code gate.

Do not yet modify the legacy quiz UI, authoritative lesson route, CSS, schema, progress persistence, authentication behavior, adaptive logic, mastery logic, or activity scheduling.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
