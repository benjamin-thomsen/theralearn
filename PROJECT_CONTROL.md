# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-14

---

## Current Phase

**Learning Science Engine — Minimum Implementation Slice Derivation**

The new Product Vision, Learning Model, and MVP boundary are the governing Product Authority for TheraLearn.

The bounded **Existing Implementation Compatibility Assessment** has been completed.

The assessment established that the repository already contains useful technical and learner-side foundations, but the core product layer required to connect learning objectives, certified Learning Principles, learning mechanisms, Creator approval, and learner execution does not yet exist in meaningful implementation form.

The minimum Learning Science Engine architecture has now been derived, verified, and committed. The next project responsibility is to derive the smallest safe implementation slice from that architecture before any product implementation is authorized.

The new product core remains:

> **You bring what needs to be learned. TheraLearn helps you determine how it can be learned effectively.**

The differentiating product responsibility remains:

> **Learning design based on learning science.**

The governing end-to-end product chain is:

```text
SUBJECT-MATTER CONTENT
        ↓
LEARNING OBJECTIVE
        ↓
LEARNING SCIENCE
        ↓
LEARNING DESIGN
        ↓
CREATOR REVIEW + APPROVAL
        ↓
LEARNING EXPERIENCE
        ↓
LEARNER PERFORMANCE
        ↓
FEEDBACK / RESULT
```

The product must prove both sides of the core:

```text
BUILD / DESIGN
      ↓
    LEARN
```

Product implementation remains **PAUSED** while the smallest safe implementation slice is derived from the verified Learning Science Engine architecture.

---

## Current Branch

```text
migration-next16-to-root
```

Latest verified remote branch checkpoint before local architecture work:

```text
5e0da244ced2821f1d1ee9dd5bc6a5655df08948
Open Learning Science Engine architecture derivation
```

Verified local architecture checkpoint:

```text
8c34b3d
Establish Learning Science Engine architecture
```

The architecture checkpoint adds:

```text
docs/architecture/learning-science-engine.md
```

The architecture file was verified as a complete 594-line document, and the repository verification pipeline completed with Overall PASS before commit.

No product implementation file, schema file, database migration, or runtime data was changed while establishing the architecture authority.

---

## Permanent Product Authority

The permanent Product Authority is:

```text
docs/product/PRODUCT_VISION.md
docs/product/LEARNING_MODEL.md
docs/product/mvp.md
```

Implementation is downstream of these authorities.

The permanent architecture authority for the Learning Science Engine is:

```text
docs/architecture/learning-science-engine.md
```

The authority direction is:

```text
PRODUCT AUTHORITY
        ↓
LEARNING SCIENCE ENGINE ARCHITECTURE
        ↓
IMPLEMENTATION DERIVATION
        ↓
IMPLEMENTATION
```

Legacy implementation remains downstream of the NEW MVP architecture and may only be assessed against requirements derived from that architecture.

The responsibilities of the three authority documents remain distinct.

### `PRODUCT_VISION.md`

Owns the durable product direction, including:

* TheraLearn as an evidence-based learning platform;
* the separation between subject-matter authority and learning-system responsibility;
* the TheraLearn Learning Science Engine;
* Creator-side value: **Help me teach better**;
* Learner-side value: **Help me learn better**;
* learning-objective-driven learning design;
* creator review, change, rejection, and approval;
* students and direct learners;
* creators;
* institutions;
* companies;
* future course offering and certification direction;
* downstream commercial capabilities;
* legitimate personalization without pseudoscientific learning-style claims;
* accessibility as distinct from claims about superior learning effectiveness;
* existing implementation as subordinate to Product Authority.

### `LEARNING_MODEL.md`

Owns the scientific learning authority.

It remains valid and was consistency-verified against the current Product Vision and MVP.

The five currently certified Learning Principles remain:

1. Active Retrieval Principle
2. Distributed Practice Principle
3. Informative Correction Principle
4. Adaptive Guidance Principle
5. Objective-Aligned Demonstration Principle

The scientific authority direction remains:

```text
Scientific evidence
        ↓
Learning principles
        ↓
Product mechanisms and decisions
        ↓
Implementation
```

The Product Vision and MVP apply that scientific authority through:

