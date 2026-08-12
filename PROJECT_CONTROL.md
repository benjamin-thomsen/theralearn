# TheraLearn – Project Control

> Version: 1.0
>
> Status: Active
>
> Role: Current verified project state and workflow gate
>
> Last updated: 2026-08-12

---

## Purpose

This document owns the current verified state of the TheraLearn project: current phase, verified facts, current task, unresolved risks, code-change permission, and Next Allowed Action.

Stable project identity and permanent principles belong in `PROJECT_OVERVIEW.md`. Governance and workflow rules belong in `PROJECT_HANDBOOK.md`. Domain-specific permanent knowledge belongs under `docs/`.

---

## Current Phase

**Learning Science Evidence Review**

The minimal product-authority layer and initial MVP boundary are established. A read-only MVP implementation gap assessment has also established that the current application contains substantial but disconnected implementation: curriculum/pensum, lesson-like content, quiz, authentication, and local quiz progress are partial; flashcard product flow is missing; and the complete authenticated learning loop is not yet integrated.

A bounded external learning-science evidence synthesis has now been completed across the initial candidate areas. The synthesis supports a smaller candidate principle set rather than treating every reviewed technique as an independent platform principle.

The current `LEARNING_MODEL.md` remains deliberately conservative and has not yet been modified. Product implementation remains paused while the candidate principle set is tested for evidence sufficiency, overlap, boundary preservation, and minimum-set coherence before any permanent product-authority transfer.

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
- Learning Science Evidence Review opened: `2bb3b9e90914c0e29ed10c6a4fd4be81639b2fd6`.

The implementation gap assessment has verified these current classifications:

- authentication/user identity — **Partial**;
- curriculum/pensum — **Partial**;
- lesson/content — **Partial / substantial**;
- flashcards — **Missing at product-flow level**;
- quiz — **Partial / substantial**;
- results/progress — **Partial, currently local-browser based rather than authenticated learner/lesson authority**;
- complete end-to-end learning loop — **Missing / not integrated**.

These classifications remain implementation evidence, but implementation selection is temporarily deferred until the Learning Science Evidence Review is complete.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Historical Reconstruction Status

**Status: No historical chat recovery currently authorized**

Historical project material remains evidence, not automatic authority.

The Learning Science Evidence Review uses external scientific evidence. Historical project chats are not a substitute for scientific evidence.

---

## Product Authority Status

**Status: MINIMAL PRODUCT AUTHORITY LAYER ESTABLISHED; SCIENCE-DERIVED LEARNING PRINCIPLES ARE CANDIDATES, NOT YET PERMANENT AUTHORITY**

Established authorities:

- `docs/product/README.md` — product-domain navigation and placement;
- `docs/product/PRODUCT_VISION.md` — permanent product intent;
- `docs/product/LEARNING_MODEL.md` — current evidence-backed structural learning model;
- `docs/product/mvp.md` — durable initial MVP scope and acceptance boundary.

The current Learning Model remains valid as a structural model but is not yet sufficient as the scientific design basis for an exceptional learning platform.

No candidate principle has yet been transferred into permanent product authority.

---

## Learning Science Evidence Synthesis

**Status: BOUNDED INITIAL SYNTHESIS COMPLETE; PRINCIPLE CERTIFICATION PENDING**

The review prioritized systematic reviews, meta-analyses, major peer-reviewed reviews, and evidence syntheses. The resulting evidence pattern does not justify eight independent permanent platform principles.

### Evidence classifications

1. **Retrieval practice — Foundational candidate**
   - strong and broadly generalizable evidence supports active retrieval over passive re-exposure for durable learning;
   - implementation conditions such as retrieval success, repetition, material, test format, and feedback remain relevant.

2. **Spacing / distributed relearning — Foundational candidate**
   - strong evidence supports distributing learning across time rather than massing equivalent practice;
   - optimal spacing is conditional on retention goals, material, learner state, and relearning conditions;
   - spacing is not itself a justification for a specific flashcard algorithm.

3. **Corrective / informative feedback — Foundational candidate**
   - evidence supports feedback as beneficial on average, but feedback is heterogeneous and information content matters;
   - the platform principle should concern useful correction of learner attempts rather than feedback as a generic feature.

4. **Cognitive-load-sensitive guidance / worked examples — Foundational constraint candidate**
   - evidence supports guidance and worked-example approaches particularly where learners lack schemas for complex tasks;
   - expertise and task complexity create important boundary conditions, so support must not become universal permanent scaffolding.

5. **Demonstrated understanding / transfer — Foundational outcome candidate**
   - durable learning cannot always be equated with recall when the target competence requires explanation, discrimination, inference, or application;
   - transfer is not automatic and must be evaluated relative to the actual learning objective.

6. **Self-explanation / elaboration — Conditional mechanism**
   - potentially valuable for appropriate material and objectives;
   - currently better represented as a mechanism available under a broader demonstrated-understanding principle than as an independent universal platform principle.

