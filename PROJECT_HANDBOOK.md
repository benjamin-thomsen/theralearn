# TheraLearn – Project Handbook

> Version: 1.0
>
> Status: Active
>
> Role: Project governance, authority map, workflow entry point, and documentation routing
>
> Last consolidated: 2026-08-12

---

## Purpose

This Handbook is the control entry point for work on TheraLearn.

Its purpose is not to contain all project knowledge. Its purpose is to ensure that every working session can determine:

- which information source is authoritative;
- where permanent information belongs;
- what must be read before making changes;
- how work moves from inspection to decision to implementation and verification;
- how temporary chat knowledge becomes permanent repository knowledge;
- how to recover project context without reconstructing old chats.

The Handbook routes information. It does not duplicate detailed product, architecture, implementation, or current-state documentation.

---

## Start Here

Before substantial project work, read these documents in this order:

1. `PROJECT_HANDBOOK.md` — governance and workflow rules;
2. `PROJECT_OVERVIEW.md` — stable identity and permanent high-level principles;
3. `PROJECT_CONTROL.md` — current verified state and next allowed action;
4. `INDHOLDSFORTEGNELSE.md` — generated repository navigation map; not project authority;
5. the relevant authoritative domain document under `docs/`;
6. the actual implementation files relevant to the task.

`INDHOLDSFORTEGNELSE.md` is a generated navigation aid derived from Git-tracked repository files. It helps locate relevant repository material but does not replace or override `PROJECT_CONTROL.md`, authoritative domain documentation, or implementation authority.

Do not infer current project state from old chats when `PROJECT_CONTROL.md` provides a newer verified state.

---

## Authority Model

TheraLearn separates stable authority, current state, domain knowledge, implementation, and historical evidence.

### Stable project authority

`PROJECT_OVERVIEW.md` owns:

- stable project identity;
- permanent high-level methodological principles;
- stable architectural concepts;
- the high-level documentation model.

### Current project authority

`PROJECT_CONTROL.md` owns:

- current phase;
- verified implementation baseline;
- current task;
- next allowed action;
- current risks and unresolved inconsistencies;
- code-change permission;
- documentation-repair progress.

### Governance and routing authority

`PROJECT_HANDBOOK.md` owns:

- authority rules;
- information placement rules;
- workflow entry and exit rules;
- working-session lifecycle;
- project-context recovery procedure;
- documentation routing.

### Domain authority

Documents under `docs/` own detailed permanent knowledge for their domains.

Examples:

- `docs/product/` — product and learning-model knowledge;
- `docs/architecture/` — architecture and technical boundaries;
- `docs/development/` — development workflow and Developer Toolkit details;
- `docs/design/` — design system and UX principles;
- `docs/decisions/` — durable architectural/technical decisions;
- `docs/guides/` — operational instructions;
- `docs/references/` — supporting reference material;
- `docs/changelog/` — change history where applicable.

### Implementation authority

Source code, configuration, migrations, generated types, and tests are authoritative for what is actually implemented.

Implementation does not silently redefine methodology or architecture. If implementation and authoritative documentation conflict, the conflict must be surfaced and resolved.

### Historical evidence

Git history and historical review material provide traceability and revision evidence.

Historical chats are not active project authority.

---

## Core Information Rule

> Information has one permanent home.

Permanent information must be placed in the document or implementation artifact that owns it.

Other documents should reference that home rather than maintain independent copies.

The project therefore follows:

> Information moves – it is not copied.

Duplication is treated as an authority risk because copies can drift apart.

---

## Chat and Working-Session Rule

A chat is a working session.

It may contain:

- analysis;
- hypotheses;
- temporary status;
- review discussion;
- proposed decisions;
- implementation guidance;
- verification output.

A chat is not the permanent project memory.

Before a working session is considered complete, any new permanent information must be transferred to its authoritative repository home.

