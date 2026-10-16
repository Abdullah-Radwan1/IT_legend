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
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
      className="modal-overlay flex items-center justify-center p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Leaderboard"
        className="flex max-h-[90vh] w-[min(96vw,480px)] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-surface-card shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-6 py-4 border-b border-border-light text-center">
          <div className="flex flex-col items-center flex-1 gap-0.5">
            <span className="text-xs font-light text-brand-primary">
              {courseName}
            </span>
            <span className="text-xl font-semibold text-brand-primary">
              Leaderboard
            </span>
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-[var(--radius-md)] text-white/80 transition-colors hover:bg-white/15 hover:text-white [&_svg]:size-5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Motivational message */}
        <div className="shrink-0 px-6 py-3 text-center" aria-live="polite">
          <p className="text-base font-medium leading-[1.7] text-brand-accent bg-brand-accent/10 rounded p-2 my-6">
            {motivMessage} 💪
          </p>
        </div>

        {/* Leaderboard cards */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-brand-accent/10 p-[var(--space-4)]">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-3 rounded-[var(--radius-md)] border p-3 transition-colors ${
                entry.isCurrentStudent
                  ? "border-brand-primary/30 bg-brand-primary/5"
                  : "border-border-light bg-surface hover:bg-surface-card"
              }`}
              aria-label={
                entry.isCurrentStudent
                  ? `${entry.name}, your current rank ${entry.rank}`
                  : undefined
              }
            >
              {/* Rank */}
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-lg">
                {entry.rank <= 3 ? (
                  <span aria-label={`Rank ${entry.rank}`}>
                    {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-muted">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Student name */}
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm ${
                    entry.isCurrentStudent
                      ? "font-bold text-brand-primary"
                      : "font-medium text-foreground"
                  }`}
                >
                  {entry.name}
                </p>

                {entry.isCurrentStudent && (
                  <span className="mt-1 inline-block rounded-full bg-success/10 px-2 py-0.5 text-[0.65rem] font-bold text-success">
                    You
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
