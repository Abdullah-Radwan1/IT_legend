import type { CourseInfo, MotivationalMessage } from "../models";
import { courseData, motivationalMessages } from "./courseData";

// ── Shared helpers ─────────────────────────────────────────────────────────

const sharedMotivational: MotivationalMessage[] = motivationalMessages;

const sampleVideo =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const sharedLeaderboard: CourseInfo["leaderboard"] = [
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
];

// ── Catalogue ──────────────────────────────────────────────────────────────

export const allCourses: CourseInfo[] = [
  // 1 – Re-use the existing rich course (already has full content)
  courseData,

  // 2 – Python for Data Science
  {
    id: "python-data-science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    title: "Python for Data Science",
    instructor: "Sara Khalil",
    videoSrc: sampleVideo,
    details: {
      duration: "18 hours",
      lessons: 36,
      enrolled: "5,120 students",
      language: "English",
      level: "Intermediate",
      lastUpdated: "September 2026",
      certificate: "Certificate",
      access: "Lifetime access",
    },
    progress: { percentage: 0, studentLabel: "You", status: "not-started" },
    curriculum: [
      {
        id: "sec-1",
        title: "Week 1–3",
        description: "Python basics and data types.",
        lessons: [
          { id: "l-1", title: "Python Setup", status: "locked", type: "pdf" },
          {
            id: "l-2",
            title: "Variables & Types",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-3",
            title: "Lists & Dicts",
            status: "locked",
            type: "quiz",
            duration: "10 MINUTES",
            questionCount: 3,
          },
        ],
      },
      {
        id: "sec-2",
        title: "Week 4–6",
        description: "Pandas & NumPy foundations.",
        lessons: [
          {
            id: "l-4",
            title: "Intro to NumPy",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-5",
            title: "Pandas DataFrames",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-6",
            title: "Data Cleaning",
            status: "locked",
            type: "quiz",
            duration: "15 MINUTES",
            questionCount: 4,
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
      { id: "mat-2", title: "Module 1 Exam", type: "exam" },
    ],
    exam: {
      id: "exam-py",
      title: "Python Basics Exam",
      questions: [
        {
          id: "q-1",
          text: "Which library is primarily used for data manipulation in Python?",
          options: [
            { id: "q1-a", text: "NumPy" },
            { id: "q1-b", text: "Pandas" },
            { id: "q1-c", text: "SciPy" },
            { id: "q1-d", text: "Matplotlib" },
          ],
          correctOptionId: "q1-b",
        },
        {
          id: "q-2",
          text: "What does 'df.head()' return in Pandas?",
          options: [
            { id: "q2-a", text: "Last 5 rows" },
            { id: "q2-b", text: "First 5 rows" },
            { id: "q2-c", text: "All rows" },
            { id: "q2-d", text: "Column names only" },
          ],
          correctOptionId: "q2-b",
        },
      ],
    },
    comments: [
      {
        id: "c-1",
        authorName: "Nadia",
        text: "Best Python course I've taken!",
        timeAgo: "3 hours ago",
      },
      {
        id: "c-2",
        authorName: "Tariq",
        text: "Very clear explanations, looking forward to starting.",
        timeAgo: "1 day ago",
      },
    ],
    leaderboard: sharedLeaderboard,
    motivationalMessages: sharedMotivational,
  },

  // 3 – UI/UX Design Fundamentals
  {
    id: "uiux-design-fundamentals",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    title: "UI/UX Design Fundamentals",
    instructor: "Reem Al-Farsi",
    videoSrc: sampleVideo,
    details: {
      duration: "10 hours",
      lessons: 20,
      enrolled: "3,800 students",
      language: "English",
      level: "Beginner",
      lastUpdated: "August 2026",
      certificate: "Certificate",
      access: "Lifetime access",
    },
    progress: { percentage: 100, studentLabel: "You", status: "completed" },
    curriculum: [
      {
        id: "sec-1",
        title: "Week 1–2",
        description: "Design thinking and user research.",
        lessons: [
          {
            id: "l-1",
            title: "What is UX?",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-2",
            title: "User Personas",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-3",
            title: "Research Methods",
            status: "completed",
            type: "quiz",
            duration: "10 MINUTES",
            questionCount: 3,
          },
        ],
      },
      {
        id: "sec-2",
        title: "Week 3–4",
        description: "Wireframing and prototyping with Figma.",
        lessons: [
          {
            id: "l-4",
            title: "Figma Basics",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-5",
            title: "Creating Wireframes",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-6",
            title: "Interactive Prototypes",
            status: "completed",
            type: "quiz",
            duration: "15 MINUTES",
            questionCount: 4,
          },
        ],
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "Design Principles PDF",
        type: "pdf",
        url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
      },
      { id: "mat-2", title: "Module Exam", type: "exam" },
    ],
    exam: {
      id: "exam-ux",
      title: "UX Design Exam",
      questions: [
        {
          id: "q-1",
          text: "What is the primary goal of UX design?",
          options: [
            { id: "q1-a", text: "Making things look pretty" },
            { id: "q1-b", text: "Creating user-centered experiences" },
            { id: "q1-c", text: "Writing code efficiently" },
            { id: "q1-d", text: "Managing databases" },
          ],
          correctOptionId: "q1-b",
        },
      ],
    },
    comments: [
      {
        id: "c-1",
        authorName: "Layla",
        text: "Loved every lesson! The Figma section especially.",
        timeAgo: "2 days ago",
      },
    ],
    leaderboard: sharedLeaderboard,
    motivationalMessages: sharedMotivational,
  },

  // 4 – AWS Cloud Practitioner
  {
    id: "aws-cloud-practitioner",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
    title: "AWS Cloud Practitioner",
    instructor: "Khalid Mansour",
    videoSrc: sampleVideo,
    details: {
      duration: "15 hours",
      lessons: 30,
      enrolled: "6,500 students",
      language: "English",
      level: "Beginner",
      lastUpdated: "October 2026",
      certificate: "Certificate",
      access: "Lifetime access",
    },
    progress: { percentage: 28, studentLabel: "You", status: "in-progress" },
    curriculum: [
      {
        id: "sec-1",
        title: "Week 1–3",
        description: "Cloud concepts and AWS global infrastructure.",
        lessons: [
          {
            id: "l-1",
            title: "What is Cloud Computing?",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-2",
            title: "AWS Regions & Availability Zones",
            status: "current",
            type: "pdf",
          },
          {
            id: "l-3",
            title: "Core Services Overview",
            status: "locked",
            type: "quiz",
            duration: "10 MINUTES",
            questionCount: 5,
          },
        ],
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "AWS Overview PDF",
        type: "pdf",
        url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
      },
      { id: "mat-2", title: "Certification Exam Prep", type: "exam" },
    ],
    exam: {
      id: "exam-aws",
      title: "AWS Practitioner Exam",
      questions: [
        {
          id: "q-1",
          text: "What is Amazon EC2 used for?",
          options: [
            { id: "q1-a", text: "A managed database service" },
            { id: "q1-b", text: "Scalable virtual server instances" },
            { id: "q1-c", text: "A DNS routing service" },
            { id: "q1-d", text: "A CDN for static assets" },
          ],
          correctOptionId: "q1-b",
        },
      ],
    },
    comments: [
      {
        id: "c-1",
        authorName: "Faisal",
        text: "Great intro to cloud concepts.",
        timeAgo: "5 hours ago",
      },
    ],
    leaderboard: sharedLeaderboard,
    motivationalMessages: sharedMotivational,
  },

  // 5 – Full-Stack React & Node.js
  {
    id: "fullstack-react-nodejs",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&auto=format&fit=crop&q=80",
    title: "Full-Stack React & Node.js",
    instructor: "Omar Haddad",
    videoSrc: sampleVideo,
    details: {
      duration: "24 hours",
      lessons: 48,
      enrolled: "4,230 students",
      language: "English",
      level: "Advanced",
      lastUpdated: "October 2026",
      certificate: "Certificate",
      access: "Lifetime access",
    },
    progress: { percentage: 0, studentLabel: "You", status: "not-started" },
    curriculum: [
      {
        id: "sec-1",
        title: "Week 1–4",
        description: "React fundamentals and component architecture.",
        lessons: [
          {
            id: "l-1",
            title: "JSX & Components",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-2",
            title: "State & Props",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-3",
            title: "Hooks Deep Dive",
            status: "locked",
            type: "quiz",
            duration: "15 MINUTES",
            questionCount: 4,
          },
        ],
      },
      {
        id: "sec-2",
        title: "Week 5–8",
        description: "Node.js and Express API development.",
        lessons: [
          {
            id: "l-4",
            title: "Node.js Basics",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-5",
            title: "REST API with Express",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-6",
            title: "JWT Authentication",
            status: "locked",
            type: "quiz",
            duration: "20 MINUTES",
            questionCount: 5,
          },
        ],
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "React Cheat Sheet PDF",
        type: "pdf",
        url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
      },
      { id: "mat-2", title: "Module Exam", type: "exam" },
    ],
    exam: {
      id: "exam-react",
      title: "React & Node Exam",
      questions: [
        {
          id: "q-1",
          text: "Which hook replaces componentDidMount in functional components?",
          options: [
            { id: "q1-a", text: "useState" },
            { id: "q1-b", text: "useEffect" },
            { id: "q1-c", text: "useContext" },
            { id: "q1-d", text: "useRef" },
          ],
          correctOptionId: "q1-b",
        },
      ],
    },
    comments: [
      {
        id: "c-1",
        authorName: "Hana",
        text: "Can't wait to start this course!",
        timeAgo: "1 hour ago",
      },
    ],
    leaderboard: sharedLeaderboard,
    motivationalMessages: sharedMotivational,
  },

  // 6 – Cybersecurity Essentials
  {
    id: "cybersecurity-essentials",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    title: "Cybersecurity Essentials",
    instructor: "Yousef Al-Qassim",
    videoSrc: sampleVideo,
    details: {
      duration: "20 hours",
      lessons: 40,
      enrolled: "2,900 students",
      language: "English",
      level: "Intermediate",
      lastUpdated: "September 2026",
      certificate: "Certificate",
      access: "Lifetime access",
    },
    progress: { percentage: 45, studentLabel: "You", status: "in-progress" },
    curriculum: [
      {
        id: "sec-1",
        title: "Week 1–3",
        description: "Threats, vulnerabilities, and security models.",
        lessons: [
          {
            id: "l-1",
            title: "Intro to Cybersecurity",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-2",
            title: "Common Threats",
            status: "completed",
            type: "pdf",
          },
          {
            id: "l-3",
            title: "Threat Assessment Quiz",
            status: "current",
            type: "quiz",
            duration: "15 MINUTES",
            questionCount: 5,
          },
        ],
      },
      {
        id: "sec-2",
        title: "Week 4–6",
        description: "Network security and cryptography.",
        lessons: [
          {
            id: "l-4",
            title: "Firewalls & IDS",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-5",
            title: "Encryption Basics",
            status: "locked",
            type: "pdf",
          },
          {
            id: "l-6",
            title: "Cryptography Quiz",
            status: "locked",
            type: "quiz",
            duration: "20 MINUTES",
            questionCount: 6,
          },
        ],
      },
    ],
    materials: [
      {
        id: "mat-1",
        title: "Security Checklist PDF",
        type: "pdf",
        url: "https://www.w3.org/WAI/WCAG21/Techniques/pdf/PDF2.pdf",
      },
      { id: "mat-2", title: "Module Exam", type: "exam" },
    ],
    exam: {
      id: "exam-cyber",
      title: "Cybersecurity Exam",
      questions: [
        {
          id: "q-1",
          text: "What is a man-in-the-middle (MITM) attack?",
          options: [
            {
              id: "q1-a",
              text: "Intercepting communication between two parties",
            },
            { id: "q1-b", text: "A type of SQL injection" },
            { id: "q1-c", text: "Blocking network access via DDoS" },
            { id: "q1-d", text: "Stealing physical hardware" },
          ],
          correctOptionId: "q1-a",
        },
      ],
    },
    comments: [
      {
        id: "c-1",
        authorName: "Samir",
        text: "Very practical and well structured.",
        timeAgo: "6 hours ago",
      },
      {
        id: "c-2",
        authorName: "Dina",
        text: "The threat assessment section is eye-opening.",
        timeAgo: "2 days ago",
      },
    ],
    leaderboard: sharedLeaderboard,
    motivationalMessages: sharedMotivational,
  },
];

/** Look up a single course by its URL slug (`id`). Returns `undefined` if not found. */
export function getCourseById(id: string): CourseInfo | undefined {
  return allCourses.find((c) => c.id === id);
}
