// /courses/[courseId] – Server Component
// Renders the full Course Player for a specific course with breadcrumb navigation.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCourseById,
  allCourses, // ← replace with whatever your data file exports (the full list of courses)
} from "@/features/course-player/data/allCoursesData";
import CoursePlayerPage from "@/features/course-player/components/CoursePlayerPage/CoursePlayerPage";
import Breadcrumb from "@/features/course-player/components/Breadcrumb/Breadcrumb";

// ── Static params ──────────────────────────────────────────────────────────
// Tells Next which courseIds exist at build time so the route can be prerendered.

export function generateStaticParams() {
  return allCourses.map((course) => ({ courseId: String(course.id) }));
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata(
  props: PageProps<"/courses/[courseId]">,
): Promise<Metadata> {
  const { courseId } = await props.params;
  const course = getCourseById(courseId);

  if (!course) {
    return { title: "Course not found – ITLegend" };
  }

  return {
    title: `${course.title} – ITLegend`,
    description: `${course.title} taught by ${course.instructor}. Continue your learning journey on ITLegend.`,
  };
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function CourseDetailPage(
  props: PageProps<"/courses/[courseId]">,
) {
  const { courseId } = await props.params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const breadcrumb = (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: course.title },
      ]}
    />
  );

  return <CoursePlayerPage data={course} breadcrumb={breadcrumb} />;
}
