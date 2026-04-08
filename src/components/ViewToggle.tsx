"use client";

import type { ViewMode } from "@/lib/useViewMode";

export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="view mode"
      className="inline-flex border border-dust/30 rounded-full overflow-hidden"
    >
      <ToggleButton
        active={value === "grid"}
        onClick={() => onChange("grid")}
        label="Grid"
      >
        <GridIcon />
      </ToggleButton>
      <ToggleButton
        active={value === "list"}
        onClick={() => onChange("list")}
        label="List"
      >
        <ListIcon />
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={
        "flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors " +
        (active
          ? "bg-marquee text-ink"
          : "text-dust hover:text-marquee")
      }
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function GridIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <rect x="1" y="1" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="1" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="7" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="7" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <line x1="1" y1="2" x2="11" y2="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
