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

Before selecting the first implementation seam, the project has identified a higher-order product requirement: TheraLearn is intended not merely to assemble learning features, but to become an exceptional learning platform whose core learning mechanisms are justified by strong learning-science evidence.

The current `LEARNING_MODEL.md` is deliberately conservative and evidence-bounded to repository structure. It does not yet contain a science-derived set of learning principles. Product implementation remains paused while this bounded evidence review determines which learning principles should become permanent TheraLearn authority.

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
- MVP implementation gap assessment opened: `b9fe63161865fe4c7f06fb16567f23376cc222ce`.

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

The current Learning Science Evidence Review must use external scientific evidence, prioritizing systematic reviews, meta-analyses, major peer-reviewed reviews, and high-quality evidence syntheses. Historical project chats are not a substitute for scientific evidence.

---

## Product Authority Status

**Status: MINIMAL PRODUCT AUTHORITY LAYER ESTABLISHED; SCIENCE-DERIVED LEARNING PRINCIPLES NOT YET ESTABLISHED**

Established authorities:

- `docs/product/README.md` — product-domain navigation and placement;
- `docs/product/PRODUCT_VISION.md` — permanent product intent;
- `docs/product/LEARNING_MODEL.md` — current evidence-backed structural learning model;
- `docs/product/mvp.md` — durable initial MVP scope and acceptance boundary.

The current Learning Model remains valid as a structural model but is not yet sufficient as the scientific design basis for an exceptional learning platform.

---

## Current Scientific Evidence Baseline

Initial external evidence confirms that learning science contains robust candidate mechanisms relevant to TheraLearn.

High-priority evidence areas include:

- retrieval practice / testing effect;
- spacing / distributed practice;
- successive relearning and the interaction of spacing with retrieval;
- feedback and corrective feedback;
- interleaving where domain/task conditions support it;
- cognitive-load-sensitive instructional design;
- worked examples and transition toward independent problem solving where appropriate;
- self-explanation / elaborative learning;
- metacognition and calibration of learning judgments;
- transfer and context-sensitive application of knowledge.

Initial review evidence strongly supports retrieval practice and spacing across many learning settings, while also showing that effectiveness depends on learning goals, material complexity, learner characteristics, timing, and implementation conditions. Therefore no mechanism is to be converted directly into a universal product feature without a bounded evidence-to-principle derivation.

---

## Evidence Standard

A candidate learning principle must not become permanent TheraLearn authority merely because it is popular, intuitive, or present in another learning product.

The evidence review must distinguish:

1. **Robust evidence** — supported across high-quality reviews/meta-analyses and sufficiently generalizable for a platform-level principle;
2. **Conditional evidence** — useful under identifiable conditions and therefore suitable only as a bounded principle/mechanism;
3. **Emerging/uncertain evidence** — promising but insufficient for permanent platform authority;
4. **Unsupported product convention** — common feature patterns without sufficient evidence to define TheraLearn learning design.

Evidence strength, boundary conditions, risks, and implementation implications must remain distinct.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for minimal MVP assessment.**

### R2 – Learning-science authority gap

**Status: ACTIVE — current primary design risk.**

The structural Learning Model exists, but science-derived permanent learning principles have not yet been established. Implementing the next major learning mechanism before resolving this could lock the product into feature conventions rather than evidence-based learning design.

**Mitigation:** complete a bounded evidence review and derive a minimal set of permanent TheraLearn Learning Principles before selecting the next implementation seam.

### R3 – MVP implementation integration gap

**Status: ACTIVE but temporarily deferred.**

The current implementation is fragmented across hardcoded curriculum, local quiz data/state, browser-local progress, Supabase auth/data structures, and a missing flashcard product flow.

**Mitigation:** resume implementation-gap prioritization after science-derived learning principles are established and the MVP boundary is checked for any required adjustment.

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

Conduct a bounded Learning Science Evidence Review and derive candidate TheraLearn Learning Principles.

The review must prioritize high-quality scientific evidence and answer, for each candidate principle:

- What learning outcome does the evidence support?
- How strong and generalizable is the evidence?
- What boundary conditions or known limitations matter?
- What learner behavior should TheraLearn encourage?
- What product mechanism classes could implement the principle?
- Is the principle foundational, conditional, or deferred?
- Does it affect the current MVP boundary, or only post-MVP product evolution?

Initial candidate areas:

1. retrieval practice;
2. spacing / distributed practice;
3. feedback / correction;
4. interleaving;
5. cognitive load and worked examples;
6. self-explanation / elaboration;
7. metacognition / calibration;
8. transfer and application.

The goal is not to maximize the number of principles. The goal is the smallest coherent set with strong enough evidence to guide product architecture.

---

## Next Allowed Action

Perform the external scientific evidence review read-only, beginning with systematic reviews, meta-analyses, and major peer-reviewed evidence syntheses for the candidate areas above.

Do not modify `LEARNING_MODEL.md`, `mvp.md`, or product code yet.

Produce an evidence matrix that separates evidence strength, boundary conditions, proposed TheraLearn principle, possible product mechanisms, and MVP relevance.

Then determine the minimal science-derived principle set and synchronize `PROJECT_CONTROL.md` before transferring any principle into permanent product authority.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
