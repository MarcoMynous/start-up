"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";
import { getMatchReportById } from "@/lib/match-reports-data";
import { MatchReportDetails } from "@/types/match-report";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MatchReportPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.id || "CC-10482";
  const [report, setReport] = useState<MatchReportDetails>(() =>
    getMatchReportById(matchId)
  );

  // Interactive UI states
  const [diffMode, setDiffMode] = useState<"side" | "nano" | "byteghost">("side");
  const [shareCopied, setShareCopied] = useState(false);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    setReport(getMatchReportById(matchId));
  }, [matchId]);

  // Keyboard navigation shortcuts: J/K to move between sections, D to toggle diff
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const sections = [
        "overview",
        "code-forensics",
        "test-suite",
        "performance",
        "timeline",
        "elo-progression",
        "drills",
      ];

      if (e.key === "d" || e.key === "D") {
        setDiffMode((prev) =>
          prev === "side" ? "nano" : prev === "nano" ? "byteghost" : "side"
        );
      } else if (e.key === "j" || e.key === "J") {
        const currIndex = sections.indexOf(activeSection);
        const nextIndex = Math.min(sections.length - 1, currIndex + 1);
        const target = document.getElementById(sections[nextIndex]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sections[nextIndex]);
        }
      } else if (e.key === "k" || e.key === "K") {
        const currIndex = sections.indexOf(activeSection);
        const prevIndex = Math.max(0, currIndex - 1);
        const target = document.getElementById(sections[prevIndex]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sections[prevIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2400);
    }
  };

  const handleRematch = () => {
    setRematchRequested(true);
    setTimeout(() => {
      setRematchRequested(false);
    }, 3500);
  };

  const isNanoWin = report.player.outcome === "WIN";

  return (
    <div className="bg-[#080A0B] text-text-primary font-body-default min-h-screen selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Top Global Command Header */}
      <DashboardHeader />

      <main className="w-full pt-14 pb-28 min-h-screen bg-[#080A0B]">
        <div className="flex flex-col w-full" id="overview">
          {/* Container with 94% fluid width constraint for esports command density */}
          <div className="w-[94%] max-w-[1720px] mx-auto py-space-lg flex flex-col gap-space-lg">
            
            {/* 1. NAVIGATION & POST-MATCH FORENSIC HEADER */}
            <header className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <Link
                  className="inline-flex items-center gap-space-xs font-system-eyebrow text-system-eyebrow text-text-muted hover:text-primary-container transition-colors tracking-widest uppercase"
                  href="/board/matches"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>BACK TO MATCHES</span>
                  <span className="text-text-secondary text-[10px] ml-1 bg-surface-2 px-1.5 py-0.5 rounded border border-border-subtle">
                    ARCHIVE
                  </span>
                </Link>
                <div className="flex items-center gap-space-sm font-code-snippet text-code-snippet text-text-muted">
                  <span className="inline-block w-2 h-2 rounded-full bg-status-success"></span>
                  <span>
                    RATIFIED LEDGER // HASH:{" "}
                    <span className="text-text-secondary font-mono">{report.hash}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider flex items-center gap-2">
                    <span>POST-MATCH ANALYSIS</span>
                    <span className="text-text-muted">//</span>
                    <span className="text-text-secondary">MATCH {report.matchId}</span>
                    <span className="text-text-muted">//</span>
                    <span className="bg-surface-2 text-text-secondary px-2 py-0.5 rounded text-[10px] border border-border-subtle">
                      {report.tierLabel}
                    </span>
                  </div>
                  <h1 className="font-display-hero text-display-hero text-text-primary tracking-tight font-bold">
                    Match Report
                  </h1>
                  <p className="font-body-default text-body-default text-text-secondary max-w-2xl">
                    Deterministic runtime breakdown, multi-suite test validation, differential
                    AST telemetry, and automated rating ratification.
                  </p>
                </div>

                {/* Utility buttons */}
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={handleShare}
                    type="button"
                    className="px-space-md py-2 bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-system-eyebrow text-system-eyebrow rounded flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {shareCopied ? "check" : "share"}
                    </span>
                    <span>{shareCopied ? "REPORT COPIED" : "SHARE REPORT"}</span>
                  </button>
                  <Link
                    href={`/board/practice?problem=${report.targetProblem.id}`}
                    className="px-space-md py-2 bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-system-eyebrow text-system-eyebrow rounded flex items-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                    <span>VIEW PROBLEM SPEC</span>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">
                      north_east
                    </span>
                  </Link>
                </div>
              </div>

              {/* Compact Technical Summary Ribbon */}
              <div className="w-full bg-surface-1 border border-border-subtle rounded-lg px-space-md py-3 flex flex-wrap items-center justify-between gap-y-2 font-code-snippet text-code-snippet">
                <div className="flex items-center gap-space-md flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{report.player.name}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-system-eyebrow text-[11px] font-bold ${
                        isNanoWin
                          ? "bg-status-success/10 text-status-success"
                          : "bg-status-failure/10 text-status-failure"
                      }`}
                    >
                      {report.player.outcome === "WIN" ? "VICTORY" : "DEFEAT"}
                    </span>
                    <span className="text-text-muted">vs</span>
                    <span className="text-text-secondary font-medium">
                      {report.opponent.name}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-system-eyebrow text-[11px] font-bold ${
                        report.opponent.outcome === "WIN"
                          ? "bg-status-success/10 text-status-success"
                          : "bg-status-failure/10 text-status-failure"
                      }`}
                    >
                      {report.opponent.outcome === "WIN" ? "VICTORY" : "DEFEAT"}
                    </span>
                  </div>
                  <span className="text-text-muted hidden sm:inline">|</span>
                  <span className="text-text-secondary">{report.modeLabel}</span>
                  <span className="text-text-muted hidden sm:inline">|</span>
                  <span className="text-text-secondary">{report.timestamp}</span>
                  <span className="text-text-muted hidden sm:inline">|</span>
                  <span className="text-text-secondary">
                    DURATION: <span className="text-text-primary font-mono">{report.duration}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">TARGET:</span>
                  <span className="text-primary-container font-mono font-medium">
                    {report.targetProblem.title}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-system-eyebrow border ${
                      report.targetProblem.difficulty === "HARD"
                        ? "bg-status-failure/15 text-status-failure border-status-failure/30"
                        : report.targetProblem.difficulty === "MEDIUM"
                        ? "bg-status-warning/15 text-status-warning border-status-warning/30"
                        : "bg-status-success/15 text-status-success border-status-success/30"
                    }`}
                  >
                    {report.targetProblem.difficulty}
                  </span>
                </div>
              </div>
            </header>

            {/* 2. PRIMARY RESULT SUMMARY & DECIDING FACTOR BANNER */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
              {/* Nano Card (Winner) */}
              <div className="lg:col-span-4 bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-md">
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-lg object-cover bg-surface-2 border border-border-subtle"
                        alt="NANO Tactical Avatar"
                        src={report.player.avatarUrl}
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-surface-1 font-bold ${
                          isNanoWin ? "bg-status-success" : "bg-status-failure"
                        }`}
                      >
                        {isNanoWin ? "✓" : "✕"}
                      </span>
                    </div>
                    <div>
                      <div className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider">
                        YOUR PROFILE
                      </div>
                      <div className="font-card-title text-card-title text-text-primary font-bold flex items-center gap-2">
                        <span>{report.player.name}</span>
                        <span className="text-[12px] text-primary-container font-code-snippet font-normal">
                          [{report.player.role}]
                        </span>
                      </div>
                      <div className="font-code-snippet text-[11px] text-text-secondary mt-0.5">
                        {report.player.runtime}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-result-title text-[42px] leading-none font-black tracking-tighter ${
                        isNanoWin ? "text-status-success" : "text-status-failure"
                      }`}
                    >
                      {report.player.outcome}
                    </div>
                    <div
                      className={`font-system-eyebrow text-[11px] mt-1 uppercase tracking-widest font-bold ${
                        report.player.eloDelta >= 0
                          ? "text-status-success"
                          : "text-status-failure"
                      }`}
                    >
                      {report.player.eloDelta >= 0
                        ? `+${report.player.eloDelta}`
                        : report.player.eloDelta}{" "}
                      ELO
                    </div>
                  </div>
                </div>

                {/* Telemetry snapshot */}
                <div className="grid grid-cols-3 gap-space-xs mt-space-lg pt-space-md border-t border-border-subtle/50 bg-surface-2/40 p-space-sm rounded-lg">
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Hidden Tests
                    </div>
                    <div
                      className={`font-mono-metric-sm text-mono-metric-sm font-bold ${
                        report.player.testsPassed === report.player.testsTotal
                          ? "text-status-success"
                          : "text-status-failure"
                      }`}
                    >
                      {report.player.testsPassed}/{report.player.testsTotal}
                    </div>
                    <div className="font-code-snippet text-[10px] text-text-secondary">
                      {Math.round(
                        (report.player.testsPassed / report.player.testsTotal) * 100
                      )}
                      % Pass
                    </div>
                  </div>
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Runtime
                    </div>
                    <div className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      {report.player.runtimeMs}
                      <span className="text-[11px] font-normal text-text-muted">ms</span>
                    </div>
                    <div className="font-code-snippet text-[10px] text-text-muted">
                      Deterministic
                    </div>
                  </div>
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Memory
                    </div>
                    <div className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      {report.player.memoryMb}
                      <span className="text-[11px] font-normal text-text-muted">MB</span>
                    </div>
                    <div className="font-code-snippet text-[10px] text-text-muted">
                      Peak RSS
                    </div>
                  </div>
                </div>

                <div className="mt-space-md flex items-center justify-between text-[12px] font-code-snippet text-text-secondary">
                  <span>
                    Submission Time:{" "}
                    <strong className="text-text-primary font-mono">
                      {report.player.submissionTime}
                    </strong>
                  </span>
                  <span>
                    Rating:{" "}
                    <strong className="text-text-primary font-mono">
                      {report.player.eloPre.toLocaleString()} →{" "}
                      {report.player.eloPost.toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Deciding Factor Callout Banner */}
              <div className="lg:col-span-4 bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-system-eyebrow text-system-eyebrow text-primary-container tracking-wider uppercase font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">balance</span>
                      {report.decidingFactor.title}
                    </span>
                    <span className="text-[10px] font-code-snippet bg-surface-2 text-text-muted px-2 py-0.5 rounded border border-border-subtle">
                      {report.decidingFactor.clause}
                    </span>
                  </div>
                  <p className="font-body-default text-body-default text-text-primary mt-1">
                    <strong className="text-status-success font-semibold">
                      {report.player.name}
                    </strong>{" "}
                    passed the complete {report.player.testsPassed}/{report.player.testsTotal}{" "}
                    hidden test suite.{" "}
                    <strong className="text-status-failure font-semibold">
                      {report.opponent.name}
                    </strong>{" "}
                    failed {report.opponent.testsTotal - report.opponent.testsPassed} hidden edge
                    cases on cycle termination.
                  </p>
                  <p className="font-code-snippet text-[12px] text-text-secondary mt-1 leading-relaxed">
                    {report.decidingFactor.analysis}
                  </p>
                </div>

                {/* 3-Tier Judging Rule Hierarchy */}
                <div className="mt-space-md pt-space-sm border-t border-border-subtle/50 flex flex-col gap-1.5">
                  <div className="text-[10px] font-system-eyebrow uppercase text-text-muted tracking-wider">
                    Judging Priority Stack
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 font-code-snippet text-[11px]">
                    {report.decidingFactor.priorityStack.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded flex flex-col text-left border ${
                          tier.highlight
                            ? "bg-surface-3 border-border-subtle"
                            : "bg-surface-2/60 border-border-subtle/40 opacity-60"
                        }`}
                      >
                        <span
                          className={`font-bold text-[10px] ${
                            tier.highlight ? "text-primary-container" : "text-text-muted"
                          }`}
                        >
                          {tier.priority}
                        </span>
                        <span className="text-text-primary font-semibold truncate">
                          {tier.name}
                        </span>
                        <span
                          className={`text-[9px] ${
                            tier.highlight ? "text-status-success" : "text-text-muted"
                          }`}
                        >
                          {tier.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Byteghost Card (Opponent) */}
              <div className="lg:col-span-4 bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-md">
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-lg object-cover bg-surface-2 border border-border-subtle opacity-80"
                        alt={`${report.opponent.name} Avatar`}
                        src={report.opponent.avatarUrl}
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-surface-1 font-bold ${
                          report.opponent.outcome === "WIN"
                            ? "bg-status-success"
                            : "bg-status-failure"
                        }`}
                      >
                        {report.opponent.outcome === "WIN" ? "✓" : "✕"}
                      </span>
                    </div>
                    <div>
                      <div className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider">
                        OPPONENT
                      </div>
                      <div className="font-card-title text-card-title text-text-primary font-bold flex items-center gap-2">
                        <span>{report.opponent.name}</span>
                        <span className="text-[12px] text-text-muted font-code-snippet font-normal">
                          [{report.opponent.role}]
                        </span>
                      </div>
                      <div className="font-code-snippet text-[11px] text-text-secondary mt-0.5">
                        {report.opponent.runtime}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-result-title text-[42px] leading-none font-black tracking-tighter ${
                        report.opponent.outcome === "WIN"
                          ? "text-status-success"
                          : "text-status-failure"
                      }`}
                    >
                      {report.opponent.outcome}
                    </div>
                    <div
                      className={`font-system-eyebrow text-[11px] mt-1 uppercase tracking-widest font-bold ${
                        report.opponent.eloDelta >= 0
                          ? "text-status-success"
                          : "text-status-failure"
                      }`}
                    >
                      {report.opponent.eloDelta >= 0
                        ? `+${report.opponent.eloDelta}`
                        : report.opponent.eloDelta}{" "}
                      ELO
                    </div>
                  </div>
                </div>

                {/* Telemetry snapshot */}
                <div className="grid grid-cols-3 gap-space-xs mt-space-lg pt-space-md border-t border-border-subtle/50 bg-surface-2/40 p-space-sm rounded-lg">
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Hidden Tests
                    </div>
                    <div
                      className={`font-mono-metric-sm text-mono-metric-sm font-bold ${
                        report.opponent.testsPassed === report.opponent.testsTotal
                          ? "text-status-success"
                          : "text-status-failure"
                      }`}
                    >
                      {report.opponent.testsPassed}/{report.opponent.testsTotal}
                    </div>
                    <div className="font-code-snippet text-[10px] text-status-failure">
                      {report.opponent.testsTotal - report.opponent.testsPassed} Failed
                    </div>
                  </div>
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Runtime
                    </div>
                    <div className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      {report.opponent.runtimeMs}
                      <span className="text-[11px] font-normal text-text-muted">ms</span>
                    </div>
                    <div className="font-code-snippet text-[10px] text-status-success font-mono font-medium">
                      {report.opponent.timeDeltaNote || "Faster (-8ms)"}
                    </div>
                  </div>
                  <div>
                    <div className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                      Memory
                    </div>
                    <div className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                      {report.opponent.memoryMb}
                      <span className="text-[11px] font-normal text-text-muted">MB</span>
                    </div>
                    <div className="font-code-snippet text-[10px] text-text-muted">
                      Peak RSS
                    </div>
                  </div>
                </div>

                <div className="mt-space-md flex items-center justify-between text-[12px] font-code-snippet text-text-secondary">
                  <span>
                    Submission Time:{" "}
                    <strong className="text-text-primary font-mono">
                      {report.opponent.submissionTime}
                    </strong>
                  </span>
                  <span>
                    Rating:{" "}
                    <strong className="text-text-primary font-mono">
                      {report.opponent.eloPre.toLocaleString()} →{" "}
                      {report.opponent.eloPost.toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>
            </section>

            {/* 3. INTERACTIVE SECTION NAV PILL BAR */}
            <nav className="sticky top-14 z-30 bg-surface-1/90 backdrop-blur-md border border-border-subtle rounded-xl p-1.5 flex items-center justify-between gap-1 overflow-x-auto shadow-md">
              <div className="flex items-center gap-1 min-w-max">
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "overview"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#overview"
                  onClick={() => setActiveSection("overview")}
                >
                  <span className="material-symbols-outlined text-[16px]">analytics</span>
                  <span>OVERVIEW</span>
                </a>
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "code-forensics"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#code-forensics"
                  onClick={() => setActiveSection("code-forensics")}
                >
                  <span className="material-symbols-outlined text-[16px]">code</span>
                  <span>CODE DIFF</span>
                </a>
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "test-suite"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#test-suite"
                  onClick={() => setActiveSection("test-suite")}
                >
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                  <span>TESTS ({report.visibleTests.length + 40} TOTAL)</span>
                </a>
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "performance"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#performance"
                  onClick={() => setActiveSection("performance")}
                >
                  <span className="material-symbols-outlined text-[16px]">speed</span>
                  <span>PERFORMANCE MATRIX</span>
                </a>
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "timeline"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#timeline"
                  onClick={() => setActiveSection("timeline")}
                >
                  <span className="material-symbols-outlined text-[16px]">timeline</span>
                  <span>TIMELINE</span>
                </a>
                <a
                  className={`px-4 py-2 rounded-lg font-system-eyebrow text-system-eyebrow tracking-wider transition-all flex items-center gap-2 ${
                    activeSection === "elo-progression"
                      ? "bg-surface-3 text-primary-container font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                  href="#elo-progression"
                  onClick={() => setActiveSection("elo-progression")}
                >
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  <span>ELO & TIER</span>
                </a>
              </div>

              <div className="hidden xl:flex items-center gap-2 px-3 text-[11px] font-code-snippet text-text-muted">
                <span>HOTKEYS:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface-2 text-text-secondary border border-border-subtle">
                  J/K
                </kbd>
                <span>NAVIGATE</span>
                <kbd className="px-1.5 py-0.5 rounded bg-surface-2 text-text-secondary border border-border-subtle ml-1">
                  D
                </kbd>
                <span>TOGGLE DIFF</span>
              </div>
            </nav>

            {/* SECTION A: CODE FORENSICS (SIDE-BY-SIDE MONACO DIFF) */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="code-forensics"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-border-subtle/50">
                <div>
                  <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                    SECTION 01 // SYNTAX & LOGIC DIFF
                  </div>
                  <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                    Code Forensics
                  </h2>
                </div>

                {/* Segmented Control for Views */}
                <div
                  className="flex items-center p-1 rounded-lg bg-surface-2 border border-border-subtle gap-1 font-system-eyebrow text-[11px]"
                  id="diff-view-selector"
                >
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      diffMode === "side"
                        ? "bg-surface-3 text-primary-container font-semibold shadow-sm border border-border-subtle"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                    onClick={() => setDiffMode("side")}
                  >
                    SIDE-BY-SIDE DIFF
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      diffMode === "nano"
                        ? "bg-surface-3 text-primary-container font-semibold shadow-sm border border-border-subtle"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                    onClick={() => setDiffMode("nano")}
                  >
                    YOUR SOLUTION ({report.playerForensics.language})
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      diffMode === "byteghost"
                        ? "bg-surface-3 text-primary-container font-semibold shadow-sm border border-border-subtle"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                    onClick={() => setDiffMode("byteghost")}
                  >
                    OPPONENT ({report.opponentForensics.language})
                  </button>
                </div>
              </div>

              {/* Code Windows Container */}
              <div
                className={`grid gap-space-md ${
                  diffMode === "side" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {/* Left: Nano's Code */}
                {(diffMode === "side" || diffMode === "nano") && (
                  <div className="flex flex-col rounded-lg overflow-hidden bg-[#050708] border border-border-subtle">
                    <div className="bg-surface-2 px-space-md py-2.5 flex items-center justify-between font-code-snippet text-code-snippet border-b border-border-subtle">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
                        <span className="font-bold text-text-primary">
                          {report.player.name}
                        </span>
                        <span className="text-text-muted text-[11px]">
                          // {report.playerForensics.filename} (
                          {report.playerForensics.language})
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm text-[11px] text-text-secondary">
                        <span>{report.playerForensics.lockedAt}</span>
                        <span>·</span>
                        <span>{report.playerForensics.attempts} ATTEMPTS</span>
                        <span>·</span>
                        <span className="text-status-success font-semibold">
                          {report.playerForensics.passRatio}
                        </span>
                      </div>
                    </div>

                    {/* Monaco styled IDE Cavity */}
                    <div className="p-space-md font-code-snippet text-[12px] leading-relaxed overflow-x-auto text-text-secondary min-h-[380px]">
                      <pre className="grid grid-cols-[36px_1fr] gap-x-3">
                        {report.playerForensics.codeLines.map((line) => (
                          <React.Fragment key={line.line}>
                            <span className="text-text-muted select-none text-right">
                              {line.line.toString().padStart(2, "0")}
                            </span>
                            <span
                              className={
                                line.isHighlighted
                                  ? "bg-status-success/15 -mx-2 px-2 py-0.5 rounded text-text-primary font-medium block"
                                  : ""
                              }
                            >
                              {line.text}
                            </span>
                          </React.Fragment>
                        ))}
                      </pre>
                    </div>

                    <div className="bg-surface-2/40 px-space-md py-2 text-[11px] font-code-snippet text-text-secondary flex justify-between items-center border-t border-border-subtle">
                      <span>Memory RSS: {report.playerForensics.rssMemoryMb} MB</span>
                      <span className="text-status-success font-medium">
                        Passed All 40 Hidden Tests
                      </span>
                    </div>
                  </div>
                )}

                {/* Right: Byteghost's Code */}
                {(diffMode === "side" || diffMode === "byteghost") && (
                  <div className="flex flex-col rounded-lg overflow-hidden bg-[#050708] border border-border-subtle">
                    <div className="bg-surface-2 px-space-md py-2.5 flex items-center justify-between font-code-snippet text-code-snippet border-b border-border-subtle">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-status-failure"></span>
                        <span className="font-bold text-text-primary">
                          {report.opponent.name}
                        </span>
                        <span className="text-text-muted text-[11px]">
                          // {report.opponentForensics.filename} (
                          {report.opponentForensics.language})
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm text-[11px] text-text-secondary">
                        <span>{report.opponentForensics.lockedAt}</span>
                        <span>·</span>
                        <span>{report.opponentForensics.attempts} ATTEMPTS</span>
                        <span>·</span>
                        <span className="text-status-failure font-semibold">
                          {report.opponentForensics.passRatio}
                        </span>
                      </div>
                    </div>

                    {/* Monaco styled IDE Cavity */}
                    <div className="p-space-md font-code-snippet text-[12px] leading-relaxed overflow-x-auto text-text-secondary min-h-[380px]">
                      <pre className="grid grid-cols-[36px_1fr] gap-x-3">
                        {report.opponentForensics.codeLines.map((line) => (
                          <React.Fragment key={line.line}>
                            <span className="text-text-muted select-none text-right">
                              {line.line.toString().padStart(2, "0")}
                            </span>
                            <span
                              className={
                                line.isHighlighted
                                  ? "bg-status-failure/15 -mx-2 px-2 py-0.5 rounded text-text-primary font-medium block"
                                  : ""
                              }
                            >
                              {line.text}
                            </span>
                          </React.Fragment>
                        ))}
                      </pre>
                    </div>

                    <div className="bg-surface-2/40 px-space-md py-2 text-[11px] font-code-snippet text-text-secondary flex justify-between items-center border-t border-border-subtle">
                      <span>Memory RSS: {report.opponentForensics.rssMemoryMb} MB</span>
                      <span className="text-status-failure font-medium">
                        Failed Tests #17, #28, #34
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Edge Case Explanation Box */}
              <div className="bg-surface-2/70 border border-border-subtle rounded-lg p-space-md flex items-start gap-space-md">
                <span className="material-symbols-outlined text-primary-container text-[24px]">
                  bug_report
                </span>
                <div className="flex flex-col gap-1">
                  <div className="font-card-title text-[15px] font-semibold text-text-primary">
                    Algorithmic Variance Diagnosis
                  </div>
                  <p className="font-body-muted text-body-muted text-text-secondary">
                    {report.algorithmicDiagnosis}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION B: TEST SUITE BREAKDOWN (VISIBLE TESTS & HIDDEN SUITE) */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="test-suite"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-border-subtle/50">
                <div>
                  <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                    SECTION 02 // SUITE VALIDATION MATRIX
                  </div>
                  <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                    Test Suite Breakdown
                  </h2>
                </div>
                <div className="flex items-center gap-space-md text-[13px] font-code-snippet">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
                    {report.player.name}: {report.visibleTests.length + report.player.testsPassed}/
                    {report.visibleTests.length + report.player.testsTotal} Total
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-status-failure"></span>
                    {report.opponent.name}: {report.visibleTests.length + report.opponent.testsPassed}/
                    {report.visibleTests.length + report.opponent.testsTotal} Total
                  </span>
                </div>
              </div>

              {/* Visible Tests (15/15) */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-card-title text-[16px] text-text-primary font-semibold flex items-center gap-2">
                    <span>Visible Sample Test Cases</span>
                    <span className="text-[12px] font-code-snippet bg-surface-2 border border-border-subtle px-2 py-0.5 rounded text-text-secondary">
                      15 / 15 Passed by Both
                    </span>
                  </h3>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    SAMPLE I/O VECTORS
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                  {report.visibleTests.map((t) => (
                    <div
                      key={t.id}
                      className="bg-surface-2 border border-border-subtle rounded-lg p-space-sm flex flex-col gap-1.5 hover:bg-surface-3 transition-colors"
                    >
                      <div className="flex items-center justify-between font-code-snippet text-[12px]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-status-success text-[16px]">
                            check_circle
                          </span>
                          <span className="font-bold text-text-primary">{t.id}</span>
                          <span className="text-text-muted">{t.title}</span>
                        </div>
                        <span className="text-text-secondary font-mono">{t.runtime}</span>
                      </div>
                      <div className="bg-[#050708] border border-border-subtle/60 p-2 rounded text-[11px] font-mono text-text-muted flex flex-col gap-0.5">
                        <div>
                          <span className="text-text-secondary">IN:</span> {t.input}
                        </div>
                        <div>
                          <span className="text-text-secondary">OUT:</span> {t.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hidden Suite Breakdown (40 Hidden Tests) */}
              <div className="flex flex-col gap-space-sm mt-space-sm pt-space-sm border-t border-border-subtle/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-card-title text-[16px] text-text-primary font-semibold flex items-center gap-2">
                    <span>Hidden Competitive Validation Suite</span>
                    <span className="text-[12px] font-code-snippet bg-surface-2 border border-border-subtle px-2 py-0.5 rounded text-text-secondary">
                      40 Stress Tests
                    </span>
                  </h3>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    VECTORS PROTECTED UNDER CIP-84
                  </span>
                </div>

                {/* Anomaly Table */}
                <div className="w-full overflow-hidden rounded-lg bg-surface-2 border border-border-subtle">
                  <div className="grid grid-cols-12 bg-surface-3 px-space-md py-2.5 font-system-eyebrow text-[11px] text-text-muted uppercase border-b border-border-subtle">
                    <div className="col-span-3">Vector ID & Type</div>
                    <div className="col-span-2">Complexity Class</div>
                    <div className="col-span-3">{report.player.name} Result</div>
                    <div className="col-span-4">{report.opponent.name} Result</div>
                  </div>

                  {report.hiddenSuite.map((item, idx) => {
                    const isAnomaly = item.isAnomaly;
                    return (
                      <div
                        key={idx}
                        className={`grid grid-cols-12 px-space-md py-3 items-center font-code-snippet text-code-snippet border-b border-border-subtle/50 last:border-b-0 transition-colors ${
                          isAnomaly
                            ? "bg-status-failure/5 hover:bg-status-failure/10"
                            : "hover:bg-surface-3/50"
                        }`}
                      >
                        <div className="col-span-3 text-text-primary font-bold flex items-center gap-2">
                          {isAnomaly && (
                            <span className="px-1.5 py-0.2 rounded bg-status-failure text-surface-1 font-bold text-[10px]">
                              ANOMALY
                            </span>
                          )}
                          <span>{item.label}</span>
                        </div>
                        <div className="col-span-2 text-text-secondary font-mono text-[12px]">
                          {item.complexityClass}
                        </div>
                        <div className="col-span-3 text-status-success font-semibold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">check</span>{" "}
                          {item.playerResult.text}
                        </div>
                        <div
                          className={`col-span-4 font-semibold flex items-center gap-1.5 ${
                            item.opponentResult.status === "PASS"
                              ? "text-status-success"
                              : "text-status-failure"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {item.opponentResult.status === "PASS"
                              ? "check"
                              : item.opponentResult.status === "TLE"
                              ? "timer_off"
                              : item.opponentResult.status === "PANIC"
                              ? "error"
                              : "close"}
                          </span>
                          {item.opponentResult.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION C: PERFORMANCE COMPARISON MATRIX */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="performance"
            >
              <div>
                <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                  SECTION 03 // RUNTIME & RESOURCE TELEMETRY
                </div>
                <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                  Performance Comparison Matrix
                </h2>
              </div>

              {/* Comparative Bar Visualizations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                {/* Left Column: Runtime & Memory */}
                <div className="flex flex-col gap-space-md">
                  {/* Metric 1: Normalized Runtime */}
                  <div className="bg-surface-2 border border-border-subtle p-space-md rounded-lg flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                        NORMALIZED RUNTIME (LOWER IS FASTER)
                      </span>
                      <span className="font-code-snippet text-[11px] text-text-secondary">
                        Delta: -8ms (Opponent)
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[12px] font-code-snippet">
                        <span className="text-text-primary font-bold">
                          {report.player.name} ({report.playerForensics.language})
                        </span>
                        <span className="text-text-primary font-mono font-bold">
                          {report.player.runtimeMs}ms
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{ width: `${report.metrics.playerNormalizedRuntime}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[12px] font-code-snippet mt-1">
                        <span className="text-text-secondary">
                          {report.opponent.name} ({report.opponentForensics.language})
                        </span>
                        <span className="text-status-success font-mono font-bold">
                          {report.opponent.runtimeMs}ms
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${report.metrics.opponentNormalizedRuntime}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Metric 2: Peak RSS Memory */}
                  <div className="bg-surface-2 border border-border-subtle p-space-md rounded-lg flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                        PEAK RSS MEMORY CONSUMPTION
                      </span>
                      <span className="font-code-snippet text-[11px] text-text-secondary">
                        Delta: -0.4 MB
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[12px] font-code-snippet">
                        <span className="text-text-primary font-bold">
                          {report.player.name}
                        </span>
                        <span className="text-text-primary font-mono font-bold">
                          {report.player.memoryMb} MB
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{ width: `${report.metrics.playerMemoryPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[12px] font-code-snippet mt-1">
                        <span className="text-text-secondary">
                          {report.opponent.name}
                        </span>
                        <span className="text-secondary font-mono font-bold">
                          {report.opponent.memoryMb} MB
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${report.metrics.opponentMemoryPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Integrity Ratio & Direct Stats */}
                <div className="flex flex-col gap-space-md">
                  {/* Metric 3: Hidden Test Pass Rate */}
                  <div className="bg-surface-2 border border-border-subtle p-space-md rounded-lg flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                        HIDDEN SUITE INTEGRITY RATIO
                      </span>
                      <span className="font-code-snippet text-[11px] text-status-success">
                        +{report.metrics.playerIntegrityPercent - report.metrics.opponentIntegrityPercent}% Delta ({report.player.name})
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[12px] font-code-snippet">
                        <span className="text-status-success font-bold">
                          {report.player.name} (40/40 Complete)
                        </span>
                        <span className="text-status-success font-mono font-bold">
                          {report.metrics.playerIntegrityPercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-status-success rounded-full"
                          style={{ width: `${report.metrics.playerIntegrityPercent}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[12px] font-code-snippet mt-1">
                        <span className="text-status-failure font-medium">
                          {report.opponent.name} (37/40 - 3 Defects)
                        </span>
                        <span className="text-status-failure font-mono font-bold">
                          {report.metrics.opponentIntegrityPercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden border border-border-subtle/50">
                        <div
                          className="h-full bg-status-failure rounded-full"
                          style={{ width: `${report.metrics.opponentIntegrityPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Comparison Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-surface-2 border border-border-subtle p-3 rounded-lg flex flex-col">
                      <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                        Submissions
                      </span>
                      <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary mt-1 font-bold">
                        {report.metrics.playerAttempts}{" "}
                        <span className="text-text-muted text-[12px] font-normal">vs</span>{" "}
                        {report.metrics.opponentAttempts}
                      </span>
                      <span className="text-[10px] text-status-success font-code-snippet">
                        {report.player.name} -1 attempt
                      </span>
                    </div>
                    <div className="bg-surface-2 border border-border-subtle p-3 rounded-lg flex flex-col">
                      <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                        Wall Clock
                      </span>
                      <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary mt-1 font-bold">
                        {report.metrics.playerWallClock}{" "}
                        <span className="text-text-muted text-[12px] font-normal">vs</span>{" "}
                        {report.metrics.opponentWallClock}
                      </span>
                      <span className="text-[10px] text-text-muted font-code-snippet">
                        {report.opponent.name} faster
                      </span>
                    </div>
                    <div className="bg-surface-2 border border-border-subtle p-3 rounded-lg flex flex-col">
                      <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                        AST Depth
                      </span>
                      <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary mt-1 font-bold">
                        {report.metrics.playerAstDepth}{" "}
                        <span className="text-text-muted text-[12px] font-normal">vs</span>{" "}
                        {report.metrics.opponentAstDepth}
                      </span>
                      <span className="text-[10px] text-text-secondary font-code-snippet">
                        Simpler Tree
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION D: FULL MATCH CHRONOLOGICAL TIMELINE */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="timeline"
            >
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-space-sm">
                <div>
                  <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                    SECTION 04 // CLOCK SEQUENCE FORENSICS
                  </div>
                  <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                    Match Timeline Log
                  </h2>
                </div>
                <div className="font-code-snippet text-[11px] text-text-muted">
                  TOTAL TICKS: 409 SECONDS
                </div>
              </div>

              {/* Chronology Feed */}
              <div className="relative pl-6 sm:pl-8 flex flex-col gap-space-md before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-3">
                {report.timeline.map((event, idx) => {
                  const isVolt = event.badgeVariant === "volt";
                  const isSuccess = event.badgeVariant === "success";
                  const isSecondary = event.badgeVariant === "secondary";
                  const isWarning = event.badgeVariant === "warning";

                  return (
                    <div
                      key={idx}
                      className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-1 group rounded-lg transition-colors ${
                        isVolt
                          ? "bg-primary-container/10 p-2.5 -ml-2 border border-primary-container/20"
                          : isSecondary && event.badge === "LOCK_SUBMIT"
                          ? "bg-surface-2/60 p-2.5 -ml-2 border border-border-subtle"
                          : ""
                      }`}
                    >
                      <span
                        className={`absolute -left-6 sm:-left-8 top-2 w-2.5 h-2.5 rounded-full ring-4 ring-surface-1 ${
                          isVolt
                            ? "bg-primary-container"
                            : isSuccess
                            ? "bg-status-success"
                            : isSecondary
                            ? "bg-secondary"
                            : isWarning
                            ? "bg-status-warning"
                            : "bg-text-secondary"
                        }`}
                      ></span>

                      <div className="flex items-center gap-space-sm font-code-snippet">
                        <span
                          className={`font-mono font-bold text-[13px] ${
                            isVolt
                              ? "text-primary-container"
                              : isSuccess
                              ? "text-status-success"
                              : isSecondary
                              ? "text-secondary"
                              : isWarning
                              ? "text-status-warning"
                              : "text-text-secondary"
                          }`}
                        >
                          {event.tick}
                        </span>
                        <span className="text-text-primary font-medium">{event.title}</span>
                        <span className="text-text-muted text-[12px] hidden md:inline">
                          — {event.description}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-system-eyebrow uppercase font-bold px-2 py-0.5 rounded border ${
                          isVolt
                            ? "bg-primary-container/20 text-primary-container border-primary-container/40"
                            : isSuccess
                            ? "bg-status-success/20 text-status-success border-status-success/40"
                            : isSecondary
                            ? "bg-secondary/20 text-secondary border-secondary/40"
                            : isWarning
                            ? "bg-status-warning/20 text-status-warning border-status-warning/40"
                            : "bg-surface-2 text-text-muted border-border-subtle"
                        }`}
                      >
                        {event.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION E: ELO RATING & TIER PROGRESSION */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="elo-progression"
            >
              <div>
                <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                  SECTION 05 // COMPETITIVE RATING ENGINE
                </div>
                <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                  Elo Rating & Tier Progression
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                {/* Player Elo Movement */}
                <div className="lg:col-span-8 bg-surface-2 border border-border-subtle p-space-lg rounded-xl flex flex-col justify-between gap-space-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                    <div className="flex flex-col">
                      <span className="font-system-eyebrow text-[11px] text-text-muted uppercase">
                        CURRENT TIER
                      </span>
                      <span className="font-card-title text-card-title text-text-primary font-bold flex items-center gap-2">
                        <span>{report.eloProgression.currentTier}</span>
                        <span className="material-symbols-outlined text-primary-container text-[20px]">
                          military_tech
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <span className="text-[11px] font-system-eyebrow text-text-muted uppercase">
                          PRE-MATCH
                        </span>
                        <div className="font-mono-metric-sm text-text-secondary font-mono">
                          {report.player.eloPre.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-primary-container font-mono text-[20px] font-bold">
                        →
                      </span>
                      <div className="text-right">
                        <span className="text-[11px] font-system-eyebrow text-status-success uppercase font-bold">
                          +{report.player.eloDelta} DELTA
                        </span>
                        <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-mono font-bold">
                          {report.player.eloPost.toLocaleString()}{" "}
                          <span className="text-[14px] text-primary-container font-normal">
                            ELO
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar to Next Tier */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[12px] font-code-snippet">
                      <span className="text-text-secondary">
                        Progress to{" "}
                        <strong className="text-text-primary">
                          {report.eloProgression.targetTier}
                        </strong>
                      </span>
                      <span className="text-primary-container font-mono font-semibold">
                        {report.eloProgression.eloRemaining} ELO remaining
                      </span>
                    </div>
                    <div className="w-full h-3 bg-surface-3 rounded-full overflow-hidden relative border border-border-subtle/50">
                      <div
                        className="h-full bg-primary-container rounded-full transition-all duration-1000"
                        style={{ width: `${report.eloProgression.progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-text-muted">
                      <span>TIER II: 1,000</span>
                      <span className="text-text-primary font-bold">
                        CURRENT: {report.player.eloPost} ({report.eloProgression.progressPercent}%)
                      </span>
                      <span>TIER III: {report.eloProgression.targetElo}</span>
                    </div>
                  </div>

                  {/* Micro Rating History */}
                  <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 text-[12px] font-code-snippet text-text-secondary">
                    <span>
                      Last 5 Matches:{" "}
                      {report.eloProgression.lastFive.map((res, i) => (
                        <span key={i}>
                          <span
                            className={
                              res === "W"
                                ? "text-status-success font-bold"
                                : "text-status-failure font-bold"
                            }
                          >
                            {res}
                          </span>
                          {i < report.eloProgression.lastFive.length - 1 && " · "}
                        </span>
                      ))}{" "}
                      <span className="text-primary-container font-semibold">(LATEST)</span>
                    </span>
                    <span className="text-text-muted">
                      Win Probability Estimate: {report.eloProgression.winProbability}%
                    </span>
                  </div>
                </div>

                {/* Opponent Elo Movement */}
                <div className="lg:col-span-4 bg-surface-2 border border-border-subtle p-space-lg rounded-xl flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span className="font-system-eyebrow text-[11px] text-text-muted uppercase">
                      OPPONENT RATING UPDATE
                    </span>
                    <div className="font-card-title text-card-title text-text-primary font-bold">
                      {report.opponent.name}
                    </div>
                    <div className="font-code-snippet text-[12px] text-text-secondary mt-0.5">
                      Stack Hunter (Tier II)
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between my-space-md">
                    <div>
                      <span className="text-[10px] font-system-eyebrow text-text-muted uppercase">
                        PRE-MATCH
                      </span>
                      <div className="font-mono text-[16px] text-text-secondary">
                        {report.opponent.eloPre.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-system-eyebrow text-status-failure uppercase font-bold">
                        {report.opponent.eloDelta} DELTA
                      </span>
                      <div className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-mono font-bold">
                        {report.opponent.eloPost.toLocaleString()}{" "}
                        <span className="text-[14px] text-text-muted font-normal">ELO</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] font-code-snippet text-text-muted p-2 rounded bg-surface-3 border border-border-subtle">
                    Expected outcome deviation: -0.528. Match weight multiplier: K=
                    {report.eloProgression.kFactor}. Rating ledger fully reconciled.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION F: PRACTICE SIMILAR (TARGETED IMPROVEMENT DRILLS) */}
            <section
              className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col gap-space-md"
              id="drills"
            >
              <div>
                <div className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider">
                  SECTION 06 // IMPROVEMENT LAB
                </div>
                <h2 className="font-section-heading text-section-heading text-text-primary font-bold">
                  Practice Similar // Targeted Drills
                </h2>
                <p className="font-body-muted text-body-muted text-text-secondary mt-1">
                  Train on algorithmic patterns encountered in this clash to eliminate latency
                  bottlenecks and cement edge case verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                {report.drills.map((drill) => (
                  <div
                    key={drill.id}
                    className="bg-surface-2 border border-border-subtle rounded-xl p-space-md flex flex-col justify-between hover:bg-surface-3 hover:border-[#353E45] transition-all group"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded font-system-eyebrow text-[10px] font-bold uppercase border ${
                            drill.difficulty === "Hard"
                              ? "bg-status-failure/15 text-status-failure border-status-failure/30"
                              : "bg-status-warning/15 text-status-warning border-status-warning/30"
                          }`}
                        >
                          {drill.difficulty}
                        </span>
                        <span className="font-code-snippet text-[11px] text-text-muted">
                          Est. {drill.estMinutes} Min
                        </span>
                      </div>
                      <div className="font-card-title text-card-title text-text-primary font-bold group-hover:text-primary-container transition-colors">
                        {drill.title}
                      </div>
                      <p className="font-body-muted text-body-muted text-text-secondary text-[13px]">
                        {drill.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {drill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-code-snippet bg-[#050708] border border-border-subtle px-2 py-0.5 rounded text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/board/practice?drill=${drill.id}`}
                      className="mt-space-md w-full py-2.5 rounded bg-surface-1 hover:bg-primary-container hover:text-on-primary-container border border-border-subtle text-text-primary font-system-eyebrow text-[11px] tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>PRACTICE DRILL</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION G: FOOTER ACTIONS & CLOSING OPERATIONS */}
            <footer className="bg-surface-1 border border-border-subtle rounded-xl p-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <Link
                  className="inline-flex items-center gap-space-xs font-system-eyebrow text-system-eyebrow text-text-muted hover:text-text-primary transition-colors uppercase"
                  href="/board/matches"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>RETURN TO ARCHIVE</span>
                </Link>
                <span className="text-text-muted hidden sm:inline">|</span>
                <Link
                  className="font-code-snippet text-[12px] text-text-secondary hover:text-primary-container transition-colors flex items-center gap-1"
                  href={`/board/practice?problem=${report.targetProblem.id}`}
                >
                  <span>ORIGINAL PROBLEM SPEC</span>
                  <span className="material-symbols-outlined text-[13px]">north_east</span>
                </Link>
              </div>

              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRematch}
                  disabled={rematchRequested}
                  className="flex-1 sm:flex-initial px-space-lg py-3 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-system-eyebrow text-system-eyebrow tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">replay</span>
                  <span>
                    {rematchRequested
                      ? "DISPATCHING CHALLENGE..."
                      : "REQUEST REMATCH"}
                  </span>
                </button>
                <Link
                  href="/board/practice"
                  className="flex-1 sm:flex-initial px-space-lg py-3 rounded-lg bg-primary-container hover:bg-[#F0FF70] active:scale-[0.99] text-on-primary-container font-system-eyebrow text-system-eyebrow tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(228,255,63,0.25)]"
                >
                  <span>PRACTICE SIMILAR</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
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
