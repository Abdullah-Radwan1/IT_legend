"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  PanelsTopLeft,
  Pause,
  Play,
  RectangleHorizontal,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  /** Called when theater (wide) mode is toggled – the parent uses it to move the course content below the player */
  onTheaterChange?: (isTheater: boolean) => void;
  isTheater?: boolean;
}

// Vendor-prefixed fullscreen APIs (Safari)
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};
type FsElement = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type LockableOrientation = {
  lock?: (orientation: string) => Promise<void>;
  unlock?: () => void;
};

const getFullscreenElement = () => {
  const d = document as FsDocument;
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? null;
};

const getOrientation = () =>
  (window.screen as unknown as { orientation?: LockableOrientation })
    .orientation;

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
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCssFullscreen, setIsCssFullscreen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
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
      if (isPlaying && !isTouch) setShowControls(false);
    }, 2800);
  }, [isPlaying, isTouch]);

  // ── Video event handlers ──────────────────────────────────────────────────

  const handlePlayPause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  }, []);

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

  // ── Fullscreen (web + mobile) ─────────────────────────────────────────────

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current as FsElement | null;
    if (!el) return;

    if (isCssFullscreen) {
      setIsCssFullscreen(false);
      setIsFullscreen(false);
      try {
        getOrientation()?.unlock?.();
      } catch {}
      return;
    }

    // Exit
    if (getFullscreenElement() === el) {
      const d = document as FsDocument;
      try {
        if (d.exitFullscreen) await d.exitFullscreen();
        else await d.webkitExitFullscreen?.();
      } catch {}
      return;
    }

    const requestFullscreen =
      el.requestFullscreen?.bind(el) ?? el.webkitRequestFullscreen?.bind(el);
    if (!requestFullscreen) {
      setIsCssFullscreen(true);
      setIsFullscreen(true);
      return;
    }

    // Call before awaiting anything so the browser's user-activation check passes.
    try {
      await requestFullscreen();
    } catch {
      setIsCssFullscreen(true);
      setIsFullscreen(true);
      return;
    }

    if (getFullscreenElement() !== el) {
      setIsCssFullscreen(true);
      setIsFullscreen(true);
      return;
    }
    setIsFullscreen(true);

    // Best-effort landscape lock (Android Chrome). If it is not supported or
    // fails, the CSS rotation fallback below takes over.
    try {
      await getOrientation()?.lock?.("landscape");
    } catch {}
  }, [isCssFullscreen]);

  // Track fullscreen state (also fires when the user exits with Esc / back gesture)
  useEffect(() => {
    const onChange = () => {
      const active = getFullscreenElement() === containerRef.current;
      setIsFullscreen(active);
      if (!active) {
        try {
          getOrientation()?.unlock?.();
        } catch {}
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  useEffect(() => {
    if (!isCssFullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsCssFullscreen(false);
      setIsFullscreen(false);
      try {
        getOrientation()?.unlock?.();
      } catch {}
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isCssFullscreen]);

  // Track device orientation + touch, used for the rotation fallback
  useEffect(() => {
    const update = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Fullscreen on a phone that is still portrait (auto-rotate off, or the
  // orientation lock was refused): rotate the player 90° so it fills the screen.
  const forceLandscape = isFullscreen && isTouch && isPortrait;

  const rotatedStyle: React.CSSProperties | undefined = forceLandscape
    ? {
        top: 0,
        left: "100%",
        right: "auto",
        bottom: "auto",
        width: "100dvh",
        height: "100dvw",
        transformOrigin: "top left",
        transform: "rotate(90deg)",
      }
    : undefined;

  // ── Theater (wide) mode ───────────────────────────────────────────────────

  const handleTheater = () => {
    onTheaterChange?.(!isTheater);
  };

  // ── Controls visibility ───────────────────────────────────────────────────

  const handleMouseMove = () => {
    setShowControls(true);
    scheduleControlsHide();
  };
  const handleMouseLeave = () => {
    if (isPlaying && !isTouch) setShowControls(false);
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

  // Keep controls available on touch devices; hide them during desktop playback.
  useEffect(() => {
    if (isPlaying) scheduleControlsHide();
  }, [isPlaying, scheduleControlsHide]);

  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
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
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePlayPause, toggleFullscreen]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    // Outer element: sizing, sticky on mobile, and the element that goes fullscreen.
    // The [&:fullscreen] overrides reset sizing limits so it fills the screen.
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden bg-black lg:max-h-[65vh] max-lg:sticky max-lg:top-0 max-lg:z-50 [&:fullscreen]:aspect-auto [&:fullscreen]:max-h-none [&:fullscreen]:rounded-none [&:-webkit-full-screen]:aspect-auto [&:-webkit-full-screen]:max-h-none [&:-webkit-full-screen]:rounded-none ${
        isTheater
          ? "lg:max-h-[80vh] lg:rounded-none"
          : "lg:rounded-[var(--radius-sm)]"
      }`}
      style={
        isCssFullscreen
          ? {
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              maxHeight: "none",
              aspectRatio: "auto",
              borderRadius: 0,
              zIndex: 9999,
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Video player: ${title}`}
    >
      {/* Inner element: holds everything, and is the one rotated by the landscape fallback */}
      <div className="absolute inset-0" style={rotatedStyle}>
        {/* Video element */}
        <video
          ref={videoRef}
          className="block size-full cursor-pointer object-contain"
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handlePlayPause}
          preload="metadata"
          playsInline
          aria-label={title}
        />

        {/* Decorative play overlay; clicks pass through to the video and controls. */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.25)] text-white transition-opacity [&_svg]:size-14 [&_svg]:[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.5))] lg:[&_svg]:size-[72px] ${isPlaying ? "opacity-0" : ""}`}
          aria-hidden="true"
        >
          {!isPlaying && <Play fill="currentColor" />}
        </div>

        {/* Controls bar */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.75)] px-[var(--space-4)] py-[var(--space-3)] transition-opacity ${showControls ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
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
              style={{ "--pct": `${progressPercent}%` } as React.CSSProperties}
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
                  <Pause aria-hidden="true" fill="currentColor" />
                ) : (
                  <Play aria-hidden="true" fill="currentColor" />
                )}
              </button>

              {/* Time */}
              <time
                className="whitespace-nowrap text-xs font-medium text-time"
                dateTime={`PT${Math.floor(currentTime)}S`}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </time>
            </div>

            {/* Right group */}
            <div className="flex items-center gap-[var(--space-2)]">
              {/* Wide (theater) mode – desktop only */}
              <button
                onClick={handleTheater}
                aria-label={isTheater ? "Exit wide mode" : "Wide mode"}
                className={`${iconButtonClass} max-lg:hidden`}
                aria-pressed={isTheater}
              >
                {isTheater ? (
                  <PanelsTopLeft aria-hidden="true" />
                ) : (
                  <RectangleHorizontal aria-hidden="true" />
                )}
              </button>

              {/* Fullscreen (maximize) */}
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className={iconButtonClass}
              >
                {isFullscreen ? (
                  <Minimize aria-hidden="true" />
                ) : (
                  <Maximize aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
