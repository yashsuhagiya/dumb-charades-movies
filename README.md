# 🎬 The Dumb Charades Marquee

A hand-curated list of movies for dumb charades nights — heavy on pre-1990 Bollywood, with a sprinkling of Hollywood classics. Filter by difficulty, language, or genre; search by title; or raise the curtain and let a random pick decide.

Live: [https://dumb-charades-movies.vercel.app/](https://dumb-charades-movies.vercel.app/)

## What's inside

- **~250 movies** in [`data/movies.json`](data/movies.json) — each with difficulty (easy/medium/hard), language, industry, genres, year, and a short gestural hint for the actor.
- **Fully static** Next.js 16 app. No backend, no database, no API keys. The JSON is bundled at build time and filtering runs in-memory in the browser.
- **Curtain-reveal random picker** — two panels sweep in and part to reveal the chosen movie. Clicking "another one" while the curtain is already up swaps instantly without re-running the animation.
- **Midnight Cinema** design direction: warm amber marquee bulbs, film grain, Fraunces + DM Mono typography, cursor-following spotlight.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, SSG, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-based `@theme` config)
- TypeScript
- Zero runtime dependencies beyond `next` / `react` — no UI kit, no animation library. All motion is pure CSS.
- [Bun](https://bun.sh) as package manager

## Running locally

```bash
bun install
bun dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build

```bash
bun run build
```

Produces a fully static output (`○ prerendered`) — deployable to Vercel, Netlify, GitHub Pages, or any static host.

## Project structure

```
dumb-charades-movies/
├── data/
│   └── movies.json              # the catalog — edit this to add/remove titles
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, spotlight, metadata
│   │   ├── page.tsx             # imports movies.json at build time
│   │   ├── globals.css          # palette, animations, grain overlay
│   │   └── icon.svg             # 🎬 favicon
│   ├── components/
│   │   ├── MovieBrowser.tsx     # state owner: filters + picker + grid
│   │   ├── Marquee.tsx          # pill header with animated bulbs
│   │   ├── FilterBar.tsx        # search + difficulty/language/genre chips
│   │   ├── MovieCard.tsx        # individual ticket-stub card
│   │   ├── RandomPickButton.tsx # CTA + curtain-reveal modal
│   │   ├── DifficultyBulbs.tsx  # 1/2/3 marquee bulbs
│   │   └── Spotlight.tsx        # cursor-following glow
│   └── lib/
│       ├── types.ts             # Movie, FilterCriteria
│       └── filters.ts           # applyFilters, pickRandom, collectFacets
```

## Adding movies

Append to [`data/movies.json`](data/movies.json):

```jsonc
{
  "id": "unique-slug",
  "title": "Movie Title",
  "language": "hindi",
  "industry": "bollywood",
  "year": 1975,
  "difficulty": "easy",
  "genres": ["drama", "action"],
  "hint": "one-line gestural clue for the actor"
}
```

Difficulty is a charades-context judgement (how hard is it to *guess*), not the movie's IMDb rating. Hints should be short and visual — actions and objects the actor can mime.

## Design notes

The filter contract is in [`src/lib/filters.ts`](src/lib/filters.ts):

- **Difficulty / language**: OR within a category, AND across (clicking "hindi" + "english" shows both; adding "hard" narrows to hard titles in those languages).
- **Genres**: OR — picking "comedy" + "drama" shows any movie tagged with either. Chosen for chip-pick ergonomics; if you'd rather require *all* selected genres, swap `.some` for `.every` in `applyFilters`.
- **Search**: case-insensitive substring match on title, independent of the chip filters.

Random picker avoids immediate repeats via a rolling window of the last 5 picks (see `avoidRepeats` in [`RandomPickButton.tsx`](src/components/RandomPickButton.tsx)).
