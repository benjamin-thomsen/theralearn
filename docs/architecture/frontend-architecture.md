# TheraLearn – Frontend Architecture

> Version: 1.0
>
> Status: Active; reflects verified current frontend implementation
>
> Role: Authoritative documentation of routing, presentation, component, styling, and browser-local frontend boundaries
>
> Last verified: 2026-08-12

---

## Purpose

This document describes the verified frontend architecture currently implemented in TheraLearn.

The current frontend is a Next.js App Router application with route-level UI under `app/`, reusable presentation components under `components/`, global and module-scoped CSS, client-side authentication flows where implemented, and legacy/browser-local state helpers that coexist with the newer Supabase persistence foundation.

This document does not treat every existing UI route or placeholder as completed product architecture.

---

## Authority Boundary

Frontend architecture owns the implemented presentation, routing, component, styling, and browser-local interaction boundaries.

It does not own:

- database schema or RLS rules — see `database.md`;
- repository/data-access behavior — see `backend-architecture.md`;
- authentication/session architecture — see `authentication.md`;
- stable product requirements or learning model — those belong in product documentation;
- methodological responsibility definitions — those belong above the implementation documentation layer.

The current high-level relationship is:

```text
User / Browser
      ↓
Next.js App Router UI
      ↓
Route/page and reusable component behavior
      ↓
Browser-local helpers and/or runtime infrastructure
      ↓
Repository / Supabase where adopted
```

The final step is not yet universal across the current UI.

---

## Next.js App Router Structure

The application uses the Next.js `app/` directory.

Verified root-level App Router infrastructure includes:

- `layout.tsx`;
- `loading.tsx`;
- `error.tsx`;
- `not-found.tsx`;
- `globals.css`;
- metadata/icon/manifest-related files;
- route directories for user-facing application areas.

Verified route areas include authentication, dashboard, login, signup, pensum/curriculum, quiz, results, and informational content.

Directory presence indicates current routing structure; it does not certify every route as complete or persistence-backed.

---

## Root Layout

`app/layout.tsx` establishes the root HTML document structure.

It:

- imports `app/globals.css`;
- sets the document language to Danish through `lang="da"`;
- defines application metadata for title and description;
- renders route content through `children`.

The root layout is not marked with `"use client"`, so the inspected implementation does not make the application shell a client component by default.

Client behavior is introduced in narrower components/routes where explicitly required.

---

## Server and Client Component Boundary

The frontend uses the App Router's server/client component model.

Files without `"use client"` remain on the server-component side by default under the current Next.js model, while interactive routes/components explicitly opt into client execution where required.

Verified client examples include:

- the current `/login` page;
- the current `/signup` page;
- interactive quiz/result-related UI where `"use client"` is present in the implementation.

Verified server/runtime examples include:

- the root layout;
- the `/auth/confirm` route handler;
- the separate login server action in `app/login/actions.ts`.

The existence of both client and server login mechanisms does not mean both are wired into the same UI path. The current login page uses the browser Supabase client directly; the separate server action exists but is not the inspected page's submission path.

Detailed authentication behavior belongs in `authentication.md`.

---

## Route Handlers and Server Actions

The current frontend/runtime boundary includes at least two Next.js server-side mechanisms:

### Route handler

`app/auth/confirm/route.ts` implements the email-confirmation callback and performs a server-side Supabase code exchange before redirecting.

### Server action

`app/login/actions.ts` defines a `"use server"` password-login action.

These mechanisms are specific current implementation paths. Their existence does not establish a general custom API or universal server-action architecture for the application.

---

## Reusable Components

Reusable presentation components are stored under `components/`.

Verified examples include:

- `Button.tsx`;
- `Header.tsx`;
- `Footer.tsx`;
- `ProgressBar.tsx`;
- `QuizCard.tsx`;
- result-related presentation components.

Components are generally paired with colocated CSS Modules.

For example:

```text
ProgressBar.tsx
ProgressBar.module.css
```

`ProgressBar` accepts value/max/label configuration, clamps values into a safe range, calculates a percentage, and exposes progress semantics through ARIA attributes.

These reusable components demonstrate component reuse and scoped styling. They do not by themselves establish a formally certified design system.

---

## Incomplete Component Placeholders

Component-directory presence must not be confused with implemented UI functionality.

A verified example is:

```text
components/PensumCard.tsx
```

which is currently a zero-byte placeholder even though `PensumCard.module.css` exists.

Therefore the frontend documentation must distinguish:

```text
component target exists
        ≠
component implementation exists
```

This is part of the current documentation/implementation drift being repaired.

---

## Styling Architecture

The current frontend uses both global CSS and CSS Modules.

### Global styling

`app/globals.css` is imported once by the root layout and provides application-wide styling rules.

### Component/route styling

Reusable components and route areas use `.module.css` files for locally scoped styles.

Examples include component-specific modules for buttons, header/footer, progress, quiz, and route-specific modules such as login/signup styling.

This is the verified styling mechanism.

The current repository evidence does not establish a separate CSS-in-JS framework or utility-class framework as the frontend styling authority.

---

## Static and Local Application Data

The current frontend remains transitional with respect to data sources.

Parts of the UI still use static/local application data and placeholder content while the Supabase schema and repository foundation exist separately.

Therefore:

```text
UI route exists
        ≠
route consumes repository layer
        ≠
route is database-backed
```

The system and backend architecture documents already record that broad repository adoption by pages/routes is incomplete or not yet verified.

