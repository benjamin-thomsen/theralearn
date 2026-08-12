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

The Authoritative Lesson Context, Authoritative Curriculum Entry, Authoritative Flashcard Integration, and Quiz Repository first slices are now verified and closed.

The next dependency-correct responsibility is to derive the smallest quiz activity UI that uses authoritative lesson-scoped quiz questions without reusing legacy topic-slug identity.

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

Flashcards are already integrated as the first authoritative lesson-scoped activity. Quiz data access is now authoritative at the repository layer and is ready for bounded UI derivation.

---

## Closed Slice — Quiz Repository First Slice

Implemented file:

```text
lib/repositories/quizQuestions.ts
```

Implementation commit:

```text
25bafe7513f1796790f3c7cb357495fd55822eb3
Add authoritative quiz question repository
```

The repository now provides:

```text
getQuizQuestions(client)
getQuizQuestionsByLessonId(client, lessonId)
getQuizQuestionById(client, id)
createQuizQuestion(client, quizQuestion)
updateQuizQuestion(client, id, updates)
deleteQuizQuestion(client, id)
```

The implementation:

- uses generated `QuizQuestion`, `QuizQuestionInsert`, and `QuizQuestionUpdate` types;
- uses `Lesson["id"]` for lesson-scoped lookup;
- introduces no slug-based quiz identity;
- follows the established flashcard repository error-handling convention;
- orders full collections by `lesson_id`, `sort_order`, then `question`;
- orders lesson-scoped collections by `sort_order`, then `question`;
- changes no schema, generated types, UI, progress behavior, authentication behavior, or legacy quiz data.

GitHub Actions workflow `Verify`, run 82, completed with `success` for `25bafe7513f1796790f3c7cb357495fd55822eb3`.

**Quiz Repository first slice: VERIFIED AND CLOSED.**

---

## Current Verified Quiz State

The authoritative data path now exists:

```text
authoritative lesson
  ↓
lesson.id
  ↓
getQuizQuestionsByLessonId(client, lesson.id)
  ↓
public.quiz_questions
```

The UI path does not yet exist.

The existing `app/quiz/[slug]/page.tsx` remains a client-side legacy activity using hardcoded `data/quiz.ts` and topic-slug identity. It must not be treated as the authoritative integration target without explicit derivation.

---

## Current Risks

### R1 – Quiz UI ownership

**Status: ACTIVE.**

Authoritative quiz data access now exists, but the smallest correct UI ownership boundary has not yet been selected.

### R2 – Client/server responsibility boundary

**Status: ACTIVE.**

Quiz interaction requires learner selection/reveal behavior, while authoritative data access should remain server-owned. The integration must preserve this responsibility split rather than moving Supabase data authority into an unnecessary client fetch.

### R3 – Legacy quiz identity

**Status: ACTIVE.**

The existing `/quiz/[slug]` route uses hardcoded topic slugs. It must not silently become a second authoritative identity model.

### R4 – Remote quiz availability

**Status: OPEN.**

Published remote quiz-question rows have not yet been certified.

### R5 – Learning-principle overclaim

**Status: ACTIVE.**

A multiple-choice quiz can support retrieval and informative correction depending on interaction design, but its existence alone does not certify objective-aligned demonstration, mastery, adaptation, or durable learning.

---

## Code Change Gate

**Product implementation: CLOSED pending bounded authoritative quiz UI inspection and file-level plan.**

No product-code change is currently authorized.

Repository inspection and control synchronization are allowed.

---

## Current Task

Derive the smallest dependency-correct UI slice that lets a learner answer authoritative quiz questions inside an authoritative lesson context while preserving server-owned data resolution and bounded client-owned interaction state.

---

## Next Allowed Action

Inspect:

- `app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx` as the authoritative lesson ownership point;
- `app/quiz/[slug]/page.tsx` only as interaction-pattern evidence, not authority;
- `app/quiz/[slug]/page.module.css` only if needed to understand whether any existing presentation can be reused without importing legacy identity;
- `lib/repositories/quizQuestions.ts` as authoritative data access;
- relevant existing component boundaries under `components/` to determine whether a client interaction component already owns quiz behavior;
- whether a new narrowly scoped client component is required to preserve the Server Component lesson route while enabling answer selection and correction reveal.

Then synchronize `PROJECT_CONTROL.md` with exactly one bounded file-level quiz UI implementation plan before reopening the code gate.

Do not modify legacy quiz data or route, progress persistence, authentication writes, schema, adaptive testing, mastery logic, scheduling, or broad styling during inspection.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
