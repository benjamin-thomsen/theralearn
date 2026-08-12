import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL mangler i filen .env.local."
    );
  }

  if (!supabaseKey) {
    throw new Error(
      "Supabase-nøglen mangler i filen .env.local."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}