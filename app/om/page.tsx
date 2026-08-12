import Link from "next/link";
import styles from "./page.module.css";

export default function OmPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Om TheraLearn</h1>

        <p className={styles.intro}>
          TheraLearn er en digital læringsplatform udviklet til
          psykoterapeutstuderende. Formålet er at gøre pensumlæsning,
          repetition og quiztræning lettere og mere motiverende.
        </p>

        <div className={styles.section}>
          <h2>Hvad kan du bruge TheraLearn til?</h2>

          <ul>
            <li>📚 Læse pensum opdelt i overskuelige moduler</li>
            <li>🧠 Teste din viden med quizzer</li>
            <li>📈 Følge dine resultater og din udvikling</li>
            <li>✅ Repetere teorien før eksamen</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <Link href="/" className={styles.button}>
            Til forsiden
          </Link>

          <Link href="/pensum" className={styles.secondaryButton}>
            Gå til pensum
          </Link>
        </div>
      </section>
    </main>
  );
}