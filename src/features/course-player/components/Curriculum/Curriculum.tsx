import type { CurriculumSection } from "../../models";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { FileText, CircleHelp, Lock } from "lucide-react";

interface CurriculumProps {
  sections: CurriculumSection[];
}

export default function Curriculum({ sections }: CurriculumProps) {
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
      <ProgressTracker progress={{ percentage: 20, studentLabel: "you" }} />
      <div className="py-3">
        {sections.map((section) => (
          <section
            key={section.id}
            className="mb-14 border border-gray-200 px-6"
          >
            {/* Week title */}
            <h3 className=" pt-8 mb-4  font-sans text-xl font-medium">
              {section.title}
            </h3>

            {/* Gray description */}
            <p className=" pb-3 font-medium text-base leading-relaxed text-muted">
              {section.description}
            </p>

            {/* Lessons */}
            <ul className="flex flex-col gap-2" role="list">
              {section.lessons.map((lesson) => {
                const isLocked = lesson.status === "locked";
                const isCurrent = lesson.status === "current";

                return (
                  <li
                    key={lesson.id}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-center gap-3 border-t border-gray-200  py-3 transition-colors ${
                      isCurrent
                        ? "border-s-brand-primary bg-brand-primary/4 text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {/* PDF or quiz icon */}
                    <span className="shrink-0">
                      {lesson.type === "pdf" ? (
                        <FileText
                          className="size-5 shrink-0"
                          aria-hidden="true"
                        />
                      ) : lesson.type === "quiz" ? (
                        <CircleHelp
                          className="size-5 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="text-xs" aria-hidden="true">
                          ▶
                        </span>
                      )}
                    </span>

                    {/* Lesson title and metadata box */}
                    <span className="min-w-0 flex-1 flex items-center justify-between gap-4">
                      <span
                        className={`block font-sans text-sm leading-snug ${
                          isCurrent ? "font-bold" : "font-medium"
                        }`}
                      >
                        {lesson.title}
                      </span>

                      {/* Question count and duration grouped together, wrapping vertically if space is tight */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 shrink-0">
                        {lesson.type === "quiz" &&
                          lesson.questionCount != null && (
                            <span className="px-2 py-0.5 text-sm bg-green-100 text-green-700 font-medium rounded">
                              {lesson.questionCount} QUESTIONS
                            </span>
                          )}
                        {lesson.duration && (
                          <span className="whitespace-nowrap text-sm text-time bg-red-100 px-2 py-0.5 rounded font-medium">
                            {lesson.duration}
                          </span>
                        )}
                      </div>
                    </span>

                    {/* Lock at the far right */}
                    {isLocked && (
                      <span
                        className="shrink-0 "
                        aria-label="Locked"
                        title="Locked"
                      >
                        <Lock className="size-4 shrink-0" aria-hidden="true" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
