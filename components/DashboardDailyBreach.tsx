"use client";

import React from "react";
import Link from "next/link";

export default function DashboardDailyBreach() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 relative overflow-hidden group shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="font-system-eyebrow text-[10px] text-secondary uppercase font-bold tracking-wider font-mono">
            DAILY BREACH // ROTATING PROTOCOL
          </span>
        </div>
        <span className="font-code-snippet text-xs text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20 font-mono">
          04:22:18
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-card-title text-base font-bold text-text-primary group-hover:text-secondary transition-colors">
          Zero-Knowledge Proof Merkle Sieve
        </h3>
        <p className="font-body-muted text-xs text-text-secondary leading-relaxed">
          Optimize dynamic branch pruning across a cryptographic binary tree under
          16MB allocation limit.
        </p>
      </div>

      <div className="flex items-center justify-between text-xs font-code-snippet pt-2 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="text-status-failure font-bold">Hard</span>
          <span className="text-text-muted">•</span>
          <span className="text-primary-container font-semibold">
            +50 XP / Exclusive Badge
          </span>
        </div>
      </div>

      <Link
        href="/board/arena"
        className="w-full py-2.5 bg-surface-2 hover:bg-surface-3 border border-secondary/40 hover:border-secondary text-secondary font-code-snippet text-xs font-bold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>ENGAGE BREACH</span>
        <span className="material-symbols-outlined text-[16px]">bolt</span>
      </Link>
    </div>
  );
}
