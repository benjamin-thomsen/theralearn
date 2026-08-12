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

**MVP Learning Loop Implementation — Authoritative Quiz Activity Integration**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The Authoritative Lesson Context, Authoritative Curriculum Entry, Authoritative Flashcard Integration, and Quiz Repository first slices are verified and closed.

Bounded UI inspection has now established the smallest dependency-correct Server/Client responsibility split for authoritative quiz activity.

---

## Current Branch

```text
migration-next16-to-root
```

Verified quiz repository implementation commit:

```text
25bafe7513f1796790f3c7cb357495fd55822eb3
Add authoritative quiz question repository
```

GitHub Actions workflow `Verify`, run 82, completed successfully for that exact commit.

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

Quiz questions are lesson-scoped learning activities. Data identity and resolution remain server-owned; answer selection and correction reveal are bounded client interaction responsibilities.

---

## Verified Quiz UI Evidence

### Authoritative lesson ownership

`app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx` is an async Server Component that already owns authoritative course → chapter → lesson resolution and lesson-scoped flashcard loading.

It is therefore the correct server ownership point for loading quiz questions by `lesson.id`.

### Authoritative quiz data access

`lib/repositories/quizQuestions.ts` now exposes:

```text
getQuizQuestionsByLessonId(client, lesson.id)
```

No client-side Supabase fetch is required.

### Legacy quiz route

`app/quiz/[slug]/page.tsx` is a client-side legacy route that:

- derives identity from a topic slug;
- reads hardcoded `data/quiz.ts`;
- owns multi-question score/progress/result state;
- links back to the legacy quiz overview.

It is useful only as interaction-pattern evidence and must not be reused as authoritative route or identity.

### Existing QuizCard component

`components/QuizCard.tsx` is already a client component with bounded per-question answer-selection and reveal state, but it imports the legacy `QuizQuestion` type from `data/quiz` and expects camelCase `correctAnswer` rather than the authoritative database `correct_answer` field.

Its responsibility shape is useful, but modifying it would risk coupling legacy and authoritative quiz models together.

No existing component cleanly owns authoritative database quiz-question interaction.

### Derived responsibility boundary

The smallest correct boundary is:

```text
Authoritative lesson Server Component
  ↓ resolves lesson.id
  ↓ loads published quiz questions server-side
  ↓ passes serializable authoritative question data
New narrow Client Component
  ↓ owns selected answer
  ↓ owns checked/revealed state
  ↓ renders correctness + stored explanation
```

This preserves server data authority and client interaction responsibility without creating a new route or migrating legacy quiz behavior.

---

## Bounded Implementation Plan — Authoritative Quiz Activity First Slice

### Exact code changes

Authorize exactly two product-code files:

```text
CREATE components/AuthoritativeQuizQuestion.tsx
MODIFY app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No CSS file is authorized. No legacy quiz file is authorized.

### Server Component contract

Modify the authoritative lesson route so that it:

1. imports `getQuizQuestionsByLessonId`;
2. loads quiz questions only after authoritative lesson resolution using `lesson.id`;
3. filters to published quiz questions before rendering;
4. preserves all existing lesson and flashcard behavior;
5. renders no quiz section when there are zero published quiz questions;
6. passes each authoritative quiz question to the new client component;
7. remains a Server Component and does not add `"use client"`;
8. performs no score, progress, mastery, scheduling, or authentication write behavior.

### Client Component contract

Create:

```text
components/AuthoritativeQuizQuestion.tsx
```

The component must:

1. include `"use client"`;
2. accept only the serializable fields needed for one authoritative question:
   - `id`;
   - `question`;
   - `options`;
   - `correct_answer`;
   - `explanation`;
3. own only per-question local interaction state:
   - selected option index;
   - whether the answer has been checked;
4. require the learner to select an option before checking;
5. prevent answer changes after checking until reset;
6. reveal whether the selected answer is correct only after checking;
7. reveal the stored explanation after checking when an explanation exists;
8. allow a local reset/retry of that question;
9. persist nothing;
10. perform no Supabase/network access;
11. calculate no cross-question score or mastery claim;
12. use semantic classless markup / minimal inline presentation only, with no new CSS file.

### Learning-principle boundary

The interaction creates an active response before correctness reveal and can support Active Retrieval. Revealing correctness plus the stored explanation can support Informative Correction when the explanation is sufficient for the specific error/context.

This slice must not claim universal satisfaction of either principle and must not claim Objective-Aligned Demonstration, mastery, Distributed Practice, or Adaptive Guidance.

### Explicit non-goals

Do not modify:

```text
app/quiz/[slug]/page.tsx
data/quiz.ts
components/QuizCard.tsx
```

Do not create a new quiz route, quiz overview, CSS file, result page, scoring system, progress persistence, authentication write, mastery threshold, adaptive testing, scheduler, or spaced-repetition behavior.

---

## Verification Contract

The slice is complete only when verification demonstrates:

1. exactly one new product-code file is created: `components/AuthoritativeQuizQuestion.tsx`;
2. the only existing product-code file modified is the authoritative lesson route;
3. lesson route remains a Server Component;
4. quiz questions are loaded server-side only after authoritative lesson resolution;
5. lookup uses `getQuizQuestionsByLessonId(client, lesson.id)`;
6. only published quiz questions are passed to UI;
7. zero published questions renders no invented quiz fallback content;
8. client component performs no data fetch;
9. client state is bounded to one question's selection/check/reset interaction;
10. correctness is hidden until check;
11. stored explanation is revealed only after check when present;
12. no legacy topic slug or `data/quiz.ts` dependency is introduced;
13. no score, progress persistence, mastery, adaptive logic, scheduling, new route, or new CSS is introduced;
14. TypeScript passes;
15. Next.js build passes;
16. documentation structure verification remains passing;
17. GitHub Actions passes for the resulting branch head.

Remote published quiz-row availability remains a separate runtime data-state question.

---

## Current Risks

### R1 – Remote quiz availability

**Status: OPEN.**

Published remote quiz-question rows have not yet been certified.

### R2 – Informative correction quality

**Status: OPEN by content.**

The schema supports explanations, but whether a particular explanation is sufficient correction depends on actual question content and learner error. UI presence alone cannot certify this principle.

### R3 – Legacy quiz identity

**Status: ACTIVE but isolated.**

Legacy `/quiz/[slug]` remains in the repository but is not part of the authoritative integration.

### R4 – Multi-question orchestration

**Status: DEFERRED.**

This first slice intentionally does not introduce score, sequence, result state, or progression across questions.

---

## Code Change Gate

**Product implementation: OPEN ONLY for the bounded Authoritative Quiz Activity first slice.**

Authorized changes:

```text
CREATE components/AuthoritativeQuizQuestion.tsx
MODIFY app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

No other product-code file change is authorized unless verification proves this exact slice cannot compile without one; if so, stop and synchronize control before expanding scope.

---

## Current Task

Implement authoritative per-question quiz interaction inside authoritative lesson context exactly as specified above.

---

## Next Allowed Action

Create `components/AuthoritativeQuizQuestion.tsx`, then modify the authoritative lesson route to load published questions through `getQuizQuestionsByLessonId(client, lesson.id)` and render the new bounded client component.

Then verify both files and project verification. After verification, synchronize `PROJECT_CONTROL.md` before selecting the next slice.

Do not modify legacy quiz files, progress persistence, authentication writes, schema, scoring, mastery, adaptive testing, scheduling, broad styling, or activity routing in this slice.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
