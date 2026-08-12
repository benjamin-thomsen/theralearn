# TheraLearn – Foundation Model v1.0

> Version: 1.0
>
> Status: Certified and locked; authoritative Foundation ownership unit
>
> Role: Upstream certified methodological core for downstream derivation
>
> Established in authoritative Foundation documentation: 2026-08-12

---

## Purpose

This document owns the upstream methodological core of the TheraLearn Foundation.

Its purpose is to preserve the permanent constraints that govern how project knowledge, architecture, responsibility, implementation, and verification may be derived.

It does not describe current project state, detailed implementation architecture, product requirements, Developer Toolkit behavior, the detailed six-responsibility model, individual falsification attempts, or historical certification chronology.

Those concerns have other authoritative homes or are historical evidence rather than permanent Foundation authority.

---

## Authority Position

The Foundation is the methodological reference point for downstream derivation.

Its authority relationship is:

```text
Root project control kernel
        ↓
Foundation Model
        ↓
Derived architecture and domain interpretation
        ↓
Implementation architecture
        ↓
Implementation
        ↓
Verification
```

The root control kernel governs project workflow and current state. This Foundation Model owns the permanent methodological constraints that downstream work must preserve.

A downstream implementation or local design convenience cannot silently become a new Foundation rule.

---

## Foundation Posture

The certified Foundation follows:

> Closed for Extension, Open for Refutation.

### Closed for Extension

Downstream architecture, implementation, Tooling, and workflow work may derive consequences from the Foundation but may not silently add new foundational principles merely because a local problem would be easier to solve that way.

If a new concern can be handled by an existing principle, it remains a derivation or implementation concern rather than a Foundation extension.

### Open for Refutation

The Foundation is not protected from evidence.

A demonstrated contradiction, failed assumption, missing necessary boundary, or successful falsification may require review of the Foundation.

Refutation is therefore permitted; silent extension is not.

---

## Derivation Before Invention

New architectural and structural decisions must be derived from established principles and verified constraints rather than invented ad hoc during implementation.

The dependency direction is:

```text
Established principle / verified constraint
        ↓
Derivation
        ↓
Proposed consequence
        ↓
Validation
        ↓
Authorized downstream realization
```

Implementation convenience is not sufficient authority for a new methodological rule.

If an established principle appears insufficient, the limitation must be made explicit and tested rather than silently repaired through an invented local convention.

---

## Verify Before Change

Foundation discipline requires that claims about existing state be grounded before they are used to justify change.

The project expresses this constraint as:

> Verify before change.

and:

> No guessing.

At Foundation level, this means a downstream decision must distinguish verified state from assumption before derivation or modification occurs.

The detailed operational inspection/editing workflow remains governed by `PROJECT_HANDBOOK.md`; this document owns only the methodological requirement that unverified assumptions must not silently become design authority.

---

## One Authoritative Home

Permanent project information must have one authoritative home.

The same permanent meaning must not be maintained as independent competing definitions in multiple locations.

The governing information rule is:

> Information has one permanent home.

and its placement consequence is:

> Information moves – it is not copied.

Cross-references may exist wherever context requires them, but authority remains with the document or implementation artifact that owns the information.

Duplication is an authority risk because independent copies can diverge and create multiple incompatible truths.

---

## Information Placement

Information placement is determined by ownership, not by where the information happened to be discovered or discussed.

Examples of the distinction are:

```text
Working-session observation
        ≠ permanent authority

Historical evidence
        ≠ current authority

Implementation fact
        ≠ methodological principle

Repeated definition
        ≠ stronger authority
```

A verified piece of permanent information must be transferred to the location that owns its meaning.

Downstream documents reference upstream authority instead of redefining it.

---

## Information Lifecycle

Permanent project information follows a controlled transition from uncertainty to authority.

The established lifecycle is:

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

This lifecycle distinguishes temporary reasoning from permanent project knowledge.

Information does not become authoritative merely because it appears in a chat, document draft, implementation attempt, or repeated discussion.

Authoritative placement follows verification.

---

## State Transition Principle

Project knowledge and project work move through explicit states rather than being treated as permanently valid from first appearance.

At the methodological level, a statement may move from observation or proposal toward verified decision and authoritative placement only through the required inspection and validation boundaries.

A later state must not be assumed before its transition criteria are satisfied.

This principle prevents proposed, historical, implemented, and verified information from being treated as interchangeable states.

