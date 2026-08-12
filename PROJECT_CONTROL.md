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

**MVP Learning Loop Implementation — Authoritative Flashcard Integration**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The Authoritative Lesson Context and Authoritative Curriculum Entry slices are verified and closed. Repository inspection has now selected flashcards as the first dependency-correct learning-activity integration because their current database and repository ownership already attach them directly to authoritative `lesson.id`.

---

## Current Branch

```text
migration-next16-to-root
```

Latest control synchronization commit before this plan:

```text
5ce16beecea3f4212563e3ca57a415cfec91fa0b
Close authoritative curriculum entry slice
```

Verified curriculum implementation commit:

```text
10330e672ffb108c37a9fff1aa3531fa79ce208f
Add authoritative curriculum entry
```

GitHub Actions workflow `Verify`, run 76, completed successfully for that exact implementation commit.

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

This slice owns only the first bounded `Authoritative lesson context → Learning activities` seam.

The Learning Model establishes that flashcards are attached to lessons and may realize Active Retrieval, Distributed Practice, Informative Correction, or combinations depending on design. Feature presence alone is not evidence that a certified principle is fully satisfied.

---

## Verified Learning-Activity Evidence

### Flashcard data ownership

`public.flashcards` owns:

- `id`;
- `lesson_id`;
- `front_text`;
- `back_text`;
- `is_published`;
- `sort_order`;
- timestamps.

`lesson_id` is a required foreign key to `public.lessons(id)`.

The existing repository function:

```text
getFlashcardsByLessonId(client, lesson.id)
```

already returns lesson-scoped flashcards in deterministic order.

No new repository abstraction is required for the first flashcard integration slice.

### Flashcard access boundary

Row Level Security permits published flashcards to be read by both anonymous and authenticated clients only through a fully published course → chapter → lesson tree.

Therefore authentication is not required merely to read/use the first published flashcard activity. Authentication remains required later for learner-related progress persistence.

### Current flashcard UI ownership

Repository inspection found no current dedicated `/flashcards` route and no implemented flashcard activity component owning authoritative flashcard interaction.

The smallest correct ownership point is therefore the existing authoritative lesson route itself:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

### Quiz comparison

The database schema correctly attaches `quiz_questions.lesson_id` to lessons, but `lib/repositories/quizQuestions.ts` is currently empty.

The existing `/quiz/[slug]` route is a client-side legacy implementation that reads hardcoded `data/quiz.ts` and resolves questions by a legacy topic slug.

Integrating quiz first would therefore require establishing additional repository/data authority before the activity can be attached to authoritative `lesson.id`.

Flashcards are consequently the smaller dependency-correct first activity slice.

---

## Bounded Implementation Plan

### Exact product-code change

**Modify only:**

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No CSS, repository, schema, quiz, progress, legacy-route, or new component file is authorized in this slice.

### Implementation contract

Extend the existing authoritative lesson Server Component so that it:

1. imports `getFlashcardsByLessonId` from the existing flashcard repository;
2. resolves the lesson exactly as it does now before querying activities;
3. loads flashcards with `getFlashcardsByLessonId(client, lesson.id)`;
4. renders only published flashcards;
5. renders flashcards within the already-resolved lesson context rather than on a standalone activity route;
6. preserves retrieval-before-reveal behavior using native semantic HTML so the learner can attempt the prompt before exposing the answer;
7. uses authoritative `front_text` as the retrieval prompt and `back_text` as the revealed answer;
8. handles a lesson with zero published flashcards without inventing fallback content;
9. remains a Server Component with no `"use client"` directive;
10. adds no scheduler, repetition interval, score, mastery, adaptive sequencing, progress persistence, or authentication write behavior.

### Interaction decision

Use native `<details>` / `<summary>` for this first bounded activity seam.

This provides an actual retrieval-before-reveal interaction without introducing client state or a new component boundary. The activity should instruct the learner to attempt an answer before revealing the stored answer.

This mechanism is consistent with the Active Retrieval Principle when durable retention is the relevant aim, but this slice must not claim that the entire Active Retrieval Principle, Informative Correction, Distributed Practice, or another certified principle is universally or completely implemented by the existence of these flashcards.

### Styling boundary

Do not create or modify CSS in this slice. Use semantic classless markup compatible with the existing minimally styled authoritative lesson surface.

---

## Verification Contract

The slice is complete only when verification demonstrates:

1. only `app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx` changed as product code;
2. the page remains a Server Component;
3. course → chapter → lesson resolution and `notFound()` behavior remain intact;
4. flashcards are queried only after authoritative lesson resolution;
5. the query uses `lesson.id` through `getFlashcardsByLessonId`;
6. only published flashcards are rendered;
7. prompt and answer come from authoritative `front_text` and `back_text` fields;
8. the answer is not exposed until the learner chooses to reveal it through the native interaction;
9. zero flashcards does not create hardcoded fallback learning content;
10. no quiz, progress, scheduler, mastery, adaptive-learning, new CSS, or legacy-route migration code is introduced;
11. TypeScript passes;
12. Next.js build passes;
13. documentation structure verification remains passing;
14. GitHub Actions passes for the resulting branch head.

Runtime proof that specific published flashcard rows exist remains a separate remote data-state verification if code-level verification cannot establish it.

---

## Current Risks

### R1 – Remote flashcard availability

**Status: OPEN.**

The schema and repository contract are established, but current remote published flashcard rows have not yet been certified.

### R2 – Learning-principle overclaim

**Status: ACTIVE.**

Retrieval-before-reveal is a valid flashcard mechanism, but this slice does not establish spacing, learner-specific scheduling, objective-aligned demonstration, or universal pedagogical sufficiency.

### R3 – Quiz legacy identity

**Status: ACTIVE but deferred.**

The existing quiz UI still uses hardcoded legacy topic slugs and cannot yet be treated as authoritative lesson-integrated quiz behavior.

### R4 – Parallel legacy surfaces

**Status: ACTIVE but bounded.**

Legacy pensum/quiz surfaces remain repository evidence. This slice does not migrate or delete them.

---

## Code Change Gate

**Product implementation: OPEN ONLY for the bounded Authoritative Flashcard Integration first slice.**

Authorized product-code change:

```text
MODIFY app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No other product-code file change is authorized unless verification proves this exact slice cannot compile without one; if so, stop and synchronize control before expanding scope.

---

## Current Task

Integrate authoritative lesson-scoped flashcards into the authoritative lesson route exactly as specified above.

---

## Next Allowed Action

Modify only:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

Load published flashcards through `getFlashcardsByLessonId(client, lesson.id)` and render them as a retrieval-before-reveal activity inside the authoritative lesson context using native semantic HTML.

Then verify the resulting file and project verification. After verification, synchronize `PROJECT_CONTROL.md` before selecting the next implementation slice.

Do not implement quiz integration, progress persistence, authentication writes, spaced repetition, adaptive sequencing, mastery logic, new CSS, new activity routes, or legacy-route deletion in this slice.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
