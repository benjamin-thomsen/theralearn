# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-15

---

## Current Phase

**Learning Science Engine — Minimum Implementation Slice Governance Closure**

The bounded **Learning Science Engine — Minimum Implementation Slice** is now **CLOSED — VERIFIED — IMPLEMENTED — COMMITTED — PUSHED**.

Final verified implementation checkpoint:

```text
67a2a73c95bac82adf61cb426fa963ea5adb4ea9
Add Creator rejection to learning design lifecycle
```

Direct parent:

```text
4a719a8593a1b5b5d4f2426cef52603723949d56
Enforce bounded Active Retrieval applicability
```

The bounded **Developer Toolkit — Checkpoint Automation** prerequisite is now **CLOSED — VERIFIED — COMMITTED — PUSHED**.

The permanent checkpoint command is:

```text
./scripts/dev checkpoint
```

It now provides the mechanical repository-memory safeguard:

```text
TRACK NEW FILES
        ↓
CHECKPOINT
        ↓
REGENERATE INDHOLDSFORTEGNELSE.md
        ↓
RUN COMPLETE VERIFICATION
        ↓
CHECKPOINT PASS / FAIL
```

The checkpoint command does not stage, commit, push, change branches, infer governance state, or modify Product Authority.

The verified remote tooling checkpoint is:

```text
8d502fdbc3c035a7dd9c3f2c35f0b47888d760d9
Connect creator approval to learner execution
```

Remote branch-head was verified directly on GitHub as that exact commit.

The working tree was verified **Clean** after the commit and push.

The project therefore returns directly to the already-derived and already-authorized:

**Learning Science Engine — Minimum Implementation Slice**

The bounded **Learning Science Engine — Minimum Implementation Slice Derivation** remains **CLOSED — VERIFIED**.

The first implementation slice must prove that Learning Science materially determines mechanism selection, Creator approval authority, learner execution, and feedback/result behavior.

Product implementation is authorized only inside the bounded Code Change Gate below.

---

## Current Branch

```text
migration-next16-to-root
```

Current verified remote branch-head:

```text
a009bfe68ebe466b5a3cbb3eaed09aa8b7dbdf84
Add automated repository checkpoint workflow
```

Direct parent:

```text
7f1b1b654b7f7934327bfce756543d30b89bc22e
Gate retrieval execution by approved learning design
```

The remote branch-head was verified directly on GitHub after push.

Local state after push was verified as:

```text
Branch: migration-next16-to-root
Latest commit: 8d502fd Connect creator approval to learner execution
Working tree: Clean
```

The architecture authority remains:

```text
docs/architecture/learning-science-engine.md
```

No Product Authority, Learning Model, schema, migration, database data, Creator product surface, or Learner product surface was changed by the tooling prerequisite.

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

`docs/product/PRODUCT_VISION.md` remains part of the governing Product Authority.

### Learning Model

**VERIFIED — PRESERVED**

`docs/product/LEARNING_MODEL.md` remains the scientific learning authority.

The five certified Learning Principles remain unchanged.

### MVP Boundary

**VERIFIED — COMMITTED**

`docs/product/mvp.md` remains the durable MVP acceptance boundary.

### Existing Implementation Compatibility

**VERIFIED — CLOSED**

The bounded repository compatibility assessment remains closed.

### Minimum Implementation Architecture

**VERIFIED — COMMITTED**

The permanent architecture owner remains:

```text
docs/architecture/learning-science-engine.md
```

Verified architecture checkpoint:

```text
8c34b3d
Establish Learning Science Engine architecture
```

### Minimum Implementation Slice Derivation

**VERIFIED — CLOSED**

The first bounded Learning Science Engine implementation slice and its acceptance contract remain verified.

The implementation slice does not require persistence, schema change, migration, or Supabase population.

### Minimum Implementation Slice Authorization

**CLOSED — VERIFIED — IMPLEMENTED — COMMITTED — PUSHED**

The bounded Learning Science Engine Minimum Implementation Slice authorization has been consumed and is closed. No further product implementation is authorized by this completed slice.

### Checkpoint Automation Prerequisite

**VERIFIED — CLOSED — COMMITTED — PUSHED**

Implemented command:

```text
./scripts/dev checkpoint
```

Verified implementation responsibilities:

