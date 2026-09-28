"use client";

import React from "react";
import Link from "next/link";

interface DrillItem {
  title: string;
  difficulty: "Hard" | "Medium" | "Easy";
  description: string;
  duration: string;
}

const DRILLS: DrillItem[] = [
  {
    title: "Dynamic Programming Relay",
    difficulty: "Medium",
    description:
      "Reinforce memoization lookup bounds before your next 1v1 queue.",
    duration: "~15 min duration",
  },
  {
    title: "B-Tree Node Balancing",
    difficulty: "Hard",
    description:
      "Rotations and balance factor constraints in self-balancing trees.",
    duration: "~25 min duration",
  },
  {
    title: "Sliding Window Maximum",
    difficulty: "Medium",
    description:
      "Monotonic deque pattern for linear runtime substring optimizations.",
    duration: "~10 min duration",
  },
];

export default function DashboardDrills() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary text-[18px]">
            target
          </span>
          <h3 className="font-card-title text-base font-bold text-text-primary">
            Recommended Drills
          </h3>
        </div>
        <span className="font-system-eyebrow text-[10px] text-text-muted uppercase font-mono">
          CURATED AI
        </span>
      </div>

      <div className="flex flex-col gap-3 font-code-snippet text-xs">
        {DRILLS.map((drill, idx) => (
          <Link
            key={idx}
            href="/board/practice"
            className="p-3 bg-surface-2 rounded border border-border-subtle flex flex-col gap-2 hover:border-[#353E45] transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-text-primary group-hover:text-primary-container transition-colors">
                {drill.title}
              </span>
              <span
                className={`font-semibold text-[11px] ${
                  drill.difficulty === "Hard"
                    ? "text-status-failure"
                    : "text-status-warning"
                }`}
              >
                {drill.difficulty}
              </span>
            </div>
            <p className="font-body-muted text-[11px] text-text-secondary leading-relaxed">
              {drill.description}
            </p>
            <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border-subtle/60 font-mono">
              <span>{drill.duration}</span>
              <span className="text-primary-container font-semibold group-hover:translate-x-0.5 transition-transform">
                Start Drill →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
