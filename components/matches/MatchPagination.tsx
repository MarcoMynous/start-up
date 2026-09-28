"use client";

import React from "react";

interface MatchPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function MatchPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: MatchPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  // Generate page numbers with ellipsis if needed
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-t border-border-subtle pt-4">
      <div className="font-code-snippet text-code-snippet text-text-muted text-center sm:text-left">
        Showing{" "}
        <span className="text-text-primary font-semibold">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="text-text-primary font-semibold">{totalItems}</span> recorded clashes
      </div>

      {/* Tactical Pagination Engine */}
      <nav aria-label="Matches Archive Pagination" className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2.5 py-1.5 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-white font-code-snippet text-code-snippet uppercase transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          ← PREV
        </button>

        {getPageNumbers().map((p, idx) => {
          if (p === "ellipsis") {
            return (
              <span key={`ellipsis-${idx}`} className="font-code-snippet text-text-muted px-1">
                ...
              </span>
            );
          }
          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded font-code-snippet text-code-snippet transition-all cursor-pointer ${
                isCurrent
                  ? "bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_10px_rgba(228,255,63,0.3)]"
                  : "bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-white"
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages || totalItems === 0}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2.5 py-1.5 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-white font-code-snippet text-code-snippet uppercase transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          NEXT →
        </button>
      </nav>
    </section>
  );
}
