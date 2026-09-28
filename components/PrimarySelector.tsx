"use client";

import React from "react";
import { LanguageOption } from "@/lib/types";

interface PrimarySelectorProps {
  languages: LanguageOption[];
  selectedLangs: string[];
  primaryLang: string;
  onSelectPrimary: (id: string) => void;
}

export default function PrimarySelector({
  languages,
  selectedLangs,
  primaryLang,
  onSelectPrimary,
}: PrimarySelectorProps) {
  const currentPrimaryObj =
    languages.find((l) => l.id === primaryLang) || languages[0];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-surface-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-inner border border-border-subtle">
      <div className="flex flex-col gap-1.5 max-w-lg">
        <div className="flex items-center gap-2 font-mono text-[11.5px]">
          <span className="font-bold tracking-widest text-primary-fixed uppercase">
            PRIMARY LANGUAGE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
          <span className="text-text-muted">ARENA INITIALIZER</span>
        </div>
        <h3 className="text-text-primary text-[19px] font-bold">
          Primary runtime profile
        </h3>
        <p className="text-text-secondary text-[14px]">
          Your primary language becomes the default editor runtime across all matches and drills.
        </p>
      </div>

      {/* Selector Dropdown Card */}
      <div className="flex items-center gap-4 bg-surface-1 px-5 py-3 rounded-xl shadow-sm border border-border-subtle w-full md:w-auto justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center text-primary-fixed border border-border-subtle">
            <span className="material-symbols-outlined text-[22px]">terminal</span>
          </div>
          <div className="flex flex-col font-mono">
            <div className="flex items-center gap-2">
              <select
                value={primaryLang}
                onChange={(e) => onSelectPrimary(e.target.value)}
                className="font-bold text-[18px] text-text-primary bg-transparent focus:outline-none cursor-pointer"
              >
                {selectedLangs.map((id) => {
                  const match = languages.find((l) => l.id === id);
                  return (
                    <option key={id} value={id} className="bg-surface-1 text-text-primary">
                      {match?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <span className="text-text-muted text-[11.5px]">
              {currentPrimaryObj.version} ({currentPrimaryObj.compiler})
            </span>
          </div>
        </div>

        <div className="flex items-center pl-2">
          <span className="px-2.5 py-1 rounded bg-primary-fixed/20 text-primary-fixed font-mono text-[11px] uppercase font-bold tracking-wider border border-primary-fixed/30">
            DEFAULT RUNTIME
          </span>
        </div>
      </div>
    </div>
  );
}
