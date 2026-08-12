import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>TheraLearn</p>

          <h1 className={styles.title}>Indlæser…</h1>

          <p className={styles.description}>
            Vi henter indholdet. Vent et øjeblik.
          </p>
        </div>
      </section>
    </main>
  );
}