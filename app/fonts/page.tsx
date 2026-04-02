"use client";

import { useState } from "react";

const sampleUrdu = "خدایا میں تجھ سے تیری اس رحمت کاواسطہ دیکر سوال کرتاہوں جو ہر چیز سے وسیع و کشادہ ہے";
const sampleFarsi = "خدایا از تو درخواست می‌کنم به رحمتت که همه چیز را فراگرفته";
const sampleArabic = "اللَّهُمَّ إِنِّي أَسْألُكَ بِرَحْمَتِكَ الَّتِي وَسِعَتْ كُلَّ شَيٍْء";
const sampleEnglish = "O Allah, I ask You by Your mercy, which embraces all things";

const urduFarsiFonts = [
  {
    name: "Noto Nastaliq Urdu",
    css: "'Noto Nastaliq Urdu', serif",
    url: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap",
    style: "Nastaliq — traditional calligraphic style with diagonal flow",
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
    style: "Naskh — classic, elegant, book-style",
  },
  {
    name: "Scheherazade New",
    css: "'Scheherazade New', serif",
    url: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap",
    style: "Naskh — SIL International, very clean at large sizes",
  },
];

const arabicFonts = [
  {
    name: "Amiri",
    css: "'Amiri', serif",
    url: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap",
    style: "Classic Naskh — elegant book style, great for Quran text",
  },
  {
    name: "Noto Naskh Arabic",
    css: "'Noto Naskh Arabic', serif",
    url: "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap",
    style: "Modern Naskh — clean, readable, Google's standard",
  },
  {
    name: "Scheherazade New",
    css: "'Scheherazade New', serif",
    url: "https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap",
    style: "Traditional Naskh — very clear at large projection sizes",
  },
  {
    name: "Lateef",
    css: "'Lateef', serif",
    url: "https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&display=swap",
    style: "Nastaliq-influenced Naskh — softer, more flowing curves",
  },
  {
    name: "Noto Kufi Arabic",
    css: "'Noto Kufi Arabic', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap",
    style: "Kufi — geometric, bold, modern decorative style",
  },
];

const englishFonts = [
  {
    name: "Cormorant Garamond",
    css: "'Cormorant Garamond', serif",
    url: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
    style: "Elegant serif — refined, literary feel",
  },
  {
    name: "Lora",
    css: "'Lora', serif",
    url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap",
    style: "Contemporary serif — warm, balanced, very readable",
  },
  {
    name: "Playfair Display",
    css: "'Playfair Display', serif",
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap",
    style: "High contrast serif — dramatic, distinguished",
  },
  {
    name: "EB Garamond",
    css: "'EB Garamond', serif",
    url: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap",
    style: "Classic Garamond — timeless, scholarly, very clean",
  },
  {
    name: "Inter",
    css: "'Inter', sans-serif",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    style: "Modern sans-serif — clean, minimal, highly legible",
  },
];

function FontSection({
  title,
  subtitle,
  fonts,
  selected,
  onSelect,
  samples,
}: {
  title: string;
  subtitle: string;
  fonts: typeof urduFarsiFonts;
  selected: string | null;
  onSelect: (name: string) => void;
  samples: { label: string; text: string; rtl: boolean }[];
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-1 text-2xl font-bold text-amber-400">{title}</h2>
      <p className="mb-6 text-white/50">{subtitle}</p>
      <div className="space-y-6">
        {fonts.map((font, index) => (
          <div
            key={font.name}
            onClick={() => onSelect(font.name)}
            className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
              selected === font.name
                ? "border-amber-400 bg-amber-400/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-amber-300">
                  {index + 1}. {font.name}
                </h3>
                <p className="text-xs text-white/40">{font.style}</p>
              </div>
              {selected === font.name && (
                <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black">
                  ✓ Selected
                </span>
              )}
            </div>
            {samples.map((sample) => (
              <div key={sample.label} className="mt-3 rounded-xl bg-black/30 p-4">
                <p
                  dir={sample.rtl ? "rtl" : "ltr"}
                  style={{ fontFamily: font.css }}
                  className="text-3xl leading-[1.9] text-white/90 sm:text-4xl"
                >
                  {sample.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FontsPage() {
  const [selectedUrduFarsi, setSelectedUrduFarsi] = useState<string | null>(null);
  const [selectedArabic, setSelectedArabic] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);

  const allFontUrls = [...urduFarsiFonts, ...arabicFonts, ...englishFonts].map((f) => f.url);
  const uniqueUrls = [...new Set(allFontUrls)];

  return (
    <>
      {uniqueUrls.map((url) => (
        <link key={url} rel="stylesheet" href={url} />
      ))}

      <main className="min-h-screen bg-[#0d1117] px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-3xl font-bold text-amber-400">🎨 Choose Your Fonts</h1>
          <p className="mb-10 text-white/60">
            Pick one font for each language. Same dua text shown in each option. Tap to select.
          </p>

          {/* URDU & FARSI */}
          <FontSection
            title="Urdu & Farsi Fonts"
            subtitle="Pick the script style for Urdu and Persian translations"
            fonts={urduFarsiFonts}
            selected={selectedUrduFarsi}
            onSelect={setSelectedUrduFarsi}
            samples={[
              { label: "Urdu", text: sampleUrdu, rtl: true },
              { label: "Farsi", text: sampleFarsi, rtl: true },
            ]}
          />

          {/* ARABIC */}
          <FontSection
            title="Arabic Font"
            subtitle="Pick the font for the Arabic dua text"
            fonts={arabicFonts}
            selected={selectedArabic}
            onSelect={setSelectedArabic}
            samples={[{ label: "Arabic", text: sampleArabic, rtl: true }]}
          />

          {/* ENGLISH */}
          <FontSection
            title="English Font"
            subtitle="Pick the font for the English translation"
            fonts={englishFonts}
            selected={selectedEnglish}
            onSelect={setSelectedEnglish}
            samples={[{ label: "English", text: sampleEnglish, rtl: false }]}
          />

          {/* Summary */}
          <div className="rounded-2xl border-2 border-amber-400/50 bg-amber-400/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-amber-400">Your Selections</h2>
            <div className="space-y-2 text-lg">
              <p>
                <span className="text-white/50">Urdu & Farsi:</span>{" "}
                <span className="text-amber-300">{selectedUrduFarsi || "Not yet selected"}</span>
              </p>
              <p>
                <span className="text-white/50">Arabic:</span>{" "}
                <span className="text-amber-300">{selectedArabic || "Not yet selected"}</span>
              </p>
              <p>
                <span className="text-white/50">English:</span>{" "}
                <span className="text-amber-300">{selectedEnglish || "Not yet selected"}</span>
              </p>
            </div>
            {selectedUrduFarsi && selectedArabic && selectedEnglish && (
              <p className="mt-4 text-white/60">
                Tell Claw your choices and I&apos;ll update the app! 🚀
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
