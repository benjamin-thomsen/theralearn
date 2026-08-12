# TheraLearn – System Architecture Overview

> Version: 1.0
>
> Status: Active; reflects verified current system shape
>
> Role: High-level system architecture and boundary map
>
> Last verified: 2026-08-12

---

## Purpose

This document describes the verified high-level architecture of the current TheraLearn system.

It owns the system-level view below `docs/architecture/README.md`: the major runtime areas, persistence boundary, authentication/session boundary, repository access layer, and the separation between application Runtime and development Tooling.

It does not attempt to contain detailed frontend, backend, database, authentication, deployment, security, API, or integration architecture. Those concerns belong in their dedicated architecture topic documents when those documents have been verified and populated.

This document must be read together with the root control kernel and `docs/architecture/README.md`.

---

## Authority and Evidence

The stable methodological and architectural principles are owned by `PROJECT_OVERVIEW.md` and governed through `PROJECT_HANDBOOK.md`.

Current state and repair sequencing are owned by `PROJECT_CONTROL.md`.

This system overview records architectural consequences that can be supported by the current repository and verified project authority. It does not promote every implementation detail into a permanent architectural rule.

The governing rule is:

> Implementation realizes architecture. It does not silently redefine it.

Where current implementation is incomplete or transitional, that distinction is stated explicitly.

---

## Current Technology Baseline

The current runtime is a Next.js application using the App Router model with TypeScript and React.

Verified package configuration currently includes:

- Next.js 16.2.12;
- React 19.2.4;
- React DOM 19.2.4;
- TypeScript 5.9.3;
- Supabase JavaScript client;
- Supabase SSR integration.

Supabase is the implemented persistence and authentication platform in the current architecture.

These versions are implementation facts. Their presence here documents the current verified baseline; it does not mean every exact version number is a permanent architectural invariant.

---

## High-Level System Shape

The current repository supports the following high-level system view:

```text
User / Browser
      ↓
Next.js Runtime
      │
      ├── App Router routes and pages
      ├── UI components and presentation
      ├── application/runtime utilities and state helpers
      │
      ├── authentication and session integration
      │         ↓
      │      Supabase Auth
      │
      └── repository access layer
                ↓
          Supabase client boundary
                ↓
          Supabase / PostgreSQL
```

Alongside the application Runtime is a separate development Tooling area:

```text
Application Runtime                 Developer Tooling
-------------------                 -----------------
app/                                tools/docs/
components/                         scripts/dev
lib/
data/
types/
supabase/
```

These folder names describe current implementation placement. They are not themselves the methodological responsibility model.

---

## Runtime Boundary

The application Runtime is the code and configuration involved in delivering or supporting the TheraLearn application itself.

Verified runtime areas include:

### `app/`

Contains Next.js App Router routes, pages, route handlers, loading/error boundaries, metadata-related files, and route-specific application behavior.

Current route areas include authentication confirmation, login, signup, dashboard, curriculum/pensum, quiz, results, and informational pages.

### `components/`

Contains reusable presentation components and their associated CSS Modules.

Component placement is an implementation mechanism. Components must not be interpreted as architectural responsibilities merely because they exist as separate files.

### `lib/`

Contains runtime-supporting application logic and infrastructure adapters.

Verified areas include:

- application constants and utility functions;
- progress/storage helpers;
- Supabase client/server/proxy integration;
- repository access modules for persisted domain data.

### `data/`

Contains current static application data used by parts of the existing UI.

Its continued presence is significant because the application is currently transitional: not all existing UI flows have been migrated to the Supabase-backed repository layer.

### `types/`

Contains generated database types representing the current Supabase database schema for typed application access.

### `supabase/`

Contains Supabase project configuration and database migration material.

The verified MVP schema migration is implementation authority for the database structures it creates.

---

## Runtime and Tooling Separation

Runtime and Tooling are architecturally distinct.

The current Developer Toolkit is implemented primarily under `tools/docs/` and exposed through `scripts/dev` and the documentation CLI workflow.

The Toolkit supports development operations such as inspection, documentation checks, verification, file workflows, search, and Git/project status.

It is not part of the end-user application Runtime and does not define the project methodology.

This separation preserves a key boundary:

```text
Methodology / Project Authority
             ↓
      Development Workflow
             ↓
      Developer Toolkit

versus

      Application Runtime
             ↓
       User-facing system
```

Tooling may inspect and verify Runtime, but Tooling must not become the hidden authority for architectural meaning.

---

## Persistence Boundary

Supabase/PostgreSQL is the current implemented persistent-data platform.

The repository contains:

- Supabase project configuration;
- an MVP database migration;
- generated TypeScript database types;
- typed Supabase client/server/proxy integration;
- repository modules that operate through a supplied repository client.

