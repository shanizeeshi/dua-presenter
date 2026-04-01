export type LanguageKey = "arabic" | "transliteration" | "english" | "farsi" | "urdu";

export type DuaSegment = {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  farsi: string;
  urdu: string;
};

export type DuaMeta = {
  slug: string;
  title: string;
  brief: string;
  duration: string;
  description: string;
};

export type LanguageOption = {
  key: LanguageKey;
  label: string;
  nativeLabel: string;
  required?: boolean;
  defaultEnabled?: boolean;
};
