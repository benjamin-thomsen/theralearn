import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>404</p>

          <h1 className={styles.title}>Siden blev ikke fundet</h1>

          <p className={styles.description}>
            Den side, du leder efter, findes ikke eller er blevet flyttet.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Til forsiden
            </Link>

            <Link href="/pensum" className={styles.secondaryButton}>
              Gå til pensum
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}