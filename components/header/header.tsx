import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ImmoPro</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Annonces</Link>
        </nav>
      </div>
    </header>
  );
}