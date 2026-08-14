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

**Product Authority Synchronization — Existing Implementation Compatibility Assessment**

A new Product Vision and a new MVP boundary have been established locally as the governing product direction for TheraLearn.

The previous learner-only MVP direction and the previous implementation-driving curriculum-data prerequisite are no longer sufficient to define the product or determine the next implementation action.

The new product core is:

> **You bring what needs to be learned. TheraLearn helps you determine how it can be learned effectively.**

The differentiating product responsibility is:

> **Learning design based on learning science.**

TheraLearn does not own subject-matter truth.

The Content Owner owns the correctness and legitimacy of the subject matter.

TheraLearn owns the learning system and the learning-design responsibility around that subject matter.

The governing end-to-end product chain is now:

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

Product implementation remains **PAUSED** while existing implementation is assessed against the new permanent product authority.

---

## Current Branch

```text
migration-next16-to-root
```

Latest verified remote branch checkpoint before the current local Product Authority changes:

```text
509c38b6e7649fd1b6d3dfa4f3ae62cc3d236575
Record curriculum content authority gap
```

The working tree was verified on 2026-08-14 with exactly two local changes before this `PROJECT_CONTROL.md` synchronization:

```text
M docs/product/PRODUCT_VISION.md
M docs/product/mvp.md
```

Those local files contain the newly established Product Vision and MVP authority.

This `PROJECT_CONTROL.md` synchronization is the third intended local authority change.

No product implementation file, schema file, migration, or runtime data was changed as part of establishing the new Product Vision or MVP boundary.

---

## Permanent Product Authority

The permanent product authority is:

```text
docs/product/PRODUCT_VISION.md
docs/product/LEARNING_MODEL.md
docs/product/mvp.md
```

Their responsibilities are distinct.

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
* personal preferences without pseudoscientific learning-style claims;
* accessibility as distinct from claims about learning effectiveness;
* existing implementation as subordinate to Product Authority.

### `LEARNING_MODEL.md`

Owns the scientific learning authority.

It remains valid and was consistency-verified against the new Product Vision and MVP.

It is **not being rewritten** as part of this Product Authority synchronization.

The five currently certified Learning Principles remain:

1. Active Retrieval Principle
2. Distributed Practice Principle
3. Informative Correction Principle
4. Adaptive Guidance Principle
5. Objective-Aligned Demonstration Principle

The established scientific derivation direction remains:

```text
Scientific evidence
        ↓
Learning principles
        ↓
Product mechanisms and decisions
        ↓
Implementation
```

The new Product Vision and MVP apply that authority through:

```text
Learning objective + context
        ↓
Applicable certified principle
        ↓
Relevant learning mechanism
```

This is product application of the Learning Model.

It is not a new Learning Principle.

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

The MVP is no longer defined merely by learner access to structured curriculum, lessons, flashcards, quizzes, or progress.

Those may become mechanisms inside the MVP, but they do not themselves define the product.

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

The Creator / Content Owner must retain review and approval authority over the learning design produced around their material.

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
* an invisible justification for features that would behave identically without it.

The decisive MVP test is:

> **If the Learning Science Engine could be removed from the MVP without fundamentally changing how the product works, we have built the wrong MVP.**

Therefore the following is insufficient as the defining MVP:

```text
UPLOAD CONTENT
      ↓
AI GENERATES QUIZ
      ↓
DONE
```

The following is also insufficient as the defining MVP:

```text
CURRICULUM
   ↓
LESSON
   ↓
FLASHCARDS / QUIZ
   ↓
PROGRESS
```

Those capabilities may still be useful, but they are subordinate mechanisms rather than the Product Vision itself.

---

## Creator-Side MVP Responsibility

The MVP must contain a bounded Creator / Content Owner flow.

For a bounded piece of legitimate subject-matter material, the Creator must be able to:

1. provide or identify the content to be learned;
2. work with or review the learning objective;
3. receive a learning design informed by applicable certified Learning Principles;
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

The Learner must perform an action rather than only consume passive content where the selected learning mechanism requires active performance.

The resulting learner attempt must lead to a relevant:

* feedback;
* correction;
* result;
* or learner state.

The precise future implementation of result, progress, mastery, adaptation, or scheduling is not predetermined by this statement.

Only the smallest mechanism required to prove the bounded MVP may later be authorized.

---

## Personalization and Accessibility Boundary

TheraLearn may support legitimate personal preferences and learner needs.

It must not encode unsupported fixed learning-style claims such as assuming that a person is inherently a visual, auditory, or kinesthetic learner and should therefore always learn through one corresponding modality.

Any future personalization affecting learning effectiveness must be grounded in:

* applicable evidence;
* learner context;
* task characteristics;
* observed learner performance;
* accessibility requirements;
* or verified preference where preference itself is the relevant product concern.

Accessibility requirements must remain conceptually distinct from claims about superior learning effectiveness.

