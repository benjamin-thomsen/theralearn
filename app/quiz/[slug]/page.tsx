"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { quizQuestions } from "@/data/quiz";
import styles from "./page.module.css";

export default function QuizQuestionPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const questions = quizQuestions.filter(
    (question) => question.slug === slug,
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <main className={styles.page}>
        <section className={styles.messageCard}>
          <p className={styles.eyebrow}>Quiz ikke fundet</p>
          <h1 className={styles.messageTitle}>
            Vi kunne ikke finde denne quiz
          </h1>
          <p className={styles.messageText}>
            Quizzen findes muligvis ikke længere, eller linket er forkert.
          </p>

          <Link href="/quiz" className={styles.primaryButton}>
            Tilbage til alle quizzer
          </Link>
        </section>
      </main>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  function handleAnswer(answerIndex: number) {
    if (isAnswered) {
      return;
    }

    setSelectedAnswer(answerIndex);
  }

  function handleCheckAnswer() {
    if (selectedAnswer === null || isAnswered) {
      return;
    }

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
    }

    setIsAnswered(true);
  }

  function handleNextQuestion() {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <main className={styles.page}>
        <section className={styles.resultCard}>
          <p className={styles.eyebrow}>Quiz gennemført</p>

          <h1 className={styles.resultTitle}>Godt arbejde!</h1>

          <div className={styles.scoreCircle}>
            <span className={styles.scoreNumber}>{score}</span>
            <span className={styles.scoreTotal}>ud af {questions.length}</span>
          </div>

          <p className={styles.resultText}>
            Du besvarede {percentage}% af spørgsmålene korrekt.
          </p>

          <div className={styles.resultActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleRestartQuiz}
            >
              Prøv quizzen igen
            </button>

            <Link href="/quiz" className={styles.secondaryButton}>
              Tilbage til quizoversigten
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.quizContainer}>
        <div className={styles.topBar}>
          <Link href="/quiz" className={styles.backLink}>
            ← Tilbage til quizzer
          </Link>

          <span className={styles.score}>
            Point: {score} / {questions.length}
          </span>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressInformation}>
            <span>
              Spørgsmål {currentQuestionIndex + 1} af {questions.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <article className={styles.questionCard}>
          <p className={styles.eyebrow}>Vælg det rigtige svar</p>

          <h1 className={styles.question}>
            {currentQuestion.question}
          </h1>

          <div className={styles.options}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption =
                isAnswered && index === currentQuestion.correctAnswer;
              const isWrongOption =
                isAnswered && isSelected && index !== currentQuestion.correctAnswer;

              const optionClassName = [
                styles.optionButton,
                isSelected ? styles.selectedOption : "",
                isCorrectOption ? styles.correctOption : "",
                isWrongOption ? styles.wrongOption : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={option}
                  type="button"
                  className={optionClassName}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={
                isCorrect
                  ? styles.correctFeedback
                  : styles.wrongFeedback
              }
            >
              <h2 className={styles.feedbackTitle}>
                {isCorrect ? "Korrekt svar" : "Ikke helt korrekt"}
              </h2>

              <p className={styles.feedbackText}>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className={styles.actions}>
            {!isAnswered ? (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Tjek svar
              </button>
            ) : (
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Se resultat"
                  : "Næste spørgsmål"}
              </button>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}