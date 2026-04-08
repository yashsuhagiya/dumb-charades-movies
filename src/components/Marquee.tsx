/**
 * The hero marquee header: a pill-shaped signboard with animated amber bulbs
 * running around the perimeter. Pure presentational component.
 */
export function Marquee({ count }: { count: number }) {
  // 14 bulbs top + 14 bottom + 3 each side = 34 total
  const topBulbs = Array.from({ length: 14 });
  const bottomBulbs = Array.from({ length: 14 });
  const sideBulbs = Array.from({ length: 3 });

  return (
    <header className="relative mx-auto mt-10 max-w-5xl px-6">
      <div className="relative border-2 border-marquee/70 bg-velvet/80 rounded-[2.5rem] px-8 py-10 sm:px-14 sm:py-14 shadow-[0_30px_80px_-30px_rgba(244,201,93,0.35),inset_0_0_60px_rgba(0,0,0,0.6)]">
        {/* bulbs: top */}
        <div className="pointer-events-none absolute inset-x-8 -top-[5px] flex justify-between">
          {topBulbs.map((_, i) => (
            <span
              key={`t${i}`}
              className="marquee-bulb"
              style={{ animationDelay: `${(i * 120) % 1800}ms` }}
            />
          ))}
        </div>
        {/* bulbs: bottom */}
        <div className="pointer-events-none absolute inset-x-8 -bottom-[5px] flex justify-between">
          {bottomBulbs.map((_, i) => (
            <span
              key={`b${i}`}
              className="marquee-bulb"
              style={{ animationDelay: `${(i * 150 + 300) % 1800}ms` }}
            />
          ))}
        </div>
        {/* bulbs: left */}
        <div className="pointer-events-none absolute inset-y-8 -left-[5px] flex flex-col justify-between">
          {sideBulbs.map((_, i) => (
            <span
              key={`l${i}`}
              className="marquee-bulb"
              style={{ animationDelay: `${(i * 200 + 600) % 1800}ms` }}
            />
          ))}
        </div>
        {/* bulbs: right */}
        <div className="pointer-events-none absolute inset-y-8 -right-[5px] flex flex-col justify-between">
          {sideBulbs.map((_, i) => (
            <span
              key={`r${i}`}
              className="marquee-bulb"
              style={{ animationDelay: `${(i * 200 + 900) % 1800}ms` }}
            />
          ))}
        </div>

        <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-dust uppercase text-center">
          ⸺ Tonight, one act only ⸺
        </p>
        <h1 className="font-display mt-3 text-center text-[2.75rem] sm:text-6xl leading-[0.95] text-marquee">
          The Dumb Charades
          <br />
          <span className="italic text-cream">Marquee</span>
        </h1>
        <p className="mt-6 mx-auto max-w-xl text-center text-sm sm:text-base text-cream/80 font-mono leading-relaxed">
          A hand-curated program of {count} films, arranged for a long evening,
          a small room, and an unreasonable amount of gesturing.
        </p>
      </div>
    </header>
  );
}
