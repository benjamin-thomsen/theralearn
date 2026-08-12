# TheraLearn – Foundation Documentation

> Version: 1.0
>
> Status: Active entry point; detailed certified content not yet transferred
>
> Role: Authority boundary and ownership map for TheraLearn's certified methodology
>
> Established: 2026-08-12

---

## Purpose

The `docs/foundation/` domain is the permanent home for TheraLearn's detailed certified methodology.

It exists because the project's methodological Foundation is upstream of architecture, product interpretation, development workflow, Tooling, and implementation, while the root control kernel intentionally serves different roles: governance, stable high-level project identity, and current state.

This README establishes the Foundation domain boundary and future ownership map. It does not yet transfer the detailed certified Foundation content.

---

## Authority Position

The Foundation domain sits below the root control kernel and above downstream domain interpretation.

```text
PROJECT_HANDBOOK.md
PROJECT_OVERVIEW.md
PROJECT_CONTROL.md
        ↓
docs/foundation/
        ↓
docs/architecture/
docs/product/
docs/development/
other domain documentation
        ↓
implementation
```

The root control kernel remains the working entry point to the project.

`docs/foundation/` owns the detailed permanent methodology needed to preserve the meaning and constraints from which downstream architecture and implementation are derived.

---

## What Foundation Owns

The Foundation domain may own detailed permanent material such as:

- certified Foundation definitions and invariants;
- the methodological dependency chain;
- information and state principles that are part of the certified model;
- certified responsibility boundaries and responsibility model;
- derivation relationships required to interpret architecture correctly;
- permanent certification status, scope, and methodological closure where supported by verified evidence.

Exact child-document ownership must be established before detailed content is transferred.

This README does not itself become the container for all Foundation detail.

---

## What Foundation Does Not Own

### Root governance and workflow

Project governance, workflow gates, context recovery, and information-placement rules as project-control mechanisms remain in `PROJECT_HANDBOOK.md`.

### Stable high-level project identity

Stable project identity and high-level permanent principles remain in `PROJECT_OVERVIEW.md`.

### Current state

Current phase, verified implementation state, risks, current task, and Next Allowed Action remain in `PROJECT_CONTROL.md`.

### Detailed architecture

System, database, authentication, backend, frontend, and other verified implementation architecture belong in `docs/architecture/`.

### Product and learning-domain definitions

Product vision, learning model, user needs, learning flows, and product scope belong in `docs/product/`.

### Development and Tooling

Developer Toolkit implementation, engineering workflow details, coding/development conventions, and tooling roadmaps belong in `docs/development/`.

### Raw historical evidence

Historical chat transcripts, reconstruction dumps, and raw review evidence are not Foundation authority merely because they contain historical Foundation discussion.

Evidence may support repair. Permanent methodology belongs in the Foundation documents that own it.

---

## Difference from `docs/decisions/`

`docs/decisions/` is intended for durable decision records and traceability for discrete decisions.

Foundation is not a collection of independent ADRs.

A Foundation statement may have historical decision evidence, but its permanent methodological meaning belongs in the Foundation document that owns that concept rather than being reconstructed from a sequence of decision records each time it is needed.

---

## Difference from `docs/references/`

`docs/references/` owns supporting material such as terminology, glossaries, dependencies, and external resources where maintained.

References can explain or support Foundation concepts, but reference material does not define the certified methodology.

The authority direction is:

```text
Foundation may use references as support

not

References define Foundation authority
```

---

## Difference from `docs/architecture/`

Architecture is downstream of the Foundation.

Architecture documents describe verified system structure and implementation boundaries derived under established project principles.

They must not redefine the methodology in response to implementation convenience.

The governing relationship remains:

```text
Foundation
    ↓
Architecture derivation
    ↓
Implementation architecture
    ↓
Implementation
    ↓
Verification
```

Implementation realizes the architecture; it does not silently redefine the Foundation.

---

## Difference from `docs/product/`

Product documentation owns what TheraLearn should provide to users and how the learning/product domain is defined.

Foundation owns the certified project methodology used to preserve authority, state, responsibility, placement, derivation, and verification boundaries.

Product needs may motivate implementation work, but they do not silently rewrite certified methodological constraints.

---

## Difference from `docs/development/`

Development documentation owns engineering practice and the Developer Toolkit.

