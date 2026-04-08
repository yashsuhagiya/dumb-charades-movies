import type { Difficulty } from "@/lib/types";

const LEVEL: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };

/**
 * Difficulty rendered as 1/2/3 marquee bulbs instead of a colored pill.
 * Lit bulbs glow amber; unlit are dim outlines.
 */
export function DifficultyBulbs({ level }: { level: Difficulty }) {
  const lit = LEVEL[level];
  return (
    <div
      className="inline-flex items-center gap-1.5"
      aria-label={`difficulty: ${level}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={
            i < lit
              ? "w-2 h-2 rounded-full bg-marquee shadow-[0_0_8px_2px_rgba(244,201,93,0.6)]"
              : "w-2 h-2 rounded-full border border-marquee-dim/60"
          }
        />
      ))}
      <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-dust">
        {level}
      </span>
    </div>
  );
}
