import type { Movie, FilterCriteria } from "./types";

/**
 * Apply the user's filter criteria to the full movie list.
 *
 * TODO(user): Implement this. It's 5–10 lines of pure logic, but the
 * *product decision* matters — see guidance below.
 *
 * Contract:
 *   - An empty array in a category ("difficulties" / "genres" / "languages")
 *     must mean "don't filter on this category" (i.e. keep everything).
 *   - `search` is a case-insensitive substring match against `movie.title`.
 *     Empty string means "don't filter on search".
 *   - Function must be pure: do not mutate the input.
 *
 * Design decisions you need to make:
 *   1. GENRES: when the user selects multiple genres (e.g. ["comedy", "drama"]),
 *      should a movie match if it has AT LEAST ONE of them (OR, lenient)
 *      or ONLY if it has ALL of them (AND, strict)?
 *      OR is friendlier for exploration; AND is more precise for picky nights.
 *   2. DIFFICULTIES & LANGUAGES: these are almost always OR (you'd rarely want a
 *      movie that is somehow "easy AND hard"). Leave them as OR.
 *
 * Pick the behavior you want and implement it. The rest of the app already
 * assumes the contract above.
 */
export function applyFilters(
  movies: Movie[],
  criteria: FilterCriteria,
): Movie[] {
  const { difficulties, genres, languages, search } = criteria;
  const q = search.trim().toLowerCase();
  return movies.filter((m) => {
    if (difficulties.length > 0 && !difficulties.includes(m.difficulty)) return false;
    if (languages.length > 0 && !languages.includes(m.language)) return false;
    if (genres.length > 0 && !m.genres.some((g) => genres.includes(g))) return false;
    if (q.length > 0 && !m.title.toLowerCase().includes(q)) return false;
    return true;
  });
}

/**
 * Pick a random movie from the list, avoiding anything in `excludeIds`.
 * Returns null if the resulting pool is empty.
 */
export function pickRandom(
  movies: Movie[],
  excludeIds: ReadonlySet<string> = new Set(),
): Movie | null {
  const pool = movies.filter((m) => !excludeIds.has(m.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Collect all distinct genres/languages present in the catalog, sorted. */
export function collectFacets(movies: Movie[]): {
  genres: string[];
  languages: string[];
} {
  const g = new Set<string>();
  const l = new Set<string>();
  for (const m of movies) {
    m.genres.forEach((x) => g.add(x));
    l.add(m.language);
  }
  return {
    genres: [...g].sort(),
    languages: [...l].sort(),
  };
}
