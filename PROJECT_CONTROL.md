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

The bounded external learning-science synthesis is complete. All five candidate principles have now completed individual certification. Product implementation remains paused while the individually surviving principles undergo final minimum-set coherence testing before any permanent product-authority transfer.

The current `LEARNING_MODEL.md` remains unchanged.

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
- bounded Adaptive Guidance certification: `b31c28559bf489f2b6c9400d727a27cce3f0dc2e`.

Implementation selection remains deferred until the Learning Science Evidence Review is complete.

A new complete local build/TypeScript/documentation verification has not yet been run after the documentation-only repair sequence.

---

## Historical Reconstruction Status

**Status: No historical chat recovery currently authorized**

External scientific evidence remains the authority for this review. Historical project chats are not a substitute for scientific evidence.

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

**Status: INDIVIDUAL PRINCIPLE CERTIFICATION COMPLETE; FINAL MINIMUM-SET COHERENCE TEST PENDING**

### Candidate classifications

1. **Active Retrieval Principle — NARROWED; individual certification complete**
2. **Distributed Relearning Principle — NARROWED; individual certification complete**
3. **Informative Correction Principle — NARROWED; individual certification complete**
4. **Adaptive Guidance Principle — NARROWED; individual certification complete**
5. **Objective-Aligned Demonstration Principle — NARROWED; individual certification complete**

Conditional mechanisms remain:

- self-explanation / elaboration;
- interleaving;
- metacognition / calibration.

### Active Retrieval Principle

> When durable retention of previously acquired knowledge is an intended learning outcome, learners should be required to actively retrieve relevant knowledge from memory at appropriate points in the learning process, rather than relying primarily on passive re-exposure.

### Distributed Relearning Principle

> When durable retention requires repeated learning opportunities, those opportunities should be distributed across time rather than unnecessarily massed, with spacing determined in relation to the intended retention horizon and relevant learning conditions.

### Informative Correction Principle

> When a learner attempt reveals an error, misconception, or material gap relevant to the learning objective, the learning process should provide sufficient information and opportunity to support correction, with the form and timing of that information determined by the task, learner state, and learning conditions.

### Adaptive Guidance Principle

> During acquisition of sufficiently complex or unfamiliar material, instructional support should be matched to the learner's relevant prior knowledge and the demands of the task so that unnecessary cognitive burden is limited, with support reduced, changed, or removed as greater independent performance becomes appropriate.

### Demonstrated Understanding Principle certification result

**Decision: NARROW**

The original candidate name and formulation were too broad because "understanding" is not a single directly observable learning state and because explanation, discrimination, inference, application, and transfer are not interchangeable outcomes. Transfer evidence consistently shows that performance on practiced material does not guarantee performance on novel tasks and that transfer is strongly conditioned by prior knowledge, structural similarity, transfer distance, domain constraints, and the nature of the target task. Retrieval-practice transfer evidence is positive on average but also moderated, reinforcing that successful recall cannot be treated as universal evidence of broader competence.

The foundational requirement that survives is therefore not that every learner must always explain or apply material, nor that TheraLearn should infer a generic mastery state. It is that evidence used to claim learning should match the learning objective. If the intended objective is recall, appropriate retrieval performance may be sufficient evidence. If the intended objective requires discrimination, explanation, inference, application, or transfer, then evidence of learning must require performance that samples that target capability rather than treating recall or confidence as a proxy.

Self-explanation remains a conditional learning mechanism: it can support learning and transfer under suitable conditions, but it is neither necessary nor sufficient as the universal demonstration format.

The bounded formulation that survives certification is:

> **Objective-Aligned Demonstration Principle:** Claims that a learner has achieved a learning objective should be supported by observable performance aligned with that objective; when the objective extends beyond recall, evidence should sample the relevant explanation, discrimination, inference, application, or transfer capability rather than infer it from recall or subjective confidence alone.

This formulation:

- preserves the distinction between retention and broader competence;
- does not claim that far transfer is automatic or generally easy;
- keeps transfer distance, task/domain similarity, prior knowledge, assessment format, and target competence as boundary conditions;
- does not require every learning interaction to include explanation, application, or transfer;
- keeps self-explanation as a conditional mechanism rather than making it a universal principle;
- remains independent of a particular quiz format, assessment type, mastery threshold, grading model, analytics system, or UI;
- remains distinct from Active Retrieval because retrieval is a learning action and retention mechanism, whereas objective-aligned demonstration governs what evidence is sufficient for a particular learning claim;
- remains distinct from Adaptive Guidance because guidance governs support during acquisition, whereas demonstration governs evidence relative to the intended outcome;
- does not by itself add a comprehensive mastery/competence system to the MVP boundary. The current MVP requires basic results/progress, not generalized mastery certification. Any stronger MVP assessment requirement would require an explicit scope decision after final principle certification.

**Certification status:** `NARROW`. The renamed Objective-Aligned Demonstration Principle is retained as the current certified candidate for final minimum-set coherence testing.

---

## Candidate Minimal Principle Set

The individually surviving working set is:

1. **Active Retrieval Principle** — learner action for durable retention.
2. **Distributed Relearning Principle** — temporal distribution of repeated learning opportunities.
3. **Informative Correction Principle** — repair of learning-relevant errors and gaps revealed by performance.
4. **Adaptive Guidance Principle** — expertise- and task-sensitive instructional support during acquisition.
5. **Objective-Aligned Demonstration Principle** — evidence requirements aligned to the intended learning objective.

All five have completed individual certification with status `NARROW`. This does **not** yet establish that all five belong in permanent authority. The complete set must now pass minimum-set coherence testing for overlap, necessity, coverage, interaction, and derivational usefulness.

---

## Evidence Standard

A candidate learning principle must not become permanent TheraLearn authority merely because it is popular, intuitive, or present in another learning product.

A permanent principle must:

- express a learning requirement rather than a UI or feature convention;
- claim no broader scope than the evidence supports;
- preserve material boundary conditions;
- avoid unnecessary duplication with another principle;
- derive meaningful product behavior without prescribing one mechanism;
- occupy a necessary role in the smallest coherent learning architecture.

---

## Current Risks

### R1 – Product domain authority gap

**Status: CLOSED for minimal MVP assessment.**

### R2 – Learning-science authority gap

**Status: ACTIVE — narrowed to final minimum-set certification.**

All five candidates have survived individual review only after narrowing. Individual evidence sufficiency does not prove that all five are jointly necessary or optimally separated.

**Mitigation:** perform final minimum-set coherence testing before any permanent product-authority transfer.

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

Do not modify `docs/product/LEARNING_MODEL.md`, `docs/product/mvp.md`, or product code yet.

---

## Current Task

Perform **Final Minimum-Set Coherence Testing** on the five individually surviving principles.

Test the set as a system rather than five independent claims:

1. **Coverage:** does the set cover the minimum learning architecture required by the evidence without a material gap?
2. **Independence:** does each principle govern a distinct learning requirement?
3. **Necessity:** would removal of any principle leave a meaningful science-derived design gap?
4. **Overlap:** can any principles be merged without losing important boundary conditions or derivational clarity?
5. **Interaction:** are relationships between acquisition, retrieval, correction, temporal distribution, and objective-aligned evidence coherent without implying a rigid universal sequence?
6. **Mechanism independence:** does the set remain neutral among valid product implementations?
7. **MVP impact:** which principles constrain the existing MVP and which would require an explicit future scope decision?

The target remains the **smallest coherent set**, not preservation of five principles by default.

---

## Next Allowed Action

Perform the **Final Minimum-Set Coherence Test**.

For each surviving principle, run an omission test and a pairwise-overlap test. Then determine the final set and classify each principle as **RETAIN**, **MERGE**, or **REMOVE** for permanent-authority transfer.

Do not transfer the principles into `docs/product/LEARNING_MODEL.md` yet. After the final set is determined, synchronize `PROJECT_CONTROL.md` with the certification result before any product-authority transfer.

No historical chat recovery is authorized for this task.

---

## Update Rule

`PROJECT_CONTROL.md` must be updated whenever a verified change materially alters current phase, current task, Next Allowed Action, implementation baseline, verification state, known risks, documentation-repair progress, or code-change permission.

Historical detail should not accumulate here unless required to understand current state.
