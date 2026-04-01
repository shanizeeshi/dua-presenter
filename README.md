# Dua Presenter

A Next.js presentation app for congregational dua recitations, starting with the complete Dua Kumail text parsed from `raw-kumail.html`.

## Features

- Home page with dua catalog
- Setup page with language selection and live preview
- Full-screen presenter with keyboard, click, and swipe navigation
- Arabic, transliteration, English, Farsi, and Urdu layers
- Fallback copy for languages that do not have data yet

## Development

```bash
npm install
npm run parse:kumail
npm run dev
```

## Build

```bash
npm run build
```
