import { describe, expect, it } from "vitest";
import { applyExactPatch } from "./runPatch";

describe("applyExactPatch", () => {
  it("replaces exactly one matching target", () => {
    expect(
      applyExactPatch("before", { find: "before", replace: "after" }),
    ).toBe("after");
  });

  it("rejects a missing target", () => {
    expect(
      applyExactPatch("before", { find: "missing", replace: "after" }),
    ).toBeNull();
  });

  it("rejects multiple matching targets", () => {
    expect(
      applyExactPatch("same same", { find: "same", replace: "changed" }),
    ).toBeNull();
  });
});
