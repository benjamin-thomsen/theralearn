# TheraLearn – Product Vision

## Purpose

This document owns the detailed permanent Product Vision for TheraLearn.

It defines what TheraLearn is intended to become, the problem the product exists to solve, the roles it serves, and the permanent product-level boundaries that must guide future product decisions.

It does not own:

* the scientific learning principles themselves;
* detailed technical architecture;
* implementation status;
* the current development task;
* the durable MVP acceptance boundary;
* concrete curriculum content;
* pricing decisions;
* release sequencing.

Authority is divided as follows:

* stable project identity and high-level direction belong in `PROJECT_OVERVIEW.md`;
* certified learning principles and their scientific boundaries belong in `LEARNING_MODEL.md`;
* durable MVP scope and acceptance criteria belong in `mvp.md`;
* technical realization belongs in architecture documentation;
* current project state, current task, implementation permission, and Next Allowed Action belong in `PROJECT_CONTROL.md`.

Implementation may realize this Product Vision.

Implementation must not define or silently redefine it.

---

## Product Vision

TheraLearn is an evidence-based learning platform that helps transform subject-matter content into effective learning experiences.

TheraLearn does not primarily exist to create or own the subject matter being taught.

The subject matter can come from:

* a student;
* a teacher;
* a subject-matter expert;
* a course creator;
* an educational institution;
* a company;
* an organisation;
* another legitimate content owner.

The content owner remains responsible for the subject matter and its factual or professional correctness.

TheraLearn provides the learning system around that content.

The central product idea is:

> **You bring what needs to be learned. TheraLearn helps you determine how it can be learned effectively.**

TheraLearn must therefore be more than:

* a learning management system;
* a course builder;
* a document repository;
* a curriculum viewer;
* a collection of flashcards;
* a quiz application;
* a progress tracker;
* an AI content generator.

Those may become useful product mechanisms.

They are not the defining product identity.

The differentiating core of TheraLearn is:

> **Learning design based on learning science.**

---

## Core Product Responsibility

TheraLearn connects subject-matter content with evidence-backed learning design.

The intended high-level transformation is:

```text
SUBJECT-MATTER CONTENT
        ↓
ANALYSIS AND STRUCTURING
        ↓
WHAT SHOULD BE LEARNED?
        ↓
LEARNING OBJECTIVES
        ↓
STRUCTURED LEARNING CONTEXT
        ↓
RELEVANT EVIDENCE-BACKED
LEARNING PRINCIPLES
        ↓
RELEVANT LEARNING MECHANISMS
        ↓
LEARNING EXPERIENCE
        ↓
LEARNER PERFORMANCE
        ↓
FEEDBACK / PROGRESSION / RESULT
```

TheraLearn may help analyse, organize, structure, and design learning around content.

TheraLearn must not silently convert that responsibility into authority over subject-matter truth.

The distinction is permanent:

```text
CONTENT OWNER
owns subject-matter authority

THERALEARN
owns the learning-system responsibility
around that content
```

---

## Learning Science Engine

A central long-term product capability is the:

**TheraLearn Learning Science Engine**

The Learning Science Engine represents the product layer that connects learning objectives and context with relevant evidence-backed learning principles and product mechanisms.

Its conceptual derivation is:

```text
SCIENTIFIC EVIDENCE
        ↓
CERTIFIED LEARNING PRINCIPLES
        ↓
LEARNING OBJECTIVE + CONTEXT
        ↓
RELEVANT LEARNING MECHANISMS
        ↓
LEARNING EXPERIENCE
        ↓
LEARNER PERFORMANCE
        ↓
FEEDBACK / PROGRESSION / RESULT
```

The Learning Science Engine does not create its own scientific authority.

Its scientific authority must be derived from:

`docs/product/LEARNING_MODEL.md`

The Learning Model therefore constrains the Learning Science Engine.

The engine must not redefine the Learning Model merely because a particular feature, algorithm, AI capability, or interface is technically possible.

Features are mechanisms.

Learning Principles are authority.

The existence of a quiz, flashcard, recommendation, AI interaction, explanation, scheduler, or other feature does not by itself prove that a Learning Principle has been realized correctly.

---

## Learning-Design Principle

TheraLearn should help convert subject-matter material into an explicit learning design.

A learning design can include, where appropriate:

* structured curriculum context;
* courses;
* chapters;
* lessons or equivalent learning units;
* learning objectives;
* acquisition activities;
* retrieval activities;
* correction and feedback;
* repetition;
* guidance;
* self-explanation;
* application activities;
* exercises;
* assessment;
* objective-aligned demonstration;
* progression between learning activities.

