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
      "(prefers-reduced-motion: reduce)",
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
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [progress.percentage]);

  return (
    <section
      ref={sectionRef}
      className="rounded-sm bg-surface-card pb-8"
      aria-label="Course progress"
    >
      <div
        className="relative mb-2 pt-12"
        role="progressbar"
        aria-valuenow={progress.percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${progress.percentage}% complete`}
      >
        {/* Track */}
        <div className="relative h-[5px] w-full overflow-visible rounded-full bg-progress-bg">
          {/* Fill */}
          <div
            ref={fillRef}
            className="h-full rounded-full bg-progress-fill transition-[inline-size] duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none"
            style={{ inlineSize: "0%" }}
          />
        </div>

        {/* Marker */}
        <div
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
          style={{ insetInlineStart: `${progress.percentage}%` }}
          aria-hidden="true"
        >
          <div className="mb-1 flex size-8 items-center justify-center rounded-full border-2 border-progress-marker bg-surface-card">
            <span className="whitespace-nowrap font-sans text-[0.6875rem] font-medium text-brand-accent">
              {progress.studentLabel}
            </span>
          </div>
          <div className="h-3 w-px bg-progress-marker" />
          <span className="mt-1 whitespace-nowrap font-sans text-[0.6875rem] font-medium text-brand-accent">
            {progress.percentage}%
          </span>
        </div>
      </div>
    </section>
  );
}