```text
Learning objective + context
        ↓
Applicable certified Learning Principle
        ↓
Relevant learning mechanism
```

This is product application of the Learning Model.

It is not itself a new Learning Principle.

No certified Learning Principle may be modified, expanded, or replaced without the appropriate evidence-review process.

### `mvp.md`

Owns the durable MVP product boundary.

The MVP must demonstrate the complete learning-design-to-learning-result chain:

```text
CONTENT
   ↓
LEARNING OBJECTIVE
   ↓
LEARNING SCIENCE
   ↓
LEARNING DESIGN
   ↓
CREATOR APPROVAL
   ↓
LEARNING EXPERIENCE
   ↓
LEARNER PERFORMANCE
   ↓
FEEDBACK / RESULT
```

The MVP therefore requires both:

```text
Creator / Content Owner
```

and:

```text
Learner
```

Structured curriculum, lessons, flashcards, quizzes, and progress may become mechanisms inside the MVP.

They do not themselves define the product.

---

## Core Product Authority Boundary

Subject-matter authority and learning-system authority must remain separate.

The authority model is:

```text
CONTENT OWNER
owns:
subject-matter truth
correctness
legitimacy
professional or academic content responsibility

        ↓

THERALEARN
owns:
learning-objective interpretation
learning-science application
learning-design support
learning mechanisms
learning experience
performance interaction
feedback/result system
```

TheraLearn must not silently change subject-matter truth in the name of learning design.

The Creator / Content Owner retains review and approval authority over the learning design produced around their material.

---

## Learning Science Engine

The Learning Science Engine is a core product responsibility.

Its conceptual direction is:

```text
Learning objective
        +
Relevant context
        ↓
Applicable certified Learning Principle(s)
        ↓
Learning Requirements
        ↓
Proposed Learning Mechanism
        ↓
Proposed Learning Design
```

The Learning Science Engine must materially affect product behavior.

It must not exist only as:

* explanatory text;
* marketing language;
* labels;
* metadata;
* documentation;
* an invisible justification for mechanisms that would behave identically without it.

The decisive MVP test remains:

> **If the Learning Science Engine could be removed from the MVP without fundamentally changing how the product works, we have built the wrong MVP.**

Therefore this is insufficient:

```text
UPLOAD CONTENT
      ↓
AI GENERATES QUIZ
      ↓
DONE
```

This is also insufficient:

```text
CURRICULUM
   ↓
LESSON
   ↓
FLASHCARDS / QUIZ
   ↓
PROGRESS
```

Those capabilities may remain useful mechanisms.

They are subordinate to learning-design derivation.

---

## Creator-Side MVP Responsibility

The MVP must contain a bounded Creator / Content Owner flow.

For a bounded piece of legitimate subject-matter material, the Creator must ultimately be able to:

1. provide or identify the content to be learned;
2. work with or review the learning objective;
3. receive a proposed learning design informed by applicable certified Learning Principles;
4. understand the relevant learning-science reasoning at an appropriate product level;
5. review the proposed learning design;
6. change relevant creator-controlled elements;
7. reject the proposed design;
8. approve the design.

Creator approval is part of the MVP chain.

The learning system must not bypass the Content Owner's subject-matter authority.

---

## Learner-Side MVP Responsibility

After Creator approval, the Learner must be able to engage with the approved learning design.

The MVP must include at least one relevant active learning mechanism derived from the approved learning design.

Where the selected learning mechanism requires active performance, the Learner must perform an action rather than only consume passive content.

The resulting learner attempt must lead to a relevant:

* feedback;
* correction;
* result;
* or learner state.

The precise future implementation of progress, scoring, mastery, adaptation, and scheduling is not predetermined by this requirement.

Only the smallest mechanism required to prove the bounded MVP may later be authorized.

---

## Personalization and Accessibility Boundary

TheraLearn may support legitimate personal preferences and learner needs.

It must not encode unsupported fixed learning-style claims such as assuming that a person is inherently a visual, auditory, or kinesthetic learner and should therefore always learn through one corresponding modality.

Future personalization affecting learning effectiveness must be grounded in relevant factors such as:

