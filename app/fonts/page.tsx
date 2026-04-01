"use client";

import { useState } from "react";

const sampleUrdu = "خدایا میں تجھ سے تیری اس رحمت کاواسطہ دیکر سوال کرتاہوں جو ہر چیز سے وسیع و کشادہ ہے";
const sampleFarsi = "خدایا از تو درخواست می‌کنم به رحمتت که همه چیز را فراگرفته";
const sampleArabic = "اللَّهُمَّ إِنِّي أَسْألُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيٍْء";

const fonts = [
  {
    name: "Noto Nastaliq Urdu",
    css: "'Noto Nastaliq Urdu', serif",
    url: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap",
    style: "Nastaliq — the traditional calligraphic Urdu style with diagonal flow",
  },
  {
    name: "Gulzar",
    css: "'Gulzar', serif",
    url: "https://fonts.googleapis.com/css2?family=Gulzar&display=swap",
    style: "Nastaliq — newer Google font, elegant and very readable",
  },
  {
    name: "Noto Naskh Arabic",
    css: "'Noto Naskh Arabic', serif",
    url: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap",
    style: "Naskh — horizontal, clean, modern newspaper style",
  },
  {
    name: "Amiri",
    css: "'Amiri', serif",
    url: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap",
    style: "Naskh — classic, elegant, book-style (currently used for Arabic)",
  },
  {
    name: "Scheherazade New",
    css: "'Scheherazade New', serif",
    url: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap",
    style: "Naskh — SIL International, very clean for large sizes",
  },
];

export default function FontsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Load all font stylesheets */}
      {fonts.map((f) => (
        <link key={f.name} rel="stylesheet" href={f.url} />
      ))}

      <main className="min-h-screen bg-[#0d1117] px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-3xl font-bold text-amber-400">Font Comparison — Urdu & Farsi</h1>
          <p className="mb-8 text-white/60">Tap a font to select it. Same dua text shown in each font.</p>

          <div className="space-y-8">
            {fonts.map((font, index) => (
              <div
                key={font.name}
                onClick={() => setSelected(font.name)}
                className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
                  selected === font.name
                    ? "border-amber-400 bg-amber-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-amber-300">
                      Option {index + 1}: {font.name}
                    </h2>
                    <p className="text-sm text-white/50">{font.style}</p>
                  </div>
                  {selected === font.name && (
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-black">
                      ✓ Selected
                    </span>
                  )}
                </div>

                {/* Urdu sample */}
                <div className="mb-4 rounded-xl bg-black/30 p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-amber-400/60">Urdu</p>
                  <p
                    dir="rtl"
                    style={{ fontFamily: font.css }}
                    className="text-3xl leading-[2] text-white/90 sm:text-4xl"
                  >
                    {sampleUrdu}
                  </p>
                </div>

                {/* Farsi sample */}
                <div className="mb-4 rounded-xl bg-black/30 p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-amber-400/60">Farsi</p>
                  <p
                    dir="rtl"
                    style={{ fontFamily: font.css }}
                    className="text-3xl leading-[2] text-white/90 sm:text-4xl"
                  >
                    {sampleFarsi}
                  </p>
                </div>

                {/* Arabic sample for comparison */}
                <div className="rounded-xl bg-black/30 p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-amber-400/60">Arabic (for comparison)</p>
                  <p
                    dir="rtl"
                    style={{ fontFamily: font.css }}
                    className="text-3xl leading-[2] text-white/90 sm:text-4xl"
                  >
                    {sampleArabic}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="mt-8 rounded-2xl border-2 border-amber-400 bg-amber-400/10 p-6 text-center">
              <p className="text-xl text-amber-300">
                You selected: <strong>{selected}</strong>
              </p>
              <p className="mt-2 text-white/60">
                Tell Claw which one you want and I&apos;ll update the app!
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
