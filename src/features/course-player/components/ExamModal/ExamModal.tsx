"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exam } from "../../models";

interface ExamModalProps {
  exam: Exam;
  onClose: () => void;
}

// Fallback if the exam has no duration: 1 minute per question
const SECONDS_PER_QUESTION = 60;

// Each question card takes this much of the width, so the next one peeks in
const SLIDE_WIDTH_PERCENT = 94;
const SLIDE_GAP_PX = 16;

// Short pause so the picked answer is visible before sliding to the next card
const ANSWER_DELAY_MS = 250;

const STORAGE_KEY_ANSWERS = (examId: string) => `exam_answers_${examId}`;
const STORAGE_KEY_QUESTION = (examId: string) => `exam_question_${examId}`;
const STORAGE_KEY_END_TIME = (examId: string) => `exam_end_time_${examId}`;

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function ExamModal({ exam, onClose }: ExamModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const answerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleCloseRef = useRef<() => void>(() => {});

  const totalSeconds =
    ((exam as Exam & { durationMinutes?: number }).durationMinutes ?? 0) * 60 ||
    exam.questions.length * SECONDS_PER_QUESTION;

  // Restore persisted state
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    try {
      const idx =
        parseInt(
          sessionStorage.getItem(STORAGE_KEY_QUESTION(exam.id)) ?? "0",
          10,
        ) || 0;
      return Math.min(Math.max(idx, 0), exam.questions.length - 1);
    } catch {
      return 0;
    }
  });

  // Submitted answers only (locked once submitted)
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_ANSWERS(exam.id));
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // The option just clicked on the active question (briefly highlighted, also locks input)
  const [selected, setSelected] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  // Timer: store the end timestamp so refresh doesn't reset it
  const [endTime] = useState<number>(() => {
    try {
      const saved = parseInt(
        sessionStorage.getItem(STORAGE_KEY_END_TIME(exam.id)) ?? "",
        10,
      );
      if (saved) return saved;
    } catch {}
    return Date.now() + totalSeconds * 1000;
  });

  const [remaining, setRemaining] = useState<number>(() =>
    Math.max(0, Math.ceil((endTime - Date.now()) / 1000)),
  );

  const currentQuestion = exam.questions[currentIdx];
  const isLast = currentIdx === exam.questions.length - 1;

  // Persist state on change (skipped after submission)
  useEffect(() => {
    if (submitted) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY_ANSWERS(exam.id),
        JSON.stringify(answers),
      );
    } catch {}
  }, [answers, exam.id, submitted]);

  useEffect(() => {
    if (submitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY_QUESTION(exam.id), String(currentIdx));
    } catch {}
  }, [currentIdx, exam.id, submitted]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_END_TIME(exam.id), String(endTime));
    } catch {}
  }, [endTime, exam.id]);

  const finishExam = useCallback(() => {
    setSubmitted(true);
    try {
      sessionStorage.removeItem(STORAGE_KEY_ANSWERS(exam.id));
      sessionStorage.removeItem(STORAGE_KEY_QUESTION(exam.id));
      sessionStorage.removeItem(STORAGE_KEY_END_TIME(exam.id));
    } catch {}
  }, [exam.id]);

  const handleClose = useCallback(() => {
    if (!submitted && selected && answerTimeoutRef.current) {
      clearTimeout(answerTimeoutRef.current);
      answerTimeoutRef.current = null;

      if (isLast) {
        finishExam();
      } else {
        try {
          sessionStorage.setItem(
            STORAGE_KEY_ANSWERS(exam.id),
            JSON.stringify({ ...answers, [currentQuestion.id]: selected }),
          );
          sessionStorage.setItem(
            STORAGE_KEY_QUESTION(exam.id),
            String(currentIdx + 1),
          );
        } catch {}
      }
    }

    onClose();
  }, [
    answers,
    currentIdx,
    currentQuestion.id,
    exam.id,
    finishExam,
    isLast,
    onClose,
    selected,
    submitted,
  ]);
  handleCloseRef.current = handleClose;

  // Countdown tick
  useEffect(() => {
    if (submitted) return;
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime, submitted]);

  // Time is up: alert, then close the modal
  useEffect(() => {
    if (submitted || remaining > 0) return;
    finishExam();
    window.alert("Time is up! The exam has ended.");
    onClose();
  }, [remaining, submitted, finishExam, onClose]);

  // Clear any pending answer timer on unmount
  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current) clearTimeout(answerTimeoutRef.current);
    };
  }, []);

  // Focus + keyboard handling
  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseRef.current();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
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
  }, []);

  // Clicking an answer submits it immediately, then moves on in order
  const handleSelect = (optionId: string) => {
    if (submitted || selected) return;
    const questionId = currentQuestion.id;
    setSelected(optionId);

    answerTimeoutRef.current = setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      setSelected(null);
      if (isLast) {
        finishExam();
        onClose();
      } else {
        setCurrentIdx((i) => i + 1);
      }
    }, ANSWER_DELAY_MS);
  };

  const isLowTime = remaining <= 30;

  return (
    <div
      className="modal-overlay bg-[#3f56b8]"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="flex h-dvh w-screen flex-col items-center overflow-hidden bg-[#3f56b8] shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Timer */}
        <div className="relative flex w-full shrink-0 items-center justify-center">
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Close exam"
            className="absolute right-4 top-3 flex size-10 items-center justify-center rounded-full text-2xl text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-4"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          {!submitted && (
            <div
              role="timer"
              aria-live="off"
              aria-label={`Time remaining ${formatTime(remaining)}`}
              className={`my-3 flex items-center gap-2 rounded-full bg-[#fad300] px-4 py-1.5 text-sm font-bold tabular-nums text-white shadow-lg shadow-[#717986] sm:my-4 ${isLowTime ? "animate-pulse" : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="13" r="8" />
                <polyline points="12 9 12 13 15 15" />
                <line x1="9" y1="2" x2="15" y2="2" />
              </svg>
              {formatTime(remaining)}
            </div>
          )}
        </div>

        {/* Question circles (numbers only, no checkmarks) */}
        <div className="w-full shrink-0 px-[var(--space-4)] pb-2 sm:px-[var(--space-5)] sm:pb-[var(--space-4)]">
          {!submitted && (
            <ol
              className="flex w-full items-center gap-[var(--space-2)] overflow-x-auto px-1 py-2 [&>li:first-child]:ms-auto [&>li:last-child]:me-auto"
              aria-label="Exam progress"
            >
              {exam.questions.map((q, i) => {
                const isCurrent = i === currentIdx;
                const isAnswered = Boolean(answers[q.id]);
                return (
                  <li
                    key={q.id}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}`}
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors sm:size-12 ${
                      isCurrent
                        ? "border-[#fefefe] bg-[#fefefe] text-[#3f56b8] ring-4"
                        : "border-white/50 bg-transparent text-white/80"
                    }`}
                  >
                    {i + 1}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Body: takes the remaining height, cards fill it */}
        <div className="flex  min-h-0 w-full flex-1 flex-col px-[var(--space-4)] pb-[var(--space-4)] sm:p-[var(--space-6)]">
          <div className="mx-auto flex min-h-0 w-full max-w-[860px] flex-1 flex-col">
            {/* Viewport clips the track and fills the available height */}
            <div dir="ltr" className="min-h-0  flex-1 overflow-hidden sm:-mx-4">
              <div
                className="flex h-full items-stretch transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  gap: `${SLIDE_GAP_PX}px`,
                  transform: `translateX(calc(${currentIdx} * -1 * (${SLIDE_WIDTH_PERCENT}% + ${SLIDE_GAP_PX}px)))`,
                }}
              >
                {exam.questions.map((q, i) => {
                  const isCurrent = i === currentIdx;
                  return (
                    <div
                      key={q.id}
                      aria-hidden={!isCurrent}
                      className={`flex h-full min-w-0  shrink-0 flex-col gap-[var(--space-4)] overflow-y-auto rounded-[var(--radius-lg)] border border-[#e3e6f3] bg-[#fefefe] p-[var(--space-4)] shadow-md sm:gap-[var(--space-5)] sm:p-[var(--space-10)] ${isCurrent ? "" : "pointer-events-none select-none"}`}
                      style={{ flexBasis: `${SLIDE_WIDTH_PERCENT}%` }}
                    >
                      <span className="text-sm font-bold text-muted">
                        {i + 1}.
                      </span>
                      <h3
                        id={`q-label-${q.id}`}
                        dir="auto"
                        className="text-base font-bold leading-[1.6] text-foreground sm:text-[1.1rem]"
                      >
                        {q.text}
                      </h3>
                      <div
                        className="flex flex-col gap-[var(--space-3)]"
                        role="radiogroup"
                        aria-labelledby={`q-label-${q.id}`}
                      >
                        {q.options.map((opt) => {
                          const isSelected = isCurrent && selected === opt.id;
                          return (
                            <label
                              key={opt.id}
                              className={`flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border-2 bg-[#fefefe] px-[var(--space-3)] py-[var(--space-3)] shadow-sm transition-[border-color,transform,box-shadow] sm:px-[var(--space-4)] sm:py-[var(--space-4)] ${isCurrent ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : ""} ${isSelected ? "border-[#fad300] ring-2 ring-[#fad300]/60" : "border-[#e3e6f3]"}`}
                            >
                              <input
                                type="radio"
                                name={`q-${q.id}`}
                                value={opt.id}
                                checked={isSelected}
                                disabled={!isCurrent}
                                onChange={() => handleSelect(opt.id)}
                                className="peer sr-only"
                              />
                              <span
                                className="relative size-5 shrink-0 rounded-full border-2 border-border transition-[border-color,background-color] after:absolute after:inset-[3px] after:hidden after:rounded-full after:bg-white after:content-[''] peer-checked:border-[#3f56b8] peer-checked:bg-[#3f56b8] peer-checked:after:block"
                                aria-hidden="true"
                              />
                              <span
                                dir="auto"
                                className="min-w-0 text-[0.9rem] font-light text-foreground"
                              >
                                {opt.text}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
