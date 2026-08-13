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

**MVP Learning Loop Implementation — Authoritative Quiz Data Prerequisite Resolution**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The following bounded slices are verified and closed:

* Authoritative Lesson Context;
* Authoritative Curriculum Entry;
* Authoritative Flashcard Integration;
* Quiz Repository first slice;
* Authoritative Quiz Activity first slice;
* Authoritative Quiz Runtime Data Verification.

The runtime verification established that the authoritative quiz UI has no remote quiz-question data available to render.

The next unresolved dependency is therefore not product-code behavior. It is the absence of authoritative quiz-question data.

---

## Current Branch

```text
migration-next16-to-root
```

Latest verified repository checkpoint before this control synchronization:

```text
044381c
Complete documentation index governance
```

Verified Authoritative Quiz Activity implementation commit:

```text
1d441497213d7caf1c30710ec6c1caca4865d9d8
Integrate authoritative lesson quiz activity
```

GitHub Actions workflow `Verify`, run 86, completed successfully for that implementation commit.

Working tree was verified clean immediately before this control synchronization.

---

## Product Authority

Permanent product authority remains:

* `docs/product/PRODUCT_VISION.md`;
* `docs/product/LEARNING_MODEL.md`;
* `docs/product/mvp.md`.

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

Features are mechanisms; Learning Principles are authority. No single feature may overclaim realization of a Learning Principle.

Authoritative quiz content must remain lesson-scoped and must derive from authoritative curriculum content rather than from legacy quiz data or invented fallback content.

---

## Verified Authoritative Quiz Activity First Slice

The authoritative lesson route remains the Server Component ownership point for course → chapter → lesson resolution.

After authoritative lesson resolution it loads lesson-scoped quiz questions through:

```text
getQuizQuestionsByLessonId(client, lesson.id)
```

Published quiz questions are filtered server-side and passed as serializable data to:

```text
components/AuthoritativeQuizQuestion.tsx
```

The client component owns only bounded per-question interaction:

* answer selection;
* check/reveal state;
* correctness reveal;
* stored explanation reveal;
* local reset/retry.

It performs no Supabase/network access and introduces no score, progress persistence, mastery, adaptive logic, scheduling, new route, or legacy quiz dependency.

The implementation can support Active Retrieval through an active response before reveal. Stored correctness/explanation can support Informative Correction when the content is sufficient. No broader learning-principle claim is certified by this slice.

---

## Verified Authoritative Quiz Runtime Data State

The bounded runtime-data verification is complete.

The linked Supabase project is:

```text
TheraLearn
reference: upjlofediaqhtdcipiau
region: eu-west-1
```

During inspection the remote project was found paused:

```text
status: INACTIVE
```

Supabase Dashboard independently confirmed:

```text
Project "TheraLearn" is paused
```

The existing project was resumed without creating a new project or changing schema or product code.

Supabase Dashboard subsequently verified:

```text
STATUS
Healthy
```

The restored project URL remained:

```text
https://upjlofediaqhtdcipiau.supabase.co
```

Runtime REST inspection using the project's configured public Supabase credentials returned:

```json
[]
```

for published `quiz_questions`.

A second runtime REST inspection without the published filter also returned:

```json
[]
```

Because runtime access is subject to RLS, those results alone were not treated as proof that the physical table contained zero rows.

The linked remote database was therefore queried directly through the Supabase Management API using the installed CLI:

```text
supabase db query --linked
```

The definitive read-only database query was:

```sql
select count(*) as quiz_question_count
from public.quiz_questions;
```

Verified result:

```text
quiz_question_count
-------------------
0
```

Therefore:

**`public.quiz_questions` contains exactly zero remote rows.**

No published quiz-question rows exist.

No `lesson_id` relationships exist to verify because there are no quiz-question rows.

The absence of the authoritative quiz section at runtime is therefore a verified data-state result and not a product-code or UI defect.

---

## Verification State

### Authoritative Quiz Activity first slice

