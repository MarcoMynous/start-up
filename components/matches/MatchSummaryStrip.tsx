"use client";

import React from "react";
import { MatchesSummaryTelemetry } from "@/types/matches";

interface MatchSummaryStripProps {
  summary: MatchesSummaryTelemetry;
}

export default function MatchSummaryStrip({ summary }: MatchSummaryStripProps) {
  const winPercent = summary.winRate;
  const lossPercent = (100 - winPercent).toFixed(1);

  return (
    <section className="w-full bg-surface-1 rounded border border-border-subtle overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-border-subtle">
        {/* Cell 1: Current Elo */}
        <div className="p-4 flex flex-col justify-between gap-1 group hover:bg-surface-2/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              CURRENT ELO
            </span>
            <span className="material-symbols-outlined text-base text-primary-container">
              military_tech
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric-lg text-mono-metric-lg text-white font-bold tracking-tight">
              {summary.currentElo.toLocaleString()}
            </span>
            <span className="font-code-snippet text-code-snippet text-status-success flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_drop_up</span>
              +{summary.eloDelta}
            </span>
          </div>
          <span className="font-system-eyebrow text-[11px] text-text-secondary uppercase tracking-wider">
            {summary.rankTitle} // {summary.tier}
          </span>
        </div>

        {/* Cell 2: Ranked Record */}
        <div className="p-4 flex flex-col justify-between gap-1 group hover:bg-surface-2/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              RANKED RECORD
            </span>
            <span className="font-code-snippet text-code-snippet text-text-secondary">
              {summary.totalMatches} TOTAL
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric-lg text-mono-metric-lg text-white font-bold">
              {summary.rankedWins}–{summary.rankedLosses}
            </span>
            <span className="font-code-snippet text-code-snippet text-text-muted">
              {summary.winRate}% WR
            </span>
          </div>
          <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden flex mt-1">
            <div className="bg-status-success h-full transition-all duration-500" style={{ width: `${winPercent}%` }}></div>
            <div className="bg-status-failure h-full transition-all duration-500" style={{ width: `${lossPercent}%` }}></div>
          </div>
        </div>

        {/* Cell 3: Win Rate Trend */}
        <div className="p-4 flex flex-col justify-between gap-1 group hover:bg-surface-2/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              WIN RATE
            </span>
            <span className="font-code-snippet text-code-snippet text-status-success font-semibold">
              FORM: {summary.recentForm}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric-lg text-mono-metric-lg text-white font-bold">
              {summary.winRate}%
            </span>
            <span className="font-code-snippet text-code-snippet text-status-success flex items-center">
              <span className="material-symbols-outlined text-xs">arrow_upward</span>
              +{summary.winRateDelta}%
            </span>
          </div>
          <span className="font-system-eyebrow text-[11px] text-text-muted uppercase">
            LAST 20 RANKED SESSIONS
          </span>
        </div>

        {/* Cell 4: Season Delta */}
        <div className="p-4 flex flex-col justify-between gap-1 group hover:bg-surface-2/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              THIS SEASON
            </span>
            <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase">
              {summary.season}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric-lg text-mono-metric-lg text-status-success font-bold">
              +{summary.seasonDelta} ELO
            </span>
          </div>
          <span className="font-system-eyebrow text-[11px] text-text-secondary uppercase">
            PEAK RATING:{" "}
            <span className="text-white font-code-snippet">
              {summary.peakElo.toLocaleString()}
            </span>
          </span>
        </div>

        {/* Cell 5: Avg Solve Duration */}
        <div className="p-4 flex flex-col justify-between gap-1 group hover:bg-surface-2/40 transition-colors col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              AVG SOLVE
            </span>
            <span className="material-symbols-outlined text-base text-text-muted">
              timer
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-metric-lg text-mono-metric-lg text-white font-bold">
              {summary.avgSolveDuration}
            </span>
            <span className="font-code-snippet text-code-snippet text-text-secondary">
              P50
            </span>
          </div>
          <span className="font-system-eyebrow text-[11px] text-primary-fixed-dim uppercase tracking-wider">
            {summary.speedPercentile}
          </span>
        </div>
      </div>
    </section>
  );
}
