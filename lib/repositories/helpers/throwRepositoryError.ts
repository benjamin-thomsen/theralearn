import type { PostgrestError } from "@supabase/supabase-js";

export function throwRepositoryError<T>(
  data: T | null,
  error: PostgrestError | null,
): asserts data is T {
  if (error) {
    throw error;
  }

  if (data === null) {
    throw new Error("Repository operation returned no data.");
  }
}