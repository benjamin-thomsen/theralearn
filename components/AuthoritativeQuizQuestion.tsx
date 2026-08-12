"use client";

import { useState } from "react";

type AuthoritativeQuizQuestionProps = {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
};

export default function AuthoritativeQuizQuestion({
  id,
  question,
  options,
  correct_answer,
  explanation,
}: AuthoritativeQuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const isCorrect = selectedAnswer === correct_answer;

  function checkAnswer() {
    if (selectedAnswer === null || isChecked) {
      return;
    }

    setIsChecked(true);
  }

  function resetQuestion() {
    setSelectedAnswer(null);
    setIsChecked(false);
  }

  return (
    <article>
      <h3>{question}</h3>

      <fieldset>
        <legend>Vælg ét svar</legend>
        {options.map((option, index) => (
          <label key={`${id}-${index}`} style={{ display: "block" }}>
            <input
              type="radio"
              name={`quiz-question-${id}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => setSelectedAnswer(index)}
              disabled={isChecked}
            />{" "}
            {option}
          </label>
        ))}
      </fieldset>

      {!isChecked ? (
        <button
          type="button"
          onClick={checkAnswer}
          disabled={selectedAnswer === null}
        >
          Tjek svar
        </button>
      ) : (
        <div aria-live="polite">
          <p>{isCorrect ? "Korrekt svar." : "Ikke korrekt."}</p>
          {explanation && <p>{explanation}</p>}
          <button type="button" onClick={resetQuestion}>
            Prøv igen
          </button>
        </div>
      )}
    </article>
  );
}
