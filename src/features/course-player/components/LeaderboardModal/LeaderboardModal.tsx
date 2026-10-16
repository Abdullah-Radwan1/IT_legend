"use client";

import { useEffect, useRef } from "react";
import type {
  LeaderboardEntry,
  MotivationalMessage,
  PerformanceTier,
  CourseProgress,
} from "../../models";
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
        aria-label="Leaderboard"
        className="flex max-h-[90vh] w-[min(96vw,480px)] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] px-[var(--space-5)] py-[var(--space-4)]">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-[var(--radius-md)] text-[rgba(255,255,255,0.8)] transition-colors hover:bg-[rgba(255,255,255,0.15)] hover:text-white [&_svg]:size-5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-[family-name:var(--font-latin)] text-xs font-light text-[rgba(255,255,255,0.75)]">{courseName}</span>
            <span className="font-[family-name:var(--font-latin)] text-[1.2rem] font-semibold tracking-[-0.01em] text-white">Leaderboard</span>
          </div>
        </div>

        {/* Motivational message */}
        <div className="shrink-0 border-b border-[var(--color-border-light)] bg-[rgba(24,37,120,0.04)] p-[var(--space-5)]" aria-live="polite">
          <p className="text-left font-[family-name:var(--font-latin)] text-sm font-light leading-[1.7] text-[var(--color-success)]">{motivMessage} 💪</p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse [&_thead_tr]:border-b [&_thead_tr]:border-[var(--color-border)] [&_thead_tr]:bg-[var(--color-surface)] [&_th]:px-[var(--space-4)] [&_th]:py-[var(--space-3)] [&_th]:text-left [&_th]:font-[family-name:var(--font-latin)] [&_th]:text-xs [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.04em] [&_th]:text-[var(--color-text-muted)] [&_td]:border-b [&_td]:border-[var(--color-border-light)] [&_td]:px-[var(--space-4)] [&_td]:py-[var(--space-3)] [&_td]:align-middle [&_td]:font-[family-name:var(--font-latin)] [&_td]:text-sm [&_td]:font-light [&_td]:text-[var(--color-text-secondary)] [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[var(--color-surface)]" aria-label="Student leaderboard">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.rank}
                  className={entry.isCurrentStudent ? "[&>td]:!font-bold [&>td]:!text-[var(--color-brand-primary)] !bg-[rgba(24,37,120,0.05)] hover:!bg-[rgba(24,37,120,0.08)] [&_.score]:!text-[var(--color-brand-primary)]" : ""}
                  aria-label={
                    entry.isCurrentStudent ? "You – your current rank" : undefined
                  }
                >
                  <td>
                    {entry.rank <= 3 ? (
                      <span className="inline-block text-xl" aria-label={`Rank ${entry.rank}`}>
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      <span className="font-[family-name:var(--font-latin)] text-sm font-medium text-[var(--color-text-muted)]">{entry.rank}</span>
                    )}
                  </td>
                  <td>
                    <span className="flex items-center gap-[var(--space-2)]">
                    {entry.name}
                    {entry.isCurrentStudent && (
                      <span className="rounded-full bg-[rgba(65,182,157,0.1)] px-[var(--space-2)] py-px font-[family-name:var(--font-latin)] text-[0.65rem] font-bold text-[var(--color-success)]">You</span>
                    )}
                    </span>
                  </td>
                  <td>
                    <span className="font-[family-name:var(--font-latin)] text-sm font-semibold text-[var(--color-text-secondary)]">{entry.score}</span>
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
