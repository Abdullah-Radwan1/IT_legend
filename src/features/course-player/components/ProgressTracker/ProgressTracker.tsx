"use client";

import { useEffect, useRef } from "react";
import type { CourseProgress } from "../../models";
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
      className="rounded-[var(--radius-sm)] bg-[var(--color-surface-card)] px-[var(--space-6)] py-[var(--space-8)] shadow-[var(--shadow-card)]"
      aria-label="Course progress"
    >
      <h2 className="mb-[var(--space-6)] font-[family-name:var(--font-latin)] text-[1.2rem] font-semibold text-[var(--color-text-primary)] lg:text-2xl">Course progress</h2>

      <div className="relative mb-[var(--space-2)] pt-[52px]" role="progressbar" aria-valuenow={progress.percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress.percentage}% complete`}>
        {/* Track */}
        <div className="relative h-[5px] w-full overflow-visible rounded-full bg-[var(--color-progress-bg)]">
          {/* Fill */}
          <div
            ref={fillRef}
            className="h-full rounded-full bg-[var(--color-progress-fill)] transition-[inline-size] duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none"
            style={{ inlineSize: "0%" }}
          />
        </div>

        {/* Marker */}
        <div
          className="absolute top-0 flex translate-x-1/2 flex-col items-center"
          style={{ insetInlineStart: `${progress.percentage}%` }}
          aria-hidden="true"
        >
          <div className="mb-[var(--space-1)] flex size-8 items-center justify-center rounded-full border-2 border-[var(--color-progress-marker)] bg-[var(--color-surface-card)]">
            <span className="whitespace-nowrap font-[family-name:var(--font-latin)] text-[0.6875rem] font-medium text-[var(--color-brand-accent)]">{progress.studentLabel}</span>
          </div>
          <div className="h-3 w-px bg-[var(--color-progress-marker)]" />
          <span className="mt-[var(--space-1)] whitespace-nowrap font-[family-name:var(--font-latin)] text-[0.6875rem] font-medium text-[var(--color-brand-accent)]">{progress.percentage}%</span>
        </div>
      </div>

      <div className="mt-[var(--space-2)] flex justify-between font-[family-name:var(--font-latin)] text-xs text-[var(--color-text-muted)]" aria-hidden="true">
        <span>0%</span>
        <span>100%</span>
      </div>
    </section>
  );
}
