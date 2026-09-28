"use client";

import React from "react";

export default function MissionHeader() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 font-mono text-[11.5px]">
        <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
        <span className="text-primary-fixed uppercase tracking-widest font-bold">
          // 06 — MISSION
        </span>
        <span className="px-2 py-0.5 rounded bg-surface-2 text-text-secondary font-mono text-[10.5px] tracking-wider uppercase font-semibold border border-border-subtle">
          OPTIONAL
        </span>
      </div>
      <h1 className="text-text-primary tracking-tight font-bold text-[28px] sm:text-[34px] leading-tight">
        Why are you entering the Arena?
      </h1>
      <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl">
        We will use this to emphasize the most relevant parts of CodeClash.
      </p>
    </div>
  );
}
