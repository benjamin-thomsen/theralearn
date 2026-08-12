# TheraLearn – Backend Architecture

> Version: 1.0
>
> Status: Active; reflects verified current data-access implementation
>
> Role: Authoritative documentation of the current backend/data-access boundary
>
> Last verified: 2026-08-12

---

## Purpose

This document describes the verified backend and data-access architecture currently implemented in TheraLearn.

The present backend foundation is intentionally narrow. The repository contains typed Supabase clients and a repository layer for selected persisted learning entities. It does not currently establish evidence for a separate service layer, domain-service layer, custom application API, or independent backend application.

This document therefore describes only the boundaries that can be verified in the current implementation.

---

## Authority Boundary

Backend architecture owns the implemented application-side boundary between runtime behavior and persistence access.

Database schema authority belongs in `database.md`.
Authentication identity and session handling belong in `authentication.md`.
System-level Runtime/Tooling boundaries belong in `system-overview.md`.

The current verified data-access chain is:

```text
Application runtime
        ↓
Repository operation
        ↓
RepositoryClient
        ↓
Typed Supabase client
        ↓
Supabase / PostgreSQL
```

The repository layer is an implementation mechanism for data access. It must not be treated as a redefinition or one-to-one mapping of the project's methodological responsibility model.

---

## Current Backend Shape

The current repository does not contain a separate traditional backend server application.

Backend-relevant behavior is distributed through the Next.js runtime and supporting `lib/` modules, including:

- server-side Supabase client construction;
- browser-side Supabase client construction where client access is required;
- authentication/session infrastructure;
- repository modules under `lib/repositories/`;
- database schema and RLS enforcement in Supabase/PostgreSQL.

This means the current architecture should not be described as a standalone frontend communicating with a separately deployed custom backend unless such a boundary is implemented later and verified.

---

## Repository Layer

The current repository layer is located under:

```text
lib/repositories/
```

Verified contents include:

```text
courses.ts
chapters.ts
lessons.ts
flashcards.ts
quizQuestions.ts   # empty placeholder
helpers/
types.ts
```

The repository layer centralizes typed database operations for the entities that have implemented modules.

It does not own the database schema. It operates against the schema contract exposed through generated database types.

---

## Repository Client Contract

`lib/repositories/types.ts` defines:

```text
RepositoryClient = SupabaseClient<Database>
```

It also derives repository entity, insert, and update types from the generated database contract for:

- courses;
- chapters;
- lessons;
- flashcards;
- quiz questions.

The dependency direction is therefore:

```text
Database migration
        ↓
Generated Database types
        ↓
Repository types
        ↓
Repository operations
```

Repository modules receive a `RepositoryClient` as a function argument rather than constructing their own browser or server Supabase client internally.

This separates data-operation definitions from the runtime context responsible for constructing the appropriate Supabase client.

---

## Client Construction Boundary

The repository functions are compatible with the typed Supabase client contract rather than with one hard-coded client-construction path.

Current client construction exists separately in:

- `lib/supabase/client.ts` for browser contexts;
- `lib/supabase/server.ts` for server contexts;
- `lib/supabase/proxy.ts` for request/session synchronization.

Repository modules do not import those constructors directly.

At the implementation level, this creates the boundary:

```text
Runtime context decides client
        ↓
Client is supplied to repository
        ↓
Repository performs data operation
```

This document does not claim that every repository operation is safe or intended for every client context. Actual access remains constrained by Supabase credentials, authentication state, and database RLS policies.

---

## Courses Repository

`lib/repositories/courses.ts` is an implemented repository module.

Verified operations include:

- retrieving all courses;
- retrieving a course by ID;
- retrieving a course by slug;
- creating a course;
- updating a course;
- deleting a course.

List retrieval orders courses by `sort_order` and then title.

Single-record lookups use Supabase query behavior that permits a missing result to return `null` rather than automatically treating absence as a repository failure.

The presence of create/update/delete functions does not override database RLS. Whether a caller may successfully perform a write is determined by the supplied client context and database authorization policies.

---

## Chapters Repository

`lib/repositories/chapters.ts` is implemented.

Verified operations include:

- retrieving all chapters;
- retrieving chapters for a course ID;
- retrieving a chapter by ID;
- retrieving a chapter by course ID plus slug;
- creating a chapter;
- updating a chapter;
- deleting a chapter.

Global chapter listing orders first by `course_id`, then `sort_order`, then title.

Course-scoped listing orders by `sort_order` and title.

The slug lookup reflects the database architecture where chapter slugs are unique within a course rather than globally unique.

---

## Lessons Repository

`lib/repositories/lessons.ts` is implemented.

Verified operations include:

- retrieving all lessons;
- retrieving lessons for a chapter ID;
- retrieving a lesson by ID;
- retrieving a lesson by chapter ID plus slug;
- creating a lesson;
- updating a lesson;
- deleting a lesson.

Global lesson listing orders by `chapter_id`, `sort_order`, and title.

Chapter-scoped listing orders by `sort_order` and title.

