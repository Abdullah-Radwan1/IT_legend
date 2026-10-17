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
      className="modal-overlay flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="View PDF"
        className="flex h-screen w-screen flex-col overflow-hidden bg-surface-card shadow-none animate-[fadeIn_var(--transition-base)_both]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-base font-bold">PDF document</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-[var(--radius-md)] text-muted transition-colors hover:bg-surface hover:text-foreground [&_svg]:size-5"
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

        {/* PDF iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe src={url} className="size-full border-0" title="View PDF" />
        </div>
      </div>
    </div>
  );
}
