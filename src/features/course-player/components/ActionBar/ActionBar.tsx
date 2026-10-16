"use client";

import { FolderKanban, MessageSquare, HelpCircle, Trophy } from "lucide-react";

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
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buttonClass =
    "group flex min-w-0 flex-col items-center justify-center text-muted py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";

  const iconClass =
    "flex size-10 items-center justify-center rounded-full border border-border transition-all duration-200 group-hover:border-brand-primary group-hover:bg-brand-primary/5 group-hover:text-brand-primary group-hover:shadow-sm group-active:scale-95 [&_svg]:size-4";

  return (
    <nav className="w-full " aria-label="Course tools">
      <div className="flex gap-2 sm:gap-6">
        {/* Curriculum */}
        <button
          type="button"
          className={buttonClass}
          onClick={() => scrollTo("curriculum")}
          aria-label="Go to curriculum"
        >
          <span className={iconClass} aria-hidden="true">
            <FolderKanban />
          </span>
        </button>

        {/* Comments */}
        <button
          type="button"
          className={buttonClass}
          onClick={() => scrollTo("comments")}
          aria-label="Go to comments"
        >
          <span className={iconClass} aria-hidden="true">
            <MessageSquare />
          </span>
        </button>

        {/* Ask a question */}
        <button
          type="button"
          className={buttonClass}
          onClick={onAskQuestion}
          aria-label="Ask a question"
          aria-haspopup="dialog"
        >
          <span className={iconClass} aria-hidden="true">
            <HelpCircle />
          </span>
        </button>

        {/* Leaderboard */}
        <button
          type="button"
          className={buttonClass}
          onClick={onLeaderboard}
          aria-label="Leaderboard"
          aria-haspopup="dialog"
        >
          <span className={iconClass} aria-hidden="true">
            <Trophy />
          </span>
        </button>
      </div>
    </nav>
  );
}
