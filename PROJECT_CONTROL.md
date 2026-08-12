# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-13

---

## Purpose

This document owns the current verified state of the TheraLearn project: current phase, verified facts, current task, unresolved risks, code-change permission, and Next Allowed Action.

Stable project identity and permanent principles belong in `PROJECT_OVERVIEW.md`. Governance and workflow rules belong in `PROJECT_HANDBOOK.md`. Domain-specific permanent knowledge belongs under `docs/`.

---

## Current Phase

**Learning Science Evidence Review**

The bounded external learning-science synthesis is complete and candidate-principle certification is in progress.

The current `LEARNING_MODEL.md` remains unchanged. Product implementation remains paused while the candidate principle set is tested for evidence sufficiency, overlap, boundary preservation, and minimum-set coherence before any permanent product-authority transfer.

---

## Current Branch

```text
migration-next16-to-root
```

The authoritative project state currently lives on this branch. `main` remains behind and must not be merged or rewritten until a later verified integration decision.

---

## Verification State

The most recent complete local verification before documentation repair reported:

```text
Build: PASS
TypeScript: PASS
Documentation structure: PASS
Overall verification: PASS
```

Recent verified product/control checkpoints include:

- Product Vision transfer: `f1d7c814da26aeec1ac5cbc19bc4ae13011122af`;
- Learning Model transfer: `38760eb66974217c9d966f6b0617f4049be76d69`;
- MVP scope transfer: `790b68a8c68c23046b6613407bf2db8c17d803e7`;
- MVP implementation gap assessment opened: `b9fe63161865fe4c7f06fb16567f23376cc222ce`;
- Learning Science Evidence Review opened: `2bb3b9e90914c0e29ed10c6a4fd4be81639b2fd6`;
- initial learning-science evidence synthesis recorded: `3376c32820c0e023cc0a876df74a250afa90791a`;
- bounded Active Retrieval certification recorded: `2d9e817b95dfa911eacb886f94e4131ae8af8222`.

The implementation gap assessment remains:

- authentication/user identity — **Partial**;
- curriculum/pensum — **Partial**;
- lesson/content — **Partial / substantial**;
- flashcards — **Missing at product-flow level**;
- quiz — **Partial / substantial**;
- results/progress — **Partial, currently local-browser based rather than authenticated learner/lesson authority**;
- complete end-to-end learning loop — **Missing / not integrated**.

Implementation selection remains deferred until the Learning Science Evidence Review is complete.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Historical Reconstruction Status

**Status: No historical chat recovery currently authorized**

The Learning Science Evidence Review uses external scientific evidence. Historical project chats are not a substitute for scientific evidence.

---

## Product Authority Status

**Status: MINIMAL PRODUCT AUTHORITY LAYER ESTABLISHED; SCIENCE-DERIVED LEARNING PRINCIPLES ARE NOT YET PERMANENT AUTHORITY**

Established authorities:

- `docs/product/README.md`;
- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

No science-derived candidate principle has yet been transferred into permanent product authority.

---

## Learning Science Evidence Synthesis

**Status: BOUNDED INITIAL SYNTHESIS COMPLETE; PRINCIPLE CERTIFICATION IN PROGRESS**

The review prioritized systematic reviews, meta-analyses, major peer-reviewed reviews, and evidence syntheses. The evidence pattern does not justify eight independent permanent platform principles.

### Candidate classifications

1. **Active Retrieval Principle — NARROWED; individual certification complete**
2. **Distributed Relearning Principle — NARROWED; individual certification complete**
3. **Informative Correction Principle — certification pending**
4. **Adaptive Guidance Principle — certification pending**
5. **Demonstrated Understanding Principle — certification pending**

Conditional mechanisms remain:

- self-explanation / elaboration;
- interleaving;
- metacognition / calibration.

### Active Retrieval Principle certification result

**Decision: NARROW**

The original candidate was too broad because it implied that learning generally should require retrieval. High-quality meta-analytic evidence strongly supports retrieval practice for durable retention of previously acquired knowledge, including substantial classroom evidence, but the magnitude and transfer of benefit depend on conditions such as test format, material matching, corrective feedback, repetitions, timing, initial performance, and the target learning outcome.

Evidence also shows that retrieval should not be assumed to optimize every inferential or transfer task. Therefore retrieval is foundational for durable retention but must not be treated as a universal learning action across all phases and objectives.

The bounded formulation that survives certification is:

> **Active Retrieval Principle:** When durable retention of previously acquired knowledge is an intended learning outcome, learners should be required to actively retrieve relevant knowledge from memory at appropriate points in the learning process, rather than relying primarily on passive re-exposure.

This formulation:

- expresses a learning requirement rather than a feature convention;
- preserves the strongest evidence scope;
- leaves retrieval format implementation-independent;
- does not equate quizzes or flashcards with the principle;
- preserves room for acquisition, guidance, explanation, inference, and transfer mechanisms where retrieval alone is insufficient;
- does not by itself change the current MVP acceptance boundary.

**Certification status:** `NARROW` with the narrowed formulation retained as the current certified candidate for the final minimum-set test.

### Distributed Relearning Principle certification result

**Decision: NARROW**

High-quality quantitative synthesis strongly supports distributed over massed practice for durable retention. The evidence is broad enough for a platform-level temporal learning principle, including a large laboratory literature and a newer applied classroom meta-analysis showing a moderate average advantage for distributed practice. However, spacing effects are heterogeneous and the evidence does not support a universal interval, a monotonic rule that more spacing is always better, or one fixed spaced-repetition schedule.

The strongest boundary condition is the interaction between the interstudy interval and the intended retention interval: the spacing associated with better later retention changes as the target retention horizon changes. Material, task complexity, learner population/state, number and form of re-exposures, and applied learning context can also influence observed effects and implementation quality.