Examples such as dyslexia, ADHD-related needs, reading support, interface adaptation, pacing support, or modality accessibility may justify product adaptations without asserting unsupported learning-style theories.

---

## Existing Implementation Baseline

Existing implementation predates the newly established Product Vision and MVP boundary.

It must therefore not be assumed to represent the new product correctly merely because it already exists.

Verified bounded implementation from the previous direction includes:

* authoritative course / chapter / lesson resolution;
* structured curriculum routes;
* repository-layer access;
* Supabase-backed authoritative entities;
* flashcard integration;
* quiz repository access;
* bounded authoritative quiz interaction;
* server-side question loading;
* answer selection;
* correctness reveal;
* stored explanation reveal;
* local retry/reset.

These implementation facts remain real.

Their future status is not yet decided.

Every relevant existing implementation element must now be classified as one of:

```text
REUSE
ADAPT
LEGACY
MISSING
```

Definitions:

### REUSE

The implementation already supports the new Product Vision and end-to-end MVP without materially conflicting with the new authority.

### ADAPT

The implementation contains useful foundations but requires modification, repositioning, extension, or changed responsibility to support the new Product Vision and MVP.

### LEGACY

The implementation belongs primarily to the previous product direction and should not determine the new product architecture or MVP.

### MISSING

A capability required by the new Product Vision or MVP does not currently exist in meaningful implementation form.

No classification may be inferred merely from file age, implementation effort, current UI visibility, or sunk development cost.

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

The project was previously found paused and was restored to Healthy state.

Direct database inspection established:

```text
public.quiz_questions row count: 0
public.courses row count: 0
```

Therefore no remote authoritative course → chapter → lesson chain was available at that checkpoint, and no remote authoritative quiz-question rows existed.

These remain valid verified repository/runtime facts unless subsequently changed.

However:

**They no longer define the current project task.**

The previous authoritative curriculum-data prerequisite must not independently drive implementation under the new Product Vision and MVP.

No remote curriculum data should be populated merely to make the old implementation path render.

Whether existing schema, repositories, curriculum entities, or runtime data structures should be reused or adapted must first be determined through the Existing Implementation Compatibility Assessment.

---

## Superseded Implementation Direction

The previous Current Phase was:

```text
MVP Learning Loop Implementation —
Authoritative Curriculum Data Prerequisite Resolution
```

That phase is superseded as the active project direction.

The previous dependency chain centered on:

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

Parts of that chain may ultimately be reusable.

It is no longer sufficient as the authoritative definition of the MVP.

The new Product Authority requires the upstream Creator / learning-design side as well as the downstream Learner side.

Therefore missing remote curriculum data is not currently permission to resume the former implementation path.

---

## Verification State

### New Product Vision

**ESTABLISHED LOCALLY — READ-BACK VERIFIED**

`docs/product/PRODUCT_VISION.md` has been replaced locally with the new Product Vision and read back through the Developer Toolkit.

It establishes the new product direction described in this control file.

It is not yet committed at the current verified remote checkpoint.

### New MVP Boundary

**ESTABLISHED LOCALLY — READ-BACK VERIFIED**

`docs/product/mvp.md` has been replaced locally with the new MVP authority and read back through the Developer Toolkit.

It requires both Creator and Learner sides of the learning-design chain.

It is not yet committed at the current verified remote checkpoint.

### Learning Model Consistency

**VERIFIED — PRESERVED**

`docs/product/LEARNING_MODEL.md` was inspected against the new Product Vision and MVP.

No rewrite is required.

The existing certified Learning Principles remain authoritative.

### Existing Implementation Compatibility

**NOT YET ASSESSED**

Existing implementation has not yet been systematically classified against the new:

1. `PRODUCT_VISION.md`;
2. `LEARNING_MODEL.md`;
3. `mvp.md`.

No implementation-resumption decision may be made before that assessment.

---

## Current Risks

### R1 – Existing implementation may encode the previous product direction

**Status: OPEN — MUST BE ASSESSED.**

Existing code was developed under an earlier MVP framing.

Some implementation may remain useful, but its existence does not establish compatibility with the new Product Vision.

The assessment must prevent implementation from silently redefining Product Authority.

### R2 – Learning Science Engine could become cosmetic

**Status: CORE PRODUCT RISK.**

The Learning Science Engine must materially affect learning design and product behavior.

If the same product behavior would exist after removing the Learning Science Engine, the MVP would fail its core differentiating requirement.

### R3 – Creator side is not yet verified in implementation

**Status: EXPECTED GAP — CLASSIFICATION PENDING.**

The new MVP requires Creator / Content Owner participation, learning-objective work, learning-design review, and approval.

Existing implementation was primarily learner-facing.

The compatibility assessment must identify the precise `MISSING` and `ADAPT` scope without immediately implementing it.

### R4 – Subject-matter authority could be conflated with platform authority

**Status: ACTIVE GOVERNANCE RISK.**

