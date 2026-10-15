// Root page – Server Component
// Imports mock data and passes it to the client course player

import { courseData } from "@/features/course-player/data/courseData";
import CoursePlayerPage from "@/features/course-player/components/CoursePlayerPage/CoursePlayerPage";

export default function Home() {
  return <CoursePlayerPage data={courseData} />;
}
