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

**MVP Learning Loop Implementation — Authoritative Curriculum Data Prerequisite Resolution**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The following bounded slices are verified and closed:

* Authoritative Lesson Context;
* Authoritative Curriculum Entry;
* Authoritative Flashcard Integration;
* Quiz Repository first slice;
* Authoritative Quiz Activity first slice;
* Authoritative Quiz Runtime Data Verification;
* Authoritative Curriculum Runtime Availability Inspection.

The runtime verification first established that no remote authoritative quiz-question rows exist.

The subsequent bounded curriculum inspection established a broader prerequisite: the remote authoritative curriculum itself currently contains no course rows.

The next unresolved dependency is therefore authoritative curriculum data availability rather than product-code behavior.

---

## Current Branch

```text
migration-next16-to-root
```

Latest verified repository checkpoint:

```text
cde4534
Enforce repository index completeness
```

Verified Authoritative Quiz Activity implementation commit:

```text
1d441497213d7caf1c30710ec6c1caca4865d9d8
Integrate authoritative lesson quiz activity
```

GitHub Actions workflow `Verify`, run 86, completed successfully for that implementation commit.

The working tree was verified clean immediately before this control synchronization.

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

Authoritative learning activity data must remain grounded in authoritative curriculum content.

Legacy static curriculum or quiz content must not automatically be promoted into authoritative runtime data merely because the remote authoritative tables are empty.

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

## Verified Remote Runtime Data State

The linked Supabase project is:

```text
TheraLearn
reference: upjlofediaqhtdcipiau
region: eu-west-1
```

During the runtime-data inspection the project was initially found paused:

```text
status: INACTIVE
```

Supabase Dashboard independently confirmed that the project was paused.

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

---

## Verified Authoritative Quiz Runtime Data State

Runtime REST inspection returned no published `quiz_questions`.

A second runtime REST inspection without the published filter also returned no rows visible through runtime access.

Because runtime access is subject to RLS, those results alone were not treated as proof that the physical table contained zero rows.

The linked remote database was therefore queried directly through the Supabase Management API.

Definitive read-only query:

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

## Verified Authoritative Curriculum Runtime Availability

After closing Authoritative Quiz Runtime Data Verification, the next bounded action attempted to select an existing published authoritative course → chapter → lesson target for the first quiz-data slice.

The linked remote database was queried directly through the Supabase Management API.

The first definitive course query was:

```sql
select count(*) as published_course_count
from public.courses
where is_published = true;
```

Verified result:

```text
published_course_count
----------------------
0
```

A second definitive query checked whether unpublished course rows existed:

```sql
select count(*) as total_course_count
from public.courses;
```

Verified result:

```text
total_course_count
------------------
0
```

Therefore:

**`public.courses` contains exactly zero remote rows.**

This means:

* no published authoritative course exists remotely;
* no unpublished authoritative course exists remotely;
* no remote course can currently anchor a course → chapter → lesson curriculum chain;
* the previously selected quiz-data target inspection cannot proceed as written.

Because the parent curriculum entity does not exist, the inspection stopped before treating chapters or lessons as candidate quiz targets.

No database data was written during the inspection.

No product code or schema was changed.

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

### Authoritative Curriculum Runtime Availability Inspection

**CLOSED**

Verified findings:

```text
public.courses total row count: 0
public.courses published row count: 0
existing authoritative course target: none
existing authoritative curriculum chain target: none
```

The runtime-data problem is therefore broader than missing quiz-question rows.

The current blocker is authoritative curriculum data availability.


### Repository Index Completeness Verification

**CLOSED**

Verified checkpoint:

```text
cde4534
Enforce repository index completeness
```

Verified clean-checkpoint result:

```text
TypeScript Check: PASS
Build: PASS
Documentation Check: PASS
Repository Index: PASS
Git Status: PASS
Overall: PASS

Tracked files: 231
Indexed files: 231
```

The repository index is now protected by a permanent completeness gate.


---

## Current Risks

### R1 – Authoritative curriculum availability

**Status: VERIFIED DATA PREREQUISITE — BLOCKING AUTHORITATIVE RUNTIME CURRICULUM.**

The remote authoritative table:

```text
public.courses
```

contains zero rows.

