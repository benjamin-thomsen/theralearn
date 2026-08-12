# TheraLearn – Architecture Documentation

> Version: 1.0
>
> Status: Active entry point; domain content under repair
>
> Role: Authority boundary and routing map for architecture documentation
>
> Last repaired: 2026-08-12

---

## Purpose

The `docs/architecture/` domain owns TheraLearn's detailed permanent architecture knowledge.

This README is the entry point to that domain. Its purpose is to define the architecture documentation boundary, route readers to architecture topics, and prevent empty or incomplete placeholder files from being mistaken for verified architecture documentation.

This README does not redefine the project's methodological foundation or stable high-level principles.

Before architecture work, read the root control kernel:

1. `PROJECT_HANDBOOK.md` — governance, workflow, authority, and information-placement rules;
2. `PROJECT_OVERVIEW.md` — stable project identity, permanent methodological principles, and stable architectural concepts;
3. `PROJECT_CONTROL.md` — current verified state, documentation-repair status, and next allowed action.

---

## Authority Boundary

Architecture documentation owns detailed definitions of system structure, technical boundaries, interactions, responsibilities as realized architecturally, and verified architectural constraints.

It does not own:

- project governance or workflow rules;
- current project state;
- product and learning-model definitions;
- temporary implementation observations;
- historical chat reconstruction;
- implementation details that have not been validated as architectural knowledge.

Those belong in their respective authoritative homes.

The project-wide rule remains:

> Information has one permanent home.

Architecture documents should reference higher-level authority rather than copy and independently maintain its definitions.

---

## Methodology and Architecture

TheraLearn reasons about architecture through responsibilities and authority boundaries before mapping those responsibilities to implementation components.

The stable methodological concepts and responsibility model are owned at the project level by `PROJECT_OVERVIEW.md` and the governance model in `PROJECT_HANDBOOK.md`.

Detailed architecture documents may describe how those established responsibilities and boundaries are realized in the system, but they must not silently extend or redefine the certified methodology.

The governing relationship is:

```text
Established principles and verified constraints
                ↓
Architecture derivation
                ↓
Implementation architecture
                ↓
Implementation components
                ↓
Verification
```

Implementation realizes architecture. It does not silently redefine it.

If implementation conflicts with established architecture, the conflict must be surfaced and resolved rather than converted into a new architectural rule by description alone.

---

## Architecture Topics

The directory currently contains topic files for areas including:

- `system-overview.md` — system-level architecture and major boundaries;
- `frontend-architecture.md` — frontend responsibilities and structure;
- `backend-architecture.md` — backend responsibilities and structure;
- `database.md` — persistence model and database architecture;
- `authentication.md` — authentication architecture and boundaries;
- `api.md` — API-related architecture where applicable;
- `integrations.md` — external integration boundaries where applicable;
- `security.md` — architectural security concerns where documented;
- `deployment.md` — deployment architecture where documented.

A filename is a routing target, not evidence of completeness.

At the current repair stage, multiple architecture topic files are empty placeholders. They must not be cited or treated as completed architectural authority until their content has been populated or validated from verified evidence.

---

## Documentation Completeness

Architecture documentation is currently being repaired and synchronized.

The architecture directory structure exists, but structure alone does not certify architecture content.

For each topic document, repair must distinguish between:

1. **verified permanent architecture** — suitable for authoritative placement;
2. **verified implementation fact** — evidence that may support architecture documentation but is not automatically an architectural rule;
3. **historical evidence** — used only when a concrete documentation gap requires it;
4. **unverified assumption** — must not be documented as fact;
5. **placeholder structure** — indicates an intended documentation location, not completed knowledge.

Current repair progress, risks, and sequencing belong in `PROJECT_CONTROL.md`.

---

## Repair and Verification Rule

Before populating an individual architecture document:

1. inspect the current control kernel;
2. inspect the target architecture file;
3. inspect relevant implementation and configuration;
4. identify any already-established architectural authority that applies;
5. use historical material only if a specific unresolved claim still lacks evidence;
6. separate permanent architecture from implementation detail;
7. write only what can be supported by verified evidence;
8. verify the resulting document against both project principles and implementation;
9. update `PROJECT_CONTROL.md` when the repair changes current progress, risks, task, or next allowed action.

The rule is:

> Verify before change. No guessing.

---

## Navigation Rule

For architecture work, use this path:

```text
PROJECT_HANDBOOK.md
        ↓
PROJECT_OVERVIEW.md
        ↓
PROJECT_CONTROL.md
        ↓
docs/README.md
        ↓
docs/architecture/README.md
        ↓
Target architecture topic
        ↓
Relevant implementation
```

Do not begin from an empty topic file and infer architecture from its filename.

Do not use historical chats as the default architecture source.

Do not copy stable project principles into each architecture topic document. Reference their authoritative home and document only the domain-specific architectural consequences needed by that topic.

---

## Completion Standard

The architecture documentation domain is not complete merely because all topic files contain text.

A topic is trustworthy when its content:

- has a clear authority boundary;
- is supported by verified project or implementation evidence;
- does not duplicate higher-level authority unnecessarily;
- does not contradict certified principles;
- distinguishes architectural rules from implementation mechanisms;
- is consistent with related architecture documents;
- has been verified after change.

Until those conditions are met, documentation presence must not be interpreted as architecture certification.
