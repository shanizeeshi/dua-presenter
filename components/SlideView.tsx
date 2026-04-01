import clsx from "clsx";
import { LANGUAGE_OPTIONS } from "@/lib/duas";
import type { DuaSegment, LanguageKey } from "@/lib/types";

type SlideViewProps = {
  segment: DuaSegment;
  selectedLanguages: LanguageKey[];
};

const FALLBACK_LANGUAGES = new Set<LanguageKey>(["farsi", "urdu"]);

export function SlideView({ segment, selectedLanguages }: SlideViewProps) {
  return (
    <article className="fade-in mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-10 text-center sm:px-8">
      <section className="max-w-5xl">
        <p
          dir="rtl"
          className="font-[family-name:var(--font-arabic)] text-4xl leading-[1.9] text-[var(--cream-100)] sm:text-5xl lg:text-6xl"
        >
          {segment.arabic}
        </p>
      </section>

      <div className="flex w-full max-w-4xl flex-col gap-5">
        {selectedLanguages
          .filter((language) => language !== "arabic")
          .map((language) => {
            const option = LANGUAGE_OPTIONS.find((item) => item.key === language);
            if (!option) return null;

            const value = segment[language];
            const showFallback = FALLBACK_LANGUAGES.has(language) && !value;

            return (
              <section
                key={language}
                className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm sm:px-6"
              >
                <div className="mb-3 flex items-center justify-center gap-3">
                  <span className="rounded-full border border-[var(--gold-400)]/40 bg-[var(--gold-500)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[var(--gold-400)]">
                    {option.label}
                  </span>
                  <span className="text-sm text-[var(--muted-200)]">{option.nativeLabel}</span>
                </div>
                <p
                  dir={language === "farsi" || language === "urdu" ? "rtl" : "ltr"}
                  className={clsx(
                    "text-lg leading-8 text-white/85 sm:text-xl",
                    language === "transliteration" && "italic text-[var(--muted-200)]",
                    showFallback && "text-[var(--muted-200)]",
                  )}
                >
                  {showFallback ? "Translation coming soon" : value}
                </p>
              </section>
            );
          })}
      </div>
    </article>
  );
}
