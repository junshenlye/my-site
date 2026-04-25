"use client";

import { useState, useRef } from "react";

interface GitHubGraphProps {
  weeks?:   number;
  label?:   string;
  compact?: boolean;
  stretch?: boolean;
  seed?:    string;
  paused?:  boolean;
  /** Real contribution counts (oldest → newest). Overrides seed-based generation. */
  days?:    number[];
  /** ISO date strings, same order as days. Used for month labels + cell tooltips. */
  dates?:   string[];
  /** Actual total to show in label. Overrides auto-count. */
  total?:   number;
}

type TooltipState = {
  x: number;
  y: number;
  date: string;
  count: number;
} | null;

// ── Seed-based placeholder ─────────────────────────────────────────────────────

function makeRng(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  let s = h >>> 0;
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
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

// ── Real data → levels ─────────────────────────────────────────────────────────

function countsToLevels(counts: number[]): number[] {
  const sorted = [...counts].filter(c => c > 0).sort((a, b) => a - b);
  const p80    = sorted[Math.floor(sorted.length * 0.8)] ?? 1;
  return counts.map((c) => {
    if (c === 0) return 0;
    const ratio = c / p80;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.50) return 2;
    if (ratio <= 0.80) return 3;
    return 4;
  });
}

// ── Month labels ───────────────────────────────────────────────────────────────

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getMonthLabels(totalWeeks: number, dates?: string[]) {
  const labels: { weekIdx: number; label: string }[] = [];

  if (dates && dates.length > 0) {
    let lastMonth = -1;
    for (let i = 0; i < dates.length; i++) {
      const m = new Date(dates[i]).getMonth();
      if (m !== lastMonth) {
        const weekIdx = Math.floor(i / 7);
        if (weekIdx < totalWeeks) labels.push({ weekIdx, label: MONTH_NAMES[m] });
        lastMonth = m;
      }
    }
    return labels;
  }

  const start = new Date();
  start.setDate(start.getDate() - totalWeeks * 7);
  let lastMonth = -1;
  for (let w = 0; w < totalWeeks; w++) {
    const d = new Date(start);
    d.setDate(d.getDate() + w * 7);
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({ weekIdx: w, label: MONTH_NAMES[m] });
      lastMonth = m;
    }
  }
  return labels;
}

function fmtTooltipDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ── Colours ────────────────────────────────────────────────────────────────────

const LEVEL_COLORS = [
  "var(--s2)",
  "rgba(192,123,10,0.22)",
  "rgba(192,123,10,0.46)",
  "rgba(192,123,10,0.72)",
  "#C07B0A",
];

// ── Tooltip ────────────────────────────────────────────────────────────────────

