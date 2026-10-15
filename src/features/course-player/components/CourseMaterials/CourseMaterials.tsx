"use client";

import { useState } from "react";
import type { CourseMaterial, Exam } from "../../models";
import PdfModal from "../PdfModal/PdfModal";
import ExamModal from "../ExamModal/ExamModal";
import styles from "./CourseMaterials.module.scss";

interface CourseMaterialsProps {
  materials: CourseMaterial[];
  exam: Exam;
}

export default function CourseMaterials({
  materials,
  exam,
}: CourseMaterialsProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [examOpen, setExamOpen] = useState(false);

  const handleMaterial = (mat: CourseMaterial) => {
    if (mat.type === "pdf" && mat.url) {
      setPdfUrl(mat.url);
    } else if (mat.type === "exam") {
      setExamOpen(true);
    } else if (mat.type === "link" && mat.url) {
      window.open(mat.url, "_blank", "noopener,noreferrer");
    }
  };

  const typeLabel: Record<string, string> = {
    pdf: "PDF",
    exam: "اختبار",
    video: "فيديو",
    link: "رابط",
  };

  const typeIcon: Record<string, React.ReactNode> = {
    pdf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="10" y1="9" x2="14" y2="9" />
      </svg>
    ),
    exam: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    video: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  };

  return (
    <>
      <section aria-label="مواد الكورس" className={styles.section}>
        <h2 className={styles.heading}>Course Materials</h2>

        <ul className={styles.list} role="list">
          {materials.map((mat) => (
            <li key={mat.id}>
              <button
                className={styles.item}
                onClick={() => handleMaterial(mat)}
                aria-label={`${mat.title} – ${typeLabel[mat.type] ?? mat.type}`}
              >
                <span className={`${styles.typeIcon} ${styles[mat.type]}`}>
                  {typeIcon[mat.type]}
                </span>
                <span className={styles.itemContent}>
                  <span className={styles.itemTitle}>{mat.title}</span>
                  <span className={styles.itemType}>{typeLabel[mat.type]}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* PDF Modal */}
      {pdfUrl && (
        <PdfModal url={pdfUrl} onClose={() => setPdfUrl(null)} />
      )}

      {/* Exam Modal */}
      {examOpen && (
        <ExamModal exam={exam} onClose={() => setExamOpen(false)} />
      )}
    </>
  );
}
