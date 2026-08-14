# TheraLearn – MVP Scope

## Purpose

This document owns the durable product scope and acceptance boundary for the initial TheraLearn MVP.

It defines what the MVP must prove as a product.

It does not own:

* the broader permanent Product Vision;
* the scientific learning principles themselves;
* technical architecture;
* current implementation progress;
* the current development task;
* concrete curriculum content;
* release sequencing;
* commercial pricing decisions.

Authority is divided as follows:

* product intent belongs in `PRODUCT_VISION.md`;
* certified learning principles and their scientific boundaries belong in `LEARNING_MODEL.md`;
* technical realization belongs in architecture documentation;
* current implementation state, current task, code-change permission, and Next Allowed Action belong in `PROJECT_CONTROL.md`.

Implementation may realize this MVP.

Existing implementation does not define the MVP boundary.

---

## MVP Product Hypothesis

The initial MVP must prove that TheraLearn can take legitimate subject-matter content from a content owner, help transform it into an evidence-backed learning design, and then allow a learner to work with that approved design through relevant learning mechanisms.

The core MVP hypothesis is:

> **TheraLearn can connect what needs to be learned with how it should be learned, using the certified Learning Model as an actual product constraint.**

The MVP must therefore prove both sides of the core product:

```text
BUILD / DESIGN
      ↓
    LEARN
```

A learner-only content experience is not sufficient.

A creator-only course builder is not sufficient.

Both sides must form one coherent end-to-end product journey.

---

## What the MVP Must Prove

The MVP must demonstrate this complete product chain:

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

Each central link must have a real product responsibility.

The chain must not exist only as documentation or labels around an otherwise generic course workflow.

---

## MVP Roles

The MVP requires two product roles.

### Creator / Content Owner

The creator provides or owns the bounded subject-matter material used for the MVP learning journey.

The creator remains responsible for the subject matter and its factual or professional correctness.

The creator must be able to inspect and control the learning design before it becomes the learner's approved learning experience.

### Learner

The learner works with the approved learning experience.

The learner must do more than view content.

The learner must perform at least one meaningful learning activity tied to a learning objective, and that attempt must produce relevant feedback, result information, or learner state.

The MVP does not require these roles to represent the full future permissions or organisation model.

It requires only enough role distinction to prove the core product journey.

---

## Bounded Subject-Matter Input

The MVP must allow a creator or legitimate content owner to provide one bounded piece of subject-matter material.

The first MVP does not require universal ingestion of every possible content format.

The bounded input may use one explicitly selected supported format or workflow.

The important product requirement is that the material enters the TheraLearn learning-design process as subject matter rather than as a pre-built TheraLearn learning experience.

TheraLearn must preserve the authority boundary:

```text
CONTENT OWNER
owns subject-matter authority

THERALEARN
owns the learning-design responsibility
around that content
```

The MVP must not depend on TheraLearn silently inventing subject-matter truth.

---

## Learning Objectives

The MVP must work with explicit learning objectives.

TheraLearn may help derive, formulate, structure, or refine learning objectives from the supplied material.

The creator must be able to review the resulting objectives before they become part of the approved learning design.

Learning objectives provide the reference point for subsequent learning-design decisions.

The MVP must therefore demonstrate a real relationship between:

```text
SUBJECT-MATTER CONTENT
        ↓
LEARNING OBJECTIVE
        ↓
LEARNING DESIGN
```

A generic activity generated without reference to an objective does not satisfy this requirement.

---

## Structured Learning Context

The MVP must organize the bounded material into a usable learning context.

The existing structural model:

```text
Course
  ↓
Chapter
  ↓
Lesson
  ↓
Learning objectives
  ↓
Learning activities
```

is a valid candidate for the initial MVP because it already provides structured learning context.

The MVP does not establish this hierarchy as the only permanent structure TheraLearn may ever support.

The structural requirement is that subject matter, learning objectives, learning activities, learner attempts, and relevant results can be connected through a coherent learning context.