If a session only verifies existing information and creates no new permanent knowledge, no documentation transfer is required beyond any necessary `PROJECT_CONTROL.md` state update.

---

## Information Lifecycle

Permanent project information follows this lifecycle:

```text
Observation / Question
        ↓
Inspection
        ↓
Analysis
        ↓
Proposed Decision
        ↓
Validation / Refutation
        ↓
Verified Decision
        ↓
Authoritative Placement
        ↓
Implementation (when applicable)
        ↓
Verification
        ↓
Project Control Update
```

Information must not become permanent merely because it appeared in a chat or implementation attempt.

---

## Workflow Gate

The default project workflow is:

```text
Project Control
    ↓
Inspect existing state
    ↓
Use Developer Toolkit where supported
    ↓
Structured evidence
    ↓
Determine information owner / responsibility
    ↓
Derive proposed change
    ↓
Validate against authoritative principles
    ↓
Implement one controlled change
    ↓
Verify
    ↓
Update authoritative documentation / Project Control
    ↓
Commit and preserve traceability
```

`PROJECT_CONTROL.md` determines the current phase and next allowed action.

A task must not bypass the current workflow gate simply because implementation is technically possible.

---

## Verify Before Change

Before changing a file or system state:

1. inspect the existing state;
2. identify the authoritative source;
3. determine whether the requested change conflicts with an established decision;
4. verify dependencies and consequences relevant to the change;
5. make the smallest coherent change;
6. verify the result.

The project rule is:

> No guessing.

---

## Derivation Rule

Architectural and workflow changes are derived from established principles and verified constraints.

They are not invented ad hoc to solve a local implementation problem.

If an existing certified principle appears insufficient, the correct action is to expose and test that limitation rather than silently extend the principle through implementation.

---

## Foundation Rule

The certified Foundation is the architectural reference point for derived project rules.

Its posture is:

> Closed for Extension, Open for Refutation.

This means implementation and later architecture work may derive consequences from the Foundation but may not silently add new foundational rules.

A demonstrated contradiction or failed assumption may trigger refutation/review.

---

## Responsibility Rule

Architecture is organized conceptually around responsibilities and authority boundaries before implementation components.

The methodological responsibility model identifies:

- interpretation responsibility;
- authority responsibility;
- state responsibility;
- placement responsibility;
- execution responsibility;
- verification responsibility.

Folders, services, files, classes, and tools are implementation mechanisms. They do not define the responsibility model.

---

## Phase Discipline

TheraLearn distinguishes between:

```text
Design
↓
Validation
↓
Certification
↓
Architecture Derivation
↓
Implementation Architecture Derivation
↓
Responsibility Derivation
↓
Implementation
↓
Verification
↓
Certification / Review
```

A later phase must not silently redefine an earlier certified phase.

The current active phase is always recorded in `PROJECT_CONTROL.md`.

---

## Certification Principle

Important methodological models are not certified merely by accumulating confirming examples.

The project uses systematic refutation attempts to search for contradictions, missing responsibility classes, invalid boundaries, and hidden assumptions.

Certification means that the defined challenge process has been passed to the required level; it does not mean a model can never be questioned again.

---

## Developer Toolkit Rule

The Developer Toolkit supports and implements the workflow.

Use it before raw Terminal operations when it already supports the required action.

The Toolkit does not define methodology.

If the same workflow failure occurs repeatedly, do not keep working around it manually. Apply:

> Fix the System, Not the Symptom.

And:

> Use the System Before Bypassing It.

A repeated workflow failure should be treated as a pattern worth evaluating for a system-level fix.

Detailed Toolkit architecture belongs in `docs/development/`.

---

## Terminal and Editing Discipline

Operational work should remain controlled and reviewable.

Preferred behavior:

- one coherent action at a time;
- short, understandable commands;
- avoid fragile multi-line shell constructions when a Toolkit workflow can perform the task;
- inspect before overwrite;
- verify after modification;
- preserve complete verification output when it is needed for review;
- keep Git history meaningful and scoped to coherent changes.

