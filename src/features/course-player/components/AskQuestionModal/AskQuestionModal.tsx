"use client";

import { useEffect, useRef, useState } from "react";
const DRAFT_KEY = "ask_question_draft";

interface AskQuestionModalProps {
  onClose: () => void;
}

export default function AskQuestionModal({ onClose }: AskQuestionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restore draft from sessionStorage
  const [text, setText] = useState<string>(() => {
    try {
      return sessionStorage.getItem(DRAFT_KEY) ?? "";
    } catch {
      return "";
    }
  });

  const [submitted, setSubmitted] = useState(false);

  // Save draft on every change
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, text);
    } catch {}
  }, [text]);

  // Focus + keyboard handling
  useEffect(() => {
    textareaRef.current?.focus();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    // Clear draft after submission
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
    setSubmitted(true);
    setTimeout(() => onClose(), 1800);
  };

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
        aria-label="Ask a question"
        className="flex w-[min(96vw,580px)] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)]">
          <h2 className="font-[family-name:var(--font-latin)] text-base font-bold text-[var(--color-brand-dark)]">Ask a question</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] [&_svg]:size-5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-[var(--space-6)]">
          {submitted ? (
            <div className="flex flex-col items-center gap-[var(--space-4)] px-[var(--space-4)] py-[var(--space-8)] text-center">
              <span className="text-5xl" aria-hidden="true">✅</span>
              <p className="font-[family-name:var(--font-latin)] text-base font-light text-[var(--color-success)]">Your question was sent successfully. We’ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-4)]">
              <label htmlFor="question-text" className="font-[family-name:var(--font-latin)] text-sm font-bold text-[var(--color-text-secondary)]">
                Your question
              </label>
              <textarea
                ref={textareaRef}
                id="question-text"
                className="min-h-[140px] w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-[var(--color-text-secondary)] transition-[border-color,box-shadow] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-brand-accent)] focus:outline-none focus:ring-[3px] focus:ring-[rgba(72,82,147,0.12)]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your question in detail..."
                rows={6}
                maxLength={1000}
                required
              />
              <div className="flex justify-end">
                <span className="font-[family-name:var(--font-latin)] text-xs text-[var(--color-text-muted)]">{text.length}/1000</span>
              </div>
              <div className="flex justify-end gap-[var(--space-3)] pt-[var(--space-2)]">
                <button
                  type="button"
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)]"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] px-[var(--space-6)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-[0.9rem] font-bold text-white transition-colors hover:not-disabled:bg-[var(--color-brand-dark)] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!text.trim()}
                >
                  Send question
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