* applicable evidence;
* learner context;
* task characteristics;
* observed learner performance;
* accessibility requirements;
* verified preference where preference itself is the relevant product concern.

Accessibility requirements remain conceptually distinct from claims about superior learning effectiveness.

Needs associated with areas such as dyslexia, ADHD, reading support, interface adaptation, pacing support, or modality accessibility may justify product adaptations without asserting unsupported learning-style theories.

---

## Existing Implementation Compatibility Assessment

**Status: CLOSED — VERIFIED**

A bounded read-only repository assessment was completed against:

1. `docs/product/PRODUCT_VISION.md`
2. `docs/product/LEARNING_MODEL.md`
3. `docs/product/mvp.md`

Relevant implementation and repository responsibilities were inspected, including:

* repository navigation;
* authoritative lesson routing;
* quiz interaction;
* quiz repositories;
* flashcard repositories;
* lesson repositories;
* progress logic;
* learner dashboard;
* database schema;
* learning-objective storage;
* Creator-related implementation;
* learning-design implementation.

No product-code, schema, migration, or database-data change was made during the assessment.

The assessment classified existing capabilities using:

```text
REUSE
ADAPT
LEGACY
MISSING
```

---

## Compatibility Matrix — REUSE

The following foundations are currently assessed as reusable:

* Supabase/Auth foundation;
* repository abstraction;
* Course → Chapter → Lesson structure;
* lesson content foundation;
* quiz repository;
* flashcard repository;
* bounded active quiz interaction.

The existing bounded quiz interaction requires an active learner response before correctness reveal.

It can therefore remain a potentially useful learner-side mechanism when it is later selected on a legitimate learning-design basis.

Reuse does not mean that a mechanism automatically belongs in every future learning design.

---

## Compatibility Matrix — ADAPT

The following existing capabilities contain useful foundations but require changed responsibility, connection, or behavior:

* learning-objective storage and use;
* authoritative lesson experience;
* flashcard learner mechanism;
* quiz learner mechanism;
* feedback and explanation quality;
* lesson progress;
* learner dashboard;
* activity-selection logic.

`learning_objectives` already exists in the current data model and lesson context.

Its current use is primarily storage and display.

No verified implementation currently makes learning objectives drive selection of the learning mechanism.

The current lesson flow can load flashcards and quiz questions when they exist.

That behavior does not yet realize:

```text
LEARNING OBJECTIVE + CONTEXT
        ↓
CERTIFIED PRINCIPLE
        ↓
MECHANISM SELECTION
```

Therefore existing activities must not continue under the implicit rule:

```text
FEATURE EXISTS
      ↓
SHOW FEATURE
```

Mechanism selection must eventually become downstream of learning design.

---

## Compatibility Matrix — LEGACY

The following existing assumptions must not determine the new MVP:

* learner-only product framing;
* `feature exists → show feature`;
* quiz percentage as the primary learning result;
* completion as a proxy for learning;
* legacy or static curriculum as automatic subject-matter authority.

The product must not regress to:

```text
EXISTING CURRICULUM
        ↓
LESSON
        ↓
FLASHCARDS / QUIZ
        ↓
PROGRESS
```

Existing implementation may contribute useful technical pieces without its previous product assumptions remaining authoritative.

---

## Compatibility Matrix — MISSING

The assessment found no meaningful verified implementation of:

* Creator / Content Owner product role;
* Creator workflow;
* Creator/Learner role distinction;
* Learning Science Engine;
* `objective + context → principle → mechanism` derivation;
* explicit learning-design representation;
* Creator review;
* Creator change;
* Creator rejection;
* Creator approval;
* approved-learning-design state;
* persistent learner attempt/performance state;
* objective-linked learner result;
* approved-design-linked learner experience.

Repository inspection did not identify an existing implementation owner for the Learning Science Engine or learning-design derivation.

This missing layer is now the primary architectural dependency.

---

## Architecture Conclusion

The compatibility assessment established the following structure:

```text
EXISTING REUSABLE FOUNDATION

Auth
Course → Chapter → Lesson
Lesson content
Learning objectives
Repositories
Quiz mechanism
Flashcard mechanism
Learner interaction

        ↓

MISSING CORE PRODUCT LAYER

Learning Science Engine
Learning-design derivation
Learning-design representation
Creator review + approval

        ↓

ADAPTED LEARNER EXECUTION

Approved learning design
        ↓
Relevant learning mechanism
        ↓
Learner attempt
        ↓
Relevant feedback/result
```

