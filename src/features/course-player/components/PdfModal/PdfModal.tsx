"use client";

import { useEffect, useRef } from "react";
interface PdfModalProps {
  url: string;
  onClose: () => void;
}

export default function PdfModal({ url, onClose }: PdfModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Trap focus inside modal
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
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
        aria-label="عرض ملف PDF"
        className="flex h-[min(92vh,800px)] w-[min(96vw,1000px)] flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-card)] shadow-[var(--shadow-modal)] animate-[slideUp_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-[var(--space-5)] py-[var(--space-4)]">
          <h2 className="font-[family-name:var(--font-arabic)] text-base font-bold text-[var(--color-brand-dark)]">ملف PDF</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="إغلاق"
            className="flex size-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] [&_svg]:size-5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={url}
            className="size-full border-0"
            title="عرض ملف PDF"
          />
        </div>
      </div>
    </div>
  );
}
