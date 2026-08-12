# TheraLearn – Authentication Architecture

> Version: 1.0
>
> Status: Active; reflects verified current authentication/session implementation
>
> Role: Authoritative documentation of authentication identity, signup/login, confirmation, and session handling
>
> Last verified: 2026-08-12

---

## Purpose

This document describes the verified authentication and session architecture currently implemented in TheraLearn.

It covers the current email/password signup and login flows, email confirmation route, browser and server Supabase client boundaries, cookie/session handling, and the connection between authenticated identity and database authorization.

It does not claim capabilities that are not present in the inspected implementation.

---

## Authority Boundary

Authentication architecture owns the implemented identity and session flow between the application and Supabase Auth.

Database authorization and persisted profile structure are documented in `database.md`.

The verified relationship is:

```text
Supabase Auth identity
        ↓
Authenticated session
        ↓
Application clients / requests
        ↓
auth.uid()
        ↓
Database Row Level Security
```

Authentication answers who the current Supabase user is and how the session is established and propagated.

Database RLS decides which persisted rows that authenticated identity may access.

These concerns are connected but must not be conflated.

---

## Implemented Authentication Provider

The current authentication provider is Supabase Auth.

The application uses the Supabase SSR package for both browser and server client construction.

The current verified credential flow is email and password.

No current repository evidence has been established for OAuth providers, password-reset flows, role-based authentication, admin authentication, multi-factor authentication, or other alternative authentication methods. Those capabilities must not be inferred from Supabase support alone.

---

## Identity and Profile Separation

Authentication identity is owned by Supabase Auth in `auth.users`.

Application profile data is stored separately in `public.profiles`.

The database architecture establishes a one-to-one relationship in which:

```text
auth.users.id
      ↓
public.profiles.id
```

A database trigger creates the application profile after a Supabase Auth user is created and can initialize `full_name` from the signup metadata.

This means the signup flow creates authentication identity through Supabase Auth, while profile persistence is completed through the database trigger rather than through a separate client-side profile insert.

---

## Browser Supabase Client

`lib/supabase/client.ts` constructs the browser client with `createBrowserClient<Database>()`.

It reads:

- `NEXT_PUBLIC_SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, with fallback to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Missing configuration causes an explicit runtime error.

The client is typed against the generated `Database` contract.

The current signup and primary login UI use this browser client directly.

---

## Server Supabase Client

`lib/supabase/server.ts` constructs a server client with `createServerClient<Database>()`.

It uses Next.js `cookies()` as the server-side cookie boundary.

The client:

- reads all current request cookies through the cookie store;
- attempts to write cookies returned by Supabase;
- tolerates environments such as Server Components where direct cookie mutation may not be available.

The implementation explicitly relies on the request proxy to participate in session-cookie synchronization when cookie updates cannot be performed directly in the current server context.

The server client is used by the current confirmation route and by the separate server-side login action.

---

## Signup Flow

The current `/signup` page is a client component.

The verified signup flow is:

```text
User submits signup form
        ↓
Client-side validation
        ↓
Browser Supabase client
        ↓
supabase.auth.signUp()
        ↓
Supabase Auth user creation
        ↓
Email confirmation flow
        ↓
Database trigger creates public.profiles row
```

The client validates that:

- the two password fields match;
- the password contains at least six characters.

The signup request includes:

- email;
- password;
- `emailRedirectTo` pointing to `/auth/confirm` on the current application origin;
- `full_name` in Supabase user metadata.

If Supabase reports no new identity for the returned user, the UI reports that a user already exists for the email address.

On apparent signup success, the UI instructs the user to check email and follow the confirmation link.

The application does not independently create the profile row from the signup component.

---

## Email Confirmation Flow

`/auth/confirm` is implemented as a Next.js route handler.

The handler reads a `code` query parameter from the incoming URL.

The verified flow is:

```text
Confirmation request
        ↓
Read code
        ↓
Server Supabase client
        ↓
exchangeCodeForSession(code)
        ↓
Redirect to /login
```

If the code is missing, the route redirects to `/login` with an error message.

If `exchangeCodeForSession()` fails, it redirects to `/login` with an invalid/expired-link error.

If the exchange succeeds, it redirects to `/login` with a confirmation message indicating that the user may now log in.

The confirmation route therefore exchanges the Supabase confirmation code into session state but does not itself route the user directly into the authenticated application area.

---

## Login Flow

The current `/login` page is a client component and uses the browser Supabase client.

The primary verified UI flow is:

```text
User submits email/password
        ↓
