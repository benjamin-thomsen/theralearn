import { notFound } from "next/navigation";

import BoundedLearningDesignSlice from "@/components/BoundedLearningDesignSlice";
import { getChapterBySlug } from "@/lib/repositories/chapters";
import { getCourseBySlug } from "@/lib/repositories/courses";
import { getLessonBySlug } from "@/lib/repositories/lessons";
import { getQuizQuestionsByLessonId } from "@/lib/repositories/quizQuestions";
import { createClient } from "@/lib/supabase/server";

type LessonPageProps = {
  params: Promise<{
    slug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, chapterSlug, lessonSlug } = await params;
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  const course = await getCourseBySlug(client, slug);

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

  const quizQuestions = (
    await getQuizQuestionsByLessonId(client, lesson.id)
  ).filter((quizQuestion) => quizQuestion.is_published);

  const learningObjective = lesson.learning_objectives[0] ?? null;
  const retrievalQuestion = quizQuestions[0] ?? null;

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

        {learningObjective && retrievalQuestion && (
          <BoundedLearningDesignSlice
            creatorAuthorityReference={user?.id ?? null}
            initialLearningObjective={learningObjective}
            initialRelevantContext={lesson.content}
            id={retrievalQuestion.id}
            question={retrievalQuestion.question}
            options={retrievalQuestion.options}
            correct_answer={retrievalQuestion.correct_answer}
            explanation={retrievalQuestion.explanation}
          />
        )}
      </article>
    </main>
  );
}
