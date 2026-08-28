import { describe, expect, it } from "vitest";

import type {
  AtomicLaterRetrievalConsumptionFact,
  AtomicLaterRetrievalSingleConsumptionTransition,
} from "../later-retrieval-consumption/atomicLaterRetrievalSingleConsumptionTransition";
import {
  determineLaterRetrievalOpportunityAvailability,
  type LaterRetrievalOpportunityAuthorityEvidence,
} from "./laterRetrievalOpportunityAvailability";

const consumptionIdentity = "33333333-3333-4333-8333-333333333333";
const authority = Object.freeze({
  authenticatedOwnerIdentity: "owner-1",
  persistedApprovedPackageIdentity: "package-1",
  approvedLearningDesignIdentity: "design-1",
  approvedLearningDesignSnapshot: JSON.stringify({ identity: "design-1", version: 1 }),
  laterRetrievalPrerequisiteIdentity: "prerequisite-1",
  laterRetrievalPrerequisiteSnapshot: JSON.stringify({ identity: "prerequisite-1", delay: 1 }),
  completionAnchorIdentity: "anchor-1",
  completionAnchorSnapshot: JSON.stringify({ identity: "anchor-1", completedAt: "2026-08-25T09:00:00Z" }),
}) satisfies LaterRetrievalOpportunityAuthorityEvidence;
const transition = Object.freeze({
  outcome: "CONSUMED_ONCE",
  packageIdentity: authority.persistedApprovedPackageIdentity,
  consumptionIdentity,
}) satisfies AtomicLaterRetrievalSingleConsumptionTransition;
const fact = Object.freeze({
  ...authority,
  consumptionIdentity,
  createdAt: "2026-08-25T10:00:00Z",
}) satisfies AtomicLaterRetrievalConsumptionFact;

function derive(
  candidateTransition: AtomicLaterRetrievalSingleConsumptionTransition = transition,
  candidateFact: AtomicLaterRetrievalConsumptionFact = fact,
  candidateAuthority: LaterRetrievalOpportunityAuthorityEvidence = authority,
) {
  return determineLaterRetrievalOpportunityAvailability(candidateTransition, candidateFact, candidateAuthority);
}

function frozen<T extends object>(value: T): Readonly<T> {
  return Object.freeze(value);
}

