"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const iconButtonClass =
    "flex shrink-0 items-center justify-center rounded-[var(--radius-md)] p-[var(--space-1)] text-white transition-colors hover:bg-[rgba(255,255,255,0.2)] focus-visible:outline-white [&_svg]:size-5";
  const rangeClass =
    "h-1 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,#6abd8a_var(--pct),rgba(255,255,255,0.35)_var(--pct))] [&::-webkit-slider-thumb]:size-[14px] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.4)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-[1.3] [&::-moz-range-thumb]:size-[14px] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2";

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
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`player relative aspect-video w-full overflow-hidden bg-black max-lg:sticky max-lg:top-0 max-lg:z-[80] max-lg:max-h-[240px] lg:h-[527px] lg:w-[799px] lg:shrink-0 lg:aspect-auto lg:rounded-[var(--radius-sm)] ${isTheater ? "lg:h-auto lg:aspect-video lg:w-full" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      aria-label={`Video player: ${title}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="block size-full cursor-pointer object-cover"
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
        className={`absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.25)] text-white transition-opacity [&_svg]:size-14 [&_svg]:[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.5))] lg:[&_svg]:size-[72px] ${isPlaying ? "pointer-events-none opacity-0" : ""}`}
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
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
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] px-[var(--space-4)] py-[var(--space-3)] opacity-0 transition-opacity ${showControls ? "pointer-events-auto opacity-100" : ""}`}
        role="group"
        aria-label="Video controls"
      >
        {/* Progress bar */}
        <div className="mb-[var(--space-2)]">
          <input
            ref={progressRef}
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className={rangeClass}
            aria-label="Playback progress"
            style={
              { "--pct": `${progressPercent}%` } as React.CSSProperties
            }
          />
        </div>

        {/* Bottom controls row */}
        <div className="flex items-center justify-between gap-[var(--space-2)]">
          {/* Left group */}
          <div className="flex items-center gap-[var(--space-2)]">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className={iconButtonClass}
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
              aria-label={isMuted ? "Unmute" : "Mute"}
              className={iconButtonClass}
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
              className={`${rangeClass} w-[72px] shrink-0 max-lg:hidden`}
              aria-label="Volume"
              style={
                {
                  "--pct": `${(isMuted ? 0 : volume) * 100}%`,
                } as React.CSSProperties
              }
            />

            {/* Time */}
            <time className="whitespace-nowrap font-[family-name:var(--font-latin)] text-xs font-medium text-[var(--color-time)]" dateTime={`PT${Math.floor(currentTime)}S`}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </time>
          </div>

          {/* Right group */}
          <div className="flex items-center gap-[var(--space-2)]">
            {/* Theater mode – desktop only */}
            <button
              onClick={handleTheater}
              aria-label={isTheater ? "Exit theater mode" : "Theater mode"}
              className={`${iconButtonClass} max-lg:hidden`}
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
              aria-label="Fullscreen"
              className={iconButtonClass}
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
