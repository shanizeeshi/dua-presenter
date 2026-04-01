"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LANGUAGE_OPTIONS, getDefaultLanguageSelection } from "@/lib/duas";
import type { DuaMeta, DuaSegment, LanguageKey } from "@/lib/types";

type SetupClientProps = {
  dua: DuaMeta;
  previewSegment: DuaSegment;
  totalSlides: number;
};

export function SetupClient({ dua, previewSegment, totalSlides }: SetupClientProps) {
  const [selection, setSelection] = useState(getDefaultLanguageSelection());

  const selectedCount = useMemo(
    () => Object.values(selection).filter(Boolean).length,
    [selection],
  );

  const presenterHref = useMemo(() => {
    const params = new URLSearchParams();

    LANGUAGE_OPTIONS.forEach((option) => {
      if (selection[option.key]) {
        params.append("lang", option.key);
      }
    });

    return `/present/${dua.slug}?${params.toString()}`;
  }, [dua.slug, selection]);

  return (
    <div className="page-shell min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="glass-card rounded-[2rem] px-6 py-8 sm:px-8">
          <Link href="/" className="text-sm uppercase tracking-[0.3em] text-amber-900/70">
            Back to library
          </Link>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-800/70">Setup</p>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl text-slate-900">
                {dua.title}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-700">{dua.description}</p>
            </div>
            <div className="rounded-2xl border border-amber-900/10 bg-white/50 px-5 py-4 text-sm text-slate-700">
              <p>{selectedCount} language layers selected</p>
              <p className="mt-1 text-amber-900/70">{dua.duration}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="glass-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-slate-900">
              Language Selection
            </h2>
            <p className="mt-2 text-slate-700">
              Arabic stays visible at all times. Choose the supporting layers you want beneath it.
            </p>

            <div className="mt-6 space-y-4">
              {LANGUAGE_OPTIONS.map((option) => {
                const checked = selection[option.key];

                return (
                  <label
                    key={option.key}
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-amber-900/10 bg-white/60 px-4 py-4 transition hover:border-amber-700/30"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {option.label} <span className="text-slate-500">{option.nativeLabel}</span>
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {option.required
                          ? "Required for every slide"
                          : option.key === "transliteration"
                            ? "Romanized line for audiences who read Arabic phonetically"
                            : "Displays beneath Arabic in presenter mode"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {option.required && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
                          Locked
                        </span>
                      )}
                      <input
                        aria-label={option.label}
                        checked={checked}
                        disabled={option.required}
                        onChange={() =>
                          setSelection((current) => ({
                            ...current,
                            [option.key]: !current[option.key],
                          }))
                        }
                        type="checkbox"
                        className="h-5 w-5 accent-amber-700"
                      />
                    </div>
                  </label>
                );
              })}
            </div>

            <Link
              href={presenterHref}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--cream-100)] transition hover:bg-slate-800"
            >
              Start Presentation
            </Link>
          </section>

          <section className="glass-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl text-slate-900">
                  Slide Preview
                </h2>
                <p className="mt-2 text-slate-700">First segment rendered with the current language mix.</p>
              </div>
              <span className="rounded-full border border-amber-900/10 bg-white/60 px-4 py-2 text-sm text-slate-700">
                1 / {totalSlides}
              </span>
            </div>

            <div className="presenter-shell relative mt-6 overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
              <div className="relative z-10">
                <p
                  dir="rtl"
                  className="font-[family-name:var(--font-arabic)] text-3xl leading-[1.8] text-[var(--cream-100)] sm:text-4xl"
                >
                  {previewSegment.arabic}
                </p>

                <div className="mt-6 space-y-4">
                  {LANGUAGE_OPTIONS.filter((option) => selection[option.key] && option.key !== "arabic").map(
                    (option) => {
                      const value = previewSegment[option.key as LanguageKey];
                      return (
                        <div key={option.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold-400)]">
                            {option.label}
                          </p>
                          <p className="mt-2 text-base leading-7 text-white/85">
                            {value || "Translation coming soon"}
                          </p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
