"use client";

import { useMemo, useState } from "react";
import type { Movie, Difficulty } from "@/lib/types";
import { DifficultyBulbs } from "./DifficultyBulbs";

type SortKey = "title" | "difficulty" | "year";
type SortDir = "asc" | "desc";

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export function MovieList({ movies }: { movies: Movie[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    const copy = [...movies];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "year") cmp = a.year - b.year;
      else cmp = DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty];
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [movies, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "year" ? "desc" : "asc");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="border border-dust/20 bg-velvet/60">
        {/* header row */}
        <div
          className="grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 px-4 sm:px-6 py-3 border-b border-dust/20 font-mono text-[10px] uppercase tracking-[0.25em] text-dust"
          role="row"
        >
          <SortHeader
            label="Title"
            active={sortKey === "title"}
            dir={sortDir}
            onClick={() => toggleSort("title")}
          />
          <SortHeader
            label="Diff."
            active={sortKey === "difficulty"}
            dir={sortDir}
            onClick={() => toggleSort("difficulty")}
            className="w-16 sm:w-32 text-left"
          />
          <SortHeader
            label="Year"
            active={sortKey === "year"}
            dir={sortDir}
            onClick={() => toggleSort("year")}
            className="w-12 sm:w-14 text-right"
          />
        </div>

        {/* rows */}
        <ul role="rowgroup">
          {sorted.map((m, i) => (
            <li
              key={m.id}
              className={
                "grid grid-cols-[1fr_auto_auto] gap-4 sm:gap-8 px-4 sm:px-6 py-3 items-center hover:bg-velvet-2/70 transition-colors " +
                (i !== sorted.length - 1 ? "border-b border-dust/10" : "")
              }
              role="row"
            >
              <div className="min-w-0">
                <p className="font-display text-base sm:text-xl text-cream leading-tight wrap-break-word">
                  {m.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cream/60 wrap-break-word">
                  <span>{m.industry} · {m.language}</span>
                  {m.hint && (
                    <span className="hidden sm:inline"> · {m.hint}</span>
                  )}
                </p>
              </div>
              <div className="w-16 sm:w-32 shrink-0">
                <DifficultyBulbs level={m.difficulty} hideLabelOnMobile />
              </div>
              <div className="w-12 sm:w-14 shrink-0 text-right font-mono text-xs text-cream/80">
                {m.year}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  className = "",
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "text-left hover:text-marquee transition-colors " +
        (active ? "text-marquee" : "") +
        " " +
        className
      }
    >
      {label}
      {active && (
        <span className="ml-1">{dir === "asc" ? "↑" : "↓"}</span>
      )}
    </button>
  );
}
