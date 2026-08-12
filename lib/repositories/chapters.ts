import type {
  Chapter,
  ChapterInsert,
  ChapterUpdate,
  Course,
  RepositoryClient,
} from "@/lib/repositories/types";

export async function getChapters(
  client: RepositoryClient,
): Promise<Chapter[]> {
  const { data, error } = await client
    .from("chapters")
    .select("*")
    .order("course_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getChaptersByCourseId(
  client: RepositoryClient,
  courseId: Course["id"],
): Promise<Chapter[]> {
  const { data, error } = await client
    .from("chapters")
    .select("*")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getChapterById(
  client: RepositoryClient,
  id: Chapter["id"],
): Promise<Chapter | null> {
  const { data, error } = await client
    .from("chapters")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getChapterBySlug(
  client: RepositoryClient,
  courseId: Course["id"],
  slug: Chapter["slug"],
): Promise<Chapter | null> {
  const { data, error } = await client
    .from("chapters")
    .select("*")
    .eq("course_id", courseId)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createChapter(
  client: RepositoryClient,
  chapter: ChapterInsert,
): Promise<Chapter> {
  const { data, error } = await client
    .from("chapters")
    .insert(chapter)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateChapter(
  client: RepositoryClient,
  id: Chapter["id"],
  updates: ChapterUpdate,
): Promise<Chapter> {
  const { data, error } = await client
    .from("chapters")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteChapter(
  client: RepositoryClient,
  id: Chapter["id"],
): Promise<void> {
  const { error } = await client
    .from("chapters")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}