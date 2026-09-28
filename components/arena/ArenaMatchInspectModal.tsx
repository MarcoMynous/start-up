"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MatchRecord } from "@/types/matches";

interface ArenaMatchInspectModalProps {
  match: MatchRecord | null;
  onClose: () => void;
}

export default function ArenaMatchInspectModal({
  match,
  onClose,
}: ArenaMatchInspectModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"telemetry" | "code" | "suite">("telemetry");

  if (!match) return null;

  const isVictory = match.outcome === "WIN";

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
                isVictory ? "bg-status-success animate-pulse" : "bg-status-failure"
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
              <span>{copied ? "COPIED" : match.id}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-text-muted hover:text-white hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Hero Result Banner */}
        <div className="p-4 bg-surface-2 rounded-lg border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl font-mono ${
                isVictory
                  ? "bg-status-success/10 text-status-success border border-status-success/30"
                  : "bg-status-failure/10 text-status-failure border border-status-failure/30"
              }`}
            >
              {isVictory ? "W" : "L"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-card-title text-base font-bold text-text-primary">
                  {match.problem.title}
                </span>
                <span className="font-system-eyebrow text-[10px] px-1.5 py-0.5 rounded bg-surface-3 border border-border-subtle text-text-muted uppercase">
                  {match.problem.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-code-snippet text-text-secondary mt-0.5">
                <span>VS {match.opponent.name}</span>
                <span className="text-border-subtle">•</span>
                <span className="text-text-muted font-mono">{match.opponent.elo} ELO</span>
                <span className="text-border-subtle">•</span>
                <span>{match.mode.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:border-l sm:border-border-subtle sm:pl-4 self-end sm:self-center">
            <div className="text-right">
              <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
                ELO DELTA
              </span>
              <span
                className={`font-mono font-bold text-base ${
                  match.eloDelta > 0
                    ? "text-status-success"
                    : match.eloDelta < 0
                    ? "text-status-failure"
                    : "text-text-muted"
                }`}
              >
                {match.eloDelta > 0
                  ? `+${match.eloDelta} ELO`
                  : match.eloDelta < 0
                  ? `${match.eloDelta} ELO`
                  : "UNRATED"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-border-subtle">
          {[
            { id: "telemetry", label: "EXECUTION TELEMETRY" },
            { id: "suite", label: "EDGE TEST SUITE" },
            { id: "code", label: "FINAL SNAPSHOT" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              type="button"
              className={`pb-2.5 px-2 font-system-eyebrow text-xs tracking-wider border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-primary-container text-primary-container font-bold"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "telemetry" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-surface-2 rounded border border-border-subtle">
              <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
                RUNTIME
              </span>
              <span className="font-code-snippet font-bold text-text-primary text-sm">
                {match.runtime}
              </span>
              <span className="font-code-snippet text-[11px] text-secondary block mt-0.5">
                42ms (Top 12%)
              </span>
            </div>
            <div className="p-3 bg-surface-2 rounded border border-border-subtle">
              <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
                SOLVE DURATION
              </span>
              <span className="font-code-snippet font-bold text-text-primary text-sm font-mono">
                {match.duration}
              </span>
              <span className="font-code-snippet text-[11px] text-text-muted block mt-0.5">
                15m envelope
              </span>
            </div>
            <div className="p-3 bg-surface-2 rounded border border-border-subtle">
              <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
                TEST SUITE
              </span>
              <span className="font-code-snippet font-bold text-status-success text-sm font-mono">
                {match.testsPassed}/{match.testsTotal}
              </span>
              <span className="font-code-snippet text-[11px] text-text-muted block mt-0.5">
                100% Deterministic
              </span>
            </div>
            <div className="p-3 bg-surface-2 rounded border border-border-subtle">
              <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
                PEAK MEMORY
              </span>
              <span className="font-code-snippet font-bold text-text-primary text-sm font-mono">
                16.4 MB
              </span>
              <span className="font-code-snippet text-[11px] text-text-muted block mt-0.5">
                O(N) space profile
              </span>
            </div>
          </div>
        )}

        {activeTab === "suite" && (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {[
              { id: "TC-01", label: "Empty / Single Node boundary", time: "2ms", mem: "14.2MB", status: "PASS" },
              { id: "TC-02", label: "Cyclic Packet redundancy loop", time: "8ms", mem: "14.8MB", status: "PASS" },
              { id: "TC-03", label: "Disjoint forest components", time: "14ms", mem: "15.6MB", status: "PASS" },
              { id: "TC-04", label: "Stress N=100,000 dense adjacency", time: "28ms", mem: "16.4MB", status: "PASS" },
            ].map((tc) => (
              <div
                key={tc.id}
                className="p-2.5 bg-surface-2 rounded border border-border-subtle flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                  <span className="text-primary-container font-bold">{tc.id}</span>
                  <span className="text-text-secondary">{tc.label}</span>
                </div>
                <div className="flex items-center gap-3 text-text-muted">
                  <span>{tc.time}</span>
                  <span>{tc.mem}</span>
                  <span className="text-status-success font-bold font-system-eyebrow">
                    {tc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "code" && (
          <div className="p-3.5 bg-[#080A0B] rounded border border-border-subtle font-mono text-xs text-text-secondary max-h-56 overflow-y-auto leading-relaxed">
            <pre className="text-emerald-400"># Deterministic Graph Partitioning Solution</pre>
            <pre className="text-text-primary">
{`from collections import deque

def solve_packet_route(nodes: int, edges: list[tuple[int, int]]) -> int:
    adj = [[] for _ in range(nodes)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    
    visited = [False] * nodes
    cycles = 0
    # Topological validation with zero runtime overhead
    return max(len(comp) for comp in connected_components(adj))`}
            </pre>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
          <Link
            href={`/board/matches/${match.id}`}
            className="font-system-eyebrow text-xs text-primary-container hover:underline uppercase flex items-center gap-1"
          >
            <span>OPEN COMPLETE MATCH REPORT</span>
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </Link>

          <button
            onClick={onClose}
            type="button"
            className="h-9 px-4 rounded bg-surface-2 hover:bg-surface-3 text-text-primary font-body-default text-xs font-semibold border border-border-subtle transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
