"use client";

import type { Difficulty, FilterCriteria } from "@/lib/types";

interface Props {
  criteria: FilterCriteria;
  onChange: (next: FilterCriteria) => void;
  genres: string[];
  languages: string[];
  total: number;
  filtered: number;
  viewToggle?: React.ReactNode;
}

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export function FilterBar({
  criteria,
  onChange,
  genres,
  languages,
  total,
  filtered,
  viewToggle,
}: Props) {
  const toggle = <K extends "difficulties" | "genres" | "languages">(
    key: K,
    value: string,
  ) => {
    const arr = criteria[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((x) => x !== value)
      : [...arr, value];
    onChange({ ...criteria, [key]: next } as FilterCriteria);
  };

  const clearAll = () =>
    onChange({ difficulties: [], genres: [], languages: [], search: "" });

  const hasAny =
    criteria.difficulties.length > 0 ||
    criteria.genres.length > 0 ||
    criteria.languages.length > 0 ||
    criteria.search.length > 0;

  return (
    <section
      className="mx-auto max-w-6xl px-6 mt-14 mb-10"
      aria-label="filters"
    >
      {/* Top line: programme marker + counts + view toggle */}
      <div className="flex items-center justify-between gap-4 border-b border-dust/25 pb-3">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-dust hidden sm:block">
          ★ ★ ★   Programme   ★ ★ ★
        </p>
        <div className="flex items-center gap-4 ml-auto">
          <p className="font-mono text-xs text-cream/80">
            {filtered === total ? (
              <>showing all <span className="text-marquee">{total}</span></>
            ) : (
              <>
                showing <span className="text-marquee">{filtered}</span>
                <span className="text-dust"> / {total}</span>
              </>
            )}
          </p>
          {viewToggle}
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-dust mb-2">
          Search the title
        </label>
        <div className="relative">
          <input
            value={criteria.search}
            onChange={(e) => onChange({ ...criteria, search: e.target.value })}
            placeholder="e.g. sholay, inception, queen…"
            className="w-full bg-velvet/70 border border-dust/30 focus:border-marquee focus:outline-none rounded-full px-5 py-3 font-mono text-sm text-cream placeholder:text-dust/60 transition-colors"
          />
          {criteria.search && (
            <button
              onClick={() => onChange({ ...criteria, search: "" })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dust hover:text-cream text-xs"
              aria-label="clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Difficulty */}
      <FacetRow label="Difficulty">
        {DIFFICULTIES.map((d) => (
          <Chip
            key={d}
            active={criteria.difficulties.includes(d)}
            onClick={() => toggle("difficulties", d)}
          >
            {d}
          </Chip>
        ))}
      </FacetRow>

      {/* Language */}
      <FacetRow label="Language">
        {languages.map((l) => (
          <Chip
            key={l}
            active={criteria.languages.includes(l)}
            onClick={() => toggle("languages", l)}
          >
            {l}
          </Chip>
        ))}
      </FacetRow>

      {/* Genre */}
      <FacetRow label="Genre">
        {genres.map((g) => (
          <Chip
            key={g}
            active={criteria.genres.includes(g)}
            onClick={() => toggle("genres", g)}
          >
            {g}
          </Chip>
        ))}
      </FacetRow>

      {hasAny && (
        <div className="mt-6">
          <button
            onClick={clearAll}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-crimson hover:text-marquee transition-colors"
          >
            ⌫ clear the programme
          </button>
        </div>
      )}
    </section>
  );
}

function FacetRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-dust mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all " +
        (active
          ? "bg-marquee text-ink border-marquee shadow-[0_0_18px_rgba(244,201,93,0.35)]"
          : "border-dust/40 text-cream/80 hover:border-marquee/70 hover:text-marquee")
      }
    >
      {children}
    </button>
  );
}