The appropriate design must depend on the learning objective and relevant context.

TheraLearn must not select a mechanism merely because the mechanism exists as a product feature.

The intended reasoning direction is:

```text
LEARNING OBJECTIVE
        +
RELEVANT CONTEXT
        ↓
APPLICABLE LEARNING PRINCIPLE
        ↓
RELEVANT LEARNING MECHANISM
        ↓
LEARNING EXPERIENCE
```

---

## Two Sides of the Core Product

TheraLearn serves two closely connected sides of the same learning system:

```text
CREATOR / CONTENT OWNER
        ↓
BUILD / DESIGN
        ↓
APPROVED LEARNING EXPERIENCE
        ↓
LEARNER
        ↓
LEARN
```

Both sides depend on the same Learning Science Engine.

They are not separate product identities.

---

## Creator Product Promise

The central creator promise is:

> **Help me teach better.**

The creator or content owner contributes the subject matter.

TheraLearn helps design how learners can work with that subject matter.

The platform should be able to assist creators with tasks such as:

* analysing learning material;
* identifying or refining learning objectives;
* structuring learning content;
* dividing material into appropriate learning units;
* selecting relevant learning mechanisms;
* connecting learning activities to objectives;
* proposing retrieval where retrieval is justified;
* proposing informative correction where learner errors or gaps require correction;
* supporting repeated learning opportunities where relevant;
* proposing appropriate guidance during acquisition;
* proposing objective-aligned forms of demonstration or assessment.

TheraLearn should make important learning-design decisions visible rather than hide them behind unexplained automation.

Where TheraLearn proposes a learning design, the creator should be able to:

* review it;
* understand relevant reasoning;
* change it;
* reject it;
* approve it.

TheraLearn is therefore intended to function as an evidence-based learning-design assistant rather than an autonomous owner of educational truth.

---

## Learner Product Promise

The central learner promise is:

> **Help me learn better.**

The learner should not merely consume pages or progress through content by repeatedly selecting “next”.

The learner should actively work with material through mechanisms that are relevant to the learning objective and learning context.

Possible mechanisms may include:

* reading;
* active retrieval;
* flashcards;
* quiz activities;
* self-explanation;
* informative correction;
* distributed practice;
* guidance;
* application tasks;
* exercises;
* assessment;
* exam preparation;
* objective-aligned demonstrations of learning.

No one mechanism is universally required.

The product should derive the relevance of a mechanism from the learning objective, learner state, task, material, and relevant context rather than from feature availability alone.

The intended learner experience is therefore closer to:

```text
LEARNING OBJECTIVE
        ↓
ACQUIRE / UNDERSTAND
        ↓
ACTIVE ATTEMPT
        ↓
RELEVANT FEEDBACK
        ↓
NEW ATTEMPT OR NEXT ACTIVITY
        ↓
RELEVANT DEMONSTRATION
```

than:

```text
READ
  ↓
NEXT
  ↓
NEXT
  ↓
QUIZ
  ↓
SCORE
  ↓
COMPLETED
```

---

## Personal Preferences

TheraLearn may support personal choice when more than one learning method is scientifically and educationally defensible for the same learning objective.

A learner may, for example, prefer one valid way of engaging with material over another.

Personal preference must not be represented as scientific proof that the learner inherently learns better through one fixed method.

TheraLearn must therefore not adopt unsupported learning-style claims such as:

> “You are learner type X, therefore you learn best through method Y.”

The following concepts must remain analytically distinct:

* personal preference;
* accessibility need;
* learner state;
* prior knowledge;
* demonstrated performance;
* task requirements;
* learning objective.

Personalisation should not collapse these different concepts into one learner label.

---

## Accessibility and Individual Needs

TheraLearn should be capable of supporting learners with different accessibility requirements and learning conditions.

Examples may include learners with:

* dyslexia;
* ADHD;
* visual or reading-related accessibility requirements;
* other relevant support needs.

Such characteristics must not be converted into unsupported deterministic pedagogical rules.

TheraLearn must not assume:

```text
ADHD → METHOD X
```

or:

```text
DYSLEXIA → METHOD Y
```

without appropriate evidence.

Accessibility adaptations may change how learning material or interactions are presented or made usable.

Claims about improved learning effectiveness require their own relevant evidence.

Future recommendations based on learner characteristics, prior knowledge, observed performance, or learner state must respect the evidence boundaries established in the Learning Model.

---

