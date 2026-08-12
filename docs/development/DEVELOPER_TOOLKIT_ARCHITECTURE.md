# Developer Toolkit Architecture

> Version: 0.1
>
> Status: Active
>
> Last Updated: 2026-08-04

---

# Purpose

This document defines the overall architecture of the TheraLearn Developer Toolkit.

The architecture ensures that every command follows the same execution flow, remains easy to understand, and can evolve without introducing unnecessary complexity.

The primary goal is to accelerate MVP development through consistent, reliable developer workflows.

---

# Architectural Principles

The Developer Toolkit follows these principles:

- Design before implementation
- Architecture before code
- One command = one responsibility
- One layer = one responsibility
- Shared functionality belongs in Core
- Commands should remain deterministic
- Verify every change

---

# High-Level Architecture

```text
scripts/dev
    │
    ▼
cli.ts
    │
    ▼
commands/
    │
    ▼
core/
    ├── validation/
    ├── filesystem/
    ├── editor/
    └── output/
```

Each layer has a single responsibility.

Dependencies always flow downward.

---

# Execution Flow

Every Toolkit command follows the same execution pattern:

```text
User
    │
    ▼
scripts/dev
    │
    ▼
CLI
    │
    ▼
Command
    │
    ▼
Core Workflow
    │
    ▼
Validation
    │
    ▼
Filesystem / Editor
    │
    ▼
Output
```

This predictable flow makes commands easy to implement, test and maintain.

---

# Layer Responsibilities

## Launcher

Responsible for:

- starting the Toolkit
- forwarding arguments
- providing a single developer entry point

Implementation:

```text
scripts/dev
```

---

## CLI

Responsible for:

- parsing arguments
- selecting commands
- handling exit codes

Implementation:

```text
tools/docs/cli.ts
```

---

## Commands

Responsible for coordinating one developer action.

Examples:

```text
verify.ts
file.ts
edit.ts
replace.ts
```

Commands should remain small and contain no business logic.

---

## Core

Responsible for implementing command workflows.

Examples:

```text
runVerification.ts
runFile.ts
runEdit.ts
runReplace.ts
```

---

## Shared Components

Reusable infrastructure includes:

- validation
- filesystem
- editor
- output

These components should never depend on individual commands.

---

# Dependency Rules

Allowed:

```text
Launcher
→ CLI
→ Commands
→ Core
→ Shared Components
```

Not allowed:

```text
Core
→ Commands

Commands
→ CLI

Shared Components
→ Commands

Circular dependencies
```

---

# Success Criteria

The architecture is successful when it:

- keeps commands simple
- isolates responsibilities
- minimizes coupling
- maximizes reuse
- supports future automation
- accelerates MVP development