"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "@/lib/types";
import { pickRandom } from "@/lib/filters";
import { DifficultyBulbs } from "./DifficultyBulbs";

type CurtainState = "closed" | "closing" | "open";

/**
 * The marquee CTA + fullscreen curtain-reveal modal.
 *
 * Avoid-repeats policy is a product decision the user should make.
 * See avoidRepeats() below — it currently remembers the last N picks,
 * but the user can change the policy.
 */
export function RandomPickButton({ pool }: { pool: Movie[] }) {
  const [state, setState] = useState<CurtainState>("closed");
  const [picked, setPicked] = useState<Movie | null>(null);
  const recentRef = useRef<string[]>([]);

  const pick = useCallback(() => {
    const exclude = avoidRepeats(recentRef.current, pool.length);
    const next = pickRandom(pool, exclude);
    if (!next) return;
    recentRef.current = [next.id, ...recentRef.current].slice(0, 10);
    setPicked(next);
    // If the curtain is already open, just swap the movie instantly —
    // don't re-run the curtain animation. Only animate the first open.
    setState((prev) => {
      if (prev === "open") return "open";
      window.setTimeout(() => setState("open"), 750);
      return "closing";
    });
  }, [pool]);

  const close = useCallback(() => {
    // Lower the curtain: panels slide back in to meet at the center
    // (and stage fades out), then the whole modal fades away.
    setState("closing");
    window.setTimeout(() => setState("closed"), 700);
  }, []);

  // Esc to close
  useEffect(() => {
    if (state === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, close]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 mb-12 flex justify-center">
        <button
          onClick={pick}
          disabled={pool.length === 0}
          className="group relative inline-flex items-center gap-4 bg-crimson text-cream px-10 py-5 rounded-full border-2 border-crimson hover:border-marquee transition-colors duration-300 shadow-[0_20px_60px_-20px_rgba(192,50,33,0.8)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="marquee-bulb" />
          <span className="font-display italic text-xl sm:text-2xl">
            Raise the Curtain
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/80 hidden sm:inline">
            ({pool.length} titles)
          </span>
          <span className="marquee-bulb" />
        </button>
      </div>

      {/* ================= Curtain modal ================= */}
      <div
        data-state={state}
        className={
          "curtain-modal fixed inset-0 z-200 " +
          (state === "closed" ? "pointer-events-none" : "pointer-events-auto")
        }
        aria-hidden={state === "closed"}
        role="dialog"
        aria-modal="true"
      >
        {/* dim backdrop */}
        <div
          onClick={close}
          className={
            "absolute inset-0 bg-ink/90 transition-opacity duration-500 " +
            (state === "closed" ? "opacity-0" : "opacity-100")
          }
        />

        {/* two curtain panels — sweep across on open/close */}
        <div className="curtain-panel curtain-left absolute inset-y-0 left-0 w-1/2" />
        <div className="curtain-panel curtain-right absolute inset-y-0 right-0 w-1/2" />

        {/* stage — movie shown immediately once curtain parts */}
        {picked && (
          <div className="curtain-stage absolute inset-0 flex items-center justify-center p-6">
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full text-center"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-marquee mb-6">
                ⸺ Now showing ⸺
              </p>

              <div className="mb-8 inline-block">
                <h2 className="font-display text-5xl sm:text-7xl leading-[0.95] text-cream">
                  {picked.title}
                </h2>
                <div className="mx-auto mt-4 h-0.75 w-24 bg-crimson" />
              </div>

              <div className="flex items-center justify-center gap-6 mb-4">
                <DifficultyBulbs level={picked.difficulty} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
                  {picked.year} · {picked.industry} · {picked.language}
                </span>
              </div>
              {picked.hint && (
                <p className="italic text-sm text-cream/70 font-mono mb-8">
                  &ldquo;{picked.hint}&rdquo;
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <button
                  onClick={pick}
                  className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-3 border border-marquee text-marquee hover:bg-marquee hover:text-ink transition-colors"
                >
                  ↻ another one
                </button>
                <button
                  onClick={close}
                  className="font-mono text-xs uppercase tracking-[0.25em] px-6 py-3 border border-dust/50 text-dust hover:border-cream hover:text-cream transition-colors"
                >
                  lower curtain
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * TODO(user): What should "avoid repeats" actually do?
 *
 * This is a feel-of-the-game decision, not a correctness one. A few options:
 *
 *   (a) Remember the last N picks and exclude them entirely until they fall
 *       off the window. Simple, predictable. (Current default: N=5.)
 *   (b) Never repeat until every movie in the pool has been shown once, then
 *       reset (shuffle-bag). Most "fair" for long sessions.
 *   (c) Soft repeats: allow repeats but heavily down-weight recent picks.
 *       Needs a weighted random instead of pickRandom().
 *   (d) No avoidance — pure random. Fastest, sometimes funny.
 *
 * Pick the vibe you want for a game night. ~5 lines. The `recent` array is
 * most-recent-first, so `recent[0]` is the latest pick. `poolSize` lets you
 * clamp the window so you don't exclude more than exists.
 */
function avoidRepeats(recent: string[], poolSize: number): Set<string> {
  // Current policy: exclude the last min(5, poolSize - 1) picks.
  // Change me, or change the surrounding logic, based on the decision above.
  const windowSize = Math.max(0, Math.min(5, poolSize - 1));
  return new Set(recent.slice(0, windowSize));
}
