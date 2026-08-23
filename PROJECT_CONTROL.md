# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-23

---

## Current Phase

**Creator Learning Design Approval → Approved Retrieval Attempt → Source-Grounded Feedback — CLOSED — VERIFIED — IMPLEMENTED**

The bounded Creator Learning Design Approval → Approved Retrieval Attempt → Source-Grounded Feedback Code Change Gate is now **CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED**.

Bounded automated verification and direct browser-runtime verification establish the complete Minimum Acceptance Contract. The Creator explicitly approved the Learning Design, the approved design passed the existing execution-authority boundary, the Learner completed one active retrieval response before reveal, and the visible feedback compared the response with the approved source context. The rejection runtime was separately verified to expose no Learner activity.

The bounded authorization has been consumed and is closed. No further product implementation is authorized by this completed gate.

The bounded Creator Subject-Matter → Learning Design Runtime Integration remains **CLOSED — VERIFIED — IMPLEMENTED — COMMITTED — PUSHED — REMOTELY VERIFIED**.

Verified implementation checkpoint:

```text
3de5db4d9b943a74e2908e4e94a15fe95f1673e3
Connect accepted objective to learning design runtime
```

Repository evidence, bounded automated tests, canonical complete verification, and the established browser-runtime outcome verify the implementation against the governance-verified Implementation Acceptance Contract. The implementation stops when one `ProposedLearningDesign` derived from accepted upstream Subject-Matter premises is visible to the Creator for Learning Design review.

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

The bounded **Learning Science Engine — Minimum Implementation Slice Derivation** remains **CLOSED — VERIFIED**.

The bounded **Subject-Matter Intake & Objective Formation Architecture** is now **CLOSED — VERIFIED — COMMITTED — PUSHED — REMOTELY VERIFIED**.

The bounded **Post-PDF Objective-Proposal Vertical** is now **CLOSED — VERIFIED — IMPLEMENTED — COMMITTED — PUSHED — REMOTELY VERIFIED**.

Verified remote implementation checkpoint:

```text
9160fba51f104f2519ccb2a3466c478683cec4f5
Complete Post-PDF objective proposal vertical
```

The Post-PDF browser-testable objective-proposal Code Change Gate is CLOSED. No further product implementation is authorized by that completed gate.

---

## Current Branch

```text
migration-next16-to-root
```

Verified Subject-Matter Intake architecture checkpoint:

```text
fabfa1d07d575b10e831b18b2ddd2e8c86e3a78b
Close Subject-Matter Intake architecture governance
```

Direct parent:

```text
f0d44f66a95367614c4259e7d0c591cd3e83609d
Close Learning Science minimum slice governance
```

This architecture checkpoint was verified directly on GitHub after push.

Local state at architecture-checkpoint verification was:

```text
Branch: migration-next16-to-root
Latest commit: fabfa1d Close Subject-Matter Intake architecture governance
Working tree: Clean
```

The relevant architecture authorities are:

```text
docs/architecture/subject-matter-intake.md
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
### Subject-Matter Intake & Objective Formation Architecture

**VERIFIED — CLOSED — COMMITTED — PUSHED — REMOTELY VERIFIED**

Architecture derivation is complete.

The permanent architecture owner is:

    docs/architecture/subject-matter-intake.md

The verified architecture preserves these boundaries:

- Creator / Content Owner remains the subject-matter authority;
- AI-assisted output remains proposal rather than authority;
- source traceability is preserved from bounded source material to proposed Learning Objective(s);
- Creator review, change, rejection, and approval remain required before a Learning Objective becomes accepted;
- the architecture hands off accepted Learning Objective + bounded Relevant Context + source traceability to the existing Learning Science Engine;
- the architecture does not duplicate Learning Science Engine responsibilities.

The Code Change Gate remains CLOSED.

The architecture-governance checkpoint was committed, pushed to `origin/migration-next16-to-root`, and remotely verified directly on GitHub as `fabfa1d07d575b10e831b18b2ddd2e8c86e3a78b`.


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

### Developer Toolkit Exact Patch Prerequisite

**Status: CLOSED — VERIFIED — IMPLEMENTED — COMMITTED — PUSHED — REMOTELY VERIFIED**

The Developer Toolkit File Module now provides the bounded exact-replacement command:

`./scripts/dev patch <file-path>`

The command accepts JSON through stdin with one literal `find` value and one `replace` value. It validates the file, parses the patch, reads current content, requires exactly one literal match, transforms in memory, and writes once.

Zero matches or multiple matches fail explicitly with `PATCH FAIL: target must match exactly once`. The command does not use regex, editor workflows, or truncation.

This tooling prerequisite does not authorize product implementation and does not open the Accepted Subject-Matter Handoff Code Change Gate.

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

## Subject-Matter Intake Minimum Implementation Slice Derivation

**Status: DERIVED — GOVERNANCE VERIFIED**

A bounded read-only repository compatibility assessment has been completed downstream of:

```text
docs/product/PRODUCT_VISION.md
docs/product/LEARNING_MODEL.md
docs/product/mvp.md
docs/architecture/subject-matter-intake.md
docs/architecture/learning-science-engine.md
```

No product implementation, dependency, schema, migration, database, persistence, storage, or AI-provider change was made during the derivation.

### Repository Compatibility Classification

**REUSE**

```text
LearningObjective
RelevantContext
deriveLearningDesign()
Learning Design domain representation
Learning Design lifecycle
ApprovedRetrievalExperience
bounded learner execution
```

The existing Learning Science Engine already owns the downstream responsibility beginning from `LearningObjective + RelevantContext` and must not be duplicated by Subject-Matter Intake.

**ADAPT**

```text
BoundedLearningDesignSlice
existing learning_objectives storage and use
```

`BoundedLearningDesignSlice` currently permits direct Learning Objective editing inside the Learning Design lifecycle. Under the verified Subject-Matter Intake architecture, objective formation and Creator objective authority belong upstream. A future adapted boundary must therefore receive an already accepted Learning Objective rather than independently owning objective proposal authority.

Existing `learning_objectives` storage may remain technically useful but does not establish objective proposal state, source grounding, Creator authority, or the required handoff contract.

**MISSING**

```text
bounded source-document input
source-material extraction
source-material representation
source traceability
objective proposal representation
objective proposal lifecycle
Creator objective review
Creator objective change
Creator objective rejection
Creator objective acceptance
accepted-objective handoff
source traceability through the handoff
```

These missing responsibilities establish the minimum new implementation boundary.

### Derived Minimum Implementation Responsibility

```text
ONE BOUNDED SOURCE DOCUMENT
        ↓
SOURCE-MATERIAL EXTRACTION
        ↓
TRACEABLE SOURCE MATERIAL
        ↓
ONE OBJECTIVE PROPOSAL
        ↓
CREATOR REVIEW
   ↙       ↓       ↘
CHANGE   REJECT   APPROVE
                    ↓
ACCEPTED LEARNING OBJECTIVE
        +
BOUNDED RELEVANT CONTEXT
        +
SOURCE TRACEABILITY
                    ↓
BOUNDED HANDOFF
                    ↓
