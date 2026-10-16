"use client";

import { useState } from "react";
import type { CourseInfo } from "../../models";

import NavBar from "../NavBar/NavBar";
import ActionBar from "../ActionBar/ActionBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Curriculum from "../Curriculum/Curriculum";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import CourseMaterials from "../CourseMaterials/CourseMaterials";
import CommentsSection from "../CommentsSection/CommentsSection";
import AskQuestionModal from "../AskQuestionModal/AskQuestionModal";
import LeaderboardModal from "../LeaderboardModal/LeaderboardModal";

interface CoursePlayerPageProps {
  data: CourseInfo;
}

export default function CoursePlayerPage({ data }: CoursePlayerPageProps) {
  const [isTheater, setIsTheater] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <>
      {/* Desktop navigation */}
      <NavBar courseName={data.title} instructor={data.instructor} />

      {/* Action bar */}
      <ActionBar
        onAskQuestion={() => setAskOpen(true)}
        onLeaderboard={() => setLeaderboardOpen(true)}
      />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className={`min-h-dvh bg-[var(--color-bg)] lg:mx-auto lg:max-w-[1304px] lg:px-[38px] lg:pb-[var(--space-12)] lg:pt-[var(--space-4)] ${isTheater ? "lg:[&_.player-wrapper]:!w-full lg:[&_.desktop-sidebar]:!hidden lg:[&_.top-section]:block lg:[&_.curriculum-mobile]:!block" : ""}`}>
        {/* Top section: video + curriculum sidebar (desktop: side by side, mobile: stacked) */}
        <section className="top-section lg:mb-[var(--space-6)] lg:flex lg:items-start lg:gap-[var(--space-6)]" aria-label="Course player">
          {/* Video player */}
          <div className="player-wrapper lg:w-[799px] lg:shrink-0">
            <VideoPlayer
              src={data.videoSrc}
              title={data.title}
              onTheaterChange={setIsTheater}
              isTheater={isTheater}
            />
          </div>

          {/* Curriculum sidebar – hidden on mobile (shown separately below) */}
          <div className="desktop-sidebar hidden lg:block lg:max-w-[424px] lg:flex-1">
            <Curriculum sections={data.curriculum} />
          </div>
        </section>

        {/* Curriculum – mobile only (below video) */}
        <div className={`curriculum-mobile lg:hidden ${isTheater ? "lg:my-[var(--space-6)] [&_aside]:!h-auto [&_aside]:!max-h-none [&_aside]:!w-full [&_aside]:!max-w-full [&_aside]:!rounded-[var(--radius-sm)]" : ""}`}>
          <Curriculum sections={data.curriculum} />
        </div>

        {/* Below-fold content */}
        <div className="flex flex-col gap-[var(--space-4)] lg:gap-[var(--space-6)]">
          {/* Progress tracker */}
          <ProgressTracker progress={data.progress} />

          {/* Course materials */}
          <CourseMaterials materials={data.materials} exam={data.exam} />

          {/* Comments */}
          <CommentsSection initialComments={data.comments} />
        </div>
      </main>

      {/* Modals */}
      {askOpen && <AskQuestionModal onClose={() => setAskOpen(false)} />}

      {leaderboardOpen && (
        <LeaderboardModal
          courseName={data.title}
          entries={data.leaderboard}
          messages={data.motivationalMessages}
          progress={data.progress}
          onClose={() => setLeaderboardOpen(false)}
        />
      )}
    </>
  );
}