The principle should therefore govern the temporal distribution of repeated learning opportunities, not require retrieval inside its own definition. Retrieval and spacing can be combined powerfully through successive relearning, but they remain conceptually and evidentially separable: Active Retrieval governs the learner's memory action; Distributed Relearning governs when repeated learning opportunities occur.

The bounded formulation that survives certification is:

> **Distributed Relearning Principle:** When durable retention requires repeated learning opportunities, those opportunities should be distributed across time rather than unnecessarily massed, with spacing determined in relation to the intended retention horizon and relevant learning conditions.

This formulation:

- captures the robust distributed-practice effect without claiming that one schedule is universally optimal;
- preserves retention interval, learner/material/task, and schedule conditions as implementation variables;
- remains independent of any specific flashcard system, scheduler, algorithm, interval sequence, or UI;
- does not require retrieval as part of the spacing principle itself, preserving conceptual independence from Active Retrieval;
- permits, but does not mandate, successive relearning as a combined mechanism where both retrieval and distributed practice are appropriate;
- does not by itself change the current MVP acceptance boundary.

**Certification status:** `NARROW` with the narrowed formulation retained as the current certified candidate for the final minimum-set test.

---

## Candidate Minimal Principle Set

The current working set is:

1. **Active Retrieval Principle** — when durable retention of previously acquired knowledge is an intended learning outcome, learners should actively retrieve relevant knowledge from memory at appropriate points rather than rely primarily on passive re-exposure.
2. **Distributed Relearning Principle** — when durable retention requires repeated learning opportunities, those opportunities should be distributed across time rather than unnecessarily massed, with spacing determined in relation to the intended retention horizon and relevant learning conditions.
3. **Informative Correction Principle** — learner attempts should produce sufficient corrective information to repair errors and strengthen accurate understanding.
4. **Adaptive Guidance Principle** — instructional support should reduce unnecessary cognitive burden during acquisition and be reduced or changed as learner knowledge makes greater independence appropriate.
5. **Demonstrated Understanding Principle** — where objectives extend beyond recall, mastery should be demonstrated through explanation, discrimination, inference, or application appropriate to the objective.

The first two candidates have completed individual certification with status `NARROW`. All candidates remain non-authoritative until the complete set survives individual certification and final minimum-set coherence testing.

---

## Evidence Standard

A candidate learning principle must not become permanent TheraLearn authority merely because it is popular, intuitive, or present in another learning product.

The evidence review distinguishes:

1. **Robust evidence** — supported across high-quality reviews/meta-analyses and sufficiently generalizable for a platform-level principle;
2. **Conditional evidence** — useful under identifiable conditions and therefore suitable only as a bounded principle/mechanism;
3. **Emerging/uncertain evidence** — promising but insufficient for permanent platform authority;
4. **Unsupported product convention** — common feature patterns without sufficient evidence to define TheraLearn learning design.

A permanent principle must additionally pass a derivation test:

- it must express a learning requirement rather than a UI or feature convention;
- its evidence must be strong enough for the scope claimed;
- known boundary conditions must remain visible;
- it must not duplicate another principle unnecessarily;
- it must be useful for deriving product decisions;
- it must not imply that one mechanism is the only valid implementation.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for minimal MVP assessment.**

### R2 – Learning-science authority gap

**Status: ACTIVE — candidate-principle certification in progress.**

Two candidates have now been narrowed against evidence. The remaining risk is premature promotion before all candidates and the final minimum set have passed the same test.

### R3 – MVP implementation integration gap

**Status: ACTIVE but temporarily deferred.**

### R4 – Anomalous repository artifact

**Status: OPEN but not currently blocking.**

### R5 – Branch divergence

**Status: OPEN.**

No integration with `main` until a later verified decision.

---

## Code Change Gate

**Product implementation: PAUSED during Learning Science Evidence Review**

No product feature code changes are authorized.

External scientific research, read-only repository inspection, and control/documentation changes required to establish evidence authority are authorized.

The current MVP boundary must not be silently expanded by the evidence review.

---

## Current Task

Continue **Candidate Learning Principle Certification** on the smallest coherent candidate set.

Completed individual certification passes:

- Active Retrieval Principle — `NARROW`;
- Distributed Relearning Principle — `NARROW`.

For each remaining candidate, determine:

1. whether the claimed scope is supported strongly enough by the reviewed evidence;
2. whether important boundary conditions are preserved in the formulation;
3. whether the principle is genuinely foundational rather than a conditional mechanism;
4. whether it overlaps another candidate enough to merge or remove it;
5. whether it can derive meaningful product behavior without prescribing a specific feature;
6. whether omission would leave a material gap in the science-derived learning architecture;
7. whether it changes the current MVP acceptance boundary.

---

## Next Allowed Action

Certify the **Informative Correction Principle**.

Specifically determine whether:

- corrective/informative feedback has sufficiently strong and generalizable evidence for permanent principle status;
- the principle should require feedback after every attempt or instead require sufficient information for error correction under appropriate conditions;
- feedback timing, content, task type, learner knowledge, correctness, and complexity require narrowing;
- the principle remains implementation-independent and does not imply one feedback format or UI;
- it is independent enough from Active Retrieval and Adaptive Guidance to remain a separate principle rather than being merged;
- it changes the current MVP boundary.

Classify it as **CERTIFY**, **NARROW**, **MERGE**, **DEFER**, or **REJECT**.

Do not modify `docs/product/LEARNING_MODEL.md`, `docs/product/mvp.md`, or product code during candidate certification.

After the minimal principle set is certified, synchronize `PROJECT_CONTROL.md` again before transferring any certified principle into permanent product authority.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
