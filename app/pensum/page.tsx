import Link from "next/link";

import { getChaptersByCourseId } from "@/lib/repositories/chapters";
import { getCourses } from "@/lib/repositories/courses";
import { getLessonsByChapterId } from "@/lib/repositories/lessons";
import { createClient } from "@/lib/supabase/server";

import styles from "./page.module.css";

export default async function PensumPage() {
  const client = await createClient();
  const courses = (await getCourses(client)).filter(
    (course) => course.is_published,
  );

  const curriculum = await Promise.all(
    courses.map(async (course) => {
      const chapters = (await getChaptersByCourseId(client, course.id)).filter(
        (chapter) => chapter.is_published,
      );

      const chaptersWithLessons = await Promise.all(
        chapters.map(async (chapter) => ({
          chapter,
          lessons: (await getLessonsByChapterId(client, chapter.id)).filter(
            (lesson) => lesson.is_published,
          ),
        })),
      );

      return { course, chapters: chaptersWithLessons };
    }),
  );

  const hasPublishedLessons = curriculum.some(({ chapters }) =>
    chapters.some(({ lessons }) => lessons.length > 0),
  );

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Pensum</h1>
        <p className={styles.subtitle}>Vælg en lektion fra dit pensum.</p>

        {!hasPublishedLessons ? (
          <p className={styles.text}>
            Der er endnu ikke publiceret lektioner i pensum.
          </p>
        ) : (
          curriculum.map(({ course, chapters }) => {
            const publishedChapters = chapters.filter(
              ({ lessons }) => lessons.length > 0,
            );

            if (publishedChapters.length === 0) {
              return null;
            }

            return (
              <section key={course.id}>
                <h2>{course.title}</h2>

                {publishedChapters.map(({ chapter, lessons }) => (
                  <section key={chapter.id}>
                    <h3>{chapter.title}</h3>
                    <ul className={styles.list}>
                      {lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <Link
                            href={`/pensum/${course.slug}/${chapter.slug}/${lesson.slug}`}
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </section>
            );
          })
        )}
      </div>
    </main>
  );
}
