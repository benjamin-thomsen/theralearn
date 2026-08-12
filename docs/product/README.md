# TheraLearn – Product Documentation

## Purpose

This directory owns detailed permanent product knowledge for TheraLearn.

It does not own stable project identity, current workflow state, architecture, or implementation facts. Product information must be placed in the document that owns that responsibility rather than copied across multiple files.

---

## Authority Boundary

Use the following authority routing:

- `PROJECT_OVERVIEW.md` — stable project identity and high-level product direction;
- `docs/product/PRODUCT_VISION.md` — detailed permanent product vision;
- `docs/product/LEARNING_MODEL.md` — permanent learning model and verified learning mechanisms;
- `docs/product/mvp.md` — durable MVP scope and product acceptance boundary;
- `PROJECT_CONTROL.md` — current phase, current task, risks, code-change permission, and Next Allowed Action.

This `README.md` owns product-domain navigation and placement rules. It must not become a duplicate product specification.

---

## Product Document Ownership

### `PRODUCT_VISION.md`

Owns detailed product vision that is more specific than the stable high-level direction in `PROJECT_OVERVIEW.md`.

Product vision should describe durable product intent. It must not contain temporary implementation status or current project-control state.

### `LEARNING_MODEL.md`

Owns the permanent learning model: how TheraLearn is intended to support learning and how verified learning mechanisms relate to one another.

It must not derive learning principles from implementation merely because a feature already exists.

### `mvp.md`

Owns durable MVP scope and the product acceptance boundary for what constitutes the MVP.

Current implementation progress and the next authorized development action remain in `PROJECT_CONTROL.md`.

---

## Deferred Placeholder Classification

The following existing placeholders are not currently established as independent authorities:

- `feature-catalog.md`;
- `release-plan.md`;
- `roadmap.md`;
- `target-users.md`;
- `vision.md`;
- `learning-philosophy.md`.

`vision.md` overlaps with the responsibility assigned to `PRODUCT_VISION.md`.

`learning-philosophy.md` overlaps with the responsibility assigned to `LEARNING_MODEL.md`.

The remaining deferred concepts may later belong inside one of the established product authorities or may justify a separate document if a distinct durable responsibility is demonstrated.

Their current existence does not authorize population or deletion.

---

## Placement Rule

Before adding permanent product information:

1. identify the information responsibility;
2. place it in its single authoritative owner;
3. reference that owner from other documents when necessary;
4. do not maintain independent copies of the same product fact;
5. do not populate an empty placeholder merely because the file exists.

If a required product fact cannot be established from current authoritative documentation or verified implementation evidence, the evidence gap must be made explicit before historical recovery is considered.

---

## Current State

This document does not own current project status.

For the current phase, current task, risks, code-change permission, and Next Allowed Action, read `PROJECT_CONTROL.md`.