## Student / Individual Learner Use Case

An individual student should be able to benefit from TheraLearn even when their school, university, or educational institution does not use the platform.

A central long-term use case is:

> **“Here is my curriculum. I have an exam in six weeks. Help me learn it.”**

A student may potentially provide materials such as:

* curriculum lists;
* PDFs;
* books or book references;
* slides;
* notes;
* learning objectives;
* exam requirements;
* other legitimate study material.

TheraLearn can then help turn that material into an organised learning context.

The conceptual journey is:

```text
CURRICULUM / STUDY MATERIAL
        ↓
ANALYSIS AND STRUCTURE
        ↓
WHAT DO I NEED TO KNOW OR BE ABLE TO DO?
        ↓
STRUCTURED LEARNING CONTEXT
        ↓
LEARNING OBJECTIVES
        ↓
PLAN TOWARD THE TARGET
        ↓
EVIDENCE-BACKED LEARNING ACTIVITIES
        ↓
WHAT CAN I CURRENTLY DEMONSTRATE?
        ↓
WHERE ARE THE RELEVANT GAPS?
        ↓
WHAT IS THE NEXT RELEVANT LEARNING WORK?
        ↓
EXAM / TARGET
```

TheraLearn does not thereby become the authority for the academic correctness of the student's source material.

---

## Creators, Institutions and Organisations

The same learning-science foundation should be capable of supporting learning created by:

* independent educators;
* course creators;
* educational institutions;
* companies;
* professional organisations;
* training providers;
* other legitimate learning providers.

Potential long-term contexts include:

* formal education;
* continuing education;
* onboarding;
* compliance training;
* safety training;
* product training;
* employee development;
* leadership development;
* professional training;
* certification programmes.

The organisation or content owner contributes the subject-matter authority.

TheraLearn contributes the learning-design and learning-experience system around that material.

---

## Courses Through TheraLearn

Creators, institutions, and organisations should eventually be able to build and offer courses through TheraLearn.

The intended high-level model is:

```text
CONTENT OWNER / ORGANISATION
        ↓
SUBJECT-MATTER MATERIAL
        ↓
THERALEARN LEARNING DESIGN
        ↓
CREATOR REVIEW + APPROVAL
        ↓
COURSE / LEARNING PROGRAMME
        ↓
PUBLICATION
        ↓
INVITATION / ENROLMENT / PURCHASE
        ↓
THERALEARN LEARNING EXPERIENCE
        ↓
ASSESSMENT / RESULTS
        ↓
POSSIBLE CERTIFICATION
```

Publishing and commercial distribution are product capabilities around the learning system.

They do not replace the Learning Science Engine as the core differentiator.

---

## Demonstration and Certification

TheraLearn should eventually support learning journeys that extend beyond participation and completion into relevant demonstration and certification.

These concepts must remain distinct:

1. participation;
2. completion;
3. demonstration or assessment of a learning objective;
4. provider-issued certification;
5. a verifiable certificate delivered through TheraLearn;
6. external or official accreditation.

A learner completing content does not automatically establish competence.

A simple quiz score does not automatically establish achievement of a learning objective if that objective requires explanation, discrimination, application, inference, performance, or transfer.

Any product claim about demonstrated learning must respect the Objective-Aligned Demonstration Principle owned by `LEARNING_MODEL.md`.

TheraLearn must not present a certificate as officially accredited unless the relevant external accreditation actually exists.

---

## Long-Term Product Model

The long-term product model can be understood as:

```text
                 THERALEARN

          LEARNING SCIENCE ENGINE

                BUILD
                  ↓
                DESIGN
                  ↓
                LEARN
                  ↓
             DEMONSTRATE
                  ↓
               CERTIFY

            COMMERCIAL LAYER
```

The Learning Science Engine is intended to remain relevant across these product stages.

Commercial capabilities surround the learning product.

They do not define its scientific or pedagogical authority.

---

## Commercial Direction

TheraLearn may eventually support commercial models such as:

* direct-to-consumer access;
* creator products;
* institutional products;
* company or organisation licences;
* subscriptions;
* course sales;
* transactional payments;
* marketplace capabilities.

No specific pricing model is established by this Product Vision.

Commercial decisions require separate product and business decisions before becoming authoritative.

---

## Initial Domain

Psychotherapy education remains a valid initial domain for TheraLearn.

It provides a concrete environment in which the learning system can be developed and evaluated.

It does not permanently define the product category.

TheraLearn is intended to support structured learning across domains where legitimate subject-matter content can be connected to relevant evidence-backed learning design.

