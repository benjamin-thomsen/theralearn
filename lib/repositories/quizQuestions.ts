import type {
  Lesson,
  QuizQuestion,
  QuizQuestionInsert,
  QuizQuestionUpdate,
  RepositoryClient,
} from "@/lib/repositories/types";

import { throwRepositoryError } from "@/lib/repositories/helpers/throwRepositoryError";

export async function getQuizQuestions(
  client: RepositoryClient,
): Promise<QuizQuestion[]> {
  const { data, error } = await client
    .from("quiz_questions")
    .select("*")
    .order("lesson_id", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("question", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getQuizQuestionsByLessonId(
  client: RepositoryClient,
  lessonId: Lesson["id"],
): Promise<QuizQuestion[]> {
  const { data, error } = await client
    .from("quiz_questions")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("sort_order", { ascending: true })
    .order("question", { ascending: true });

  throwRepositoryError(data, error);

  return data;
}

export async function getQuizQuestionById(
  client: RepositoryClient,
  id: QuizQuestion["id"],
): Promise<QuizQuestion | null> {
  const { data, error } = await client
    .from("quiz_questions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createQuizQuestion(
  client: RepositoryClient,
  quizQuestion: QuizQuestionInsert,
): Promise<QuizQuestion> {
  const { data, error } = await client
    .from("quiz_questions")
    .insert(quizQuestion)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function updateQuizQuestion(
  client: RepositoryClient,
  id: QuizQuestion["id"],
  updates: QuizQuestionUpdate,
): Promise<QuizQuestion> {
  const { data, error } = await client
    .from("quiz_questions")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  throwRepositoryError(data, error);

  return data;
}

export async function deleteQuizQuestion(
  client: RepositoryClient,
  id: QuizQuestion["id"],
): Promise<void> {
  const { error } = await client
    .from("quiz_questions")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
