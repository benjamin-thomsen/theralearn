# TheraLearn – Learning Model

## Purpose

This document owns the permanent evidence-backed learning model for TheraLearn.

It describes how learning context and supported learning activities relate at the product level. Product intent belongs in `PRODUCT_VISION.md`. Durable MVP scope belongs in `mvp.md`. Technical realization belongs in architecture documentation. Current workflow state belongs in `PROJECT_CONTROL.md`.

The model must distinguish verified learning relationships from pedagogical mechanisms that have not yet been established as authority.

---

## Core Learning Structure

The currently verified learning structure is:

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

---

## Lesson as Learning Context

The lesson is the central learning-context unit currently established by repository evidence.

A lesson belongs to a chapter, which belongs to a course. A lesson can contain content and learning objectives, and the currently implemented flashcard, quiz-question, and learner-progress structures relate directly to lessons.

This makes the lesson the current point at which curriculum context, learning objectives, supported learning activities, and learner progress meet.

This is a structural learning-model conclusion. It does not imply that all future learning mechanisms must always be implemented only at lesson level.

---

## Learning Objectives

Lessons can define learning objectives.

Learning objectives provide an explicit representation of what a lesson is intended to support the learner in learning.

The current evidence establishes their presence and relationship to lessons. It does not yet establish a more detailed objective taxonomy, mastery rule, scoring model, or progression algorithm.

---

## Supporting Learning Activities

### Flashcards

Flashcards are attached to lessons.

They therefore operate within an existing lesson context rather than as an independent content hierarchy.

The current evidence does not establish a specific repetition algorithm, spaced-repetition method, or prescribed practice interval.

### Quiz questions

Quiz questions are attached to lessons.

They therefore provide an assessment/practice capability within lesson context.

The current evidence does not establish a mastery threshold, adaptive testing model, or required pedagogical progression based on quiz performance.

### Reading support

Reading support is part of the established Product Vision.

Its precise pedagogical mechanism is not yet established by current evidence and must not be invented here.

### Multilingual support

Multilingual support, initially Danish and English, is part of the established Product Vision.

Its precise pedagogical role is not yet established by current evidence and remains open.

---

## Learner Progress

The current implementation tracks learner progress in relation to lessons.

This establishes lesson-level learner state as part of the current learning structure.

Progress tracking does not by itself establish mastery, competence, grading, adaptive sequencing, or pedagogical completion criteria. Those concepts require separate verified decisions before becoming part of the Learning Model.

---

## Integration Principle

The Learning Model supports the Product Vision principle that TheraLearn should provide a coherent learning environment around shared curriculum context.

Curriculum content, learning objectives, flashcards, quiz questions, and learner progress are related through lesson context rather than modeled as unrelated product systems.

The Learning Model therefore describes relationships between learning context and supported activities while leaving unsupported pedagogical theory open.

---

## Explicitly Unestablished Mechanisms

The current Learning Model does not claim that TheraLearn uses or requires:

- spaced repetition;
- a specific retrieval-practice methodology;
- mastery learning;
- adaptive learning;
- prescribed repetition intervals;
- a fixed pedagogical progression algorithm;
- a specific pedagogical role for reading support;
- a specific pedagogical role for multilingual support.

These may only become Learning Model authority through explicit verified decisions or evidence.

---

## Authority Rule

Implementation may provide evidence that a learning structure or capability exists, but implementation alone does not create pedagogical intent.

New learning principles or mechanisms must be explicitly verified before being added to this document.
