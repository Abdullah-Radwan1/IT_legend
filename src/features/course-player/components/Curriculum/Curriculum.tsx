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
      <ProgressTracker
        progress={{
          percentage: 20,
          studentLabel: "you",
          status: "in-progress",
        }}
      />
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
                    className={`flex min-w-0 ${lesson.type === "quiz" ? "items-start" : "items-center"} gap-3 border-t border-gray-200 py-3 transition-colors ${
                      isCurrent
                        ? "border-s-brand-primary bg-brand-primary/4 text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {/* Left: Icon and lesson title */}
                    <span className="flex min-w-0  items-center gap-3">
                      <span className="shrink-0" aria-hidden="true">
                        {lesson.type === "pdf" ? (
                          <FileText className="size-5" />
                        ) : lesson.type === "quiz" ? (
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
                    <span className="flex-1 ml-auto flex  flex-wrap items-center justify-end gap-2">
                      {lesson.type === "quiz" &&
                        lesson.questionCount != null && (
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
                    {isLocked && lesson.type !== "quiz" && (
                      <span
                        className="shrink-0"
                        aria-label="Locked"
                        title="Locked"
                      >
                        <Lock className="size-4" aria-hidden="true" />
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
