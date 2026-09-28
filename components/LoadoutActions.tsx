"use client";

import React from "react";
import Link from "next/link";

interface LoadoutActionsProps {
  isSubmitting: boolean;
  onContinue: () => void;
  onSkip: () => void;
}

export default function LoadoutActions({
  isSubmitting,
  onContinue,
  onSkip,
}: LoadoutActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <Link
        href="/onboarding/avatar"
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary font-mono text-[13px] transition-all duration-200 border border-border-subtle cursor-pointer font-semibold flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">west</span>
        <span>BACK</span>
      </Link>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex flex-col items-center sm:items-end">
          <button
            type="button"
            onClick={onSkip}
            className="text-text-muted hover:text-text-secondary font-mono text-[11.5px] uppercase tracking-wider py-1 cursor-pointer transition-colors"
          >
            SKIP FOR NOW
          </button>
          <span className="font-mono text-text-muted/60 text-[10.5px]">
            Defaults to Python
          </span>
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-fixed text-[#080A0B] font-bold text-[14px] font-mono shadow-[0_0_24px_rgba(228,255,63,0.3)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2.5 hover:brightness-105"
        >
          <span>{isSubmitting ? "SAVING LOADOUT..." : "CONTINUE"}</span>
          <span className="material-symbols-outlined text-[20px] font-bold">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
