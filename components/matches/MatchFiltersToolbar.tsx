"use client";

import React, { useRef, useEffect } from "react";
import { MatchMode, MatchesFilterState } from "@/types/matches";

interface MatchFiltersToolbarProps {
  filters: MatchesFilterState;
  onFilterChange: (filters: Partial<MatchesFilterState>) => void;
  onResetFilters: () => void;
  counts: {
    all: number;
    ranked: number;
    casual: number;
    private: number;
    squad: number;
  };
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

export default function MatchFiltersToolbar({
  filters,
  onFilterChange,
  onResetFilters,
  counts,
  isDrawerOpen,
  onToggleDrawer,
}: MatchFiltersToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute active extra filters count (in drawer)
  const activeExtraFiltersCount = [
    filters.outcome !== "all",
    filters.difficulty !== "all",
    filters.runtime !== "all",
    filters.topic !== "all",
  ].filter(Boolean).length;

  const modeButtons: { mode: MatchMode | "all"; label: string; count: number }[] = [
    { mode: "all", label: "ALL MATCHES", count: counts.all },
    { mode: "ranked", label: "RANKED", count: counts.ranked },
    { mode: "casual", label: "CASUAL", count: counts.casual },
    { mode: "private", label: "PRIVATE", count: counts.private },
    { mode: "squad", label: "SQUAD", count: counts.squad },
  ];

  return (
    <section className="flex flex-col gap-3">
      {/* Top Pills: Mode selectors & Telemetry Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-1 rounded border border-border-subtle">
          {modeButtons.map((btn) => {
            const isActive = filters.mode === btn.mode;
            return (
              <button
                key={btn.mode}
                type="button"
                onClick={() => onFilterChange({ mode: btn.mode })}
                className={`px-3 py-1.5 rounded font-code-snippet text-code-snippet transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-surface-3 text-primary-container font-bold border border-primary-container/30 shadow-[0_0_10px_rgba(228,255,63,0.15)]"
                    : "text-text-secondary hover:text-white hover:bg-surface-2"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                )}
                <span>{btn.label}</span>
                <span className={isActive ? "text-text-secondary font-normal" : "text-text-muted"}>
                  ({btn.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Telemetry Sync Tag */}
        <div className="hidden lg:flex items-center gap-2 font-code-snippet text-code-snippet text-text-muted">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
          <span>DATA ARTIFACTS SYNCED: 100% PASS</span>
        </div>
      </div>

      {/* Search and Dropdown Controls Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* Integrated Search Bar */}
        <div className="md:col-span-6 lg:col-span-7 relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-text-muted text-lg pointer-events-none">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search opponent, problem or match ID (e.g. CC-10482)..."
            className="w-full h-11 pl-10 pr-12 rounded bg-surface-1 border border-border-subtle text-text-primary placeholder:text-text-muted font-body-default text-body-default focus:outline-none focus:border-primary-container transition-colors"
          />
          {filters.searchQuery ? (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute right-3 p-1 text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          ) : (
            <kbd className="absolute right-3 px-1.5 py-0.5 rounded bg-surface-2 border border-border-subtle font-code-snippet text-system-eyebrow text-text-muted pointer-events-none">
              /
            </kbd>
          )}
        </div>

        {/* Filters Toggle Button */}
        <div className="md:col-span-2 relative">
          <button
            type="button"
            onClick={onToggleDrawer}
            className={`w-full h-11 px-3 rounded bg-surface-1 hover:bg-surface-2 border transition-colors cursor-pointer flex items-center justify-between text-text-primary ${
              isDrawerOpen || activeExtraFiltersCount > 0
                ? "border-primary-container/40 text-primary-container bg-surface-2"
                : "border-border-subtle"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-text-secondary">
                tune
              </span>
              <span className="font-code-snippet text-code-snippet uppercase font-medium">
                FILTERS
              </span>
            </div>
            <span
              className={`font-code-snippet text-[11px] px-1.5 py-0.5 rounded border ${
                activeExtraFiltersCount > 0
                  ? "bg-primary-container text-surface-container-lowest font-bold border-primary-container"
                  : "bg-surface-3 text-text-muted border-border-subtle"
              }`}
            >
              {activeExtraFiltersCount}
            </span>
          </button>
        </div>

        {/* Season Selector Dropdown */}
        <div className="md:col-span-2 relative">
          <select
            value={filters.season}
            onChange={(e) => onFilterChange({ season: e.target.value })}
            className="w-full h-11 px-3 pr-8 rounded bg-surface-1 border border-border-subtle text-text-primary font-code-snippet text-code-snippet focus:outline-none focus:border-primary-container appearance-none cursor-pointer"
          >
            <option value="S04">SEASON 04 (ACTIVE)</option>
            <option value="S03">SEASON 03 (ARCHIVE)</option>
            <option value="S02">SEASON 02 (ARCHIVE)</option>
            <option value="S01">SEASON 01 (ARCHIVE)</option>
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-3 text-text-muted pointer-events-none text-base">
            expand_more
          </span>
        </div>

        {/* Sort Control Dropdown */}
        <div className="md:col-span-2 lg:col-span-1 relative">
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as MatchesFilterState["sortBy"],
              })
            }
            className="w-full h-11 px-3 pr-8 rounded bg-surface-1 border border-border-subtle text-text-primary font-code-snippet text-code-snippet focus:outline-none focus:border-primary-container appearance-none cursor-pointer"
          >
            <option value="latest">LATEST ↓</option>
            <option value="elo_delta">ELO Δ</option>
            <option value="fastest">TIME ↑</option>
            <option value="difficulty">TIER</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-3 text-text-muted pointer-events-none text-base">
            sort
          </span>
        </div>
      </div>

      {/* Quick Filter Drawer (Toggleable) */}
      {isDrawerOpen && (
        <div className="p-4 rounded bg-surface-1 border border-border-subtle grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-200">
          <div className="flex flex-col gap-1.5">
            <label className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
              Result State
            </label>
            <select
              value={filters.outcome}
              onChange={(e) =>
                onFilterChange({
                  outcome: e.target.value as MatchesFilterState["outcome"],
                })
              }
              className="w-full h-9 px-2 rounded bg-surface-2 border border-border-subtle font-code-snippet text-code-snippet text-text-primary focus:outline-none focus:border-primary-container cursor-pointer"
            >
              <option value="all">All Outcomes</option>
              <option value="win">Victories (Win)</option>
              <option value="loss">Defeats (Loss)</option>
              <option value="draw">Ties (Draw)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
              Difficulty Tier
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) =>
                onFilterChange({
                  difficulty: e.target.value as MatchesFilterState["difficulty"],
                })
              }
              className="w-full h-9 px-2 rounded bg-surface-2 border border-border-subtle font-code-snippet text-code-snippet text-text-primary focus:outline-none focus:border-primary-container cursor-pointer"
            >
              <option value="all">All Complexities</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
              Language Runtime
            </label>
            <select
              value={filters.runtime}
              onChange={(e) => onFilterChange({ runtime: e.target.value })}
              className="w-full h-9 px-2 rounded bg-surface-2 border border-border-subtle font-code-snippet text-code-snippet text-text-primary focus:outline-none focus:border-primary-container cursor-pointer"
            >
              <option value="all">All Runtimes</option>
              <option value="PYTHON 3.12">Python 3.12</option>
              <option value="RUST 1.76">Rust 1.76</option>
              <option value="C++ 20">C++ 20</option>
              <option value="GO 1.22">Go 1.22</option>
              <option value="TS 5.4">TypeScript 5.4</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted">
                Data Structure Topic
              </label>
              {activeExtraFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="font-code-snippet text-[11px] text-primary-container hover:underline cursor-pointer"
                >
                  RESET
                </button>
              )}
            </div>
            <select
              value={filters.topic}
              onChange={(e) => onFilterChange({ topic: e.target.value })}
              className="w-full h-9 px-2 rounded bg-surface-2 border border-border-subtle font-code-snippet text-code-snippet text-text-primary focus:outline-none focus:border-primary-container cursor-pointer"
            >
              <option value="all">All Topics</option>
              <option value="graphs">Graphs & Trees</option>
              <option value="dp">Dynamic Programming</option>
              <option value="memory">Bitwise & Memory</option>
              <option value="strings">Sliding Window & Strings</option>
            </select>
          </div>
        </div>
      )}
    </section>
  );
}