7. **Interleaving — Conditional mechanism**
   - evidence is meaningfully moderated by domain, category similarity, material, and task structure;
   - it must not become a universal "mix practice" rule.

8. **Metacognition / calibration — Conditional / deferred mechanism**
   - learner judgments can be useful but subjective confidence must not be treated as equivalent to demonstrated mastery;
   - performance evidence should remain distinct from learner confidence.

### Candidate minimal principle set

The current smallest coherent candidate set is:

1. **Active Retrieval Principle** — learning should require retrieval of relevant knowledge or reasoning rather than rely primarily on passive re-exposure.
2. **Distributed Relearning Principle** — important learning should be revisited across time, with retrieval/relearning distributed in relation to intended durability.
3. **Informative Correction Principle** — learner attempts should produce sufficient corrective information to repair errors and strengthen accurate understanding.
4. **Adaptive Guidance Principle** — instructional support should reduce unnecessary cognitive burden during acquisition and be reduced or changed as learner knowledge makes greater independence appropriate.
5. **Demonstrated Understanding Principle** — where objectives extend beyond recall, mastery should be demonstrated through explanation, discrimination, inference, or application appropriate to the objective.

These formulations are **candidate principles only**. They are not yet permanent TheraLearn product authority.

### Architectural implication under review

The evidence synthesis suggests that product architecture should be derived from a learning process such as:

```text
Acquire / orient
      ↓
Retrieve
      ↓
Correct
      ↓
Relearn across time
      ↓
Demonstrate objective-appropriate understanding
      ↓
Adapt subsequent support and practice
```

This is a candidate learning-process architecture, not yet a replacement for the structural hierarchy in `LEARNING_MODEL.md`.

Existing product concepts such as flashcards and quizzes must be treated as possible mechanisms for realizing learning principles, not as scientific principles or evidence of learning by themselves.

---

## Evidence Standard

A candidate learning principle must not become permanent TheraLearn authority merely because it is popular, intuitive, or present in another learning product.

The evidence review distinguishes:

1. **Robust evidence** — supported across high-quality reviews/meta-analyses and sufficiently generalizable for a platform-level principle;
2. **Conditional evidence** — useful under identifiable conditions and therefore suitable only as a bounded principle/mechanism;
3. **Emerging/uncertain evidence** — promising but insufficient for permanent platform authority;
4. **Unsupported product convention** — common feature patterns without sufficient evidence to define TheraLearn learning design.

Evidence strength, boundary conditions, learner behavior, mechanism classes, and MVP implications must remain distinct.

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

**Status: ACTIVE — narrowed from evidence discovery to principle certification.**

A bounded evidence synthesis now exists and has produced five candidate foundational principles plus conditional mechanisms. The remaining risk is premature promotion: turning a plausible synthesis into permanent authority before testing minimum-set coherence, evidence scope, and boundary preservation.

**Mitigation:** perform a bounded candidate-principle certification before modifying permanent product authority.

### R3 – MVP implementation integration gap

**Status: ACTIVE but temporarily deferred.**

The current implementation is fragmented across hardcoded curriculum, local quiz data/state, browser-local progress, Supabase auth/data structures, and a missing flashcard product flow.

**Mitigation:** resume implementation-gap prioritization after science-derived learning principles are established and the MVP boundary is explicitly checked for required adjustment.

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

The current MVP boundary must not be silently expanded by the evidence review. If scientific derivation demonstrates that a mechanism is essential to the minimum viable learning loop, that must be recorded as an explicit MVP scope decision before implementation.

---

## Current Task

Perform **Candidate Learning Principle Certification** on the five-principle minimal set.

For each candidate, determine:

1. whether the claimed scope is supported strongly enough by the reviewed evidence;
2. whether important boundary conditions are preserved in the formulation;
3. whether the principle is genuinely foundational rather than a conditional mechanism;
4. whether it overlaps another candidate enough to merge or remove it;
5. whether it can derive meaningful product behavior without prescribing a specific feature;
6. whether omission would leave a material gap in the science-derived learning architecture;
7. whether it changes the current MVP acceptance boundary.

The certification target is not five principles by default. The target remains the **smallest coherent set that survives the evidence and derivation tests**.

---

## Next Allowed Action

Certify or reject the candidate principles one at a time, beginning with **Active Retrieval Principle**.

For each candidate:

- test the exact principle claim against the strongest available evidence;
- identify counter-evidence or boundary conditions that would narrow the claim;
- test whether the principle is independent of specific product mechanisms;
- classify it as **CERTIFY**, **NARROW**, **MERGE**, **DEFER**, or **REJECT**.

Do not modify `docs/product/LEARNING_MODEL.md`, `docs/product/mvp.md`, or product code during candidate certification.

After the minimal principle set is certified, synchronize `PROJECT_CONTROL.md` again before transferring any certified principle into permanent product authority.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
