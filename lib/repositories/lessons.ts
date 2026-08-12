import type {
  Chapter,
  Lesson,
  LessonInsert,
  LessonUpdate,
  RepositoryClient,
} from "@/lib/repositories/types";

import { throwRepositoryError } from "@/lib/repositories/helpers/throwRepositoryError";

export async function getLessons(
  client: RepositoryClient,
): Promise<Lesson[]> {
  const { data, error } = await client
    .from("lessons")
    .select("*")
    .order("chapter_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getLessonsByChapterId(
  client: RepositoryClient,
  chapterId: Chapter["id"],
): Promise<Lesson[]> {
  const { data, error } = await client
    .from("lessons")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getLessonById(
  client: RepositoryClient,
  id: Lesson["id"],
): Promise<Lesson | null> {
  const { data, error } = await client
    .from("lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getLessonBySlug(
  client: RepositoryClient,
  chapterId: Chapter["id"],
  slug: Lesson["slug"],
): Promise<Lesson | null> {
  const { data, error } = await client
    .from("lessons")
    .select("*")
    .eq("chapter_id", chapterId)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createLesson(
  client: RepositoryClient,
  lesson: LessonInsert,
): Promise<Lesson> {
  const { data, error } = await client
    .from("lessons")
    .insert(lesson)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function updateLesson(
  client: RepositoryClient,
  id: Lesson["id"],
  updates: LessonUpdate,
): Promise<Lesson> {
  const { data, error } = await client
    .from("lessons")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function deleteLesson(
  client: RepositoryClient,
  id: Lesson["id"],
): Promise<void> {
  const { error } = await client
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}