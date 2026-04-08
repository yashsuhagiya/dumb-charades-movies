"use client";

import { useEffect } from "react";

/**
 * A soft amber glow that tracks the cursor on desktop. Disabled on touch
 * devices via the CSS `@media (hover: hover)` rule in globals.css.
 */
export function Spotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = document.documentElement;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="spotlight" aria-hidden />;
}
