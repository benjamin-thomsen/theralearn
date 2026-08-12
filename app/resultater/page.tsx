"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type QuizResultat = {
  quizTitel: string;
  antalRigtige: number;
  antalSpoergsmaal: number;
};

const standardResultat: QuizResultat = {
  quizTitel: "Quizresultat",
  antalRigtige: 0,
  antalSpoergsmaal: 0,
};

function hentResultatFraUrl(): QuizResultat {
  const parametre = new URLSearchParams(window.location.search);

  const quizTitel = parametre.get("quiz") ?? standardResultat.quizTitel;
  const antalRigtige = Number(parametre.get("score"));
  const antalSpoergsmaal = Number(parametre.get("total"));

  if (
    !Number.isFinite(antalRigtige) ||
    !Number.isFinite(antalSpoergsmaal) ||
    antalRigtige < 0 ||
    antalSpoergsmaal <= 0
  ) {
    return standardResultat;
  }

  return {
    quizTitel,
    antalRigtige: Math.min(antalRigtige, antalSpoergsmaal),
    antalSpoergsmaal,
  };
}

function hentBesked(procent: number) {
  if (procent >= 90) {
    return {
      overskrift: "Fremragende resultat",
      tekst: "Du har et meget stærkt greb om emnet. Fortsæt det gode arbejde.",
    };
  }

  if (procent >= 70) {
    return {
      overskrift: "Flot klaret",
      tekst: "Du har godt styr på emnet. En kort repetition kan gøre din forståelse endnu stærkere.",
    };
  }

  if (procent >= 50) {
    return {
      overskrift: "Godt på vej",
      tekst: "Du har forstået en stor del af stoffet. Gennemgå de svære områder og prøv quizzen igen.",
    };
  }

  return {
    overskrift: "Bliv ved med at øve",
    tekst: "Resultatet viser, hvilke områder du med fordel kan arbejde videre med i pensum.",
  };
}

export default function ResultaterPage() {
  const [resultat, setResultat] = useState<QuizResultat>(standardResultat);
  const [erIndlaest, setErIndlaest] = useState(false);

  useEffect(() => {
    setResultat(hentResultatFraUrl());
    setErIndlaest(true);
  }, []);

  const harResultat = resultat.antalSpoergsmaal > 0;

  const procent = harResultat
    ? Math.round(
        (resultat.antalRigtige / resultat.antalSpoergsmaal) * 100,
      )
    : 0;

  const besked = hentBesked(procent);

  if (!erIndlaest) {
    return (
      <main className={styles.page}>
        <section className={styles.loading} aria-live="polite">
          <p>Indlæser dit resultat...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>TheraLearn quiz</p>
          <h1>Dit resultat</h1>
          <p>
            Se, hvordan det gik, og vælg dit næste skridt i din læring.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        {harResultat ? (
          <article className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <div>
                <p className={styles.resultLabel}>Gennemført quiz</p>
                <h2>{resultat.quizTitel}</h2>
              </div>

              <div
                className={styles.scoreCircle}
                aria-label={`${procent} procent rigtige`}
              >
                <strong>{procent}%</strong>
                <span>rigtige</span>
              </div>
            </div>

            <div className={styles.scoreDetails}>
              <div className={styles.scoreItem}>
                <span>Rigtige svar</span>
                <strong>{resultat.antalRigtige}</strong>
              </div>

              <div className={styles.scoreItem}>
                <span>Antal spørgsmål</span>
                <strong>{resultat.antalSpoergsmaal}</strong>
              </div>

              <div className={styles.scoreItem}>
                <span>Forkerte svar</span>
                <strong>
                  {resultat.antalSpoergsmaal - resultat.antalRigtige}
                </strong>
              </div>
            </div>

            <div className={styles.feedback}>
              <h3>{besked.overskrift}</h3>
              <p>{besked.tekst}</p>
            </div>

            <div className={styles.actions}>
              <Link href="/quiz" className={styles.primaryButton}>
                Tag en ny quiz
              </Link>

              <Link href="/pensum" className={styles.secondaryButton}>
                Gå til pensum
              </Link>
            </div>
          </article>
        ) : (
          <article className={styles.emptyCard}>
            <div className={styles.emptyIcon} aria-hidden="true">
              ?
            </div>

            <h2>Der er endnu ikke et resultat</h2>

            <p>
              Gennemfør en quiz for at se din score og få forslag til, hvad du
              kan arbejde videre med.
            </p>

            <Link href="/quiz" className={styles.primaryButton}>
              Find en quiz
            </Link>
          </article>
        )}
      </section>
    </main>
  );
}