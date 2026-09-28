"use client";

import React from "react";

export default function RatingCalibrationCallout() {
  return (
    <div className="w-full bg-surface-1 border border-border-subtle rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border-subtle flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
          <span className="material-symbols-outlined text-primary-fixed text-[20px]">
            info
          </span>
        </div>
        <div>
          <h2 className="font-system-eyebrow text-[12px] uppercase text-primary-fixed font-bold tracking-wider mb-1 font-mono">
            YOUR RATING STARTS HERE
          </h2>
          <p className="font-body-muted text-[14px] leading-relaxed text-text-secondary max-w-2xl">
            Complete 3 placement matches to establish your first ranked Elo.
            Practice matches remain accessible at any time with zero rating
            volatility or ranking impact.
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-2 border border-border-subtle self-start sm:self-center font-code-snippet text-[12px] text-text-muted font-mono shadow-sm">
        <span className="material-symbols-outlined text-[15px] text-secondary">
          shield_lock
        </span>
        <span className="tracking-wide">PROVISIONAL SHIELD ACTIVE</span>
      </div>
    </div>
  );
}
