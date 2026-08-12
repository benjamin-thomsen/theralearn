import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type PensumEmne = {
  titel: string;
  kategori: string;
  introduktion: string;
  laeringsmaal: string[];
  afsnit: {
    overskrift: string;
    tekst: string;
  }[];
};

const pensumEmner: Record<string, PensumEmne> = {
  "grundlaeggende-psykologi": {
    titel: "Grundlæggende psykologi",
    kategori: "Psykologisk grundforståelse",
    introduktion:
      "Dette emne giver dig en grundlæggende forståelse af menneskets tanker, følelser og adfærd.",
    laeringsmaal: [
      "Forstå centrale psykologiske begreber",
      "Kunne skelne mellem tanker, følelser og adfærd",
      "Få indsigt i menneskets psykologiske udvikling",
    ],
    afsnit: [
      {
        overskrift: "Hvad er psykologi?",
        tekst:
          "Psykologi er læren om menneskets tanker, følelser og adfærd. Faget undersøger, hvordan mennesker oplever sig selv, andre mennesker og verden omkring dem.",
      },
      {
        overskrift: "Tanker, følelser og adfærd",
        tekst:
          "Tanker, følelser og adfærd påvirker hinanden gensidigt. En bestemt tanke kan skabe en følelse, som efterfølgende kan påvirke den måde, vi handler på.",
      },
      {
        overskrift: "Individ og relation",
        tekst:
          "Mennesket udvikler sig i relation til andre. Familie, venner, kultur og tidligere erfaringer har betydning for, hvordan vi forstår os selv og indgår i relationer.",
      },
    ],
  },
  "kommunikation-og-relation": {
    titel: "Kommunikation og relation",
    kategori: "Terapeutiske grundfærdigheder",
    introduktion:
      "Dette emne handler om kommunikationens betydning for kontakt, tillid og udvikling i den terapeutiske relation.",
    laeringsmaal: [
      "Forstå verbal og nonverbal kommunikation",
      "Kunne anvende aktiv lytning",
      "Få indsigt i den terapeutiske relations betydning",
    ],
    afsnit: [
      {
        overskrift: "Verbal og nonverbal kommunikation",
        tekst:
          "Kommunikation består både af de ord, vi bruger, og den måde, vi udtrykker os på gennem tonefald, kropssprog, ansigtsudtryk og pauser.",
      },
      {
        overskrift: "Aktiv lytning",
        tekst:
          "Aktiv lytning indebærer at være nærværende, nysgerrig og opmærksom. Terapeuten forsøger at forstå klientens oplevelse uden at afbryde eller komme med hurtige løsninger.",
      },
      {
        overskrift: "Den terapeutiske relation",
        tekst:
          "En tryg og respektfuld relation skaber et vigtigt fundament for terapeutisk arbejde. Klienten skal opleve sig set, hørt og mødt uden fordømmelse.",
      },
    ],
  },
  "etik-og-professionel-praksis": {
    titel: "Etik og professionel praksis",
    kategori: "Professionel udvikling",
    introduktion:
      "Dette emne introducerer centrale etiske principper og det professionelle ansvar i psykoterapeutisk arbejde.",
    laeringsmaal: [
      "Forstå betydningen af tavshedspligt",
      "Kunne identificere professionelle grænser",
      "Reflektere over terapeutens ansvar og rolle",
    ],
    afsnit: [
      {
        overskrift: "Tavshedspligt",
        tekst:
          "Tavshedspligt er afgørende for klientens tryghed. Oplysninger fra terapien skal behandles fortroligt og må ikke deles uden et gyldigt grundlag.",
      },
      {
        overskrift: "Professionelle grænser",
        tekst:
          "Terapeuten har ansvar for at skabe tydelige rammer omkring kontakten. Det gælder blandt andet aftaler, kommunikation, roller og relationens formål.",
      },
      {
        overskrift: "Etisk refleksion",
        tekst:
          "Etiske dilemmaer har ikke altid en enkel løsning. Derfor er løbende refleksion, supervision og faglig sparring vigtige dele af professionel praksis.",
      },
    ],
  },
};

type PensumEmnePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(pensumEmner).map((slug) => ({
    slug,
  }));
}

export default async function PensumEmnePage({
  params,
}: PensumEmnePageProps) {
  const { slug } = await params;
  const emne = pensumEmner[slug];

  if (!emne) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          TheraLearn
        </Link>

        <nav className={styles.navigation} aria-label="Primær navigation">
          <Link href="/" className={styles.navigationLink}>
            Forside
          </Link>

          <Link href="/pensum" className={styles.activeLink}>
            Pensum
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <Link href="/pensum" className={styles.backLink}>
            ← Tilbage til pensum
          </Link>

          <p className={styles.eyebrow}>{emne.kategori}</p>
          <h1 className={styles.title}>{emne.titel}</h1>
          <p className={styles.introduction}>{emne.introduktion}</p>
        </div>
      </section>

      <section className={styles.content}>
        <aside className={styles.learningGoals}>
          <p className={styles.sectionLabel}>Læringsmål</p>
          <h2 className={styles.sectionTitle}>Efter dette emne kan du</h2>

          <ul className={styles.goalList}>
            {emne.laeringsmaal.map((maal) => (
              <li key={maal} className={styles.goalItem}>
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
                <span>{maal}</span>
              </li>
            ))}
          </ul>
        </aside>

        <article className={styles.article}>
          {emne.afsnit.map((afsnit, index) => (
            <section key={afsnit.overskrift} className={styles.articleSection}>
              <span className={styles.sectionNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className={styles.articleTitle}>{afsnit.overskrift}</h2>
                <p className={styles.articleText}>{afsnit.tekst}</p>
              </div>
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}