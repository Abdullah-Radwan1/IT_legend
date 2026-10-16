// Curriculum – Server Component (pure display)

import type { CurriculumSection } from "../../models";
interface CurriculumProps {
  sections: CurriculumSection[];
}

export default function Curriculum({ sections }: CurriculumProps) {
  return (
    <aside
      id="curriculum"
      className="max-h-[360px] overflow-y-auto border-y border-[var(--color-border-light)] bg-[var(--color-surface-card)] lg:max-h-[527px] lg:w-[var(--sidebar-width)] lg:shrink-0 lg:rounded-[var(--radius-lg)] lg:border"
      aria-label="Course curriculum"
    >
      <h2 className="sticky top-0 z-[1] border-b border-[var(--color-border)] bg-[var(--color-surface-card)] px-[var(--space-5)] py-[var(--space-4)] font-[family-name:var(--font-latin)] text-base font-bold text-[var(--color-brand-dark)]">Course curriculum</h2>

      <div className="py-[var(--space-3)]">
        {sections.map((section) => (
          <div key={section.id} className="not-first:mt-[var(--space-2)] not-first:border-t not-first:border-[var(--color-border-light)] not-first:pt-[var(--space-2)]">
            <h3 className="px-[var(--space-5)] py-[var(--space-2)] font-[family-name:var(--font-latin)] text-[0.8rem] font-bold uppercase tracking-[0.04em] text-[var(--color-text-muted)]">{section.title}</h3>

            <ul className="flex flex-col" role="list">
              {section.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className={`flex cursor-pointer items-center gap-[var(--space-3)] border-s-[3px] border-transparent px-[var(--space-5)] py-[var(--space-3)] transition-colors hover:bg-[var(--color-surface)] ${lesson.status === "completed" ? "text-[var(--color-text-muted)] [&_span:first-child]:text-[var(--color-success)]" : lesson.status === "current" ? "border-s-[var(--color-brand-primary)] bg-[rgba(24,37,120,0.04)] font-bold text-[var(--color-brand-dark)] [&_span:first-child]:text-[var(--color-brand-primary)]" : "cursor-not-allowed text-[var(--color-progress-marker)] opacity-70 [&_span:first-child]:text-[var(--color-progress-marker)]"}`}
                  aria-current={lesson.status === "current" ? "page" : undefined}
                >
                  {/* Status icon */}
                  <span
                    className="flex shrink-0 [&_svg]:size-5"
                    aria-hidden="true"
                    aria-label={
                      lesson.status === "completed"
                        ? "Completed"
                        : lesson.status === "current"
                        ? "Current lesson"
                        : "Locked"
                    }
                  >
                    {lesson.status === "completed" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9,12 11,14 15,10" />
                      </svg>
                    )}
                    {lesson.status === "current" && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10,8 16,12 10,16" fill="#fff" />
                      </svg>
                    )}
                    {lesson.status === "locked" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </span>

                  <span className={`flex-1 font-[family-name:var(--font-latin)] text-sm font-light leading-[1.4] ${lesson.status === "current" ? "font-bold" : ""}`}>{lesson.title}</span>

                  <span className="shrink-0 font-[family-name:var(--font-latin)] text-xs font-medium text-[var(--color-time)]">{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
