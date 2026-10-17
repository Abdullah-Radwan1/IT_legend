"use client";

import { useState } from "react";
import {
  Clock,
  BookOpen,
  Users,
  Globe,
  Award,
  RefreshCw,
  FileBadge,
  ShieldCheck,
} from "lucide-react";
import type { CourseDetails, CourseMaterial, Exam } from "../../models";
import PdfModal from "../PdfModal/PdfModal";
import ExamModal from "../ExamModal/ExamModal";

interface CourseMaterialsProps {
  details: CourseDetails;
  materials: CourseMaterial[];
  exam: Exam;
}

export default function CourseMaterials({
  details,
  materials,
  exam,
}: CourseMaterialsProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [examOpen, setExamOpen] = useState(false);

  const courseDetails = [
    {
      label: "Duration",
      value: details.duration,
      icon: <Clock size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Level",
      value: details.level,
      icon: <Award size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Lessons",
      value: `${details.lessons} lessons`,
      icon: <BookOpen size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Certificate",
      value: details.certificate,
      icon: <FileBadge size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Enrolled",
      value: details.enrolled,
      icon: <Users size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Last updated",
      value: details.lastUpdated,
      icon: <RefreshCw size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Language",
      value: details.language,
      icon: <Globe size={22} className="shrink-0 text-muted" />,
    },
    {
      label: "Access",
      value: details.access,
      icon: <ShieldCheck size={22} className="shrink-0 text-muted" />,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-foreground lg:text-3xl mb-4">
        Course Materials
      </h2>
      <section
        aria-label="Course materials"
        className="rounded-sm bg-surface-card px-(--space-6) py-(--space-8) shadow-(--shadow-card)"
      >
        {/* Responsive Grid: 1 column on mobile, 2 columns on medium screens and up */}
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {courseDetails.map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center justify-between min-w-0 border-b border-border-light py-(--space-3)"
            >
              <dt className="flex items-center gap-(--space-2) text-xs font-medium text-muted">
                {icon}
                <span className="text-base ">{label}</span>
              </dt>
              <dd className="break-words text-sm font-semibold text-muted">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PDF Modal */}
      {pdfUrl && <PdfModal url={pdfUrl} onClose={() => setPdfUrl(null)} />}

      {/* Exam Modal */}
      {examOpen && <ExamModal exam={exam} onClose={() => setExamOpen(false)} />}
    </>
  );
}