The main gap is therefore not the entire learning-platform foundation.

The main gap is the layer connecting:

```text
WHAT SHOULD BE LEARNED?
        ↓
WHAT DOES LEARNING SCIENCE SUPPORT?
        ↓
HOW SHOULD THIS LEARNING EXPERIENCE BE DESIGNED?
```

The minimum architecture for that layer has now been derived. Implementation still requires a separately derived and authorized minimum implementation slice.

---

## Previously Verified Runtime Data State

The following runtime findings remain historically verified:

```text
Supabase project:
TheraLearn

reference:
upjlofediaqhtdcipiau

region:
eu-west-1
```

The project was previously restored to Healthy state after being found paused.

Direct database inspection established at that checkpoint:

```text
public.quiz_questions row count: 0
public.courses row count: 0
```

Therefore no remote authoritative course → chapter → lesson chain and no remote authoritative quiz-question rows existed at that checkpoint.

These findings remain historical runtime facts unless subsequently changed.

They do **not** define the current project task.

No Supabase data should be populated merely to make the previous implementation path render.

---

## Superseded Implementation Direction

The former implementation direction centered on:

```text
Authenticated learner
        ↓
Structured curriculum
        ↓
Authoritative lesson context
        ↓
Learning activities
        ↓
Learner-related result/progress
```

Parts of this chain remain reusable.

It is not sufficient as the authoritative MVP definition.

The Product Authority now requires the upstream Creator and learning-design responsibilities as well as downstream learner execution.

The previously identified empty curriculum-data state therefore does not authorize resumption of the former implementation path.

---

## Verification State

### Product Vision

**VERIFIED — COMMITTED**

`docs/product/PRODUCT_VISION.md` is part of the current verified Product Authority checkpoint.

### Learning Model

**VERIFIED — PRESERVED**

`docs/product/LEARNING_MODEL.md` remains the scientific learning authority.

The five certified Learning Principles remain unchanged.

### MVP Boundary

**VERIFIED — COMMITTED**

`docs/product/mvp.md` is part of the current verified Product Authority checkpoint.

It requires both Creator and Learner sides of the learning-design chain.

### Existing Implementation Compatibility

**VERIFIED — CLOSED**

The bounded repository compatibility assessment has been completed.

The verified result is recorded in the `REUSE / ADAPT / LEGACY / MISSING` matrix in this file.

### Minimum Implementation Architecture

**VERIFIED — COMMITTED**

The permanent architecture owner is:

```text
docs/architecture/learning-science-engine.md
```

Verified local architecture checkpoint:

```text
8c34b3d
Establish Learning Science Engine architecture
```

The architecture establishes, among other boundaries:

* NEW MVP architecture independence from legacy implementation;
* Learning Objective + Relevant Context as minimum derivation input;
* certified Learning Principle references without duplicated scientific authority;
* Learning Requirements as the mandatory bridge between science and mechanism;
* the minimum Proposed Learning Design representation;
* Creator review, change, rejection, and approval;
* re-derivation when upstream scientific premises change;
* at least `PROPOSED` and `APPROVED` design states;
* the prohibition on learner execution from an unapproved design;
* Approved Learning Design as learner-execution authority;
* learner performance and feedback/result requirements;
* scientific traceability;
* explicit non-requirements and deferrals.

The architecture was read-back verified as a complete 594-line document.

Before the architecture commit, `./scripts/dev verify` completed with:

```text
TypeScript Check    PASS
Build               PASS
Documentation Check PASS
Repository Index    PASS
Git Status          PASS
Overall             PASS
```

Architecture derivation is therefore closed.

The next task is implementation-slice derivation, not product implementation.

---

## Current Risks

### R1 – Learning Science Engine could become cosmetic

**Status: CORE PRODUCT RISK**

The Learning Science Engine must materially affect learning design and product behavior.

If the same product behavior would exist after removing it, the MVP would fail its differentiating requirement.

