import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheraLearn",
    short_name: "TheraLearn",
    description:
      "TheraLearn er en læringsplatform til psykologi og psykoterapi med pensum, quizzer og resultater.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f4",
    theme_color: "#1f4e43",
    orientation: "portrait",
    lang: "da",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}