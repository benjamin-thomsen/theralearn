import type {
  Flashcard,
  FlashcardInsert,
  FlashcardUpdate,
  Lesson,
  RepositoryClient,
} from "@/lib/repositories/types";

import { throwRepositoryError } from "@/lib/repositories/helpers/throwRepositoryError";

export async function getFlashcards(
  client: RepositoryClient,
): Promise<Flashcard[]> {
  const { data, error } = await client
    .from("flashcards")
    .select("*")
    .order("lesson_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("front_text", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getFlashcardsByLessonId(
  client: RepositoryClient,
  lessonId: Lesson["id"],
): Promise<Flashcard[]> {
  const { data, error } = await client
    .from("flashcards")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("sort_order", { ascending: true })
    .order("front_text", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getFlashcardById(
  client: RepositoryClient,
  id: Flashcard["id"],
): Promise<Flashcard | null> {
  const { data, error } = await client
    .from("flashcards")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createFlashcard(
  client: RepositoryClient,
  flashcard: FlashcardInsert,
): Promise<Flashcard> {
  const { data, error } = await client
    .from("flashcards")
    .insert(flashcard)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function updateFlashcard(
  client: RepositoryClient,
  id: Flashcard["id"],
  updates: FlashcardUpdate,
): Promise<Flashcard> {
  const { data, error } = await client
    .from("flashcards")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function deleteFlashcard(
  client: RepositoryClient,
  id: Flashcard["id"],
): Promise<void> {
  const { error } = await client
    .from("flashcards")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}