```text
tools/docs/commands/checkpoint.ts
tools/docs/core/runCheckpoint.ts
tools/docs/cli.ts
tools/docs/commands/help.ts
INDHOLDSFORTEGNELSE.md
```

The command:

1. invokes the existing deterministic repository-index generation;
2. runs the existing complete verification pipeline after successful index generation;
3. returns failure when checkpoint preparation or verification fails;
4. prints a clear final `CHECKPOINT PASS` / `CHECKPOINT FAIL`;
5. leaves `verify` as a separate verification command;
6. does not stage, commit, push, or change branches.

The command was executed successfully and produced:

```text
TypeScript Check    PASS
Build               PASS
Documentation Check PASS
Repository Index    PASS
Git Status          PASS
Overall             PASS

CHECKPOINT PASS
```

At verification time:

```text
Tracked files: 234
Indexed files: 234
```

The bounded tooling commit is:

```text
a009bfe68ebe466b5a3cbb3eaed09aa8b7dbdf84
Add automated repository checkpoint workflow
```

The commit was pushed to:

```text
origin/migration-next16-to-root
```

Remote branch-head was then verified directly on GitHub as exactly:

```text
a009bfe68ebe466b5a3cbb3eaed09aa8b7dbdf84
```

Local working tree after push:

```text
Clean
```

The manual checkpoint-memory risk is therefore resolved for the bounded workflow.

New repository files must still be Git-tracked before `checkpoint` can include them in the generated index because index authority is derived from `git ls-files`.

---

## Current Risks

### R1 – Learning Science Engine could become cosmetic

**Status: ACTIVE — PRIMARY PRODUCT ACCEPTANCE RISK**

The first implementation slice must materially determine Learning Requirements, mechanism proposal, Creator review basis, and learner execution.

If the same mechanism and learner behavior would remain after removing the derivation, the slice fails.

### R2 – Implementation could silently redefine Product Authority

**Status: CONTROLLED**

Product Authority and Learning Science Engine architecture remain upstream of implementation.

### R3 – Manual checkpoint steps could be forgotten

**Status: CONTROLLED BY VERIFIED TOOLING**

`./scripts/dev checkpoint` now regenerates the repository index and runs complete verification as one workflow command.

### R4 – New untracked files could be omitted from the generated index

**Status: KNOWN WORKFLOW BOUNDARY**

New files must be Git-tracked before `checkpoint` is expected to include them.

The checkpoint command intentionally does not stage files automatically.

### R5 – Learning activities could be mistaken for learning design

**Status: ACTIVE**

Existing quiz, flashcard, progress, and learner UI cannot create the first-slice requirements.

Mechanism selection must remain downstream of Learning Requirements.

### R6 – Creator authority could be bypassed

**Status: ACTIVE — HARD GATE**

A Proposed Learning Design must never directly become learner execution.

Only an Approved Learning Design may authorize learner execution.

### R7 – Database schema could prematurely define the NEW MVP domain

**Status: CONTROLLED**

The first Learning Design domain representation must remain persistence-independent.

No schema or migration change is authorized for this slice.

### R8 – Slice could grow beyond the minimum proof

**Status: ACTIVE**

Only behavior required by the verified Implementation Acceptance Contract is authorized.

---

## Code Change Gate

**Bounded product implementation: CLOSED**

The Code Change Gate for the verified **Learning Science Engine Minimum Implementation Slice** is closed. No further product implementation is authorized until a new bounded Code Change Gate is explicitly opened.

The previously authorized implementation responsibilities are now CLOSED as part of the completed Minimum Implementation Slice.

No additional product implementation is authorized by this closed gate.

A future implementation requires a separately derived bounded responsibility and an explicitly opened new Code Change Gate.

---

## Current Task

Complete governance closure for the verified **Learning Science Engine — Minimum Implementation Slice**.

No new product implementation is authorized during governance closure.

Closure requires: update governance, run checkpoint, verify status, commit, push, verify remote head, and verify a Clean working tree.

Only after closure is committed, pushed, remotely verified, and locally Clean may the Architect begin read-only derivation of the next bounded MVP responsibility.

---

## Implementation Slice Derivation Requirements

The bounded implementation must satisfy the following acceptance requirements.

### 1. Explicit input

One Learning Objective and one bounded Relevant Context must be represented explicitly.

