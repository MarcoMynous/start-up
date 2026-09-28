"use client";

import React from "react";

export default function DashboardRankProgress() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px]">
            military_tech
          </span>
          <h2 className="font-card-title text-card-title text-text-primary">
            Rank Progression
          </h2>
        </div>
        <span className="font-code-snippet text-xs text-primary-fixed-dim font-semibold font-mono">
          SEASON 04
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            CURRENT DESIGNATION
          </span>
          <span className="font-code-snippet text-base font-bold text-text-primary">
            STACK HUNTER (Tier II)
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            NEXT TIER GOAL
          </span>
          <span className="font-code-snippet text-base font-bold text-secondary">
            NEURAL OPERATOR
          </span>
        </div>
      </div>

      {/* Precision Progress Bar with tick marks */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex justify-between text-xs font-code-snippet text-text-secondary">
          <span>1,248 ELO</span>
          <span className="text-secondary font-medium">
            152 ELO REMAINING (1,400 TIER)
          </span>
        </div>
        <div className="relative w-full bg-surface-2 h-3 rounded border border-border-subtle overflow-hidden">
          <div className="bg-gradient-to-r from-primary-fixed-dim to-secondary h-full rounded-sm w-[64%]"></div>
        </div>
        <div className="flex justify-between font-system-eyebrow text-[10px] text-text-muted px-0.5">
          <span>1,100</span>
          <span className="text-text-secondary font-semibold">1,200 (TIER II)</span>
          <span>1,300</span>
          <span className="text-secondary font-semibold">1,400 (TIER III)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-subtle text-xs">
        <div className="bg-surface-2 p-2.5 rounded border border-border-subtle flex flex-col">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            SEASON PEAK
          </span>
          <span className="font-code-snippet text-sm font-bold text-text-primary">
            1,310 ELO
          </span>
        </div>
        <div className="bg-surface-2 p-2.5 rounded border border-border-subtle flex flex-col">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            GLOBAL PERCENTILE
          </span>
          <span className="font-code-snippet text-sm font-bold text-status-success">
            TOP 4.8%
          </span>
        </div>
      </div>
    </div>
  );
}