---

## Structured Curriculum

Structured curriculum remains an important product concept.

A useful existing structural model is:

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

This hierarchy may provide useful learning context.

It is not itself the differentiating product.

A structured curriculum becomes part of the TheraLearn vision when the structure helps connect:

* subject matter;
* learning objectives;
* evidence-backed learning principles;
* learning activities;
* learner performance;
* relevant feedback and progression.

Future learning contexts are not permanently required to use only one hierarchy if a different structure is justified.

---

## Existing Product Mechanisms

Existing or planned capabilities such as:

* structured curriculum;
* flashcards;
* quizzes;
* learner progress;
* reading support;
* Danish and English language support;
* authentication;
* AI assistance;

must be treated as product mechanisms or supporting capabilities.

Their existence does not independently define TheraLearn.

Each mechanism must be evaluated by asking:

> **What learning or product responsibility does this mechanism serve?**

Where a mechanism makes a learning-science claim, that claim must be traceable to the Learning Model.

Implementation convenience does not create product authority.

---

## Relationship to Existing Implementation

Existing implementation may contain useful foundations for the new Product Vision.

Potentially reusable capabilities can include:

* Course → Chapter → Lesson structure;
* authentication;
* Supabase infrastructure;
* repository layers;
* lesson context;
* quiz functionality;
* flashcards;
* learner progress.

Their existence does not guarantee that they belong unchanged in the future product.

Existing implementation must be evaluated against this Product Vision and the Learning Model.

A useful classification is:

```text
REUSE
ADAPT
LEGACY
MISSING
```

The governing question is:

> **Which existing implementation helps realize the Product Vision?**

The Product Vision must not be reconstructed from whatever code happens to exist.

---

## Product Authority Boundaries

TheraLearn must preserve the following authority boundaries.

### Subject-Matter Authority

The legitimate content owner owns responsibility for the factual, academic, professional, or organisational correctness of the subject matter.

TheraLearn may assist with structure and learning design.

TheraLearn does not automatically become the source of truth for the subject matter.

### Scientific Learning Authority

`LEARNING_MODEL.md` owns the certified evidence-backed learning principles and their boundaries.

The Product Vision must not create competing scientific claims.

### Product Authority

This document owns the permanent product direction and intended product responsibilities.

### MVP Authority

`mvp.md` owns what must be demonstrated in the initial MVP.

The Product Vision can extend beyond the first MVP.

### Implementation Authority

Architecture and implementation documents own technical realization.

Implementation cannot silently create new permanent product requirements.

### Current Project State

`PROJECT_CONTROL.md` owns current phase, current task, current risks, implementation permission, and Next Allowed Action.

---

## Product Guardrails

The following guardrails protect the Product Vision:

1. TheraLearn must not become a generic feature collection in which learning science is merely marketing language.

2. Learning mechanisms must be connected to relevant learning objectives and context.

3. Existing features must not be treated as scientific principles.

4. AI-generated content or activities must not be assumed to be educationally valid merely because they can be generated.

5. Personalisation must not rely on unsupported learning-style classifications.

6. Accessibility and personal preference must not be confused with evidence of superior learning effectiveness.

7. Completion must not automatically be treated as demonstrated competence.

8. Certification must not imply accreditation that does not exist.

9. Content-owner responsibility for subject-matter truth must remain distinct from TheraLearn's learning-design responsibility.

10. Implementation must remain downstream of Product Vision and Learning Model authority.

---

## Product Success Direction

At the highest level, TheraLearn succeeds when it can help create a defensible connection between:

```text
WHAT NEEDS TO BE LEARNED
        ↓
WHAT THE LEARNING OBJECTIVE REQUIRES
        ↓
WHAT LEARNING SCIENCE SUPPORTS
        ↓
HOW THE LEARNER WORKS WITH THE MATERIAL
        ↓
WHAT THE LEARNER CAN DEMONSTRATE
```

The product should make that connection useful for both:

```text
CREATOR:
Help me teach better.

LEARNER:
Help me learn better.
```

That shared foundation is the core Product Vision for TheraLearn.

---

## Authority Rule

New permanent Product Vision claims require an explicit verified product decision before becoming authority.

New scientific learning claims require the relevant evidence review and must be owned by `LEARNING_MODEL.md`.

Implementation, market convention, AI capability, technical convenience, or the existence of an already-built feature does not by itself establish permanent product authority.

When Product Vision and existing implementation conflict, the verified Product Vision governs product direction until authority is explicitly changed.
