"use client";

import React from "react";
import { CalibrationOption } from "@/lib/types";

interface CalibrationCardProps {
  option: CalibrationOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function CalibrationCard({
  option,
  isSelected,
  onSelect,
}: CalibrationCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option.id)}
      className={`calibration-card cursor-pointer p-5 sm:p-6 rounded-2xl transition-all duration-150 flex flex-col justify-between min-h-[160px] relative border shadow-sm ${
        isSelected
          ? "bg-surface-3 border-primary-fixed/80 shadow-[0_0_24px_rgba(228,255,63,0.12)]"
          : "bg-surface-2 hover:bg-surface-3 border-border-subtle hover:border-[#353E45]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className={`font-mono text-[11px] px-2.5 py-0.5 rounded uppercase tracking-wider font-semibold ${
              isSelected
                ? "bg-primary-fixed/20 text-primary-fixed font-bold border border-primary-fixed/30"
                : "bg-surface-1 text-text-muted"
            }`}
          >
            {option.tag}
          </span>
          <span
            className={`material-symbols-outlined text-[22px] ${
              isSelected ? "text-primary-fixed" : "text-text-muted opacity-30"
            }`}
            style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {isSelected ? "check_circle" : "radio_button_unchecked"}
          </span>
        </div>

        <h3 className="font-card-title text-[18px] sm:text-[20px] font-bold text-text-primary tracking-tight">
          {option.title}
        </h3>
        <p className="font-body-muted text-body-muted text-text-secondary mt-1 text-[13.5px] leading-relaxed">
          {option.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-2 border-t border-border-subtle/40">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isSelected ? "bg-primary-fixed shadow-[0_0_6px_rgba(228,255,63,0.8)]" : "bg-text-muted"
          }`}
        ></span>
        <span
          className={`font-mono text-[10.5px] tracking-wider uppercase font-semibold ${
            isSelected ? "text-primary-fixed" : "text-text-muted"
          }`}
        >
          {option.footerTag}
        </span>
      </div>
    </div>
  );
}