The Toolkit implements and supports the workflow; it does not define the methodology.

Therefore Foundation authority must remain upstream of Tooling:

```text
Foundation / project authority
        ↓
Development workflow
        ↓
Developer Toolkit
```

Placing detailed Foundation material under development would reverse this dependency and is therefore intentionally avoided.

---

## Transfer Rule

Detailed certified methodology is to be **transferred, not re-derived**.

Foundation repair must preserve the already established methodological meaning.

For each future Foundation document:

1. identify the exact permanent concept the document will own;
2. identify current authoritative evidence already available in the control kernel and repository;
3. identify whether historical reconstruction evidence is actually required;
4. separate permanent methodological meaning from historical process narrative;
5. transfer only verified permanent content into its single authoritative home;
6. reference that home from downstream documents rather than copying the definition;
7. verify that the transfer has not expanded, narrowed, or reinterpreted the certified model.

No Foundation document should be populated merely because a historical phase name exists.

---

## Historical Evidence Rule

Historical chats and reconstruction material are evidence sources, not default authority.

They should be consulted only when a specific Foundation claim cannot be established from current authoritative documentation and repository evidence.

When historical evidence is needed, the purpose is targeted recovery of a missing permanent claim — not wholesale recreation of old conversations.

The distinction is:

```text
Historical evidence
        ↓ supports
Verified permanent claim
        ↓ transferred to
Authoritative Foundation home
```

Raw historical material should not be copied into Foundation documents as a substitute for synthesis and verification.

---

## Minimal Future Ownership Map

The verified methodological chain provides a routing map for future Foundation content without requiring that every historical phase become a separate file.

Potential ownership areas include:

### Foundation model

Owns the certified core definitions, invariants, information/state principles, and methodological closure of Foundation v1.0.

### Mechanisms and validation

Owns permanent mechanism/state/placement relationships only where they remain necessary to define the certified Foundation, without preserving obsolete working-session narrative.

### Responsibility model

Owns the permanent derived responsibility boundaries and the six-responsibility model where verified as part of the certified methodology.

### Derivation and certification

Owns the permanent dependency relationship between Foundation, derivation, analysis, certification, and implementation, plus certification scope/status where this remains necessary for downstream interpretation.

This map is intentionally conceptual at this stage.

No child files are created by this step, and no final child-file names are authoritative until `PROJECT_CONTROL.md` explicitly authorizes them.

---

## Methodological Chain

The currently reconstructed methodological sequence is:

```text
Foundation Design
    ↓
Mechanism Design
    ↓
Foundation Validation
    ↓
Foundation Certification
    ↓
Architecture Derivation
    ↓
Implementation Architecture Derivation
    ↓
Implementation Responsibility Model
    ↓
Completeness Analysis
    ↓
Historical Certification Review
```

This sequence is a routing/evidence map for repair.

It must not automatically be converted into nine permanent documents. Permanent document structure should follow information ownership, not chat/session chronology.

---

## Documentation Integrity Rule

Foundation completeness is not measured by the number of files created.

A Foundation document is trustworthy when:

- its authority boundary is explicit;
- its permanent claims are supported by verified evidence;
- it owns information that does not already have another permanent home;
- it does not duplicate root control, architecture, product, or development authority;
- it preserves the certified meaning without introducing new meta-principles;
- downstream documentation can reference it without needing historical chat reconstruction.

---

## Current Status

At establishment of this README:

- the Foundation domain placement has been verified;
- the Foundation entry point now exists;
- detailed Foundation content has **not** yet been transferred;
- no Foundation child documents have yet been created;
- historical chats are not required for the placement decision;
- ordinary MVP feature development remains governed by `PROJECT_CONTROL.md` and is not authorized by this document.

---

## Change Rule

Before creating or changing detailed Foundation documentation:

1. read the root control kernel;
2. read this Foundation entry point;
3. follow `PROJECT_CONTROL.md` for the current authorized transfer target;
4. inspect existing authority before creating a new permanent home;
5. use historical evidence only for a concrete unresolved claim;
6. transfer permanent information rather than copying historical narrative;
7. update `PROJECT_CONTROL.md` whenever Foundation repair materially changes progress, risks, task, or Next Allowed Action.

The governing discipline remains:

> Verify before change. No guessing.
