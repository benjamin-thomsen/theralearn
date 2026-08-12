"use client";

import { useState } from "react";
import { QuizQuestion } from "@/data/quiz";

type QuizCardProps = {
  question: QuizQuestion;
};

export default function QuizCard({ question }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selectedAnswer === question.correctAnswer;

  function checkAnswer() {
    if (selectedAnswer === null) return;
    setShowResult(true);
  }

  function nextQuestion() {
    setSelectedAnswer(null);
    setShowResult(false);
  }

  return (
    <article>
      <h2>{question.question}</h2>

      <div>
        {question.options.map((option, index) => (
          <label
            key={index}
            style={{
              display: "block",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => setSelectedAnswer(index)}
              disabled={showResult}
              style={{ marginRight: "8px" }}
            />
            {option}
          </label>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
          style={{
            marginTop: "16px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          Tjek svar
        </button>
      ) : (
        <>
          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: isCorrect ? "green" : "crimson",
            }}
          >
            {isCorrect ? "✅ Korrekt!" : "❌ Forkert"}
          </p>

          <p>{question.explanation}</p>

          <button
            onClick={nextQuestion}
            style={{
              marginTop: "16px",
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            Prøv igen
          </button>
        </>
      )}
    </article>
  );
}