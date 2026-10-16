"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exam } from "../../models";
interface ExamModalProps {
  exam: Exam;
  onClose: () => void;
}

const STORAGE_KEY_ANSWERS = (examId: string) => `exam_answers_${examId}`;
const STORAGE_KEY_QUESTION = (examId: string) => `exam_question_${examId}`;

export default function ExamModal({ exam, onClose }: ExamModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Restore persisted state
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    try {
      return (
        parseInt(
          sessionStorage.getItem(STORAGE_KEY_QUESTION(exam.id)) ?? "0",
          10
        ) || 0
      );
    } catch {
      return 0;
    }
  });

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_ANSWERS(exam.id));
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = exam.questions[currentIdx];
  const isLast = currentIdx === exam.questions.length - 1;

  // Persist state on change
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY_ANSWERS(exam.id),
        JSON.stringify(answers)
      );
    } catch {}
  }, [answers, exam.id]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY_QUESTION(exam.id),
        String(currentIdx)
      );
    } catch {}
  }, [currentIdx, exam.id]);

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

  const handleSelect = (optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (!isLast) setCurrentIdx((i) => i + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    // Clear session storage after submission
    try {
      sessionStorage.removeItem(STORAGE_KEY_ANSWERS(exam.id));
      sessionStorage.removeItem(STORAGE_KEY_QUESTION(exam.id));
    } catch {}
  }, [exam.id]);

  const score = submitted
    ? exam.questions.filter((q) => answers[q.id] === q.correctOptionId).length
    : 0;

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
        aria-label={exam.title}
        className="flex max-h-[90vh] w-[min(96vw,680px)] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)]">
          <h2 className="font-[family-name:var(--font-latin)] text-base font-bold text-[var(--color-brand-dark)]">{exam.title}</h2>
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
        <div className="flex-1 overflow-y-auto p-[var(--space-6)]">
          {submitted ? (
            /* Results view */
            <div className="flex flex-col items-center gap-[var(--space-6)] text-center">
              <div className="flex size-[120px] items-center justify-center gap-0.5 rounded-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] shadow-[0_8px_32px_rgba(24,37,120,0.3)]">
                <span className="font-[family-name:var(--font-latin)] text-[2.5rem] font-semibold text-white">{score}</span>
                <span className="self-end pb-[0.4rem] font-[family-name:var(--font-latin)] text-base font-light text-[rgba(255,255,255,0.7)]">/{exam.questions.length}</span>
              </div>
              <p className="max-w-[400px] font-[family-name:var(--font-latin)] text-[1.1rem] font-light text-[var(--color-text-secondary)]">
                {score === exam.questions.length
                  ? "Excellent! You got every answer right! 🎉"
                  : score >= exam.questions.length / 2
                  ? `Well done! You got ${score} out of ${exam.questions.length} correct. 👏`
                  : `Keep practicing! You got ${score} out of ${exam.questions.length} correct. 💪`}
              </p>
              <div className="flex w-full flex-col gap-[var(--space-3)] text-start">
                {exam.questions.map((q, idx) => {
                  const chosen = answers[q.id];
                  const correct = q.correctOptionId;
                  const isRight = chosen === correct;
                  return (
                    <div key={q.id} className={`rounded-[var(--radius-md)] border-s-4 px-[var(--space-4)] py-[var(--space-3)] ${isRight ? "border-[var(--color-success)] bg-[rgba(65,182,157,0.1)]" : "border-[var(--color-danger)] bg-[rgba(231,100,126,0.08)]"}`}>
                      <span className="mb-[var(--space-1)] block font-[family-name:var(--font-latin)] text-sm text-[var(--color-text-secondary)]">
                        {idx + 1}. {q.text}
                      </span>
                      <span className="block font-[family-name:var(--font-latin)] text-[0.8rem] text-[var(--color-text-muted)]">
                        {isRight ? "✓ " : "✗ "}
                        {q.options.find((o) => o.id === correct)?.text}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] px-[var(--space-8)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-base font-bold text-white transition-colors hover:bg-[var(--color-brand-dark)]" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            /* Question view */
            <div className="flex flex-col gap-[var(--space-6)]">
              {/* Progress */}
              <div className="flex items-center justify-between font-[family-name:var(--font-latin)] text-sm text-[var(--color-text-muted)]">
                <span>
                  Question {currentIdx + 1} of {exam.questions.length}
                </span>
                <div className="flex gap-[var(--space-2)]">
                  {exam.questions.map((_, i) => (
                    <button
                      key={i}
                      className={`size-2.5 rounded-full transition-[background-color,transform] hover:scale-[1.3] ${i === currentIdx ? "bg-[var(--color-brand-primary)]" : answers[exam.questions[i].id] ? "bg-[var(--color-progress-fill)]" : "bg-[var(--color-progress-bg)]"}`}
                      onClick={() => setCurrentIdx(i)}
                      aria-label={`Question ${i + 1}`}
                      aria-current={i === currentIdx ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Question text */}
              <fieldset className="border-0 p-0">
                <legend className="mb-[var(--space-5)] block font-[family-name:var(--font-latin)] text-[1.1rem] font-bold leading-[1.6] text-[var(--color-text-secondary)]">
                  {currentQuestion.text}
                </legend>

                <div className="flex flex-col gap-[var(--space-3)]" role="radiogroup">
                  {currentQuestion.options.map((opt) => {
                    const selected = answers[currentQuestion.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border px-[var(--space-4)] py-[var(--space-4)] transition-[background-color,border-color] hover:border-[var(--color-brand-accent)] hover:bg-[rgba(72,82,147,0.04)] ${selected ? "border-[var(--color-brand-primary)] bg-[rgba(24,37,120,0.06)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}
                      >
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          value={opt.id}
                          checked={selected}
                          onChange={() => handleSelect(opt.id)}
                          className="peer sr-only"
                        />
                        <span className="relative size-5 shrink-0 rounded-full border-2 border-[var(--color-border)] transition-[border-color,background-color] after:absolute after:inset-[3px] after:hidden after:rounded-full after:bg-white after:content-[''] peer-checked:border-[var(--color-brand-primary)] peer-checked:bg-[var(--color-brand-primary)] peer-checked:after:block" aria-hidden="true" />
                        <span className="font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-[var(--color-text-secondary)]">{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Navigation */}
              <div className="flex justify-between gap-[var(--space-3)] border-t border-[var(--color-border)] pt-[var(--space-4)]">
                <button
                  className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-[var(--color-text-secondary)] transition-colors hover:not-disabled:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-4"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  aria-label="Previous question"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Previous
                </button>

                {isLast ? (
                  <button
                    className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] px-[var(--space-5)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-white transition-colors hover:not-disabled:border-[var(--color-brand-dark)] hover:not-disabled:bg-[var(--color-brand-dark)] disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-4"
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length === 0}
                    aria-label="Submit exam"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-3)] font-[family-name:var(--font-latin)] text-[0.9rem] font-light text-[var(--color-text-secondary)] transition-colors hover:not-disabled:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:size-4"
                    onClick={handleNext}
                    aria-label="Next question"
                  >
                    Next
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
