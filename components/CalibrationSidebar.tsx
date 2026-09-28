"use client";

import React from "react";

export default function CalibrationSidebar() {
  return (
    <div className="lg:col-span-5 bg-surface-1 rounded-2xl p-6 sm:p-8 xl:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-border-subtle">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col gap-6 relative z-10">
        {/* Eyebrow & Step Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
            <span className="text-[12.5px] uppercase text-text-primary tracking-widest font-mono font-bold">
              PLAYER SETUP
            </span>
          </div>
          <span className="text-[12px] text-primary-fixed bg-surface-2 px-3 py-1 rounded-lg border border-border-subtle font-mono font-bold">
            STEP 05 / 06
          </span>
        </div>

        {/* Panel Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[26px] sm:text-[28px] xl:text-[30px] text-text-primary tracking-tight font-bold">
            Onboarding Vector
          </h2>
          <p className="text-[14.5px] sm:text-[15px] text-text-secondary leading-relaxed">
            Initialize your competitive identity across the tactical cluster.
          </p>
        </div>

        {/* 6 Step Progression List */}
        <div className="flex flex-col gap-2.5 font-mono text-[13px]">
          {/* Step 01 - RESOLVED */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </span>
              <span className="text-text-secondary font-semibold">
                01 // VERIFY EMAIL
              </span>
            </div>
            <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
              RESOLVED
            </span>
          </div>

          {/* Step 02 - RESOLVED */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </span>
              <span className="text-text-secondary font-semibold">
                02 // IDENTITY
              </span>
            </div>
            <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
              RESOLVED
            </span>
          </div>

          {/* Step 03 - RESOLVED */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </span>
              <span className="text-text-secondary font-semibold">
                03 // AVATAR
              </span>
            </div>
            <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
              RESOLVED
            </span>
          </div>

          {/* Step 04 - RESOLVED */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </span>
              <span className="text-text-secondary font-semibold">
                04 // LOADOUT
              </span>
            </div>
            <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
              RESOLVED
            </span>
          </div>

          {/* Step 05 - ACTIVE (CALIBRATION) */}
          <div className="group flex items-center justify-between bg-surface-2 px-4 py-3.5 rounded-xl relative shadow-md border border-border-subtle">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-primary-fixed"></span>
              <span className="text-text-primary tracking-wider font-bold">
                05 // CALIBRATION
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
              <span className="text-[12px] text-primary-fixed uppercase tracking-wider font-bold">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Step 06 - LOCKED */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
              <span className="text-text-secondary">06 // MISSION</span>
            </div>
            <span className="text-[11.5px] text-text-muted uppercase">LOCKED</span>
          </div>
        </div>

        {/* Telemetry Progress Metric Ring */}
        <div className="bg-surface-2 p-5 sm:p-6 rounded-2xl flex items-center justify-between border border-border-subtle shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[11.5px] text-text-muted uppercase tracking-wider font-mono">
              PROTOCOL INTEGRITY
            </span>
            <span className="font-mono text-[20px] sm:text-[22px] text-text-primary font-bold">
              83.3% COMPLETE
            </span>
            <span className="font-mono text-text-secondary text-[12px]">
              EST_TIME: ~30s remaining
            </span>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 48 48">
              <circle
                className="text-surface-3 fill-none"
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-primary-fixed fill-none transition-all duration-500"
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeDasharray="125.6"
                strokeDashoffset="20.9"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute text-primary-fixed font-mono font-bold text-[13px]">
              5/6
            </span>
          </div>
        </div>
      </div>

      {/* Footnote Terminal Strip */}
      <div className="mt-8 pt-5 bg-surface-2/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 xl:-mx-9 xl:-mb-9 px-6 sm:px-8 xl:px-9 pb-6 sm:pb-8 xl:pb-9 flex flex-col gap-1.5 border-t border-border-subtle font-mono text-[11.5px]">
        <div className="flex items-center justify-between text-text-muted">
          <span>YOUR ELO IS EARNED IN MATCHES</span>
          <span className="text-text-primary font-semibold">v1.0.4-PROD</span>
        </div>
        <div className="flex items-center justify-between text-text-secondary">
          <span>SECURITY PROTOCOL: SHA-256</span>
          <span className="text-status-success flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
            NODE ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}
