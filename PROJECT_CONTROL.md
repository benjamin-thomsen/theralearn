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

The bounded external learning-science synthesis, all five individual principle certifications, and the final minimum-set coherence test are complete.

The final science-derived principle set has been determined but has not yet been transferred into permanent product authority. Product implementation remains paused. The current `LEARNING_MODEL.md` remains unchanged pending bounded authority transfer.

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
- Learning Science Evidence Review opened: `2bb3b9e90914c0e29ed10c6a4fd4be81639b2fd6`;
- initial learning-science evidence synthesis recorded: `3376c32820c0e023cc0a876df74a250afa90791a`;
- bounded Active Retrieval certification: `2d9e817b95dfa911eacb886f94e4131ae8af8222`;
- bounded Distributed Relearning certification: `5948d31137414b8b697e9b7e674fb4e76f012325`;
- bounded Informative Correction certification: `8b81b73ee1f10dd7b8e07ac3b0264ba33b764e43`;
- bounded Adaptive Guidance certification: `b31c28559bf489f2b6c9400d727a27cce3f0dc2e`;
- bounded Objective-Aligned Demonstration certification: `d62d4c950150ab0dbb569d5f0b7dc90d16387550`.

Implementation selection remains deferred until science-derived product authority is transferred and the MVP boundary is explicitly checked against it.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Historical Reconstruction Status

**Status: No historical chat recovery currently authorized**

External scientific evidence remains the authority for this review. Historical project chats are not a substitute for scientific evidence.

---

## Product Authority Status

**Status: FINAL SCIENCE-DERIVED PRINCIPLE SET CERTIFIED; PERMANENT PRODUCT-AUTHORITY TRANSFER PENDING**

Established authorities remain:

- `docs/product/README.md`;
- `docs/product/PRODUCT_VISION.md`;
- `docs/product/LEARNING_MODEL.md`;
- `docs/product/mvp.md`.

The certified learning principles are not yet permanent authority until transferred into the product-authority layer.

---

## Final Learning Principle Certification

**Status: FINAL MINIMUM-SET COHERENCE TEST PASSED**

All five individually surviving principles were tested as a system for coverage, independence, necessity, overlap, interaction, mechanism independence, and MVP impact.

### Final classifications

1. **Active Retrieval Principle — RETAIN**
2. **Distributed Practice Principle — RETAIN**
3. **Informative Correction Principle — RETAIN**
4. **Adaptive Guidance Principle — RETAIN**
5. **Objective-Aligned Demonstration Principle — RETAIN**

No pair can be merged without losing a distinct learning requirement or obscuring important boundary conditions. No principle can be removed without leaving a material gap in the science-derived learning architecture.

The former candidate name **Distributed Relearning Principle** is normalized to **Distributed Practice Principle** in the final set because the certified principle governs temporal distribution of repeated learning opportunities and does not require retrieval inside its own definition. This avoids terminological overlap with Active Retrieval while preserving the certified content.

### Final certified formulations

> **Active Retrieval Principle:** When durable retention of previously acquired knowledge is an intended learning outcome, learners should be required to actively retrieve relevant knowledge from memory at appropriate points in the learning process, rather than relying primarily on passive re-exposure.

> **Distributed Practice Principle:** When durable retention requires repeated learning opportunities, those opportunities should be distributed across time rather than unnecessarily massed, with spacing determined in relation to the intended retention horizon and relevant learning conditions.

> **Informative Correction Principle:** When a learner attempt reveals an error, misconception, or material gap relevant to the learning objective, the learning process should provide sufficient information and opportunity to support correction, with the form and timing of that information determined by the task, learner state, and learning conditions.

> **Adaptive Guidance Principle:** During acquisition of sufficiently complex or unfamiliar material, instructional support should be matched to the learner's relevant prior knowledge and the demands of the task so that unnecessary cognitive burden is limited, with support reduced, changed, or removed as greater independent performance becomes appropriate.

> **Objective-Aligned Demonstration Principle:** Claims that a learner has achieved a learning objective should be supported by observable performance aligned with that objective; when the objective extends beyond recall, evidence should sample the relevant explanation, discrimination, inference, application, or transfer capability rather than infer it from recall or subjective confidence alone.

### Omission test

