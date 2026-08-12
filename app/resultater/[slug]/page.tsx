import Link from "next/link";
import { notFound } from "next/navigation";

import ResultatCard from "@/components/ResultatCard";
import { quizQuestions } from "@/data/quiz";

type ResultatDetaljePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatQuizTitel(slug: string) {
  return slug
    .split("-")
    .map((ord) => ord.charAt(0).toUpperCase() + ord.slice(1))
    .join(" ");
}

export default async function ResultatDetaljePage({
  params,
}: ResultatDetaljePageProps) {
  const { slug } = await params;

  const spoergsmaal = quizQuestions.filter(
    (spoergsmaal) => spoergsmaal.slug === slug
  );

  if (spoergsmaal.length === 0) {
    notFound();
  }

  return (
    <main
      style={{
        width: "min(900px, calc(100% - 32px))",
        margin: "0 auto",
        padding: "48px 0",
      }}
    >
      <Link
        href="/resultater"
        style={{
          display: "inline-block",
          marginBottom: "32px",
          color: "#1f4e43",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ← Tilbage til resultater
      </Link>

      <ResultatCard
        quizTitel={formatQuizTitel(slug)}
        antalRigtige={0}
        antalSpoergsmaal={spoergsmaal.length}
      />
    </main>
  );
}