### R2 – Implementation could silently redefine Product Authority

**Status: CONTROLLED**

Existing code must remain downstream of:

```text
PRODUCT_VISION.md
LEARNING_MODEL.md
mvp.md
```

Existing implementation cannot become authoritative merely because it already exists.

### R3 – Learning activities could be mistaken for learning design

**Status: ACTIVE**

Quiz, flashcards, explanations, progress UI, and other mechanisms may support certified Learning Principles.

Their existence alone does not prove:

* Learning Science Engine behavior;
* learning-design derivation;
* objective alignment;
* Creator approval.

### R4 – Creator authority could be bypassed

**Status: ACTIVE**

TheraLearn must preserve Content Owner authority over subject-matter truth.

Learning-system transformation must not silently become subject-matter modification.

Creator review and approval boundaries must therefore be explicit in the minimum architecture.

### R5 – Learning Principle authority could be duplicated

**Status: CONTROLLED BY VERIFIED ARCHITECTURE**

The verified architecture requires implementation to reference applicable certified Learning Principles without recreating, modifying, or duplicating scientific authority.

`LEARNING_MODEL.md` remains the owner of certified Learning Principles.

### R6 – Premature architecture expansion

**Status: CONTROLLED BY VERIFIED ARCHITECTURE**

The verified minimum architecture explicitly defers a general-purpose authoring platform, recommendation engine, mastery engine, marketplace, certification system, commercial platform, and other non-required capabilities.

Implementation-slice derivation must preserve those deferrals.

### R7 – Premature implementation

**Status: CONTROLLED BY CODE CHANGE GATE**

Architecture derivation is complete, but product implementation remains paused until the smallest safe implementation slice is derived, verified, and explicitly authorized in this file.

---

## Code Change Gate

**Product implementation: PAUSED**

No product-code change is currently authorized.

No schema change is currently authorized.

No database migration is currently authorized.

No database-data write is currently authorized.

No Supabase population is currently authorized.

No legacy curriculum migration is currently authorized.

No scoring implementation is currently authorized.

No mastery implementation is currently authorized.

No adaptive scheduling implementation is currently authorized.

No certification implementation is currently authorized.

No commercial implementation is currently authorized.

No organization-administration implementation is currently authorized.

No marketplace implementation is currently authorized.

No multi-question orchestration is currently authorized.

Read-only architecture and implementation inspection is authorized for implementation-slice derivation.

Documentation changes required solely to derive, record, or synchronize the implementation-slice decision are authorized and must be verified before commit.

---

## Current Task

Perform the bounded:

**Learning Science Engine — Minimum Implementation Slice Derivation**

The task is to derive the smallest safe implementation slice that proves a real vertical portion of the verified architecture without reinterpreting Product Authority.

The derivation must start from:

```text
docs/product/PRODUCT_VISION.md
        +
docs/product/LEARNING_MODEL.md
        +
docs/product/mvp.md
        ↓
docs/architecture/learning-science-engine.md
```

It must then determine the minimum implementation responsibilities needed for the first coherent slice.

The derivation must remain architecture-first and legacy-independent.

Legacy implementation may only be evaluated after the slice requirements have been derived.

The derivation must not implement the slice.

---

## Implementation Slice Derivation Requirements

The bounded derivation must determine at least:

### 1. Slice proof target

Define exactly which smallest end-to-end architectural behavior the first implementation slice must prove.

The slice must materially involve the Learning Science Engine architecture.

A slice that merely renders an existing quiz, flashcard, lesson, dashboard, or progress feature is insufficient.

### 2. Minimum domain representation

Determine the smallest implementation representation required for the selected slice, including only the concepts necessary to preserve the verified architecture boundaries.

Do not derive a generalized authoring or learning-management domain model.

### 3. Derivation owner

Identify the explicit implementation responsibility that will own the bounded transformation from:

```text
Learning Objective + Relevant Context
        ↓
Applicable certified Learning Principle reference(s)
        ↓
Learning Requirements
        ↓
Proposed Learning Mechanism
        ↓
Proposed Learning Design
```

This responsibility must not be hidden across UI components, repositories, route handlers, or database tables.

### 4. Creator approval gate

Determine the smallest implementation responsibility required to preserve:

