"use client";

import React, { useState, useMemo } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";
import MatchSummaryStrip from "@/components/matches/MatchSummaryStrip";
import MatchFiltersToolbar from "@/components/matches/MatchFiltersToolbar";
import MatchRow from "@/components/matches/MatchRow";
import MatchPagination from "@/components/matches/MatchPagination";
import MatchDetailModal from "@/components/matches/MatchDetailModal";
import {
  ALL_MATCHES_DATA,
  MATCHES_SUMMARY,
  SEASON_SUMMARY,
} from "@/lib/matches-data";
import { MatchRecord, MatchesFilterState } from "@/types/matches";

export default function MatchesPage() {
  // Filter and pagination state
  const [filters, setFilters] = useState<MatchesFilterState>({
    mode: "all",
    searchQuery: "",
    outcome: "all",
    difficulty: "all",
    runtime: "all",
    topic: "all",
    season: "S04",
    sortBy: "latest",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchRecord | null>(null);
  const [exportState, setExportState] = useState<"idle" | "packing" | "ready">("idle");
  const [footerExportState, setFooterExportState] = useState<string | null>(null);

  const pageSize = 15;

  // Filter updates handler
  const handleFilterChange = (newFilters: Partial<MatchesFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleResetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      outcome: "all",
      difficulty: "all",
      runtime: "all",
      topic: "all",
    }));
    setCurrentPage(1);
  };

  // Compute counts for mode tabs
  const counts = useMemo(() => {
    return {
      all: ALL_MATCHES_DATA.length,
      ranked: ALL_MATCHES_DATA.filter((m) => m.mode === "ranked").length,
      casual: ALL_MATCHES_DATA.filter((m) => m.mode === "casual").length,
      private: ALL_MATCHES_DATA.filter((m) => m.mode === "private").length,
      squad: ALL_MATCHES_DATA.filter((m) => m.mode === "squad").length,
    };
  }, []);

  // Filtered and sorted matches
  const filteredMatches = useMemo(() => {
    return ALL_MATCHES_DATA.filter((match) => {
      // Mode filter
      if (filters.mode !== "all" && match.mode !== filters.mode) {
        return false;
      }

      // Outcome filter
      if (filters.outcome !== "all") {
        if (filters.outcome === "win" && match.outcome !== "WIN") return false;
        if (filters.outcome === "loss" && match.outcome !== "LOSS") return false;
        if (filters.outcome === "draw" && match.outcome !== "DRAW") return false;
      }

      // Difficulty filter
      if (filters.difficulty !== "all") {
        if (match.problem.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) {
          return false;
        }
      }

      // Runtime filter
      if (filters.runtime !== "all") {
        if (match.runtime !== filters.runtime) return false;
      }

      // Topic filter
      if (filters.topic !== "all") {
        if (match.problem.topic !== filters.topic) return false;
      }

      // Search query (Opponent, Problem title, Match ID)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesOpponent =
          match.opponent.name.toLowerCase().includes(q) ||
          match.opponent.handle.toLowerCase().includes(q);
        const matchesTitle = match.problem.title.toLowerCase().includes(q);
        const matchesId = match.id.toLowerCase().includes(q);
        if (!matchesOpponent && !matchesTitle && !matchesId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "elo_delta") {
        return b.eloDelta - a.eloDelta;
      }
      if (filters.sortBy === "fastest") {
        return a.duration.localeCompare(b.duration);
      }
      if (filters.sortBy === "difficulty") {
        const order: Record<string, number> = { HARD: 3, MEDIUM: 2, EASY: 1 };
        return order[b.problem.difficulty] - order[a.problem.difficulty];
      }
      // "latest" uses original seed chronological order
      return 0;
    });
  }, [filters]);

  // Paginated slice
  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMatches.slice(start, start + pageSize);
  }, [filteredMatches, currentPage]);

  // Group paginated matches by groupLabel (maintaining chronological section dividers)
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: { label: string; matches: MatchRecord[] } } = {};
    for (const match of paginatedMatches) {
      if (!groups[match.groupLabel]) {
        groups[match.groupLabel] = {
          label: match.groupLabel,
          matches: [],
        };
      }
      groups[match.groupLabel].matches.push(match);
    }
    return Object.values(groups);
  }, [paginatedMatches]);

  // Header Export Button Action
  const handleExport = () => {
    setExportState("packing");
    setTimeout(() => {
      setExportState("ready");
      // Create and trigger download of JSON artifact
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(filteredMatches, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `codeclash-matches-${filters.season.toLowerCase()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setTimeout(() => {
        setExportState("idle");
      }, 2400);
    }, 800);
  };

  // Footer Artifact Export Action
  const handleFooterExport = (format: "json" | "csv") => {
    setFooterExportState(format);
    setTimeout(() => {
      let content = "";
      let filename = `codeclash-matches-${filters.season.toLowerCase()}.${format}`;
      let mimeType = "application/json";

      if (format === "json") {
        content = JSON.stringify(filteredMatches, null, 2);
      } else {
        mimeType = "text/csv";
        const headers = ["ID", "OUTCOME", "MODE", "OPPONENT", "PROBLEM", "DIFFICULTY", "RUNTIME", "DURATION", "TESTS_PASSED", "TESTS_TOTAL", "ELO_DELTA", "TIMESTAMP"];
        const rows = filteredMatches.map((m) => [
          m.id,
          m.outcome,
          m.mode,
          m.opponent.name,
          `"${m.problem.title.replace(/"/g, '""')}"`,
          m.problem.difficulty,
          m.runtime,
          m.duration,
          m.testsPassed,
          m.testsTotal,
          m.eloDelta,
          `"${m.timestamp}"`,
        ]);
        content = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setTimeout(() => setFooterExportState(null), 1500);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary font-body-default selection:bg-primary-container selection:text-surface-container-lowest antialiased flex flex-col">
      <DashboardHeader />

      <main className="w-full pt-14 pb-32 min-h-screen bg-surface-container-lowest flex-1 flex flex-col">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1720px] mx-auto flex flex-col gap-6 pt-4 pb-28">
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase tracking-wider">
                  MATCHES // COMPETITIVE RECORD
                </span>
                <span className="font-code-snippet text-code-snippet text-text-muted">
                  • LIVE REVISION 4.19
                </span>
              </div>
              <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-white tracking-tight leading-none">
                Matches
              </h1>
              <p className="font-body-default text-body-default text-text-secondary mt-1">
                Review your clashes, rating movement and post-match forensic reports.
              </p>
            </div>

            {/* Quick Actions / Season Status */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-1 border border-border-subtle">
                <span className="material-symbols-outlined text-sm text-primary-container">
                  shield
                </span>
                <span className="font-code-snippet text-code-snippet text-text-primary uppercase font-semibold">
                  Tier II Verified
                </span>
              </div>

              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-text-primary transition-all duration-150 cursor-pointer"
              >
                {exportState === "idle" && (
                  <>
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span className="font-code-snippet text-code-snippet uppercase">Export</span>
                  </>
                )}
                {exportState === "packing" && (
                  <>
                    <span className="material-symbols-outlined text-sm text-status-success animate-spin">
                      sync
                    </span>
                    <span className="font-code-snippet text-code-snippet text-status-success uppercase font-semibold">
                      PACKING...
                    </span>
                  </>
                )}
                {exportState === "ready" && (
                  <>
                    <span className="material-symbols-outlined text-sm text-status-success">
                      check
                    </span>
                    <span className="font-code-snippet text-code-snippet text-status-success uppercase font-semibold">
                      READY (69 KB)
                    </span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Competitive Summary Strip */}
          <MatchSummaryStrip summary={MATCHES_SUMMARY} />

          {/* Filter & Query Control Deck */}
          <MatchFiltersToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            counts={counts}
            isDrawerOpen={isDrawerOpen}
            onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
          />

          {/* Matches Stream */}
          <div className="w-full flex flex-col gap-6" id="matchListParent">
            {groupedMatches.length === 0 ? (
              <div className="w-full p-12 rounded bg-surface-1 border border-border-subtle flex flex-col items-center justify-center text-center gap-3">
                <span className="material-symbols-outlined text-4xl text-text-muted">
                  filter_alt_off
                </span>
                <span className="font-display-hero text-xl font-bold text-white">
                  No clashes match current criteria
                </span>
                <p className="font-body-muted text-sm text-text-secondary max-w-sm">
                  Try broadening your search keyword or clearing the outcome, runtime, or topic filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded bg-surface-2 hover:bg-surface-3 border border-border-subtle font-code-snippet text-xs text-primary-container cursor-pointer transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              groupedMatches.map((group) => (
                <div key={group.label} className="flex flex-col gap-2">
                  {/* Technical Divider Header */}
                  <div className="flex items-center gap-3 py-1">
                    <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase tracking-wider">
                      {group.label}
                    </span>
                    <div className="h-px bg-border-subtle flex-1"></div>
                    <span className="font-code-snippet text-system-eyebrow text-text-muted">
                      {group.matches.length} {group.matches.length === 1 ? "MATCH" : "MATCHES"} RECORDED
                    </span>
                  </div>

                  {/* Rows Container */}
                  <div className="flex flex-col rounded bg-surface-1 border border-border-subtle overflow-hidden">
                    {group.matches.map((match) => (
                      <MatchRow
                        key={match.id}
                        match={match}
                        onSelectMatch={(m) => setSelectedMatch(m)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <MatchPagination
            currentPage={currentPage}
            totalItems={filteredMatches.length}
            pageSize={pageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 380, behavior: "smooth" });
            }}
          />

          {/* Restrained Season Forensic Summary Box */}
          <footer className="w-full p-4 rounded bg-surface-1/60 border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 font-code-snippet text-[12px] text-text-muted">
              <span className="text-text-primary font-bold">
                {SEASON_SUMMARY.season} ARCHIVE SUMMARY //
              </span>
              <span>
                RANKED:{" "}
                <span className="text-text-primary font-medium">
                  {SEASON_SUMMARY.rankedRecord}
                </span>
              </span>
              <span>•</span>
              <span>
                PEAK ELO:{" "}
                <span className="text-text-primary font-medium">
                  {SEASON_SUMMARY.peakElo.toLocaleString()}
                </span>
              </span>
              <span>•</span>
              <span>
                BEST STREAK:{" "}
                <span className="text-status-success font-medium">
                  {SEASON_SUMMARY.bestStreak}
                </span>
              </span>
              <span>•</span>
              <span>
                MOST PLAYED:{" "}
                <span className="text-text-primary font-medium">
                  {SEASON_SUMMARY.mostPlayedRuntime}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                EXPORT ARTIFACTS:
              </span>
              <button
                type="button"
                onClick={() => handleFooterExport("json")}
                disabled={footerExportState !== null}
                className="px-2 py-0.5 rounded bg-surface-2 hover:bg-surface-3 border border-border-subtle font-code-snippet text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {footerExportState === "json" ? "PACKING..." : "JSON"}
              </button>
              <button
                type="button"
                onClick={() => handleFooterExport("csv")}
                disabled={footerExportState !== null}
                className="px-2 py-0.5 rounded bg-surface-2 hover:bg-surface-3 border border-border-subtle font-code-snippet text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                {footerExportState === "csv" ? "PACKING..." : "CSV"}
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Forensic Report Preview Modal */}
      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />

      {/* Floating Bottom Navigation */}
      <FloatingNav />
    </div>
  );
}
