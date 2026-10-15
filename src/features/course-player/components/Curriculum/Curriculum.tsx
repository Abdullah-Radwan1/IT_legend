// Curriculum – Server Component (pure display)

import type { CurriculumSection } from "../../models";
import styles from "./Curriculum.module.scss";

interface CurriculumProps {
  sections: CurriculumSection[];
}

export default function Curriculum({ sections }: CurriculumProps) {
  return (
    <aside
      id="curriculum"
      className={styles.sidebar}
      aria-label="المنهج الدراسي"
    >
      <h2 className={styles.heading}>المنهج الدراسي</h2>

      <div className={styles.sections}>
        {sections.map((section) => (
          <div key={section.id} className={styles.section}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>

            <ul className={styles.lessonList} role="list">
              {section.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className={`${styles.lesson} ${styles[lesson.status]}`}
                  aria-current={lesson.status === "current" ? "page" : undefined}
                >
                  {/* Status icon */}
                  <span
                    className={styles.statusIcon}
                    aria-hidden="true"
                    aria-label={
                      lesson.status === "completed"
                        ? "مكتمل"
                        : lesson.status === "current"
                        ? "الدرس الحالي"
                        : "مقفول"
                    }
                  >
                    {lesson.status === "completed" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9,12 11,14 15,10" />
                      </svg>
                    )}
                    {lesson.status === "current" && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10,8 16,12 10,16" fill="#fff" />
                      </svg>
                    )}
                    {lesson.status === "locked" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </span>

                  <span className={styles.lessonTitle}>{lesson.title}</span>

                  <span className={styles.duration}>{lesson.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
