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

**MVP Learning Loop Implementation — Curriculum-to-Lesson Integration**

The Learning Science Evidence Review and permanent authority transfer are complete. The MVP boundary remains unchanged.

The Authoritative Lesson Context first slice is verified and closed. Repository inspection has now derived the next bounded integration slice: replace the placeholder `/pensum` entry surface with authoritative published curriculum navigation that leads to the established hierarchical lesson route.

---

## Current Branch

```text
migration-next16-to-root
```

Latest control synchronization commit before this plan:

```text
7a3ca9169ceec3e057c9af95cf4d9847bd29d49a
Close authoritative lesson context first slice
```

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

This slice owns only the `Structured curriculum → Authoritative lesson context` seam.

---

## Closed Slice — Authoritative Lesson Context First Slice

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

GitHub Actions workflow `Verify`, run 73, completed successfully for `58aafb825a35748a8b8739a214d325767132c3e9`.

**Authoritative Lesson Context first slice: VERIFIED AND CLOSED.**

---

## Verified Curriculum-to-Lesson Evidence

### Current `/pensum` entry

`app/pensum/page.tsx` is a static placeholder. It does not query authoritative curriculum data and its `Start læring` button does not establish a curriculum-to-lesson path.

Its current copy also mentions notes, completion marking, and search, none of which define the current bounded integration responsibility.

### Existing repository support

No new repository function is required for the first curriculum-entry slice.

Existing functions already provide ordered hierarchy traversal:

- `getCourses(client)` returns courses ordered by `sort_order`, then title;
- `getChaptersByCourseId(client, course.id)` returns chapters within a course ordered by `sort_order`, then title;
- `getLessonsByChapterId(client, chapter.id)` returns lessons within a chapter ordered by `sort_order`, then title.

The established lesson route consumes:

```text
/pensum/{course.slug}/{chapter.slug}/{lesson.slug}
```

Therefore the curriculum entry can derive authoritative links entirely from existing database entities without introducing a second identity model.

### Existing navigation/component ownership

Repository inspection found no existing component or route already owning authoritative course → chapter → lesson curriculum navigation.

The smallest ownership point is therefore the existing `app/pensum/page.tsx` entry surface itself.

### Remote data availability

Current repository evidence does not certify that the remote database contains published course/chapter/lesson rows.

That does not block compilation or establishment of the navigation seam, but runtime end-to-end content traversal cannot be certified until published remote data exists and is verified.

The page must therefore handle an empty published curriculum state without inventing content.

---

## Bounded Implementation Plan

### Exact product-code change

**Modify only:**

```text
app/pensum/page.tsx
```

No repository, schema, styling, lesson-route, flashcard, quiz, progress, or legacy-route file is authorized in this slice.

### Implementation contract

Convert `app/pensum/page.tsx` into an async Server Component that:

1. uses the existing typed Supabase server `createClient()`;
2. loads courses with `getCourses(client)`;
3. includes only published courses in the rendered curriculum;
4. for each published course, loads chapters with `getChaptersByCourseId(client, course.id)` and renders only published chapters;
5. for each published chapter, loads lessons with `getLessonsByChapterId(client, chapter.id)` and renders only published lessons;
6. renders authoritative course, chapter, and lesson titles from database records;
7. links each published lesson to the existing hierarchical authoritative route using `course.slug`, `chapter.slug`, and `lesson.slug`;
8. handles an empty published curriculum state explicitly without hardcoded curriculum fallback;
9. remains a Server Component and introduces no client state;
10. does not claim or implement learning activities, progress, advanced algorithms, or legacy-route migration.

### Styling boundary

The existing `app/pensum/page.module.css` may remain imported and existing compatible classes may be reused, but it must not be modified in this slice.

If the current CSS cannot support valid minimal markup without modification, stop and synchronize control rather than expanding scope automatically.

### Data-query boundary

The initial implementation may use the existing repository calls even though this produces multiple bounded server queries. Query optimization is not part of this seam-establishment slice.

Do not introduce a new aggregate curriculum repository abstraction unless verification proves the existing contracts cannot implement the authorized behavior.

---

## Verification Contract

The slice is complete only when verification demonstrates:

1. only `app/pensum/page.tsx` changed as product code;
2. the page contains no `"use client"` directive;
3. it uses the typed server Supabase client;
4. it uses existing course/chapter/lesson repository functions;
5. unpublished entities are not rendered;
6. lesson links use the authoritative hierarchical slug path;
7. no hardcoded curriculum fallback is introduced;
8. no flashcard, quiz, progress, scheduler, mastery, adaptive-learning, or legacy migration code is introduced;
9. TypeScript passes;
10. Next.js build passes;
11. documentation structure verification remains passing;
12. GitHub Actions passes for the resulting branch head.

Runtime proof that a learner can traverse actual published content remains dependent on remote data availability and must be verified separately if repository verification cannot establish it.

---

## Current Risks

### R1 – Parallel identity models

**Status: ACTIVE but reduced by this slice.**

The `/pensum` entry will point to authoritative hierarchical lesson URLs, while the old hardcoded `app/pensum/[slug]/page.tsx` remains present but is not promoted as authority.

### R2 – Database content availability

**Status: OPEN.**

An empty authoritative curriculum must be handled honestly. Runtime content traversal cannot be certified from code structure alone.

### R3 – Learning-principle implementation drift

**Status: ACTIVE.**

This slice establishes curriculum navigation only and does not claim implementation of the certified learning mechanisms.

### R4 – Query efficiency

**Status: ACCEPTED for first seam.**

Existing repository calls may create multiple server queries. Optimization is deferred because it is not required to establish correct ownership or identity.

---

## Code Change Gate

**Product implementation: OPEN ONLY for the bounded Authoritative Curriculum Entry slice.**

Authorized product-code change:

```text
MODIFY app/pensum/page.tsx
```

No other product-code file change is authorized unless verification proves this exact slice cannot compile without one; if so, stop and synchronize control before expanding scope.

---

## Current Task

Implement the authoritative curriculum entry in `app/pensum/page.tsx` exactly as specified above.

---

## Next Allowed Action

Modify only:

```text
app/pensum/page.tsx
```

so that `/pensum` resolves and renders the published course → chapter → lesson hierarchy from existing repository functions and links published lessons to:

```text
/pensum/{course.slug}/{chapter.slug}/{lesson.slug}
```

Then verify the file and run project verification. After verification, synchronize `PROJECT_CONTROL.md` before selecting the next implementation slice.

Do not modify CSS, repository functions, schema, flashcards, quiz, progress, the authoritative lesson route, or the legacy hardcoded `[slug]` route in this slice.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