EXISTING LEARNING SCIENCE ENGINE
```

The implementation responsibility stops at that handoff.

The existing Learning Science Engine remains responsible for applicability reasoning, certified Learning Principle references, Learning Requirements, mechanism proposal, Proposed Learning Design, Creator Learning Design control, Approved Learning Design, learner execution, performance, and feedback/result.

### Minimum Technical Boundary

The current repository has no product dependency for PDF, DOCX, OCR, generalized document extraction, or an AI-provider SDK.

Product Authority now fixes the first externally testable MVP input as one bounded text-based PDF with machine-readable embedded text.

The minimum technical boundary must therefore support deterministic extraction of machine-readable embedded PDF text into bounded source material, with explicit extraction failure that cannot silently continue into objective formation.

OCR, scanned or image-only PDF support, handwriting recognition, DOCX parsing, generalized document understanding, RAG, embeddings, vector databases, and autonomous course generation remain outside this bounded requirement.

Concrete PDF parsing dependency, size limit, upload mechanism, storage mechanism, and persistence model remain subject to bounded implementation derivation and explicit Code Change Gate authorization.

### Implementation Acceptance Contract

A future bounded implementation may be accepted only if all of the following are demonstrated:

1. One supported bounded Creator-provided source document can enter the workflow.
2. Usable source material is extracted without silently changing its substantive meaning.
3. Unsupported or failed extraction cannot silently continue into authoritative objective formation.
4. An objective output is explicitly represented as a proposal rather than as accepted authority.
5. The proposal remains traceable to supporting source material sufficiently for Creator review.
6. The Creator can inspect the proposal together with its supporting source boundary.
7. The Creator can change the proposed objective.
8. A material Creator change cannot silently retain stale source-grounding claims.
9. The Creator can reject the objective proposal.
10. A rejected objective cannot enter downstream Learning Science Engine derivation.
11. The Creator can explicitly approve the objective.
12. Only explicit Creator approval can establish an Accepted Learning Objective.
13. A bounded Relevant Context is formed separately from the Learning Objective.
14. Source traceability remains associated with the accepted handoff for subject-matter authority preservation.
15. Only an Accepted Learning Objective together with bounded Relevant Context may enter the existing Learning Science Engine.
16. Merely proposed or rejected objectives must be structurally prevented from becoming authoritative Learning Science Engine input.
17. Subject-Matter Intake must not perform Learning Science applicability reasoning, select certified Learning Principles, choose learning mechanisms, derive Learning Requirements, or independently own Learning Design responsibilities.
18. The existing `deriveLearningDesign()` boundary must remain the downstream Learning Science Engine entrypoint unless separately justified architecture requires otherwise.

### Explicit Minimum-Slice Non-Requirements

The derived minimum slice does not currently require PDF support, DOCX support, OCR, scanned-document support, image understanding, URL ingestion, web crawling, multiple-document workflows, generalized ingestion, autonomous course/curriculum/chapter/lesson generation, vector databases, embeddings, RAG infrastructure, knowledge graphs, new database schema, database migrations, persistent workflow state, Supabase storage changes, organization administration, payments, certification, or analytics infrastructure.

None of these capabilities may enter the bounded implementation merely because they could be useful later.

### AI-Assisted Objective Analysis Boundary

The verified architecture permits AI-assisted objective analysis while preserving AI output as proposal rather than subject-matter authority.

Repository assessment found no existing product AI integration, provider abstraction, AI SDK dependency, or objective-analysis service. The `OPENAI_API_KEY` reference in `supabase/config.toml` belongs to Supabase Studio configuration and does not establish a TheraLearn product AI capability.

The minimum technical realization is therefore provider-neutral and requires only the following bounded trust boundary:

```text
CREATOR / CLIENT
        ↓
BOUNDED SOURCE MATERIAL
        ↓
SERVER-SIDE AI EXECUTION BOUNDARY
        ↓
OBJECTIVE-PROPOSAL-ONLY TRANSFORMATION
        ↓
STRUCTURAL VALIDATION
        ↓
SOURCE-GROUNDING EVALUATION
        ↓
CREATOR REVIEW / AUTHORITY
```

Any credentialed or privileged provider execution must remain server-side. API credentials must not be exposed through the client.

The AI responsibility is limited to bounded source-material-to-objective-proposal assistance. It must not establish Creator acceptance, perform Learning Science applicability reasoning, select Learning Principles or mechanisms, derive Learning Design, or authorize downstream execution.

No specific AI provider, model, SDK, dependency, prompt implementation, route handler, server action, retry strategy, or cost-control mechanism is selected or authorized by this governance verification.

A future bounded Code Change Gate may select the smallest technical provider realization only if that selection preserves this provider-neutral contract and does not expand the verified slice.

### Minimum Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED**

The minimum bounded implementation authorization is derived from the verified Product Vision, MVP boundary, Subject-Matter Intake architecture, Learning Science Engine architecture, and Implementation Acceptance Contract.

#### AUTHORIZED FOR MINIMUM SLICE

- one bounded text-based PDF with machine-readable embedded text;
- deterministic source-material extraction;
- persistence-independent source-material representation;
- source traceability and supporting source boundary;
- bounded server-side AI-assisted objective-analysis capability;
- objective proposal representation and lifecycle;
- structural validation and source-grounding evaluation;
- Creator review, change, rejection, and acceptance;
- bounded Relevant Context formation;
- Accepted Learning Objective + bounded Relevant Context + source traceability handoff;
- adaptation of BoundedLearningDesignSlice and lesson integration only where required to consume the accepted upstream handoff;
- reuse of the existing deriveLearningDesign() boundary for downstream Learning Science reasoning.

Subject-Matter Intake stops at the handoff to the existing Learning Science Engine. It must not perform applicability reasoning, select Learning Principles or mechanisms, derive Learning Requirements or Learning Design, or authorize learner execution.

#### AI Realization Boundary

AI-assisted objective analysis is authorized as a capability responsibility. The authorization remains provider-neutral. A specific provider, model, SDK, dependency, route handler, server action, prompt implementation, retry strategy, or cost-control mechanism is not selected by this derivation.

Any credentialed or privileged AI execution must remain server-side. AI output remains an objective proposal and cannot establish Creator acceptance or downstream execution authority.

#### OUTSIDE MINIMUM SLICE

DOCX, OCR, scanned or image-only PDF support, handwriting recognition, generalized ingestion, URL crawling, multiple-document workflows, RAG, embeddings, vector databases, knowledge graphs, persistent workflow state, new schema, migrations, database changes, Supabase storage changes, autonomous course or curriculum generation, payments, certification, analytics infrastructure, and provider-specific AI technology as a product requirement remain outside the minimum slice.

#### Authorization Boundary

This derivation does not authorize product implementation.

The Code Change Gate remains CLOSED.

Before implementation may begin, this authorization must be governance-verified and PROJECT_CONTROL.md must explicitly open a separately bounded Code Change Gate.

### Governance Conclusion

The repository compatibility assessment and minimum implementation responsibility derivation are complete.

The principal new responsibility is the bounded authority-preserving bridge between Creator-provided subject matter and the existing Learning Science Engine.

The Code Change Gate remains CLOSED.

No product implementation is authorized by this derivation record.

Before a new bounded Code Change Gate may be opened:

1. the bounded implementation authorization must be explicitly derived from this verified responsibility and Acceptance Contract;
2. any selected AI-provider realization must preserve the verified provider-neutral server-side boundary and must not expand the slice;
3. `PROJECT_CONTROL.md` must explicitly open and bound a new Code Change Gate before any product implementation begins.

---

## Post-PDF Vertical Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The next bounded browser-testable responsibility is derived downstream of the completed text-based PDF extraction slice and the verified Subject-Matter Intake architecture.

The authorized responsibility is strictly bounded to:

```text
CREATOR / BROWSER
        ↓
ONE TEXT-BASED PDF
        ↓
EXISTING PDF EXTRACTION
        ↓
TRACEABLE SOURCE MATERIAL
        ↓
BOUNDED SERVER-SIDE OBJECTIVE ANALYSIS
        ↓
STRUCTURAL AND SOURCE-GROUNDING VALIDATION
        ↓
EXISTING ObjectiveProposal REPRESENTATION
        ↓