Detailed current-state tracking belongs in `PROJECT_CONTROL.md`; this document owns only the permanent requirement that state transitions preserve their boundaries.

---

## Responsibility Before Components

Architecture is reasoned about in terms of responsibilities and authority boundaries before those responsibilities are mapped onto implementation components.

The direction is:

```text
Meaning / responsibility / authority
        ↓
Architectural boundary
        ↓
Implementation mechanism
```

not:

```text
Folder / service / file / class / tool
        ↓
Invented responsibility
```

Folders, services, files, classes, database tables, UI components, commands, and tools are implementation mechanisms.

Their existence does not define the methodological responsibility model.

The detailed six-responsibility model is owned separately by `docs/foundation/RESPONSIBILITY_MODEL.md`.

---

## Authority and Execution Are Distinct

The existence of a mechanism capable of performing an action does not by itself grant that mechanism authority to define the action's meaning or legitimacy.

At Foundation level, authority and execution must therefore remain conceptually separable.

This preserves the distinction between:

- what a change means;
- who or what owns the governing rule;
- what state is valid;
- where permanent information belongs;
- what mechanism executes an authorized action;
- what verifies the result.

The detailed decomposition of these concerns belongs in `docs/foundation/RESPONSIBILITY_MODEL.md`.

---

## Phase Separation

TheraLearn separates methodological phases so that a later phase cannot silently rewrite an earlier certified phase.

The established high-level progression includes:

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

The historical reconstruction contains more detailed phase names, but this Foundation rule concerns dependency and authority rather than preserving working-session chronology.

The governing constraint is:

> A later phase must not silently redefine an earlier certified phase.

If a later phase reveals a contradiction, the earlier authority must be explicitly reopened through refutation/review rather than overwritten implicitly.

---

## Foundation-to-Implementation Dependency

The permanent dependency direction is downstream from Foundation toward implementation.

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

This means:

- architecture must preserve Foundation constraints;
- implementation architecture must preserve derived architecture;
- implementation must realize authorized architecture;
- verification checks the realized result against the relevant authority.

The direction must not be inverted merely because implementation already exists.

Existing implementation is authoritative for what is currently implemented, but it does not silently become methodological authority for what ought to be true.

---

## Implementation Realizes Architecture

The project follows:

> Implementation realizes architecture. It does not redefine it.

Implementation may expose:

- an inconsistency;
- an invalid assumption;
- an unhandled constraint;
- a contradiction between documentation and reality.

Such evidence must be surfaced and resolved through the appropriate authority layer.

The correct response is not to let implementation silently mutate the rule it was meant to realize.

---

## Runtime and Tooling Boundary

Runtime and Tooling are distinct concerns in the established project model.

At Foundation level, the relevant invariant is that a mechanism supporting development or verification must not silently become the authority that defines project methodology or runtime meaning.

Therefore:

```text
Methodological / project authority
        ↓
Development workflow
        ↓
Tooling support
```

Tooling may inspect, execute, render, automate, or verify workflow operations, but Tooling does not define the Foundation merely by implementing those operations.

Detailed Runtime and Developer Toolkit implementation boundaries belong in architecture and development documentation.

---

## Certification Through Refutation

Important methodological models are not certified merely by collecting confirming examples.

The Foundation uses systematic attempts to expose:

- contradictions;
- missing necessary responsibility classes or boundaries;
- hidden assumptions;
- invalid dependency directions;
- cases the model cannot explain without extension.

Certification means that the defined challenge process has been passed to the required level.

It does not mean the Foundation can never be questioned again; that would conflict with the Foundation being Open for Refutation.

Detailed falsification-attempt chronology and historical certification narrative are not owned by this document.

---

## Foundation Certification Scope and Conclusion

Foundation Certification v1.0 evaluated the Foundation that had already completed Foundation Design and Foundation Validation.

Certification was not a design phase. Its scope did not authorize new principles, mechanisms, or architecture. Its purpose was to determine whether the existing Foundation could be accepted as the governing basis for downstream architectural derivation.

The formal certification scope tested the Foundation for:

1. consistency — whether its principles could coexist without contradiction;
2. completeness — whether a necessary foundational mechanism was missing;
3. minimality — whether unnecessary or derivable foundational elements remained;
4. generality — whether the Foundation remained independent of specific information types, modules, workflows, or future extensions;
5. robustness — whether future features, modules, automation, AI extensions, or workflow changes could be handled without rewriting the foundational rules;
6. refutability — whether critical contradiction could be actively sought under the Closed for Extension, Open for Refutation posture;
7. implementability — whether the principles could be realized through concrete mechanisms rather than depending on intuition or theory alone;
8. protection against architecture drift — whether the Foundation protected its authoritative information, lifecycle, workflow, overview, and control boundaries from competing truths.

The permanent certification conclusion is:

```text
Foundation v1.0
Status: CERTIFIED
State: LOCKED
Policy: Closed for Extension, Open for Refutation
```

`LOCKED` does not mean immune from evidence. It means downstream work must first operate within the certified Foundation rather than extending it for convenience.

If a necessary downstream requirement cannot be accommodated without contradicting the Foundation, that is a refutation/review condition. The Foundation must then be explicitly reopened through the appropriate review and certification process rather than silently rewritten by architecture or implementation.

Certification therefore establishes Foundation v1.0 as the methodological and architectural reference point for downstream derivation. Architecture applies and derives from the certified Foundation; implementation realizes authorized architecture. Neither becomes an independent source of Foundation authority.

The certification conclusion does not depend here on preserving the individual historical falsification chronology. Claims about a specific total number of falsification attempts or methodological saturation are not part of this transferred certification scope unless separately verified and authorized.

---

## Semantic Preservation Rule

Downstream derivation must preserve the meaning of upstream authority.

A consequence is not valid merely because it uses similar terminology.

A valid derivation must not silently:

- expand the scope of a principle;
- narrow away a required constraint;
- reverse an authority direction;
- collapse distinct responsibilities into implementation convenience;
- convert an implementation fact into a methodological invariant;
- convert historical evidence into current authority.

When such a change is necessary, it must be treated as an explicit refutation/review question rather than an ordinary derivation.

---

## Foundation Non-Claims

This Foundation Model does not define:

- the detailed six-responsibility model, which is owned by `docs/foundation/RESPONSIBILITY_MODEL.md`;
- specific application folders, services, modules, classes, or files;
- database schema;
- authentication flows;
- frontend or backend architecture;
- Developer Toolkit commands or implementation;
- product vision or learning model;
- current project phase or task;
- individual falsification attempts;
- historical chat chronology;
- unverified claims about a specific falsification-attempt count or methodological saturation;
- future methodology not already supported by current authority.

Those exclusions prevent the Foundation from absorbing downstream information and becoming a duplicate project handbook or architecture document.

---

## Relationship to the Root Control Kernel

The root control kernel and Foundation have different ownership roles.

### `PROJECT_HANDBOOK.md`

Owns governance, routing, working-session procedure, workflow gates, and operational authority rules.

### `PROJECT_OVERVIEW.md`

Owns stable project identity and high-level permanent principles.

### `PROJECT_CONTROL.md`

Owns current verified state and Next Allowed Action.

### `docs/foundation/FOUNDATION_MODEL.md`

Owns the detailed upstream methodological core required for downstream derivation, including the permanent Foundation certification scope, conclusion, closure state, and downstream authority consequence.

Where a high-level principle appears in Overview or Handbook for routing/governance purposes, this document provides the Foundation-level ownership of its detailed methodological meaning within the authorized transfer scope.

---

## Change Rule

A change to this Foundation Model is not an ordinary implementation edit.

Before changing its methodological meaning:

1. identify the specific existing Foundation claim affected;
2. identify the evidence that contradicts or invalidates it;
3. treat the proposed change as a refutation/review question rather than silent extension;
4. validate consequences for downstream derived authority;
5. update dependent documentation only after the Foundation authority has been explicitly resolved.

Ordinary downstream work should derive from this model rather than edit it to accommodate local implementation needs.

---

## Verification Status

The original Foundation Model transfer was established from current authoritative project evidence in:

- `PROJECT_HANDBOOK.md`;
- `PROJECT_OVERVIEW.md`;
- `PROJECT_CONTROL.md`;
- `docs/foundation/README.md`.

The later bounded certification transfer used targeted primary historical evidence only to close the previously identified certification conclusion/scope gap.

That bounded transfer adds the permanent certification scope, CERTIFIED/LOCKED conclusion, reopening meaning, and downstream authority consequence. It does not transfer historical certification chronology, individual falsification attempts, an unverified falsification-attempt count, or an unverified methodological-saturation claim.