The slug lookup reflects the database architecture where lesson slugs are unique within a chapter.

---

## Flashcards Repository

`lib/repositories/flashcards.ts` is implemented.

Verified operations include:

- retrieving all flashcards;
- retrieving flashcards for a lesson ID;
- retrieving a flashcard by ID;
- creating a flashcard;
- updating a flashcard;
- deleting a flashcard.

Global flashcard listing orders by `lesson_id`, `sort_order`, and `front_text`.

Lesson-scoped listing orders by `sort_order` and `front_text`.

No separate flashcard slug lookup exists in the inspected repository, which is consistent with the current database schema not defining a flashcard slug.

---

## Quiz Questions Repository Status

The database schema contains the `quiz_questions` table and generated TypeScript types exist for quiz questions.

However:

```text
lib/repositories/quizQuestions.ts
```

is currently a zero-byte placeholder.

Therefore no quiz-question repository operations are currently documented as implemented.

The distinction is:

```text
Database schema: implemented
Generated types: implemented
Repository module: not implemented
```

The filename's existence is not evidence of repository functionality.

---

## Shared Repository Error Handling

`lib/repositories/helpers/throwRepositoryError.ts` provides shared error handling for operations where returned data is expected to be non-null.

The helper:

- throws the Supabase/PostgREST error when one exists;
- throws an explicit repository error when expected data is unexpectedly `null`;
- asserts the data as non-null for TypeScript after those checks.

The current repository modules are not completely uniform in their use of this helper. Some operations use `throwRepositoryError()`, while others perform direct `if (error) { throw error; }` handling.

This is a verified implementation characteristic, not a claim that the inconsistency is itself an architectural requirement.

---

## Read and Write Operations vs Authorization

Repository modules define both read and write operations for several entities.

This does not mean all operations are currently executable by ordinary browser-authenticated users.

The database migration currently exposes public/authenticated read policies for published learning content but does not define equivalent client-facing write policies for courses, chapters, lessons, flashcards, or quiz questions.

Therefore:

```text
Repository operation exists
        ≠
Caller is authorized to execute it successfully
```

Database RLS remains the enforcement boundary for Supabase data access.

Detailed RLS rules belong in `database.md`.

---

## Runtime Adoption State

Repository availability and runtime adoption are separate facts.

The current repository foundation exists, but the inspected repository evidence does not establish broad page/route consumption of the repository modules.

Current application areas still include static or placeholder data flows, as documented in `system-overview.md`.

The accurate current state is therefore:

```text
Persistence schema: implemented foundation
Repository modules: partially implemented
Runtime repository adoption: incomplete / not broadly verified
```

This document must not imply that all current UI content is loaded through the repository layer.

---

## No Verified Service Layer

No separate application service layer has been established from the inspected repository evidence.

Accordingly, this document does not introduce conceptual components such as:

- `services/`;
- use-case services;
- domain services;
- command handlers;
- application managers;
- backend controllers.

Such layers may only become part of the documented architecture if implementation or certified architectural authority later establishes them.

---

## No Verified Custom API Layer

The existence of Next.js route handlers for specific runtime concerns, such as authentication confirmation, does not establish a general application API architecture.

No broad custom REST, GraphQL, RPC, or internal API layer has been established by the repository inspection performed for this document.

Detailed API architecture belongs in `api.md` only when a concrete API boundary has been verified.

---

## Backend, Database, and Authentication Boundaries

The three concerns are intentionally separated:

```text
Authentication
    establishes identity/session
            ↓
Backend/repository layer
    performs typed data operations
            ↓
Database
    owns schema, integrity, and RLS enforcement
```

The repository layer does not replace database authorization and does not own authentication identity.

This preserves the permanent-home rule:

- authentication/session details → `authentication.md`;
- persistence/schema/RLS details → `database.md`;
- application-side data-access behavior → this document.

---

## Current Scope and Non-Claims

This document does not claim that TheraLearn currently has:

- a standalone backend service;
- a complete repository for every database table;
- a quiz-question repository implementation;
- a repository for lesson progress or profiles;
- a general application service layer;
- a general custom API layer;
- an admin backend;
- server-only enforcement for all repository calls;
- broad runtime adoption of repository modules;
- repository-level authorization replacing database RLS.

Those capabilities require separate verified evidence before being documented as current architecture.

---

## Verification Rule

Before changing this document:

1. inspect the current control kernel;
2. inspect `system-overview.md`, `database.md`, and `authentication.md`;
3. inspect the complete current `lib/repositories/` implementation;
4. inspect generated database types where repository contracts are affected;
5. inspect Supabase client construction only where dependency boundaries are affected;
6. verify runtime repository usage before claiming adoption by pages or routes;
7. distinguish repository operations from database authorization;
8. distinguish implemented modules from empty placeholders;
9. avoid introducing unimplemented service or API layers;
10. update `PROJECT_CONTROL.md` when backend architecture or repair status materially changes.

The governing discipline remains:

> Verify before change. No guessing.