OBJECTIVE PROPOSAL + SUPPORTING SOURCE CONTEXT VISIBLE TO CREATOR
        ↓
STOP
```

The implementation must reuse the existing text-based PDF extraction, `BoundedPlainTextSourceDocument`, `ExtractedSourceMaterial`, `SupportingSourceBoundary`, and `createObjectiveProposal()` responsibilities rather than duplicate them.

The resulting objective output must remain `state: PROPOSED` and must preserve supporting source traceability for Creator review.

This bounded vertical stops before Creator change, Creator rejection, Creator acceptance, Relevant Context formation, Accepted Learning Objective handoff, Learning Science derivation, persistence, storage, schema, migrations, database changes, and learner execution.

This derivation does not itself authorize product implementation. A separately governance-verified technical realization and explicit Code Change Gate decision are required before implementation begins.

---

## Post-PDF Technical Realization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization for the governance-verified Post-PDF browser-testable objective-proposal vertical is:

```text
CREATOR / BROWSER
        ↓
DEDICATED SERVER ACTION
        ↓
EXISTING PDF EXTRACTION
        ↓
ExtractedSourceMaterial
        ↓
TYPED PROVIDER-NEUTRAL OBJECTIVE-ANALYSIS DOMAIN CONTRACT
        ↓
ONE CONCRETE SERVER-SIDE OPENAI ADAPTER
        ↓
OPENAI RESPONSES API VIA EXISTING SERVER RUNTIME FETCH
        ↓
STRUCTURAL + SOURCE-GROUNDING VALIDATION
        ↓
createObjectiveProposal()
        ↓
PROPOSED OBJECTIVE + SUPPORTING SOURCE CONTEXT
        ↓
CREATOR VISIBLE
        ↓
STOP
```

The Creator initiates the bounded analysis through one dedicated Server Action. Existing text-based PDF extraction and `ExtractedSourceMaterial` must be reused.

Objective analysis must be represented behind a typed provider-neutral domain contract. One concrete server-side OpenAI adapter is selected as the minimum provider realization.

`OPENAI_API_KEY` is server-side only and must use the existing `process.env` / `.env.local` runtime convention. Missing credentials must fail explicitly.

The adapter uses the OpenAI Responses API through the existing server runtime `fetch`; no OpenAI or other AI SDK dependency is introduced.

The initial model realization is `gpt-5.6`. The model identifier remains a server-side provider-adapter configuration detail and must not leak into the provider-neutral domain contract.

OpenAI-specific HTTP request and response mapping must remain behind the provider-neutral objective-analysis contract.

Provider failure, structurally invalid output, and insufficient source grounding must each fail explicitly. Only structurally valid and sufficiently source-grounded proposal content may pass through the existing `createObjectiveProposal()` boundary.

The resulting `ObjectiveProposal` must remain `state: PROPOSED` and preserve supporting source traceability for Creator review.

This realization does not authorize agents, tools, streaming, RAG, embeddings, vector databases, generalized AI abstraction, generalized ingestion, persistence, storage, schema, migrations, database changes, Creator change/rejection/acceptance, Relevant Context formation, Accepted Learning Objective handoff, Learning Science derivation, or learner execution.

This derivation does not itself authorize product implementation. An explicit bounded Code Change Gate decision remains required before implementation begins.

---

## Browser Runtime Route-Compatibility Prerequisite

**Status: DERIVED — GOVERNANCE VERIFIED — BOUNDED PREREQUISITE AUTHORIZED**

Runtime verification of the Post-PDF browser-testable objective-proposal vertical is currently blocked by a pre-existing Next.js dynamic-route naming conflict:

```text
app/pensum/[slug]
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]
```

Both `next dev` and `next start` fail with:

```text
You cannot use different slug names for the same dynamic path ('courseSlug' !== 'slug').
```

Repository inspection verifies that `courseSlug` is referenced only within the lesson route itself.

The smallest authorized prerequisite is therefore strictly limited to:

```text
app/pensum/[courseSlug]/[chapterSlug]/[lessonSlug]
        ↓
app/pensum/[slug]/[chapterSlug]/[lessonSlug]
```

and the corresponding local route parameter rename from `courseSlug` to `slug`.

This prerequisite must not change URL structure, product behavior, repository queries, persistence, schema, database state, Learning Science responsibilities, Subject-Matter Intake responsibilities, or any other Pensum behavior.

Its sole purpose is to restore Next.js runtime compatibility so the already-authorized Post-PDF browser vertical can be tested.

The implementation must stop after runtime compatibility is restored and verified.

### PDF.js Server Runtime Compatibility Prerequisite

**Status: DERIVED — GOVERNANCE VERIFIED — BOUNDED PREREQUISITE AUTHORIZED**

Browser verification has established that the exact Creator-selected text-based PDF succeeds through the existing PDF extractor and Server Action chain outside Next.js runtime, but fails during PDF extraction when the same Server Action executes through Next.js.

The bounded prerequisite is authorized only to restore equivalent server-side PDF extraction behavior inside Next.js runtime. The smallest candidate realization may assess and, only if required by verification, configure `pdfjs-dist` as a Next.js server-external package.

This prerequisite must not change PDF extraction semantics, supported document types, source-material representation, objective-analysis behavior, Creator authority, persistence, schema, database state, Learning Science responsibilities, or any other product behavior.

Any configuration change must be verified against the exact browser-test PDF and must stop once equivalent Next.js server-runtime PDF extraction is restored.

#### Runtime Verification Result

**VERIFIED — BROWSER RUNTIME PASS**

- Next.js starts successfully without the previous dynamic-route naming conflict.
- `pdfjs-dist` configured through `serverExternalPackages` restores PDF extraction inside Next.js server runtime.
- The exact Creator-selected text-based PDF successfully reaches the existing PDF extraction boundary in browser runtime.
- OpenAI Responses API connectivity was independently verified with HTTP 200 using server-side credentials.
- `/creator-objective` successfully completed the bounded browser flow from PDF upload through objective analysis.
- The resulting `ObjectiveProposal` remained `state: PROPOSED`.
- Supporting source context and source offsets were visible to the Creator.
- Verification stopped before Creator change, rejection, acceptance, Relevant Context formation, Learning Science handoff, persistence, or learner execution.

---

## Creator Objective Authority Lifecycle Responsibility Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The next bounded Subject-Matter Intake responsibility is derived downstream of the completed and remotely verified Post-PDF Objective-Proposal Vertical and the verified Subject-Matter Intake architecture.

The responsibility begins from one existing traceable `ObjectiveProposal` and is strictly bounded to Creator authority over that objective.

The required lifecycle is:

```text
EXISTING TRACEABLE PROPOSED OBJECTIVE
        ↓
CREATOR REVIEW
        ↓
CHANGE / REJECT / APPROVE

CHANGE
        ↓
CREATOR-CONTROLLED CANDIDATE
        ↓
SOURCE-GROUNDING REASSESSMENT
        ↓
REVIEWABLE CANDIDATE
        ↓
REVIEW / REJECT / APPROVE

REJECT
        ↓
REJECTED
        ↓
STOP

APPROVE
        ↓
ACCEPTED LEARNING OBJECTIVE
        ↓
