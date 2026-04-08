"use client";

import { useCallback, useEffect, useState } from "react";

export type ViewMode = "grid" | "list";

const STORAGE_KEY = "dcm:view";
const PARAM_KEY = "view";

/**
 * View mode ("grid" | "list") with URL param + localStorage persistence.
 *
 * Priority on first read (client only):
 *   1. ?view=grid|list in the URL (share-link wins)
 *   2. localStorage value
 *   3. "grid" default
 *
 * On change, both the URL (via history.replaceState, no reload) and
 * localStorage are updated. Defaults to "grid" during SSR to keep the
 * server-rendered markup stable.
 */
export function useViewMode(): [ViewMode, (v: ViewMode) => void] {
  const [view, setView] = useState<ViewMode>("grid");

  // Read from URL / localStorage after mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const param = url.searchParams.get(PARAM_KEY);
    if (param === "grid" || param === "list") {
      setView(param);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "grid" || stored === "list") setView(stored);
  }, []);

  const set = useCallback((v: ViewMode) => {
    setView(v);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore quota / privacy-mode failures
    }
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM_KEY, v);
    window.history.replaceState({}, "", url.toString());
  }, []);

  return [view, set];
}
