export type QuizQuestion = {
  id: number;
  slug: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    slug: "grundlaeggende-psykologi",
    question: "Hvad betyder begrebet psykologi?",
    options: [
      "Læren om kroppen",
      "Læren om sindet og adfærd",
      "Læren om medicin",
      "Læren om sprog",
    ],
    correctAnswer: 1,
    explanation:
      "Psykologi er studiet af menneskets tanker, følelser og adfærd.",
  },
  {
    id: 2,
    slug: "grundlaeggende-psykologi",
    question: "Hvilket af følgende er et eksempel på en følelse?",
    options: ["Glæde", "Hukommelse", "Refleks", "Syn"],
    correctAnswer: 0,
    explanation:
      "Glæde er en følelsesmæssig tilstand, mens de øvrige svar beskriver andre mentale eller fysiologiske funktioner.",
  },
  {
    id: 3,
    slug: "grundlaeggende-psykologi",
    question: "Hvad undersøger en psykolog typisk?",
    options: [
      "Kun hjernens anatomi",
      "Menneskers tanker, følelser og adfærd",
      "Kun kroppens muskler",
      "Kun genetiske sygdomme",
    ],
    correctAnswer: 1,
    explanation:
      "Psykologer arbejder med at forstå og forklare menneskers tanker, følelser og adfærd.",
  },
];