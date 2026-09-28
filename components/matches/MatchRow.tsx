"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MatchRecord } from "@/types/matches";

interface MatchRowProps {
  match: MatchRecord;
  onSelectMatch: (match: MatchRecord) => void;
}

export default function MatchRow({ match, onSelectMatch }: MatchRowProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 160);
    onSelectMatch(match);
  };

  // Outcome styling
  const outcomeConfig = {
    WIN: {
      badge: "bg-status-success/10 text-status-success border-status-success/30",
      dot: "bg-status-success",
      label: "WIN",
      deltaClass: "text-status-success",
      deltaText: `+${match.eloDelta} ELO`,
    },
    LOSS: {
      badge: "bg-status-failure/10 text-status-failure border-status-failure/30",
      dot: "bg-status-failure",
      label: "LOSS",
      deltaClass: "text-status-failure",
      deltaText: `${match.eloDelta} ELO`,
    },
    DRAW: {
      badge: "bg-secondary/10 text-secondary border-secondary/30",
      dot: "bg-secondary",
      label: "DRAW",
      deltaClass: "text-text-secondary",
      deltaText: "+0 ELO",
    },
  }[match.outcome];

  // Difficulty badge styling
  const difficultyBadgeClass = {
    EASY: "bg-status-success/10 text-status-success border-status-success/20",
    MEDIUM: "bg-status-warning/10 text-status-warning border-status-warning/20",
    HARD: "bg-status-failure/10 text-status-failure border-status-failure/20",
  }[match.problem.difficulty];

  // Mode badge styling
  const modeBadge = {
    ranked: {
      label: "RANKED",
      className: "bg-surface-2 text-primary-container border border-primary-container/20",
    },
    casual: {
      label: "CASUAL",
      className: "bg-surface-3 text-text-secondary border border-border-subtle",
    },
    private: {
      label: "PRIVATE",
      className: "bg-surface-3 text-text-secondary border border-border-subtle",
    },
    squad: {
      label: "SQUAD 3v3",
      className: "bg-secondary-container/20 text-secondary border border-secondary/30",
    },
  }[match.mode];

  // Topic or Mode Icon
  const getProblemIcon = () => {
    if (match.mode === "private") return "lock";
    if (match.mode === "squad") return "groups";
    if (match.outcome === "DRAW") return "balance";
    return "terminal";
  };

  const isFullTestsPassed = match.testsPassed === match.testsTotal;

  return (
    <article
      onClick={handleClick}
      data-match-id={match.id}
      data-mode={match.mode}
      data-opponent={match.opponent.name}
      data-title={match.problem.title}
      className={`match-row group flex flex-col lg:flex-row lg:items-center justify-between p-3.5 lg:px-4 lg:py-3 hover:bg-surface-2/70 transition-all duration-150 cursor-pointer select-none border-b border-border-subtle last:border-b-0 ${
        isClicked ? "bg-surface-3" : ""
      }`}
    >
      {/* Left (22%): Result & Opponent */}
      <div className="flex items-center gap-3 lg:w-[22%] shrink-0">
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-code-snippet font-bold border flex items-center gap-1 ${outcomeConfig.badge}`}
        >
          <span className={`w-1 h-1 rounded-full ${outcomeConfig.dot}`}></span>
          {outcomeConfig.label}
        </span>

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded bg-surface-3 flex items-center justify-center font-code-snippet text-xs font-bold text-text-primary border border-border-subtle shrink-0">
            {match.opponent.initials}
          </div>
          <div className="flex flex-col truncate">
            <span className="font-card-title text-body-default font-bold text-white group-hover:text-primary-container transition-colors truncate">
              {match.opponent.name}
            </span>
            <span className="font-code-snippet text-[11px] text-text-muted truncate">
              {match.opponent.rankTitle} · {match.opponent.elo.toLocaleString()} ELO
            </span>
          </div>
        </div>
      </div>

      {/* Center (44%): Problem details + badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 my-2 lg:my-0 lg:w-[44%] px-0 lg:px-3">
        <div className="flex items-center gap-2 truncate">
          <span className="material-symbols-outlined text-text-muted text-base">
            {getProblemIcon()}
          </span>
          <span className="font-body-default font-medium text-text-primary truncate">
            {match.problem.title}
          </span>
          <span className="font-code-snippet text-[11px] text-text-muted hidden xl:inline">
            #{match.problem.id}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <span
            className={`px-1.5 py-0.5 rounded font-system-eyebrow text-[10px] uppercase border ${difficultyBadgeClass}`}
          >
            {match.problem.difficulty}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded font-system-eyebrow text-[10px] uppercase ${modeBadge.className}`}
          >
            {modeBadge.label}
          </span>
          <span className="px-1.5 py-0.5 rounded font-code-snippet text-[10px] bg-surface-3 text-text-muted border border-border-subtle">
            {match.runtime}
          </span>
        </div>
      </div>

      {/* Right (34%): Performance telemetry + Action */}
      <div className="flex items-center justify-between lg:justify-end gap-4 lg:w-[34%] shrink-0 pt-2 lg:pt-0 border-t border-border-subtle/50 lg:border-t-0">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span
              className={`font-mono-metric-sm text-mono-metric-sm font-semibold ${
                match.outcome === "DRAW" ? "text-secondary" : "text-text-primary"
              }`}
            >
              {match.duration}
            </span>
            <span
              className={`font-code-snippet text-[11px] ${
                match.testsNote
                  ? "text-text-muted"
                  : isFullTestsPassed
                  ? "text-text-muted"
                  : "text-status-failure"
              }`}
            >
              {match.testsNote
                ? `${match.testsPassed}/${match.testsTotal} (${match.testsNote})`
                : `${match.testsPassed}/${match.testsTotal} tests`}
            </span>
          </div>

          <div className="flex flex-col items-end min-w-[70px]">
            <span
              className={`font-code-snippet text-code-snippet font-bold ${
                match.mode === "casual" || match.mode === "private"
                  ? "text-text-muted"
                  : outcomeConfig.deltaClass
              }`}
            >
              {match.mode === "casual" || match.mode === "private"
                ? "— UNRATED"
                : outcomeConfig.deltaText}
            </span>
            <span className="font-system-eyebrow text-[10px] text-text-muted">
              {match.timestamp}
            </span>
          </div>
        </div>

        <Link
          href={`/board/matches/${match.id}`}
          onClick={(e) => e.stopPropagation()}
          className="font-code-snippet text-system-eyebrow text-text-secondary group-hover:text-primary-container flex items-center gap-0.5 transition-all group-hover:translate-x-1 shrink-0 cursor-pointer"
        >
          REPORT <span className="material-symbols-outlined text-sm">chevron_right</span>
        </Link>
      </div>
    </article>
  );
}
