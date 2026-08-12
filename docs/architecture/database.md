# TheraLearn – Database Architecture

> Version: 1.0
>
> Status: Active; reflects verified MVP persistence schema
>
> Role: Authoritative documentation of the implemented application database architecture
>
> Last verified: 2026-08-12

---

## Purpose

This document describes the verified database architecture currently implemented for the TheraLearn MVP.

Its primary implementation authority is the applied schema migration under `supabase/migrations/`. Generated TypeScript database types reflect that schema for application use but do not constitute a second schema authority.

This document covers persisted entities, relationships, constraints, lifecycle triggers, indexes, and Row Level Security behavior that are explicitly present in the verified migration.

It does not define future product data requirements that have not been implemented.

---

## Authority Boundary

Database architecture owns the persistent application data model and database-enforced integrity and access boundaries.

The current authority chain is:

```text
Verified database migration
        ↓
Supabase / PostgreSQL schema
        ↓
Generated database types
        ↓
Typed Supabase clients
        ↓
Repository access layer
        ↓
Application runtime
```

`types/database.ts` is generated from the database schema and provides an application-facing TypeScript contract. If generated types and the applied schema disagree, the discrepancy must be investigated; the generated file must not silently redefine the database.

Repository behavior belongs primarily in `backend-architecture.md`. It is referenced here only where necessary to explain the persistence boundary.

---

## Persistence Platform

The current persistence platform is Supabase backed by PostgreSQL.

The verified MVP migration enables `pgcrypto` and uses UUID primary keys for application-owned entities, generally generated with `gen_random_uuid()`.

Authentication identity is not recreated as an application-owned user table. Supabase Auth owns authentication users in `auth.users`, while TheraLearn stores application profile data in `public.profiles`.

---

## Implemented Entity Model

The verified application schema contains seven tables in the `public` schema:

```text
profiles
courses
chapters
lessons
flashcards
quiz_questions
lesson_progress
```

The core learning hierarchy is:

```text
courses
   ↓ 1:N
chapters
   ↓ 1:N
lessons
   ├── 1:N → flashcards
   └── 1:N → quiz_questions
```

User learning state is connected separately:

```text
auth.users
    ↓ 1:1
profiles
    ↓ 1:N
lesson_progress
    N:1
lessons
```

`lesson_progress` therefore represents the per-user relationship to individual lessons rather than storing a precomputed overall progress percentage.

---

## Identity and Profiles

### Supabase Auth identity

Authentication identity is owned by Supabase Auth in `auth.users`.

### `public.profiles`

TheraLearn stores application profile information separately in `public.profiles`.

Verified columns are:

- `id` — UUID primary key and foreign key to `auth.users(id)`;
- `full_name` — optional text;
- `created_at`;
- `updated_at`.

The relationship is one application profile per Supabase Auth user because the profile primary key is the referenced Auth user ID.

Deletion of the Auth user cascades to the associated profile.

A database trigger on `auth.users` automatically invokes `public.handle_new_user()` after user creation. The function creates the corresponding profile and initializes `full_name` from user metadata when a non-empty value is available.

The migration also backfills profiles for Auth users that existed before the migration.

This establishes a deliberate boundary:

```text
Authentication identity → Supabase Auth
Application profile     → public.profiles
```

---

## Learning Content Hierarchy

### `courses`

`courses` is the top-level learning-content entity.

Verified fields include:

- UUID `id`;
- globally unique non-empty `slug`;
- non-empty `title`;
- optional `description`;
- `is_published`, default `false`;
- non-negative `sort_order`, default `0`;
- creation/update timestamps.

### `chapters`

Each chapter belongs to exactly one course through `course_id`.

Deleting a course cascades to its chapters.

Chapter slugs are unique within a course through the composite uniqueness constraint `(course_id, slug)` rather than globally unique.

A composite index on `(course_id, sort_order)` supports ordered chapter retrieval within a course.

### `lessons`

Each lesson belongs to exactly one chapter through `chapter_id`.

Deleting a chapter cascades to its lessons.

Lesson slugs are unique within a chapter through `(chapter_id, slug)`.

Lessons store:

- non-empty title and slug;
- optional summary;
- textual `content`, defaulting to an empty string;
- `learning_objectives` as an ordered text array, defaulting to an empty array;
- publication state;
- non-negative sort order;
- timestamps.

An index on `(chapter_id, sort_order)` supports ordered lesson retrieval within a chapter.

---

## Learning Activity Content

### `flashcards`

Each flashcard belongs directly to one lesson through `lesson_id`.

Deleting the lesson cascades to its flashcards.

A flashcard stores:

- non-empty `front_text`;
- non-empty `back_text`;
- publication state;
- non-negative sort order;
- timestamps.

An index on `(lesson_id, sort_order)` supports ordered flashcard retrieval for a lesson.

### `quiz_questions`

Each quiz question belongs directly to one lesson through `lesson_id`.

Deleting the lesson cascades to its quiz questions.

The implemented quiz model is multiple choice. A question stores:

- non-empty question text;
- an array of answer `options`;
- integer `correct_answer`;
- optional explanation;
- publication state;
- non-negative sort order;
- timestamps.

Database constraints require at least two options and require `correct_answer` to be a valid zero-based index into the options array.

An index on `(lesson_id, sort_order)` supports ordered question retrieval for a lesson.

The database schema for `quiz_questions` is implemented even though the current `lib/repositories/quizQuestions.ts` file remains an empty repository placeholder. Schema implementation and repository implementation must therefore not be conflated.

---

## Lesson Progress

`lesson_progress` stores per-user state for an individual lesson.

Verified relationships are:

- `user_id` → `public.profiles(id)`;
- `lesson_id` → `public.lessons(id)`.

Both foreign keys cascade on deletion.

The table stores:

- UUID `id`;
- completion state;
- optional completion timestamp;
- last-viewed timestamp;
- creation/update timestamps.

A uniqueness constraint on `(user_id, lesson_id)` ensures at most one progress row per user per lesson.

A consistency constraint enforces:

```text
is_completed = true  → completed_at IS NOT NULL
is_completed = false → completed_at IS NULL
```

Separate indexes exist for `user_id` and `lesson_id`.

The migration explicitly describes overall percentages as dynamically calculated rather than persisted in this table.

---

## Shared Timestamp Behavior

The schema defines `public.set_updated_at()` as a shared trigger function.

Before updates, it assigns the current timestamp to `updated_at`.

The trigger is attached to:

- `profiles`;
- `courses`;
- `chapters`;
- `lessons`;
- `flashcards`;
- `quiz_questions`;
- `lesson_progress`.

This makes update timestamp maintenance database-enforced for all seven application tables.

---

## Referential Integrity and Cascades

The verified hierarchy uses database foreign keys and cascading deletion:

```text
auth.users
   ↓ cascade
profiles
   ↓ cascade
lesson_progress

courses
   ↓ cascade
chapters
   ↓ cascade
lessons
   ├── cascade → flashcards
   ├── cascade → quiz_questions
   └── cascade → lesson_progress
```

This means deletion of a parent entity removes dependent rows according to the explicit foreign-key rules in the migration.

The documentation must not imply soft-delete semantics because no soft-delete columns or behavior are present in the verified schema.

---

## Publication Model

Learning content uses explicit `is_published` flags on:

- courses;
- chapters;
- lessons;
- flashcards;
- quiz questions.

The database does not treat a child item's own publication flag as sufficient for public readability. Row Level Security checks the relevant ancestor publication state as well.

This produces a publication hierarchy:

```text
Course published
      ↓
Chapter published
      ↓
Lesson published
      ↓
Flashcard / Quiz question published
```

A content item deeper in the tree is publicly readable only when the required path above it is also published.

---

## Row Level Security

Row Level Security is enabled on all seven application tables.

### Profiles

Authenticated users may:

- read their own profile;
- update their own profile.

Both access checks compare `auth.uid()` with the profile `id`.

The migration does not define client-facing insert or delete policies for profiles. Profile creation is instead handled by the Auth-user trigger described above.

### Courses

Published courses are selectable by both anonymous and authenticated users.

No client-facing write policies are defined in this migration.

### Chapters

A chapter is publicly readable only when:

- the chapter itself is published; and
- its parent course is published.

### Lessons

A lesson is publicly readable only when:

- the lesson is published;
- its parent chapter is published; and
- the parent course is published.

### Flashcards

A flashcard is publicly readable only when:

- the flashcard is published;
- its lesson is published;
- the lesson's chapter is published; and
- the chapter's course is published.

### Quiz questions

Quiz-question readability follows the same fully published learning-tree requirement as flashcards.

### Lesson progress

Authenticated users may read, insert, update, and delete only rows whose `user_id` equals their own `auth.uid()`.

This makes lesson progress user-scoped at the database policy layer.

---

## Write-Access Boundary

The verified migration defines public/authenticated read policies for published learning content but does not define corresponding client-facing insert, update, or delete policies for courses, chapters, lessons, flashcards, or quiz questions.

Therefore this document does not claim that ordinary browser-authenticated users can author or administer learning content through the current RLS policy set.

Any future content-administration architecture requires separate verified authority and must not be inferred from the presence of the tables alone.

---

## Generated Database Types

`types/database.ts` represents the generated TypeScript contract for the current Supabase schema.

It exposes typed Row, Insert, Update, and relationship structures for the seven public tables.

The generated relationships reflect the application-schema foreign keys, including:

- chapters → courses;
- lessons → chapters;
- flashcards → lessons;
- quiz questions → lessons;
- lesson progress → lessons and profiles.

The Auth-user foreign key behind `profiles.id` is enforced by the database migration even though the generated public-schema relationship list does not represent `auth.users` as a public-table relationship.

Generated types are implementation support. Schema changes should originate through the database migration workflow and be followed by regenerated types rather than editing generated types as an independent schema definition.

---

## Repository Boundary

`lib/repositories/types.ts` derives repository entity types from `types/database.ts` and defines `RepositoryClient` as `SupabaseClient<Database>`.

This keeps repository operations typed against the generated database contract.

The repository layer is not the database schema authority. It is an application access mechanism over the persistence boundary.

Detailed repository responsibilities and implemented CRUD/query behavior belong in `backend-architecture.md`.

---

## Current Scope and Non-Claims

This document describes the implemented MVP persistence schema only.

It does not claim that:

- every current UI flow already consumes these tables;
- every schema table has a completed repository module;
- content-authoring/admin workflows are implemented;
- quiz attempt history or scoring history is persisted;
- notes are persisted;
- flashcard review history is persisted;
- multilingual content structures are implemented in the database;
- future learning requirements are already represented by the schema.

Such capabilities require separate implementation evidence before they can be documented as current database architecture.

---

## Verification Rule

Before changing this document:

1. inspect the current control kernel;
2. inspect `docs/architecture/system-overview.md`;
3. inspect all database migrations relevant to the claimed current schema;
4. inspect generated database types when application contracts are affected;
5. inspect repository contracts only where persistence boundaries are relevant;
6. distinguish implemented schema from future requirements;
7. update `PROJECT_CONTROL.md` when database architecture or repair status materially changes.

The governing discipline remains:

> Verify before change. No guessing.
