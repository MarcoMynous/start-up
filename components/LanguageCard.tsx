"use client";

import React from "react";
import { LanguageOption } from "@/lib/types";

interface LanguageCardProps {
  lang: LanguageOption;
  isSelected: boolean;
  isPrimary: boolean;
  slotNumber: number | null;
  onToggle: (id: string) => void;
}

export default function LanguageCard({
  lang,
  isSelected,
  isPrimary,
  slotNumber,
  onToggle,
}: LanguageCardProps) {
  return (
    <div
      onClick={() => onToggle(lang.id)}
      className={`lang-card relative rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[168px] shadow-sm group border ${
        isSelected
          ? "bg-surface-2 hover:bg-surface-3 border-primary-fixed/60 shadow-[0_0_20px_rgba(228,255,63,0.06)]"
          : "bg-surface-2/50 hover:bg-surface-2 border-border-subtle hover:border-[#353E45] opacity-80 hover:opacity-100"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-primary-fixed/[0.03] rounded-xl pointer-events-none"></div>
      )}

      {/* Top: Name & Badges */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[18px] font-bold tracking-tight ${
              isSelected ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
            }`}
          >
            {lang.name}
          </span>
          {isPrimary && (
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-[#080A0B] font-mono text-[10px] font-bold tracking-tight">
              PRIMARY
            </span>
          )}
        </div>

        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            isSelected
              ? "bg-primary-fixed text-[#080A0B]"
              : "bg-surface-3 text-transparent group-hover:text-text-muted"
          }`}
        >
          <span className="material-symbols-outlined text-[16px] font-bold">
            {isSelected ? "check" : "add"}
          </span>
        </div>
      </div>

      {/* Mid: Version & Compiler Flags */}
      <div className="flex flex-col gap-1.5 relative z-10 font-mono my-2">
        <span className={`text-[13px] ${isSelected ? "text-text-secondary" : "text-text-muted"}`}>
          {lang.version}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded bg-surface-1 text-text-muted uppercase">
            {lang.compiler}
          </span>
          <span
            className={`text-[11px] font-semibold flex items-center gap-1 ${
              lang.tagType === "success"
                ? "text-status-success"
                : isSelected
                ? "text-text-secondary"
                : "text-text-muted"
            }`}
          >
            {lang.tagType === "success" && (
              <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
            )}
            {lang.tag}
          </span>
        </div>
      </div>

      {/* Bottom: Memory & Slot Info */}
      <div className="pt-2 flex items-center justify-between font-mono text-[11px] text-text-muted relative z-10 bg-surface-1/40 px-2.5 py-1.5 rounded-lg border border-border-subtle/50">
        <span>BASE MEM: {lang.baseMem}</span>
        {isSelected && slotNumber !== null ? (
          <span className="text-primary-fixed font-bold">
            SLOT #0{slotNumber}
          </span>
        ) : (
          <span className="text-text-muted">AVAILABLE</span>
        )}
      </div>
    </div>
  );
}
