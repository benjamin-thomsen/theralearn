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

The Authoritative Lesson Context first slice is now verified and closed. The next dependency-correct responsibility is to connect structured curriculum entry/navigation to the authoritative lesson context without yet integrating flashcards, quiz, or learner progress.

---

## Current Branch

```text
migration-next16-to-root
```

Verified branch head before this control synchronization:

```text
58aafb825a35748a8b8739a214d325767132c3e9
Make dev output copy portable in CI
```

---

## Product Authority

Permanent product authority remains:

- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

The implementation must preserve lesson as the central current learning-context unit and must not equate feature presence with satisfaction of a certified learning principle.

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

---

## Closed Slice — Authoritative Lesson Context First Slice

### Implemented route

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]/page.tsx
```

Implementation commit:

```text
a817cb687c24a34f371d3d373dfd5ca9e384bb27
Add authoritative lesson context route
```

The route is a Server Component that:

- uses the typed Supabase server client;
- resolves `course → chapter → lesson`;
- constrains child slug resolution by parent IDs;
- rejects missing or unpublished course/chapter/lesson entities with `notFound()`;
- renders authoritative course, chapter, lesson title, summary, learning objectives, and lesson content;
- introduces no flashcard, quiz, progress-persistence, scheduler, mastery, or adaptive-learning behavior.

### Verification result

The implementation itself passed project verification, but the first CI run failed after verification because `scripts/dev` unconditionally invoked macOS `pbcopy` on the Ubuntu GitHub Actions runner.

The bounded tooling repair was committed as:

```text
58aafb825a35748a8b8739a214d325767132c3e9
Make dev output copy portable in CI
```

GitHub Actions workflow `Verify`, run 73, completed successfully for that exact branch head.

Therefore:

**Authoritative Lesson Context first slice: VERIFIED AND CLOSED.**

---

## Current Verified Implementation Evidence

### Authoritative lesson identity

Repository contracts establish hierarchical lesson identity:

```text
course slug + chapter slug + lesson slug
```

`lesson.id` remains the future integration key used by lesson-related flashcards, quiz questions, and learner progress.

### Current curriculum entry state

`app/pensum/page.tsx` was previously verified as a placeholder rather than an authoritative curriculum entry surface.

`app/pensum/[slug]/page.tsx` remains a substantial hardcoded legacy topic page whose slug is not the authoritative database course/chapter/lesson identity.

The legacy route must not be silently reinterpreted as database authority.

### MVP requirement

The MVP requires one coherent core learning loop in which the learner can enter structured curriculum and navigate into lesson-level context before learning activities are integrated.

The existence of the new lesson route alone does not satisfy structured curriculum navigation.

---

## Current Risks

### R1 – Parallel identity models

**Status: ACTIVE but bounded.**

The authoritative hierarchical lesson route coexists with the old hardcoded single-slug pensum route. Navigation must transition deliberately rather than silently preserving both as equal authorities.

### R2 – Database content availability

**Status: OPEN.**

Schema and repository contracts are established, but current remote published curriculum content has not yet been certified as sufficient for the end-to-end authoritative path.

### R3 – Learning-principle implementation drift

**Status: ACTIVE.**

Curriculum and context integration must not be described as implementing the certified learning mechanisms themselves. Learning activities remain later dependencies.

### R4 – Branch divergence

**Status: MONITOR.**

Branch-head verification must continue before each bounded change.

---

## Code Change Gate

**Product implementation: CLOSED pending bounded curriculum-to-lesson inspection and file-level plan.**

No product-code file change is currently authorized.

Documentation/control synchronization and repository inspection are allowed.

---

## Current Task

Derive the smallest dependency-correct implementation slice that lets structured curriculum entry/navigation lead into the authoritative lesson route.

The derivation must be based on current repository evidence, not assumptions.

---

## Next Allowed Action

Inspect the current structured-curriculum entry and the existing repository/navigation surfaces needed to connect it to the authoritative lesson hierarchy.

At minimum, verify:

- `app/pensum/page.tsx`;
- relevant course/chapter/lesson repository functions and types;
- any existing curriculum/navigation components that could already own this responsibility;
- whether remote data availability must be verified before a navigation implementation can be meaningfully tested.

Then synchronize `PROJECT_CONTROL.md` with one bounded file-level implementation plan before opening the product-code gate.

Do not yet implement flashcards, quiz integration, learner progress, advanced learning algorithms, broad navigation redesign, or migration/deletion of the legacy hardcoded route.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, or code-change permission.
