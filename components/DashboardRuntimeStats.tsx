"use client";

import React from "react";

export default function DashboardRuntimeStats() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary text-[18px]">
            terminal
          </span>
          <h2 className="font-card-title text-card-title text-text-primary">
            Compiler Runtime Stats
          </h2>
        </div>
        <span className="font-system-eyebrow text-[10px] text-text-muted uppercase font-mono">
          TOP ENGINES
        </span>
      </div>

      <div className="flex flex-col gap-3 font-code-snippet text-xs">
        {/* Python */}
        <div className="bg-surface-2 p-3 rounded border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-bold text-text-primary">Python 3.12</span>
            </div>
            <span className="text-status-success font-bold">72% WR</span>
          </div>
          <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-[72%]"></div>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted font-mono">
            <span>148 Matches Played</span>
            <span>
              Avg Runtime:{" "}
              <span className="text-text-secondary font-semibold">42ms</span>
            </span>
          </div>
        </div>

        {/* C++20 */}
        <div className="bg-surface-2 p-3 rounded border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="font-bold text-text-primary">C++ 20 (Clang)</span>
            </div>
            <span className="text-status-success font-bold">63% WR</span>
          </div>
          <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full rounded-full w-[63%]"></div>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted font-mono">
            <span>38 Matches Played</span>
            <span>
              Avg Runtime:{" "}
              <span className="text-text-secondary font-semibold">12ms</span>
            </span>
          </div>
        </div>

        {/* Rust */}
        <div className="bg-surface-2 p-3 rounded border border-border-subtle flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
              <span className="font-bold text-text-primary">Rust 1.78</span>
            </div>
            <span className="text-text-primary font-bold">59% WR</span>
          </div>
          <div className="w-full bg-surface-3 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#f97316] h-full rounded-full w-[59%]"></div>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted font-mono">
            <span>22 Matches Played</span>
            <span>
              Avg Runtime:{" "}
              <span className="text-text-secondary font-semibold">9ms</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
