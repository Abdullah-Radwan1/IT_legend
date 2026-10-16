// NavBar – Desktop only (hidden on mobile via CSS)
// Server Component – no interactivity needed

interface NavBarProps {
  courseName: string;
  instructor: string;
}

export default function NavBar({ courseName, instructor }: NavBarProps) {
  return (
    <header className="sticky top-0 z-[100] hidden h-[var(--nav-height)] border-b border-border bg-surface lg:block" role="banner">
      <div className="mx-auto flex h-full max-w-[1304px] items-center justify-between gap-[var(--space-6)] px-[var(--space-6)]">
        {/* Brand / Logo placeholder */}
        <div className="flex shrink-0 items-center" aria-label="ITLegend">
          <span className="text-2xl font-light tracking-[-0.02em]">
            IT<strong className="font-bold text-brand-primary">Legend</strong>
          </span>
        </div>

        {/* Course info */}
        <div className="flex flex-1 flex-col items-center gap-0.5">
          <span className="text-center text-[0.9rem] font-bold">{courseName}</span>
          <span className="text-[0.8rem] font-light text-muted">{instructor}</span>
        </div>

        {/* Navigation links */}
        <nav aria-label="Navigation links">
          <ul className="flex shrink-0 items-center gap-[var(--space-6)]">
            <li>
              <a href="#" className="text-sm font-light text-foreground transition-colors hover:text-brand-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-foreground transition-colors hover:text-brand-primary">
                My courses
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-light text-foreground transition-colors hover:text-brand-primary">
                Contact us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
