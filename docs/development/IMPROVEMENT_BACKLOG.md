# Improvement Backlog

> Version: 1.0
>
> Status: Active
>
> Last Updated: 2026-08-12

---

## Purpose

This backlog tracks verified improvement items for the TheraLearn project and the Documentation Tool / Developer Toolkit.

It records the current classification of existing backlog items against current repository evidence. It does not reconstruct historical milestone chronology or assign future implementation versions without an explicit Project Control decision.

Current source code and configuration are authoritative for implemented capabilities. `docs/development/DOCUMENTATION_TOOL_ROADMAP.md` owns current Toolkit development direction. `PROJECT_CONTROL.md` owns current prioritization and authorization.

---

## Status Model

| Status | Meaning |
|---|---|
| Done | The described capability is implemented and verified by current repository evidence. |
| Partially Implemented | Current evidence verifies part of the described capability, while a meaningful remainder is not implemented or remains a future candidate. |
| Candidate | The item remains a legitimate future improvement area, but implementation is not currently authorized by this backlog. |
| Superseded | The item in its existing form has been replaced or invalidated by a newer authoritative decision or model. |
| Unresolved | Current repository evidence is insufficient to classify the item safely. |

---

## Priority Rule

Historical priority values are retained only as properties of the existing backlog items. They do not authorize implementation.

Current project priority and Next Allowed Action are owned by `PROJECT_CONTROL.md`.

---

## Version Assignment Rule

The previous backlog assigned items to a linear `v0.2` through `v1.0` sequence.

That sequence is no longer authoritative implementation state. Current implementation did not follow it strictly, and the synchronized Documentation Tool roadmap requires any future version assignment to be established by a new explicit versioning decision.

No historical completion dates or replacement version numbers are inferred here.

---

## Backlog

| ID | Historical Priority | Area | Description | Current Classification | Evidence / Current Scope |
|---|---|---|---|---|---|
| IB-001 | High | Documentation | Register and resolve `metadataBase` warning. | Unresolved | Current `app/layout.tsx` does not define `metadataBase`, but no new complete build has been run after the documentation-repair commits. Current evidence therefore does not establish whether the historical warning still occurs. |
| IB-002 | High | Verify | Extend project verification with additional checks. | Partially Implemented | Current `verify` orchestration includes build, documentation-structure, and Git-status verification with a combined summary. Stronger verification and metadata validation remain candidate future areas in the current roadmap. |
| IB-003 | High | Versioning | Introduce Documentation Tool milestone versioning. | Superseded | The old linear milestone/version model is no longer authoritative. The Toolkit still reports its configured tool version, but future milestone/version assignments require a new explicit versioning decision. |
| IB-004 | Medium | CLI | Add project version reporting to the CLI. | Candidate | The CLI reports Documentation Tool name, version, and status. No separate project-version reporting capability is verified in current implementation. |
| IB-005 | Medium | Templates | Implement document template generation. | Candidate | Template paths and document types exist in configuration, but no current template-generation command or core capability is verified. Template generation remains a roadmap candidate. |
| IB-006 | Medium | Search | Add documentation search and indexing. | Partially Implemented | Project search is implemented through the `search` command. Documentation indexing/navigation beyond current project search remains a roadmap candidate. |
| IB-007 | Medium | Statistics | Generate documentation statistics and coverage reports. | Candidate | No current Toolkit capability for documentation statistics or coverage reporting is verified. The area remains a roadmap candidate. |
| IB-008 | High | Developer Toolkit | Introduce developer commands for verification, status, file inspection, editor workflows, replacement, clipboard support, and search. | Done | Current CLI implements `verify`, `status`, `file`, `edit`, `replace`, `copy`, and `search` together with `help` and `check`. The historical proposed `open` wording is superseded by the implemented controlled editor workflows. |
| IB-009 | Medium | Project Intelligence | Detect missing documentation, broken references, and orphan files. | Candidate | Current documentation verification checks required structure, but no complete project-intelligence capability for missing documentation, broken references, and orphan files is verified. These checks remain roadmap candidates. |
| IB-010 | High | Developer Assistant | Evolve Documentation Tool into a complete Developer Assistant. | Partially Implemented | A substantial Developer Toolkit already exists with controlled project operations, verification, Git status, file workflows, clipboard support, search, and structured output. Broader Developer Assistant capabilities remain an intentionally undefined future candidate rather than a verified completed state. |

---

## Current Interpretation

The backlog is a classification and candidate register, not an implementation authority.

`Done` records verified current implementation. `Partially Implemented` separates verified existing capability from remaining candidate scope. `Candidate` records a legitimate improvement area without authorizing work. `Superseded` prevents obsolete historical planning models from being treated as current direction. `Unresolved` prevents unsupported conclusions when current evidence is insufficient.

No item in this backlog authorizes Toolkit feature expansion while the current project phase remains documentation repair and synchronization.

---

## Maintenance Rule

Backlog classifications must be updated when verified current evidence materially changes them.

Future priorities, version assignments, and implementation authorization must come through Project Control and the authoritative Documentation Tool roadmap rather than being inferred from historical backlog sequencing.
