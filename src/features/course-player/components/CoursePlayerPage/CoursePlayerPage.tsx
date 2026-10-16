"use client";

import { useState } from "react";
import type { CourseInfo } from "../../models";

import NavBar from "../NavBar/NavBar";
import ActionBar from "../ActionBar/ActionBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Curriculum from "../Curriculum/Curriculum";
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

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="min-h-dvh bg-bg lg:mx-auto lg:max-w-[1304px]  p-2 lg:px-9.5 lg:pb-12 lg:pt-4">
        <h1 className="text-5xl font-medium py-2">Starting SEO as your Home</h1>

        <div
          className={`flex flex-col  lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-x-16 ${
            isTheater ? "lg:grid-cols-1!" : ""
          }`}
        >
          {/* left side  */}
          <div className="flex min-w-0 flex-col gap-6">
            <section aria-label="Course player">
              <VideoPlayer
                src={data.videoSrc}
                title={data.title}
                onTheaterChange={setIsTheater}
                isTheater={isTheater}
              />
            </section>
            {/* Action bar */}
            <ActionBar
              onAskQuestion={() => setAskOpen(true)}
              onLeaderboard={() => setLeaderboardOpen(true)}
            />
            <CourseMaterials
              details={data.details}
              materials={data.materials}
              exam={data.exam}
            />
            <CommentsSection initialComments={data.comments} />
          </div>
          {/* right side  */}

          <Curriculum sections={data.curriculum} />
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
