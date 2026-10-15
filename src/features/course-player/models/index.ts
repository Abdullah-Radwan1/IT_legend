// ── Lesson / Curriculum ────────────────────────────────────────────────────

export type LessonStatus = "current" | "completed" | "locked";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "10:34"
  status: LessonStatus;
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

// ── Course Materials ────────────────────────────────────────────────────────

export type MaterialType = "pdf" | "exam" | "video" | "link";

export interface CourseMaterial {
  id: string;
  title: string;
  type: MaterialType;
  /** URL used for pdf / video / link materials */
  url?: string;
}

// ── Exam ────────────────────────────────────────────────────────────────────

export interface ExamOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: ExamOption[];
  correctOptionId: string;
}

export interface Exam {
  id: string;
  title: string;
  questions: ExamQuestion[];
}

// ── Comments ────────────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  authorName: string;
  /** URL to avatar image – can be undefined to use initials fallback */
  avatarUrl?: string;
  text: string;
  timeAgo: string;
}

// ── Leaderboard ─────────────────────────────────────────────────────────────

export type PerformanceTier = "top10" | "top30" | "mid60" | "low";

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isCurrentStudent: boolean;
}

export interface MotivationalMessage {
  tier: PerformanceTier;
  message: string;
}

// ── Progress ─────────────────────────────────────────────────────────────────

export interface CourseProgress {
  percentage: number;
  studentLabel: string;
}

// ── Course Info ───────────────────────────────────────────────────────────────

export interface CourseInfo {
  title: string;
  instructor: string;
  videoSrc: string;
  progress: CourseProgress;
  curriculum: CurriculumSection[];
  materials: CourseMaterial[];
  exam: Exam;
  comments: Comment[];
  leaderboard: LeaderboardEntry[];
  motivationalMessages: MotivationalMessage[];
}
