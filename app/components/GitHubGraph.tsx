"use client";

interface GitHubGraphProps {
  weeks?: number;
  label?: string;
  compact?: boolean;
  stretch?: boolean;
  seed?: string;
  paused?: boolean;
}

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

const LEVEL_COLORS = [
  "#E1DDD0",
  "rgba(192,123,10,0.18)",
  "rgba(192,123,10,0.38)",
  "rgba(192,123,10,0.62)",
  "#C07B0A",
];

function generateCells(weeks: number, seed: string): number[] {
  const rng = makeRng(seed);
  const total = weeks * 7;
  return Array.from({ length: total }, (_, i) => {
    const recency = i / total;
    const r = rng();
    const threshold = 0.4 + (1 - recency) * 0.3;
    if (r < threshold) return 0;
    const r2 = rng();
    if (r2 < 0.45) return 1;
    if (r2 < 0.75) return 2;
    if (r2 < 0.92) return 3;
    return 4;
  });
}

export default function GitHubGraph({
  weeks = 20,
  label,
  compact = false,
  stretch = false,
  seed = "junshen",
  paused = false,
}: GitHubGraphProps) {
  const cells = generateCells(weeks, seed);
  const count = cells.filter(l => l > 0).length;

  // Build columns: weeks × 7 days
  const columns: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    columns.push(cells.slice(w * 7, w * 7 + 7));
  }

  const gap = 2.5;

  if (stretch) {
    // Fluid grid — fills container, cells maintain square via aspect-ratio
    return (
      <div style={{ filter: paused ? "grayscale(1) opacity(0.45)" : "none", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${weeks}, 1fr)`,
          gridTemplateRows: `repeat(7, 1fr)`,
          gap: `${gap}px`,
          width: "100%",
        }}>
          {/* Render column-by-column so grid fills left→right, each column top→bottom */}
          {columns.map((col, wi) =>
            col.map((level, di) => (
              <div
                key={`${wi}-${di}`}
                style={{
                  gridColumn: wi + 1,
                  gridRow: di + 1,
                  aspectRatio: "1",
                  borderRadius: 2,
                  backgroundColor: LEVEL_COLORS[level],
                  minWidth: 0,
                  minHeight: 0,
                }}
              />
            ))
          )}
        </div>
        {label && (
          <p style={{
            marginTop: 8,
            fontFamily: "var(--fm)",
            fontSize: 9,
            color: "var(--t4)",
            letterSpacing: "0.10em",
          }}>
            {count} {label}
          </p>
        )}
      </div>
    );
  }

  // Fixed-width — compact controls cell px size
  const size = compact ? 9 : 11;

  return (
    <div style={{
      filter: paused ? "grayscale(1) opacity(0.45)" : "none",
      width: "max-content",
      overflowX: "auto",
    }}>
      <div style={{
        display: "flex",
        gap: `${gap}px`,
        alignItems: "flex-start",
      }}>
        {columns.map((col, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
            {col.map((level, di) => (
              <div
                key={di}
                style={{
                  width: size,
                  height: size,
                  borderRadius: 2,
                  backgroundColor: LEVEL_COLORS[level],
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {label && (
        <p style={{
          marginTop: 8,
          fontFamily: "var(--fm)",
          fontSize: 9,
          color: "var(--t4)",
          letterSpacing: "0.10em",
        }}>
          {count} {label}
        </p>
      )}
    </div>
  );
}