TheraLearn must not claim ownership of subject-matter truth merely because content is stored, transformed, structured, or displayed by the platform.

Creator / Content Owner authority must remain explicit.

### R5 – Existing learning activities may be mistaken for the Learning Science Engine

**Status: OPEN.**

Flashcards, quizzes, explanations, progress UI, or other learning activities may support certified Learning Principles.

Their presence alone does not prove the Learning Science Engine or the new learning-design workflow.

### R6 – Previous curriculum-data prerequisite could incorrectly resume implementation

**Status: SUPERSEDED AS CURRENT DRIVER.**

The verified empty remote curriculum state remains factual.

It must not be treated as the current Next Allowed Action.

No curriculum population may occur until the new Product Authority and implementation compatibility assessment justify the relevant architecture and data path.

### R7 – Premature expansion

**Status: CONTROLLED BY CODE CHANGE GATE.**

The new Product Vision introduces substantial future possibilities.

This synchronization does not authorize broad implementation of:

* AI course generation;
* scoring;
* mastery;
* adaptive scheduling;
* recommendation systems;
* multi-question orchestration;
* certification infrastructure;
* payments;
* organization administration;
* marketplace capabilities;
* large-scale authoring systems.

The immediate objective is assessment, not expansion.

---

## Code Change Gate

**Product implementation: PAUSED.**

No product-code change is currently authorized.

No schema change is currently authorized.

No database migration is currently authorized.

No database-data write is currently authorized.

No Supabase population is currently authorized.

No legacy curriculum migration is currently authorized.

No scoring implementation is currently authorized.

No mastery implementation is currently authorized.

No adaptive logic implementation is currently authorized.

No scheduling implementation is currently authorized.

No multi-question orchestration is currently authorized.

No certification implementation is currently authorized.

No commercial implementation is currently authorized.

Read-only repository inspection and authority comparison are authorized for the bounded Existing Implementation Compatibility Assessment.

Documentation changes required solely to synchronize verified authority may be made and must be verified before commit.

---

## Current Task

Perform a bounded **Existing Implementation Compatibility Assessment** against the newly established Product Authority.

The assessment must answer:

> **Which existing implementation helps realize the new Product Vision and end-to-end MVP?**

The authority order for the assessment is:

```text
1. docs/product/PRODUCT_VISION.md
2. docs/product/LEARNING_MODEL.md
3. docs/product/mvp.md
        ↓
Existing implementation
```

Implementation must be evaluated against authority.

Authority must not be reconstructed from implementation.

The assessment must identify relevant current implementation responsibilities and classify each as:

```text
REUSE
ADAPT
LEGACY
MISSING
```

The assessment must cover enough of the existing implementation to determine the smallest credible path toward the new end-to-end MVP.

It must specifically determine what currently exists for:

* subject-matter content handling;
* learning objectives;
* Learning Science Engine behavior;
* learning-design derivation;
* Creator / Content Owner workflow;
* creator review;
* creator change/rejection;
* creator approval;
* learner-facing learning experience;
* active learner performance;
* feedback/correction/result;
* curriculum structure;
* existing flashcard mechanisms;
* existing quiz mechanisms;
* existing progress/result mechanisms;
* current repository and Supabase responsibilities;
* boundaries between reusable infrastructure and legacy product assumptions.

The assessment must not implement the missing pieces.

---

## Next Allowed Action

Perform the bounded **Existing Implementation Compatibility Assessment**.

The assessment must:

1. read the final synchronized `PRODUCT_VISION.md`;
2. read the preserved `LEARNING_MODEL.md`;
3. read the final synchronized `mvp.md`;
4. inspect existing implementation relevant to the new end-to-end MVP;
5. evaluate implementation against Product Authority rather than the reverse;
6. classify relevant capabilities and responsibilities as:

```text
REUSE
ADAPT
LEGACY
MISSING
```

7. identify the smallest credible implementation path that could later prove:

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

8. identify which existing technical foundations can support that path;
9. identify which existing product assumptions must be adapted or retired;
10. make no product-code change during the assessment;
11. make no schema change during the assessment;
12. make no database-data write during the assessment;
13. synchronize the verified assessment result before authorizing implementation.

Do not populate Supabase merely because existing authoritative curriculum tables are empty.

Do not migrate legacy/static curriculum merely because it is available.

Do not assume existing curriculum, flashcard, quiz, or progress implementation automatically belongs in the new MVP.

Do not build Creator functionality during the assessment.

Do not build the Learning Science Engine during the assessment.

Do not introduce scoring, mastery, adaptive logic, scheduling, certification, payment, or multi-question orchestration during the assessment.

The compatibility assessment must finish before a new implementation slice is selected.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters:

* Current Phase;
* Current Task;
* Next Allowed Action;
* Product Authority;
* implementation compatibility classification;
* implementation baseline;
* verification state;
* known risks;
* or code-change permission.

No implementation may become authoritative merely by existing in the repository.

Product Authority remains upstream of implementation.
