# Documentation Tool Roadmap

> Version: 1.0
>
> Status: Active
>
> Last Updated: 2026-08-12

---

## Purpose

This roadmap owns the current development direction of the TheraLearn Documentation Tool / Developer Toolkit.

It records verified implemented capabilities and future development areas that remain candidates for later prioritization.

It does not define project methodology. Project methodology and workflow authority belong in the root control documents and Foundation documentation. The Toolkit implements and supports that workflow.

---

## Current Role

The Developer Toolkit is an internal development interface for TheraLearn.

Its current role is to make recurring project operations more deterministic, reviewable, and efficient by providing controlled commands for inspection, verification, editing support, search, Git status, and clipboard-oriented workflow support.

The implementation under `tools/docs/` together with the `scripts/dev` launcher is authoritative for what the Toolkit currently does.

---

## Verified Current Capabilities

The current CLI exposes these implemented commands:

- `help` — show available commands;
- `check` — check documentation structure;
- `verify` — run project verification;
- `status` — show current project and Git status;
- `file <file-path>` — print complete file contents;
- `edit <file-path>` — open an existing file without changing its contents;
- `replace <file-path>` — clear an existing file and open it for replacement;
- `copy <file-path>` — copy complete file contents to the clipboard;
- `search <query>` — search the project and report matching files with line numbers.

The `scripts/dev` launcher executes the CLI from the project root and automatically copies command output to the clipboard for commands other than `copy`.

Current verification orchestration includes:

- project build verification;
- documentation structure verification;
- Git status verification;
- a combined verification summary.

These capabilities are current implementation facts. They are not future roadmap promises.

---

## Roadmap State Rule

The previous roadmap used a linear version sequence in which Verification, Templates, Search, Statistics, Developer Toolkit, Project Intelligence, and Developer Assistant were assigned successive milestone numbers.

Current repository evidence shows that implementation has not followed that sequence strictly. In particular, Developer Toolkit commands and project search already exist while some earlier planned areas remain incomplete or unverified.

The roadmap therefore no longer treats the old version sequence as authoritative implementation state.

A roadmap item may be described as implemented only when current repository evidence verifies it.

Future version numbers must not be inferred from the old sequence without a new explicit versioning decision.

---

## Current Development Areas

### Implemented foundation

The following areas have verified current implementation:

- CLI command routing and help;
- documentation structure checking;
- combined project verification orchestration;
- project and Git status reporting;
- file inspection;
- controlled editor-opening workflows;
- replacement workflow support;
- clipboard support;
- project search;
- structured output support around Developer Toolkit operations.

### Candidate future areas

The following areas remain legitimate roadmap candidates from the existing development direction, but their exact scope, priority, and version assignment are not established by this document:

- stronger project verification and metadata validation;
- document template generation;
- documentation indexing/navigation beyond current project search;
- documentation statistics and coverage reporting;
- project-intelligence checks such as missing documentation, broken references, and inconsistencies;
- broader Developer Assistant capabilities.

Each candidate must pass normal Project Control prioritization and verification before implementation.

---

## Current Priority

The current project phase is documentation repair and synchronization, not Toolkit feature expansion.

Therefore this roadmap does not authorize implementation of any candidate future capability.

The immediate Toolkit-related priority is documentation synchronization: development documentation must accurately describe the capabilities that already exist before additional tooling work is selected.

Any future Toolkit implementation requires authorization through `PROJECT_CONTROL.md`.

---

## Success Criteria

The Toolkit should continue to support the project by making recurring development operations:

- easier to inspect;
- safer to execute;
- easier to verify;
- less dependent on fragile manual procedures;
- consistent with established project workflow;
- traceable to current implementation and authoritative documentation.

Success does not require every historical roadmap idea to be implemented.

---

## Authority Boundary

This roadmap owns Toolkit development direction.

It does not own:

- project methodology or Foundation principles;
- current project phase or Next Allowed Action;
- detailed implementation truth;
- historical milestone claims that cannot be verified from current authority.

For those concerns, use respectively:

- `PROJECT_HANDBOOK.md`, `PROJECT_OVERVIEW.md`, and Foundation documentation for methodology and stable authority;
- `PROJECT_CONTROL.md` for current project state and authorization;
- source code and configuration for implemented behavior;
- Git history or bounded historical evidence only when explicitly required.
