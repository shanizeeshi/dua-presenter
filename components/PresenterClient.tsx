"use client";

import Link from "next/link";
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

export function PresenterClient({ dua, segments, initialLanguages }: PresenterClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);

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

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  }

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
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

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="presenter-shell relative flex min-h-screen flex-col overflow-hidden">
      <div className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <Link href={`/setup/${dua.slug}`} className="text-xs uppercase tracking-[0.3em] text-white/50">
            Setup
          </Link>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
            {dua.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
            {currentIndex + 1} / {segments.length}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-full border border-[var(--gold-400)]/40 bg-[var(--gold-500)]/10 px-4 py-2 text-sm font-medium text-[var(--gold-400)] transition hover:bg-[var(--gold-500)]/20"
          >
            {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </button>
        </div>
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

          if (startX === null || endX === null) {
            return;
          }

          const delta = endX - startX;
          if (Math.abs(delta) < 48) {
            return;
          }

          if (delta < 0) {
            goNext();
          } else {
            goPrevious();
          }
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2" />
        <SlideView key={currentSegment.id} segment={currentSegment} selectedLanguages={selectedLanguages} />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 px-4 pb-6 text-xs uppercase tracking-[0.2em] text-white/45">
        {selectedLanguages.map((language) => {
          const option = LANGUAGE_OPTIONS.find((item) => item.key === language);
          if (!option) return null;

          return (
            <span key={language} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {option.label}
            </span>
          );
        })}
      </div>

      <ProgressBar current={currentIndex} total={segments.length} />
    </main>
  );
}