STOP
```

### Repository Compatibility Classification

**REUSE**

```text
ObjectiveProposal
SupportingSourceBoundary
ExtractedSourceMaterial
existing source traceability
existing Post-PDF objective-analysis vertical
existing Creator-visible proposal + supporting source context
```

The existing `ObjectiveProposal` remains the entry representation for this responsibility. Existing source-material extraction, source boundaries, objective analysis, proposal creation, and Creator-visible source context must be reused rather than duplicated.

**ADAPT LATER — OUTSIDE THIS SLICE**

```text
BoundedLearningDesignSlice
direct downstream objective editing
direct downstream Relevant Context editing
deriveLearningDesign() integration
```

`BoundedLearningDesignSlice` currently owns editable local state for both the Learning Objective and Relevant Context and calls `deriveLearningDesign()` directly.

That downstream responsibility must later be adapted to consume an already accepted upstream objective, but that adaptation is explicitly outside the Creator Objective Authority Lifecycle responsibility.

**MISSING**

```text
Creator-controlled candidate representation
source-grounding reassessment after material Creator change
reviewable candidate lifecycle
rejected objective state
AcceptedLearningObjective representation
explicit Creator change transition
explicit Creator rejection transition
explicit Creator approval transition
```

Repository inspection verifies that `ObjectiveProposal` currently supports only `state: "PROPOSED"`.

Repository verification now confirms that `AcceptedLearningObjective` exists in the bounded Creator Objective Authority Lifecycle implementation.

The existing `validateObjectiveAnalysisCandidate()` validates statement presence and structural source offsets. Structural offset validity alone does not establish that a materially Creator-modified objective remains meaningfully supported by the prior source boundary.

### Bounded Responsibility

This responsibility begins at:

```text
EXISTING TRACEABLE PROPOSED OBJECTIVE
```

and stops at:

```text
ACCEPTED LEARNING OBJECTIVE
```

Creator change must not silently retain a stale source-grounding claim.

A material Creator change must therefore invalidate the prior grounding claim until source grounding has been reassessed.

Creator rejection must prevent the rejected objective from acquiring downstream authority.

Only explicit Creator approval may establish an Accepted Learning Objective.

The following responsibilities remain outside this bounded responsibility:

```text
Relevant Context formation
accepted-objective handoff
BoundedLearningDesignSlice adaptation
deriveLearningDesign()
Learning Science applicability reasoning
Learning Principle selection
Learning Requirements
mechanism selection
Learning Design derivation
persistence
schema
migrations
database changes
learner execution
```

The Code Change Gate remains CLOSED.

This derivation does not authorize product implementation.

---

## Creator Objective Authority Lifecycle Technical Realization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization that preserves the verified Creator authority lifecycle is:

```text
EXISTING ObjectiveProposal
        ↓
CREATOR REVIEW STATE
        ↓
CHANGE / REJECT / APPROVE

CHANGE
        ↓
CREATOR-CONTROLLED CANDIDATE
        ↓
INVALIDATE PRIOR GROUNDING CLAIM
        ↓
SOURCE-GROUNDING REASSESSMENT
        ↓
REVIEWABLE CANDIDATE
        ↓
REVIEW / REJECT / APPROVE

REJECT
        ↓
REJECTED
        ↓
STOP

APPROVE
        ↓
AcceptedLearningObjective
        ↓
STOP
```

### Technical Rules

The realization must preserve all of the following rules:

1. The existing traceable `ObjectiveProposal` is the lifecycle entrypoint.
2. Creator change produces a Creator-controlled candidate rather than silently rewriting the existing proposal authority state.
3. A material Creator change invalidates the prior grounding claim before reassessment.
4. Structural source-offset validity alone is insufficient to satisfy source-grounding reassessment.
5. A changed candidate may become reviewable only after its source grounding has been reassessed.
6. Rejection establishes a rejected objective state that cannot become downstream subject-matter authority.
7. Only explicit Creator approval may establish `AcceptedLearningObjective`.
8. `AcceptedLearningObjective` must be distinct from merely proposed, changed, reviewable, or rejected objective state.
9. Existing source material, source boundaries, proposal traceability, and Post-PDF objective-analysis responsibilities must be reused.
10. This realization must stop when an Accepted Learning Objective has been established.

### Explicit Technical Non-Requirements

This technical realization does not include:

```text
Relevant Context formation
accepted-objective handoff
BoundedLearningDesignSlice adaptation
deriveLearningDesign()
Learning Science applicability reasoning
Learning Principle selection
Learning Requirements
mechanism selection
Learning Design derivation
persistence
schema
migrations
database changes
Supabase changes
learner execution
```

No implementation technology, persistence model, schema, database representation, or downstream Learning Science integration is selected by this derivation.

The Code Change Gate remains CLOSED.

This technical realization does not authorize product implementation.

A new bounded Code Change Gate may be considered only after both this responsibility derivation and this technical realization have been directly verified in repository authority and governance-verified.
## Bounded Relevant Context Formation Responsibility Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The next bounded Subject-Matter Intake responsibility begins from one existing `AcceptedLearningObjective` and is limited to forming the explicit bounded Relevant Context required before the existing Learning Science Engine boundary.

The responsibility stops with `AcceptedLearningObjective + bounded Relevant Context + existing source traceability`. It does not enter Learning Science applicability reasoning or Learning Design derivation.

This derivation does not authorize product implementation. The Code Change Gate remains CLOSED.

### Minimum Technical Realization

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization is a persistence-independent Subject-Matter Intake domain representation that combines one existing `AcceptedLearningObjective` with an explicit bounded context description and an explicit `durableRetentionOfPreviouslyAcquiredKnowledgeIntended` premise.

This representation may prepare those premises for the existing downstream `RelevantContext` contract, but it must not perform applicability reasoning, select Active Retrieval, derive Learning Requirements, call `deriveLearningDesign()`, or adapt learner execution.

The existing `AcceptedLearningObjective`, `SupportingSourceBoundary`, source traceability, Learning Science `RelevantContext` contract, and `deriveLearningDesign()` boundary must be reused rather than duplicated.

No persistence, schema, migration, database, Supabase, route, UI, `BoundedLearningDesignSlice`, or lesson integration change is selected by this derivation.

This derivation does not authorize product implementation. The Code Change Gate remains CLOSED.

---

## Accepted Subject-Matter Handoff to Learning Science Engine Responsibility Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The bounded responsibility begins from one existing `AcceptedLearningObjective` combined with one existing `BoundedRelevantContext`, with existing source traceability preserved, and stops after those accepted upstream premises have entered the existing `deriveLearningDesign()` boundary as a `ProposedLearningDesign`.

The existing `deriveLearningDesign()`, Learning Design lifecycle, and approved-design execution gate are REUSE responsibilities and must not be reimplemented by this handoff responsibility.

`BoundedLearningDesignSlice` and lesson integration are ADAPT responsibilities only where required to consume the already accepted upstream handoff instead of independently sourcing or editing Learning Objective and Relevant Context premises.

This responsibility does not include new applicability reasoning, new Learning Requirements, new mechanism-selection logic, Learning Design lifecycle changes, execution-gate changes, persistence, schema, migrations, database or Supabase changes, generalized handoff infrastructure, learner profiles, or new learner-execution behavior.

This derivation does not authorize product implementation. The Code Change Gate remains CLOSED until this responsibility is governance-verified and a separately bounded technical realization and implementation authorization are explicitly established.

### Accepted Subject-Matter Handoff Technical Realization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization is one bounded handoff adapter that accepts the existing `AcceptedObjectiveWithRelevantContext`, maps `acceptedLearningObjective.statement` to the existing Learning Science `LearningObjective`, maps the existing bounded `relevantContext` to the existing Learning Science `RelevantContext`, invokes the existing `deriveLearningDesign()`, and returns the resulting `ProposedLearningDesign`.

The existing `supportingSourceBoundary` must remain associated with the accepted upstream handoff for subject-matter authority traceability, but it must not be converted into a Learning Science premise or used to alter applicability reasoning. This technical realization stops when the existing `deriveLearningDesign()` has produced a `ProposedLearningDesign`.

This technical realization does not require changes to `deriveLearningDesign()`, Learning Science applicability logic, Learning Requirements, mechanism selection, Learning Design lifecycle, approved-design execution gating, persistence, schema, migrations, database or Supabase state, generalized handoff infrastructure, or new learner-execution behavior.

This technical realization does not authorize product implementation. The Code Change Gate remains CLOSED until this technical realization is governance-verified and a separately bounded implementation authorization is explicitly established.

### Accepted Subject-Matter Handoff Minimum Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The minimum implementation authorization is limited to one bounded Subject-Matter Intake handoff adapter that accepts the existing `AcceptedObjectiveWithRelevantContext`, preserves its accepted objective authority and source traceability, maps only the required objective and context premises into the existing Learning Science input contracts, invokes the existing `deriveLearningDesign()`, and returns the resulting `ProposedLearningDesign`.

This implementation authorization does not include changes to `deriveLearningDesign()`, Learning Science applicability reasoning, Learning Requirements, mechanism selection, Learning Design lifecycle, execution gating, persistence, schema, migrations, database or Supabase state, generalized handoff infrastructure, learner profiles, or new learner-execution behavior.

This implementation authorization derivation does not itself authorize product implementation. The Code Change Gate remains CLOSED until this authorization is governance-verified and an explicit bounded Code Change Gate decision opens implementation for this responsibility.

## Creator Subject-Matter → Learning Design Runtime Integration Responsibility Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The bounded responsibility begins from one existing Creator-visible traceable `ObjectiveProposal` produced by the verified Post-PDF runtime and connects the already implemented Subject-Matter authority lifecycle to one Creator-visible `ProposedLearningDesign`.

The required authority flow is:

```text
EXISTING TRACEABLE ObjectiveProposal
        ↓
