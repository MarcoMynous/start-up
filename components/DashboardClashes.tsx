"use client";

import React from "react";
import Link from "next/link";

interface ClashRecord {
  id: string;
  outcome: "VICTORY" | "DEFEAT";
  opponent: string;
  opponentElo: number;
  challenge: string;
  difficulty: "Hard" | "Medium" | "Easy";
  runtime: string;
  duration: string;
  eloDelta: number;
}

const RECENT_CLASHES: ClashRecord[] = [
  {
    id: "#CC-8942",
    outcome: "VICTORY",
    opponent: "v0rtex_dev",
    opponentElo: 1260,
    challenge: "LRU Cache Eviction Matrix",
    difficulty: "Hard",
    runtime: "Python 3.12",
    duration: "07:14",
    eloDelta: 24,
  },
  {
    id: "#CC-8919",
    outcome: "VICTORY",
    opponent: "kaizen_99",
    opponentElo: 1235,
    challenge: "Subtree Isomorphism Validator",
    difficulty: "Medium",
    runtime: "Python 3.12",
    duration: "11:32",
    eloDelta: 19,
  },
  {
    id: "#CC-8890",
    outcome: "DEFEAT",
    opponent: "axion_root",
    opponentElo: 1310,
    challenge: "Parallel DAG Pipeline Optimizer",
    difficulty: "Hard",
    runtime: "Python 3.12",
    duration: "14:58",
    eloDelta: -21,
  },
  {
    id: "#CC-8874",
    outcome: "VICTORY",
    opponent: "0xNull",
    opponentElo: 1215,
    challenge: "Dynamic Memory Arena Allocator",
    difficulty: "Medium",
    runtime: "Python 3.12",
    duration: "06:45",
    eloDelta: 22,
  },
];

export default function DashboardClashes() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary text-[18px]">
            history
          </span>
          <h2 className="font-card-title text-card-title text-text-primary">
            Recent Clashes
          </h2>
        </div>
        <Link
          className="font-code-snippet text-xs text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors"
          href="/board/matches"
        >
          <span>EXPLORE ALL ARCHIVES (208)</span>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="border-b border-border-subtle font-system-eyebrow text-[10px] uppercase text-text-muted">
              <th className="py-2 px-3">OUTCOME / ID</th>
              <th className="py-2 px-3">OPPONENT</th>
              <th className="py-2 px-3">CHALLENGE & RUNTIME</th>
              <th className="py-2 px-3 text-right">ELO DELTA</th>
              <th className="py-2 px-3 text-right">TELEMETRY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle font-code-snippet text-code-snippet">
            {RECENT_CLASHES.map((clash) => {
              const isVictory = clash.outcome === "VICTORY";
              return (
                <tr
                  key={clash.id}
                  className="hover:bg-surface-2 transition-colors group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                          isVictory
                            ? "bg-status-success/10 text-status-success border-status-success/30"
                            : "bg-status-failure/10 text-status-failure border-status-failure/30"
                        }`}
                      >
                        {clash.outcome}
                      </span>
                      <span className="text-text-muted text-xs">{clash.id}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <span className="text-text-primary font-semibold group-hover:text-primary-container transition-colors">
                        {clash.opponent}
                      </span>
                      <span className="text-text-muted text-[11px]">
                        {clash.opponentElo} ELO
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <span className="text-text-primary truncate max-w-[200px]">
                        {clash.challenge}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-text-secondary mt-0.5">
                        <span
                          className={`font-medium ${
                            clash.difficulty === "Hard"
                              ? "text-status-failure"
                              : "text-status-warning"
                          }`}
                        >
                          {clash.difficulty}
                        </span>
                        <span>•</span>
                        <span>{clash.runtime}</span>
                        <span>•</span>
                        <span className="text-secondary">{clash.duration}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span
                      className={`font-bold text-sm ${
                        isVictory ? "text-status-success" : "text-status-failure"
                      }`}
                    >
                      {clash.eloDelta > 0 ? `+${clash.eloDelta}` : clash.eloDelta}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      className="px-2.5 py-1 rounded bg-surface-2 hover:bg-surface-3 border border-border-subtle text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                      type="button"
                    >
                      Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
