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

**MVP Learning Loop Implementation — Authoritative Lesson Context**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged. The dependency-correct next implementation responsibility is Authoritative Lesson Context Integration.

The bounded file-level implementation plan has now been derived from current repository evidence.

---

## Current Branch

```text
migration-next16-to-root
```

---

## Product Authority

Permanent product authority for this implementation slice is:

- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

The implementation must preserve lesson as the central current learning-context unit and must not equate feature presence with satisfaction of a certified learning principle.

---

## Verified Implementation Evidence

### Repository hierarchy

The repository layer already exposes the exact hierarchy required to resolve authoritative lesson context:

- `getCourseBySlug(client, slug)` resolves a course by globally routed course slug;
- `getChapterBySlug(client, courseId, slug)` resolves a chapter within its parent course;
- `getLessonBySlug(client, chapterId, slug)` resolves a lesson within its parent chapter.

This means lesson slugs are context-dependent rather than globally sufficient. The natural authoritative route identity is therefore hierarchical:

```text
course slug + chapter slug + lesson slug
```

### Lesson data authority

The `lessons` table already owns:

- `id`;
- `chapter_id`;
- `slug`;
- `title`;
- `summary`;
- `content`;
- `learning_objectives`;
- `sort_order`;
- `is_published`.

Lesson `id` is already the foreign-key authority used by both `flashcards.lesson_id`, `quiz_questions.lesson_id`, and `lesson_progress.lesson_id`.

Therefore the authoritative lesson surface should expose a database-resolved `lesson.id` as the future integration key rather than deriving identity from the current hardcoded topic slug.

### Server boundary

`lib/supabase/server.ts` provides an async typed server `createClient()` using `@supabase/ssr` and Next cookies.

The authoritative lesson route can therefore remain a Server Component and call repository functions directly without introducing a new client-side data layer.

### Current pensum routes

`app/pensum/page.tsx` is currently a placeholder and does not expose authoritative curriculum entities.

`app/pensum/[slug]/page.tsx` is a substantial hardcoded topic page. Its single slug identifies a local in-file object rather than the database course/chapter/lesson hierarchy.

Reinterpreting that single slug as an authoritative lesson would be ambiguous and would preserve the parallel identity model. It should not be silently converted in place.

---

## Bounded Implementation Plan

### Route ownership decision

Create a new hierarchical authoritative lesson route:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

This route mirrors the existing repository identity constraints and preserves curriculum context explicitly in the URL.

The existing `app/pensum/[slug]/page.tsx` remains untouched in this first slice. It is legacy/hardcoded implementation evidence and must not be silently promoted to database authority.

### Exact first-slice file change

**Create only:**

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No existing product file is modified in the first slice.

### Route resolution algorithm

The new Server Component must:

1. await `params` for `courseSlug`, `chapterSlug`, and `lessonSlug`;
2. create the typed Supabase server client with `createClient()` from `lib/supabase/server.ts`;
3. resolve the course with `getCourseBySlug`;
4. call `notFound()` if the course does not exist or is not published;
5. resolve the chapter with `getChapterBySlug(client, course.id, chapterSlug)`;
6. call `notFound()` if the chapter does not exist or is not published;
7. resolve the lesson with `getLessonBySlug(client, chapter.id, lessonSlug)`;
8. call `notFound()` if the lesson does not exist or is not published;
9. render the resolved course/chapter/lesson context using authoritative database fields only.

### First-slice presentation boundary

The route should render only enough information to prove the authoritative seam:

- course title;
- chapter title;
- lesson title;
- lesson summary when present;
- lesson learning objectives;
- lesson content.

It must not yet:

- load or render flashcards;
- load or render quiz questions;
- write learner progress;
- introduce a scheduler, mastery rule, adaptive-learning mechanism, or new learning algorithm;
- migrate or delete the existing hardcoded pensum route;
- redesign the broader pensum navigation.

### Styling decision

Do not create a new CSS module in this first seam-establishment slice unless required for compilation. Prefer semantic unstyled/minimally classless markup over copying the hardcoded legacy page styles, because copying those styles would enlarge the change without helping establish authority.

A later bounded UI-integration slice can deliberately align the authoritative route with the product design system.

---

## Verification Contract

The slice is complete only when repository inspection/build verification demonstrates:

1. the new route is a Server Component and contains no `"use client"` directive;
2. it uses `createClient()` from the server Supabase boundary;
3. it resolves course → chapter → lesson through the existing repository functions;
4. parent IDs constrain child slug resolution;
5. unpublished or missing course/chapter/lesson states return `notFound()`;
6. rendered learning objectives and content come from the resolved lesson record;
7. no flashcard, quiz, or progress code is introduced;
8. TypeScript passes;
9. Next.js build passes;
10. documentation structure verification remains passing.

No requirement in this slice claims that the database currently contains a specific seed lesson. Runtime content availability is a separate data-state verification after the route seam exists.

---

## Current Risks

### R1 – Parallel identity models

**Status: ACTIVE but bounded.**

The new route establishes the authoritative hierarchy without deleting the old hardcoded route. A later migration decision must determine how navigation transitions from legacy topic slugs to authoritative curriculum URLs.

### R2 – Database content availability

**Status: OPEN.**

The schema and repository contract are verified, but this planning step does not establish that the remote database currently contains published course/chapter/lesson rows suitable for the new route.

### R3 – Learning-principle implementation drift

**Status: ACTIVE.**

This slice establishes context only. It does not claim to implement Active Retrieval, Informative Correction, Distributed Practice, Adaptive Guidance, or Objective-Aligned Demonstration by itself.

### R4 – Branch divergence

**Status: OPEN.**

---

## Code Change Gate

**Product implementation: OPEN ONLY for the bounded Authoritative Lesson Context first slice.**

Authorized file change:

```text
CREATE app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No other product-code file change is authorized unless verification proves that this exact slice cannot compile without one; in that case stop and synchronize control before expanding scope.

---

## Current Task

Implement the single authorized authoritative lesson route exactly as specified above.

---

## Next Allowed Action

Create:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

using the existing server Supabase client and course/chapter/lesson repository functions.

Then verify the resulting file and run the available repository verification appropriate to the change. Do not add flashcards, quiz integration, progress persistence, new styling files, or navigation migration in this slice.

After verification, synchronize `PROJECT_CONTROL.md` before selecting the next implementation slice.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
