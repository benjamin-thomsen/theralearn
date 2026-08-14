# TheraLearn – Learning Science Engine Architecture

## Purpose

This document owns the minimum implementation architecture for the TheraLearn Learning Science Engine and Learning Design derivation required by the NEW MVP.

It is downstream of `docs/product/PRODUCT_VISION.md`, `docs/product/LEARNING_MODEL.md`, and `docs/product/mvp.md`.

It defines architectural responsibilities and boundaries. It does not redefine Product Vision, certified Learning Principles, subject-matter truth, implementation technology, database schema, or user-interface structure.

The authority direction is:

    PRODUCT AUTHORITY
            ↓
    ARCHITECTURE
            ↓
    IMPLEMENTATION

Existing implementation must not determine this architecture.

---

## Architectural Scope

The NEW MVP must prove:

    BUILD / DESIGN
          ↓
        LEARN

The minimum chain is:

    SUBJECT-MATTER CONTENT
            ↓
    LEARNING OBJECTIVE + RELEVANT CONTEXT
            ↓
    LEARNING SCIENCE
            ↓
    LEARNING DESIGN
            ↓
    CREATOR REVIEW + APPROVAL
            ↓
    APPROVED LEARNING DESIGN
            ↓
    LEARNING EXPERIENCE
            ↓
    LEARNER PERFORMANCE
            ↓
    FEEDBACK / RESULT

This architecture owns the missing product layer connecting learning intent and certified learning science to an approved learner experience.

---

## NEW MVP / Legacy Boundary

The NEW MVP architecture is derived exclusively from current Product Authority.

    NEW PRODUCT AUTHORITY
            ↓
    NEW MVP
            ↓
    NEW MVP ARCHITECTURE
            ↓
    REQUIRED CAPABILITIES
            ↓
    ────────────────────────
    LEGACY COMPATIBILITY
            ↓
    REUSE / ADAPT / DISCARD

Mandatory independence test:

> If the entire legacy MVP implementation were deleted, the NEW MVP Architecture must still be derivable in the same form.

Existing quiz, flashcards, progress, dashboard, lessons, repositories, schema, routes, and learner interactions may therefore be assessed only after required NEW MVP capabilities are established.

Existing implementation may satisfy a derived requirement. It may not create the requirement.

---

## Core Derivation Rule

The Learning Science Engine must not be reduced to:

    PRINCIPLE → FEATURE

The minimum derivation is:

    LEARNING OBJECTIVE
            +
    RELEVANT CONTEXT
            ↓
    APPLICABLE CERTIFIED LEARNING PRINCIPLE(S)
            ↓
    LEARNING REQUIREMENTS
            ↓
    PROPOSED LEARNING MECHANISM
            ↓
    PROPOSED LEARNING DESIGN

`Learning Requirements` is mandatory. It expresses what the learning experience must require before deciding how the product realizes those requirements.

Without this layer, the Engine becomes a feature selector rather than a Learning Design system.

---

## Minimum Input

A bounded derivation requires at least:

1. Learning Objective;
2. Relevant Context.

The Learning Objective describes the intended learner capability or outcome.

Relevant Context contains only information that can materially affect derivation. Depending on the bounded case, it may include task or subject-matter characteristics, expected starting point, performance conditions, constraints, accessibility requirements, available learning conditions, and legitimate Creator-controlled constraints.

Relevant Context must not become an unrestricted learner profile. Unsupported fixed learning-style classifications are prohibited as scientific premises.

---

## Certified Learning Principle Authority

Certified Learning Principles are owned by `docs/product/LEARNING_MODEL.md`.

The Engine consumes references to that authority. It must not recreate, silently modify, broaden, or replace certified Learning Principles.

    SCIENTIFIC EVIDENCE
            ↓
    CERTIFIED LEARNING PRINCIPLES
            ↓
    LEARNING-SCIENCE DERIVATION
            ↓
    LEARNING REQUIREMENTS
            ↓
    LEARNING DESIGN

Changes to certified Learning Principles require the appropriate evidence-review and certification process.

---

## Applicability Derivation

The Engine determines which certified Learning Principle or combination of principles is applicable to the Learning Objective and Relevant Context.

    LEARNING OBJECTIVE + RELEVANT CONTEXT
            ↓
    APPLICABILITY REASONING
            ↓
    APPLICABLE CERTIFIED LEARNING PRINCIPLE(S)

