import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set(
      "error",
      "Bekræftelseslinket mangler en gyldig kode."
    );

    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const loginUrl = new URL("/login", requestUrl.origin);
    loginUrl.searchParams.set(
      "error",
      "Bekræftelseslinket er ugyldigt eller udløbet."
    );

    return NextResponse.redirect(loginUrl);
  }

  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set(
    "confirmed",
    "Din e-mail er bekræftet. Du kan nu logge ind."
  );

  return NextResponse.redirect(loginUrl);
}