- Removing **Active Retrieval** would permit durable-retention design based primarily on passive re-exposure despite strong contrary evidence.
- Removing **Distributed Practice** would leave no principle governing temporal distribution of repeated learning opportunities.
- Removing **Informative Correction** would allow learning-relevant errors to be exposed without a requirement for sufficient repair information or opportunity.
- Removing **Adaptive Guidance** would leave acquisition support unguided by learner expertise and task demands, risking both under-guidance and persistent over-scaffolding.
- Removing **Objective-Aligned Demonstration** would allow product claims about learning to rely on proxies such as recall or confidence even when the objective requires broader performance.

Each omission leaves a distinct design gap.

### Pairwise overlap test

- **Active Retrieval × Distributed Practice:** complementary but independent — memory action versus timing.
- **Active Retrieval × Informative Correction:** complementary but independent — eliciting performance versus repairing relevant errors.
- **Active Retrieval × Objective-Aligned Demonstration:** may use similar observable responses, but one governs learning action/retention and the other governs sufficiency of evidence for an objective.
- **Distributed Practice × Informative Correction:** timing and correction can interact, but neither subsumes the other.
- **Adaptive Guidance × Informative Correction:** both may provide information, but guidance structures support during acquisition while correction responds to performance-revealed errors or gaps.
- **Adaptive Guidance × Objective-Aligned Demonstration:** support conditions and evidence-of-achievement remain distinct.

No merge improves minimality without degrading conceptual clarity or boundary preservation.

### Coherent learning architecture

The final set defines five distinct responsibilities rather than a rigid universal sequence:

```text
Acquire with appropriate support
        ↓
Actively retrieve when durable retention is intended
        ↓
Correct learning-relevant errors and gaps
        ↓
Distribute repeated learning opportunities across time when durability requires repetition
        ↓
Use objective-aligned performance evidence for claims about learning
```

The arrows express a common derivational relationship, not a requirement that every objective or every learner interaction follow the same linear workflow. Valid mechanisms may combine principles where appropriate.

### Conditional mechanisms

The following remain conditional mechanisms rather than separate permanent principles:

- self-explanation / elaboration;
- interleaving;
- metacognition / calibration;
- worked examples and fading patterns;
- successive relearning as a combined realization of retrieval plus distribution;
- specific spaced-repetition schedules or algorithms.

### MVP impact

The final principle set does not automatically add new named MVP capabilities.

- Active Retrieval and Informative Correction can constrain the quality of existing flashcard/quiz interactions.
- Adaptive Guidance can constrain lesson/activity design without requiring an adaptive-learning system.
- Distributed Practice establishes a durable product requirement for repeated-learning timing where durability requires repetition, but the current MVP explicitly excludes spaced repetition and prescribed repetition intervals; whether the principle requires an MVP scope change must therefore be decided explicitly after authority transfer rather than silently assumed.
- Objective-Aligned Demonstration constrains claims about learning and progress; it does not by itself require a comprehensive mastery or competence system in the MVP.

The existing MVP boundary remains unchanged at this certification checkpoint.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for minimal MVP assessment.**

### R2 – Learning-science authority gap

**Status: ACTIVE — scientific principle certification complete; authority transfer pending.**

The final minimum set is certified, but the current `LEARNING_MODEL.md` does not yet contain it.

**Mitigation:** perform a bounded authority transfer that preserves the existing structural learning model while adding the certified science-derived principles in their permanent product home.

### R3 – MVP implementation integration gap

**Status: ACTIVE but temporarily deferred.**

### R4 – Anomalous repository artifact

**Status: OPEN but not currently blocking.**

### R5 – Branch divergence

**Status: OPEN.**

No integration with `main` until a later verified decision.

---

## Code Change Gate

**Product implementation: PAUSED**

No product feature code changes are authorized.

Documentation/product-authority changes required for the certified learning-principle transfer are authorized.

Do not modify `docs/product/mvp.md` until the certified principles are transferred and their MVP implications are assessed explicitly.

---

## Current Task

Transfer the final certified Learning Principles into permanent product authority without replacing or corrupting the existing structural Learning Model.

The transfer must preserve:

- the existing structural hierarchy owned by `docs/product/LEARNING_MODEL.md`;
- the exact evidence-bounded principle formulations and boundary conditions;
- separation between principles and product mechanisms;
- separation between permanent Learning Model authority and current implementation/MVP state.

---

## Next Allowed Action

Read `docs/product/LEARNING_MODEL.md` in full and derive the smallest non-duplicative authority-transfer edit that integrates the five certified principles while preserving the existing structural model.

Do not change `docs/product/mvp.md` or product code during this transfer step.

After the Learning Model transfer is verified, synchronize `PROJECT_CONTROL.md` again and explicitly assess whether any certified principle requires a change to the current MVP acceptance boundary before implementation resumes.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
