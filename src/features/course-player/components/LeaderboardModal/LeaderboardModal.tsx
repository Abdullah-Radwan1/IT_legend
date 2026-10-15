"use client";

import { useEffect, useRef } from "react";
import type {
  LeaderboardEntry,
  MotivationalMessage,
  PerformanceTier,
  CourseProgress,
} from "../../models";
import styles from "./LeaderboardModal.module.scss";

interface LeaderboardModalProps {
  courseName: string;
  entries: LeaderboardEntry[];
  messages: MotivationalMessage[];
  progress: CourseProgress;
  onClose: () => void;
}

function getTier(percentage: number): PerformanceTier {
  if (percentage >= 90) return "top10";
  if (percentage >= 70) return "top30";
  if (percentage >= 50) return "mid60";
  return "low";
}

export default function LeaderboardModal({
  courseName,
  entries,
  messages,
  progress,
  onClose,
}: LeaderboardModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const tier = getTier(progress.percentage);
  const motivMessage = messages.find((m) => m.tier === tier)?.message ?? "";

  // Focus + keyboard handling
  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (
          e.shiftKey
            ? document.activeElement === first
            : document.activeElement === last
        ) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="الليدر بورد"
        className={styles.dialog}
      >
        {/* Header */}
        <div className={styles.header}>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="إغلاق"
            className={styles.closeBtn}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className={styles.titleBlock}>
            <span className={styles.courseName}>{courseName}</span>
            <span className={styles.title}>Leaderboard</span>
          </div>
        </div>

        {/* Motivational message */}
        <div className={styles.motivSection} aria-live="polite">
          <p className={styles.motivMsg}>{motivMessage} 💪</p>
        </div>

        {/* Table */}
        <div className={styles.body}>
          <table className={styles.table} aria-label="ترتيب الطلاب">
            <thead>
              <tr>
                <th scope="col">الترتيب</th>
                <th scope="col">الاسم</th>
                <th scope="col">النقاط</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.rank}
                  className={entry.isCurrentStudent ? styles.highlight : ""}
                  aria-label={
                    entry.isCurrentStudent ? "أنت – مستواك الحالي" : undefined
                  }
                >
                  <td>
                    {entry.rank <= 3 ? (
                      <span className={`${styles.medal} ${styles[`medal${entry.rank}`]}`} aria-label={`المركز ${entry.rank}`}>
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      <span className={styles.rankNum}>{entry.rank}</span>
                    )}
                  </td>
                  <td className={styles.nameCell}>
                    {entry.name}
                    {entry.isCurrentStudent && (
                      <span className={styles.youBadge}>أنت</span>
                    )}
                  </td>
                  <td>
                    <span className={styles.score}>{entry.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
