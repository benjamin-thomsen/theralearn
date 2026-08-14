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

**Learning Science Engine — Minimum Implementation Architecture Derivation**

The new Product Vision, Learning Model, and MVP boundary are the governing Product Authority for TheraLearn.

The bounded **Existing Implementation Compatibility Assessment** has been completed.

The assessment established that the repository already contains useful technical and learner-side foundations, but the core product layer required to connect learning objectives, certified Learning Principles, learning mechanisms, Creator approval, and learner execution does not yet exist in meaningful implementation form.

The next project responsibility is therefore architecture derivation rather than product implementation.

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

Product implementation remains **PAUSED** while the minimum implementation architecture for the Learning Science Engine and learning-design derivation is established.

---

## Current Branch

```text
migration-next16-to-root
```

Latest verified remote branch checkpoint:

```text
2e2464768e5422b39af0f94893e19be881488686
Synchronize product authority with new MVP direction
```

Immediately before the current `PROJECT_CONTROL.md` synchronization, the local working tree was verified:

```text
Clean
```

No product implementation file, schema file, database migration, or runtime data was changed during the Existing Implementation Compatibility Assessment.

---

## Permanent Product Authority

The permanent Product Authority is:

```text
docs/product/PRODUCT_VISION.md
docs/product/LEARNING_MODEL.md
docs/product/mvp.md
```

Implementation is downstream of these authorities.

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
Learning context
        ↓
Applicable certified Learning Principle
        ↓
Relevant learning mechanism
        ↓
Learning design
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

Architecture must be derived before implementation of that layer begins.

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

**OPEN — NOT YET DERIVED**

The repository currently has no verified architecture owner for the Learning Science Engine or learning-design derivation.

Architecture derivation is therefore the Current Task.

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

**Status: ACTIVE ARCHITECTURE RISK**

Implementation architecture must reference applicable certified Learning Principles without recreating, modifying, or duplicating scientific authority.

`LEARNING_MODEL.md` remains the owner of certified Learning Principles.

### R6 – Premature architecture expansion

**Status: CONTROLLED BY BOUNDED DERIVATION**

The minimum architecture must not expand into a general-purpose authoring platform, recommendation engine, mastery engine, marketplace, certification system, or commercial platform.

Only the architecture necessary to support the bounded MVP chain may be derived.

### R7 – Premature implementation

**Status: CONTROLLED BY CODE CHANGE GATE**

Architecture derivation must complete before product implementation resumes.

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

Read-only architecture inspection is authorized.

Documentation changes required solely to derive, record, or synchronize verified architecture authority are authorized and must be verified before commit.

---

## Current Task

Perform the bounded:

**Learning Science Engine — Minimum Implementation Architecture Derivation**

The architecture derivation must determine the smallest technical responsibility model capable of supporting:

```text
SUBJECT-MATTER CONTENT
        ↓
LEARNING OBJECTIVE + CONTEXT
        ↓
APPLICABLE CERTIFIED LEARNING PRINCIPLE
        ↓
RELEVANT LEARNING MECHANISM
        ↓
PROPOSED LEARNING DESIGN
        ↓
CREATOR REVIEW + APPROVAL
        ↓
APPROVED LEARNING DESIGN
        ↓
LEARNER EXECUTION
        ↓
LEARNER ATTEMPT
        ↓
RELEVANT FEEDBACK / RESULT
```

The derivation must remain bounded.

It must define architecture.

It must not implement the architecture.

---

## Architecture Derivation Requirements

The minimum architecture derivation must determine at least the following.

### 1. Learning-design input

Define the minimum input needed to derive a proposed Learning Design.

At minimum the architecture must determine what is required from:

```text
Learning objective
        +
Relevant learning context
```

It must not prematurely introduce a broad content-authoring model.

### 2. Learning Principle reference

Define how an applicable certified Learning Principle is referenced from implementation without duplicating scientific authority.

The architecture must preserve:

```text
LEARNING_MODEL.md
        ↓
Certified Learning Principle
        ↓
Implementation reference
```

Implementation must not become a second scientific authority.

### 3. Derivation responsibility

