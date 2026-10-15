"use client";

import { useState } from "react";
import type { Comment } from "../../models";
interface CommentsSectionProps {
  initialComments: Comment[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function CommentsSection({
  initialComments,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newComment: Comment = {
      id: `c-new-${Date.now()}`,
      authorName: "أنت",
      text: trimmed,
      timeAgo: "الآن",
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  return (
    <section id="comments" className="rounded-[var(--radius-sm)] bg-[var(--color-surface-card)] p-[var(--space-8)] px-[var(--space-6)] shadow-[var(--shadow-card)]" aria-label="التعليقات">
      <h2 className="mb-[var(--space-6)] font-[family-name:var(--font-latin)] text-[1.2rem] font-semibold text-[var(--color-text-primary)] lg:text-2xl">Comments</h2>

      {/* Comment list */}
      <ul className="mb-[var(--space-8)] flex flex-col gap-[var(--space-5)]" role="list" aria-label="قائمة التعليقات">
        {comments.map((c) => (
          <li key={c.id} className="flex items-start gap-[var(--space-4)]">
            {/* Avatar */}
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-brand-accent)] to-[var(--color-brand-primary)] font-[family-name:var(--font-latin)] text-[0.8rem] font-semibold text-white [&_img]:size-full [&_img]:object-cover" aria-hidden="true">
              {c.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.avatarUrl} alt="" />
              ) : (
                <span>{getInitials(c.authorName)}</span>
              )}
            </div>

            <div className="flex-1 rounded-e-[var(--radius-lg)] rounded-bl-[var(--radius-lg)] bg-[var(--color-surface)] px-[var(--space-4)] py-[var(--space-3)]">
              <div className="mb-[var(--space-2)] flex items-center gap-[var(--space-3)]">
                <span className="font-[family-name:var(--font-latin)] text-sm font-semibold text-[var(--color-text-dark)]">{c.authorName}</span>
                <span className="font-[family-name:var(--font-arabic)] text-xs font-light text-[var(--color-text-muted)]">{c.timeAgo}</span>
              </div>
              <p className="font-[family-name:var(--font-arabic)] text-[0.9rem] font-light leading-[1.6] text-[var(--color-text-secondary)]">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[var(--color-border)] pt-[var(--space-5)]"
        aria-label="إضافة تعليق جديد"
      >
        <div className="flex items-center gap-[var(--space-3)] rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--space-5)] py-[var(--space-3)] transition-[border-color,box-shadow] focus-within:border-[var(--color-brand-accent)] focus-within:shadow-[0_0_0_3px_rgba(72,82,147,0.12)]">
          <label htmlFor="new-comment" className="sr-only">
            اكتب تعليقك
          </label>
          <input
            id="new-comment"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment"
            className="min-w-0 flex-1 border-0 bg-transparent text-left font-[family-name:var(--font-latin)] text-sm font-medium text-[var(--color-text-secondary)] outline-none placeholder:text-[var(--color-text-placeholder)]"
            aria-label="اكتب تعليقك هنا"
            maxLength={500}
            dir="ltr"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white transition-[background-color,transform] hover:not-disabled:scale-105 hover:not-disabled:bg-[var(--color-brand-dark)] disabled:cursor-not-allowed disabled:bg-[var(--color-progress-bg)] disabled:text-[var(--color-text-muted)] [&_svg]:size-4"
            aria-label="إرسال التعليق"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}