The database migration establishes application persistence structures and connects application profiles to Supabase Auth users.

Detailed table structure, relationships, row-level security, triggers, and database constraints belong in `database.md` once that document is repaired and verified.

---

## Repository Access Layer

A repository access layer exists under `lib/repositories/`.

Verified implemented repository areas include:

- courses;
- chapters;
- lessons;
- flashcards;
- shared repository types;
- shared repository error handling.

`quizQuestions.ts` is currently an empty placeholder and is not a completed repository implementation.

Repository functions receive a repository client rather than owning the creation of a specific Supabase client. This creates a current implementation boundary between data-access operations and client/session construction.

At the system level, the verified flow is therefore:

```text
Application behavior
        ↓
Repository operation
        ↓
Repository client boundary
        ↓
Supabase
```

The repository layer is an implementation realization of data-access separation. It must not be equated directly with one of the six methodological responsibilities.

---

## Authentication and Session Boundary

Supabase Auth is integrated into the current runtime.

The repository contains:

- login and signup application routes;
- an authentication confirmation route handler;
- typed browser and server Supabase clients;
- a Supabase session-update proxy;
- a root Next.js proxy that delegates session handling to the Supabase proxy implementation.

The server Supabase client uses Next.js cookie access to participate in server-side session handling.

Detailed authentication flows, trust boundaries, authorization rules, and session behavior belong in `authentication.md` once that topic is repaired and verified.

---

## Current Transitional State

The current architecture contains both newer persistent infrastructure and earlier/static application flows.

This is a verified implementation condition, not an architectural contradiction by itself.

For example, the repository layer and Supabase persistence infrastructure exist, while current UI areas such as the main pensum page still contain placeholder/static presentation rather than consuming the repository layer.

Therefore the system must not currently be described as though all application content and user flows are database-backed.

The accurate system-level distinction is:

```text
Persistence architecture: implemented foundation
Repository layer: partially implemented
Runtime adoption: incomplete / transitional
```

Future implementation work may increase adoption of the repository and persistence layers, but such work must follow the current project workflow gate and established architecture rather than being inferred from this document as automatically authorized.

---

## Major Architecture Boundaries

The current system-level boundaries are:

### Presentation and routing boundary

Next.js `app/` routes and reusable UI components deliver the user-facing application.

Detailed frontend structure belongs in `frontend-architecture.md`.

### Application/data-access boundary

Runtime behavior can access persisted domain data through repository modules rather than requiring direct database query construction throughout presentation code.

Detailed backend/data-access structure belongs in `backend-architecture.md`.

### Persistence boundary

Supabase/PostgreSQL owns persistent application data according to the implemented migration and generated database contract.

Detailed persistence architecture belongs in `database.md`.

### Authentication/session boundary

Supabase Auth and the SSR/client/proxy integration provide the implemented authentication/session infrastructure.

Detailed authentication architecture belongs in `authentication.md`.

### Runtime/tooling boundary

Application Runtime and Developer Tooling are separate system areas. The Toolkit supports development and verification but is not an application runtime dependency or methodological authority.

Detailed Toolkit architecture belongs under `docs/development/` rather than in application architecture topic files.

---

## Topic Routing

This overview intentionally routes narrower concerns rather than duplicating them.

Use:

- `frontend-architecture.md` for detailed frontend/runtime presentation architecture;
- `backend-architecture.md` for server-side and repository/data-access architecture;
- `database.md` for schema, persistence, relationships, policies, and database constraints;
- `authentication.md` for authentication, sessions, and authorization boundaries;
- `api.md` for API architecture where a verified API boundary exists;
- `integrations.md` for verified external integration boundaries;
- `security.md` for architectural security concerns;
- `deployment.md` for deployment and hosting architecture.

At the current documentation-repair stage, these files may still be empty placeholders. Routing to a file does not certify that file as complete.

---

## What This Overview Does Not Claim

This document does not claim that:

- every runtime route already uses Supabase;
- every data flow already uses the repository layer;
- every architecture topic document is complete;
- every folder represents one architectural responsibility;
- the current implementation is the final architecture;
- an implementation detail automatically becomes a permanent architectural rule.

Those distinctions are required to keep documentation synchronized with the verified state rather than with intended future state.

---

## Verification Rule

Changes to this system overview require inspection of both project authority and current implementation.

A future update should verify at minimum:

1. the current control kernel;
2. the architecture-domain entry point;
3. relevant repository structure;
4. relevant runtime and configuration files;
5. persistence/authentication implementation where affected;
6. whether a claimed system boundary is architectural or merely an implementation detail.

When current system state materially changes, `PROJECT_CONTROL.md` must be updated according to its update rule.

The governing discipline remains:

> Verify before change. No guessing.
