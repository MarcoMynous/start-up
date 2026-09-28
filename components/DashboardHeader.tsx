"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardHeader() {
  const [handle, setHandle] = useState<string>("NANO");
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBCEE6wrLgG7JWX7bt7bYE-_iSbTIVTdo-QPOGzDm75ZvNs6a7kvPnnP5zKnqLxQ2VFSPLJQSmNLTtNWMiJoJJrDBzcLWe2ZMF5E-I-Sh63iXAHijkC67jrfI1KrDITOgjxzjJ3m5vbEiKHqMIjNw9K1wuSyv983TE7m4BocrM1o9ftG28IzMLsvssYnruGDBNJJqh7dej_eJQa9O7rOfyDlanQmrr4AzbgyssZtOfDIur-NePXzHOxAA"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHandle = sessionStorage.getItem("codeclash_handle");
      const savedAvatar = sessionStorage.getItem("codeclash_avatar");
      if (savedHandle && savedHandle.trim()) {
        setHandle(savedHandle.toUpperCase());
      }
      if (savedAvatar) {
        setAvatarSrc(savedAvatar);
      }
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-border-subtle">
      <div className="h-14 w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-space-md">
        {/* Left: Brand & Cluster Status */}
        <div className="flex items-center gap-space-md min-w-0">
          <Link
            className="flex items-center gap-space-sm shrink-0 group"
            data-path="dashboard"
            href="/board/dashboard"
          >
            <img
              alt="CodeClash Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
            />
            <span className="font-code-snippet text-code-snippet font-bold tracking-wider text-text-primary uppercase">
              CODECLASH
            </span>
          </Link>

          <div className="h-4 w-px bg-border-subtle hidden sm:block shrink-0"></div>

          <div className="hidden sm:flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse shrink-0"></span>
            <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted truncate">
              CLUSTER // US-EAST-1
            </span>
          </div>
        </div>

        {/* Right: Telemetry & Profile */}
        <div className="flex items-center gap-space-md shrink-0">
          {/* Health & Ping */}
          <div className="hidden lg:flex items-center gap-space-sm px-space-sm py-1 rounded bg-surface-1 border border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-status-success"></span>
            <span className="font-code-snippet text-code-snippet text-text-secondary">
              99.98% HEALTHY
            </span>
            <span className="text-border-subtle">•</span>
            <span className="font-code-snippet text-code-snippet text-text-muted">
              14ms
            </span>
          </div>

          {/* Quick Search Trigger */}
          <button
            className="hidden md:flex items-center gap-space-sm px-space-sm py-1 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm leading-none">
              search
            </span>
            <span className="font-code-snippet text-code-snippet text-text-muted">
              Ctrl + K
            </span>
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative p-1.5 rounded text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl leading-none">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-container rounded-full ring-2 ring-surface-container-lowest"></span>
          </button>

          <div className="h-5 w-px bg-border-subtle"></div>

          {/* Profile Badge */}
          <div className="flex items-center gap-space-sm">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-border-subtle"
                src={avatarSrc}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-status-success border-2 border-surface-container-lowest rounded-full"></span>
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="font-code-snippet text-code-snippet font-bold text-text-primary leading-none">
                {handle}
              </span>
              <span className="font-system-eyebrow text-system-eyebrow uppercase text-primary-fixed-dim text-[10px] leading-tight">
                STACK HUNTER
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
