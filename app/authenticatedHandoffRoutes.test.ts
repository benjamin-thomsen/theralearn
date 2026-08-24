import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("authenticated handoff route boundaries", () => {
  it("protects dashboard, Creator, and Learner pages with the existing login redirect", () => {
    for (const file of [
      "app/dashboard/page.tsx",
      "app/creator-objective/page.tsx",
      "app/learner-handoff/page.tsx",
    ]) {
      const source = readFileSync(file, "utf8");
      expect(source).toContain("supabase.auth.getUser()");
      expect(source).toContain('redirect("/login")');
    }
  });

  it("exposes visible dashboard navigation to both bounded contexts", () => {
    const dashboard = readFileSync("app/dashboard/page.tsx", "utf8");
    expect(dashboard).toContain('href="/creator-objective"');
    expect(dashboard).toContain('href="/learner-handoff"');
  });

  it("retrieves and validates on the Learner server, then crosses RSC as serialized data only", () => {
    const learner = readFileSync("app/learner-handoff/page.tsx", "utf8");
    expect(learner).toContain("requireOwnedApprovedAuthorityPackage");
    expect(learner).toContain("SupabaseApprovedPackageReader");
    expect(learner).not.toContain("SupabaseApprovedPackageStore");
    expect(learner).toContain("serializeApprovedAuthorityPackage(authorityPackage)");
    expect(learner).toContain("LearnerApprovedPackageHydrationBoundary serializedPackage={serializedPackage}");
    expect(learner).not.toContain("learningDesign={");
    expect(learner).not.toContain("ApprovedCreatorRetrievalExperience");

    const boundary = readFileSync("components/LearnerApprovedPackageHydrationBoundary.tsx", "utf8");
    expect(boundary).toContain('"use client"');
    expect(boundary).toContain("requireApprovedLearningDesign(pkg.learningDesign)");
    expect(boundary.indexOf("requireApprovedLearningDesign(pkg.learningDesign)"))
      .toBeLessThan(boundary.indexOf("<ApprovedCreatorRetrievalExperience"));
  });

  it("constructs the service-role client only after authentication, validation, and server approval", () => {
    const actions = readFileSync("app/creator-objective/actions.ts", "utf8");
    const action = actions.slice(actions.indexOf("export async function persistApprovedAuthorityPackage"));
    expect(action.indexOf("requireAuthenticatedCreator()"))
      .toBeLessThan(action.indexOf("approvePreApprovalAuthorityPackage(preApprovalInput)"));
    expect(action.indexOf("approvePreApprovalAuthorityPackage(preApprovalInput)"))
      .toBeLessThan(action.indexOf("createServiceRoleClient()"));
    expect(action).toContain("new SupabaseApprovedPackageStore(persistenceClient)");
    expect(action).not.toContain("serviceRoleKey");
  });

  it("returns only persisted package identity across the server-action boundary", () => {
    const actions = readFileSync("app/creator-objective/actions.ts", "utf8");
    const action = actions.slice(actions.indexOf("export async function persistApprovedAuthorityPackage"));
    const returnedResult = action.slice(action.indexOf("return {"), action.indexOf("};", action.indexOf("return {") + 1));

    expect(returnedResult).toContain("packageIdentity: persisted.learningDesign.identity");
    expect(returnedResult).not.toContain("approvedLearningDesign");
    expect(returnedResult).not.toContain("learningDesign:");
  });

  it("stops the Creator client at persistence success and leaves retrieval to the Learner route", () => {
    const creator = readFileSync("app/creator-objective/CreatorObjectiveClient.tsx", "utf8");

    expect(creator).toContain("setPersistedPackageIdentity(persisted.packageIdentity)");
    expect(creator).toContain('href="/learner-handoff"');
    expect(creator).not.toContain("persisted.approvedLearningDesign");
    expect(creator).not.toContain("ApprovedCreatorRetrievalExperience");
  });

  it("keeps the service-role credential in a server-only persistence client", () => {
    const client = readFileSync("lib/supabase/serviceRole.ts", "utf8");
    expect(client).toContain('import "server-only"');
    expect(client).toContain("process.env.SUPABASE_SERVICE_ROLE_KEY");
    expect(client).not.toContain("NEXT_PUBLIC_SUPABASE_SERVICE");

    const browserClient = readFileSync("lib/supabase/client.ts", "utf8");
    expect(browserClient).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
  });
});
