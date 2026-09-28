"use client";

import React from "react";
import Image from "next/image";
import { TelemetryProfile } from "@/lib/types";

interface PlayerDossierCardProps {
  profile: TelemetryProfile;
}

export default function PlayerDossierCard({ profile }: PlayerDossierCardProps) {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-system-eyebrow text-[11px] text-text-muted uppercase tracking-widest font-mono">
            // PLAYER DOSSIER
          </span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-system-eyebrow uppercase bg-status-warning/15 text-status-warning tracking-wide font-mono border border-status-warning/30 font-semibold">
            UNRANKED
          </span>
        </div>

        {/* Avatar & Identity Strip */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center overflow-hidden shrink-0 shadow-inner group">
            {profile.avatarSrc ? (
              <Image
                src={profile.avatarSrc}
                alt={profile.handle}
                width={64}
                height={64}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <svg
                className="w-10 h-10 text-primary-fixed"
                fill="none"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  height="24"
                  rx="2"
                  stroke="currentColor"
                  strokeDasharray="2 2"
                  strokeWidth="2"
                  width="24"
                  x="8"
                  y="8"
                />
                <path
                  d="M14 20L20 14L26 20L20 26L14 20Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" fill="currentColor" r="3" />
              </svg>
            )}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-primary-fixed"></div>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-card-title text-[18px] md:text-[20px] text-text-primary tracking-tight font-bold truncate">
              {profile.handle}
            </span>
            <span className="font-code-snippet text-[12px] text-text-muted font-mono">
              UID: {profile.uid}
            </span>
            <span className="font-code-snippet text-[12px] text-secondary font-mono mt-0.5">
              {profile.primaryRuntime}
            </span>
          </div>
        </div>

        {/* Rating & Placements Detail Box */}
        <div className="space-y-3 bg-surface-2/70 border border-border-subtle/70 p-3.5 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <span className="font-system-eyebrow text-[11px] text-text-muted uppercase font-mono">
              RATING TIER
            </span>
            <span className="font-mono-metric-sm text-[16px] text-text-primary font-mono font-bold tracking-tight">
              {profile.ratingTier}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-system-eyebrow text-[11px] text-text-muted uppercase font-mono">
              PLACEMENTS
            </span>
            <span className="font-code-snippet text-[12px] text-text-primary font-mono font-bold">
              {profile.placementsDone} / {profile.placementsTotal} COMPLETED
            </span>
          </div>

          {/* 3 Segmented Indicator Pips */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {Array.from({ length: profile.placementsTotal }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded border flex items-center justify-center relative overflow-hidden transition-all ${
                  idx < profile.placementsDone
                    ? "bg-primary-fixed border-primary-fixed"
                    : "bg-surface-3 border-border-subtle/80"
                }`}
              >
                <span className="sr-only">
                  Match {idx + 1} {idx < profile.placementsDone ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Telemetry Signal Footer inside Player Card */}
      <div className="flex items-center justify-between text-text-muted font-code-snippet text-[12px] pt-2 border-t border-border-subtle/50 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
          CLUSTER {profile.cluster}
        </span>
        <span className="text-text-muted hover:text-text-secondary transition-colors">
          EST. ELO: ~1500?
        </span>
      </div>
    </div>
  );
}