CREATOR REVIEW
        ↓
EXISTING CHANGE / REJECT / APPROVE LIFECYCLE
        ↓
AcceptedLearningObjective
        ↓
EXISTING BOUNDED RELEVANT CONTEXT FORMATION
        ↓
AcceptedObjectiveWithRelevantContext
        ↓
EXISTING handoffToLearningScience()
        ↓
EXISTING deriveLearningDesign()
        ↓
ProposedLearningDesign
        ↓
CREATOR-VISIBLE LEARNING DESIGN REVIEW
        ↓
STOP
```

This responsibility stops when one `ProposedLearningDesign` derived from accepted upstream Subject-Matter premises is visible to the Creator for Learning Design review.

It does not authorize Learning Design approval or rejection changes, learner execution changes, persistence, schema, migrations, database or Supabase changes, generalized workflow infrastructure, or new Learning Science reasoning.

The Code Change Gate remains CLOSED.

### Implementation Acceptance Contract

A future bounded implementation may be accepted only if all of the following are demonstrated:

1. One existing Creator-visible traceable `ObjectiveProposal` can enter the runtime authority lifecycle without duplicating proposal creation or source traceability.
2. Creator change uses the existing objective lifecycle and invalidates the prior source-grounding claim before a changed candidate may become reviewable.
3. A rejected objective cannot establish downstream Subject-Matter authority.
4. Only explicit Creator approval may establish `AcceptedLearningObjective`.
5. Bounded Relevant Context is formed only from an existing `AcceptedLearningObjective` through the existing `formBoundedRelevantContext()` responsibility.
6. The resulting `AcceptedObjectiveWithRelevantContext` preserves the accepted objective and existing source traceability.
7. Only `AcceptedObjectiveWithRelevantContext` may enter the existing `handoffToLearningScience()` boundary in this runtime path.
8. The runtime must use the existing `handoffToLearningScience()` and existing `deriveLearningDesign()` responsibilities rather than independently deriving Learning Design from locally editable objective or context premises.
9. The resulting `ProposedLearningDesign` must be visible to the Creator for Learning Design review.
10. Merely proposed, changed, reviewable, or rejected objective states must be structurally prevented from becoming authoritative Learning Science input.
11. Legacy `lesson.learning_objectives[0]`, `lesson.content`, or locally editable premises inside `BoundedLearningDesignSlice` must not establish authority for this new runtime chain.
12. The implementation must stop before changing Learning Design approval/rejection behavior or learner execution behavior.
13. Learning Science applicability reasoning, certified principle references, Learning Requirements, mechanism proposal, and Learning Design lifecycle must remain owned by the existing Learning Science Engine implementation.
14. No persistence, schema, migration, database, Supabase, generalized workflow infrastructure, or new learner-execution behavior is required by this responsibility.

The Code Change Gate remains CLOSED.

### Minimum Technical Realization

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization is one bounded Creator runtime orchestration that extends the existing `/creator-objective` browser flow from its current Creator-visible traceable `ObjectiveProposal` through the already implemented Subject-Matter authority lifecycle, bounded Relevant Context formation, and accepted handoff into one existing `ProposedLearningDesign` visible for Creator review.

The realization must:

1. reuse the existing `ObjectiveProposal` lifecycle functions for Creator change, grounding invalidation/reassessment, rejection, and explicit approval;
2. reuse the existing `AcceptedLearningObjective` representation;
3. reuse `formBoundedRelevantContext()` to establish `AcceptedObjectiveWithRelevantContext` only after objective acceptance;
4. reuse `handoffToLearningScience()` as the only accepted Subject-Matter-to-Learning-Science adapter in this bounded runtime path;
5. reuse the existing `deriveLearningDesign()` implementation transitively through that handoff rather than calling it from locally editable objective/context state;
6. expose the resulting `ProposedLearningDesign` for Creator Learning Design review;
7. adapt `BoundedLearningDesignSlice` only as required to consume an already-derived `ProposedLearningDesign` or equivalent accepted upstream handoff result, without independently owning Learning Objective or Relevant Context authority;
8. adapt lesson integration only where required to prevent legacy lesson objective/content from establishing authority for this new MVP runtime path.

This realization must not reimplement Subject-Matter lifecycle logic, Relevant Context formation, Learning Science applicability reasoning, Learning Requirements, mechanism selection, Learning Design lifecycle, approved-design execution gating, or learner interaction.

No persistence, schema, migration, database, Supabase, generalized application-service layer, generalized state-management infrastructure, or new dependency is selected or required by this derivation.

The Code Change Gate remains CLOSED.

### Minimum Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The minimum bounded implementation authorization is limited to connecting the existing `/creator-objective` runtime from one existing Creator-visible traceable `ObjectiveProposal` through the already implemented Subject-Matter authority lifecycle, bounded Relevant Context formation, accepted handoff, and existing Learning Science derivation until one resulting `ProposedLearningDesign` is visible to the Creator for Learning Design review.

#### AUTHORIZED

- adapt the existing `/creator-objective` runtime to expose and execute the existing Creator objective change, grounding reassessment, rejection, and approval lifecycle;
- reuse the existing `AcceptedLearningObjective` representation;
- collect the minimum explicit bounded Relevant Context required by the existing `formBoundedRelevantContext()` responsibility;
- reuse `formBoundedRelevantContext()` to create `AcceptedObjectiveWithRelevantContext` only after explicit objective acceptance;
- reuse `handoffToLearningScience()` to enter the existing Learning Science Engine;
- reuse the existing `deriveLearningDesign()` implementation through that handoff;
- present the resulting existing `ProposedLearningDesign` to the Creator for review;
- adapt `BoundedLearningDesignSlice` only where necessary to stop it from independently owning Learning Objective and Relevant Context authority in this runtime path;
- adapt lesson integration only where necessary to prevent legacy `lesson.learning_objectives[0]` and `lesson.content` from establishing authority for this new MVP runtime chain.

#### REQUIRED STOP BOUNDARY

The implementation must stop when one `ProposedLearningDesign` derived from an accepted upstream Subject-Matter handoff is visible to the Creator for Learning Design review.

It must not extend or change Learning Design approval/rejection behavior, Approved Learning Design execution gating, learner interaction, learner performance handling, or feedback/result behavior.

#### EXPLICITLY UNAUTHORIZED

Persistence, schema, migrations, database changes, Supabase changes, new storage, generalized workflow infrastructure, generalized state management, generalized Creator authoring, new Learning Science applicability logic, new Learning Requirements logic, new mechanism-selection logic, changes to certified Learning Principles, learner profiles, new learner-execution behavior, or new dependencies are outside this authorization.

This derivation does not itself authorize product implementation.

The Code Change Gate remains CLOSED until this authorization is governance-verified and a separate explicit bounded Code Change Gate decision opens implementation.

---

## Source-Grounding Reassessment Prerequisite Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The prerequisite begins from one existing `CreatorControlledObjectiveCandidate` whose prior source-grounding claim has already been invalidated by `changeObjectiveProposal()` and from the existing source material identified by its preserved `SupportingSourceBoundary`.

The prerequisite responsibility is strictly limited to establishing whether the Creator-modified objective remains meaningfully supported by that existing source material.

### Repository Compatibility Classification

**REUSE**

- `CreatorControlledObjectiveCandidate`
- `SupportingSourceBoundary`
- existing extracted source material and source traceability
- existing `SourceGroundingReassessment` token
- existing `makeObjectiveCandidateReviewable()` lifecycle boundary
- existing server-side provider execution and explicit failure pattern

**ADAPT**

- the existing provider-neutral objective-analysis contract pattern
- the existing server-side OpenAI Responses API adapter pattern
- the existing provider failure and structurally-invalid-output test pattern

The objective-analysis responsibility itself must not be reused as reassessment because it performs `source material → ObjectiveAnalysisCandidate`, not `CreatorControlledObjectiveCandidate + source material → grounding reassessment`.

**MISSING**

- a provider-neutral source-grounding reassessment contract
- a concrete server-side reassessment implementation for one Creator-modified objective
- semantic evaluation of the modified statement against its existing supporting source material
- validation that only a positive grounding result may establish `SourceGroundingReassessment`

### Bounded Responsibility

The responsibility begins at:

```text
CreatorControlledObjectiveCandidate
        +
