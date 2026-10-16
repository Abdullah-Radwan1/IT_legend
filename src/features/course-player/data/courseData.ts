import type { CourseInfo, MotivationalMessage } from "../models";

// ── Motivational messages ──────────────────────────────────────────────────

export const motivationalMessages: MotivationalMessage[] = [
  {
    tier: "top10",
    // Placeholder message
    message:
      "عمل رائع! أنت ضمن أفضل 10% من الطلاب. مكافآتك بانتظارك—استمر في هذا الأداء المتميز! 🏆",
  },
  {
    tier: "top30",
    // Placeholder
    message:
      "جهد ممتاز! أنت ضمن أفضل 30% من الطلاب. تقترب أكثر فأكثر من القمة—واصل التقدم! 🎯",
  },
  {
    tier: "mid60",
    // Encouragement for students in the middle performance tier
    message:
      "أداء رائع! أنت أفضل من 60% من الطلاب في هذه الدورة. واصل السعي—أريد أن أرى اسمك في صدارة القائمة! 💪",
  },
  {
    tier: "low",
    // Placeholder
    message:
      "مستعد لتحقيق التقدم؟ ابدأ في حل التمارين وستلاحظ الفرق بنفسك. أنا أؤمن بقدراتك! 💪",
  },
];

// ── Main mock data ───────────────────────────────────────────────────────────

export const courseData: CourseInfo = {
  id: "learn-nextjs",
  image:
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=80",
  title: "Learn Next.js: From Beginner to Pro",
  instructor: "Ali Shaheen",

  // Use a freely available Big Buck Bunny sample clip
  videoSrc:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

  details: {
    duration: "12 hours",
    lessons: 24,
    enrolled: "2,450 students",
    language: "English",
    level: "Beginner",
    lastUpdated: "October 2026",
    certificate: "Certificate",
    access: "Lifetime access",
  },

  progress: {
    percentage: 63,
    studentLabel: "You",
    status: "in-progress",
  },

  curriculum: [
    {
      id: "sec-1",
      title: "Week 1–4",
      description: "Introduction to the course and its key concepts.",
      lessons: [
        {
          id: "l-1",
          title: "Introduction",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-2",
          title: "Course Overview",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-3",
          title: "Course Overview ",
          duration: "10 MINUTES",
          status: "locked",
          type: "quiz",
          questionCount: 3,
        },
        {
          id: "l-4",
          title: "Course Exercises / Reference Files",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-5",
          title: "Code Editor Installation",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-6",
          title: "PHP in HTML",

          status: "locked",
          type: "pdf",
        },
      ],
    },
    {
      id: "sec-2",
      title: "Week 5–8",
      description:
        "Advanced storytelling techniques for writers: personas, characters, and plots.",
      lessons: [
        {
          id: "l-7",
          title: "Defining Functions",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-8",
          title: "Function Parameters",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-9",
          title: "Return Values from Functions",
          duration: "15 MINUTES",
          status: "locked",
          type: "quiz",
          questionCount: 2,
        },
        {
          id: "l-10",
          title: "Global Variables and Scope",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-11",
          title: "The New Way to Create Constants",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-12",
          title: "Constants",

          status: "locked",
          type: "pdf",
        },
      ],
    },
    {
      id: "sec-3",
      title: "Week 5–8",
      description:
        "Advanced storytelling techniques for writers: personas, characters, and plots.",
      lessons: [
        {
          id: "l-7",
          title: "Defining Functions",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-8",
          title: "Function Parameters",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-9",
          title: "Return Values from Functions",
          duration: "15 MINUTES",
          status: "locked",
          type: "quiz",
          questionCount: 2,
        },
        {
          id: "l-10",
          title: "Global Variables and Scope",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-11",
          title: "The New Way to Create Constants",

          status: "locked",
          type: "pdf",
        },
        {
          id: "l-12",
          title: "Constants",

          status: "locked",
          type: "pdf",
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
      authorName: "Mohamed",
      text: "Excellent explanation! I learned a lot from this lesson. Thank you, Excellent explanation! I learned a lot from this lesson. Thank you.",
      timeAgo: "2 hours ago",
    },
    {
      id: "c-2",
      authorName: "Ahemd",
      text: "Question: Can Next.js be used with Django as a backend?",
      timeAgo: "5 hours ago",
    },
    {
      id: "c-3",
      authorName: "Abdullah",
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