Frontend documentation must preserve that distinction rather than presenting the intended persistence direction as completed runtime behavior.

---

## Browser-Local Storage Boundary

`lib/storage.ts` implements a browser-local storage abstraction over `window.localStorage`.

It prefixes owned keys with:

```text
theralearn:
```

and provides operations to:

- save JSON-serializable values;
- retrieve values with a fallback;
- remove one TheraLearn storage key;
- clear all TheraLearn-prefixed local storage values.

The helper guards against server execution by checking whether `window` exists.

Storage failures are caught, logged, and converted into fallback values or boolean failure results.

This is an existing frontend/browser persistence mechanism and is distinct from Supabase persistence.

---

## Current Quiz Progress Model

`lib/progress.ts` currently stores quiz progress through the browser-local storage abstraction.

The stored quiz progress model includes:

- quiz slug;
- number of correct answers;
- total questions;
- calculated percentage;
- completion timestamp.

The module supports retrieving all quiz progress, finding progress by slug, saving/replacing a quiz result, removing a result, clearing quiz progress, counting completed quizzes, and calculating the average quiz percentage.

This means current frontend/runtime state contains a verified local persistence path:

```text
Quiz interaction
      ↓
lib/progress.ts
      ↓
lib/storage.ts
      ↓
window.localStorage
```

This path coexists with the newer Supabase `lesson_progress` persistence foundation.

The two mechanisms must not be described as though they are already unified.

---

## Transitional Persistence State

The current frontend therefore contains two materially different persistence directions:

```text
Existing browser-local behavior
    quiz progress → localStorage

Newer persistence foundation
    typed repositories → Supabase/PostgreSQL
```

The repository inspection has not established broad frontend adoption of the newer repository layer.

Accordingly, the accurate current state is transitional rather than fully migrated.

This document does not decide how or when the browser-local progress path should be migrated. That would be implementation work and must follow the project workflow gate.

---

## Authentication UI Boundary

Login and signup are user-facing frontend routes with interactive client behavior.

The signup page performs client-side form validation and invokes the browser Supabase client.

The current login page also invokes the browser Supabase client and navigates to `/dashboard` after successful password authentication.

These are frontend interaction facts.

Identity ownership, confirmation exchange, session cookies, request proxy behavior, and RLS connection belong in `authentication.md` and must not be duplicated here as independent frontend authority.

---

## Error, Loading, and Not-Found Boundaries

The root `app/` structure contains dedicated App Router files for:

- loading UI;
- error UI;
- not-found UI.

These provide framework-level presentation boundaries for loading, error, and missing-route/resource states.

Their presence documents current frontend resilience/presentation structure but does not imply that every route has custom nested boundaries.

---

## No Verified Global State Framework

The inspected repository does not establish a dedicated global state-management framework such as Redux, Zustand, MobX, or an equivalent application-wide store.

Current state is handled through mechanisms that include local React state in interactive components and browser-local helper modules where implemented.

A global state architecture must not be invented in documentation unless such an implementation is introduced and verified.

---

## No Certified Design System Claim

The repository contains reusable components, shared visual patterns, CSS Modules, and existing product colors/styles.

That is not sufficient by itself to claim that the current implementation constitutes a complete or formally governed design system.

Detailed visual/design authority belongs under `docs/design/` once those documents are inspected and validated.

Frontend architecture should document implementation structure, not promote repeated styles into unverified design governance.

---

## Route Protection Is Not a Frontend Assumption

The existence of `/dashboard` and post-login navigation to that route does not prove that the route is server-protected.

The inspected authentication proxy synchronizes session state but does not establish route-specific redirect protection.

Therefore frontend architecture must not treat navigation intent as an authorization guarantee.

Detailed authentication and authorization boundaries belong in `authentication.md` and `database.md`.

---

## Frontend and Backend Boundary

The current intended implementation boundary can be represented as:

```text
Route / interactive component
          ↓
Frontend behavior
          ↓
Repository operation where adopted
          ↓
Supabase client
          ↓
Database
```

However, current runtime adoption is incomplete, so some routes instead rely on static/local data or browser-local storage.

The repository layer remains the documented data-access boundary where it is used; frontend code must not be documented as universally repository-backed until verified.

---

## Current Scope and Non-Claims

This document does not claim that the current frontend has:

- complete repository-backed data fetching;
- a completed migration from localStorage to Supabase progress;
- a global state-management framework;
- a formally certified design system;
- universal Server Component data loading;
- universal Client Component rendering;
- server-enforced route protection;
- complete implementation of every component file;
- completed product flows merely because routes exist;
- a general custom API client architecture.

Those capabilities require separate verified evidence before they can be documented as current frontend architecture.

---

## Verification Rule

Before changing this document:

1. inspect the current control kernel;
2. inspect `system-overview.md`, `backend-architecture.md`, and `authentication.md`;
3. inspect current `app/` route structure;
4. inspect current `components/` structure and relevant component implementations;
5. inspect global and module-scoped styling where affected;
6. inspect static/local data and browser-storage helpers where affected;
7. verify repository adoption before claiming database-backed frontend flows;
8. distinguish component/route presence from implementation completeness;
9. avoid inventing design-system, global-state, route-protection, or data-fetching architecture;
10. update `PROJECT_CONTROL.md` when frontend architecture or repair status materially changes.

The governing discipline remains:

> Verify before change. No guessing.
