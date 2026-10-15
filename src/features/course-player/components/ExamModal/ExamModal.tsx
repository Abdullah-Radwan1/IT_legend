"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Exam } from "../../models";
import styles from "./ExamModal.module.scss";

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
        className={styles.dialog}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{exam.title}</h2>
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
        </div>

        {/* Body */}
        <div className={styles.body}>
          {submitted ? (
            /* Results view */
            <div className={styles.results}>
              <div className={styles.scoreCircle}>
                <span className={styles.scoreNum}>{score}</span>
                <span className={styles.scoreTotal}>/{exam.questions.length}</span>
              </div>
              <p className={styles.resultMsg}>
                {score === exam.questions.length
                  ? "ممتاز! إجاباتك كلها صح 🎉"
                  : score >= exam.questions.length / 2
                  ? `أحسنت! أجبت على ${score} من ${exam.questions.length} صح 👏`
                  : `حاول تاني! أجبت على ${score} من ${exam.questions.length} صح 💪`}
              </p>
              <div className={styles.answerReview}>
                {exam.questions.map((q, idx) => {
                  const chosen = answers[q.id];
                  const correct = q.correctOptionId;
                  const isRight = chosen === correct;
                  return (
                    <div key={q.id} className={`${styles.reviewItem} ${isRight ? styles.right : styles.wrong}`}>
                      <span className={styles.reviewQ}>
                        {idx + 1}. {q.text}
                      </span>
                      <span className={styles.reviewA}>
                        {isRight ? "✓ " : "✗ "}
                        {q.options.find((o) => o.id === correct)?.text}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className={styles.closeResultBtn} onClick={onClose}>
                إغلاق
              </button>
            </div>
          ) : (
            /* Question view */
            <div className={styles.questionView}>
              {/* Progress */}
              <div className={styles.progress}>
                <span>
                  سؤال {currentIdx + 1} من {exam.questions.length}
                </span>
                <div className={styles.dots}>
                  {exam.questions.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${
                        i === currentIdx
                          ? styles.dotActive
                          : answers[exam.questions[i].id]
                          ? styles.dotAnswered
                          : ""
                      }`}
                      onClick={() => setCurrentIdx(i)}
                      aria-label={`سؤال ${i + 1}`}
                      aria-current={i === currentIdx ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Question text */}
              <fieldset className={styles.fieldset}>
                <legend className={styles.questionText}>
                  {currentQuestion.text}
                </legend>

                <div className={styles.options} role="radiogroup">
                  {currentQuestion.options.map((opt) => {
                    const selected = answers[currentQuestion.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`${styles.option} ${selected ? styles.selected : ""}`}
                      >
                        <input
                          type="radio"
                          name={`q-${currentQuestion.id}`}
                          value={opt.id}
                          checked={selected}
                          onChange={() => handleSelect(opt.id)}
                          className={styles.radioInput}
                        />
                        <span className={styles.radioCircle} aria-hidden="true" />
                        <span className={styles.optionText}>{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Navigation */}
              <div className={styles.nav}>
                <button
                  className={styles.navBtn}
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  aria-label="السؤال السابق"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  السابق
                </button>

                {isLast ? (
                  <button
                    className={`${styles.navBtn} ${styles.submitBtn}`}
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length === 0}
                    aria-label="تسليم الاختبار"
                  >
                    تسليم
                  </button>
                ) : (
                  <button
                    className={styles.navBtn}
                    onClick={handleNext}
                    aria-label="السؤال التالي"
                  >
                    التالي
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
