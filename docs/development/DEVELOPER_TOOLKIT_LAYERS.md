# Developer Toolkit Layers

> Version: 0.1
>
> Status: Active
>
> Last Updated: 2026-08-04

---

# Purpose

This document defines the internal software architecture of the Developer Toolkit.

Rather than placing implementation directly inside CLI commands, the Toolkit is divided into architectural layers.

Each layer has a single responsibility.

This separation keeps the Toolkit maintainable, testable and scalable.

---

# Layer Overview

```text
Launcher
    │
    ▼
CLI
    │
    ▼
Commands
    │
    ▼
Core Workflows
    │
    ▼
Shared Components
```

Dependencies always flow downward.

---

# Launcher Layer

## Responsibility

The Launcher is the public entry point for developers.

Responsibilities:

- start the Toolkit
- forward command-line arguments
- provide one consistent entry point

Implementation:

```text
scripts/dev
```

---

# CLI Layer

## Responsibility

The CLI dispatches commands.

Responsibilities:

- parse arguments
- validate command names
- dispatch commands
- return exit codes

Implementation:

```text
tools/docs/cli.ts
```

The CLI contains no business logic.

---

# Command Layer

## Responsibility

Commands coordinate one developer action.

Examples:

```text
verify.ts
file.ts
edit.ts
replace.ts
```

Responsibilities:

- validate command input
- call one workflow
- return success or failure

Commands should remain small.

---

# Core Workflow Layer

## Responsibility

Core workflows implement Toolkit behavior.

Examples:

```text
runVerification.ts
runFile.ts
runEdit.ts
runReplace.ts
```

Responsibilities:

- coordinate shared components
- execute workflows
- return structured results

Most Toolkit logic belongs here.

---

# Shared Components Layer

## Responsibility

Reusable infrastructure shared across all workflows.

Examples:

```text
validation/
filesystem/
editor/
output/
```

Responsibilities:

- validation
- filesystem operations
- editor integration
- output formatting

Shared components must never depend on individual commands.

---

# Dependency Rules

Allowed:

```text
Launcher
→ CLI
→ Commands
→ Core Workflows
→ Shared Components
```

Not allowed:

```text
Shared Components
→ Core Workflows

Core Workflows
→ Commands

Commands
→ CLI

Circular dependencies
```

---

# Design Principles

Each layer should:

- have one responsibility
- remain independently testable
- remain reusable
- remain deterministic

---

# Benefits

This architecture provides:

- simpler commands
- reusable workflows
- reusable shared components
- cleaner testing
- easier maintenance
- lower coupling
- scalable architecture
- support for future automation

---

# Success Criteria

The layer architecture is successful when:

- responsibilities remain separated
- dependencies remain one-directional
- commands remain small
- workflows remain reusable
- shared components remain generic
- new commands can be added with minimal effort