### 2. Certified scientific authority

The derivation must reference the existing Active Retrieval Principle from `docs/product/LEARNING_MODEL.md`.

No duplicate scientific authority may be introduced.

### 3. Applicability reasoning

The implementation must produce or preserve a bounded rationale explaining why Active Retrieval applies to the selected objective and context.

### 4. Learning Requirements before mechanism

At least one Learning Requirement must exist before mechanism proposal.

For the first slice, the required learner behavior is:

> The Learner must actively retrieve the relevant information before reveal.

### 5. Proposed Learning Design

The derivation output must be an explicit Proposed Learning Design rather than an unstructured mechanism choice.

### 6. Creator approval gate

The Creator must be able to review the proposal and explicitly approve it.

A Proposed design must not execute for the Learner.

### 7. Re-derivation boundary

A change to the Learning Objective or derivation-relevant Context must invalidate affected downstream derivation and approval.

A new proposal must be derived before renewed approval.

### 8. Learner execution

Only an Approved Learning Design may authorize the bounded learner interaction.

The learner-side layer must not independently select the scientific mechanism.

### 9. Learner performance

The Learner must actively produce one response before correctness or the correct information is revealed.

### 10. Feedback / result

The learner attempt must produce the bounded feedback/result required by the Approved Learning Design.

Where an error or relevant gap is revealed, the feedback may apply the certified Informative Correction Principle within its existing scientific boundary.

### 11. Scientific traceability

The implemented learner experience must remain traceable through:

```text
LEARNER EXPERIENCE
        ↑
APPROVED LEARNING DESIGN
        ↑
PROPOSED MECHANISM
        ↑
LEARNING REQUIREMENTS
        ↑
APPLICABLE CERTIFIED PRINCIPLE
        ↑
LEARNING OBJECTIVE + RELEVANT CONTEXT
```

### 12. Removal test

If the Learning Science Engine derivation is removed, the bounded mechanism selection and learner behavior must no longer be valid in the same form.

### 13. Legacy independence

Existing quiz, flashcard, progress, dashboard, schema, and repository implementation may satisfy a derived technical need.

None may create the requirement.

### 14. Persistence boundary

The first slice must not introduce persistence unless implementation proves that the verified acceptance contract cannot be satisfied without it and governance is updated first.

### 15. Explicit minimum

No capability outside the Code Change Gate may be added as part of this implementation.

---

## Implementation Slice Decision Standard

The first implementation slice is accepted only when all of the following are true.

### Product Authority

The implementation remains downstream of:

```text
docs/product/PRODUCT_VISION.md
docs/product/LEARNING_MODEL.md
docs/product/mvp.md
docs/architecture/learning-science-engine.md
```

### Minimum sufficiency

Every responsibility required by the Implementation Acceptance Contract is demonstrably present.

### No premature expansion

No deferred capability has been introduced.

### Explicit ownership

Learning Design representation, derivation, lifecycle/approval, and learner execution have identifiable implementation owners.

### Scientific authority preservation

Certified Learning Principles are referenced without duplication, expansion, or silent modification.

### Subject-matter authority preservation

The bounded slice does not silently alter subject-matter truth.

### Approval enforcement

A Proposed Learning Design cannot become learner execution.

### Re-derivation enforcement

A derivation-relevant upstream change cannot retain stale scientific traceability or approval.

### Learner-performance proof

The Learner performs an active response before reveal and receives the relevant feedback/result.

### Learning Science Engine Removal Test

Removing the derivation would fundamentally change how the mechanism is selected, justified, approved, and executed.

### Verification

Before commit, the Developer Toolkit verification pipeline must complete with Overall PASS.

---

## Next Allowed Action

Complete **governance closure only**.

Required sequence:

1. complete the `PROJECT_CONTROL.md` governance update;
2. run `./scripts/dev checkpoint`;
3. run `./scripts/dev status`;
4. commit the governance closure;
5. push to `origin/migration-next16-to-root`;
6. verify the remote branch-head;
7. verify the local working tree is Clean.

No new product implementation is authorized during this sequence.

Only after the governance closure is committed, pushed, remotely verified, and locally Clean may the Architect begin a read-only derivation of the next bounded MVP responsibility.

A new product implementation requires a separately derived and explicitly opened Code Change Gate.

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
