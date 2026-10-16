// CourseCard – Server Component
// Renders a single course entry on the /courses listing page.

import Image from "next/image";
import Link from "next/link";
import type { CourseInfo, CourseStatus } from "@/features/course-player/models";

interface CourseCardProps {
  course: CourseInfo;
}

// ── CTA button config ──────────────────────────────────────────────────────

const ctaConfig: Record<
  CourseStatus,
  { label: string; variant: "primary" | "outline" | "success" }
> = {
  "not-started": { label: "Start", variant: "primary" },
  "in-progress": { label: "Continue", variant: "outline" },
  completed: { label: "Review", variant: "success" },
};

// ── Status badge config ────────────────────────────────────────────────────

const statusBadge: Record<CourseStatus, { label: string; className: string }> =
  {
    "not-started": {
      label: "Not started",
      className: "bg-[#f5f9fa] text-[#6c6c6c] border border-[#e1e3e1]",
    },
    "in-progress": {
      label: "In progress",
      className: "bg-[#fff7e6] text-[#b45309] border border-[#fde68a]",
    },
    completed: {
      label: "Completed",
      className: "bg-[#e6f9f4] text-[#41b69d] border border-[#a7f3d0]",
    },
  };

export default function CourseCard({ course }: CourseCardProps) {
  const { id, image, title, instructor, progress, details } = course;
  const { status, percentage } = progress;
  const cta = ctaConfig[status];
  const badge = statusBadge[status];

  const buttonVariantClass = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-accent focus-visible:ring-brand-primary",
    outline:
      "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-brand-primary",
    success:
      "bg-success text-white hover:opacity-90 focus-visible:ring-success",
  }[cta.variant];

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-surface-card shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-lg">
      {/* Cover image */}
      <Link
        href={`/courses/${id}`}
        className="block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="relative h-44 w-full overflow-hidden bg-surface">
          <Image
            src={image}
            alt={`${title} cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Level badge + status badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-brand-primary">
            {details.level}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Title */}
        <Link href={`/courses/${id}`} className="group/title">
          <h2 className="line-clamp-2 text-[1rem] font-semibold leading-snug text-foreground transition-colors group-hover/title:text-brand-primary">
            {title}
          </h2>
        </Link>

        {/* Instructor */}
        <p className="text-sm font-light text-muted">{instructor}</p>

        {/* Progress section */}
        <div className="mt-auto flex flex-col gap-1.5 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Progress</span>
            <span className="text-xs font-semibold text-brand-accent">
              {percentage}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percentage}% complete`}
            className="h-1.5 w-full overflow-hidden rounded-full bg-progress-bg"
          >
            <div
              className="h-full rounded-full bg-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${id}`}
          id={`course-cta-${id}`}
          className={`mt-1 flex w-full items-center justify-center rounded-[var(--radius-md)] px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonVariantClass}`}
        >
          {cta.label}
        </Link>
      </div>
    </article>
  );
}