The result preserves references to the applicable certified principles and a bounded Learning-Science Rationale explaining why they are relevant.

A principle label without applicability reasoning is insufficient.

---

## Learning Requirements

Applicable Learning Principles must be translated into Learning Requirements before a mechanism is proposed.

    OBJECTIVE + CONTEXT + APPLICABLE PRINCIPLE(S)
            ↓
    LEARNING REQUIREMENTS

A Learning Requirement describes a learning-relevant condition the resulting design must satisfy, such as required learner action, temporal structure, feedback, guidance, demonstration, or application.

Illustrative requirements include:

- the learner must actively produce a response;
- the learner must receive informative correction after performance;
- practice must occur across separated opportunities.

These examples do not create new Learning Principles. Every Learning Requirement must remain traceable to the premises from which it was derived.

---

## Proposed Learning Mechanism

Only after Learning Requirements exist may the system propose a Learning Mechanism.

    LEARNING REQUIREMENTS
            ↓
    PROPOSED LEARNING MECHANISM

A mechanism must not be selected merely because it already exists, is easy to render, can be automatically generated, is familiar, or belonged to the legacy MVP.

The architecture preserves the distinction between:

    WHAT THE LEARNING EXPERIENCE MUST REQUIRE

and:

    HOW THE PRODUCT PROPOSES TO REALIZE IT

Multiple mechanisms may satisfy the same requirements. The NEW MVP needs only the smallest mechanism set required to prove the bounded product chain.

---

## Minimum Proposed Learning Design

The derivation output is a Proposed Learning Design, not merely a mechanism.

The minimum conceptual representation contains:

1. Learning Objective;
2. Relevant Context;
3. Applicable Principle Reference(s);
4. Learning-Science Rationale;
5. Learning Requirements;
6. Proposed Learning Mechanism;
7. Learner Performance Requirement;
8. Feedback / Result Requirement;
9. Creator-Controlled Decisions;
10. Design State.

This does not prescribe database tables, TypeScript types, APIs, services, routes, or UI components.

It must be sufficient to explain what should be learned, which certified learning science applies and why, what the experience must require, how those requirements are proposed to be realized, what the Learner must do, what feedback/result must follow, which decisions remain under Creator control, and whether the design is proposed or approved.

---

## Learner Performance and Feedback / Result

Where active performance is required, the Learning Design explicitly states what the Learner must do.

The architecture distinguishes content consumption from learner performance.

Depending on the derivation, performance may involve recalling, generating, selecting, explaining, applying, discriminating, demonstrating, solving, or another bounded observable action. Existing interaction types must not predetermine it.

The Learning Design also defines the relevant feedback, correction, result, or learner state that follows performance:

    LEARNER PERFORMANCE
            ↓
    FEEDBACK / RESULT

The result must not automatically collapse into percentage score or `COMPLETED = LEARNED`.

Mastery models, advanced analytics, longitudinal progress, adaptive scheduling, competency models, and certification are not implied by this minimum architecture.

---

## Creator Control and Subject-Matter Authority

Before learner execution, the Creator must be able to:

    REVIEW
    CHANGE
    REJECT
    APPROVE

Creator-controlled decisions must be distinguishable from scientific derivation.

The Content Owner retains authority over subject-matter truth, correctness, legitimacy, and professional or academic content responsibility.

TheraLearn owns learning-system responsibilities: learning-objective interpretation within the product boundary, application of certified Learning Principles, derivation of Learning Requirements, Learning Design support, mechanism proposal, learner-performance structure, and feedback/result structure.

TheraLearn must not silently rewrite subject-matter truth. If generated questions, examples, explanations, prompts, or other material contain subject-matter claims, they remain subject to Content Owner authority.

---

## Creator Change and Re-Derivation

Creator changes are evaluated according to whether they alter upstream derivation premises.

If a change affects the Learning Objective, Relevant Context used by derivation, applicable scientific premises, Learning Requirements, or another upstream dependency, affected downstream derivation becomes invalid.

    UPSTREAM PREMISE CHANGED
            ↓
    AFFECTED DOWNSTREAM DERIVATION INVALIDATED
            ↓
    RE-DERIVATION REQUIRED

A design must never retain scientific traceability or approval based on premises that no longer match it.

The exact technical invalidation mechanism is deferred to implementation derivation.

---

## Design State and Approval Boundary

The minimum lifecycle requires at least:

    PROPOSED
    APPROVED

