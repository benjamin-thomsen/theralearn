# TheraLearn – Documentation

> Version: 1.0
>
> Status: Active
>
> Role: Entry point and routing map for domain documentation
>
> Last repaired: 2026-08-12

---

## Purpose

The `docs/` tree contains TheraLearn's domain-specific permanent documentation.

This file is the entry point to that tree. It explains where different kinds of domain knowledge belong and how readers should navigate the documentation without creating competing sources of authority.

This file does not own project governance, stable project identity, or current project state.

For those, start with the root control kernel:

1. `PROJECT_HANDBOOK.md` — governance, authority rules, workflow, and documentation routing;
2. `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
3. `PROJECT_CONTROL.md` — current verified state, current task, risks, and next allowed action.

After reading the control kernel, use this documentation tree for the domain relevant to the current task.

---

## Authority Rule

> Information has one permanent home.

Permanent information belongs in the document or implementation artifact that owns it.

Information should be moved to that authoritative home rather than copied into multiple documents. Other documents should reference the authoritative source when necessary.

The existence of a document or directory does not prove that its contents are complete, current, or verified.

Documentation structure and documentation completeness are separate concerns.

---

## Documentation Domains

### `architecture/`

Owns detailed architectural knowledge and technical boundaries, including system, frontend, backend, database, authentication, deployment, scalability, and related architecture topics where documented and verified.

Architecture documentation must reflect established project principles and verified implementation. It must not redefine the certified methodology through local technical descriptions.

### `product/`

Owns detailed product and learning-domain knowledge, including product vision, learning model, user needs, learning flows, MVP scope, and related product decisions where documented and verified.

### `design/`

Owns design-system and UX knowledge, such as visual language, typography, components, accessibility, and interaction principles where documented and verified.

### `development/`

Owns development workflow and engineering-practice documentation, including project structure, coding and testing practices, Developer Toolkit details, development roadmaps, and operational engineering conventions where documented and verified.

The Developer Toolkit implements the project workflow; it does not define the project methodology.

### `decisions/`

Owns durable architectural and technical decision records where a decision requires explicit traceability beyond the domain documentation that applies it.

### `guides/`

Owns operational instructions and task-oriented procedures, such as local development, release processes, content-authoring workflows, and other verified guides.

### `references/`

Owns supporting reference material used by the project. Reference material supports decisions but does not automatically become project authority.

### `meetings/`

Owns meeting records and meeting-specific decision evidence where retained. Meeting material is not a substitute for transferring permanent decisions to their authoritative domain home.

### `changelog/`

Owns documentation change history where the project chooses to maintain explicit changelog material.

### `templates/`

Owns reusable documentation templates. Templates define document shapes, not project facts or decisions.

### `company/`

Owns company-level documentation where applicable, separate from product, architecture, development, and current project-control state.

---

## How to Navigate the Documentation

For substantial project work, use this sequence:

```text
PROJECT_HANDBOOK.md
        ↓
PROJECT_OVERVIEW.md
        ↓
PROJECT_CONTROL.md
        ↓
Relevant docs/ domain
        ↓
Relevant implementation
```

`PROJECT_CONTROL.md` determines the current workflow gate and next allowed action.

Do not infer current project state from a domain document when `PROJECT_CONTROL.md` provides the current verified state.

Do not reconstruct historical chats as a default navigation method. Historical material should be consulted only when a specific unresolved documentation claim requires evidence that is not already available in authoritative documentation, implementation, or Git history.

---

## Documentation Integrity

A documentation check must distinguish at least two questions:

1. **Structure:** do the expected documentation locations exist?
2. **Content integrity:** are the relevant documents populated, current, internally consistent, and aligned with implementation and project authority?

Passing a structural directory check does not certify content completeness.

During the current documentation-repair phase, some domain files may be empty, stale, incomplete, or awaiting validation. Their presence must not be interpreted as proof that the corresponding domain has been fully documented.

Current repair status and known documentation gaps belong in `PROJECT_CONTROL.md`, not in this file.

---

## Change Rule

When permanent domain knowledge changes:

1. identify the domain that owns the information;
2. inspect the existing authoritative document and relevant implementation;
3. update the authoritative home rather than creating a duplicate definition;
4. update references only where necessary;
5. update `PROJECT_CONTROL.md` if the change materially affects current state, risks, task, phase, or next allowed action;
6. verify documentation and implementation consistency.

The governing rule remains:

> Verify before change. No guessing.

---

## Scope of This File

This README is a routing document for `docs/`.

It intentionally does not duplicate:

- the governance model in `PROJECT_HANDBOOK.md`;
- stable project principles in `PROJECT_OVERVIEW.md`;
- current project status in `PROJECT_CONTROL.md`;
- detailed knowledge owned by individual documentation domains.

Its purpose is fulfilled when a reader can identify the correct documentation domain without mistaking directory existence for documentation completeness or creating a second source of truth.
