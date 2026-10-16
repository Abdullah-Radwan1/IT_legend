"use client";

interface ActionBarProps {
  onAskQuestion: () => void;
  onLeaderboard: () => void;
}

export default function ActionBar({
  onAskQuestion,
  onLeaderboard,
}: ActionBarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-label="Course tools"
      role="navigation"
    >
      <div className="mx-auto flex max-w-[1304px] items-stretch px-[var(--space-1)] lg:gap-[var(--space-2)] lg:px-[var(--space-6)]">
        {/* Curriculum */}
        <button
          className="group relative flex flex-1 flex-col items-center justify-center gap-[var(--space-1)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] text-xs font-[family-name:var(--font-latin)] font-light text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(24,37,120,0.05)] hover:text-[var(--color-brand-primary)] after:absolute after:inset-x-1/4 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-t-full after:bg-[var(--color-brand-primary)] after:transition-transform hover:after:scale-x-100 lg:flex-row lg:flex-none lg:gap-[var(--space-2)] lg:px-[var(--space-5)] lg:py-[var(--space-4)] lg:text-sm"
          onClick={() => scrollTo("curriculum")}
          aria-label="Go to curriculum"
        >
          <span className="flex [&_svg]:size-5" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="9" x2="9" y2="21" />
            </svg>
          </span>
          <span className="leading-none">Curriculum</span>
        </button>

        {/* Comments */}
        <button
          className="group relative flex flex-1 flex-col items-center justify-center gap-[var(--space-1)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] text-xs font-[family-name:var(--font-latin)] font-light text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(24,37,120,0.05)] hover:text-[var(--color-brand-primary)] after:absolute after:inset-x-1/4 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-t-full after:bg-[var(--color-brand-primary)] after:transition-transform hover:after:scale-x-100 lg:flex-row lg:flex-none lg:gap-[var(--space-2)] lg:px-[var(--space-5)] lg:py-[var(--space-4)] lg:text-sm"
          onClick={() => scrollTo("comments")}
          aria-label="Go to comments"
        >
          <span className="flex [&_svg]:size-5" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="leading-none">Comments</span>
        </button>

        {/* Ask a question */}
        <button
          className="group relative flex flex-1 flex-col items-center justify-center gap-[var(--space-1)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] text-xs font-[family-name:var(--font-latin)] font-light text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(24,37,120,0.05)] hover:text-[var(--color-brand-primary)] after:absolute after:inset-x-1/4 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-t-full after:bg-[var(--color-brand-primary)] after:transition-transform hover:after:scale-x-100 lg:flex-row lg:flex-none lg:gap-[var(--space-2)] lg:px-[var(--space-5)] lg:py-[var(--space-4)] lg:text-sm"
          onClick={onAskQuestion}
          aria-label="Ask a question"
          aria-haspopup="dialog"
        >
          <span className="flex [&_svg]:size-5" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="leading-none">Ask a question</span>
        </button>

        {/* Leaderboard */}
        <button
          className="group relative flex flex-1 flex-col items-center justify-center gap-[var(--space-1)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] text-xs font-[family-name:var(--font-latin)] font-light text-[var(--color-text-muted)] transition-colors hover:bg-[rgba(24,37,120,0.05)] hover:text-[var(--color-brand-primary)] after:absolute after:inset-x-1/4 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-t-full after:bg-[var(--color-brand-primary)] after:transition-transform hover:after:scale-x-100 lg:flex-row lg:flex-none lg:gap-[var(--space-2)] lg:px-[var(--space-5)] lg:py-[var(--space-4)] lg:text-sm"
          onClick={onLeaderboard}
          aria-label="Leaderboard"
          aria-haspopup="dialog"
        >
          <span className="flex [&_svg]:size-5" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          <span className="leading-none">Leaderboard</span>
        </button>
      </div>
    </nav>
  );
}
