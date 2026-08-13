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

**MVP Learning Loop Implementation — Authoritative Quiz Runtime Data Verification**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The following bounded slices are verified and closed:

- Authoritative Lesson Context;
- Authoritative Curriculum Entry;
- Authoritative Flashcard Integration;
- Quiz Repository first slice;
- Authoritative Quiz Activity first slice.

The next unresolved dependency is runtime data availability: whether published authoritative quiz-question rows actually exist remotely for lesson-scoped rendering.

---

## Current Branch

```text
migration-next16-to-root
```

Verified Authoritative Quiz Activity implementation commit:

```text
1d441497213d7caf1c30710ec6c1caca4865d9d8
Integrate authoritative lesson quiz activity
```

GitHub Actions workflow `Verify`, run 86, completed successfully for that exact commit.

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

Features are mechanisms; Learning Principles are authority. No single feature may overclaim realization of a Learning Principle.

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

- answer selection;
- check/reveal state;
- correctness reveal;
- stored explanation reveal;
- local reset/retry.

It performs no Supabase/network access and introduces no score, progress persistence, mastery, adaptive logic, scheduling, new route, or legacy quiz dependency.

The implementation can support Active Retrieval through an active response before reveal. Stored correctness/explanation can support Informative Correction when the content is sufficient. No broader learning-principle claim is certified by this slice.

---

## Governance Checkpoint — Documentation Index Automation

The bounded **Project Governance — Documentation Index Automation** task is **CLOSED**.

Verified governance outcomes:

- `INDHOLDSFORTEGNELSE.md` is generated deterministically from Git-tracked repository files through the Developer Toolkit;
- the generated index is explicitly a repository navigation map and does not replace project, domain, or implementation authority;
- `PROJECT_HANDBOOK.md` routes working sessions through `INDHOLDSFORTEGNELSE.md` after `PROJECT_CONTROL.md` and before the relevant domain authority;
- Developer Toolkit verification now includes an explicit TypeScript Check PASS/FAIL result;
- `edit` preserves existing file contents, while `replace` remains the explicit destructive replacement command;
- obsolete Git-tracked repository artifacts `-name package-lock.json` and `projektstruktur.txt` were identified through the generated index and removed from the bounded governance change;
- the index is generated from 234 Git-tracked repository files, excluding `INDHOLDSFORTEGNELSE.md` itself from the generator input;
- complete Developer Toolkit verification passed: TypeScript Check PASS, Build PASS, Documentation Check PASS, Git Status PASS, Overall PASS.

The governance task introduced no product-code or schema change and did not change the MVP boundary.

The temporary governance detour is complete. Work therefore resumes at the already-authorized product phase: **MVP Learning Loop Implementation — Authoritative Quiz Runtime Data Verification**.

---

## Verification State

Authoritative Quiz Activity first slice is **CLOSED**.

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

The successful workflow certifies the repository verification gate for the implementation commit.

---

## Current Risks

### R1 – Remote quiz availability

**Status: OPEN and now blocking the next quiz integration decision.**

Published remote quiz-question rows have not yet been certified. The authoritative UI correctly renders no quiz section when zero published questions are available, so runtime data state must be verified before deciding whether any further product-code change is necessary.

### R2 – Informative correction quality

**Status: OPEN by content.**

The schema and UI support stored explanations, but whether a particular explanation provides sufficient correction depends on actual question content and learner error.

### R3 – Legacy quiz identity

**Status: ACTIVE but isolated.**

Legacy `/quiz/[slug]`, `data/quiz.ts`, and legacy quiz orchestration remain outside the authoritative integration.

### R4 – Multi-question orchestration

**Status: DEFERRED.**

No score, sequence, result state, or progression across questions has been authorized.

---

## Code Change Gate

**Product implementation: PAUSED pending bounded runtime data verification.**

No product-code change is currently authorized.

Runtime/data inspection may proceed. If inspection identifies a verified data-state defect or missing prerequisite, synchronize this control file before authorizing any implementation response.

---

## Current Task

Verify remote authoritative quiz-question availability and its lesson relationship without changing product code.

The inspection must determine whether published quiz-question rows exist remotely and whether they are correctly associated with authoritative lesson IDs that can be reached through the structured curriculum.

---

## Next Allowed Action

Perform a bounded read-only verification of remote authoritative quiz data:

1. inspect whether published `quiz_questions` rows exist;
2. verify their `lesson_id` relationships;
3. verify that at least one related lesson belongs to the authoritative course → chapter → lesson curriculum chain;
4. make no product-code or schema change during inspection;
5. synchronize `PROJECT_CONTROL.md` with the verified result before selecting the next implementation slice.

If no published rows exist, treat that as a data-state finding rather than a UI defect. Do not invent fallback quiz content or expand legacy quiz scope.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
