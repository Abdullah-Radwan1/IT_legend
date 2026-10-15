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

import styles from "./CoursePlayerPage.module.scss";

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
      <main className={`${styles.main} ${isTheater ? styles.theater : ""}`}>
        {/* Top section: video + curriculum sidebar (desktop: side by side, mobile: stacked) */}
        <section className={styles.topSection} aria-label="مشغل الكورس">
          {/* Video player */}
          <div className={styles.playerWrapper}>
            <VideoPlayer
              src={data.videoSrc}
              title={data.title}
              onTheaterChange={setIsTheater}
              isTheater={isTheater}
            />
          </div>

          {/* Curriculum sidebar – hidden on mobile (shown separately below) */}
          <div className={styles.sidebarDesktop}>
            <Curriculum sections={data.curriculum} />
          </div>
        </section>

        {/* Curriculum – mobile only (below video) */}
        <div className={styles.curriculumMobile}>
          <Curriculum sections={data.curriculum} />
        </div>

        {/* Below-fold content */}
        <div className={styles.belowFold}>
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
