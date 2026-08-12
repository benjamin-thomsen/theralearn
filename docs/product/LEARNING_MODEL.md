# TheraLearn – Learning Model

## Purpose

This document owns the permanent evidence-backed learning model for TheraLearn.

It describes both the structural relationship between learning context and supported learning activities and the certified learning principles that constrain how TheraLearn should support learning at the product level. Product intent belongs in `PRODUCT_VISION.md`. Durable MVP scope belongs in `mvp.md`. Technical realization belongs in architecture documentation. Current workflow state belongs in `PROJECT_CONTROL.md`.

The model distinguishes permanent learning principles from product mechanisms. A learning principle may constrain product behavior without prescribing one feature, algorithm, interface, or implementation.

---

## Core Learning Structure

The verified learning structure is:

```text
Structured curriculum context
        ↓
Course
        ↓
Chapter
        ↓
Lesson
        ↓
Learning objectives
        ↓
Supporting learning activities
        ↓
Learner progress in relation to the lesson
```

Learning content is therefore organized within a structured curriculum rather than as isolated learning items.

The structural hierarchy and the learning principles below have different roles: the hierarchy describes where learning context is organized; the principles constrain how learning should be supported within appropriate contexts.

---

## Certified Learning Principles

The following principles form TheraLearn's minimum certified science-derived learning-principle set. They were retained only after individual evidence review and final minimum-set coherence testing.

They are not a mandatory universal sequence. Their applicability depends on the learning objective, learner state, task, material, and relevant boundary conditions.

### Active Retrieval Principle

When durable retention of previously acquired knowledge is an intended learning outcome, learners should be required to actively retrieve relevant knowledge from memory at appropriate points in the learning process, rather than relying primarily on passive re-exposure.

This principle does not claim that retrieval substitutes for initial acquisition, guarantees transfer, or requires a specific testing format, quiz, flashcard design, or retrieval UI.

### Distributed Practice Principle

When durable retention requires repeated learning opportunities, those opportunities should be distributed across time rather than unnecessarily massed, with spacing determined in relation to the intended retention horizon and relevant learning conditions.

This principle does not establish one universally optimal interval, fixed schedule, spaced-repetition algorithm, or flashcard scheduler. Retention horizon, learner state, material, task, and learning conditions remain relevant to implementation.

### Informative Correction Principle

When a learner attempt reveals an error, misconception, or material gap relevant to the learning objective, the learning process should provide sufficient information and opportunity to support correction, with the form and timing of that information determined by the task, learner state, and learning conditions.

This principle does not require feedback after every action or prescribe immediate feedback, one feedback format, an AI feedback system, or a particular interface. Generic praise, scores, or correctness signals are not assumed to be sufficient correction in every learning context.

### Adaptive Guidance Principle

During acquisition of sufficiently complex or unfamiliar material, instructional support should be matched to the learner's relevant prior knowledge and the demands of the task so that unnecessary cognitive burden is limited, with support reduced, changed, or removed as greater independent performance becomes appropriate.

This principle preserves the boundary that guidance useful to a novice may become redundant or detrimental as expertise increases. It does not require worked examples, step-by-step instruction, adaptive software, an AI tutor, or another specific support mechanism.

### Objective-Aligned Demonstration Principle

Claims that a learner has achieved a learning objective should be supported by observable performance aligned with that objective; when the objective extends beyond recall, evidence should sample the relevant explanation, discrimination, inference, application, or transfer capability rather than infer it from recall or subjective confidence alone.

This principle does not require every learning interaction to test transfer or application, does not assume far transfer is automatic, and does not establish a universal mastery threshold, assessment format, grading model, or competence system.

---

## Principle Relationships

The five principles govern distinct learning responsibilities:

```text
Appropriate support during acquisition
Active memory retrieval when durable retention is intended
Correction of learning-relevant errors and gaps
Distribution of repeated learning opportunities when durability requires repetition
Objective-aligned evidence for claims about learning
```

These responsibilities can interact and can be realized together, but they must not be collapsed into one rigid pedagogical workflow.

Examples of valid combinations include retrieval followed by informative correction, or retrieval distributed across time. Such combinations do not erase the distinction between the underlying principles.

