export type PensumAfsnit = {
  overskrift: string;
  tekst: string;
};

export type PensumEmne = {
  slug: string;
  titel: string;
  kategori: string;
  introduktion: string;
  laeringsmaal: string[];
  afsnit: PensumAfsnit[];
};

export const pensumEmner: PensumEmne[] = [
  {
    slug: "grundlaeggende-psykologi",
    titel: "Grundlæggende psykologi",
    kategori: "Psykologi",
    introduktion:
      "En introduktion til de vigtigste psykologiske teorier og begreber.",
    laeringsmaal: [
      "Forstå psykologiens grundbegreber",
      "Kende de vigtigste psykologiske retninger",
      "Kunne anvende teorierne i praksis",
    ],
    afsnit: [
      {
        overskrift: "Hvad er psykologi?",
        tekst:
          "Psykologi er videnskaben om menneskers tanker, følelser og adfærd.",
      },
      {
        overskrift: "Perspektiver",
        tekst:
          "Psykologien består af flere perspektiver, som hver forklarer menneskelig adfærd på forskellige måder.",
      },
    ],
  },
];

export function hentPensum() {
  return pensumEmner;
}

export function hentPensumFraSlug(slug: string) {
  return pensumEmner.find((emne) => emne.slug === slug);
}