import type {
  Course,
  CourseInsert,
  CourseUpdate,
  RepositoryClient,
} from "@/lib/repositories/types";

export async function getCourses(
  client: RepositoryClient,
): Promise<Course[]> {
  const { data, error } = await client
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getCourseById(
  client: RepositoryClient,
  id: Course["id"],
): Promise<Course | null> {
  const { data, error } = await client
    .from("courses")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCourseBySlug(
  client: RepositoryClient,
  slug: Course["slug"],
): Promise<Course | null> {
  const { data, error } = await client
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createCourse(
  client: RepositoryClient,
  course: CourseInsert,
): Promise<Course> {
  const { data, error } = await client
    .from("courses")
    .insert(course)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCourse(
  client: RepositoryClient,
  id: Course["id"],
  updates: CourseUpdate,
): Promise<Course> {
  const { data, error } = await client
    .from("courses")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCourse(
  client: RepositoryClient,
  id: Course["id"],
): Promise<void> {
  const { error } = await client
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}