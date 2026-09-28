"use client";

import React from "react";
import Link from "next/link";

interface CompletionActionsProps {
  onStartPlacements?: () => void;
  onEnterPractice?: () => void;
  onGoToDashboard?: () => void;
}

export default function CompletionActions({
  onStartPlacements,
  onEnterPractice,
  onGoToDashboard,
}: CompletionActionsProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6">
      {/* Action 1: Ranked Placements (Dominant Volt CTA) */}
      <Link
        href="/board/arena"
        onClick={onStartPlacements}
        className="group relative flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-display-hero text-[15px] font-bold shadow-[0_0_20px_rgba(213,239,46,0.25)] hover:shadow-[0_0_28px_rgba(213,239,46,0.4)] hover:bg-primary-fixed-dim active:scale-[0.99] transition-all text-center"
      >
        <span className="tracking-wide">START PLACEMENTS</span>
        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
      </Link>

      {/* Action 2: Practice Arena (Secondary Surface) */}
      <Link
        href="/board/practice"
        onClick={onEnterPractice}
        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-surface-2 border border-border-subtle text-text-primary font-display-hero text-[15px] font-semibold shadow hover:bg-surface-3 hover:border-text-muted/30 transition-all text-center"
      >
        <span className="material-symbols-outlined text-[18px] text-text-secondary">
          code
        </span>
        <span className="tracking-wide">ENTER PRACTICE</span>
      </Link>

      {/* Action 3: Command Center Dashboard (Tertiary subtle link) */}
      <Link
        href="/board/dashboard"
        onClick={onGoToDashboard}
        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-1 border border-transparent hover:border-border-subtle font-display-hero text-[15px] font-medium transition-all text-center"
      >
        <span className="material-symbols-outlined text-[18px]">
          space_dashboard
        </span>
        <span>GO TO DASHBOARD</span>
      </Link>
    </div>
  );
}