The required flow is:

    DERIVATION
        ↓
    PROPOSED
        ↓
    CREATOR REVIEW
        ↓
    APPROVED
        ↓
    LEARNER EXECUTION

This path is prohibited:

    PROPOSED
        ↓
    LEARNER EXECUTION

Rejection prevents execution. A Creator change that invalidates an upstream premise also invalidates approval depending on that premise.

Creator approval creates the authority boundary between design-time proposal and learner-facing execution.

The Approved Learning Design is the learner-execution authority for the bounded learning experience.

The legacy-style rule `FEATURE EXISTS → SHOW FEATURE` is prohibited as governing architecture.

The required rule is:

    APPROVED LEARNING DESIGN
            ↓
    REQUIRED / APPROVED LEARNING MECHANISM
            ↓
    LEARNER EXPERIENCE

---

## Learner Execution and Scientific Traceability

The learner-facing layer realizes the Approved Learning Design. It does not independently decide the scientific basis of the experience.

    LEARNING-SCIENCE DERIVATION
            ↓
    PROPOSED LEARNING DESIGN
            ↓
    CREATOR APPROVAL
            ↓
    APPROVED LEARNING DESIGN
            ↓
    LEARNER EXECUTION
            ↓
    LEARNER PERFORMANCE
            ↓
    FEEDBACK / RESULT

The architecture preserves traceability back through:

    LEARNER EXPERIENCE
            ↑
    APPROVED LEARNING DESIGN
            ↑
    PROPOSED LEARNING MECHANISM
            ↑
    LEARNING REQUIREMENTS
            ↑
    APPLICABLE CERTIFIED LEARNING PRINCIPLE(S)
            ↑
    LEARNING OBJECTIVE + RELEVANT CONTEXT

The Creator must receive an appropriate product-level Learning-Science Rationale during review.

---

## Personalization and Accessibility Boundary

Personalization may influence Relevant Context only when the factor is legitimately relevant.

Unsupported fixed learning-style categories are prohibited. The product must not infer a permanent mechanism from labels such as visual, auditory, or kinesthetic learner.

Relevant personalization may instead use evidence-supported contextual factors, observed learner performance, task characteristics, accessibility requirements, available learning conditions, and legitimate preferences where preference itself is relevant.

Accessibility is distinct from claims about superior learning effectiveness. It may affect presentation, pacing, reading support, interaction, modality availability, navigation, input method, or interface-imposed cognitive load.

Needs associated with dyslexia, ADHD, reading support, or other accessibility contexts may justify adaptations without asserting unsupported learning styles.

Where personalization or accessibility changes scientific derivation or the mechanism, traceability and compatibility with the Approved Learning Design must be preserved.

---

## Minimum Architectural Data Flow

    SUBJECT-MATTER CONTENT
            ↓
    LEARNING OBJECTIVE + RELEVANT CONTEXT
            ↓
    LEARNING-SCIENCE DERIVATION
            ↓
    APPLICABLE PRINCIPLE REFERENCES
            +
    LEARNING-SCIENCE RATIONALE
            ↓
    LEARNING REQUIREMENTS
            ↓
    PROPOSED LEARNING MECHANISM
            +
    LEARNER PERFORMANCE REQUIREMENT
            +
    FEEDBACK / RESULT REQUIREMENT
            ↓
    PROPOSED LEARNING DESIGN
            ↓
    CREATOR REVIEW
            ↓
        ┌───────────────┐
        │               │
    CHANGE / REJECT   APPROVE
        │               │
        ↓               ↓
    RE-DERIVE       APPROVED
    IF REQUIRED     LEARNING DESIGN
                        ↓
                 LEARNER EXECUTION
                        ↓
                 LEARNER PERFORMANCE
                        ↓
                  FEEDBACK / RESULT

This is an authority and responsibility flow, not a database schema or component diagram.

---

## Minimum Capability Set

The NEW MVP architecture requires capabilities sufficient to:

1. represent a Learning Objective;
2. represent Relevant Context;
3. reference applicable certified Learning Principles;
4. derive and represent a Learning-Science Rationale;
5. derive and represent Learning Requirements;
6. propose a Learning Mechanism from those requirements;
7. represent a Proposed Learning Design;
8. represent required Learner Performance;
9. represent required Feedback / Result;
10. expose the proposal for Creator review;
11. support Creator-controlled change;
12. support rejection;
13. support approval;
14. invalidate affected downstream derivation when upstream premises change;
15. distinguish at least `PROPOSED` from `APPROVED`;
16. prevent learner execution of an unapproved design;
17. execute an Approved Learning Design through its required mechanism;
18. capture the bounded learner performance required by that design;
19. produce the bounded feedback/result required by that design;
20. preserve traceability from learner execution back to the approved scientific derivation.