describe("minimum downstream later-retrieval opportunity availability", () => {
  it("returns only the exact frozen available-once result and preserves upstream identities", () => {
    const result = derive();

    expect(result).toEqual({
      outcome: "OPPORTUNITY_AVAILABLE_ONCE",
      packageIdentity: authority.persistedApprovedPackageIdentity,
      consumptionIdentity,
      opportunitySnapshot: fact,
    });
    expect(Reflect.ownKeys(result)).toEqual([
      "outcome", "packageIdentity", "consumptionIdentity", "opportunitySnapshot",
    ]);
    expect(Object.isFrozen(result)).toBe(true);
    expect(result.outcome === "OPPORTUNITY_AVAILABLE_ONCE" && result.opportunitySnapshot).toBe(fact);
    expect(Object.isFrozen(fact)).toBe(true);
  });

  it("is structurally deterministic and idempotent without changing either input", () => {
    const transitionBefore = JSON.stringify(transition);
    const factBefore = JSON.stringify(fact);
    const authorityBefore = JSON.stringify(authority);
    const first = derive();
    const second = derive();

    expect(second).toEqual(first);
    expect(first.outcome === "OPPORTUNITY_AVAILABLE_ONCE" && first.consumptionIdentity).toBe(consumptionIdentity);
    expect(second.outcome === "OPPORTUNITY_AVAILABLE_ONCE" && second.opportunitySnapshot).toBe(fact);
    expect(JSON.stringify(transition)).toBe(transitionBefore);
    expect(JSON.stringify(fact)).toBe(factBefore);
    expect(JSON.stringify(authority)).toBe(authorityBefore);
  });

  it.each([
    ["package identity", frozen({ ...transition, packageIdentity: "package-2" }), fact, authority],
    ["consumption identity", frozen({ ...transition, consumptionIdentity: "44444444-4444-4444-8444-444444444444" }), fact, authority],
    ["same tuple with another consumption identity", transition, frozen({ ...fact, consumptionIdentity: "44444444-4444-4444-8444-444444444444" }), authority],
    ["owner authority", transition, fact, frozen({ ...authority, authenticatedOwnerIdentity: "owner-2" })],
    ["package authority", transition, fact, frozen({ ...authority, persistedApprovedPackageIdentity: "package-2" })],
    ["design identity authority", transition, fact, frozen({ ...authority, approvedLearningDesignIdentity: "design-2" })],
    ["design snapshot authority", transition, fact, frozen({ ...authority, approvedLearningDesignSnapshot: JSON.stringify({ identity: "design-2" }) })],
    ["prerequisite identity authority", transition, fact, frozen({ ...authority, laterRetrievalPrerequisiteIdentity: "prerequisite-2" })],
    ["prerequisite snapshot authority", transition, fact, frozen({ ...authority, laterRetrievalPrerequisiteSnapshot: JSON.stringify({ identity: "prerequisite-2" }) })],
    ["anchor identity authority", transition, fact, frozen({ ...authority, completionAnchorIdentity: "anchor-2" })],
    ["anchor snapshot authority", transition, fact, frozen({ ...authority, completionAnchorSnapshot: JSON.stringify({ identity: "anchor-2" }) })],
  ])("fails closed for conflicting %s", (_name, candidateTransition, candidateFact, candidateAuthority) => {
    expect(derive(candidateTransition, candidateFact, candidateAuthority)).toEqual({ outcome: "FAIL_CLOSED" });
  });

  it.each([
    ["non-success transition", frozen({ outcome: "FAIL_CLOSED" })],
    ["mutable transition", { ...transition }],
    ["transition extra field", frozen({ ...transition, extra: true })],
    ["empty transition identity", frozen({ ...transition, packageIdentity: " " })],
    ["invalid transition consumption identity", frozen({ ...transition, consumptionIdentity: "invalid" })],
  ])("rejects %s", (_name, candidate) => {
    expect(derive(candidate as AtomicLaterRetrievalSingleConsumptionTransition)).toEqual({ outcome: "FAIL_CLOSED" });
  });

  it.each([
    ["missing field", frozen(Object.fromEntries(Object.entries(fact).slice(1)))],
    ["mutable fact", { ...fact }],
    ["fact extra field", frozen({ ...fact, extra: true })],
    ["empty identity", frozen({ ...fact, approvedLearningDesignIdentity: "" })],
    ["malformed design snapshot", frozen({ ...fact, approvedLearningDesignSnapshot: "not-json" })],
    ["non-object prerequisite snapshot", frozen({ ...fact, laterRetrievalPrerequisiteSnapshot: "[]" })],
    ["empty anchor snapshot", frozen({ ...fact, completionAnchorSnapshot: "" })],
    ["missing createdAt", frozen({ ...fact, createdAt: "" })],
    ["invalid createdAt", frozen({ ...fact, createdAt: "2026-02-30T10:00:00Z" })],
    ["invalid fact consumption identity", frozen({ ...fact, consumptionIdentity: "invalid" })],
  ])("rejects %s", (_name, candidate) => {
    expect(derive(transition, candidate as AtomicLaterRetrievalConsumptionFact)).toEqual({ outcome: "FAIL_CLOSED" });
  });

  it.each([
    ["mutable authority", { ...authority }],
    ["partial authority", frozen(Object.fromEntries(Object.entries(authority).slice(1)))],
    ["authority extra field", frozen({ ...authority, extra: true })],
    ["malformed authority snapshot", frozen({ ...authority, completionAnchorSnapshot: "{" })],
  ])("rejects %s", (_name, candidate) => {
    expect(derive(transition, fact, candidate as LaterRetrievalOpportunityAuthorityEvidence)).toEqual({ outcome: "FAIL_CLOSED" });
  });

  it("uses one shared frozen reference-free failure for all invalid and unreadable inputs", () => {
    const first = derive(frozen({ outcome: "FAIL_CLOSED" }));
    const second = derive(transition, { ...fact } as AtomicLaterRetrievalConsumptionFact);
    const throwing = Object.freeze(Object.defineProperty({}, "outcome", { get() { throw new Error("unreadable"); }, enumerable: true })) as unknown as AtomicLaterRetrievalSingleConsumptionTransition;
    const third = derive(throwing);

    expect(first).toBe(second);
    expect(second).toBe(third);
    expect(first).toEqual({ outcome: "FAIL_CLOSED" });
    expect(Reflect.ownKeys(first)).toEqual(["outcome"]);
    expect(Object.isFrozen(first)).toBe(true);
  });
});
