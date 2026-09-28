"use client";

import React from "react";
import { TelemetryProfile } from "@/lib/types";

interface DiagnosticTelemetryLogProps {
  profile: TelemetryProfile;
}

export default function DiagnosticTelemetryLog({
  profile,
}: DiagnosticTelemetryLogProps) {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Console Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle/50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary-fixed">
            terminal
          </span>
          <span className="font-system-eyebrow text-[11px] text-text-muted uppercase tracking-wider font-mono">
            DIAGNOSTIC TELEMETRY LOG
          </span>
        </div>
        <span className="font-code-snippet text-[12px] text-status-success uppercase font-mono flex items-center gap-1.5 font-semibold">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
          ALL SYSTEMS GO
        </span>
      </div>

      {/* Telemetry Data Rows */}
      <div className="font-code-snippet text-[13px] text-text-secondary font-mono space-y-2 py-1">
        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">IDENTITY ............</span>
          <span className="text-status-success font-semibold flex items-center gap-1">
            VERIFIED{" "}
            <span className="material-symbols-outlined text-[14px] text-status-success">
              check
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">HANDLE ..............</span>
          <span className="text-text-primary font-bold tracking-wide">
            {profile.handle}
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">AVATAR ..............</span>
          <span className="text-secondary font-medium">
            LOADED [{profile.avatarHash}]
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">PRIMARY RUNTIME .....</span>
          <span className="text-primary-fixed font-medium">
            {profile.primaryRuntime}
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">EXPERIENCE ..........</span>
          <span className="text-text-primary uppercase">
            {profile.experience}
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">MISSION .............</span>
          <span className="text-text-primary font-medium uppercase">
            {profile.mission}
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">MATCHMAKING .........</span>
          <span className="text-status-success font-semibold">
            READY [PING: {profile.ping}]
          </span>
        </div>

        <div className="flex items-center justify-between hover:bg-surface-2/60 px-2 py-1 rounded transition-colors">
          <span className="text-text-muted select-none">RATING ..............</span>
          <span className="text-status-warning font-semibold">
            {profile.ratingTier}
          </span>
        </div>
      </div>

      {/* Milestone Banner */}
      <div className="mt-5 pt-2">
        <div className="bg-surface-2/90 border border-border-subtle rounded-lg px-4 py-3 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed text-[18px]">
              verified_user
            </span>
            <span className="font-system-eyebrow text-primary-fixed text-[11px] font-bold tracking-widest uppercase font-mono">
              ARENA ACCESS GRANTED
            </span>
          </div>
          <span className="font-code-snippet text-text-muted font-mono text-[11px]">
            CERT: #8849-01
          </span>
        </div>
      </div>
    </div>
  );
}
