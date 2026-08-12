"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearQuizProgress,
  getQuizProgress,
  removeQuizProgress,
  saveQuizProgress,
  type QuizProgress,
} from "../../lib/progress";

type UseQuizProgressReturn = {
  progress: QuizProgress[];
  isLoaded: boolean;
  saveResult: (
    slug: string,
    correctAnswers: number,
    totalQuestions: number
  ) => QuizProgress;
  removeResult: (slug: string) => boolean;
  clearResults: () => boolean;
  refreshProgress: () => void;
};

export function useQuizProgress(): UseQuizProgressReturn {
  const [progress, setProgress] = useState<QuizProgress[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshProgress = useCallback(() => {
    setProgress(getQuizProgress());
  }, []);

  useEffect(() => {
    refreshProgress();
    setIsLoaded(true);
  }, [refreshProgress]);

  const saveResult = useCallback(
    (
      slug: string,
      correctAnswers: number,
      totalQuestions: number
    ): QuizProgress => {
      const savedResult = saveQuizProgress(
        slug,
        correctAnswers,
        totalQuestions
      );

      refreshProgress();

      return savedResult;
    },
    [refreshProgress]
  );

  const removeResult = useCallback(
    (slug: string): boolean => {
      const wasRemoved = removeQuizProgress(slug);

      if (wasRemoved) {
        refreshProgress();
      }

      return wasRemoved;
    },
    [refreshProgress]
  );

  const clearResults = useCallback((): boolean => {
    const wasCleared = clearQuizProgress();

    if (wasCleared) {
      setProgress([]);
    }

    return wasCleared;
  }, []);

  return {
    progress,
    isLoaded,
    saveResult,
    removeResult,
    clearResults,
    refreshProgress,
  };
}