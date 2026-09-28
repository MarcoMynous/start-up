"use client";

import React from "react";
import { MissionOption } from "@/lib/types";

interface MissionCardProps {
  option: MissionOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function MissionCard({
  option,
  isSelected,
  onSelect,
}: MissionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(option.id)}
      className={`mission-card text-left relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-200 outline-none shadow-md border ${
        isSelected
          ? "bg-surface-3 border-primary-fixed shadow-[0_0_24px_rgba(228,255,63,0.12)] bg-gradient-to-br from-surface-2 via-surface-2 to-surface-3"
          : "bg-surface-2 hover:bg-surface-3 border-border-subtle hover:border-[#353E45]"
      }`}
    >
      {/* Selected Indicator Badge */}
      {isSelected && (
        <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-fixed text-[#080A0B] font-mono text-[10.5px] font-bold tracking-wider shadow-md">
          <span className="material-symbols-outlined text-[14px] font-bold">check</span>
          <span>SELECTED</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div
          className="w-12 h-12 rounded-xl bg-surface-1 flex items-center justify-center shadow-inner border border-border-subtle"
          style={{ color: option.iconColor }}
        >
          <span className="material-symbols-outlined text-[26px]">
            {option.icon}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-card-title text-[20px] text-text-primary font-bold tracking-tight">
            {option.title}
          </span>
          <p className="font-body-muted text-body-muted text-text-secondary pr-2 leading-relaxed text-[14px]">
            {option.description}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3.5 flex items-center justify-between border-t border-border-subtle/50 font-mono text-[11.5px]">
        <span
          className={`px-2.5 py-1 rounded bg-surface-1 font-semibold tracking-wider ${
            isSelected ? "text-primary-fixed" : "text-text-secondary"
          }`}
        >
          {option.tag}
        </span>
        <span className="text-text-muted">{option.meta}</span>
      </div>
    </button>
  );
}
