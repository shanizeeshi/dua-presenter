import clsx from "clsx";
import type { DuaSegment, LanguageKey } from "@/lib/types";

type SlideViewProps = {
  segment: DuaSegment;
  selectedLanguages: LanguageKey[];
};

const FALLBACK_LANGUAGES = new Set<LanguageKey>(["farsi", "urdu"]);

export function SlideView({ segment, selectedLanguages }: SlideViewProps) {
  return (
    <article className="fade-in mx-auto flex min-h-[90vh] w-full flex-col items-center justify-center gap-10 px-6 py-6 text-center">
      {selectedLanguages.map((language) => {
        const value = language === "arabic" ? segment.arabic : segment[language];
        const isRtl = language === "arabic" || language === "farsi" || language === "urdu";
        const showFallback = FALLBACK_LANGUAGES.has(language) && !value;

        return (
          <p
            key={language}
            dir={isRtl ? "rtl" : "ltr"}
            className={clsx(
              "w-full max-w-6xl leading-[1.8]",
              language === "arabic" && "font-[family-name:var(--font-arabic)] text-4xl text-[var(--cream-100)] sm:text-5xl lg:text-6xl",
              language === "english" && "text-3xl text-white/90 sm:text-4xl lg:text-5xl",
              language === "transliteration" && "italic text-3xl text-white/70 sm:text-4xl lg:text-5xl",
              language === "farsi" && "font-[family-name:var(--font-nastaliq)] text-4xl text-white/90 sm:text-5xl lg:text-6xl",
              language === "urdu" && "font-[family-name:var(--font-nastaliq)] text-4xl text-white/90 sm:text-5xl lg:text-6xl",
              showFallback && "text-white/40 text-2xl",
            )}
          >
            {showFallback ? "Translation coming soon" : value}
          </p>
        );
      })}
    </article>
  );
}
