"use client";

import AuthoritativeQuizQuestion from "./AuthoritativeQuizQuestion";
import { requireApprovedLearningDesign } from "../lib/learning-science/learningDesignExecution";
import type { LearningDesign } from "../lib/learning-science/types";

type ApprovedRetrievalExperienceProps = {
  learningDesign: LearningDesign;
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
};

export default function ApprovedRetrievalExperience({
  learningDesign,
  id,
  question,
  options,
  correct_answer,
  explanation,
}: ApprovedRetrievalExperienceProps) {
  const approvedDesign = requireApprovedLearningDesign(learningDesign);

  if (approvedDesign.proposedLearningMechanism.kind !== "bounded-retrieval") {
    throw new Error(
      "Approved learning design does not authorize the bounded retrieval mechanism.",
    );
  }

  return (
    <AuthoritativeQuizQuestion
      id={id}
      question={question}
      options={options}
      correct_answer={correct_answer}
      explanation={explanation}
    />
  );
}
