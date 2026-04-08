"use client";

import { useMemo, useState } from "react";
import type { Movie, FilterCriteria } from "@/lib/types";
import { EMPTY_CRITERIA } from "@/lib/types";
import { applyFilters, collectFacets } from "@/lib/filters";
import { Marquee } from "./Marquee";
import { FilterBar } from "./FilterBar";
import { MovieCard } from "./MovieCard";
import { RandomPickButton } from "./RandomPickButton";

export function MovieBrowser({ movies }: { movies: Movie[] }) {
  const [criteria, setCriteria] = useState<FilterCriteria>(EMPTY_CRITERIA);

  const { genres, languages } = useMemo(() => collectFacets(movies), [movies]);

  const filtered = useMemo(
    () => applyFilters(movies, criteria),
    [movies, criteria],
  );

  return (
    <main className="flex-1">
      <Marquee count={movies.length} />

      <FilterBar
        criteria={criteria}
        onChange={setCriteria}
        genres={genres}
        languages={languages}
        total={movies.length}
        filtered={filtered.length}
      />

      <RandomPickButton pool={filtered} />

      {filtered.length === 0 ? (
        <div className="mx-auto max-w-xl px-6 pb-24 text-center">
          <p className="font-display italic text-3xl text-crimson">
            The stage is empty.
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-dust">
            Try loosening the programme.
          </p>
        </div>
      ) : (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((m, i) => (
              <MovieCard key={m.id} movie={m} index={i} />
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-dust/20 mt-12 py-10">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-dust">
          ⸺ Exit through the lobby ⸺
        </p>
      </footer>
    </main>
  );
}
