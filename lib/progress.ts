import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "./storage";

const QUIZ_PROGRESS_STORAGE_KEY = "quiz-progress";

export type QuizProgress = {
  slug: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
};

function calculatePercentage(
  correctAnswers: number,
  totalQuestions: number
): number {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function getQuizProgress(): QuizProgress[] {
  return getFromStorage<QuizProgress[]>(
    QUIZ_PROGRESS_STORAGE_KEY,
    []
  );
}

export function getQuizProgressBySlug(
  slug: string
): QuizProgress | undefined {
  const progress = getQuizProgress();

  return progress.find((result) => result.slug === slug);
}

export function saveQuizProgress(
  slug: string,
  correctAnswers: number,
  totalQuestions: number
): QuizProgress {
  const existingProgress = getQuizProgress();

  const newProgress: QuizProgress = {
    slug,
    correctAnswers,
    totalQuestions,
    percentage: calculatePercentage(
      correctAnswers,
      totalQuestions
    ),
    completedAt: new Date().toISOString(),
  };

  const updatedProgress = [
    ...existingProgress.filter((result) => result.slug !== slug),
    newProgress,
  ];

  saveToStorage(QUIZ_PROGRESS_STORAGE_KEY, updatedProgress);

  return newProgress;
}

export function removeQuizProgress(slug: string): boolean {
  const existingProgress = getQuizProgress();

  const updatedProgress = existingProgress.filter(
    (result) => result.slug !== slug
  );

  if (updatedProgress.length === existingProgress.length) {
    return false;
  }

  return saveToStorage(
    QUIZ_PROGRESS_STORAGE_KEY,
    updatedProgress
  );
}

export function clearQuizProgress(): boolean {
  return removeFromStorage(QUIZ_PROGRESS_STORAGE_KEY);
}

export function getCompletedQuizCount(): number {
  return getQuizProgress().length;
}

export function getAverageQuizPercentage(): number {
  const progress = getQuizProgress();

  if (progress.length === 0) {
    return 0;
  }

  const totalPercentage = progress.reduce(
    (sum, result) => sum + result.percentage,
    0
  );

  return Math.round(totalPercentage / progress.length);
}