---

## Learning Science Engine – MVP Requirement

The MVP must contain a bounded but real realization of the TheraLearn Learning Science Engine.

The minimum required derivation is:

```text
LEARNING OBJECTIVE
        +
RELEVANT CONTEXT
        ↓
APPLICABLE CERTIFIED
LEARNING PRINCIPLE
        ↓
RELEVANT LEARNING MECHANISM
        ↓
LEARNING ACTIVITY
```

At least one learning-design decision in the MVP must genuinely depend on this derivation.

The decision must not be equivalent to:

```text
FEATURE EXISTS
      ↓
USE FEATURE
```

or:

```text
UPLOAD CONTENT
      ↓
AI GENERATES QUIZ
      ↓
DONE
```

The MVP must instead demonstrate that the learning objective and relevant context affect the selected learning mechanism.

---

## Scientific Authority

The Learning Science Engine must derive its scientific authority from:

`docs/product/LEARNING_MODEL.md`

The MVP must not create a separate scientific authority.

The currently certified principles are:

1. Active Retrieval Principle;
2. Distributed Practice Principle;
3. Informative Correction Principle;
4. Adaptive Guidance Principle;
5. Objective-Aligned Demonstration Principle.

The MVP does not require every learning journey to implement all five principles.

The MVP does not require all five principles to be implemented as product mechanisms in the first release.

It requires at least one bounded, defensible derivation from relevant objective and context through an applicable certified principle to a learning mechanism.

Where additional certified principles are actually relevant to the bounded journey, they may constrain the resulting design.

Features remain mechanisms.

Learning Principles remain authority.

---

## Minimum Learning-Science Demonstration

A valid bounded example could be:

```text
LEARNING OBJECTIVE

Learner should be able to recall
important concepts after acquisition

        ↓

RELEVANT CONTEXT

Durable retention is intended

        ↓

CERTIFIED PRINCIPLE

Active Retrieval Principle

        ↓

LEARNING-DESIGN DECISION

Require the learner to retrieve
the relevant information before reveal

        ↓

LEARNER ATTEMPT

Learner provides an active response

        ↓

IF A RELEVANT ERROR OR GAP IS REVEALED

Informative Correction Principle

        ↓

RELEVANT CORRECTION

Feedback provides sufficient information
and opportunity to support correction
```

This example is illustrative rather than a universal required sequence.

The MVP may realize another bounded derivation if it is supported by the certified Learning Model.

---

## Visible Learning Design

The learning design must be visible to the creator.

The MVP must not hide the core learning-design result entirely behind automation.

The creator must be able to inspect relevant elements such as:

* learning objectives;
* learning structure;
* proposed learning activities;
* relevant relationship between objective and activity;
* learning-science reasoning where it materially explains the proposal.

The product does not need to expose academic literature or internal implementation details to the creator.

It must expose enough reasoning that the creator can understand what TheraLearn proposes and exercise meaningful control over it.

---

## Creator Review and Approval

Before the learner uses the generated or assisted learning design, the creator must be able to:

* review it;
* change relevant parts of it;
* reject unsuitable proposals;
* approve the learning design.

Creator approval establishes that the design may proceed into the bounded learner experience.

Approval does not transfer subject-matter authority to TheraLearn.

Approval does not establish scientific truth beyond the certified Learning Model.

The MVP does not require a complete enterprise publishing workflow, version-control system, editorial approval hierarchy, or multi-user organisation model.

---

## Approved Learning Experience

The learner must enter a learning experience based on the creator-approved design.

The MVP must preserve the connection between:

```text
APPROVED LEARNING OBJECTIVE
        ↓
APPROVED LEARNING DESIGN
        ↓
LEARNER ACTIVITY
```

The learner experience must therefore be downstream of the creator-reviewed design rather than an unrelated hard-coded learning surface.

---

## Active Learner Work

The learner must perform at least one relevant active learning activity.

Passive page viewing alone does not satisfy the MVP.

