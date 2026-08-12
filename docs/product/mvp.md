# TheraLearn – MVP Scope

## Purpose

This document owns the durable product scope and acceptance boundary for the initial TheraLearn MVP.

It defines what the MVP must enable as a product. It does not own current implementation progress, the next development task, architecture, or the broader Product Vision.

- Product intent belongs in `PRODUCT_VISION.md`.
- The permanent learning structure belongs in `LEARNING_MODEL.md`.
- Technical realization belongs in architecture documentation.
- Current implementation state and Next Allowed Action belong in `PROJECT_CONTROL.md`.

---

## MVP Goal

The initial MVP must provide one coherent core learning loop within structured curriculum context.

The MVP is not defined by the number of pages, components, or features that happen to exist in the repository. It is defined by whether the learner can complete the required product journey across the core learning capabilities.

---

## Required MVP Capabilities

### Structured curriculum / pensum

The learner must be able to enter and navigate structured curriculum content.

The curriculum must provide the context that leads into lesson-level learning rather than expose learning activities as unrelated standalone tools.

### Lesson / content context

The learner must be able to reach a lesson or equivalent lesson-level content context within the structured curriculum.

The lesson is the current central learning-context unit established by the Learning Model.

### Flashcards

The learner must be able to work with flashcards in relation to lesson context.

The MVP does not require spaced repetition, prescribed repetition intervals, or another advanced flashcard algorithm.

### Quiz

The learner must be able to work with quiz questions in relation to lesson context.

The MVP does not require adaptive testing, mastery thresholds, or advanced pedagogical sequencing.

### Basic learner progress / results

The learner must be able to receive or view basic progress or result information tied to the learning context.

The MVP does not require a comprehensive analytics, grading, competence, or mastery system.

### Authentication / user identity

The MVP must provide sufficient authenticated user identity to support learner-related progress.

Authentication is required because the core learning loop includes user-related progress rather than anonymous static content only.

---

## MVP Acceptance Boundary

The initial MVP is product-complete when an authenticated learner can:

1. enter the structured curriculum;
2. navigate into a lesson/content context;
3. work with required learning activities in that context, including flashcards and quiz;
4. receive or view basic result/progress information tied to the learning context;
5. complete this core learning loop without depending on capabilities outside the initial MVP boundary.

All five conditions belong to the same acceptance boundary. The existence of an isolated page, component, table, or route does not by itself satisfy an MVP condition.

---

## Supporting but Non-Defining Surfaces

The following may support the MVP user experience but do not independently define MVP completion:

- dashboard surfaces;
- general navigation beyond what is necessary for the core learning loop;
- informational/about surfaces.

Their implementation quality may still affect usability, but their mere presence or absence does not redefine the durable MVP product boundary.

---

## Product Vision Capabilities Outside the Initial MVP Boundary

The following remain valid parts of the established Product Vision but are not required for the initial MVP acceptance boundary based on current authority:

- reading support;
- multilingual support, initially Danish and English.

They may be implemented after the initial MVP without changing the Product Vision.

---

## Not Established as Initial MVP Requirements

The current MVP authority does not require:

- notes;
- detailed target-user-specific feature sets;
- advanced or adaptive learning;
- spaced repetition;
- mastery learning;
- commercial or pricing capabilities;
- release-plan functionality;
- roadmap functionality.

These items may only enter the MVP boundary through an explicit verified scope decision.

---

## Scope vs. Implementation State

This document defines what the MVP must achieve; it does not claim that the current repository already achieves it.

Existing routes, components, database structures, or product surfaces are implementation evidence only. Each required MVP capability must be verified as part of the end-to-end learning loop before it can be considered implemented for MVP purposes.

Current implementation status, gaps, sequencing, and Next Allowed Action are owned by `PROJECT_CONTROL.md`.

---

## Change Rule

The MVP boundary should change only through an explicit verified product-scope decision.

Implementation convenience, an already-existing feature, or a new idea does not automatically add or remove an MVP requirement.
