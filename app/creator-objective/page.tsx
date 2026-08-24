import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import CreatorObjectiveClient from "./CreatorObjectiveClient";

export default async function CreatorObjectivePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <CreatorObjectiveClient />;
}