**CLOSED**

Verified implementation commit:

```text
1d441497213d7caf1c30710ec6c1caca4865d9d8
```

Verified GitHub Actions result:

```text
Verify #86
status: completed
conclusion: success
```

### Authoritative Quiz Runtime Data Verification

**CLOSED**

Verified findings:

```text
Supabase project: restored and Healthy
public.quiz_questions row count: 0
published quiz rows: 0
verified quiz → lesson relationships: none exist
```

The verification establishes that the next quiz dependency is authoritative data availability.

No product-code defect has been established by this inspection.

---

## Current Risks

### R1 – Remote quiz availability

**Status: VERIFIED DATA PREREQUISITE — BLOCKING QUIZ RUNTIME CONTENT.**

The remote authoritative table:

```text
public.quiz_questions
```

contains zero rows.

The authoritative quiz UI therefore has no authoritative question data to render.

This is not evidence of a UI defect.

The next response must address the missing authoritative data prerequisite without introducing fallback content, legacy quiz coupling, or unnecessary product-code changes.

### R2 – Informative correction quality

**Status: OPEN by content.**

The schema and UI support stored explanations, but whether a particular explanation provides sufficient correction depends on actual question content and learner error.

This risk cannot be evaluated against runtime quiz content until authoritative quiz-question data exists.

### R3 – Legacy quiz identity

**Status: ACTIVE but isolated.**

Legacy `/quiz/[slug]`, `data/quiz.ts`, and legacy quiz orchestration remain outside the authoritative integration.

Legacy quiz content must not be reused merely to fill the authoritative data gap unless separately established as valid product authority.

### R4 – Multi-question orchestration

**Status: DEFERRED.**

No score, sequence, result state, or progression across questions has been authorized.

The absence of quiz data does not authorize expansion into orchestration.

### R5 – Supabase project pausing

**Status: OBSERVED OPERATIONAL CONDITION.**

The linked Supabase project was found paused during runtime verification and was manually resumed.

The project returned to Healthy state with the existing project reference and data model intact.

This operational condition does not currently authorize infrastructure redesign.

---

## Code Change Gate

**Product implementation: PAUSED pending authoritative quiz data prerequisite resolution.**

No product-code change is currently authorized.

No schema change is currently authorized.

No legacy quiz integration is authorized.

Read-only curriculum/data inspection may proceed.

The next bounded inspection must identify a valid authoritative course → chapter → lesson target and the lesson content from which an initial authoritative quiz-question data slice could be derived.

Any data insertion must remain unauthorized until that target and content basis have been verified and this control gate explicitly permits the write.

---

## Current Task

Resolve the verified authoritative quiz data prerequisite without changing product code or schema.

The immediate task is to identify a bounded authoritative lesson target suitable for the first quiz-question data slice.

The inspection must establish:

1. an existing published authoritative course;
2. an existing published chapter belonging to that course;
3. an existing published lesson belonging to that chapter;
4. the authoritative lesson content and learning objectives that can ground quiz-question content;
5. that no legacy quiz source is required for the bounded first data slice.

No quiz-question row is to be created during this inspection.

---

## Next Allowed Action

Perform a bounded read-only inspection of the remote authoritative curriculum to select the first quiz-data target:

1. inspect published `courses`;
2. inspect their published `chapters`;
3. inspect published `lessons` belonging to those chapters;
4. select one existing authoritative lesson;
5. inspect that lesson's title, summary, learning objectives, and content;
6. make no product-code, schema, or database-data change during this inspection;
7. synchronize `PROJECT_CONTROL.md` again if the verified curriculum state materially changes the intended data slice.

After a lesson target and authoritative content basis are verified, the next gate may decide whether a minimal authoritative quiz-question data write is permitted.

Do not invent fallback quiz content.

Do not expand legacy quiz scope.

Do not authorize scoring, progress persistence, mastery, adaptive logic, scheduling, or multi-question orchestration as part of resolving this prerequisite.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
