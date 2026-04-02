import clsx from "clsx";
import type { DuaSegment, LanguageKey } from "@/lib/types";

type SlideViewProps = {
  segment: DuaSegment;
  selectedLanguages: LanguageKey[];
};

const FALLBACK_LANGUAGES = new Set<LanguageKey>(["farsi", "urdu"]);

export function SlideView({ segment, selectedLanguages }: SlideViewProps) {
  const langCount = selectedLanguages.length;

  // Scale font size based on how many languages are shown
  // Fewer languages = bigger text to fill the screen
  const sizeClass = langCount <= 2
    ? "text-[5vw] sm:text-[4.5vw] lg:text-[4vw]"
    : langCount <= 3
      ? "text-[3.5vw] sm:text-[3.2vw] lg:text-[3vw]"
      : "text-[2.8vw] sm:text-[2.5vw] lg:text-[2.3vw]";

  return (
    <article className="fade-in flex min-h-screen w-full flex-col items-center justify-center px-[4vw] py-[3vh]">
      {selectedLanguages.map((language) => {
        const value = language === "arabic" ? segment.arabic : segment[language];
        const isRtl = language === "arabic" || language === "farsi" || language === "urdu";
        const showFallback = FALLBACK_LANGUAGES.has(language) && !value;

        return (
          <div
            key={language}
            className="flex w-full flex-1 items-center justify-center"
          >
            <p
              dir={isRtl ? "rtl" : "ltr"}
              className={clsx(
                "w-full max-w-[90vw] leading-[1.7] text-center",
                sizeClass,
                language === "arabic" && "font-[family-name:var(--font-arabic)] text-[var(--cream-100)]",
                language === "english" && "text-white/90",
                language === "transliteration" && "italic text-white/70",
                language === "farsi" && "font-[family-name:var(--font-nastaliq)] text-white/90",
                language === "urdu" && "font-[family-name:var(--font-nastaliq)] text-white/90",
                showFallback && "text-white/40",
              )}
            >
              {showFallback ? "Translation coming soon" : value}
            </p>
          </div>
        );
      })}
    </article>
  );
}
