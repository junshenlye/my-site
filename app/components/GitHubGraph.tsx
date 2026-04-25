"use client";

interface GitHubGraphProps {
  weeks?: number;
  label?: string;
  compact?: boolean;
  stretch?: boolean;
  seed?: string;
  paused?: boolean;
  /** Real contribution counts (oldest → newest). When provided, overrides seed-based generation. */
  days?: number[];
  /** Actual total to show in the label. Overrides the auto-counted active cells. */
  total?: number;
}

// ── Seed-based fake data ───────────────────────────────────────────────────────

function makeRng(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  let s = h >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

function generateCells(weeks: number, seed: string): number[] {
  const rng   = makeRng(seed);
  const total = weeks * 7;
  return Array.from({ length: total }, (_, i) => {
    const recency   = i / total;
    const r         = rng();
    const threshold = 0.4 + (1 - recency) * 0.3;
    if (r < threshold) return 0;
    const r2 = rng();
    if (r2 < 0.45) return 1;
    if (r2 < 0.75) return 2;
    if (r2 < 0.92) return 3;
    return 4;
  });
}

// ── Real data normalisation ────────────────────────────────────────────────────

/**
 * Maps raw contribution counts to 0–4 levels using relative scaling
 * (same visual logic GitHub uses — max in the window = level 4).
 */
function countsToLevels(counts: number[]): number[] {
  const max = Math.max(...counts, 1);
  return counts.map((c) => {
    if (c === 0) return 0;
    const ratio = c / max;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.50) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  });
}

// ── Colours ────────────────────────────────────────────────────────────────────

const LEVEL_COLORS = [
  "#E1DDD0",
  "rgba(192,123,10,0.18)",
  "rgba(192,123,10,0.38)",
  "rgba(192,123,10,0.62)",
  "#C07B0A",
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function GitHubGraph({
  weeks = 20,
  label,
  compact  = false,
  stretch  = false,
  seed     = "junshen",
  paused   = false,
  days,
  total,
}: GitHubGraphProps) {
  // Resolve cells: real data takes priority over seed
  const cells: number[] = days && days.length > 0
    ? countsToLevels(days.slice(-(weeks * 7)))   // take the most recent N weeks
    : generateCells(weeks, seed);

  // Label count: use provided total or fall back to active-cell count
  const count = total ?? (days
    ? days.slice(-(weeks * 7)).reduce((a, b) => a + b, 0)
    : cells.filter((l) => l > 0).length);

  // Build columns: weeks × 7 days
  const usedWeeks = Math.ceil(cells.length / 7);
  const columns: number[][] = [];
  for (let w = 0; w < usedWeeks; w++) {
    columns.push(cells.slice(w * 7, w * 7 + 7));
  }

  const gap = 2.5;

  if (stretch) {
    return (
      <div style={{ filter: paused ? "grayscale(1) opacity(0.45)" : "none", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${usedWeeks}, 1fr)`,
          gridTemplateRows:    "repeat(7, 1fr)",
          gap:                 `${gap}px`,
          width:               "100%",
        }}>
          {columns.map((col, wi) =>
            col.map((level, di) => (
              <div
                key={`${wi}-${di}`}
                style={{
                  gridColumn:      wi + 1,
                  gridRow:         di + 1,
                  aspectRatio:     "1",
                  borderRadius:    2,
                  backgroundColor: LEVEL_COLORS[level],
                  minWidth:        0,
                  minHeight:       0,
                }}
              />
            ))
          )}
        </div>
        {label && (
          <p style={{ marginTop: 8, fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.10em" }}>
            {count} {label}
          </p>
        )}
      </div>
    );
  }

  const size = compact ? 9 : 11;

  return (
    <div style={{ filter: paused ? "grayscale(1) opacity(0.45)" : "none", width: "max-content", overflowX: "auto" }}>
      <div style={{ display: "flex", gap: `${gap}px`, alignItems: "flex-start" }}>
        {columns.map((col, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
            {col.map((level, di) => (
              <div
                key={di}
                style={{
                  width:           size,
                  height:          size,
                  borderRadius:    2,
                  backgroundColor: LEVEL_COLORS[level],
                  flexShrink:      0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {label && (
        <p style={{ marginTop: 8, fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.10em" }}>
          {count} {label}
        </p>
      )}
    </div>
  );
}
