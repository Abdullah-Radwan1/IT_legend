"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {
  src: string;
  title: string;
  /** Called when theater mode is toggled – used by parent to adjust layout */
  onTheaterChange?: (isTheater: boolean) => void;
  isTheater?: boolean;
}

export default function VideoPlayer({
  src,
  title,
  onTheaterChange,
  isTheater = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const scheduleControlsHide = useCallback(() => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  }, [isPlaying]);

  // ── Video event handlers ──────────────────────────────────────────────────

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const handleMuteToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // ── Fullscreen ────────────────────────────────────────────────────────────

  const handleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      try {
        await el.requestFullscreen();
        // Best-effort landscape lock on mobile
        const screen = window.screen as Screen & {
          orientation?: { lock?: (o: string) => Promise<void> };
        };
        if (screen.orientation?.lock) {
          await screen.orientation.lock("landscape").catch(() => {});
        }
      } catch {
        // Silently fail – fullscreen may be blocked
      }
    } else {
      document.exitFullscreen();
    }
  };

  // ── Theater mode ──────────────────────────────────────────────────────────

  const handleTheater = () => {
    onTheaterChange?.(!isTheater);
  };

  // ── Controls visibility ───────────────────────────────────────────────────

  const handleMouseMove = () => {
    setShowControls(true);
    scheduleControlsHide();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only handle when focus is inside the player
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.code === "Space") {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === "KeyF") {
        handleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`${styles.player} ${isTheater ? styles.theater : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      aria-label={`مشغل الفيديو: ${title}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handlePlayPause}
        preload="metadata"
        playsInline
        aria-label={title}
      />

      {/* Play/Pause big overlay button (click area) */}
      <button
        className={`${styles.playOverlay} ${isPlaying ? styles.hidden : ""}`}
        onClick={handlePlayPause}
        aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        tabIndex={-1}
      >
        {!isPlaying && (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="5,3 19,12 5,21" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Controls bar */}
      <div
        className={`${styles.controls} ${showControls ? styles.visible : ""}`}
        role="group"
        aria-label="التحكم في الفيديو"
      >
        {/* Progress bar */}
        <div className={styles.progressWrapper}>
          <input
            ref={progressRef}
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
            aria-label="شريط التقدم"
            style={
              { "--pct": `${progressPercent}%` } as React.CSSProperties
            }
          />
        </div>

        {/* Bottom controls row */}
        <div className={styles.controlsRow}>
          {/* Left group */}
          <div className={styles.controlsLeft}>
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              className={styles.iconBtn}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                  <rect
                    x="14"
                    y="4"
                    width="4"
                    height="16"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <button
              onClick={handleMuteToggle}
              aria-label={isMuted ? "تفعيل الصوت" : "كتم الصوت"}
              className={styles.iconBtn}
            >
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M11 5L6 9H2v6h4l5 4V5z"
                    fill="currentColor"
                  />
                  <line
                    x1="23"
                    y1="9"
                    x2="17"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="17"
                    y1="9"
                    x2="23"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                  <path
                    d="M15.54 8.46a5 5 0 0 1 0 7.07"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M19.07 4.93a10 10 0 0 1 0 14.14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={`${styles.progressBar} ${styles.volumeSlider}`}
              aria-label="مستوى الصوت"
              style={
                {
                  "--pct": `${(isMuted ? 0 : volume) * 100}%`,
                } as React.CSSProperties
              }
            />

            {/* Time */}
            <time className={styles.time} dateTime={`PT${Math.floor(currentTime)}S`}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </time>
          </div>

          {/* Right group */}
          <div className={styles.controlsRight}>
            {/* Theater mode – desktop only */}
            <button
              onClick={handleTheater}
              aria-label={isTheater ? "وضع عادي" : "وضع المسرح"}
              className={`${styles.iconBtn} ${styles.theaterBtn}`}
              aria-pressed={isTheater}
            >
              {isTheater ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="2"
                    y="6"
                    width="20"
                    height="12"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line
                    x1="2"
                    y1="10"
                    x2="22"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              aria-label="ملء الشاشة"
              className={styles.iconBtn}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
