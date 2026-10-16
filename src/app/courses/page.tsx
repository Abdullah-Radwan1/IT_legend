// /courses – Server Component
// Courses listing page: displays all enrolled courses as a card grid.

import type { Metadata } from "next";
import Link from "next/link";
import { allCourses } from "@/features/course-player/data/allCoursesData";
import CourseCard from "@/features/courses/components/CourseCard/CourseCard";

export const metadata: Metadata = {
  title: "My Courses – ITLegend",
  description: "Browse and continue your enrolled courses on ITLegend.",
};

// ── Derived stats ──────────────────────────────────────────────────────────

const totalCourses = allCourses.length;
const completedCount = allCourses.filter(
  (c) => c.progress.status === "completed",
).length;
const inProgressCount = allCourses.filter(
  (c) => c.progress.status === "in-progress",
).length;
const notStartedCount = allCourses.filter(
  (c) => c.progress.status === "not-started",
).length;

export default function CoursesPage() {
  return (
    <>
      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-[1304px] px-4 py-8 sm:px-6 lg:px-9.5 lg:py-12">
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">
              My Courses
            </h1>
            <p className="mt-1 text-sm font-light text-muted">
              Track your learning journey and pick up where you left off.
            </p>
          </div>

          {/* Stats strip */}
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                label: "Total",
                value: totalCourses,
                color: "text-brand-primary",
              },
              {
                label: "In progress",
                value: inProgressCount,
                color: "text-[#b45309]",
              },
              {
                label: "Completed",
                value: completedCount,
                color: "text-success",
              },
              {
                label: "Not started",
                value: notStartedCount,
                color: "text-muted",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-[var(--radius-lg)] bg-surface-card p-4 shadow-[var(--shadow-card)]"
              >
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
                <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* Course grid */}
          <section aria-label="Course list">
            <ul
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {allCourses.map((course) => (
                <li key={course.id}>
                  <CourseCard course={course} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
