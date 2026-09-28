"use client";

import React from "react";

export default function LoadoutHeader() {
  return (
    <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle">
      <div className="flex items-center gap-2 mb-2 font-mono text-[11.5px]">
        <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
        <span className="text-primary-fixed uppercase tracking-widest font-bold">
          04 — LOADOUT
        </span>
        <span className="text-text-muted font-mono">•</span>
        <span className="text-text-secondary uppercase">SYS_RUNTIME_PREFS</span>
      </div>
      <h1 className="text-text-primary tracking-tight font-bold text-[28px] sm:text-[32px] leading-tight">
        Choose your languages.
      </h1>
      <p className="text-text-secondary mt-1.5 text-[15px] leading-relaxed max-w-2xl">
        Select the languages you want available by default in Practice and Arena. You can add or reconfigure runtimes at any time during an active split.
      </p>
    </div>
  );
}
