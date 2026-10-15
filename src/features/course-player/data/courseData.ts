import type { CourseInfo, MotivationalMessage } from "../models";

// ── Motivational messages (typed, Egyptian Arabic) ──────────────────────────

export const motivationalMessages: MotivationalMessage[] = [
  {
    tier: "top10",
    // Placeholder – replace with م. علي شاهين's actual copy
    message:
      "ماشاء الله عليك! إنت في أحسن 10% من الطلبة.. الجوائز بتاعتك في انتظارك. استمر وما تقفش! 🏆",
  },
  {
    tier: "top30",
    // Placeholder
    message:
      "برافو عليك! إنت في أحسن 30% من الطلبة.. قرّب أكتر من القمة. كمّل كده وهتوصل! 🎯",
  },
  {
    tier: "mid60",
    // Exact copy from spec
    message:
      "عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة.. كمّل عايز أشوف اسمك في الليدر بورد هنا 💪",
  },
  {
    tier: "low",
    // Placeholder
    message:
      "إيه ده يا صاحبي! هتخليني أزعل منك؟ تعالى نتحرك وابدأ تحل التمارين وهتحس بالفرق بسرعة. أنا واثق فيك! 😤",
  },
];

// ── Main mock data ───────────────────────────────────────────────────────────

export const courseData: CourseInfo = {
  title: "تعلم Next.js من الصفر للاحتراف",
  instructor: "م. علي شاهين",

  // Use a freely available Big Buck Bunny sample clip
  videoSrc:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

  progress: {
    percentage: 63,
    studentLabel: "إنت",
  },

  curriculum: [
    {
      id: "sec-1",
      title: "مقدمة الكورس",
      lessons: [
        {
          id: "l-1",
          title: "مرحباً بك في الكورس",
          duration: "05:20",
          status: "completed",
        },
        {
          id: "l-2",
          title: "إعداد البيئة",
          duration: "12:10",
          status: "completed",
        },
        {
          id: "l-3",
          title: "هيكل المشروع",
          duration: "08:45",
          status: "current",
        },
        {
          id: "l-4",
          title: "الـ App Router",
          duration: "15:30",
          status: "locked",
        },
      ],
    },
    {
      id: "sec-2",
      title: "الـ Server Components",
      lessons: [
        {
          id: "l-5",
          title: "ما هي الـ Server Components؟",
          duration: "10:15",
          status: "locked",
        },
        {
          id: "l-6",
          title: "Streaming و Suspense",
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
      title: "الـ Client Components",
      lessons: [
        {
          id: "l-8",
          title: "متى نستخدم Client Components؟",
          duration: "09:55",
          status: "locked",
        },
        {
          id: "l-9",
          title: "إدارة الـ State",
          duration: "14:20",
          status: "locked",
        },
      ],
    },
  ],

  materials: [
    {
      id: "mat-1",
      title: "ملخص الوحدة الأولى – PDF",
      type: "pdf",
      url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
    },
    {
      id: "mat-2",
      title: "اختبار الوحدة الأولى",
      type: "exam",
    },
    {
      id: "mat-3",
      title: "مصادر إضافية عن Next.js",
      type: "link",
      url: "https://nextjs.org/docs",
    },
  ],

  exam: {
    id: "exam-1",
    title: "اختبار الوحدة الأولى – Next.js",
    questions: [
      {
        id: "q-1",
        text: "ما هو الـ framework الذي نستخدمه في هذا الكورس؟",
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
        text: "أي من التالي يُعدّ ميزة رئيسية في Next.js 16؟",
        options: [
          { id: "q2-a", text: "الـ App Router مع Server Components" },
          { id: "q2-b", text: "استخدام jQuery" },
          { id: "q2-c", text: "اعتماد PHP للـ rendering" },
          { id: "q2-d", text: "لا يدعم TypeScript" },
        ],
        correctOptionId: "q2-a",
      },
      {
        id: "q-3",
        text: "ما الامتداد المستخدم لملفات TypeScript في Next.js؟",
        options: [
          { id: "q3-a", text: ".ts فقط" },
          { id: "q3-b", text: ".jsx" },
          { id: "q3-c", text: ".ts و .tsx" },
          { id: "q3-d", text: ".tfx" },
        ],
        correctOptionId: "q3-c",
      },
      {
        id: "q-4",
        text: "أين توضع ملفات الـ layout في App Router؟",
        options: [
          { id: "q4-a", text: "في مجلد /pages" },
          { id: "q4-b", text: "في مجلد /app كملف layout.tsx" },
          { id: "q4-c", text: "في مجلد /public" },
          { id: "q4-d", text: "في ملف next.config.ts" },
        ],
        correctOptionId: "q4-b",
      },
      {
        id: "q-5",
        text: "ماذا يعني الـ SSR في Next.js؟",
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
      text: "شرح ممتاز! استفدت كتير من الدرس ده. شكراً جزيلاً.",
      timeAgo: "منذ ساعتين",
    },
    {
      id: "c-2",
      authorName: "Student Name Goes Here",
      text: "سؤال: هل يمكن استخدام Next.js مع Django كـ backend؟",
      timeAgo: "منذ 5 ساعات",
    },
    {
      id: "c-3",
      authorName: "Student Name Goes Here",
      text: "الشرح واضح وبسيط، بس كنت بتمنى لو في مثال أكتر تفصيلاً.",
      timeAgo: "منذ يوم",
    },
  ],

  leaderboard: [
    { rank: 1, name: "أحمد محمد", score: 980, isCurrentStudent: false },
    { rank: 2, name: "سارة يوسف", score: 965, isCurrentStudent: false },
    { rank: 3, name: "محمود علي", score: 948, isCurrentStudent: false },
    { rank: 4, name: "نور حسن", score: 920, isCurrentStudent: false },
    { rank: 5, name: "خالد إبراهيم", score: 905, isCurrentStudent: false },
    { rank: 6, name: "ريم أحمد", score: 890, isCurrentStudent: false },
    { rank: 7, name: "عمر فاروق", score: 875, isCurrentStudent: false },
    { rank: 8, name: "ليلى سعد", score: 860, isCurrentStudent: false },
    { rank: 9, name: "طارق نبيل", score: 844, isCurrentStudent: false },
    { rank: 10, name: "أنت", score: 820, isCurrentStudent: true },
    { rank: 11, name: "دينا حلمي", score: 800, isCurrentStudent: false },
    { rank: 12, name: "يوسف منصور", score: 785, isCurrentStudent: false },
  ],

  motivationalMessages,
};
