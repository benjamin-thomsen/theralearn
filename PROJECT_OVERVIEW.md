# TheraLearn – Project Overview

> Version: 1.0
>
> Status: Active
>
> Role: Stable project identity and permanent high-level principles
>
> Last consolidated: 2026-08-12

---

## Purpose

TheraLearn is a learning platform designed to support structured learning, initially with psychotherapy education as the first content domain.

This document owns the stable identity of the project. It describes what TheraLearn is and the permanent high-level principles that govern its development.

Current project state, current tasks, risks, and next actions do not belong here. They belong in `PROJECT_CONTROL.md`.

Detailed domain knowledge belongs in the relevant document under `docs/`.

---

## Product Direction

TheraLearn is intended to provide an integrated learning experience around structured curriculum content, including:

- curriculum / syllabus content;
- flashcards;
- quizzes;
- learning progress;
- reading support;
- multilingual support, initially Danish and English.

Product details and learning-model details belong in the authoritative product documentation under `docs/product/`.

---

## Permanent Methodological Principles

### 1. Derivation before invention

New architectural and workflow decisions must be derived from already established principles and verified constraints rather than invented ad hoc during implementation.

### 2. Workflow before implementation

Method, responsibility, placement, and verification are established before implementation whenever the change affects project structure or architecture.

### 3. Verify before change

Existing state must be inspected before modification.

The project follows the rule:

> No guessing.

### 4. Information has one authoritative home

Permanent project information must have one authoritative location.

Information is moved to its authoritative home rather than copied into multiple competing documents.

Cross-references are preferred over duplicated definitions.

### 5. Documentation is project memory

Chats are working sessions, not the permanent source of project truth.

Permanent decisions, architecture, project state, and workflow knowledge must be transferred into the repository documentation.

### 6. Responsibility before components

Architecture is reasoned about in terms of responsibilities and authority boundaries before mapping those responsibilities to folders, services, files, classes, or other implementation components.

### 7. Implementation realizes architecture

Implementation must realize the established architecture. Implementation must not silently redefine architectural rules.

### 8. Certification through refutation

Important methodological models are strengthened through systematic attempts to disprove them rather than through repeated confirmation alone.

### 9. Phase separation

The project distinguishes between design, validation, certification, architectural derivation, implementation architecture, responsibility derivation, implementation, verification, and certification/review.

A later phase must not silently redefine an earlier certified phase.

### 10. Foundation authority

The certified Foundation is the architectural reference point for derived project rules.

Its governing posture is:

> Closed for Extension, Open for Refutation.

---

## Stable Architectural Concepts

The historical development established the following stable concepts:

- Workflow Principles;
- Information Lifecycle;
- Information Placement;
- State Transition;
- layered architecture;
- separation of Runtime and Tooling;
- responsibility contracts;
- Implementation Responsibility Model;
- systematic verification and certification.

Detailed architectural definitions belong in `docs/architecture/` and related authoritative documentation rather than being duplicated here.

---

## Responsibility Model

The methodological architecture identifies six distinct responsibilities:

1. Interpretation responsibility;
2. Authority responsibility;
3. State responsibility;
4. Placement responsibility;
5. Execution responsibility;
6. Verification responsibility.

These responsibilities form a methodological decomposition of the system. Implementation components may realize them, but components do not redefine the responsibilities.

---

## Documentation Model

The project uses the following information roles:

- `PROJECT_OVERVIEW.md` — stable project identity and permanent high-level principles;
- `PROJECT_CONTROL.md` — current verified project state and next allowed action;
- `PROJECT_HANDBOOK.md` — control entry point, authority rules, workflow, and navigation to authoritative information;
- `docs/` — domain-specific permanent documentation;
- Git history — implementation history and traceability;
- historical reviews — revision evidence and methodological history;
- chats — temporary working sessions.

The same information should not be maintained independently in multiple locations.

---

## Development Workflow Principles

The project follows these operational rules:

- inspect existing state before changing it;
- make controlled, understandable changes;
- prefer the Developer Toolkit before bypassing it with raw shell workflows when the Toolkit supports the task;
- fix repeated workflow problems in the system rather than repeatedly working around them;
- treat the second occurrence of the same workflow failure as a pattern worth addressing;
- verify changes after implementation;
- keep documentation and implementation synchronized;
- preserve traceability through Git.

---

## Developer Toolkit Role

The Developer Toolkit implements and supports the project workflow.

It does not define the project methodology.

Its purpose is to make inspection, editing, search, status reporting, verification, and other development workflows deterministic and efficient.

Its detailed architecture belongs under `docs/development/`.

---

## Historical Reconstruction

In August 2026, the project performed a historical reconstruction across prior working sessions because significant permanent knowledge had remained in chats while several intended authoritative documentation files were empty or incomplete.

The reconstruction re-established the methodological chain:

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

The permanent outcome of that reconstruction is represented in the project's authoritative documentation. Historical chat material remains revision evidence rather than active project control.

---

## Governance Rule

When a future decision conflicts with this overview or with a more specific authoritative document, the conflict must be made explicit and resolved through the project's validation and decision process.

No implementation change may silently overwrite an established methodological or architectural decision.
