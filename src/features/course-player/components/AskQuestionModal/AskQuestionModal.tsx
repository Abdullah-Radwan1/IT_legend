"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskQuestionModal.module.scss";

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
        aria-label="اسأل سؤالاً"
        className={styles.dialog}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>اسأل سؤالاً</h2>
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
            <div className={styles.success}>
              <span className={styles.successIcon} aria-hidden="true">✅</span>
              <p>تم إرسال سؤالك بنجاح! سيتم الرد عليك قريباً.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="question-text" className={styles.label}>
                سؤالك
              </label>
              <textarea
                ref={textareaRef}
                id="question-text"
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب سؤالك بالتفصيل..."
                rows={6}
                maxLength={1000}
                required
              />
              <div className={styles.meta}>
                <span className={styles.charCount}>{text.length}/1000</span>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className={styles.sendBtn}
                  disabled={!text.trim()}
                >
                  إرسال السؤال
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