The exact mechanism depends on the selected learning objective and applicable certified principle.

Possible mechanisms include:

* active retrieval;
* self-explanation;
* application activity;
* structured exercise;
* relevant quiz interaction;
* another active response mechanism justified by the Learning Model.

Flashcards or quizzes may be used if they serve the learning-design decision.

Their existence is not itself an MVP requirement.

---

## Feedback / Correction / Result

The learner's attempt must produce a meaningful downstream response.

Depending on the bounded learning activity, this may include:

* informative correction;
* relevant feedback;
* stored attempt result;
* learner state;
* another bounded result directly connected to the activity.

A page view alone is insufficient.

A generic completion flag alone is insufficient where the activity is intended to produce evidence about learner performance.

A score alone must not be interpreted as competence unless the underlying performance is aligned with the learning objective.

---

## Learner Performance

The MVP must capture enough information about the learner's attempt to distinguish active learning performance from passive consumption.

The first MVP does not require:

* a comprehensive mastery model;
* universal competence scoring;
* advanced analytics;
* adaptive learner modelling;
* a universal grading system;
* long-term performance prediction.

The MVP requires only enough learner-related state to support the bounded end-to-end learning loop.

---

## End-to-End MVP Journey

The required MVP journey is:

```text
1. CREATOR / CONTENT OWNER

   "My learners need to learn this"

                ↓

2. PROVIDE BOUNDED MATERIAL

   One bounded piece of legitimate
   subject-matter material

                ↓

3. ANALYSE AND STRUCTURE

   What needs to be learned?
   What are the learning objectives?
   What learning context is needed?

                ↓

4. LEARNING SCIENCE ENGINE

   Learning objective + context
                ↓
   applicable certified principle
                ↓
   relevant learning mechanism

                ↓

5. LEARNING DESIGN

   Structured learning context
                ↓
   learning objectives
                ↓
   learning activities

                ↓

6. CREATOR REVIEW

   Creator can:
   - review
   - change
   - reject
   - approve

                ↓

7. APPROVED LEARNING EXPERIENCE

                ↓

──────────────────────────────────
         BUILD / DESIGN → LEARN
──────────────────────────────────

                ↓

8. LEARNER

   Opens the approved experience

                ↓

9. ACTIVE LEARNING ACTIVITY

   Learner actively works
   with the material

                ↓

10. LEARNER ATTEMPT

    Observable interaction or response

                ↓

11. FEEDBACK / CORRECTION / RESULT

    The attempt produces a relevant
    downstream response

                ↓

12. LEARNER STATE

    TheraLearn knows something relevant
    about what the learner attempted,
    did, or demonstrated
```

The MVP is an end-to-end product slice.

It is not a checklist of unrelated features.

---

## MVP Acceptance Criteria

The initial MVP is product-complete only when all of the following conditions are satisfied.

1. **A creator can provide one bounded piece of legitimate subject-matter material.**

2. **TheraLearn can work with explicit learning objectives derived from or associated with that material.**

3. **TheraLearn can organize the material and objectives into a coherent learning context.**

4. **At least one learning-design decision genuinely depends on the learning objective, relevant context, and an applicable principle from the certified Learning Model.**

5. **The resulting learning mechanism is traceable to that learning-design decision rather than selected merely because a feature exists.**

6. **The creator can inspect the proposed learning design and relevant reasoning.**

7. **The creator can change relevant parts of the design before approval.**

8. **The creator can reject or approve the design.**

9. **A learner can enter the creator-approved learning experience.**

10. **The learner can perform at least one relevant active learning activity tied to the learning objective.**

11. **The learner's attempt produces relevant feedback, correction, result information, or learner state.**

12. **The complete chain works end-to-end:**

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

If a central link in this chain is absent, the new TheraLearn MVP has not yet been demonstrated.

---

## The Decisive MVP Test

The strongest product test for the MVP is:

> **If the Learning Science Engine could be removed from the MVP without fundamentally changing how the product works, we have built the wrong MVP.**

