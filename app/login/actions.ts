"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export async function login(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");

  const email =
    typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";

  const password =
    typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Du skal skrive både din e-mailadresse og din adgangskode."
      )}`
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        "E-mailadressen eller adgangskoden er forkert."
      )}`
    );
  }

  redirect("/");
}