Browser Supabase client
        ↓
supabase.auth.signInWithPassword()
        ↓
Successful session establishment
        ↓
router.push("/dashboard")
        ↓
router.refresh()
```

On authentication failure, the page presents a generic login error to the user.

The page also reads confirmation/error query parameters and displays confirmation-related status messages where present.

---

## Separate Server Login Action

A separate server action exists in `app/login/actions.ts`.

It:

- normalizes the submitted email;
- validates presence of email and password;
- creates the server Supabase client;
- calls `supabase.auth.signInWithPassword()`;
- redirects to `/` on success.

The currently inspected login page does not invoke this server action; it performs login directly through the browser client instead.

Therefore both implementations exist in the repository, but the browser-based login path is the currently wired login UI behavior.

This distinction is important because repository presence must not be mistaken for active route usage.

---

## Request Proxy and Session Synchronization

The root `proxy.ts` delegates matching requests to `lib/supabase/proxy.ts` through `updateSession(request)`.

The root matcher applies broadly to application requests while excluding Next.js static/image paths, favicon, and common static image files.

`updateSession()`:

1. creates a Next.js response;
2. constructs a typed Supabase server client over request cookies;
3. exposes cookie reads from the incoming request;
4. writes updated cookies both back onto the request representation and onto the outgoing response;
5. calls `supabase.auth.getClaims()`;
6. returns the resulting response.

This establishes the current request-level session synchronization boundary.

---

## Session Handling Does Not Equal Route Protection

The current proxy implementation refreshes/propagates authentication state, but the inspected code does not contain route-specific redirect or access-control logic.

In particular, the proxy does not currently verify a user and redirect unauthenticated requests away from `/dashboard` or other application routes.

Therefore this document does not describe any route as protected merely because the request passes through the auth/session proxy.

Route protection must be documented only when explicit route-level or request-level authorization logic has been verified.

---

## Authentication and Database Authorization

The database schema enables Row Level Security and uses `auth.uid()` for user-scoped data access.

Verified examples include:

- users may read/update only their own `profiles` row;
- users may read, insert, update, and delete only their own `lesson_progress` rows.

This creates the connection:

```text
Supabase authenticated session
        ↓
auth.uid()
        ↓
RLS policy evaluation
        ↓
Allowed or denied database row access
```

Authentication establishes identity; the database enforces row-level authorization.

The public learning-content policies operate separately through publication-state rules and may allow anonymous access where the content hierarchy is fully published.

Detailed RLS policy definitions belong in `database.md` and should not be duplicated here beyond the authentication connection.

---

## Current Error and Status Handling

The inspected UI handles authentication status primarily through user-facing messages.

Signup reports conditions including:

- mismatched passwords;
- password shorter than six characters;
- Supabase signup errors;
- already-existing identity indication;
- unexpected client-side failure;
- successful creation pending email confirmation.

Login reports authentication failure and confirmation-related status.

The confirmation route reports missing, invalid, or expired confirmation codes through redirects back to login.

These are current UI/error-flow implementation details and are not a replacement for architectural access-control guarantees.

---

## Current Scope and Non-Claims

This document does not claim that the current system implements:

- OAuth/social login;
- password reset or account recovery;
- user roles;
- administrator authentication;
- role-based authorization;
- multi-factor authentication;
- server-enforced protection of `/dashboard` or other routes;
- account deletion UI;
- profile-editing flows beyond the database's own-profile update policy;
- custom session duration or token policy;
- custom email templates or delivery architecture.

Those capabilities require separate inspected evidence before they can be documented as current authentication architecture.

---

## Topic Routing

Use:

- `database.md` for `auth.users`/`profiles` persistence relationships, RLS definitions, and database authorization details;
- `backend-architecture.md` for server-side application and repository boundaries;
- `frontend-architecture.md` for auth form/component presentation and client-side UI behavior where architectural detail is needed;
- `security.md` for broader security architecture once verified and populated.

---

## Verification Rule

Before changing this document:

1. inspect the current control kernel;
2. inspect `system-overview.md` and `database.md`;
3. inspect current signup and login code paths;
4. inspect the confirmation route;
5. inspect browser/server Supabase client construction;
6. inspect the root and Supabase proxies;
7. inspect relevant database identity and RLS rules;
8. distinguish session synchronization from route authorization;
9. distinguish repository presence from code that is currently wired into the runtime;
10. update `PROJECT_CONTROL.md` when authentication architecture or repair status materially changes.

The governing discipline remains:

> Verify before change. No guessing.
