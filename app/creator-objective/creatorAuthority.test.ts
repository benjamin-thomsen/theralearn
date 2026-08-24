import { beforeEach, describe, expect, it, vi } from "vitest";

const getUser = vi.fn();

vi.mock("../../lib/supabase/server", () => ({
  createClient: async () => ({ auth: { getUser } }),
}));

import { getCurrentCreatorAuthorityReference } from "./creatorAuthority";

describe("Creator authority runtime boundary", () => {
  beforeEach(() => getUser.mockReset());

  it("uses the authenticated runtime identity as the authority reference", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "creator-42" } }, error: null });

    await expect(getCurrentCreatorAuthorityReference()).resolves.toBe("creator-42");
  });

  it("fails closed when no authenticated authority is available", async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });

    await expect(getCurrentCreatorAuthorityReference()).rejects.toThrow(
      "authenticated Creator/Content Owner authority reference",
    );
  });
});
