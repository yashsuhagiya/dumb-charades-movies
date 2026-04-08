# Contributing — Adding a Movie

The catalog lives in a single file: [`data/movies.json`](data/movies.json). Every movie the app shows comes from that file. Adding a new one is a small, self-contained PR — usually just a few lines.

## TL;DR

1. Fork the repo and create a branch: `git checkout -b add-movie-<slug>`
2. Append a new entry to `data/movies.json` (see schema below).
3. Run `bun install && bun dev` and verify the movie appears and filters correctly.
4. Run `bun run build` to make sure the JSON still parses and the site builds.
5. Open a PR — title it `Add <Movie Title> (<year>)`.

## The schema

Each entry in `data/movies.json` is a single JSON object:

```jsonc
{
  "id": "unique-slug",
  "title": "Movie Title",
  "language": "hindi",
  "industry": "bollywood",
  "year": 1975,
  "difficulty": "easy",
  "genres": ["drama", "action"],
  "hint": "one-line gestural clue"
}
```

### Field rules

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable, URL-safe slug derived from the title. Lowercase, hyphen-separated (e.g. `jaane-bhi-do-yaaro`). **Must be unique.** |
| `title` | string | The movie's canonical title. Use the commonly-recognized form — diacritics optional. |
| `language` | string | Lowercase. Existing values: `hindi`, `english`. Stick to these unless you're adding a new language cluster. |
| `industry` | string | Lowercase. Existing values: `bollywood`, `hollywood`. Same principle as language. |
| `year` | number | Release year. Four digits, not a string. |
| `difficulty` | `"easy"` \| `"medium"` \| `"hard"` | **Judged for charades, not for IMDb.** See guidance below. |
| `genres` | string[] | 1–3 lowercase tags. Prefer reusing existing values (`drama`, `romance`, `action`, `comedy`, `thriller`, `crime`, `musical`, `family`, `sport`, `fantasy`, `sci-fi`, `animation`, `horror`, `biography`, `history`, `adventure`, `war`, `mystery`). Add new tags sparingly. |
| `hint` | string (optional) | A short, gestural one-liner the actor can mime. Visual, concrete, spoiler-light. |

### Difficulty guidance

Difficulty is **how hard the title is to guess in a room of average players**, not how good or critically acclaimed the film is.

- **easy** — Almost everyone recognizes it. Iconic, widely seen, easily gestured. *Sholay, Titanic, 3 Idiots, Mother India, Mr. India, Maine Pyar Kiya.*
- **medium** — Well-known to Bollywood/Hollywood fans but not universal. Requires some cleverness to mime. *Sangam, Silsila, Forrest Gump, Omkara.*
- **hard** — Classics, parallel cinema, deep cuts, or long titles that are tough to act out. *Jaane Bhi Do Yaaro, Ardh Satya, The Shawshank Redemption, Ek Ruka Hua Faisla.*

Long titles (4+ words) lean harder by default — more words to gesture.

### Writing a good hint

Hints are for the **actor**, not the audience. They should suggest visual/physical anchors.

- ✅ Good: `"alien questions religion"`, `"iceberg"`, `"pigeon carries love letter"`, `"dying patient, joyful"`
- ❌ Bad: `"classic film about...."`, `"won 3 Filmfare awards"`, `"directed by..."`, full plot summaries

One line, under ~60 characters, concrete nouns and verbs.

## Before opening the PR

Run both of these — the build enforces that `movies.json` parses:

```bash
bun run build   # verify JSON parses and site builds
bun dev         # eyeball the new card locally at http://localhost:3000
```

Check that:

- [ ] Your `id` is not already used elsewhere in `movies.json`.
- [ ] The `id` is a slugified form of the title (not some unrelated word).
- [ ] The year is correct — please double-check; catalog accuracy matters.
- [ ] Difficulty feels right for a general room of players, not just cinephiles.
- [ ] Genres use existing values where possible.
- [ ] The hint is visual, one line, and spoiler-light.

## PR conventions

- **Title**: `Add <Movie Title> (<year>)` — e.g. `Add Jaane Bhi Do Yaaro (1983)`
- **Body**: one or two sentences on why the movie is a good charades pick, and a note if you introduced any new genre/language values.
- **Scope**: one movie per PR where possible. Bulk additions (e.g. "add 10 Guru Dutt films") are welcome as a single PR, but keep them thematically coherent and list them in the body.
- **No code changes** in movie-only PRs. If your addition requires code (e.g. a new field on the schema), open a separate issue first to discuss.

## Removing or correcting a movie

Same flow: edit `data/movies.json`, title your PR `Fix <slug>: <what>` or `Remove <slug>: <reason>`, and explain in the body. Be especially careful with `id` changes — they're treated as stable identifiers.

## Questions?

Open an issue before putting effort into anything non-trivial. For small additions, just send the PR.
