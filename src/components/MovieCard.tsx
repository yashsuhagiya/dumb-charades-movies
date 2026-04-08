import type { Movie } from "@/lib/types";
import { DifficultyBulbs } from "./DifficultyBulbs";

/**
 * A movie rendered as a ticket-stub card. Title is always visible.
 */
export function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  // Stable pseudo-random tilt from the id so the page feels like a
  // scrapbook, not a grid. Deterministic, so SSR/CSR match.
  const tilt = ((hash(movie.id) % 5) - 2) * 0.35; // -0.7deg … +0.7deg

  return (
    <article
      className="card-enter relative w-full h-full p-6 bg-velvet/80 border border-dust/20 rounded-sm shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] hover:border-marquee/60 hover:shadow-[0_10px_50px_-20px_rgba(244,201,93,0.4)] transition-[border-color,box-shadow] duration-300"
      style={
        {
          ["--i" as string]: index,
          ["--tilt" as string]: `${tilt}deg`,
          transform: `rotate(${tilt}deg)`,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between">
        <DifficultyBulbs level={movie.difficulty} />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
          {movie.year}
        </span>
      </div>

      <div className="mt-6 mb-4">
        <h3 className="font-display text-2xl sm:text-[1.75rem] leading-[1.05] text-cream">
          {movie.title}
        </h3>
        <div className="mt-2 h-0.5 w-16 bg-crimson" />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
        <span>{movie.industry}</span>
        <span>·</span>
        <span>{movie.language}</span>
        {movie.genres.slice(0, 2).map((g) => (
          <span key={g}>· {g}</span>
        ))}
      </div>

      {movie.hint && (
        <p className="mt-4 italic text-xs text-dust/90 font-mono">
          &ldquo;{movie.hint}&rdquo;
        </p>
      )}
    </article>
  );
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
