"use client";

import { useState } from "react";
import type { CurriculumSection } from "../../models";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { FileText, CircleHelp, Lock, ChevronDown, Minus } from "lucide-react";

interface CurriculumProps {
  sections: CurriculumSection[];
  onOpenPdf?: () => void;
  onOpenExam: () => void;
}

export default function Curriculum({
  sections,
  onOpenPdf,
  onOpenExam,
}: CurriculumProps) {
  // State to track expanded section IDs. By default, let's open all or the first one.
  // Here we initialize all section IDs as expanded by default.
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((section) => section.id),
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id],
    );
  };

  return (
    <aside
      id="curriculum"
      aria-label="Course curriculum"
      className="bg-surface-card lg:max-h-131.75 lg:rounded-lg"
    >
      {/* Sticky sidebar heading */}
      <h2 className="sticky top-0 z-10 bg-surface-card pb-4 font-sans text-xl font-medium">
        Topics for this course
      </h2>
      <ProgressTracker
        progress={{
          percentage: 20,
          studentLabel: "you",
          status: "in-progress",
        }}
      />
      <div className="py-3">
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);

          return (
            <section
              key={section.id}
              className="mb-14 border border-gray-200 px-6"
            >
              {/* Section Header with Toggle Button */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between pt-8 pb-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <div>
                  <h3 className="font-sans text-xl font-medium">
                    {section.title}
                  </h3>
                </div>
                <Minus
                  className={`size-5 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Gray description */}
              <p className="pb-3 font-medium text-base leading-relaxed text-muted">
                {section.description}
              </p>

              {/* Collapsible Lessons List */}
              {isExpanded && (
                <ul className="flex flex-col gap-2 pb-6" role="list">
                  {section.lessons.map((lesson) => {
                    const isLocked = lesson.status === "locked";
                    const isCurrent = lesson.status === "current";
                    const isPdf = lesson.type === "pdf";
                    const isQuiz = lesson.type === "quiz";
                    const isModalLesson = isPdf || isQuiz;

                    const lessonContent = (
                      <>
                        {/* Left: Icon and lesson title */}
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="shrink-0" aria-hidden="true">
                            {isPdf ? (
                              <FileText className="size-5" />
                            ) : isQuiz ? (
                              <CircleHelp className="size-5" />
                            ) : (
                              <span className="text-sm">▶</span>
                            )}
                          </span>

                          <span
                            className={`min-w-0 font-sans text-sm leading-snug ${
                              isCurrent ? "font-bold" : "font-medium"
                            }`}
                          >
                            {lesson.title}
                          </span>
                        </span>

                        {/* Right: Question count and duration */}
                        <span className="ml-auto flex flex-1 flex-wrap items-center justify-end gap-2">
                          {isQuiz && lesson.questionCount != null && (
                            <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-700">
                              {lesson.questionCount} QUESTIONS
                            </span>
                          )}

                          {lesson.duration && (
                            <span className="whitespace-nowrap rounded bg-red-100 px-2 py-0.5 text-sm font-medium text-time">
                              {lesson.duration}
                            </span>
                          )}
                        </span>

                        {/* Lock: exclude quiz items */}
                        {isLocked && !isQuiz && (
                          <span
                            className="shrink-0"
                            aria-label="Locked"
                            title="Locked"
                          >
                            <Lock className="size-4" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    );

                    return (
                      <li
                        key={lesson.id}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`min-w-0 border-t border-gray-200 py-3 transition-colors ${
                          isCurrent
                            ? "border-s-brand-primary bg-brand-primary/4 text-foreground"
                            : "text-muted"
                        }`}
                      >
                        {isModalLesson ? (
                          <button
                            type="button"
                            onClick={isQuiz ? onOpenExam : onOpenPdf}
                            disabled={isPdf && !onOpenPdf}
                            aria-label={`${lesson.title} open ${
                              isQuiz ? "exam" : "PDF"
                            }`}
                            className={`flex w-full min-w-0 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                              isQuiz ? "items-start" : ""
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            {lessonContent}
                          </button>
                        ) : (
                          <div className="flex min-w-0 items-center gap-3">
                            {lessonContent}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
