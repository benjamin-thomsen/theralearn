import { notFound } from "next/navigation";

import AuthoritativeQuizQuestion from "@/components/AuthoritativeQuizQuestion";
import { getChapterBySlug } from "@/lib/repositories/chapters";
import { getCourseBySlug } from "@/lib/repositories/courses";
import { getFlashcardsByLessonId } from "@/lib/repositories/flashcards";
import { getLessonBySlug } from "@/lib/repositories/lessons";
import { getQuizQuestionsByLessonId } from "@/lib/repositories/quizQuestions";
import { createClient } from "@/lib/supabase/server";

type LessonPageProps = {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, chapterSlug, lessonSlug } = await params;
  const client = await createClient();

  const course = await getCourseBySlug(client, courseSlug);

  if (!course || !course.is_published) {
    notFound();
  }

  const chapter = await getChapterBySlug(client, course.id, chapterSlug);

  if (!chapter || !chapter.is_published) {
    notFound();
  }

  const lesson = await getLessonBySlug(client, chapter.id, lessonSlug);

  if (!lesson || !lesson.is_published) {
    notFound();
  }

  const flashcards = (await getFlashcardsByLessonId(client, lesson.id)).filter(
    (flashcard) => flashcard.is_published,
  );
  const quizQuestions = (
    await getQuizQuestionsByLessonId(client, lesson.id)
  ).filter((quizQuestion) => quizQuestion.is_published);

  return (
    <main>
      <nav aria-label="Pensumhierarki">
        <p>{course.title}</p>
        <p>{chapter.title}</p>
      </nav>

      <article>
        <header>
          <h1>{lesson.title}</h1>
          {lesson.summary && <p>{lesson.summary}</p>}
        </header>

        {lesson.learning_objectives.length > 0 && (
          <section aria-labelledby="learning-objectives-heading">
            <h2 id="learning-objectives-heading">Læringsmål</h2>
            <ul>
              {lesson.learning_objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="lesson-content-heading">
          <h2 id="lesson-content-heading">Indhold</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{lesson.content}</p>
        </section>

        {flashcards.length > 0 && (
          <section aria-labelledby="flashcards-heading">
            <h2 id="flashcards-heading">Flashcards</h2>
            <p>Prøv at svare fra hukommelsen, før du viser svaret.</p>

            {flashcards.map((flashcard) => (
              <details key={flashcard.id}>
                <summary>{flashcard.front_text}</summary>
                <p>{flashcard.back_text}</p>
              </details>
            ))}
          </section>
        )}

        {quizQuestions.length > 0 && (
          <section aria-labelledby="quiz-heading">
            <h2 id="quiz-heading">Quiz</h2>
            <p>Vælg et svar, før du tjekker facit og forklaring.</p>

            {quizQuestions.map((quizQuestion) => (
              <AuthoritativeQuizQuestion
                key={quizQuestion.id}
                id={quizQuestion.id}
                question={quizQuestion.question}
                options={quizQuestion.options}
                correct_answer={quizQuestion.correct_answer}
                explanation={quizQuestion.explanation}
              />
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
