"use client";

import React from "react";

export default function CalibrationHeader() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 font-mono text-[11.5px]">
        <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
        <span className="text-primary-fixed uppercase tracking-widest font-bold">
          05 — CALIBRATION
        </span>
        <span className="text-text-muted font-mono">•</span>
        <span className="text-text-secondary uppercase">DIFFICULTY HEURISTIC</span>
      </div>
      <h1 className="text-text-primary tracking-tight font-bold text-[28px] sm:text-[32px] leading-tight">
        How familiar are you with competitive coding?
      </h1>
      <p className="text-text-secondary text-[15px] leading-relaxed max-w-2xl">
        This only adjusts recommendations and onboarding depth. Your rating is earned in real matches.
      </p>
    </div>
  );
}
