"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MatchRecord } from "@/types/matches";

interface MatchDetailModalProps {
  match: MatchRecord | null;
  onClose: () => void;
}

export default function MatchDetailModal({ match, onClose }: MatchDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!match) return null;

  const isVictory = match.outcome === "WIN";
  const isLoss = match.outcome === "LOSS";

  const handleCopyId = () => {
    navigator.clipboard?.writeText(match.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-1 border border-border-subtle rounded-xl p-6 sm:p-7 flex flex-col gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isVictory
                  ? "bg-status-success animate-pulse"
                  : isLoss
                  ? "bg-status-failure"
                  : "bg-secondary"
              }`}
            ></span>
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              FORENSIC TELEMETRY // MATCH #{match.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyId}
              className="px-2 py-1 rounded bg-surface-2 hover:bg-surface-3 border border-border-subtle font-code-snippet text-xs text-text-secondary hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">
                {copied ? "check" : "content_copy"}
              </span>
              <span>{copied ? "COPIED" : "COPY ID"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-text-muted hover:text-white hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Hero Outcome Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-surface-2 border border-border-subtle">
          <div className="flex flex-col gap-1">
            <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
              VERDICT
            </span>
            <span
              className={`font-mono-metric-lg text-2xl font-bold ${
                isVictory
                  ? "text-status-success"
                  : isLoss
                  ? "text-status-failure"
                  : "text-secondary"
              }`}
            >
              {match.outcome === "WIN"
                ? "VICTORY"
                : match.outcome === "LOSS"
                ? "DEFEAT"
                : "STALEMATE"}
            </span>
            <span className="font-code-snippet text-xs text-text-secondary">
              {match.mode.toUpperCase()} 1v1
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
              RATING DELTA
            </span>
            <span
              className={`font-mono-metric-lg text-2xl font-bold ${
                match.eloDelta > 0
                  ? "text-status-success"
                  : match.eloDelta < 0
                  ? "text-status-failure"
                  : "text-text-muted"
              }`}
            >
              {match.eloDelta > 0 ? `+${match.eloDelta}` : match.eloDelta} ELO
            </span>
            <span className="font-code-snippet text-xs text-text-muted">
              {match.timestamp}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
              EXECUTION DURATION
            </span>
            <span className="font-mono-metric-lg text-2xl font-bold text-text-primary">
              {match.duration}
            </span>
            <span className="font-code-snippet text-xs text-primary-container">
              {match.testsPassed}/{match.testsTotal} TESTS VERIFIED
            </span>
          </div>
        </div>

        {/* Problem & Opponent Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Opponent Card */}
          <div className="p-4 rounded bg-surface-container-lowest border border-border-subtle flex flex-col gap-2">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              OPPONENT DOSSIER
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-surface-3 flex items-center justify-center font-code-snippet text-sm font-bold text-text-primary border border-border-subtle shrink-0">
                {match.opponent.initials}
              </div>
              <div className="flex flex-col truncate">
                <span className="font-card-title text-base font-bold text-white truncate">
                  {match.opponent.name}
                </span>
                <span className="font-code-snippet text-xs text-text-muted">
                  {match.opponent.rankTitle} · {match.opponent.elo.toLocaleString()} ELO
                </span>
              </div>
            </div>
            <div className="mt-1 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-xs font-code-snippet text-text-secondary">
              <span>CLUSTER: US-EAST-1</span>
              <span>PING: 14ms</span>
            </div>
          </div>

          {/* Problem Card */}
          <div className="p-4 rounded bg-surface-container-lowest border border-border-subtle flex flex-col gap-2">
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              CHALLENGE SPECIFICATION
            </span>
            <div className="flex flex-col">
              <span className="font-body-default font-semibold text-white">
                {match.problem.title}
              </span>
              <span className="font-code-snippet text-xs text-text-muted">
                TAG: {match.problem.topic.toUpperCase()} // ID: #{match.problem.id}
              </span>
            </div>
            <div className="mt-1 pt-2 border-t border-border-subtle/50 flex items-center gap-2 font-code-snippet text-xs">
              <span className="text-text-muted">RUNTIME:</span>
              <span className="text-primary-container font-semibold">{match.runtime}</span>
              <span className="text-border-subtle">•</span>
              <span className="text-status-warning">{match.problem.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Test Matrix Simulation Bar */}
        <div className="flex flex-col gap-1.5 p-3 rounded bg-surface-2/60 border border-border-subtle">
          <div className="flex items-center justify-between font-code-snippet text-xs">
            <span className="text-text-secondary uppercase">TEST SUITE MATRIX ACCURACY</span>
            <span
              className={
                match.testsPassed === match.testsTotal
                  ? "text-status-success font-bold"
                  : "text-status-failure font-bold"
              }
            >
              {Math.round((match.testsPassed / match.testsTotal) * 100)}% SUCCESS RATE
            </span>
          </div>
          <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-status-success h-full transition-all duration-500"
              style={{
                width: `${(match.testsPassed / match.testsTotal) * 100}%`,
              }}
            ></div>
            {match.testsPassed < match.testsTotal && (
              <div
                className="bg-status-failure h-full"
                style={{
                  width: `${
                    ((match.testsTotal - match.testsPassed) / match.testsTotal) * 100
                  }%`,
                }}
              ></div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-border-subtle">
          <span className="font-code-snippet text-xs text-text-muted">
            ARTIFACT INTEGRITY: VERIFIED (SHA-256)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-surface-2 hover:bg-surface-3 text-text-secondary border border-border-subtle font-code-snippet text-xs font-semibold transition-colors cursor-pointer"
            >
              DISMISS
            </button>
            <Link
              href={`/board/matches/${match.id}`}
              className="px-4 py-2 rounded bg-primary-container hover:bg-[#F0FF70] text-surface-container-lowest font-code-snippet text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(228,255,63,0.2)]"
            >
              <span>FULL FORENSIC REPORT</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
