"use client";

import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";

export default function LeaderboardPage() {
  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary selection:bg-primary-container selection:text-surface-container-lowest antialiased flex flex-col">
      <DashboardHeader />

      <main className="w-full pt-14 pb-28 min-h-screen bg-surface-container-lowest flex-1 flex flex-col">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 flex flex-col gap-6">
          <header className="flex flex-col gap-2 pb-6 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
              <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted tracking-wider font-mono">
                GLOBAL RANKINGS // SEASON 04
              </span>
            </div>
            <h1 className="font-display-hero text-[44px] md:text-display-hero font-bold tracking-tight text-text-primary leading-none">
              Leaderboard
            </h1>
            <p className="font-body-default text-body-default text-text-secondary">
              Realtime global standings, Elo percentiles, and regional league distributions.
            </p>
          </header>

          {/* Tactical Standby Card */}
          <div className="w-full bg-surface-1 border border-border-subtle rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-fixed-dim/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center text-primary-fixed-dim shadow-inner">
              <span className="material-symbols-outlined text-[36px]">leaderboard</span>
            </div>

            <span className="font-system-eyebrow text-[11px] text-text-muted uppercase tracking-widest font-mono">
              // GLOBAL LADDER • TOP 10,000
            </span>

            <h2 className="font-display-hero text-2xl md:text-3xl font-bold text-text-primary max-w-lg">
              Competitive Elo Hierarchy
            </h2>

            <p className="font-body-muted text-sm text-text-secondary max-w-md leading-relaxed">
              Track global grandmasters, monitor division cutoffs, and calibrate your ascent to the Neural Operator tier.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border-subtle font-code-snippet text-xs text-text-muted font-mono mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse"></span>
              <span>CALCULATION ENGINE: DETERMINISTIC ELO // REFRESH: LIVE</span>
            </div>
          </div>
        </div>
      </main>

      <FloatingNav />
    </div>
  );
}
