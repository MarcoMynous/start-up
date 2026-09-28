"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardMatchmaking() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleQueue = () => {
    setIsSearching(true);
    setTimeout(() => {
      router.push("/board/arena");
    }, 800);
  };

  return (
    <div className="xl:col-span-4 bg-surface-1 border border-border-subtle hover:border-[#353E45] rounded-lg p-5 lg:p-6 flex flex-col justify-between gap-5 relative group transition-all duration-200 shadow-xl overflow-hidden">
      {/* Laser Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container to-transparent"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span className="font-code-snippet text-xs font-bold text-primary-container uppercase tracking-wider">
            RANKED MATCHMAKING
          </span>
        </div>
        <span className="font-system-eyebrow text-[10px] text-text-muted uppercase border border-border-subtle px-1.5 py-0.5 rounded bg-surface-2 font-mono">
          1v1 SYNC
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
          ACTIVE QUEUE MODE
        </span>
        <h2 className="font-code-snippet text-xl font-bold text-text-primary tracking-tight">
          STANDARD BREACH // 1v1
        </h2>
        <p className="font-body-muted text-xs text-text-secondary mt-0.5">
          Automated algorithmic duel under strict runtime profiling.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-surface-2 border border-border-subtle rounded p-3 text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            TIME LIMIT
          </span>
          <span className="font-code-snippet font-semibold text-text-primary">
            15 MIN DUAL
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            EST. QUEUE
          </span>
          <span className="font-code-snippet font-semibold text-secondary">
            00:08 SEC
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            STAKES
          </span>
          <span className="font-code-snippet font-semibold text-primary-fixed-dim">
            ±75 ELO DELTA
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
            ELO ENVELOPE
          </span>
          <span className="font-code-snippet font-semibold text-text-primary">
            1,200 – 1,320
          </span>
        </div>
      </div>

      <button
        onClick={handleQueue}
        disabled={isSearching}
        className="w-full h-12 bg-primary-container hover:bg-[#d4ef32] text-surface-container-lowest font-section-heading font-bold text-sm tracking-wider uppercase rounded transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(213,239,46,0.22)] active:scale-[0.99] disabled:opacity-80"
        type="button"
      >
        <span>{isSearching ? "CONNECTING TO LOBBY..." : "FIND OPPONENT"}</span>
        <span className="material-symbols-outlined text-[18px]">
          {isSearching ? "sync" : "arrow_forward"}
        </span>
      </button>
    </div>
  );
}