### Codex and Host-Shell Responsibility Boundary

Codex operates unconditionally as a local-only repository assistant. Within the bounded authorization recorded in `PROJECT_CONTROL.md`, Codex may inspect repository files, edit authorized files, review local changes without Git, and run local verification that does not require Git, GitHub, or network access.

Codex must not:

- run Git commands;
- commit or push changes;
- access GitHub or any other network resource;
- perform remote verification;
- claim that a commit, push, remote branch state, or remote verification has occurred.

The host shell owns all Git operations, GitHub access, commits, pushes, and remote verification. Any resulting remote state becomes project authority only after it has been established outside Codex and accurately recorded in the appropriate authoritative project document.

---

## Documentation Change Rule

When a decision or implementation changes permanent project knowledge:

1. identify the authoritative document;
2. update that document rather than creating a competing copy;
3. update cross-references only where necessary;
4. update `PROJECT_CONTROL.md` if current state, risk, phase, task, or next action changed;
5. verify documentation and implementation consistency.

A directory existing does not prove its documentation is complete.

Documentation verification must eventually test both structure and content integrity.

---

## New Chat / Context Recovery Procedure

A new chat must not require reconstruction of the entire project history.

For a fresh working session:

1. read `PROJECT_HANDBOOK.md`;
2. read `PROJECT_OVERVIEW.md`;
3. read `PROJECT_CONTROL.md`;
4. read only the domain documentation relevant to the current task;
5. inspect the current implementation before proposing changes.

Every recovered session must also apply the permanent local-only Codex and host-shell responsibility boundary defined under **Terminal and Editing Discipline**.

Historical chats should be loaded only when a specific unresolved claim requires historical evidence that is not available in authoritative documentation or Git history.

If conversation length begins to threaten accuracy or continuity, start a new chat before context quality degrades and use these repository documents as the handoff mechanism.

---

## Historical Reconstruction Rule

Historical reconstruction is revision work, not active project control.

Its purpose is to recover permanent decisions that failed to reach their intended authoritative documentation home.

Recovered information must be classified before placement:

- permanent principle → stable authority/domain documentation;
- current fact → `PROJECT_CONTROL.md`;
- detailed historical evidence → historical/revision material;
- superseded information → history only;
- implementation fact → code/configuration plus appropriate documentation reference.

Historical material must not overwrite current verified state merely because it is older or more detailed.

---

## Conflict Resolution

When sources disagree, do not silently choose one.

Determine the type of conflict:

- stable principle conflict;
- current-state drift;
- documentation vs implementation drift;
- duplicate authority;
- historical vs current-state mismatch;
- unverified assumption.

Then resolve the conflict through inspection, validation, and the appropriate authority layer.

Record current unresolved conflicts in `PROJECT_CONTROL.md`.

---

## Completion Criteria for a Work Session

A work session is complete when applicable conditions are satisfied:

- requested work is implemented or explicitly deferred;
- verification has been performed;
- permanent knowledge has reached its authoritative home;
- current project state is reflected in `PROJECT_CONTROL.md`;
- no important decision exists only in chat;
- Git state is understood;
- the next allowed action is clear.

---

## Current Project State

Do not maintain current project status in this Handbook.

Read:

`PROJECT_CONTROL.md`

for the current phase, verified state, risks, current task, and next allowed action.

Read:

`PROJECT_OVERVIEW.md`

for stable project identity and permanent high-level principles.

---

## Governance Summary

TheraLearn is governed by five practical rules:

1. **Verify before change.**
2. **Derive before inventing.**
3. **Give information one authoritative home.**
4. **Let implementation realize architecture rather than redefine it.**
5. **Finish work by transferring permanent knowledge out of the chat and into the repository.**

The purpose of this Handbook is fulfilled when a future working session can recover project authority, current state, and the correct next action without reconstructing historical chats.
