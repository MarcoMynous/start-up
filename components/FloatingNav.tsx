"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/board/dashboard", icon: "grid_view" },
  { id: "arena", label: "Arena", href: "/board/arena", icon: "swords" },
  { id: "matches", label: "Matches", href: "/board/matches", icon: "history" },
  { id: "rank", label: "Rank", href: "/board/rank", icon: "keyboard_double_arrow_up" },
  { id: "practice", label: "Practice", href: "/board/practice", icon: "terminal" },
  { id: "leaderboard", label: "Leaderboard", href: "/board/leaderboard", icon: "leaderboard" },
];

export default function FloatingNav() {
  const pathname = usePathname();

  const getIsActive = (item: NavItem) => {
    if (item.id === "dashboard") {
      return pathname === "/" || pathname === "/board/dashboard" || pathname.startsWith("/board/dashboard");
    }
    if (item.id === "practice") {
      return pathname.includes("/board/practice") || pathname.includes("/board/pratice");
    }
    return pathname.includes(`/board/${item.id}`);
  };

  return (
    <nav
      aria-label="Primary Operations"
      className="fixed bottom-[28px] left-1/2 -translate-x-1/2 z-50 h-[60px] px-2 flex items-center gap-1 bg-surface-1/90 backdrop-blur-xl border border-border-subtle rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = getIsActive(item);

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            data-path={item.id}
            className={`group relative flex items-center h-10 px-3 rounded-full transition-all duration-200 ease-out cursor-pointer select-none ${
              isActive
                ? "bg-primary-container text-surface-container-lowest font-bold shadow-[0_0_12px_rgba(228,255,63,0.25)]"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-2/80"
            }`}
          >
            <span className="material-symbols-outlined text-[20px] leading-none shrink-0 transition-transform duration-200 group-hover:scale-105">
              {item.icon}
            </span>
            <span className="inline-block overflow-hidden whitespace-nowrap text-[13px] font-medium tracking-wide max-w-0 opacity-0 -translate-x-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[120px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 group-focus-visible:max-w-[120px] group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:ml-2">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
