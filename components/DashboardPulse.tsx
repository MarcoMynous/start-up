"use client";

import React from "react";

export default function DashboardPulse() {
  return (
    <section
      aria-label="Competitive Pulse"
      className="w-full bg-surface-1 border border-border-subtle rounded-lg grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle overflow-hidden shadow-xl"
    >
      {/* 1. Current Streak */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          CURRENT STREAK
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-status-success">
            3 WINS
          </span>
          <span className="material-symbols-outlined text-status-success text-sm">
            trending_up
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          Active win cascade
        </span>
      </div>

      {/* 2. Win Rate */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          WIN RATE
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-text-primary">
            68.4%
          </span>
          <span className="font-code-snippet text-[11px] text-text-secondary">
            (142W / 66L)
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          +2.1% past 20 matches
        </span>
      </div>

      {/* 3. Ranked Matches */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          RANKED MATCHES
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-text-primary">
            208
          </span>
          <span className="font-code-snippet text-[11px] text-text-muted">
            TOTAL
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          Season 04 Active
        </span>
      </div>

      {/* 4. Avg Solve Time */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          AVG SOLVE TIME
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-secondary">
            08:42
          </span>
          <span className="font-code-snippet text-[11px] text-text-muted">
            MM:SS
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          Top 12% speed bracket
        </span>
      </div>

      {/* 5. Season Rating Change */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          SEASON RATING CHANGE
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-status-success">
            +184
          </span>
          <span className="font-code-snippet text-[11px] text-text-muted">
            ELO
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          From 1,064 baseline
        </span>
      </div>

      {/* 6. Best Streak */}
      <div className="p-4 flex flex-col gap-1">
        <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
          BEST STREAK
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono-metric-sm text-mono-metric-sm font-bold text-primary-fixed-dim">
            7 WINS
          </span>
          <span className="material-symbols-outlined text-primary-fixed-dim text-sm">
            stars
          </span>
        </div>
        <span className="font-body-muted text-[11px] text-text-muted">
          Recorded on Nov 02
        </span>
      </div>
    </section>
  );
}
