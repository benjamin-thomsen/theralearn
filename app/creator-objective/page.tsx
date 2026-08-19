"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { analyzeCreatorObjective } from "./actions";
import styles from "./page.module.css";

type ObjectiveAnalysisResult = Awaited<ReturnType<typeof analyzeCreatorObjective>>;

export default function CreatorObjectivePage() {
  const [result, setResult] = useState<ObjectiveAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const analysisResult = await analyzeCreatorObjective(formData);
      setResult(analysisResult);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Objective analysis failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/" className={styles.logo}>TheraLearn</Link>
        <h1 className={styles.title}>Forslag til læringsmål</h1>
        <p className={styles.description}>
          Vælg en tekstbaseret PDF med maskinlæsbar tekst. TheraLearn udtrækker indholdet og foreslår ét læringsmål til din godkendelse.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>PDF-fil</span>
            <input name="pdf" type="file" accept="application/pdf" required />
          </label>

          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? "Analyserer..." : "Analyser PDF" }
          </button>
        </form>

        {error ? <p className={styles.error} role="alert">{error}</p> : null}

        {result ? (
          <section className={styles.result}>
            <p className={styles.state}>{result.proposal.state}</p>
            <h2>Foreslået læringsmål</h2>
            <p>{result.proposal.statement}</p>
            <h3>Understøttende kildekontekst</h3>
            <blockquote className={styles.source}>
              {result.supportingSourceContext}
            </blockquote>
            <p className={styles.offsets}>
              Kildegrænse: {result.proposal.supportingSourceBoundary.startOffset} – {result.proposal.supportingSourceBoundary.endOffset}
            </p>
          </section>
        ) : null}
      </section>
    </main>
  );
}
