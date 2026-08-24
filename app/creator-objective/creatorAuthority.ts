"use server";

import { createClient } from "../../lib/supabase/server";

export async function getCurrentCreatorAuthorityReference() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.id) {
    throw new Error(
      "Later Retrieval Prerequisite requires an authenticated Creator/Content Owner authority reference.",
    );
  }

  return user.id;
}
