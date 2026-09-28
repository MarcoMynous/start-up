"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function DashboardProfileCard() {
  const [handle, setHandle] = useState<string>("NANO");
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0bv-NWLRJSBfmNH8w8bOmpJm3qOtQswcert4vqXK10ZLdf00Mc7tFJQ7pKB1pNBuQaOi4quxLXrSHiplhv9lijlxtWfjFO2tPFhv_w7dMwQpvgN48UI2t8-2ILZVHYFm_V0pTlxEctOqK-ixUtBwvmJNUA4aYHyLOrT80vqpfLm_QxiEoCPd1BN_GgKwBObEUc0GGDA3AgIUmgy7H4Zj1jeFKigCRy7WhahqD0FlfBbyH5xNmAZmodw"
  );
  const [primaryLang, setPrimaryLang] = useState<string>("PYTHON 3.12");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHandle = sessionStorage.getItem("codeclash_handle");
      const savedAvatar = sessionStorage.getItem("codeclash_avatar");
      const savedLang = sessionStorage.getItem("codeclash_primary_lang");

      if (savedHandle && savedHandle.trim()) setHandle(savedHandle.toUpperCase());
      if (savedAvatar) setAvatarSrc(savedAvatar);
      if (savedLang) {
        const langMap: Record<string, string> = {
          python: "PYTHON 3.12",
          typescript: "TYPESCRIPT 5.4",
          cpp: "C++ 20 (CLANG)",
          rust: "RUST 1.78",
          go: "GO 1.22",
          java: "JAVA 21",
        };
        setPrimaryLang(langMap[savedLang] || savedLang.toUpperCase());
      }
    }
  }, []);

  return (
    <div className="xl:col-span-8 bg-surface-1 border border-border-subtle rounded-lg p-5 lg:p-6 flex flex-col justify-between gap-6 relative overflow-hidden shadow-xl">
      {/* Ambient Carbon Substrate Gradient Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-fixed-dim/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Cybernetic Operator Avatar"
              className="w-16 h-16 rounded border border-border-subtle object-cover bg-surface-2"
              src={avatarSrc}
            />
            <div className="absolute -bottom-1.5 -right-1.5 px-1 py-0.5 bg-surface-3 border border-border-subtle text-[9px] font-system-eyebrow text-status-success font-bold uppercase rounded shadow-sm">
              LIVE
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-code-snippet text-lg font-bold text-text-primary tracking-wider">
                {handle}
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-fixed-dim/10 border border-primary-fixed-dim/30 text-[10px] font-system-eyebrow font-bold text-primary-fixed-dim tracking-wider uppercase">
                VERIFIED COMBATANT
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle text-[10px] font-system-eyebrow text-text-muted font-mono">
                ID: #CC-09418
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                TIER:
              </span>
              <span className="font-code-snippet text-base font-semibold text-text-primary uppercase tracking-wide">
                STACK HUNTER
              </span>
              <span className="text-text-muted">•</span>
              <span className="font-mono-metric-lg text-mono-metric-lg font-bold text-text-primary">
                1,248
              </span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                ELO
              </span>
              <span className="font-code-snippet text-xs text-status-success font-semibold px-1.5 py-0.5 rounded bg-status-success/10 border border-status-success/20">
                ↑ +42 THIS WEEK
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center sm:flex-col sm:items-end gap-1 font-code-snippet text-xs text-text-secondary shrink-0">
          <span className="text-text-muted font-system-eyebrow text-[11px] uppercase">
            RANKING POSITION
          </span>
          <span className="text-base font-bold text-text-primary font-mono-metric-sm">
            #1,842
          </span>
          <span className="text-[11px] text-text-muted">TOP 4.8% GLOBAL</span>
        </div>
      </div>

      {/* Badges & Telemetry Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
        <div className="bg-surface-2 border border-border-subtle rounded p-2.5 flex flex-col gap-1">
          <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
            GLOBAL POSITION
          </span>
          <span className="font-code-snippet text-sm font-bold text-text-primary">
            #1,842 GLOBAL
          </span>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded p-2.5 flex flex-col gap-1">
          <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
            PRIMARY WEAPON
          </span>
          <span className="font-code-snippet text-sm font-bold text-secondary">
            {primaryLang}
          </span>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded p-2.5 flex flex-col gap-1">
          <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
            MOMENTUM
          </span>
          <span className="font-code-snippet text-sm font-bold text-status-success">
            STREAK: 3 WINS
          </span>
        </div>
        <div className="bg-surface-2 border border-border-subtle rounded p-2.5 flex flex-col gap-1">
          <span className="font-system-eyebrow text-[10px] uppercase text-text-muted">
            SEASON CEILING
          </span>
          <span className="font-code-snippet text-sm font-bold text-primary-fixed-dim">
            PEAK: 1,310 ELO
          </span>
        </div>
      </div>

      {/* Micro-Telemetry Progress Bars */}
      <div className="pt-3 border-t border-border-subtle/80 flex flex-col sm:flex-row gap-4 justify-between items-center relative z-10 text-xs">
        <div className="w-full flex items-center gap-3">
          <span className="font-system-eyebrow text-[11px] text-text-muted uppercase shrink-0">
            EXEC TIME VELOCITY
          </span>
          <div className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden border border-border-subtle">
            <div className="bg-secondary h-full rounded-full w-[78%]"></div>
          </div>
          <span className="font-code-snippet text-xs text-text-secondary shrink-0 font-semibold">
            91.4% SPEED
          </span>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="font-system-eyebrow text-[11px] text-text-muted uppercase shrink-0">
            MEMORY EFFICIENCY
          </span>
          <div className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden border border-border-subtle">
            <div className="bg-status-success h-full rounded-full w-[84%]"></div>
          </div>
          <span className="font-code-snippet text-xs text-text-secondary shrink-0 font-semibold">
            88.2% PROF
          </span>
        </div>
      </div>
    </div>
  );
}