---

## Conditional Learning Mechanisms

The following are not separate permanent learning principles. They may be valid mechanisms when supported by the objective, learner, material, and context:

- self-explanation and elaboration;
- interleaving;
- metacognitive confidence or calibration activities;
- worked examples and fading patterns;
- successive relearning as a combined realization of retrieval and distributed practice;
- specific spaced-repetition schedules or algorithms.

Their conditional status means that TheraLearn may use them where justified; it does not mean that every learning flow must contain them.

---

## Lesson as Learning Context

The lesson is the central learning-context unit currently established by repository evidence.

A lesson belongs to a chapter, which belongs to a course. A lesson can contain content and learning objectives, and the currently implemented flashcard, quiz-question, and learner-progress structures relate directly to lessons.

This makes the lesson the current point at which curriculum context, learning objectives, supported learning activities, and learner progress meet.

This is a structural learning-model conclusion. It does not imply that all future learning mechanisms or certified principles must always be implemented only at lesson level.

---

## Learning Objectives

Lessons can define learning objectives.

Learning objectives represent what a lesson is intended to support the learner in learning and provide the reference point for objective-aligned evidence.

The Learning Model does not establish a universal objective taxonomy, mastery threshold, scoring model, or progression algorithm.

---

## Supporting Learning Activities

### Flashcards

Flashcards are attached to lessons and therefore operate within an existing lesson context rather than as an independent content hierarchy.

Flashcards are a possible product mechanism, not a learning principle. Their design may realize Active Retrieval, Distributed Practice, Informative Correction, or combinations of these principles where appropriate.

The Learning Model does not prescribe a particular flashcard scheduler, repetition algorithm, or interval sequence.

### Quiz questions

Quiz questions are attached to lessons and provide an assessment/practice capability within lesson context.

Quiz questions are a possible mechanism for retrieval, correction, or objective-aligned demonstration depending on their design and purpose. The existence of a quiz alone does not establish that any of those principles has been satisfied.

The Learning Model does not establish a universal mastery threshold, adaptive testing model, or required progression rule based on quiz performance.

### Reading support

Reading support is part of the established Product Vision.

Its precise learning mechanism remains context-dependent and must be derived from relevant learning objectives and principles rather than assumed from the existence of the feature.

### Multilingual support

Multilingual support, initially Danish and English, is part of the established Product Vision.

Its precise pedagogical role remains open and must not be invented from the certified principle set.

---

## Learner Progress

The current implementation tracks learner progress in relation to lessons.

This establishes lesson-level learner state as part of the current learning structure.

Progress tracking does not by itself establish mastery, competence, grading, or pedagogical completion. Any claim that a learner has achieved an objective must respect the Objective-Aligned Demonstration Principle.

---

## Integration Principle

TheraLearn combines structured curriculum context with evidence-backed learning principles.

Curriculum content, learning objectives, learning activities, and learner progress are related through shared learning context, while the certified principles constrain the quality and meaning of learning behavior without equating any product feature with a scientific principle.

The derivation direction is:

```text
Scientific evidence
        ↓
Learning principles
        ↓
Product mechanisms and decisions
        ↓
Implementation
```

Implementation may realize the Learning Model; it does not redefine it.

---

## Explicitly Unestablished Claims

The Learning Model does not establish:

- one universal spaced-repetition algorithm or prescribed interval sequence;
- one universal retrieval format;
- a universal mastery threshold or mastery-learning system;
- a requirement for adaptive-learning software;
- a rigid universal pedagogical sequence;
- automatic transfer from recall to broader competence;
- subjective confidence as sufficient evidence of learning;
- a requirement that every learner interaction use every certified principle;
- a specific pedagogical role for reading support;
- a specific pedagogical role for multilingual support.

These claims require separate evidence and explicit verified decisions before becoming authority.

---

## Authority Rule

Scientific evidence can establish learning requirements without establishing a particular feature implementation.

Product mechanisms must be derived from the certified principles within their boundary conditions. A mechanism does not become authoritative merely because it is common in another learning product or already exists in the codebase.

New learning principles or material changes to the certified set require explicit evidence review and verification before being added to this document.
