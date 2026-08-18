# TheraLearn – Subject-Matter Intake & Objective Formation Architecture

## Purpose

This document owns the minimum architecture for the bounded Subject-Matter Intake & Objective Formation responsibility required by the NEW TheraLearn MVP.

It is downstream of:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/LEARNING_MODEL.md`
- `docs/product/mvp.md`

and upstream of:

- `docs/architecture/learning-science-engine.md`

It defines the minimum responsibility chain from Creator-provided subject matter to a Creator-accepted Learning Objective and bounded Relevant Context that can enter the existing verified Learning Science Engine.

It defines architectural responsibilities and authority boundaries.

It does not define implementation technology, database schema, persistence, concrete UI, generalized ingestion, autonomous course generation, or Learning Science Engine responsibilities.

The authority direction is:

    PRODUCT AUTHORITY
            ↓
    SUBJECT-MATTER INTAKE
    & OBJECTIVE FORMATION
            ↓
    ACCEPTED LEARNING OBJECTIVE
    + BOUNDED RELEVANT CONTEXT
            ↓
    LEARNING SCIENCE ENGINE
            ↓
    IMPLEMENTATION

Existing implementation must not determine this architecture.

---

## Architectural Scope

The existing Learning Science Engine begins from:

    LEARNING OBJECTIVE
            +
    RELEVANT CONTEXT

This architecture owns the bounded upstream responsibility required to establish those inputs.

The minimum chain is:

    CREATOR / CONTENT OWNER
            ↓
    BOUNDED SUBJECT-MATTER INPUT
            ↓
    SOURCE-MATERIAL EXTRACTION
            ↓
    TRACEABLE SOURCE MATERIAL
            ↓
    AI-ASSISTED OBJECTIVE ANALYSIS
            ↓
    PROPOSED LEARNING OBJECTIVE(S)
            ↓
    CREATOR REVIEW
       ↙       ↓       ↘
    CHANGE   REJECT   APPROVE
                        ↓
    ACCEPTED LEARNING OBJECTIVE
            +
    BOUNDED RELEVANT CONTEXT
            +
    SOURCE TRACEABILITY
                        ↓
    ARCHITECTURAL HANDOFF
                        ↓
    EXISTING LEARNING SCIENCE ENGINE

This architecture stops at that handoff.

It does not derive Learning Principles, Learning Requirements, Learning Mechanisms, Proposed Learning Designs, Approved Learning Designs, learner execution, or learner feedback/results.

Those responsibilities remain downstream.

---

## Core Authority Boundary

Subject-matter authority remains with the Creator / Content Owner.

The Creator / Content Owner owns:

- subject-matter truth;
- correctness;
- legitimacy;
- professional or academic content responsibility;
- whether the supplied material is appropriate to use;
- final acceptance of the Learning Objective derived from that material.

TheraLearn may assist with:

- bounded source-material intake;
- extraction of usable source material;
- source traceability;
- analysis of the supplied material;
- proposal of Learning Objective(s);
- support for Creator review;
- formation of bounded Relevant Context for downstream learning-design derivation.

TheraLearn must not convert an AI-generated interpretation into subject-matter authority.

The authority rule is:

    SOURCE MATERIAL
            ↓
    THERALEARN ANALYSIS
            ↓
    PROPOSAL
            ↓
    CREATOR AUTHORITY
            ↓
    ACCEPTED OBJECTIVE

Not:

    SOURCE MATERIAL
            ↓
    AI OUTPUT
            ↓
    AUTHORITATIVE OBJECTIVE

AI assistance is therefore advisory and transformational, not authoritative.

---

## Minimum Subject-Matter Input

The first MVP requires one bounded document-input workflow.

The architecture requires a Creator to provide one bounded source document containing legitimate subject matter from which a Learning Objective may be proposed.

The document is source material.

It is not itself a Learning Objective, Learning Design, course, curriculum, or learner experience.

The first bounded workflow does not imply support for arbitrary source systems or unrestricted ingestion.

The architectural responsibility is:

    CREATOR-PROVIDED DOCUMENT
            ↓
    BOUNDED SOURCE MATERIAL

For the first externally testable MVP, Product Authority fixes the supported document class as one bounded text-based PDF with machine-readable embedded text.

Size limits, upload mechanism, storage mechanism, extraction library, and persistence model remain implementation-derivation responsibilities.

The architecture permits the first implementation slice to support only the smallest document class required to prove the responsibility chain.

---

## Source-Material Extraction

A document must be transformed into source material that can be inspected and analyzed without silently changing its substantive meaning.

The minimum responsibility is:

    SOURCE DOCUMENT
            ↓
    EXTRACTION
            ↓
    EXTRACTED SOURCE MATERIAL

Extraction is not interpretation.

The extraction responsibility must preserve sufficient relationship to the original source to support later traceability.

Extraction failure, unsupported source material, or unavailable usable text must not silently produce authoritative objective proposals.

The architecture does not require OCR for the first MVP.

Scanned-document support, image interpretation, handwriting recognition, complex layout recovery, and generalized document understanding are deferred unless a later bounded implementation requirement proves them necessary.

---

## Source Traceability

A proposed Learning Objective must remain traceable to the source material that supports the proposal.

The minimum traceability chain is:

    SOURCE DOCUMENT
            ↓
    EXTRACTED SOURCE MATERIAL
            ↓
    SUPPORTING SOURCE BOUNDARY
            ↓
    PROPOSED LEARNING OBJECTIVE

Traceability must be sufficient for Creator review.

The Creator must be able to understand what supplied material the proposal was derived from.

Traceability does not require a specific citation format, database model, vector store, embedding system, page-coordinate system, or retrieval architecture.

Those are implementation decisions.

The architecture requires the relationship, not a predetermined technical realization.

---

## AI-Assisted Objective Analysis

TheraLearn may use AI-assisted analysis to propose Learning Objective(s) from bounded source material.

The architectural role of AI is:

    SOURCE MATERIAL
            ↓
    AI-ASSISTED ANALYSIS
            ↓
    OBJECTIVE PROPOSAL

The AI output is a proposal.

It is not:

- subject-matter truth;
- Creator approval;
- an accepted Learning Objective;
- a Learning Design;
- a certified Learning Principle;
- learner-execution authority.

The AI-assisted analysis must remain bounded by the supplied source material and the objective-formation responsibility.

The AI must not autonomously expand the source into an unrestricted course, curriculum, certification scheme, or generalized teaching product.

Provider choice, model choice, prompt design, API design, Structured Outputs, evaluation implementation, retry behavior, token strategy, and cost controls belong to implementation derivation.

---

## Minimum Learning Objective Proposal

A proposed Learning Objective expresses an intended learner capability or outcome inferred from the bounded source material.

A proposal must be explicit enough for the Creator to review.

At minimum, the architecture must preserve:

1. the proposed Learning Objective;
2. the source material supporting the proposal;
3. proposal state distinct from Creator acceptance.

The proposal must not become downstream Learning Science Engine input merely because it was generated successfully.

The required boundary is:

    GENERATED / ASSISTED PROPOSAL
            ≠
    ACCEPTED LEARNING OBJECTIVE

Creator action is required.

---

## Multiple Objective Proposal Boundary

AI-assisted analysis may identify more than one plausible Learning Objective within a bounded source document.

This does not imply autonomous curriculum decomposition.

Where multiple objectives are proposed, each remains independently reviewable as a proposal.

The Creator determines which objective, if any, becomes accepted for the bounded handoff.

The first MVP does not require:

- automatic course structures;
- automatic chapter structures;
- automatic lesson structures;
- dependency graphs between objectives;
- prerequisite inference systems;
- competency frameworks;
- curriculum optimization.

Those capabilities require separate architectural justification.

---

## Creator Review

The Creator must be able to inspect a proposed Learning Objective before it becomes authoritative downstream input.

Creator review must preserve access to sufficient source traceability to evaluate the proposal against the supplied subject matter.

The minimum review relationship is:

    SOURCE MATERIAL
            +
    PROPOSED LEARNING OBJECTIVE
            ↓
    CREATOR REVIEW

The review responsibility is an authority boundary, not merely a presentation feature.

A proposal hidden from meaningful Creator review does not satisfy this architecture.

---

## Creator Change

The Creator may change a proposed Learning Objective.

A Creator-modified objective becomes a Creator-controlled candidate objective.

A change must not falsely retain source-grounding claims that no longer support the modified objective.

The architecture therefore requires:

    PROPOSAL
        ↓
    CREATOR CHANGE
        ↓
    SOURCE-GROUNDING REASSESSMENT
        ↓
    REVIEWABLE CANDIDATE

The exact technical mechanism for reassessment is deferred.

The architectural requirement is that stale traceability must not be silently preserved after a material change.

---

## Creator Rejection

The Creator may reject a proposed Learning Objective.

Rejection means the proposal cannot become the handoff authority for downstream Learning Science Engine derivation.

    PROPOSED OBJECTIVE
            ↓
        REJECTED
            ↓
    NO DOWNSTREAM HANDOFF

Rejection does not require deletion of source material or historical proposal information.

Persistence and audit-history behavior are implementation decisions.

---

## Creator Approval and Objective Acceptance

Creator approval transforms a reviewable candidate into an Accepted Learning Objective for the bounded workflow.

The required lifecycle is:

    PROPOSED
        ↓
    CREATOR REVIEW
        ↓
    CHANGE / REJECT / APPROVE

Approval establishes:

    ACCEPTED LEARNING OBJECTIVE

The following path is prohibited:

    AI PROPOSAL
        ↓
    LEARNING SCIENCE ENGINE

The required path is:

    AI PROPOSAL
        ↓
    CREATOR REVIEW
        ↓
    CREATOR ACCEPTANCE
        ↓
    LEARNING SCIENCE ENGINE

Creator acceptance is therefore the subject-matter authority gate between objective formation and downstream learning-design derivation.

---

## Bounded Relevant Context Formation

The Learning Science Engine requires both:

    LEARNING OBJECTIVE
            +
    RELEVANT CONTEXT

This architecture must therefore provide a bounded Relevant Context together with the Accepted Learning Objective.

Relevant Context contains only information legitimately required to allow the downstream Learning Science Engine to evaluate the objective in context.

It must not become:

- an unrestricted learner profile;
- a generalized course specification;
- a hidden Learning Design;
- duplicated Learning Science reasoning;
- a mechanism-selection instruction.

Relevant Context may include bounded information derived from or explicitly provided around the source material when that information is relevant to downstream derivation.

The exact minimum fields belong to implementation-slice derivation.

The architectural requirement is that Relevant Context remains explicit, bounded, reviewable where subject-matter authority is implicated, and separate from the Learning Objective itself.

---

## Handoff Contract

The output of this architecture is the minimum authoritative handoff to the existing Learning Science Engine.

The handoff contains:

1. Accepted Learning Objective;
2. bounded Relevant Context;
3. source traceability sufficient to preserve the relationship to Creator-provided subject matter.

Conceptually:

    {
      Accepted Learning Objective
      Bounded Relevant Context
      Source Traceability
    }

            ↓

    LEARNING SCIENCE ENGINE

The existing Learning Science Engine remains responsible for consuming:

    LEARNING OBJECTIVE
            +
    RELEVANT CONTEXT

and deriving downstream scientific and learning-design responsibilities.

Source traceability accompanies the handoff for authority preservation.

It does not become a new scientific premise merely because it is present.

---

## Learning Science Engine Boundary

This architecture must not duplicate `docs/architecture/learning-science-engine.md`.

The boundary is:

    SUBJECT-MATTER INTAKE
    & OBJECTIVE FORMATION

    owns:

    SOURCE INPUT
    EXTRACTION
    SOURCE TRACEABILITY
    OBJECTIVE PROPOSAL
    CREATOR OBJECTIVE REVIEW
    OBJECTIVE CHANGE
    OBJECTIVE REJECTION
    OBJECTIVE ACCEPTANCE
    BOUNDED RELEVANT CONTEXT FORMATION

            ↓

    HANDOFF

            ↓

    LEARNING SCIENCE ENGINE

    owns:

    APPLICABILITY REASONING
    CERTIFIED PRINCIPLE REFERENCES
    LEARNING REQUIREMENTS
    MECHANISM PROPOSAL
    PROPOSED LEARNING DESIGN
    CREATOR LEARNING-DESIGN CONTROL
    APPROVED LEARNING DESIGN
    LEARNER EXECUTION
    PERFORMANCE
    FEEDBACK / RESULT

The same responsibility must not be independently implemented on both sides of the boundary.

---

## Scientific Authority Boundary

This architecture does not own Learning Principles.

Certified Learning Principles remain exclusively owned by:

`docs/product/LEARNING_MODEL.md`

Subject-Matter Intake & Objective Formation must not:

- invent a Learning Principle;
- choose a learning mechanism;
- perform downstream Learning Science applicability reasoning;
- attach scientific authority to an objective proposal;
- use AI output as scientific certification.

The objective-formation layer establishes what is intended to be learned.

The Learning Science Engine determines what certified learning science applies to that objective and context.

---

## AI Grounding and Evaluation Boundary

AI-assisted objective proposals require two different forms of validation to remain conceptually separate.

### Structural validity

The proposal may be checked deterministically for required structure and representation.

### Source grounding

The proposal must remain meaningfully supported by the supplied source material.

The architecture therefore distinguishes:

    SOURCE DOCUMENT
            ↓
    EXTRACTED SOURCE MATERIAL
            ↓
    AI OBJECTIVE PROPOSAL
            ↓
    STRUCTURAL VALIDATION
            ↓
    SOURCE-GROUNDING EVALUATION
            ↓
    CREATOR REVIEW
            ↓
    CHANGE / REJECT / APPROVE

Automated grounding evaluation may support quality assurance.

It must not replace Creator authority.

A structurally valid proposal may still be substantively wrong.

A source-grounded proposal may still be rejected by the Creator.

Creator acceptance remains the final subject-matter authority gate for the bounded handoff.

---

## Minimum Capability Set

The architecture requires capabilities sufficient to:

1. accept one bounded Creator-provided document;
2. extract usable source material;
3. preserve traceability to the supplied source;
4. analyze bounded source material for possible Learning Objective(s);
5. represent objective output as proposal rather than authority;
6. preserve source grounding for each proposal;
7. expose a proposal for Creator review;
8. support Creator change;
9. prevent stale grounding claims after material Creator change;
10. support Creator rejection;
11. support Creator approval;
12. distinguish proposed, rejected, and accepted objective state where required by the bounded workflow;
13. form bounded Relevant Context;
14. produce an Accepted Learning Objective + bounded Relevant Context;
15. preserve source traceability through the handoff;
16. prevent unaccepted objective proposals from becoming authoritative Learning Science Engine input.

These are architectural capabilities.

They are not implementation components.

---

## Minimum Responsibility Separation

The architecture requires logical separation between:

- document input;
- source extraction;
- source representation;
- source traceability;
- AI-assisted analysis;
- objective proposal;
- grounding evaluation;
- Creator review;
- Creator-controlled change;
- rejection;
- acceptance;
- Relevant Context formation;
- downstream handoff.

This does not require separate deployable services.

The smallest implementation structure that preserves these boundaries is preferred.

---

## Persistence Boundary

This architecture does not by itself require persistence.

Persistence may later be required to support the bounded Creator workflow, source traceability, review state, or handoff lifecycle.

If persistence is required, its architecture must preserve:

- Creator ownership;
- private access where appropriate;
- subject-matter authority;
- proposal versus accepted state;
- source traceability;
- downstream authority boundaries.

Existing database schema must not automatically define the new domain merely because it already exists.

Database tables, migrations, RLS policies, storage buckets, repository interfaces, and persistence lifecycle belong to implementation derivation.

No schema or migration change is authorized by this document.

---

## Document Storage Boundary

The architecture permits document storage where required by the bounded workflow.

It does not require a specific storage provider.

Any future implementation must preserve appropriate access control and Creator authority over supplied source material.

Storage must not silently make Creator-provided subject matter public or learner-accessible.

Retention, deletion, versioning, storage limits, and organization-level ownership are deferred unless required by the bounded implementation slice.

---

## Security and Privacy Boundary

Creator-provided source material may contain non-public or proprietary subject matter.

The architecture therefore requires implementation decisions to preserve appropriate confidentiality and access boundaries.

AI-assisted processing must not imply that API credentials or privileged processing may occur client-side.

Concrete authentication, authorization, RLS, storage policy, encryption, provider-data policy, retention, and organizational controls remain implementation responsibilities.

This architecture establishes the responsibility to preserve authority and confidentiality without prescribing those mechanisms.

---

## Legacy Compatibility Rule

Existing implementation may be assessed only after the required architecture is established.

Existing:

- courses;
- chapters;
- lessons;
- `learning_objectives`;
- repositories;
- Supabase schema;
- routes;
- Creator-adjacent code;
- learner UI

may satisfy a later derived technical requirement.

They may not create the requirement.

Existing `learning_objectives` storage does not by itself establish the required objective-formation workflow, Creator authority lifecycle, source grounding, or handoff contract.

The architecture remains valid even if all legacy product implementation were removed.

---

## Explicit Non-Requirements

This bounded architecture does not require:

- generalized ingestion;
- arbitrary web crawling;
- URL ingestion;
- audio ingestion;
- video ingestion;
- image understanding;
- OCR;
- scanned-document support;
- handwriting recognition;
- generalized document understanding;
- multiple simultaneous document workflows;
- autonomous course generation;
- autonomous curriculum generation;
- automatic chapter generation;
- automatic lesson generation;
- generalized authoring;
- a universal Creator platform;
- learner-facing content generation;
- a specific AI provider;
- a specific AI model;
- a specific AI SDK;
- a vector database;
- embeddings;
- retrieval-augmented generation infrastructure;
- a knowledge graph;
- a specific extraction library;
- a specific storage provider;
- a new database schema;
- database migrations;
- persistent workflow state by default;
- organization administration;
- collaboration workflows;
- certification;
- payments;
- analytics infrastructure;
- learner choice between multiple evidence-compatible learning methods;
- Learning Principle derivation;
- Learning Requirement derivation;
- mechanism selection;
- Learning Design derivation;
- learner execution.

Any deferred capability must be justified later by a separately derived requirement.

---

## Implementation Technology Boundary

This architecture intentionally does not select:

- AI provider;
- AI model;
- AI SDK;
- extraction package;
- storage implementation;
- persistence model;
- database tables;
- RLS policies;
- server actions;
- route handlers;
- application services;
- domain types;
- React components;
- concrete Creator UI;
- testing framework additions;
- evaluation framework implementation.

Previously investigated toolchain directions may inform later implementation derivation.

They do not become architectural requirements merely because they are available or compatible.

Technology must serve the architecture.

Technology must not redefine it.

---

## Minimum Architectural Data Flow

    CREATOR / CONTENT OWNER
            ↓
    BOUNDED DOCUMENT INPUT
            ↓
    SOURCE-MATERIAL EXTRACTION
            ↓
    TRACEABLE SOURCE MATERIAL
            ↓
    AI-ASSISTED ANALYSIS
            ↓
    PROPOSED LEARNING OBJECTIVE(S)
            ↓
    STRUCTURAL / GROUNDING CHECKS
            ↓
    CREATOR REVIEW
            ↓
    CHANGE / REJECT / APPROVE
            ↓
    ACCEPTED LEARNING OBJECTIVE
            +
    BOUNDED RELEVANT CONTEXT
            +
    SOURCE TRACEABILITY
            ↓
    ARCHITECTURAL HANDOFF
            ↓
    EXISTING LEARNING SCIENCE ENGINE

This is an authority and responsibility flow.

It is not a database schema, service topology, API contract, or component diagram.

---

## Minimum Sufficiency Test

This architecture is sufficient only if a bounded implementation can demonstrate:

    CREATOR-PROVIDED SOURCE
            ↓
    EXTRACTED SOURCE MATERIAL
            ↓
    TRACEABLE OBJECTIVE PROPOSAL
            ↓
    CREATOR REVIEW
            ↓
    CREATOR ACCEPTANCE
            ↓
    ACCEPTED LEARNING OBJECTIVE
            +
    BOUNDED RELEVANT CONTEXT
            ↓
    EXISTING LEARNING SCIENCE ENGINE

The architecture fails if:

- AI output becomes authoritative without Creator acceptance;
- an objective cannot be traced to its supporting source material;
- Creator change can retain stale source-grounding claims;
- rejected or merely proposed objectives can enter downstream derivation;
- the upstream layer performs Learning Science Engine responsibilities;
- implementation technology determines the product responsibility;
- the bounded workflow expands into generalized ingestion or autonomous course generation.

---

## Architecture Completion Boundary

This document establishes the minimum architecture required for Subject-Matter Intake & Objective Formation before a bounded implementation slice may be derived.

It establishes:

- Creator / Content Owner subject-matter authority;
- one bounded document-input responsibility;
- source-material extraction;
- source traceability;
- AI-assisted objective proposal as proposal rather than authority;
- structural and source-grounding validation boundaries;
- Creator review;
- Creator-controlled change;
- Creator rejection;
- Creator acceptance;
- bounded Relevant Context formation;
- the handoff contract to the existing Learning Science Engine;
- explicit responsibility separation;
- persistence, storage, security, and technology boundaries;
- explicit non-requirements.

It does not authorize product implementation.

It does not open the Code Change Gate.

After this architecture is verified and recorded in `PROJECT_CONTROL.md`, the next responsibility is to derive the smallest safe implementation slice required to prove this architecture.

Only a separately derived and explicitly authorized bounded implementation slice may reopen product implementation.