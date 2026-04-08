"use client";

import { useMemo, useState } from "react";
import type { Movie, FilterCriteria } from "@/lib/types";
import { EMPTY_CRITERIA } from "@/lib/types";
import { applyFilters, collectFacets } from "@/lib/filters";
import { useViewMode } from "@/lib/useViewMode";
import { Marquee } from "./Marquee";
import { FilterBar } from "./FilterBar";
import { MovieCard } from "./MovieCard";
import { MovieList } from "./MovieList";
import { RandomPickButton } from "./RandomPickButton";
import { ViewToggle } from "./ViewToggle";

export function MovieBrowser({ movies }: { movies: Movie[] }) {
  const [criteria, setCriteria] = useState<FilterCriteria>(EMPTY_CRITERIA);
  const [view, setView] = useViewMode();

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
        viewToggle={<ViewToggle value={view} onChange={setView} />}
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
      ) : view === "list" ? (
        <MovieList movies={filtered} />
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
        <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-dust">
          Curated by{" "}
          <span className="text-cream">Yash Suhagiya</span>
        </p>
        <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <a
            href="mailto:yash@patentassist.ai"
            className="text-dust hover:text-marquee transition-colors"
          >
            Email
          </a>
          <span className="text-dust/40">·</span>
          <a
            href="https://github.com/yashsuhagiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dust hover:text-marquee transition-colors"
          >
            GitHub
          </a>
          <span className="text-dust/40">·</span>
          <a
            href="https://www.linkedin.com/in/yashsuhagiya/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dust hover:text-marquee transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </footer>
    </main>
  );
}
