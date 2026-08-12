import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          TheraLearn
        </Link>

        <nav className={styles.navigation} aria-label="Primær navigation">
          <Link href="/" className={styles.navigationLink}>
            Forside
          </Link>

          <Link href="/pensum" className={styles.navigationLink}>
            Pensum
          </Link>
        </nav>
      </div>
    </header>
  );
}