Learning science must therefore affect product behavior.

It must not exist only as:

* explanatory copy;
* marketing language;
* hidden documentation;
* an unused metadata field;
* a label attached to generic AI generation.

The MVP must demonstrate an actual product consequence of the certified Learning Model.

---

## Existing Implementation

Existing implementation is not automatically part of the new MVP.

Existing capabilities must be evaluated against the new Product Vision and this MVP boundary.

Potential candidates include:

* Course → Chapter → Lesson;
* authentication;
* Supabase infrastructure;
* repository layers;
* lesson context;
* quiz functionality;
* flashcards;
* learner progress.

Each existing capability must later be classified as:

```text
REUSE
ADAPT
LEGACY
MISSING
```

The governing question is:

> **Does this capability help realize the new end-to-end MVP?**

Existing implementation must not cause the MVP to regress into:

```text
EXISTING CURRICULUM
        ↓
LESSON
        ↓
FLASHCARDS / QUIZ
        ↓
PROGRESS
```

That may form part of a learner experience.

It does not prove the new core product by itself.

---

## Not Required for the First MVP

The initial MVP does not automatically require:

* payment processing;
* a specific pricing model;
* marketplace functionality;
* full B2B administration;
* organisation-wide role management;
* a complete certification platform;
* external accreditation;
* provider-issued certificates;
* advanced adaptive AI;
* a universal AI tutor;
* advanced accessibility functionality;
* multiple personal learning paths;
* a universal spaced-repetition algorithm;
* comprehensive learning analytics;
* mastery learning;
* multi-language completeness;
* a full course marketplace;
* large-scale content ingestion;
* support for every document or media format;
* all five certified Learning Principles in every learning journey.

These capabilities may belong to the broader Product Vision without belonging to the first MVP acceptance boundary.

---

## Personalisation Boundary

Multiple evidence-compatible learning paths are part of the broader Product Vision but are not required to prove the first MVP.

The first MVP therefore does not need to determine a learner's preferred learning method.

It must not introduce unsupported learning-style classification.

Accessibility needs, personal preferences, prior knowledge, learner state, and demonstrated performance remain separate concepts.

Any future adaptive or personalised mechanism that makes a learning-effectiveness claim must respect the evidence requirements of `LEARNING_MODEL.md`.

---

## Certification Boundary

Certification belongs to the broader Product Vision but is not required for the first MVP.

The MVP may record learner attempts and bounded results without claiming certification or competence.

Participation, completion, demonstrated learning, provider certification, verifiable certification through TheraLearn, and external accreditation remain distinct concepts.

The absence of certification functionality does not prevent the first MVP from proving the core:

```text
BUILD / DESIGN → LEARN
```

---

## Commercial Boundary

The first MVP does not need to prove the final TheraLearn business model.

Payment, subscriptions, organisation licensing, course sales, transaction fees, and marketplace functionality are outside the initial acceptance boundary unless a later explicit scope decision changes this document.

The first MVP exists to prove the core learning product before proving its complete commercial system.

---

## Scope vs. Implementation State

This document defines what the MVP must achieve.

It does not claim that the current repository already achieves it.

Existing routes, components, schemas, database structures, learning activities, and product surfaces are implementation evidence only.

They must be evaluated against this MVP rather than used to derive it.

Current implementation status, gaps, sequencing, risks, and Next Allowed Action belong in `PROJECT_CONTROL.md`.

---

## Change Rule

The MVP boundary may change only through an explicit verified product-scope decision.

Implementation convenience does not change the MVP.

An already-existing feature does not automatically become an MVP requirement.

A technically attractive feature does not automatically become an MVP requirement.

A new scientific learning claim does not enter the MVP merely because it appears useful.

Scientific claims remain governed by `LEARNING_MODEL.md`.

Product Vision remains governed by `PRODUCT_VISION.md`.

Current execution remains governed by `PROJECT_CONTROL.md`.