existing supporting source material
```

and stops at either:

```text
SourceGroundingReassessment
```

or an explicit failure / not-grounded result with no reassessment token produced.

A failed, invalid, unavailable, or negative reassessment must not allow the candidate to become reviewable.

The prerequisite must not approve the objective, reject the objective, form Relevant Context, perform the accepted handoff, call `deriveLearningDesign()`, perform Learning Science reasoning, authorize learner execution, or introduce persistence.

### Implementation Acceptance Contract

A future bounded implementation may be accepted only if all of the following are demonstrated:

1. The reassessment accepts one existing `CreatorControlledObjectiveCandidate` whose grounding state is already `INVALIDATED`.
2. The reassessment evaluates that candidate against the existing source material associated with its preserved `SupportingSourceBoundary`.
3. Structural source-offset validity alone cannot establish successful reassessment.
4. A positive semantic grounding evaluation is required before `SourceGroundingReassessment` may be produced.
5. A negative grounding evaluation produces no `SourceGroundingReassessment`.
6. Provider failure, missing credentials, invalid provider output, or malformed reassessment output fail explicitly and produce no reassessment token.
7. Runtime code must not fabricate `{ sourceGroundingReassessed: true }` without passing through the real reassessment responsibility.
8. Successful reassessment may feed the existing `makeObjectiveCandidateReviewable()` lifecycle boundary without changing that lifecycle responsibility.
9. The prerequisite must preserve existing Creator authority and must not establish objective acceptance.
10. No persistence, schema, migration, database, Supabase, Learning Science, learner-execution, or generalized AI infrastructure change is required.

### Minimum Technical Realization

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization is one typed provider-neutral source-grounding reassessment contract plus one bounded server-side OpenAI adapter following the existing objective-analysis provider pattern.

The contract must accept the existing Creator-controlled candidate together with the source material required to evaluate its preserved supporting boundary and must return a result from which `SourceGroundingReassessment` can be established only after successful semantic grounding evaluation.

The concrete adapter may reuse the existing server runtime `fetch`, `OPENAI_API_KEY` convention, OpenAI Responses API pattern, and explicit provider-failure behavior. No new SDK or dependency is required by this realization.

OpenAI-specific request, response, prompt, and model details must remain behind the provider-neutral reassessment contract.

The realization stops after successful production of `SourceGroundingReassessment` or explicit reassessment failure. It must not call `makeObjectiveCandidateReviewable()` as part of the provider responsibility, approve or reject objectives, form Relevant Context, enter the Learning Science Engine, or change downstream runtime behavior.

### Minimum Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The minimum bounded implementation authorization is limited to implementing one real Source-Grounding Reassessment prerequisite for an existing `CreatorControlledObjectiveCandidate` whose prior grounding claim is already `INVALIDATED`.

#### AUTHORIZED

- add one typed provider-neutral source-grounding reassessment contract;
- add one bounded server-side OpenAI adapter following the existing objective-analysis provider pattern;
- evaluate the Creator-modified objective statement against the existing supporting source material identified by its preserved `SupportingSourceBoundary`;
- validate provider output so that only a positive semantic grounding result may establish `SourceGroundingReassessment`;
- fail explicitly on missing credentials, provider failure, invalid output, malformed reassessment result, or negative grounding;
- reuse the existing `SourceGroundingReassessment` token only as the successful output capability passed to the existing lifecycle;
- add bounded automated tests proving positive, negative, invalid-output, missing-credential, and provider-failure behavior.

#### REQUIRED STOP BOUNDARY

Implementation must stop after either a valid `SourceGroundingReassessment` has been produced from a real positive grounding evaluation or reassessment has explicitly failed without producing that token.

The provider responsibility must not call `makeObjectiveCandidateReviewable()`, approve or reject an objective, form Relevant Context, perform the accepted handoff, call `deriveLearningDesign()`, or alter downstream runtime integration.

#### EXPLICITLY UNAUTHORIZED

Fabricating `{ sourceGroundingReassessed: true }`, changing the existing objective lifecycle semantics, Creator runtime integration, Learning Design integration, persistence, schema, migrations, database or Supabase changes, new SDKs or dependencies, generalized AI infrastructure, RAG, embeddings, vector databases, Learning Science changes, or learner execution are outside this authorization.

This authorization derivation does not itself authorize product implementation. The Creator Subject-Matter → Learning Design Runtime Integration Code Change Gate remains CLOSED. A separate bounded Source-Grounding Reassessment prerequisite Code Change Gate may be considered only after this authorization is governance-verified.

---

## Creator Learning Design Approval → Approved Retrieval Attempt → Source-Grounded Feedback Responsibility Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The next smallest externally testable MVP responsibility begins from the existing Creator-visible `ProposedLearningDesign` produced by the completed `/creator-objective` flow and stops after one active Learner response produces visible source-grounded feedback or result information.

The exact bounded flow is:

```text
EXISTING CREATOR-VISIBLE ProposedLearningDesign
        ↓
CREATOR APPROVE / REJECT
        ↓
ApprovedLearningDesign ONLY
        ↓
EXISTING EXECUTION AUTHORITY CHECK
        ↓
ONE BOUNDED ACTIVE RETRIEVAL ATTEMPT
        ↓
SOURCE-GROUNDED FEEDBACK / RESULT
        ↓