Define the technical responsibility that owns:

```text
objective + context
        ↓
principle
        ↓
mechanism
```

That responsibility must have a clear boundary.

It must not be implicitly distributed across UI components, repositories, route handlers, or database tables without an explicit owner.

### 4. Proposed Learning Design representation

Define the minimum representation required for a proposed Learning Design.

The representation must be sufficient to express the bounded relationship between:

* learning objective;
* relevant context;
* applicable principle;
* selected mechanism;
* creator-controlled design decisions.

It must not become a broad course-authoring schema unless the MVP requires it.

### 5. Creator control boundary

Define which parts of the proposed Learning Design the Creator can:

* review;
* change;
* reject;
* approve.

Creator authority over subject-matter truth must remain explicit.

### 6. Approval-state boundary

Define the smallest required state distinction between at least:

```text
PROPOSED
```

and:

```text
APPROVED
```

No learner execution may silently treat an unapproved Learning Design as approved.

### 7. Learner execution boundary

Define how the approved Learning Design becomes downstream input to learner execution.

The learner-side mechanism must be selected because the Learning Design calls for it, not merely because the feature exists.

### 8. Existing REUSE foundations

Determine which existing reusable foundations can remain unchanged, including where appropriate:

* Auth;
* repositories;
* Course → Chapter → Lesson structure;
* lesson content;
* existing learning-objective storage;
* quiz repository;
* flashcard repository;
* bounded active quiz interaction.

### 9. Existing ADAPT foundations

Determine which existing foundations require changed responsibility or behavior before participating in the new MVP.

### 10. Explicit deferrals

Explicitly identify what remains outside the minimum architecture.

At minimum the derivation must avoid prematurely designing:

* scoring systems;
* generalized mastery models;
* broad adaptive scheduling;
* recommendation engines;
* certification infrastructure;
* payments;
* marketplace behavior;
* organization administration;
* large-scale authoring;
* unrestricted AI course generation;
* multi-question orchestration unless proven necessary for the bounded MVP.

---

## Architecture Decision Standard

The architecture derivation must satisfy all of the following.

### Product Authority

Architecture must derive from:

```text
PRODUCT_VISION.md
        +
LEARNING_MODEL.md
        +
mvp.md
```

not from existing implementation convenience.

### Minimum sufficiency

The architecture must include every responsibility required to prove the bounded MVP chain.

### No premature expansion

The architecture must exclude responsibilities that are not required to prove the bounded MVP.

### Explicit ownership

Critical product responsibilities must have explicit technical ownership.

### Scientific authority preservation

Certified Learning Principles must be referenced without duplicating or weakening scientific authority.

### Subject-matter authority preservation

TheraLearn learning-design behavior must not override Content Owner authority over subject-matter truth.

### Downstream implementation clarity

When architecture derivation is complete, the smallest safe implementation slice should be derivable without needing to reinterpret Product Authority.

---

## Next Allowed Action

Perform the bounded **Learning Science Engine — Minimum Implementation Architecture Derivation**.

The next work may:

1. read the current Product Authority;
2. inspect relevant architecture and implementation read-only;
3. identify existing responsibility owners that may be reused;
4. derive the minimum Learning Science Engine responsibility;
5. derive the minimum Learning Design representation;
6. derive the Creator review and approval boundary;
7. derive the approved-design-to-learner-execution boundary;
8. classify architecture responsibilities as existing, adapted, or new;
9. identify explicit deferred responsibilities;
10. record the bounded architecture result in the appropriate authority documentation.

The next work must **not**:

1. change product code;
2. change schema;
3. create migrations;
4. write database data;
5. populate Supabase;
6. migrate legacy curriculum;
7. implement Creator UI;
8. implement the Learning Science Engine;
9. implement scoring;
10. implement mastery;
11. implement adaptive scheduling;
12. implement certification;
13. implement payments;
14. implement marketplace capabilities;
15. implement organization administration;
16. implement multi-question orchestration.

After the minimum architecture has been derived and read-back verified, `PROJECT_CONTROL.md` must be synchronized again before any implementation slice is authorized.

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
