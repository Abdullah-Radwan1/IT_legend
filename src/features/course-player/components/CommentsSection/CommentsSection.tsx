"use client";

import { useState } from "react";
import type { Comment } from "../../models";
import styles from "./CommentsSection.module.scss";

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
    <section id="comments" className={styles.section} aria-label="التعليقات">
      <h2 className={styles.heading}>Comments</h2>

      {/* Comment list */}
      <ul className={styles.list} role="list" aria-label="قائمة التعليقات">
        {comments.map((c) => (
          <li key={c.id} className={styles.comment}>
            {/* Avatar */}
            <div className={styles.avatar} aria-hidden="true">
              {c.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.avatarUrl} alt="" />
              ) : (
                <span>{getInitials(c.authorName)}</span>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.author}>{c.authorName}</span>
                <span className={styles.time}>{c.timeAgo}</span>
              </div>
              <p className={styles.text}>{c.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        aria-label="إضافة تعليق جديد"
      >
        <div className={styles.inputWrapper}>
          <label htmlFor="new-comment" className="sr-only">
            اكتب تعليقك
          </label>
          <input
            id="new-comment"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment"
            className={styles.input}
            aria-label="اكتب تعليقك هنا"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className={styles.submitBtn}
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
