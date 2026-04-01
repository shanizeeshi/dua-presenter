# Dua Presenter — Build Instructions

## What to Build
A Next.js web app that presents Islamic duas (starting with Dua Kumail) in a full-screen presentation mode with multilingual translations. Think of it as a PowerPoint replacement for mosque dua recitations.

## Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS
- TypeScript
- No database — duas stored as JSON data files
- Vercel deployment

## Core Flow

### Page 1: Home (`/`)
- Clean Islamic-themed landing
- List of available duas (start with Dua Kumail only, but architecture for more)
- Each dua card shows: name, brief description, estimated duration
- Click → goes to setup page

### Page 2: Setup (`/setup/[dua]`)
- "Dua Kumail" header
- **Language Selection:**
  - Arabic: always on, always first (shown as locked/required)
  - Transliteration (romanized Arabic): toggle on/off
  - English: toggle on/off (default on)
  - Farsi/Persian: toggle on/off
  - Urdu: toggle on/off
  - Other languages can be added later
- Preview of how one slide will look with selected languages
- "Start Presentation" button → goes to presenter

### Page 3: Presenter (`/present/[dua]`)
- **FULL SCREEN capable** (use Fullscreen API — button to enter/exit fullscreen)
- Each "slide" shows one verse/segment of the dua:
  - Arabic text (large, centered, Amiri font, right-to-left)
  - Then each selected translation below in order selected
  - Each language labeled (small tag: "English", "فارسی", "اردو")
- **Navigation:**
  - Click anywhere on right half → next slide
  - Click anywhere on left half → previous slide  
  - Right arrow key → next
  - Left arrow key → previous
  - Space bar → next
  - Swipe left → next (mobile)
  - Swipe right → previous (mobile)
  - Escape → exit fullscreen
- **Progress bar** at bottom (thin, subtle)
- Slide counter: "23 / 147" in corner
- **Design:** Dark background (#1a1a2e or deep navy), white/cream Arabic text, gold accent for labels, translations in slightly smaller/lighter font
- Transitions: smooth fade between slides

## Dua Kumail Data
You need to source the COMPLETE text of Dua Kumail. It's one of the most well-known Shia duas, recited on Thursday nights.

Structure each verse as:
```json
{
  "id": 1,
  "arabic": "اَللّٰهُمَّ اِنِّيْ اَسْاَلُكَ بِرَحْمَتِكَ الَّتِيْ وَسِعَتْ كُلَّ شَيْءٍ",
  "transliteration": "Allahumma inni as'aluka bi rahmatika allati wasi'at kulla shay",
  "english": "O Allah, I ask You by Your mercy, which encompasses all things",
  "farsi": "خدایا، از تو می‌خواهم به رحمتت که همه چیز را فرا گرفته",
  "urdu": "اے اللہ! میں تجھ سے تیری اس رحمت کے واسطے مانگتا ہوں جو ہر شے پر محیط ہے"
}
```

IMPORTANT: Include the COMPLETE Dua Kumail — all verses, not abbreviated. This is a real mosque presentation tool. The dua is long (~147 segments). Look up the full text. Cross-reference with duas.org/kumail or similar authoritative sources.

For translations:
- Arabic: Must be accurate and complete
- English: Use a respected translation
- Farsi: Use standard Persian translation
- Urdu: Use standard Urdu translation  
- Transliteration: Standard romanization

If you cannot find/include all 4 translations for every verse, at minimum include Arabic + English for ALL verses, and Farsi/Urdu for as many as possible.

## Design
- **Presentation mode:** Dark background, high contrast, readable from 20+ feet away on a projector
- Arabic: Amiri font, large (2-3rem), right-to-left, cream/white color
- Translations: slightly smaller, labeled with language name
- Mobile: same flow but optimized for phone screens
- Setup page: can be lighter themed (the presenter itself should be dark)
- Islamic geometric subtle border or pattern (very subtle, don't distract from text)

## Files to Create
- package.json
- next.config.js
- tailwind.config.ts  
- tsconfig.json
- app/layout.tsx
- app/page.tsx (home — dua selection)
- app/setup/[dua]/page.tsx (language selection)
- app/present/[dua]/page.tsx (fullscreen presenter)
- data/dua-kumail.json (complete dua text with all translations)
- lib/types.ts (TypeScript types)
- components/SlideView.tsx (individual slide component)
- components/ProgressBar.tsx
- .gitignore
- README.md

After building, commit everything to git, create GitHub repo "dua-presenter" under shanizeeshi (use: gh repo create shanizeeshi/dua-presenter --public --source=. --push), and deploy to Vercel (use: vercel --yes --prod). Give me the final Vercel URL.

When completely finished, run this command to notify me:
openclaw system event --text "Done: Dua Presenter app built and deployed to Vercel" --mode now
