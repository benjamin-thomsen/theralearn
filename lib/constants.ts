export const SITE_NAME = "TheraLearn";

export const SITE_DESCRIPTION =
  "En dansk læringsplatform til psykoterapi, psykologi, pensum og quizzer.";

export const SITE_URL = "http://localhost:3000";

export const NAVIGATION = [
  {
    label: "Forside",
    href: "/",
  },
  {
    label: "Pensum",
    href: "/pensum",
  },
  {
    label: "Quiz",
    href: "/quiz",
  },
  {
    label: "Resultater",
    href: "/resultater",
  },
  {
    label: "Om",
    href: "/om",
  },
] as const;