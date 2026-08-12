import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database";

export type RepositoryClient = SupabaseClient<Database>;

export type Course = Tables<"courses">;
export type CourseInsert = TablesInsert<"courses">;
export type CourseUpdate = TablesUpdate<"courses">;

export type Chapter = Tables<"chapters">;
export type ChapterInsert = TablesInsert<"chapters">;
export type ChapterUpdate = TablesUpdate<"chapters">;

export type Lesson = Tables<"lessons">;
export type LessonInsert = TablesInsert<"lessons">;
export type LessonUpdate = TablesUpdate<"lessons">;

export type Flashcard = Tables<"flashcards">;
export type FlashcardInsert = TablesInsert<"flashcards">;
export type FlashcardUpdate = TablesUpdate<"flashcards">;

export type QuizQuestion = Tables<"quiz_questions">;
export type QuizQuestionInsert = TablesInsert<"quiz_questions">;
export type QuizQuestionUpdate = TablesUpdate<"quiz_questions">;