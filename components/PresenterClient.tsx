"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { SlideView } from "@/components/SlideView";
import { LANGUAGE_OPTIONS } from "@/lib/duas";
import type { DuaMeta, DuaSegment, LanguageKey } from "@/lib/types";

type PresenterClientProps = {
  dua: DuaMeta;
  segments: DuaSegment[];
  initialLanguages: LanguageKey[];
};

const fallbackLanguages: LanguageKey[] = ["arabic", "english"];

export function PresenterClient({ segments, initialLanguages }: PresenterClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedLanguages = useMemo(() => {
    const filtered = initialLanguages.filter((language, index, values) => {
      return values.indexOf(language) === index && LANGUAGE_OPTIONS.some((option) => option.key === language);
    });

    const safeLanguages = filtered.length > 0 ? filtered : fallbackLanguages;
    const withoutArabic = safeLanguages.filter((language) => language !== "arabic");
    return ["arabic" as LanguageKey, ...withoutArabic];
  }, [initialLanguages]);

  const currentSegment = segments[currentIndex];

  function goNext() {
    setCurrentIndex((value) => Math.min(value + 1, segments.length - 1));
  }

  function goPrevious() {
    setCurrentIndex((value) => Math.max(value - 1, 0));
  }

  async function enterFullscreen() {
    try {
      await document.documentElement.requestFullscreen();
    } catch { /* ignore */ }
    setShowControls(false);
  }

  // Auto-enter fullscreen on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      enterFullscreen();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Show controls briefly on mouse move, then hide
  useEffect(() => {
    function handleMove() {
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen().catch(() => undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="presenter-shell relative flex min-h-screen flex-col overflow-hidden">
      {/* Minimal slide counter — fades with controls */}
      <div
        className="fixed right-4 top-4 z-20 transition-opacity duration-500"
        style={{ opacity: showControls ? 0.6 : 0 }}
      >
        <span className="text-sm text-white/60">
          {currentIndex + 1} / {segments.length}
        </span>
      </div>

      <div
        className="relative z-10 flex flex-1 items-center"
        onClick={(event) => {
          const clickX = event.clientX;
          const halfway = window.innerWidth / 2;
          if (clickX >= halfway) {
            goNext();
          } else {
            goPrevious();
          }
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX ?? null;
          touchStartX.current = null;

          if (startX === null || endX === null) return;
          const delta = endX - startX;
          if (Math.abs(delta) < 48) return;
          if (delta < 0) goNext();
          else goPrevious();
        }}
      >
        <SlideView key={currentSegment.id} segment={currentSegment} selectedLanguages={selectedLanguages} />
      </div>

      <ProgressBar current={currentIndex} total={segments.length} />
    </main>
  );
}
