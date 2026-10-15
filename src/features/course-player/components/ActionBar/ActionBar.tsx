"use client";

import styles from "./ActionBar.module.scss";

interface ActionBarProps {
  onAskQuestion: () => void;
  onLeaderboard: () => void;
}

export default function ActionBar({
  onAskQuestion,
  onLeaderboard,
}: ActionBarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={styles.bar}
      aria-label="أدوات الكورس"
      role="navigation"
    >
      <div className={styles.inner}>
        {/* Curriculum */}
        <button
          className={styles.action}
          onClick={() => scrollTo("curriculum")}
          aria-label="انتقل إلى المنهج الدراسي"
        >
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="9" x2="9" y2="21" />
            </svg>
          </span>
          <span className={styles.label}>المنهج</span>
        </button>

        {/* Comments */}
        <button
          className={styles.action}
          onClick={() => scrollTo("comments")}
          aria-label="انتقل إلى التعليقات"
        >
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className={styles.label}>التعليقات</span>
        </button>

        {/* Ask a question */}
        <button
          className={styles.action}
          onClick={onAskQuestion}
          aria-label="اسأل سؤالاً"
          aria-haspopup="dialog"
        >
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.label}>اسأل سؤال</span>
        </button>

        {/* Leaderboard */}
        <button
          className={styles.action}
          onClick={onLeaderboard}
          aria-label="الليدر بورد"
          aria-haspopup="dialog"
        >
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          <span className={styles.label}>الليدر بورد</span>
        </button>
      </div>
    </nav>
  );
}
