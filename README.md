# 五十音 — Kana Derivation Chart

An interactive visualization of how the two Japanese phonetic alphabets —
**hiragana** and **katakana** — were each derived from kanji.

**Live:** https://kana.gfrm.in

All 46 basic syllables are laid out in the traditional gojūon grid (consonant ×
vowel) and colour-coded by writing system. Click any cell to expand its
derivation: the cursive simplification that produced the **hiragana** form and
the component extraction that produced the **katakana** form, both traced back
to their shared source kanji. A second tab covers the voiced and semi-voiced
(**dakuten / handakuten**) variants, and contextual notes flag archaic kana,
affricate pronunciations, and duplicate readings.

Colour key: hiragana `#c25a3c` (rust), katakana `#2a6496` (blue), shared source
kanji `#8b6914` (gold).

## Tech stack

React 19 + Vite 7, single-page app, no TypeScript. The chart data, components,
and styles all live in `src/App.jsx`.

## Development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run lint     # ESLint
npm run preview  # preview the production build
```

## Deployment

Hosted on Cloudflare Pages. Every push to `master` triggers the GitHub Actions
workflow (`.github/workflows/deploy.yml`), which builds the site and deploys
`dist/` to the `kana` Pages project at https://kana.gfrm.in.
