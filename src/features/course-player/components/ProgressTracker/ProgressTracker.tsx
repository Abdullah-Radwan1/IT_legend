"use client";

import { useEffect, useRef } from "react";
import type { CourseProgress } from "../../models";
import styles from "./ProgressTracker.module.scss";

interface ProgressTrackerProps {
  progress: CourseProgress;
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const fill = fillRef.current;
    const section = sectionRef.current;
    if (!fill || !section) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      fill.style.inlineSize = `${progress.percentage}%`;
      animated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          // Small delay for visual impact
          setTimeout(() => {
            fill.style.inlineSize = `${progress.percentage}%`;
          }, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [progress.percentage]);

  return (
    <section
      ref={sectionRef}
      className={styles.tracker}
      aria-label="تقدم الكورس"
    >
      <h2 className={styles.heading}>تقدم الكورس</h2>

      <div className={styles.barWrapper} role="progressbar" aria-valuenow={progress.percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress.percentage}% مكتمل`}>
        {/* Track */}
        <div className={styles.track}>
          {/* Fill */}
          <div
            ref={fillRef}
            className={styles.fill}
            style={{ inlineSize: "0%" }}
          />
        </div>

        {/* Marker */}
        <div
          className={styles.markerWrapper}
          style={{ insetInlineStart: `${progress.percentage}%` }}
          aria-hidden="true"
        >
          <div className={styles.markerBubble}>
            <span className={styles.markerLabel}>{progress.studentLabel}</span>
          </div>
          <div className={styles.markerTick} />
          <span className={styles.markerPct}>{progress.percentage}%</span>
        </div>
      </div>

      <div className={styles.labels} aria-hidden="true">
        <span>0%</span>
        <span>100%</span>
      </div>
    </section>
  );
}