STOP
```

A rejected, merely proposed, or invalidated Learning Design must not authorize Learner execution. The bounded retrieval experience must remain downstream of the accepted Learning Objective, bounded Relevant Context, existing Learning Science derivation, and explicit Creator approval.

### Repository Compatibility Classification

**REUSE**

- the existing `ProposedLearningDesign`, `ApprovedLearningDesign`, and Learning Design state representations;
- `approveLearningDesign()` and `rejectLearningDesign()`;
- `requireApprovedLearningDesign()` as the execution-authority boundary;
- the already derived Learning Objective, Relevant Context, applicable principles, rationale, Learning Requirements, proposed mechanism, performance requirement, feedback/result requirement, and Creator-controlled decisions;
- existing accepted-objective source traceability and supporting source context;
- the existing interaction rule that a Learner response must precede reveal.

**ADAPT**

- the existing `/creator-objective` presentation to expose explicit Creator Learning Design approval and rejection after the current proposal review;
- the existing approved-retrieval presentation pattern only as required to consume the authoritative `ApprovedLearningDesign` produced by this runtime chain;
- the existing bounded response-before-reveal and feedback presentation behavior where it can remain tied to the accepted objective and supporting source context.

`BoundedLearningDesignSlice` may be used only as an implementation reference. It must not independently edit or derive Learning Objective or Relevant Context authority for this runtime path, and legacy lesson objective, lesson content, or quiz data must not silently become authoritative inputs.

**NEW**

- one minimum in-session Creator-to-Learner handoff from the approved design;
- one bounded retrieval presentation tied to the accepted objective and existing supporting source context;
- focused automated verification of approval, rejection, execution guarding, response-before-reveal, and feedback/result behavior.

### Minimum Technical Realization

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The smallest technical realization adapts the existing `/creator-objective` client runtime to apply the existing Learning Design approval or rejection lifecycle to its current `ProposedLearningDesign`. Only the resulting `ApprovedLearningDesign` may be passed through `requireApprovedLearningDesign()` into one bounded retrieval interaction.

The interaction requires one active Learner response before revealing bounded feedback grounded in the existing accepted objective and supporting source context. Runtime state may remain in memory for the single browser session.

The minimum implementation surface is limited to:

```text
app/creator-objective/page.tsx
one small approved Creator-flow retrieval presentation under components/
one focused automated test responsibility for the bounded runtime boundary
```

Existing Learning Science lifecycle, execution guard, derivation, Subject-Matter Intake, and source-grounding domain responsibilities must be reused without modification unless a separately verified repository constraint proves an adaptation necessary.

### Minimum Acceptance Contract

A future bounded implementation may be accepted only if all of the following are demonstrated:

1. The existing Creator-visible `ProposedLearningDesign` can be explicitly approved or rejected.
2. Approval uses the existing `approveLearningDesign()` responsibility and produces `ApprovedLearningDesign`.
3. Rejection uses the existing `rejectLearningDesign()` responsibility and exposes no Learner activity.
4. A proposed, rejected, or invalidated Learning Design is structurally prevented from entering Learner execution.
5. Learner execution passes through the existing `requireApprovedLearningDesign()` authority boundary.
6. The Learner activity realizes the approved `bounded-retrieval` mechanism and remains traceable to the accepted Learning Objective and existing Learning Science derivation.
7. The Learner must submit one active response before source-grounded feedback or answer information is revealed.
8. The attempt produces visible feedback or result information tied to the bounded activity.
9. Existing supporting source context remains the authority for revealed subject-matter feedback; the runtime must not invent new subject-matter truth.
10. Legacy lesson objectives, lesson content, quiz data, or locally editable premises must not establish authority for this new runtime chain.
11. The implementation stops after one bounded attempt and its visible feedback/result.

### Explicit Exclusions

This responsibility does not include Learning Design editing or re-derivation, generalized Creator publishing, generalized learner routing, multiple activities, generated question banks, generalized assessment, learner profiles, authentication or role-system expansion, analytics, certification, new Learning Science reasoning, changes to certified Learning Principles, or generalized workflow/state infrastructure.

No persistence, schema, migrations, database, Supabase, storage, learner-progress, mastery, scoring, adaptive scheduling, spaced-repetition scheduling, or longitudinal learner-state changes are required or authorized.

### Minimum Implementation Authorization Derivation

**Status: DERIVED — GOVERNANCE VERIFIED — CODE CHANGE GATE CLOSED**

The minimum bounded implementation authorization is limited to connecting the existing Creator-visible `ProposedLearningDesign` to the existing Learning Design approval/rejection lifecycle and, only after approval and execution-authority validation, exposing one in-session bounded retrieval attempt followed by source-grounded feedback/result.

The explicit bounded Code Change Gate below authorizes only this minimum implementation responsibility. The derivation does not authorize any behavior outside that gate.

---

## Code Change Gate

**Bounded product implementation: CLOSED — CREATOR LEARNING DESIGN APPROVAL → APPROVED RETRIEVAL ATTEMPT → SOURCE-GROUNDED FEEDBACK**

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED**

**Runtime verification result:** PASS. Creator approval produced the approval-guarded bounded retrieval experience; the Learner submitted one active response before reveal; visible feedback compared that response with the approved source context. Creator rejection exposed no Learner activity.

**Authorized scope:** Implement only the already-derived minimum Creator Learning Design Approval → Approved Retrieval Attempt → Source-Grounded Feedback responsibility and its recorded Minimum Acceptance Contract.

**Minimum implementation boundary:** Adapt the existing `/creator-objective` runtime to apply the existing Learning Design approval/rejection lifecycle to its current `ProposedLearningDesign`; permit only `ApprovedLearningDesign` validated through `requireApprovedLearningDesign()` to expose one in-session bounded retrieval attempt; require one active Learner response before revealing source-grounded feedback/result; stop immediately after that single visible feedback/result.

**Required reuse boundary:** Reuse the existing Learning Design states and types, `approveLearningDesign()`, `rejectLearningDesign()`, `requireApprovedLearningDesign()`, existing Learning Science derivation, accepted objective, bounded Relevant Context, and source traceability. Do not reimplement or broaden those responsibilities.

**Required acceptance verification:** Before implementation acceptance, `./scripts/dev verify` must pass, and the complete user-visible runtime path must be verified from the existing Creator-visible `ProposedLearningDesign` through explicit approval, guarded retrieval execution, active response before reveal, and visible source-grounded feedback/result. Rejection and non-approved states must also be verified to prevent execution.

**Explicitly unauthorized:** Every exclusion recorded in the derived responsibility remains binding. Learning Design editing or re-derivation, generalized Creator publishing, generalized learner routing, multiple activities, generated question banks, generalized assessment, learner profiles, authentication or role-system expansion, analytics, certification, new Learning Science reasoning, changes to certified Learning Principles, generalized workflow/state infrastructure, new dependencies, and product behavior beyond the single bounded path are unauthorized.

Persistence, schema, migrations, database, Supabase, storage, learner-progress, mastery, scoring, adaptive scheduling, spaced-repetition scheduling, and longitudinal learner-state changes are prohibited by this gate.

The bounded authorization has been consumed and is closed. No further product implementation is authorized by this completed gate.

### Previous Closed Gate

**Bounded product implementation: CLOSED — CREATOR SUBJECT-MATTER → LEARNING DESIGN RUNTIME INTEGRATION**

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED — COMMITTED — PUSHED — REMOTELY VERIFIED**

**Verified implementation checkpoint:** `3de5db4d9b943a74e2908e4e94a15fe95f1673e3` — `Connect accepted objective to learning design runtime`

The bounded authorization has been consumed and is closed. No further product implementation is authorized by this completed gate.

### Source-Grounding Reassessment Prerequisite Code Change Gate

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED**

**Authorized scope:** Implement only the governance-verified Source-Grounding Reassessment prerequisite defined above.

**Required stop boundary:** Stop after a real positive semantic grounding evaluation produces a valid `SourceGroundingReassessment`, or after explicit reassessment failure produces no token.

**Explicitly unauthorized:** fabrication of `{ sourceGroundingReassessed: true }`, Creator runtime integration, `makeObjectiveCandidateReviewable()` orchestration inside the provider, objective approval/rejection changes, Relevant Context, accepted handoff, Learning Science changes, persistence, schema, database or Supabase changes, new dependencies, or learner execution.

**Bounded responsibility:** Creator Subject-Matter → Learning Design Runtime Integration

**Authorized scope:** Connect the existing `/creator-objective` runtime from one Creator-visible traceable `ObjectiveProposal` through the existing Creator objective authority lifecycle, `AcceptedLearningObjective`, `formBoundedRelevantContext()`, `AcceptedObjectiveWithRelevantContext`, `handoffToLearningScience()`, and existing `deriveLearningDesign()` until one resulting `ProposedLearningDesign` is visible to the Creator for Learning Design review.

**Required boundary:** Reuse all existing Subject-Matter and Learning Science domain responsibilities. Adapt runtime integration, `BoundedLearningDesignSlice`, and lesson integration only where necessary to prevent local or legacy Learning Objective / Relevant Context authority. Stop when the accepted upstream handoff has produced one Creator-visible `ProposedLearningDesign`.

**Explicitly unauthorized:** changes to Learning Design approval/rejection behavior, Approved Learning Design execution gating, learner interaction, learner performance or feedback/result behavior, persistence, schema, migrations, database or Supabase changes, generalized workflow infrastructure, generalized state management, new Learning Science applicability logic, new Learning Requirements logic, new mechanism-selection logic, changes to certified Learning Principles, learner profiles, or new dependencies.

### Previous Closed Gate

**Bounded product implementation: CLOSED — ACCEPTED SUBJECT-MATTER HANDOFF TO LEARNING SCIENCE ENGINE**

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED — COMMITTED — PUSHED — REMOTELY VERIFIED**

**Verified implementation checkpoint:** `9d0381de3c00bc4a77046771171cfa9fe20dfd3f` — `Connect accepted subject matter to Learning Science`

**Bounded responsibility:** Accepted Subject-Matter Handoff to Learning Science Engine

**Authorized scope:** Implement one bounded Subject-Matter Intake handoff adapter that accepts the existing `AcceptedObjectiveWithRelevantContext`, preserves accepted objective authority and existing source traceability, maps `acceptedLearningObjective.statement` to the existing Learning Science `LearningObjective`, maps the existing bounded `relevantContext` to the existing Learning Science `RelevantContext`, invokes the existing `deriveLearningDesign()`, and returns the resulting `ProposedLearningDesign`.

**Required boundary:** Reuse the existing `deriveLearningDesign()` boundary and stop after it returns `ProposedLearningDesign`. Do not reimplement Learning Science applicability reasoning, Learning Requirements, mechanism selection, Learning Design lifecycle, or approved-design execution gating.

**Explicitly unauthorized:** persistence, schema, migrations, database or Supabase changes, generalized handoff infrastructure, learner profiles, new learner-execution behavior, or changes to existing Learning Science reasoning and lifecycle responsibilities.

### Earlier Closed Gate

**Bounded product implementation: CLOSED — BOUNDED RELEVANT CONTEXT FORMATION**

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — VERIFIED — COMMITTED — PUSHED — REMOTELY VERIFIED**

**Bounded responsibility:** Bounded Relevant Context Formation

**Authorized scope:** Implement the smallest persistence-independent Subject-Matter Intake domain realization that combines one existing `AcceptedLearningObjective` with an explicit bounded context description and an explicit `durableRetentionOfPreviouslyAcquiredKnowledgeIntended` premise while preserving existing source traceability.

**Required boundary:** The implementation must stop before Learning Science applicability reasoning and must not select Active Retrieval, derive Learning Requirements, call `deriveLearningDesign()`, adapt `BoundedLearningDesignSlice`, alter lesson integration, or authorize learner execution.

**Explicitly unauthorized:** persistence, schema, migrations, database or Supabase changes, routes, UI, generalized context modelling, learner profiles, learning-style classification, generalized personalization, and generalized accessibility modelling.

### Earlier Closed Gate

**Bounded product implementation: CLOSED — CREATOR OBJECTIVE AUTHORITY LIFECYCLE**

**Status: CLOSED — BOUNDED — GOVERNANCE VERIFIED — IMPLEMENTED — COMMITTED — PUSHED**

**Bounded responsibility:** Creator Objective Authority Lifecycle

**Purpose (bounded):** Implement the governance-verified Creator authority lifecycle over one existing traceable `ObjectiveProposal`.

**Bounded scope:**
- Creator review of one existing traceable `ObjectiveProposal`
- Creator Change producing a Creator-controlled candidate
- invalidation of the prior grounding claim after material Creator change
- source-grounding reassessment before a changed candidate becomes reviewable
- Creator Reject producing a rejected objective state with no downstream authority
- Creator Approve as the only transition that may establish `AcceptedLearningObjective`

**Out of scope:**
- Relevant Context formation
- accepted-objective handoff
- `BoundedLearningDesignSlice` adaptation
- `deriveLearningDesign()`
- Learning Science applicability reasoning
- Learning Principle selection
- Learning Requirements
- mechanism selection
- Learning Design derivation
- persistence
- schema
- migrations
- database changes
- Supabase changes
- learner execution

This Code Change Gate is now CLOSED after implementation and local verification of the governance-verified Creator Objective Authority Lifecycle technical realization.

Any implementation outside this explicit bounded scope remains unauthorized.

The bounded text-based PDF extraction responsibility has been implemented, committed, pushed, and remotely verified at 06e0dfbcca7adc2436033cea51399ddb2e731435.

The completed Code Change Gate applied only to the bounded responsibility governance-verified under **Post-PDF Vertical Implementation Authorization Derivation** and **Post-PDF Technical Realization Derivation**, and is now closed after successful browser-runtime verification.

No persistence, schema, migration, database, generalized ingestion, DOCX, OCR, scanned or image-only PDF support, handwriting recognition, RAG, embeddings, vector database, autonomous course/curriculum generation, or provider capability beyond the governance-verified bounded OpenAI objective-analysis realization is authorized by this gate.

Any implementation outside this explicit boundary requires a separately derived and governance-verified authorization and a new Code Change Gate decision.

---

## Current Task

The bounded **Codex workflow documentation repair** is **CLOSED — VERIFIED — COMMITTED — PUSHED — REMOTELY VERIFIED**.

Verified documentation checkpoint:

```text
5b20c20fcc183d7b3ba79d0bb266a09f138b5189
```

The active bounded governance task is to derive and verify the **next smallest bounded MVP responsibility** from the permanent Product Authority, architecture authority, current verified implementation state, and remaining MVP boundary.

This task is governance derivation and verification only. No product implementation is authorized.

---


## Next Allowed Action

Derive the next smallest bounded MVP responsibility, classify repository compatibility, define its minimum acceptance contract, minimum technical realization, explicit exclusions, and minimum implementation authorization boundary, and governance-verify that derivation against the permanent Product Authority and architecture authority.

No product implementation is authorized without a subsequent explicit open bounded Code Change Gate recorded in `PROJECT_CONTROL.md` after the responsibility, technical realization, and minimum implementation authorization have been governance-verified.

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
