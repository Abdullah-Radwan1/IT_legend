// NavBar – Desktop only (hidden on mobile via CSS)
// Server Component – no interactivity needed

import styles from "./NavBar.module.scss";

interface NavBarProps {
  courseName: string;
  instructor: string;
}

export default function NavBar({ courseName, instructor }: NavBarProps) {
  return (
    <header className={styles.nav} role="banner">
      <div className={styles.inner}>
        {/* Brand / Logo placeholder */}
        <div className={styles.brand} aria-label="ITLegend">
          <span className={styles.brandText}>
            IT<strong>Legend</strong>
          </span>
        </div>

        {/* Course info */}
        <div className={styles.courseInfo}>
          <span className={styles.courseName}>{courseName}</span>
          <span className={styles.instructor}>{instructor}</span>
        </div>

        {/* Navigation links */}
        <nav aria-label="Navigation links">
          <ul className={styles.navLinks}>
            <li>
              <a href="#" className={styles.navLink}>
                الرئيسية
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                كوراساتي
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                تواصل معنا
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
