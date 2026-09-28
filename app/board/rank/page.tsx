"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";
import { RANK_PROFILE_DATA } from "@/lib/rank-data";

export default function RankPage() {
  const [data] = useState(RANK_PROFILE_DATA);
  const [queueState, setQueueState] = useState<"idle" | "joining">("idle");

  const handleEnterQueue = () => {
    setQueueState("joining");
    setTimeout(() => {
      setQueueState("idle");
    }, 2500);
  };

  return (
    <div className="bg-surface-container-lowest text-text-primary font-body-default min-h-screen selection:bg-primary-container selection:text-surface-container-lowest relative">
      {/* Top Global Command Header */}
      <DashboardHeader />

      <main className="w-full pt-14 pb-28 min-h-screen bg-surface-container-lowest">
        <div className="flex flex-col w-full">
          <div className="w-[94%] max-w-[1720px] mx-auto py-space-lg flex flex-col gap-space-lg">
            {/* PAGE HEADER & SEASON TELEMETRY METRIC STRIP */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="space-y-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                  <span className="font-system-eyebrow text-system-eyebrow uppercase tracking-widest text-text-muted">
                    RANK // COMPETITIVE PROGRESSION
                  </span>
                </div>
                <h1 className="font-display-hero text-display-hero text-text-primary tracking-tight font-bold">
                  Rank
                </h1>
                <p className="font-body-default text-body-default text-text-secondary">
                  Every ranked clash moves your seasonal progression. Real-time deterministic
                  rating feed.
                </p>
              </div>

              {/* Telemetry Strip (Surface 1 with 1px mechanical styling) */}
              <div className="flex items-stretch bg-surface-1 rounded-lg border border-border-subtle overflow-hidden divide-x divide-border-subtle shadow-md">
                <div className="px-space-md py-space-sm flex flex-col justify-center min-w-[120px]">
                  <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                    CYCLE
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      SEASON 04
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-2 text-[10px] font-mono-metric-sm font-semibold text-primary-fixed-dim border border-border-subtle">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="px-space-md py-space-sm flex flex-col justify-center min-w-[130px]">
                  <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                    TIME TO RESET
                  </span>
                  <div className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold mt-0.5">
                    18<span className="text-text-muted text-xs font-normal">D</span> 06
                    <span className="text-text-muted text-xs font-normal">H</span>
                  </div>
                </div>
                <div className="px-space-md py-space-sm flex flex-col justify-center min-w-[140px]">
                  <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                    RANKED MATCHES
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      147
                    </span>
                    <span className="font-system-eyebrow text-system-eyebrow text-status-success font-semibold">
                      ↑ 64% WR
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* CURRENT RANK HERO (Asymmetric Dominant Chassis) */}
            <section className="bg-surface-1 rounded-xl border border-border-subtle p-space-lg lg:p-space-xl relative overflow-hidden shadow-xl">
              {/* Razor structural accent: top active edge marker */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-fixed-dim/80 via-secondary/40 to-transparent"></div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl items-start">
                {/* Left: Geometric Insignia + Vital Metrics (5 cols) */}
                <div className="xl:col-span-5 flex flex-col sm:flex-row xl:flex-col gap-space-lg">
                  <div className="flex items-start gap-space-lg">
                    {/* Surgical Cybernetic Emblem: Overlord II Vector Construction */}
                    <div className="relative w-28 h-28 shrink-0 bg-surface-2 rounded-lg border border-border-subtle flex items-center justify-center p-3 shadow-inner">
                      <svg
                        className="w-full h-full text-primary-fixed-dim"
                        fill="none"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Precision Octagonal Perimeter */}
                        <polygon
                          fill="#12161A"
                          points="50,6 88,24 88,76 50,94 12,76 12,24"
                          stroke="currentColor"
                          strokeOpacity="0.85"
                          strokeWidth="1.75"
                        ></polygon>
                        <polygon
                          points="50,14 80,29 80,71 50,86 20,71 20,29"
                          stroke="#5de6ff"
                          strokeOpacity="0.35"
                          strokeWidth="1"
                        ></polygon>
                        {/* Angular Core Lattice */}
                        <path
                          d="M50 22 L72 50 L50 78 L28 50 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        ></path>
                        <circle cx="50" cy="50" fill="currentColor" r="6"></circle>
                        {/* Subdivision II Chevron Bars */}
                        <path
                          d="M38 42 L50 30 L62 42"
                          stroke="#5de6ff"
                          strokeLinecap="square"
                          strokeWidth="2.5"
                        ></path>
                        <path
                          d="M38 52 L50 40 L62 52"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeWidth="2.5"
                        ></path>
                        {/* Reticle Grid Marks */}
                        <line stroke="currentColor" strokeWidth="1.5" x1="50" x2="50" y1="4" y2="10"></line>
                        <line stroke="currentColor" strokeWidth="1.5" x1="50" x2="50" y1="90" y2="96"></line>
                        <line stroke="currentColor" strokeWidth="1.5" x1="10" x2="16" y1="50" y2="50"></line>
                        <line stroke="currentColor" strokeWidth="1.5" x1="84" x2="90" y1="50" y2="50"></line>
                      </svg>
                      <span className="absolute -bottom-2 px-2 py-0.5 bg-surface-3 border border-border-subtle rounded text-[10px] font-system-eyebrow text-text-primary uppercase tracking-widest">
                        {data.tierRoman}
                      </span>
                    </div>

                    {/* Identity Core */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary-fixed-dim/10 border border-primary-fixed-dim/40 rounded text-[11px] font-system-eyebrow text-primary-fixed-dim font-bold tracking-wider uppercase">
                          CURRENT RANK
                        </span>
                        <span className="text-text-muted font-code-snippet text-xs">
                          TIER ID: {data.tierId}
                        </span>
                      </div>
                      <h2 className="font-display-hero text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
                        {data.tierName}
                      </h2>
                      <p className="font-code-snippet text-code-snippet text-text-muted">
                        {data.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Quantitative Primary Readouts */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-space-sm pt-2">
                    <div className="bg-surface-2 p-space-sm rounded border border-border-subtle">
                      <div className="font-system-eyebrow text-[11px] text-text-muted uppercase">
                        COMPETITIVE ELO
                      </div>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary mt-1 font-bold">
                        {data.competitiveElo.toLocaleString()}
                      </div>
                      <div className="font-system-eyebrow text-[11px] text-status-success mt-0.5">
                        Top {data.topSegmentPercent}% Segment
                      </div>
                    </div>
                    <div className="bg-surface-2 p-space-sm rounded border border-border-subtle">
                      <div className="font-system-eyebrow text-[11px] text-text-muted uppercase">
                        SEASON PEAK
                      </div>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary mt-1 font-bold">
                        {data.seasonPeakRank}
                      </div>
                      <div className="font-system-eyebrow text-[11px] text-text-muted mt-0.5">
                        {data.seasonPeakDate}
                      </div>
                    </div>
                    <div className="bg-surface-2 p-space-sm rounded border border-border-subtle col-span-2 sm:col-span-1 xl:col-span-1">
                      <div className="font-system-eyebrow text-[11px] text-text-muted uppercase">
                        GLOBAL RANK
                      </div>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-primary-fixed-dim mt-1 font-bold">
                        #{data.globalRank.toLocaleString()}
                      </div>
                      <div className="font-system-eyebrow text-[11px] text-text-secondary mt-0.5">
                        {data.cluster}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Telemetric Progress Engine + Clarification Matrix (7 cols) */}
                <div className="xl:col-span-7 space-y-space-lg flex flex-col justify-between h-full">
                  <div className="space-y-space-md bg-surface-2 p-space-md sm:p-space-lg rounded-lg border border-border-subtle">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-space-xs">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono-metric-lg text-3xl font-extrabold text-text-primary">
                          {data.currentXp.toLocaleString()}
                        </span>
                        <span className="font-code-snippet text-text-muted">
                          / {data.targetXp.toLocaleString()} RANK XP
                        </span>
                      </div>
                      <div className="font-system-eyebrow text-primary-fixed-dim font-bold tracking-wider uppercase text-xs">
                        {data.xpRemaining.toLocaleString()} XP TO {data.nextTierName}
                      </div>
                    </div>

                    {/* Segmented High-Stakes Progress Track */}
                    <div className="space-y-2">
                      <div className="relative w-full h-3 bg-surface-container-lowest rounded overflow-hidden border border-border-subtle">
                        {/* 45% calculated progress from 8000 to 12000 bracket */}
                        <div
                          className="h-full bg-primary-fixed-dim transition-all duration-500 ease-out"
                          style={{ width: `${data.divisionProgressPercent}%` }}
                        ></div>
                        {/* Mechanical Hash Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,transparent_90%,rgba(0,0,0,0.8)_100%)] bg-[length:16px_100%]"></div>
                      </div>

                      {/* Division Milestones Marker Ribbon */}
                      <div className="grid grid-cols-3 gap-space-sm pt-1">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-code-snippet text-xs text-status-success font-semibold">
                            <span className="material-symbols-outlined text-[14px]">
                              check_circle
                            </span>
                            <span>DIV III</span>
                          </div>
                          <div className="text-[11px] font-system-eyebrow text-text-muted">
                            8,000 XP • COMPLETED
                          </div>
                        </div>
                        <div className="space-y-1 border-l border-border-subtle pl-space-sm">
                          <div className="flex items-center gap-1.5 font-code-snippet text-xs text-primary-fixed-dim font-bold">
                            <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-ping"></span>
                            <span>DIV II (CURRENT)</span>
                          </div>
                          <div className="text-[11px] font-system-eyebrow text-text-secondary">
                            9,800 XP • 45% CLEAR
                          </div>
                        </div>
                        <div className="space-y-1 border-l border-border-subtle pl-space-sm">
                          <div className="flex items-center gap-1.5 font-code-snippet text-xs text-text-muted">
                            <span className="material-symbols-outlined text-[14px]">lock</span>
                            <span>DIV I</span>
                          </div>
                          <div className="text-[11px] font-system-eyebrow text-text-muted">
                            12,000 XP • PROMOTION GATE
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Telemetry Architectural Definition (Restrained Callout) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md p-space-md bg-surface-container-lowest/80 rounded border border-border-subtle font-code-snippet text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary-fixed-dim text-lg shrink-0 mt-0.5">
                        stacked_line_chart
                      </span>
                      <div className="space-y-0.5">
                        <span className="font-bold text-text-primary tracking-wide">
                          RANK XP (SEASONAL)
                        </span>
                        <p className="text-text-muted leading-relaxed font-body-muted text-xs">
                          Deterministic cumulative battle output. Increments divisions through
                          guaranteed algorithmic point-accumulation without seasonal reset decay.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 border-t sm:border-t-0 sm:border-l border-border-subtle pt-space-sm sm:pt-0 sm:pl-space-md">
                      <span className="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">
                        speed
                      </span>
                      <div className="space-y-0.5">
                        <span className="font-bold text-text-primary tracking-wide">
                          COMPETITIVE ELO ({data.competitiveElo.toLocaleString()})
                        </span>
                        <p className="text-text-muted leading-relaxed font-body-muted text-xs">
                          Zero-sum Bayesian matchmaking gauge. Dictates opponent pairing latency,
                          difficulty brackets, and absolute global ladder placement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TWO-COLUMN SPLIT: RECENT RANK MOVEMENT + NEXT MILESTONE & PERFORMANCE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
              {/* Left Column: Recent Rank Movement (7 cols) */}
              <section className="lg:col-span-7 bg-surface-1 rounded-xl border border-border-subtle p-space-lg flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle shrink-0">
                  <div className="space-y-0.5">
                    <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted tracking-wider">
                      AUDIT // RECENT SHIFTS
                    </span>
                    <h3 className="font-card-title text-card-title text-text-primary font-bold">
                      Recent Rank Movement
                    </h3>
                  </div>
                  <span className="font-code-snippet text-xs text-text-muted">
                    LAST 5 COMBAT SESSIONS
                  </span>
                </div>

                {/* Structured Telemetry Row Stream - flex-1 with balanced spacing filling the full card height */}
                <div className="flex-1 flex flex-col justify-between gap-2.5 my-3.5">
                  {data.recentMovement.map((row) => (
                    <Link
                      key={row.id}
                      href={row.matchId ? `/board/matches/${row.matchId}` : "/board/matches"}
                      className="flex-1 min-h-[58px] bg-surface-2 hover:bg-surface-3 transition-all border border-border-subtle rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-code-snippet group"
                    >
                      <div className="flex items-center gap-space-sm min-w-0">
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px] border shrink-0 ${
                            row.outcome === "VICTORY"
                              ? "bg-status-success/10 text-status-success border-status-success/30"
                              : "bg-status-failure/10 text-status-failure border-status-failure/30"
                          }`}
                        >
                          {row.outcome}
                        </span>
                        <span className="text-text-secondary truncate shrink-0">vs</span>
                        <span className="font-bold text-text-primary group-hover:text-primary-container transition-colors truncate">
                          {row.opponent}
                        </span>
                        <span className="text-text-muted text-[11px] hidden md:inline truncate">
                          • {row.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-space-md shrink-0 justify-between sm:justify-end">
                        <span
                          className={`font-bold ${
                            row.xpDelta >= 0 ? "text-status-success" : "text-status-failure"
                          }`}
                        >
                          {row.xpDelta >= 0 ? `+${row.xpDelta}` : row.xpDelta} XP
                        </span>
                        <span
                          className={`font-semibold ${
                            row.eloDelta >= 0 ? "text-status-success" : "text-status-failure"
                          }`}
                        >
                          {row.eloDelta >= 0 ? `+${row.eloDelta}` : row.eloDelta} ELO
                        </span>
                        <span className="text-text-muted text-[11px] hidden sm:inline">
                          {row.xpBefore.toLocaleString()} → {row.xpAfter.toLocaleString()} XP
                        </span>
                        <span className="text-text-muted uppercase text-[10px] w-12 text-right">
                          {row.date}
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-text-muted group-hover:text-primary-container group-hover:translate-x-0.5 transition-all">
                          chevron_right
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-space-md border-t border-border-subtle flex items-center justify-between shrink-0">
                  <span className="font-code-snippet text-xs text-text-muted">
                    NET DELTA: <strong className="text-status-success">+360 XP</strong> /{" "}
                    <strong className="text-status-success">+27 ELO</strong>
                  </span>
                  <Link
                    className="inline-flex items-center gap-1 font-code-snippet text-xs text-primary-fixed-dim hover:text-text-primary transition-colors font-semibold group"
                    href="/board/matches"
                  >
                    <span>VIEW RANKED MATCHES</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </section>

              {/* Right Column: Next Milestone & Season Performance (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-md justify-between">
                {/* Next Milestone Target Box */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-lg relative space-y-space-md shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                      OPERATIONAL HORIZON
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle text-[11px] font-system-eyebrow text-text-secondary">
                      EST: 12 COMBATS
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-mono-metric-sm text-lg font-bold text-text-primary uppercase tracking-wide">
                        NEXT MILESTONE: {data.nextTierName}
                      </h4>
                      <span className="font-mono-metric-sm text-primary-fixed-dim text-sm font-bold">
                        {data.xpRemaining.toLocaleString()} XP REQ
                      </span>
                    </div>
                    <p className="font-body-muted text-xs text-text-muted mt-1">
                      Final gate of {data.tierRoman}. Clears access to Apex qualification and Master-tier
                      scrim eligibility.
                    </p>
                  </div>
                  <div className="p-space-sm bg-surface-2 rounded border border-border-subtle space-y-1.5">
                    <div className="flex justify-between font-code-snippet text-[11px]">
                      <span className="text-text-muted">NEXT MAJOR APEX TIER</span>
                      <span className="text-secondary font-bold">
                        {data.apexTargetTier} ({data.apexTargetXp.toLocaleString()} XP)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-lowest h-1.5 rounded overflow-hidden">
                      <div
                        className="bg-secondary h-full"
                        style={{ width: `${data.apexProgressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Primary Tactical Volt Action CTA */}
                  <Link
                    href="/board/arena"
                    onClick={handleEnterQueue}
                    className="w-full py-3 px-space-md rounded-lg bg-primary-container hover:bg-[#F0FF70] active:scale-[0.99] text-surface-container-lowest font-body-default font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_16px_rgba(228,255,63,0.25)]"
                  >
                    <span className="material-symbols-outlined text-[20px]">swords</span>
                    <span className="tracking-wide text-sm font-extrabold uppercase">
                      {queueState === "joining"
                        ? "INITIALIZING MATCHMAKING..."
                        : "ENTER RANKED QUEUE"}
                    </span>
                  </Link>
                </div>

                {/* Season 04 Performance Grid */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-lg space-y-space-md shadow-md">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                      SEASON 04 PERFORMANCE
                    </span>
                    <span className="font-code-snippet text-xs text-text-secondary">
                      ACTIVE DATASET
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm text-xs font-code-snippet">
                    <div className="bg-surface-2 p-2.5 rounded border border-border-subtle">
                      <div className="text-text-muted text-[10px] uppercase font-system-eyebrow">
                        STARTED AT
                      </div>
                      <div className="font-bold text-text-primary text-sm mt-0.5">
                        {data.performance.startedAt}
                      </div>
                      <div className="text-[10px] text-text-muted">
                        {data.performance.startedXp.toLocaleString()} XP BASE
                      </div>
                    </div>
                    <div className="bg-surface-2 p-2.5 rounded border border-border-subtle">
                      <div className="text-text-muted text-[10px] uppercase font-system-eyebrow">
                        XP ACCUMULATED
                      </div>
                      <div className="font-bold text-status-success text-sm mt-0.5">
                        +{data.performance.xpAccumulated.toLocaleString()} XP
                      </div>
                      <div className="text-[10px] text-text-muted">NET RUNTIME TOTAL</div>
                    </div>
                    <div className="bg-surface-2 p-2.5 rounded border border-border-subtle">
                      <div className="text-text-muted text-[10px] uppercase font-system-eyebrow">
                        RANKED RECORD
                      </div>
                      <div className="font-bold text-text-primary text-sm mt-0.5">
                        {data.performance.rankedRecord}
                      </div>
                      <div className="text-[10px] text-status-success font-semibold">
                        {data.performance.winProbability}% WIN PROBABILITY
                      </div>
                    </div>
                    <div className="bg-surface-2 p-2.5 rounded border border-border-subtle">
                      <div className="text-text-muted text-[10px] uppercase font-system-eyebrow">
                        STREAK PEAK
                      </div>
                      <div className="font-bold text-primary-fixed-dim text-sm mt-0.5">
                        {data.performance.streakPeak} CONSECUTIVE
                      </div>
                      <div className="text-[10px] text-text-muted">
                        ACTIVE STREAK: {data.performance.activeStreak}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FULL RANK LADDER ("RANK PATH") */}
            <section className="space-y-space-md pt-space-md">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs pb-space-sm border-b border-border-subtle">
                <div>
                  <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                    SYSTEM HIERARCHY
                  </span>
                  <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                    Rank Path
                  </h2>
                  <p className="font-body-default text-body-default text-text-secondary mt-1">
                    Progress through each division via deterministic battle proof to attain the
                    computational apex.
                  </p>
                </div>
                <div className="font-code-snippet text-xs text-text-muted">
                  6 TIERS // 16 OPERATIONAL SUBDIVISIONS
                </div>
              </div>

              {/* Progressive Stack of Tier Bands */}
              <div className="space-y-space-sm">
                {/* TIER 6: NEURAL_GOD (Pinnacle Apex) */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-md lg:p-space-lg relative overflow-hidden transition-all hover:border-status-failure/40">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-status-failure shrink-0 shadow-inner">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 2 19 8.5 19 15.5 12 22 5 15.5 5 8.5"></polygon>
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M12 2 L12 9 M12 15 L12 22 M5 8.5 L10 12 M14 12 L19 15.5"></path>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-text-primary">
                            NEURAL_GOD
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[10px] text-status-failure uppercase tracking-wider">
                            APEX TIER
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-muted">
                          Pinnacle adversarial mastery. Zero margin for algorithmic sub-optimality.
                          Top 0.1% combatants.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-lg justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          ENTRY THRESHOLD
                        </div>
                        <div className="font-mono-metric-sm text-text-primary font-bold">
                          20,000+ XP
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded bg-surface-2 border border-border-subtle font-code-snippet text-xs text-text-muted flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        <span>LOCKED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIER 5: OVERLORD (CURRENT ACTIVE TIER) */}
                <div className="bg-surface-2 rounded-xl border border-primary-fixed-dim/40 p-space-md lg:p-space-lg relative overflow-hidden shadow-[0_0_24px_rgba(228,255,63,0.06)]">
                  {/* Active left indicator band */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-fixed-dim"></div>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pl-1 sm:pl-2">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-3 border border-primary-fixed-dim/50 flex items-center justify-center text-primary-fixed-dim shrink-0">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7"></polygon>
                          <path d="M12 6 L17 12 L12 18 L7 12 Z"></path>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-primary-fixed-dim">
                            OVERLORD
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-primary-fixed-dim/20 text-primary-fixed-dim font-system-eyebrow text-[10px] font-bold uppercase tracking-wider">
                            CURRENT TIER
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-secondary">
                          Complex state synthesis, distributed game theory, flow mechanics, dynamic
                          memory control.
                        </p>
                      </div>
                    </div>

                    {/* Divisions breakdown inline */}
                    <div className="flex flex-wrap items-center gap-space-md justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-2 font-code-snippet text-xs">
                        <span className="px-2 py-1 bg-surface-3 rounded text-status-success font-semibold border border-border-subtle">
                          DIV III ✓
                        </span>
                        <span className="px-2.5 py-1 bg-primary-fixed-dim text-surface-container-lowest font-bold rounded shadow-sm">
                          DIV II (9,800 XP)
                        </span>
                        <span className="px-2 py-1 bg-surface-3 rounded text-text-muted border border-border-subtle">
                          DIV I (12,000 XP)
                        </span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          BRACKET
                        </div>
                        <div className="font-mono-metric-sm text-text-primary font-bold">
                          8,000 – 14,000 XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIER 4: ARCHITECT (COMPLETED) */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-md lg:p-space-lg relative opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-status-warning shrink-0">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <rect height="16" rx="2" width="16" x="4" y="4"></rect>
                          <path d="M9 9 L15 15 M15 9 L9 15"></path>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-text-primary">
                            ARCHITECT
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[10px] text-text-secondary uppercase">
                            SURPASSED
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-muted">
                          Distributed logic, advanced optimization, topological sorting, segment and
                          binary indexed trees.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-lg justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-1.5 font-code-snippet text-xs text-status-success">
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>DIV III • DIV II • DIV I CLEARED</span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          BRACKET
                        </div>
                        <div className="font-mono-metric-sm text-text-secondary font-bold">
                          5,000 – 7,999 XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIER 3: EXECUTOR (COMPLETED) */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-md lg:p-space-lg relative opacity-85 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-status-success shrink-0">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="9"></circle>
                          <path d="M12 7 L12 12 L16 14"></path>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-text-primary">
                            EXECUTOR
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[10px] text-text-secondary uppercase">
                            SURPASSED
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-muted">
                          Graph traversal (Dijkstra, Bellman-Ford), multi-dimensional dynamic
                          programming, memoization.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-lg justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-1.5 font-code-snippet text-xs text-status-success">
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>DIV III • DIV II • DIV I CLEARED</span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          BRACKET
                        </div>
                        <div className="font-mono-metric-sm text-text-secondary font-bold">
                          3,000 – 4,999 XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIER 2: COMPILER (COMPLETED) */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-md lg:p-space-lg relative opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-secondary shrink-0">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="4 17 10 11 4 5"></polyline>
                          <line x1="12" x2="20" y1="19" y2="19"></line>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-text-primary">
                            COMPILER
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[10px] text-text-secondary uppercase">
                            SURPASSED
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-muted">
                          Linear and non-linear data structures, binary trees, heaps, amortized Big-O
                          analysis.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-lg justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-1.5 font-code-snippet text-xs text-status-success">
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>DIV III • DIV II • DIV I CLEARED</span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          BRACKET
                        </div>
                        <div className="font-mono-metric-sm text-text-secondary font-bold">
                          1,500 – 2,999 XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIER 1: SCRIPTER (FOUNDATIONAL TIER) */}
                <div className="bg-surface-1 rounded-xl border border-border-subtle p-space-md lg:p-space-lg relative opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md min-w-0">
                      <div className="w-14 h-14 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" x2="8" y1="13" y2="13"></line>
                          <line x1="16" x2="8" y1="17" y2="17"></line>
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-card-title text-xl font-bold tracking-tight text-text-primary">
                            SCRIPTER
                          </h3>
                          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[10px] text-text-secondary uppercase">
                            ORIGIN
                          </span>
                        </div>
                        <p className="font-body-muted text-xs text-text-muted">
                          Algorithmic foundations, pointer arithmetic, string manipulation, sorting
                          heuristics.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-space-lg justify-between lg:justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                      <div className="flex items-center gap-1.5 font-code-snippet text-xs text-status-success">
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>DIV III • DIV II • DIV I CLEARED</span>
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-system-eyebrow text-[11px] text-text-muted">
                          BRACKET
                        </div>
                        <div className="font-mono-metric-sm text-text-secondary font-bold">
                          0 – 1,499 XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEASONAL RULES & REWARDS FOOTNOTE FOOTER */}
            <footer className="p-space-lg bg-surface-1 rounded-xl border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-space-md text-xs font-code-snippet text-text-muted">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary-fixed-dim">
                  verified
                </span>
                <span>
                  RATING VALIDITY: SEASON 04 ENDS OCT 15, 23:59 UTC • ZERO PROBATIONARY FLAGS
                </span>
              </div>
              <div className="flex items-center gap-space-md">
                <Link
                  className="hover:text-text-primary transition-colors underline decoration-border-subtle"
                  href="/board/arena"
                >
                  LEAGUE PROTOCOL
                </Link>
                <span>•</span>
                <Link
                  className="hover:text-text-primary transition-colors underline decoration-border-subtle"
                  href="/board/matches"
                >
                  ELO DECAY SPEC
                </Link>
                <span>•</span>
                <span className="text-text-primary font-bold">LATENCY 14MS</span>
              </div>
            </footer>
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation Dock */}
      <FloatingNav />
    </div>
  );
}
