import kumailData from "@/data/dua-kumail.json";
import type { DuaMeta, DuaSegment, LanguageOption, LanguageKey } from "@/lib/types";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { key: "arabic", label: "Arabic", nativeLabel: "العربية", required: true, defaultEnabled: true },
  { key: "transliteration", label: "Transliteration", nativeLabel: "Romanized", defaultEnabled: false },
  { key: "english", label: "English", nativeLabel: "English", defaultEnabled: true },
  { key: "farsi", label: "Farsi", nativeLabel: "فارسی", defaultEnabled: false },
  { key: "urdu", label: "Urdu", nativeLabel: "اردو", defaultEnabled: false },
];

export const DUA_CATALOG: Record<string, DuaMeta> = {
  "dua-kumail": {
    slug: "dua-kumail",
    title: "Dua Kumail",
    brief: "Complete Thursday night supplication with Arabic and multilingual presentation layers.",
    duration: "35-45 minutes",
    description: "A full-screen presentation flow for congregational recitation with navigation tuned for projector and mobile use.",
  },
};

export function getAllDuas(): DuaMeta[] {
  return Object.values(DUA_CATALOG);
}

export function getDuaMeta(slug: string): DuaMeta | undefined {
  return DUA_CATALOG[slug];
}

export function getDuaSegments(slug: string): DuaSegment[] | undefined {
  if (slug === "dua-kumail") {
    return kumailData as DuaSegment[];
  }

  return undefined;
}

export function getDefaultLanguageSelection(): Record<LanguageKey, boolean> {
  return LANGUAGE_OPTIONS.reduce(
    (acc, option) => {
      acc[option.key] = option.required || Boolean(option.defaultEnabled);
      return acc;
    },
    {} as Record<LanguageKey, boolean>,
  );
}