function CellTooltip({ tooltip }: { tooltip: TooltipState }) {
  if (!tooltip) return null;
  return (
    <div style={{
      position:        "fixed",
      left:            tooltip.x,
      top:             tooltip.y - 10,
      transform:       "translate(-50%, -100%)",
      zIndex:          100,
      pointerEvents:   "none",
    }}>
      <div style={{
        backgroundColor: "var(--t1)",
        borderRadius:    5,
        padding:         "7px 11px",
        boxShadow:       "0 4px 16px rgba(0,0,0,0.18)",
        whiteSpace:      "nowrap",
      }}>
        <p style={{
          fontFamily:    "var(--fm)",
          fontSize:      10,
          color:         "rgba(255,255,255,0.45)",
          marginBottom:  3,
          letterSpacing: "0.04em",
        }}>
          {fmtTooltipDate(tooltip.date)}
        </p>
        <p style={{
          fontFamily:    "var(--fm)",
          fontSize:      12,
          fontWeight:    600,
          letterSpacing: "-0.01em",
        }}>
          <span style={{ color: tooltip.count > 0 ? "#C07B0A" : "rgba(255,255,255,0.3)" }}>
            {tooltip.count}
          </span>
          <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
            {" "}{tooltip.count === 1 ? "contribution" : "contributions"}
          </span>
        </p>
      </div>
      {/* Arrow */}
      <div style={{
        position:    "absolute",
        bottom:      -4,
        left:        "50%",
        transform:   "translateX(-50%)",
        width:       0,
        height:      0,
        borderLeft:  "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop:   "5px solid var(--t1)",
      }} />
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function GitHubGraph({
  weeks   = 20,
  label,
  compact  = false,
  stretch  = false,
  seed     = "junshen",
  paused   = false,
  days,
  dates,
  total,
}: GitHubGraphProps) {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasReal   = days && days.length > 0;
  const rawCounts = hasReal ? days!.slice(-(weeks * 7)) : null;
  const rawDates  = hasReal && dates ? dates.slice(-(weeks * 7)) : undefined;

  const cells: number[] = rawCounts
    ? countsToLevels(rawCounts)
    : generateCells(weeks, seed);

  const count = total ?? (rawCounts
    ? rawCounts.reduce((a, b) => a + b, 0)
    : cells.filter(l => l > 0).length);

  const usedWeeks = Math.ceil(cells.length / 7);

  const columns: { level: number; raw: number; date?: string }[][] = [];
  for (let w = 0; w < usedWeeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d;
      col.push({
        level: cells[idx] ?? 0,
        raw:   rawCounts?.[idx] ?? 0,
        date:  rawDates?.[idx],
      });
    }
    columns.push(col);
  }

  const monthLabels = getMonthLabels(usedWeeks, rawDates);
  const gap         = 2.5;

  function handleEnter(e: React.MouseEvent, cell: { raw: number; date?: string }) {
    if (!cell.date) return;
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      x:     rect.left + rect.width / 2,
      y:     rect.top,
      date:  cell.date,
      count: cell.raw,
    });
  }

  function handleLeave() {
    hideTimeout.current = setTimeout(() => setTooltip(null), 80);
  }

  // ── Stretch ────────────────────────────────────────────────────────────────

  if (stretch) {
    return (
      <div style={{ filter: paused ? "grayscale(1) opacity(0.45)" : "none", width: "100%" }}>
        <CellTooltip tooltip={tooltip} />

        {/* Month labels */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: `repeat(${usedWeeks}, 1fr)`,
          gap:                 `${gap}px`,
          marginBottom:        4,
          width:               "100%",
        }}>
          {Array.from({ length: usedWeeks }, (_, wi) => {
            const ml = monthLabels.find(m => m.weekIdx === wi);
            return (
              <div key={wi} style={{
                gridColumn:    wi + 1,
                fontFamily:    "var(--fm)",
                fontSize:      8,
                color:         ml ? "var(--t4)" : "transparent",
                letterSpacing: "0.06em",
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                userSelect:    "none",
              }}>
                {ml?.label ?? "·"}
              </div>
            );
          })}
        </div>

        {/* Cells */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: `repeat(${usedWeeks}, 1fr)`,
          gridTemplateRows:    "repeat(7, 1fr)",
          gap:                 `${gap}px`,
          width:               "100%",
        }}>
          {columns.map((col, wi) =>
            col.map((cell, di) => (
              <div
                key={`${wi}-${di}`}
                onMouseEnter={(e) => handleEnter(e, cell)}
                onMouseLeave={handleLeave}
                style={{
                  gridColumn:      wi + 1,
                  gridRow:         di + 1,
                  aspectRatio:     "1",
                  borderRadius:    2,
                  backgroundColor: LEVEL_COLORS[cell.level],
                  minWidth:        0,
                  minHeight:       0,
                  cursor:          cell.date ? "crosshair" : "default",
                }}
              />
            ))
          )}
        </div>

        {/* Footer: label + legend */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          {label && (
            <p style={{ fontFamily: "var(--fm)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.10em" }}>
              {count} {label}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginLeft: "auto" }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 8, color: "var(--t4)", marginRight: 2 }}>Less</span>
            {LEVEL_COLORS.map((bg, i) => (
              <div key={i} style={{
                width:           9,
                height:          9,
                borderRadius:    2,
                backgroundColor: bg,
                border:          i === 0 ? "1px solid var(--b1)" : "none",
              }} />
            ))}
            <span style={{ fontFamily: "var(--fm)", fontSize: 8, color: "var(--t4)", marginLeft: 2 }}>More</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Fixed / compact ────────────────────────────────────────────────────────

  const size = compact ? 9 : 11;

  return (
    <div style={{ filter: paused ? "grayscale(1) opacity(0.45)" : "none", width: "max-content", overflowX: "auto" }}>
      <CellTooltip tooltip={tooltip} />
      <div style={{ display: "flex", gap: `${gap}px`, alignItems: "flex-start" }}>
        {columns.map((col, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
            {col.map((cell, di) => (
              <div
                key={di}
                onMouseEnter={(e) => handleEnter(e, cell)}
                onMouseLeave={handleLeave}
                style={{
                  width:           size,
                  height:          size,
                  borderRadius:    2,
                  backgroundColor: LEVEL_COLORS[cell.level],
                  flexShrink:      0,
                  cursor:          cell.date ? "crosshair" : "default",
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
