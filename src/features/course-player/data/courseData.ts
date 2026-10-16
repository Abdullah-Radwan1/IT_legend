import type { CourseInfo, MotivationalMessage } from "../models";

// ── Motivational messages ──────────────────────────────────────────────────

export const motivationalMessages: MotivationalMessage[] = [
  {
    tier: "top10",
    // Placeholder message
    message:
      "Amazing work! You’re in the top 10% of students. Your rewards are waiting—keep it up! 🏆",
  },
  {
    tier: "top30",
    // Placeholder
    message:
      "Great job! You’re in the top 30% of students. You’re getting closer to the top—keep going! 🎯",
  },
  {
    tier: "mid60",
    // Encouragement for students in the middle performance tier
    message:
      "Great work! You’re doing better than 60% of students in this course. Keep going—I want to see your name at the top of the leaderboard! 💪",
  },
  {
    tier: "low",
    // Placeholder
    message:
      "Ready to make progress? Start working through the exercises and you’ll feel the difference. I believe in you! 💪",
  },
];

// ── Main mock data ───────────────────────────────────────────────────────────

export const courseData: CourseInfo = {
  title: "Learn Next.js: From Beginner to Pro",
  instructor: "Ali Shaheen",

  // Use a freely available Big Buck Bunny sample clip
  videoSrc:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

  progress: {
    percentage: 63,
    studentLabel: "You",
  },

  curriculum: [
    {
      id: "sec-1",
      title: "Course Introduction",
      lessons: [
        {
          id: "l-1",
          title: "Welcome to the Course",
          duration: "05:20",
          status: "completed",
        },
        {
          id: "l-2",
          title: "Setting Up Your Environment",
          duration: "12:10",
          status: "completed",
        },
        {
          id: "l-3",
          title: "Project Structure",
          duration: "08:45",
          status: "current",
        },
        {
          id: "l-4",
          title: "The App Router",
          duration: "15:30",
          status: "locked",
        },
      ],
    },
    {
      id: "sec-2",
      title: "Server Components",
      lessons: [
        {
          id: "l-5",
          title: "What Are Server Components?",
          duration: "10:15",
          status: "locked",
        },
        {
          id: "l-6",
          title: "Streaming and Suspense",
          duration: "18:00",
          status: "locked",
        },
        {
          id: "l-7",
          title: "Data Fetching",
          duration: "22:40",
          status: "locked",
        },
      ],
    },
    {
      id: "sec-3",
      title: "Client Components",
      lessons: [
        {
          id: "l-8",
          title: "When to Use Client Components",
          duration: "09:55",
          status: "locked",
        },
        {
          id: "l-9",
          title: "Managing State",
          duration: "14:20",
          status: "locked",
        },
      ],
    },
  ],

  materials: [
    {
      id: "mat-1",
      title: "Module 1 Summary – PDF",
      type: "pdf",
      url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
    },
    {
      id: "mat-2",
      title: "Module 1 Exam",
      type: "exam",
    },
    {
      id: "mat-3",
      title: "Additional Next.js Resources",
      type: "link",
      url: "https://nextjs.org/docs",
    },
  ],

  exam: {
    id: "exam-1",
    title: "Module 1 Exam – Next.js",
    questions: [
      {
        id: "q-1",
        text: "Which framework are we using in this course?",
        options: [
          { id: "q1-a", text: "Nuxt.js" },
          { id: "q1-b", text: "Next.js" },
          { id: "q1-c", text: "Gatsby" },
          { id: "q1-d", text: "Remix" },
        ],
        correctOptionId: "q1-b",
      },
      {
        id: "q-2",
        text: "Which of the following is a key feature of Next.js 16?",
        options: [
          { id: "q2-a", text: "The App Router with Server Components" },
          { id: "q2-b", text: "Using jQuery" },
          { id: "q2-c", text: "Using PHP for rendering" },
          { id: "q2-d", text: "It does not support TypeScript" },
        ],
        correctOptionId: "q2-a",
      },
      {
        id: "q-3",
        text: "Which file extensions are used for TypeScript in Next.js?",
        options: [
          { id: "q3-a", text: ".ts only" },
          { id: "q3-b", text: ".jsx" },
          { id: "q3-c", text: ".ts and .tsx" },
          { id: "q3-d", text: ".tfx" },
        ],
        correctOptionId: "q3-c",
      },
      {
        id: "q-4",
        text: "Where do layout files go in the App Router?",
        options: [
          { id: "q4-a", text: "In the /pages directory" },
          { id: "q4-b", text: "In the /app directory as layout.tsx" },
          { id: "q4-c", text: "In the /public directory" },
          { id: "q4-d", text: "In next.config.ts" },
        ],
        correctOptionId: "q4-b",
      },
      {
        id: "q-5",
        text: "What does SSR mean in Next.js?",
        options: [
          { id: "q5-a", text: "Simple Style Rendering" },
          { id: "q5-b", text: "Server-Side Rendering" },
          { id: "q5-c", text: "Static Script Runner" },
          { id: "q5-d", text: "Styled Sheet Router" },
        ],
        correctOptionId: "q5-b",
      },
    ],
  },

  comments: [
    {
      id: "c-1",
      authorName: "Student Name Goes Here",
      text: "Excellent explanation! I learned a lot from this lesson. Thank you.",
      timeAgo: "2 hours ago",
    },
    {
      id: "c-2",
      authorName: "Student Name Goes Here",
      text: "Question: Can Next.js be used with Django as a backend?",
      timeAgo: "5 hours ago",
    },
    {
      id: "c-3",
      authorName: "Student Name Goes Here",
      text: "The explanation is clear and simple. I’d love to see a more detailed example.",
      timeAgo: "1 day ago",
    },
  ],

  leaderboard: [
    { rank: 1, name: "Alex Morgan", score: 980, isCurrentStudent: false },
    { rank: 2, name: "Sophie Taylor", score: 965, isCurrentStudent: false },
    { rank: 3, name: "James Carter", score: 948, isCurrentStudent: false },
    { rank: 4, name: "Olivia Bennett", score: 920, isCurrentStudent: false },
    { rank: 5, name: "Liam Parker", score: 905, isCurrentStudent: false },
    { rank: 6, name: "Emma Collins", score: 890, isCurrentStudent: false },
    { rank: 7, name: "Noah Wilson", score: 875, isCurrentStudent: false },
    { rank: 8, name: "Mia Johnson", score: 860, isCurrentStudent: false },
    { rank: 9, name: "Ethan Brooks", score: 844, isCurrentStudent: false },
    { rank: 10, name: "You", score: 820, isCurrentStudent: true },
    { rank: 11, name: "Ava Mitchell", score: 800, isCurrentStudent: false },
    { rank: 12, name: "Lucas Reed", score: 785, isCurrentStudent: false },
  ],

  motivationalMessages,
};
