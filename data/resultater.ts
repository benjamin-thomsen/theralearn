export type Resultat = {
  slug: string;
  titel: string;
  beskrivelse: string;
  score: number;
  niveau: string;
};

export const resultater: Resultat[] = [
  {
    slug: "grundlaeggende-psykologi",
    titel: "Grundlæggende psykologi",
    beskrivelse:
      "Du har gennemført quizzen i grundlæggende psykologi. Her kan du følge dine resultater og se din udvikling.",
    score: 85,
    niveau: "Godt niveau",
  },
  {
    slug: "kommunikation",
    titel: "Kommunikation",
    beskrivelse:
      "Resultatet viser din forståelse af kommunikation og terapeutiske samtaler.",
    score: 72,
    niveau: "På vej",
  },
  {
    slug: "udviklingspsykologi",
    titel: "Udviklingspsykologi",
    beskrivelse:
      "Her kan du følge dine fremskridt inden for udviklingspsykologi.",
    score: 91,
    niveau: "Meget godt",
  },
];