There is therefore no existing remote authoritative course from which a chapter → lesson target can currently be selected.

This is a data-state finding and not evidence of a product-code defect.

### R2 – Remote quiz availability

**Status: VERIFIED DOWNSTREAM DATA PREREQUISITE.**

The remote authoritative table:

```text
public.quiz_questions
```

contains zero rows.

This remains a real prerequisite, but quiz data is downstream of the now-verified missing authoritative curriculum prerequisite.

Quiz-question creation must not be selected before its authoritative curriculum parent chain is established.

### R3 – Informative correction quality

**Status: OPEN by content.**

The schema and UI support stored explanations, but whether a particular explanation provides sufficient correction depends on actual question content and learner error.

This risk cannot be evaluated against runtime quiz content until authoritative curriculum and quiz-question data exist.

### R4 – Legacy content identity

**Status: ACTIVE and isolated.**

Legacy/static curriculum and quiz sources remain outside the authoritative runtime data chain.

Their existence must not be treated as automatic authority for remote database population.

Any future use of existing static content as a source for authoritative data requires a separately verified authority decision.

### R5 – Multi-question orchestration

**Status: DEFERRED.**

No score, sequence, result state, or progression across questions has been authorized.

The absence of runtime data does not authorize expansion into orchestration.

### R6 – Supabase project pausing

**Status: OBSERVED OPERATIONAL CONDITION.**

The linked Supabase project was found paused during runtime verification and was manually resumed.

The project returned to Healthy state with the existing project reference and schema intact.

This operational condition does not currently authorize infrastructure redesign.

---

## Code Change Gate

**Product implementation: PAUSED pending authoritative curriculum data prerequisite resolution.**

No product-code change is currently authorized.

No schema change is currently authorized.

No database-data write is currently authorized.

No legacy/static content transfer is currently authorized.

Read-only authority and data-source inspection may proceed.

Before any authoritative curriculum data can be written, the project must establish a verified source and bounded content basis for the first course → chapter → lesson data slice.

The existence of empty remote tables is not by itself authorization to invent or migrate content.

---

## Current Task

Establish the missing permanent authority for authoritative curriculum content before any curriculum data is transferred to Supabase.

The bounded authority inspection is complete and established that no existing repository source has sufficient authority to serve as the source of truth for the first course → chapter → lesson data slice.

Verified findings:

1. permanent product authority defines the curriculum model and MVP boundary, but not concrete course, chapter, or lesson content;
2. `data/pensum.ts` and `app/pensum/[slug]/page.tsx` contain competing legacy/static versions of the same curriculum identity;
3. neither legacy/static source may be promoted automatically;
4. presentation-layer placement or current UI usage does not create content authority;
5. Supabase storage does not create content authority;
6. no third concrete curriculum-content source was identified;
7. the repository therefore has a verified governance gap: no permanent ownership unit currently owns authoritative curriculum content.

The immediate task is to establish that missing permanent curriculum-content authority and its correct information placement.

No curriculum content is to be invented, selected between competing legacy sources, combined from those sources, transferred to Supabase, or written remotely during this authority-establishment step.

---

## Next Allowed Action

Perform a bounded governance and information-placement resolution for authoritative curriculum content:

1. determine the permanent ownership unit that must own concrete authoritative curriculum content;
2. place that ownership within the existing product-authority structure without duplicating authority;
3. define the boundary between permanent curriculum-content authority and runtime Supabase representation;
4. define how a future bounded course → chapter → lesson slice becomes authorized for transfer;
5. preserve the rule that legacy/static files cannot acquire authority from technical placement, UI usage, or convenience;
6. make no product-code, schema, or database-data change during this resolution;
7. synchronize the resulting permanent authority decision before authorizing any remote curriculum-data write.

Do not choose between `data/pensum.ts` and `app/pensum/[slug]/page.tsx` merely because one is easier to migrate.

Do not combine the competing legacy/static sources into a new curriculum version.

Do not invent curriculum content.

Do not populate remote tables merely to satisfy runtime rendering.

Do not expand legacy quiz scope.

Do not authorize scoring, progress persistence, mastery, adaptive logic, scheduling, or multi-question orchestration as part of resolving this authority gap.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