These are required capabilities, not implementation components.

---

## Minimum Responsibility Separation

The architecture requires logical separation between:

- input;
- scientific derivation;
- Learning Requirements;
- mechanism proposal;
- Learning Design;
- Creator control and approval;
- learner execution;
- performance and feedback/result.

This does not require separate deployable services.

The minimum MVP should use the smallest implementation structure that preserves these authority and responsibility boundaries.

---

## Legacy Compatibility Rule

Only after the NEW MVP capability set is established may existing implementation be assessed.

Each relevant legacy capability is classified against a derived NEW MVP requirement as:

    REUSE
    ADAPT
    DISCARD

`REUSE` means the implementation can satisfy the derived responsibility without importing obsolete product assumptions.

`ADAPT` means useful implementation exists but its responsibility, inputs, outputs, authority, or behavior must change.

`DISCARD` means the implementation or assumption is unnecessary or would distort the NEW MVP architecture.

No legacy capability receives architectural status merely because it exists.

---

## Explicit Non-Requirements

This minimum architecture does not by itself require:

- a specific AI model or provider;
- autonomous course generation;
- a specific database schema;
- new database migrations;
- microservices;
- event sourcing;
- a rules engine;
- a vector database;
- a knowledge graph;
- a dedicated external Learning Science service;
- a specific Creator UI or Learner UI;
- quiz or flashcards;
- a progress dashboard;
- percentage scoring;
- mastery scoring;
- advanced adaptation;
- certification;
- payments;
- organization administration;
- analytics infrastructure;
- a generalized authoring platform.

Any of these must be justified later by a derived requirement rather than smuggled into the minimum architecture.

---

## Implementation Technology Boundary

This architecture intentionally does not decide whether responsibilities are implemented through domain functions, application services, repositories, server actions, route handlers, components, persistence, structured deterministic logic, AI-assisted reasoning, or a bounded combination.

Those decisions belong to the next implementation-architecture derivation.

Technology must serve the architecture. It must not redefine it.

---

## Minimum Sufficiency Test

The architecture is sufficient only if a bounded NEW MVP implementation can demonstrate:

    CONTENT
        ↓
    OBJECTIVE + CONTEXT
        ↓
    CERTIFIED LEARNING SCIENCE
        ↓
    LEARNING REQUIREMENTS
        ↓
    PROPOSED DESIGN
        ↓
    CREATOR REVIEW + APPROVAL
        ↓
    APPROVED DESIGN
        ↓
    LEARNER PERFORMANCE
        ↓
    RELEVANT FEEDBACK / RESULT

If any required transition exists only as documentation or explanation and does not materially constrain product behavior, the architecture has not been realized.

---

## Learning Science Engine Removal Test

The decisive product test is:

> If the Learning Science Engine could be removed without fundamentally changing how the bounded MVP chooses, justifies, approves, and executes the learning experience, the implementation is architecturally invalid.

The Engine must materially determine:

- applicable scientific premises;
- Learning Requirements;
- proposed mechanism;
- Proposed Learning Design;
- the basis presented for Creator review;
- the approved learner experience.

Scientific metadata attached after a mechanism has already been chosen does not pass this test.

---

## Architecture Completion Boundary

This document establishes the minimum architecture required before product implementation may resume.

It establishes:

- the NEW MVP / legacy dependency boundary;
- the minimum derivation input;
- certified-principle authority;
- Learning Requirements as the bridge between science and mechanism;
- the minimum Proposed Learning Design representation;
- Creator control and re-derivation;
- the `PROPOSED` / `APPROVED` execution gate;
- Approved Learning Design as learner-execution authority;
- performance and feedback/result responsibilities;
- scientific traceability;
- minimum capabilities;
- explicit non-requirements.

It does not authorize product implementation by itself.

After this architecture is verified and recorded in project control, the next responsibility is to derive the smallest safe implementation slice from this architecture and then assess legacy implementation only against those derived requirements.

Until that governance transition is explicitly recorded, product implementation remains paused.
