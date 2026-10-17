"use client";

import { useState } from "react";
import type { CourseInfo } from "../../models";

import ActionBar from "../ActionBar/ActionBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Curriculum from "../Curriculum/Curriculum";
import CourseMaterials from "../CourseMaterials/CourseMaterials";
import CommentsSection from "../CommentsSection/CommentsSection";
import AskQuestionModal from "../AskQuestionModal/AskQuestionModal";
import LeaderboardModal from "../LeaderboardModal/LeaderboardModal";
import ExamModal from "../ExamModal/ExamModal";
import PdfModal from "../PdfModal/PdfModal";

interface CoursePlayerPageProps {
  data: CourseInfo;
  /** Optional breadcrumb bar rendered above the title */
  breadcrumb?: React.ReactNode;
}

export default function CoursePlayerPage({
  data,
  breadcrumb,
}: CoursePlayerPageProps) {
  const [isTheater, setIsTheater] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    { type: "pdf"; url: string } | { type: "exam" } | null
  >(null);
  const pdfUrl = data.materials.find(
    (material) => material.type === "pdf" && material.url
  )?.url;

  return (
    <>
      {/* Desktop navigation */}
      <header className="bg-bg-light py-2 px-12">
        {breadcrumb}

        <h1 className="text-5xl font-medium py-2">{data.title}</h1>
      </header>
      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="min-h-dvh lg:px-12 px-8 py-6">
        {/* Breadcrumb – only shown when provided */}

        <div
          className={`flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start lg:gap-x-8 ${
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

          <Curriculum
            sections={data.curriculum}
            onOpenPdf={
              pdfUrl
                ? () => setActiveModal({ type: "pdf", url: pdfUrl })
                : undefined
            }
            onOpenExam={() => setActiveModal({ type: "exam" })}
          />
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
      {activeModal?.type === "pdf" && (
        <PdfModal
          url={activeModal.url}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal?.type === "exam" && (
        <ExamModal
          exam={data.exam}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
