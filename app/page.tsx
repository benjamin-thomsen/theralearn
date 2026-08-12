import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          TheraLearn
        </Link>

        <nav className={styles.navigation} aria-label="Primær navigation">
          <Link href="/" className={styles.activeLink}>
            Forside
          </Link>

          <Link href="/pensum" className={styles.navigationLink}>
            Pensum
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Din digitale læringsplatform</p>

          <h1 className={styles.title}>
            Lær psykoterapi
            <span className={styles.titleAccent}> trin for trin</span>
          </h1>

          <p className={styles.description}>
            Få struktur på dit pensum, styrk din faglige forståelse og saml din
            læring ét sted.
          </p>

          <div className={styles.actions}>
            <Link href="/pensum" className={styles.primaryButton}>
              Gå til pensum
            </Link>

            <a href="#funktioner" className={styles.secondaryButton}>
              Se mulighederne
            </a>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.cardIcon}>TL</div>

          <p className={styles.cardLabel}>Din læringsrejse</p>

          <h2 className={styles.cardTitle}>
            Skab overblik over teori, metoder og refleksioner
          </h2>

          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span>Ugentligt mål</span>
              <span>65 %</span>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressBar} />
            </div>
          </div>
        </div>
      </section>

      <section id="funktioner" className={styles.features}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Alt samlet ét sted</p>
          <h2 className={styles.sectionTitle}>
            Et roligt rum til faglig fordybelse
          </h2>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <span className={styles.featureNumber}>01</span>
            <h3 className={styles.featureTitle}>Struktureret pensum</h3>
            <p className={styles.featureText}>
              Organisér bøger, artikler og undervisningsmateriale i et enkelt
              overblik.
            </p>
          </article>

          <article className={styles.featureCard}>
            <span className={styles.featureNumber}>02</span>
            <h3 className={styles.featureTitle}>Faglige noter</h3>
            <p className={styles.featureText}>
              Saml dine vigtigste pointer og refleksioner, mens du arbejder med
              stoffet.
            </p>
          </article>

          <article className={styles.featureCard}>
            <span className={styles.featureNumber}>03</span>
            <h3 className={styles.featureTitle}>Synlig udvikling</h3>
            <p className={styles.featureText}>
              Følg din progression og se, hvor langt du er kommet i din
              uddannelse.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}