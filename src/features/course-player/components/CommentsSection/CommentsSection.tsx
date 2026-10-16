"use client";

import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import type { Comment } from "../../models";
import Image from "next/image";

interface CommentsSectionProps {
  initialComments: Comment[];
}

// Helper to provide a realistic default avatar of a man if none is provided
function getDefaultAvatar(id: string): string {
  // Using curated Unsplash portrait IDs for men
  const samplePortraits = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  ];

  // Simple hash to consistently pick an image based on the comment ID string
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % samplePortraits.length;
  return samplePortraits[index];
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
      authorName: "You",
      text: trimmed,
      timeAgo: "Just now",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  };

  return (
    <section id="comments" aria-label="Comments" className="my-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground lg:text-3xl">
        Comments
      </h2>

      {/* Comment list */}
      <ul
        className="mb-8 flex flex-col gap-5"
        role="list"
        aria-label="Comment list"
      >
        {comments.map((c) => {
          const avatarSrc = c.avatarUrl || getDefaultAvatar(c.id);

          return (
            <li
              key={c.id}
              className="flex items-start gap-3 border-b border-gray-200 pb-5 last:border-b-0"
            >
              {/* Avatar */}
              <div
                className="flex size-18 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100"
                aria-hidden="true"
              >
                <Image
                  width={300}
                  height={300}
                  src={avatarSrc}
                  alt={c.authorName}
                  className="size-full object-cover"
                />
              </div>

              <div className="flex-1 px-2">
                <div className="mb-2 flex flex-col">
                  <span className="text-balance  font-medium text-shadow-muted">
                    {c.authorName}
                  </span>
                  <span className="text-sm font-light text-muted">
                    {c.timeAgo}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-muted font-light">
                  {c.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* New comment form */}
      <form
        onSubmit={handleSubmit}
        className=" pt-5"
        aria-label="Add a comment"
      >
        <div className="w-full flex-1 ">
          <label htmlFor="new-comment" className="sr-only">
            Write a comment
          </label>
          <textarea
            id="new-comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment"
            className=" p-4 w-full placeholder:text-shadow-muted mb-4  shadow-xl  min-h-36"
            aria-label="Write your comment"
            maxLength={500}
            dir="ltr"
          />
        </div>
        <button
          className="flex bg-success text-white py-3 px-6 items-center gap-2 font-medium rounded"
          type="submit"
          disabled={!text.trim()}
          aria-label="Post comment"
        >
          Submit Review{" "}
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
