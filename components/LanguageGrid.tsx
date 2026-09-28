"use client";

import React from "react";
import { LanguageOption } from "@/lib/types";
import LanguageCard from "./LanguageCard";

interface LanguageGridProps {
  languages: LanguageOption[];
  selectedLangs: string[];
  primaryLang: string;
  onToggle: (id: string) => void;
}

export default function LanguageGrid({
  languages,
  selectedLangs,
  primaryLang,
  onToggle,
}: LanguageGridProps) {
  return (
    <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle flex flex-col gap-4">
      <div className="flex items-center justify-between font-mono text-[12px]">
        <span className="text-text-muted uppercase tracking-wider font-semibold">
          AVAILABLE ENVIRONMENTS (SELECT 1 TO 6)
        </span>
        <span className="text-primary-fixed font-bold bg-surface-2 px-2.5 py-0.5 rounded border border-border-subtle">
          {selectedLangs.length} LOADED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="language-grid">
        {languages.map((lang) => {
          const isSelected = selectedLangs.includes(lang.id);
          const isPrimary = primaryLang === lang.id;
          const slotIdx = selectedLangs.indexOf(lang.id);
          const slotNumber = slotIdx !== -1 ? slotIdx + 1 : null;

          return (
            <LanguageCard
              key={lang.id}
              lang={lang}
              isSelected={isSelected}
              isPrimary={isPrimary}
              slotNumber={slotNumber}
              onToggle={onToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
