import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2>TheraLearn</h2>
          <p>
            En moderne læringsplatform for psykoterapeuter og studerende.
          </p>
        </div>

        <nav className={styles.navigation}>
          <Link href="/">Forside</Link>
          <Link href="/pensum">Pensum</Link>
        </nav>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} TheraLearn. Alle rettigheder forbeholdes.
        </p>
      </div>
    </footer>
  );
}