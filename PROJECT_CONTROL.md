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

The Authoritative Lesson Context, Authoritative Curriculum Entry, and first Authoritative Flashcard Integration slices are verified and closed.

Repository inspection has now derived the first bounded Quiz Authority slice: establish the missing typed repository contract for authoritative quiz questions before changing any quiz UI.

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

Quiz questions are a learning-activity mechanism attached to lessons. Repository access must preserve that ownership before UI integration is attempted.

---

## Closed Slice — Authoritative Flashcard Integration

Implementation commit:

```text
731c9d4c9b87322848b9845c952e7f8dde904ac8
Integrate authoritative lesson flashcards
```

GitHub Actions workflow `Verify`, run 79, completed with `success`.

**Authoritative Flashcard Integration first slice: VERIFIED AND CLOSED.**

---

## Verified Quiz Repository Evidence

### Database contract

Generated database types establish `quiz_questions` rows with:

- `id: string`;
- `lesson_id: string`;
- `question: string`;
- `options: string[]`;
- `correct_answer: number`;
- `explanation: string | null`;
- `is_published: boolean`;
- `sort_order: number`;
- timestamps.

`lesson_id` has a generated foreign-key relationship to `lessons.id`.

The database schema requires `lesson_id` and defines deterministic `sort_order` plus publication state.

### Existing typed aliases

`lib/repositories/types.ts` already exposes:

```text
QuizQuestion
QuizQuestionInsert
QuizQuestionUpdate
Lesson
RepositoryClient
```

No generated-type change is required.

### Established sibling repository pattern

`lib/repositories/flashcards.ts` establishes the nearest matching repository convention:

- typed imports from `lib/repositories/types`;
- `throwRepositoryError` for collection/create/update operations;
- full-list query ordered first by `lesson_id`, then `sort_order`, then a stable content field;
- lesson-scoped query constrained with `.eq("lesson_id", lessonId)`;
- single-record lookup with `.maybeSingle()`;
- typed create/update/delete functions.

Quiz questions have the same lesson-owned CRUD shape and can follow this convention without introducing a new abstraction.

### Current gap

```text
lib/repositories/quizQuestions.ts
```

is empty.

Therefore the repository layer cannot yet expose authoritative lesson-scoped quiz questions even though the schema and generated types already support them.

---

## Bounded Implementation Plan — Quiz Repository First Slice

### Exact code change

**Modify only:**

```text
lib/repositories/quizQuestions.ts
```

No UI, CSS, schema, generated type, progress, authentication, or legacy data file change is authorized in this slice.

### Required repository contract

Implement the quiz-question sibling of the established flashcard repository with exactly these responsibilities:

```text
getQuizQuestions(client)
getQuizQuestionsByLessonId(client, lessonId)
getQuizQuestionById(client, id)
createQuizQuestion(client, quizQuestion)
updateQuizQuestion(client, id, updates)
deleteQuizQuestion(client, id)
```

Use existing types:

```text
QuizQuestion
QuizQuestionInsert
QuizQuestionUpdate
Lesson
RepositoryClient
```

Use existing:

```text
throwRepositoryError
```

for the same operation classes as the flashcard repository.

### Ordering contract

`getQuizQuestions` must order by:

```text
lesson_id ASC
sort_order ASC
question ASC
```

`getQuizQuestionsByLessonId` must constrain by authoritative `lesson_id` and order by:

```text
sort_order ASC
question ASC
```

The repository must not add a second identity such as topic slug.

### Publication boundary

Do not add explicit `is_published` filtering inside the repository in this slice. Preserve the existing repository convention and database RLS responsibility. UI-level publication handling can be derived during the later lesson-integration slice.

### Explicit non-goals

Do not:

- modify `app/quiz/[slug]/page.tsx`;
- modify `data/quiz.ts`;
- modify the authoritative lesson route;
- create a new quiz route or component;
- add scoring or progress persistence;
- add authentication writes;
- add mastery, adaptive testing, scheduling, or spaced repetition;
- change schema or generated database types.

---

## Verification Contract

The repository slice is complete only when verification demonstrates:

1. only `lib/repositories/quizQuestions.ts` changed as product code;
2. all six repository functions are present;
3. lesson-scoped lookup accepts `Lesson["id"]`;
4. no slug-based quiz identity is introduced;
5. collection ordering is deterministic and follows the plan;
6. CRUD operations use generated repository types;
7. error handling follows the existing flashcard repository convention;
8. TypeScript passes;
9. Next.js build passes;
10. documentation structure verification remains passing;
11. GitHub Actions passes for the resulting branch head.

No claim about remote quiz-question row availability is implied by code-level repository verification.

---

## Current Risks

### R1 – Quiz data authority gap

**Status: ACTIVE but bounded.**

This slice establishes repository authority. UI remains legacy until a later verified integration slice.

### R2 – Legacy quiz identity

**Status: ACTIVE.**

The existing quiz route still resolves hardcoded questions by topic slug. It must not be treated as authoritative lesson-scoped quiz behavior.

### R3 – Remote quiz availability

**Status: OPEN.**

Published remote quiz-question rows have not yet been certified.

### R4 – Learning-principle overclaim

**Status: ACTIVE.**

Repository access is infrastructure for a learning mechanism; it implements no learning principle by itself.

---

## Code Change Gate

**Product implementation: OPEN ONLY for the bounded Quiz Repository first slice.**

Authorized code change:

```text
MODIFY lib/repositories/quizQuestions.ts
```

No other code file change is authorized unless verification proves this exact repository cannot compile without one; if so, stop and synchronize control before expanding scope.

---

## Current Task

Implement the authoritative typed quiz-question repository exactly as specified above.

---

## Next Allowed Action

Modify only:

```text
lib/repositories/quizQuestions.ts
```

Implement the six typed repository functions using authoritative `lesson_id`, existing generated types, established ordering, and existing repository error-handling conventions.

Then verify the resulting file and project verification. After verification, synchronize `PROJECT_CONTROL.md` before deriving quiz UI integration.

Do not modify quiz UI, lesson UI, schema, generated types, progress, authentication behavior, adaptive logic, mastery logic, scheduling, or legacy data in this slice.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
