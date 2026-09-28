"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";
import DashboardProfileCard from "@/components/DashboardProfileCard";
import DashboardMatchmaking from "@/components/DashboardMatchmaking";
import DashboardPulse from "@/components/DashboardPulse";
import DashboardClashes from "@/components/DashboardClashes";
import DashboardEloChart from "@/components/DashboardEloChart";
import DashboardRankProgress from "@/components/DashboardRankProgress";
import DashboardRuntimeStats from "@/components/DashboardRuntimeStats";
import DashboardDailyBreach from "@/components/DashboardDailyBreach";
import DashboardAuditLog from "@/components/DashboardAuditLog";
import DashboardDrills from "@/components/DashboardDrills";
import DashboardRivals from "@/components/DashboardRivals";

export default function DashboardPage() {
  const [telemetryExported, setTelemetryExported] = useState(false);

  const handleExportTelemetry = () => {
    setTelemetryExported(true);
    setTimeout(() => setTelemetryExported(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary selection:bg-primary-container selection:text-surface-container-lowest antialiased flex flex-col">
      {/* 1. FIXED TOP HEADER */}
      <DashboardHeader />

      {/* 2. MAIN WORKSPACE */}
      <main className="w-full pt-14 pb-28 min-h-screen bg-surface-container-lowest flex-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 pb-28 flex flex-col gap-6">
          {/* DASHBOARD HERO HEADER */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border-subtle">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-status-success animate-ping"></span>
                <span className="inline-block -ml-3.5 w-2 h-2 rounded-full bg-status-success"></span>
                <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted tracking-wider font-mono">
                  PLAYER // COMMAND CENTER // US-EAST-1
                </span>
              </div>
              <h1 className="font-display-hero text-[40px] md:text-display-hero font-bold tracking-tight text-text-primary leading-none">
                Dashboard
              </h1>
              <p className="font-body-default text-body-default text-text-secondary">
                Your competitive state, recent clashes and tactical roadmap.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleExportTelemetry}
                className="px-3.5 py-2 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle hover:border-[#353E45] font-code-snippet text-code-snippet text-text-secondary hover:text-text-primary transition-all flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {telemetryExported ? "check" : "file_download"}
                </span>
                <span>
                  {telemetryExported ? "Telemetry Exported" : "Export Telemetry"}
                </span>
              </button>

              <button
                className="px-3.5 py-2 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle hover:border-[#353E45] font-code-snippet text-code-snippet text-text-secondary hover:text-text-primary transition-all flex items-center gap-2 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>System Config</span>
              </button>
            </div>
          </header>

          {/* 2. TOP COMMAND GRID (65% / 35%) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            <DashboardProfileCard />
            <DashboardMatchmaking />
          </div>

          {/* 3. COMPETITIVE PULSE (COMPACT DATA STRIP) */}
          <DashboardPulse />

          {/* 4. MAIN OPERATIONAL SPLIT (62% / 38%) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Left Operational Column (xl:col-span-7) */}
            <div className="xl:col-span-7 flex flex-col gap-5">
              <DashboardClashes />
              <DashboardEloChart />
            </div>

            {/* Right Operational Column (xl:col-span-5) */}
            <div className="xl:col-span-5 flex flex-col gap-5">
              <DashboardRankProgress />
              <DashboardRuntimeStats />
              <DashboardDailyBreach />
            </div>
          </div>

          {/* 5. BOTTOM GRID (3 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <DashboardAuditLog />
            <DashboardDrills />
            <DashboardRivals />
          </div>
        </div>
      </main>

      {/* 3. FLOATING NAV DOCK */}
      <FloatingNav />
    </div>
  );
}
