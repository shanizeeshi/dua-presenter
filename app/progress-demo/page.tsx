"use client";

import { useState } from "react";

const TOTAL = 249;

const options = [
  {
    name: "A — Bottom Line (current)",
    desc: "Thin gold line at very bottom. Subtle but easy to miss.",
  },
  {
    name: "B — Bottom Glow",
    desc: "Slightly thicker line with a soft glow. Visible but not distracting.",
  },
  {
    name: "C — Top Line",
    desc: "Thin line at the top of screen. Out of the way, glanceable.",
  },
  {
    name: "D — Dot Trail",
    desc: "Small dots along the bottom — filled dots = progress.",
  },
  {
    name: "E — Fade Border",
    desc: "Subtle gradient border around the whole screen that fills clockwise.",
  },
  {
    name: "F — Corner Arc",
    desc: "Small circular arc in bottom-right corner. Minimal footprint.",
  },
];

function OptionA({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
      <div
        className="h-full bg-amber-400 transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function OptionB({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-white/5">
      <div
        className="h-full bg-amber-400 transition-[width] duration-300"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 12px 2px rgba(251, 191, 36, 0.4)",
        }}
      />
    </div>
  );
}

function OptionC({ progress }: { progress: number }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10">
      <div
        className="h-full bg-amber-400 transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function OptionD({ progress }: { progress: number }) {
  const dotCount = 20;
  const filledDots = Math.round((progress / 100) * dotCount);
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: dotCount }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            i < filledDots
              ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
              : "bg-white/15"
          }`}
        />
      ))}
    </div>
  );
}

function OptionE({ progress }: { progress: number }) {
  const dashTotal = 800;
  const dashFilled = dashTotal * (1 - progress / 100);
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 120" preserveAspectRatio="none">
        <rect
          x="1" y="1" width="198" height="118" rx="4"
          fill="none"
          stroke="rgba(251,191,36,0.3)"
          strokeWidth="1.5"
          strokeDasharray={dashTotal}
          strokeDashoffset={dashFilled}
          className="transition-all duration-300"
        />
      </svg>
    </>
  );
}

function OptionF({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 16;
  const offset = circumference * (1 - progress / 100);
  return (
    <div className="absolute bottom-4 right-4">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r="16" fill="none"
          stroke="rgba(251,191,36,0.7)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
          transform="rotate(-90 22 22)"
        />
        <text x="22" y="26" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
}

export default function ProgressDemo() {
  const [current, setCurrent] = useState(62);
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-6">
      <h1 className="text-2xl font-bold mb-2 text-amber-400">Progress Tracker Options</h1>
      <p className="text-white/60 mb-4">Drag the slider to simulate progress. Each box shows how it looks on the dark presentation background.</p>

      <div className="mb-8 flex items-center gap-4">
        <label className="text-white/70">Slide {current + 1} / {TOTAL}</label>
        <input
          type="range"
          min={0}
          max={TOTAL - 1}
          value={current}
          onChange={(e) => setCurrent(Number(e.target.value))}
          className="flex-1 accent-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((opt, i) => {
          const Comp = [OptionA, OptionB, OptionC, OptionD, OptionE, OptionF][i];
          return (
            <div key={i} className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-amber-300">{opt.name}</h2>
              <p className="text-sm text-white/50">{opt.desc}</p>
              <div className="relative bg-[#0d1526] border border-white/10 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                <p className="text-white/30 text-center text-sm px-8 font-[family-name:var(--font-arabic)]" dir="rtl">
                  اَللّٰهُمَّ إِنِّي أَسْأَلُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيْءٍ
                </p>
                <Comp progress={progress} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-white/40 text-sm">Pick your favorite and let me know — I&apos;ll deploy it immediately.</p>
    </div>
  );
}
