"use client";

import React from "react";

export default function DashboardEloChart() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col justify-between flex-1 shadow-xl gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-system-eyebrow text-[10px] uppercase text-primary-fixed-dim font-bold font-mono">
            RATING TELEMETRY
          </span>
          <h2 className="font-card-title text-card-title text-text-primary">
            30-Day Elo Velocity
          </h2>
        </div>
        <div className="flex items-center gap-3 font-code-snippet text-xs">
          <span className="flex items-center gap-1.5 text-text-muted">
            <span className="w-2.5 h-0.5 bg-primary-container"></span> Elo Trajectory
          </span>
          <span className="flex items-center gap-1.5 text-text-muted">
            <span className="w-2 h-2 rounded-full border border-dashed border-[#596166]"></span>{" "}
            Milestones
          </span>
        </div>
      </div>

      {/* SVG Telemetry Graph Container */}
      <div className="relative w-full flex-1 min-h-[300px] md:min-h-[340px] xl:min-h-[380px] bg-surface-2 rounded border border-border-subtle p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle Horizontal Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
          <div className="w-full border-b border-dashed border-[#8A9297]"></div>
          <div className="w-full border-b border-dashed border-[#8A9297]"></div>
          <div className="w-full border-b border-dashed border-[#8A9297]"></div>
          <div className="w-full border-b border-dashed border-[#8A9297]"></div>
        </div>

        {/* SVG Line Graph */}
        <div className="relative w-full flex-1 min-h-[220px] flex items-center">
          <svg
            className="w-full h-full overflow-visible relative z-10"
            preserveAspectRatio="none"
            viewBox="0 0 700 200"
          >
            <defs>
              <linearGradient id="eloGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#d5ef2e" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#d5ef2e" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>

            {/* Fill under curve */}
            <polygon
              fill="url(#eloGlow)"
              points="20,170 80,160 150,145 220,152 290,130 360,115 430,128 500,90 570,82 640,65 670,55 670,190 20,190"
            ></polygon>

            {/* Threshold Reference Line at 1,200 (Stack Hunter floor) */}
            <line
              opacity="0.4"
              stroke="#596166"
              strokeDasharray="4 4"
              strokeWidth="1"
              x1="20"
              x2="680"
              y1="120"
              y2="120"
            ></line>
            <text
              fill="#596166"
              fontFamily="JetBrains Mono"
              fontSize="10"
              letterSpacing="0.05em"
              x="30"
              y="115"
            >
              TIER II THRESHOLD (1,200)
            </text>

            {/* Main Trajectory Line */}
            <polyline
              fill="none"
              points="20,170 80,160 150,145 220,152 290,130 360,115 430,128 500,90 570,82 640,65 670,55"
              stroke="#d5ef2e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            ></polyline>

            {/* Peak Marker Dot at 1,310 peak */}
            <circle
              cx="500"
              cy="90"
              fill="#12161A"
              r="4.5"
              stroke="#22D3EE"
              strokeWidth="2"
            ></circle>
            <text
              fill="#22D3EE"
              fontFamily="JetBrains Mono"
              fontSize="10"
              fontWeight="bold"
              x="508"
              y="88"
            >
              PEAK 1,310
            </text>

            {/* Current Data Node (Hover Indicator) */}
            <circle
              className="animate-pulse"
              cx="670"
              cy="55"
              fill="#d5ef2e"
              r="5"
              stroke="#080A0B"
              strokeWidth="2"
            ></circle>
          </svg>

          {/* Floating Monospace Tooltip */}
          <div className="absolute top-4 right-4 bg-surface-3/95 border border-primary-container/40 px-3 py-2 rounded shadow-xl pointer-events-none z-20 flex flex-col gap-0.5">
            <span className="font-system-eyebrow text-[9px] uppercase text-text-muted font-mono">
              MATCH #208 • LATEST
            </span>
            <div className="flex items-center gap-2">
              <span className="font-code-snippet text-xs font-bold text-primary-container">
                1,248 ELO
              </span>
              <span className="font-code-snippet text-[11px] text-status-success font-semibold">
                (+24 vs v0rtex_dev)
              </span>
            </div>
            <span className="font-code-snippet text-[10px] text-text-muted font-mono">
              37m ago • US-EAST-1
            </span>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between items-center px-1 font-system-eyebrow text-[10px] md:text-[11px] text-text-muted uppercase relative z-10 pt-2 mt-2 border-t border-border-subtle/50 font-mono">
          <span>DAY -30 (1,064)</span>
          <span>DAY -20 (1,140)</span>
          <span>DAY -10 (1,220)</span>
          <span className="text-text-primary font-bold">CURRENT (1,248)</span>
        </div>
      </div>
    </div>
  );
}
