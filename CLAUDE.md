# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `dist/`
- `npm run lint` — ESLint (flat config, ESLint 9+)
- `npm run preview` — Preview production build

## Architecture

Single-page React 19 app (Vite, JSX, no TypeScript) that visualizes how Japanese kana were derived from kanji.

Everything lives in `src/App.jsx` — data, components, and styles in one file:

- **Data constants** (`KANA_DATA`, `DAKUTEN_DATA`, `NOTES`) — static lookup tables keyed by `"consonant-vowel"` (e.g. `"k-a"`, `"∅-i"`, `"n̄-a"`). `KANA_DATA` values are 5-element arrays: `[hiragana, katakana, source_kanji_h, source_kanji_k, romaji]`. `null` means the combination doesn't exist.
- **Components**: `KanaDerivationChart` (main/exported), `KanaCell` (interactive grid cell), `DakutenCell` (simpler variant cell)
- **Styles**: `styles` object at bottom of file, all inline CSS via style props

## Conventions

- Functional components with hooks only (`useState`)
- All styling is inline via a `styles` object — no CSS modules, no CSS-in-JS library
- Google Fonts "Noto Serif JP" loaded in `index.html`
- Color scheme: hiragana `#c25a3c` (red-brown), katakana `#2a6496` (blue), shared kanji `#8b6914` (gold)
- ESLint rule: `no-unused-vars` ignores identifiers starting with uppercase or underscore
