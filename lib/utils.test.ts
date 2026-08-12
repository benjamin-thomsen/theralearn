import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("samler flere class names", () => {
    expect(cn("btn", "primary")).toBe("btn primary");
  });

  it("ignorerer false, null og undefined", () => {
    expect(cn("btn", false, null, undefined, "active")).toBe(
      "btn active"
    );
  });

  it("returnerer en tom streng hvis ingen class names er gyldige", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("returnerer én class hvis kun én er angivet", () => {
    expect(cn("button")).toBe("button");
  });
});