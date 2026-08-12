import styles from "./page.module.css";

export default function PensumPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>📚 Pensum</h1>

        <p className={styles.subtitle}>
          Velkommen til TheraLearn.
        </p>

        <p className={styles.text}>
          Her kommer hele pensumoversigten til psykoterapeutuddannelsen.
          Du vil senere kunne:
        </p>

        <ul className={styles.list}>
          <li>✔ Se alle moduler</li>
          <li>✔ Læse teori</li>
          <li>✔ Tage noter</li>
          <li>✔ Markere emner som gennemført</li>
          <li>✔ Søge i hele pensum</li>
        </ul>

        <button className={styles.button}>
          Start læring
        </button>
      </div>
    </main>
  );
}