```text
PROPOSED
        ↓
CREATOR REVIEW
        ↓
APPROVED
        ↓
LEARNER EXECUTION
```

No implementation slice may bypass this gate.

### 5. Re-derivation boundary

Determine how the first slice will prevent stale scientific derivation from remaining valid after an upstream premise changes.

Only the minimum behavior necessary for the slice should be derived.

### 6. Learner execution boundary

Determine the smallest learner-side execution needed to prove that an Approved Learning Design controls the mechanism presented to the Learner.

The mechanism must not be shown merely because the feature exists.

### 7. Feedback / result boundary

Determine the minimum learner performance and feedback/result behavior required by the selected design.

Do not default to percentage score, completion, mastery, or progress unless the derived slice specifically requires it.

### 8. Legacy compatibility

Only after requirements 1–7 are derived, classify relevant existing implementation as:

```text
REUSE
ADAPT
DISCARD
```

The classification must be against the NEW MVP slice requirements, never the reverse.

### 9. Persistence decision

Determine whether the first slice requires persistence.

If persistence is not necessary to prove the architectural behavior, do not introduce schema or migration work.

If persistence is proven necessary, the exact need must be recorded before any schema change is authorized.

### 10. Explicit implementation boundary

Produce a precise list of files/responsibilities that a later implementation step may change and a precise list of deferred capabilities.

The result must be small enough that implementation can proceed without reopening Product Authority or architecture derivation.

---

## Implementation Slice Decision Standard

The implementation-slice derivation must satisfy all of the following.

### Product Authority

The slice must derive from:

```text
PRODUCT_VISION.md
        +
LEARNING_MODEL.md
        +
mvp.md
```

and from `docs/architecture/learning-science-engine.md`, not from existing implementation convenience.

### Minimum sufficiency

The slice must include every responsibility required to prove its bounded architectural behavior and no more.

### No premature expansion

The slice must exclude responsibilities that are not required for the first coherent proof.

### Explicit ownership

Critical slice responsibilities must have explicit technical ownership.

### Scientific authority preservation

Certified Learning Principles must be referenced without duplicating or weakening scientific authority.

### Subject-matter authority preservation

TheraLearn learning-design behavior must not override Content Owner authority over subject-matter truth.

### Downstream implementation clarity

When slice derivation is complete, implementation should be possible without reinterpreting Product Authority or the verified Learning Science Engine architecture.

---

## Next Allowed Action

Perform the bounded **Learning Science Engine — Minimum Implementation Slice Derivation**.

The next work may:

1. read the current Product Authority;
2. read `docs/architecture/learning-science-engine.md`;
3. inspect existing implementation read-only;
4. select the smallest coherent architecture proof target;
5. derive the minimum domain and application responsibilities for that target;
6. derive the Creator approval and re-derivation behavior required by that target;
7. derive the approved-design-to-learner-execution boundary;
8. derive the minimum learner performance and feedback/result behavior;
9. classify relevant legacy implementation as `REUSE`, `ADAPT`, or `DISCARD` only after requirements are established;
10. determine whether persistence is actually required;
11. define the exact bounded implementation file/responsibility scope;
12. record and verify the implementation-slice decision.

The next work must **not**:

1. change product code;
2. change schema;
3. create migrations;
4. write database data;
5. populate Supabase;
6. migrate legacy curriculum;
7. implement Creator UI;
8. implement the Learning Science Engine;
9. implement the derived slice;
10. implement scoring;
11. implement mastery;
12. implement adaptive scheduling;
13. implement certification;
14. implement payments;
15. implement marketplace capabilities;
16. implement organization administration;
17. implement multi-question orchestration unless the slice derivation proves it necessary.

After the minimum implementation slice has been derived and read-back verified, `PROJECT_CONTROL.md` must be synchronized again before product-code changes are authorized.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters:

* Current Phase;
* Current Task;
* Next Allowed Action;
* Product Authority;
* architecture authority;
* implementation compatibility classification;
* implementation baseline;
* verification state;
* known risks;
* or code-change permission.

No implementation may become authoritative merely by existing in the repository.

Product Authority remains upstream of architecture.

Architecture remains upstream of implementation.
