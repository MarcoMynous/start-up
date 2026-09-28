"use client";

import React from "react";

interface AuditItem {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  meta: string;
}

const AUDIT_LOG: AuditItem[] = [
  {
    icon: "verified",
    iconBg: "bg-status-success/10",
    iconColor: "text-status-success",
    title: "Unlocked 'Fast Solver' achievement",
    meta: "Sub-7m execution in ranked clash • 48m ago",
  },
  {
    icon: "upgrade",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary-container",
    title: "Ranked up to Stack Hunter (Tier II)",
    meta: "Crossed 1,200 Elo marker • 2h ago",
  },
  {
    icon: "groups",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    title: "Accepted into League Delta",
    meta: "Division invitations confirmed • 1d ago",
  },
  {
    icon: "code",
    iconBg: "bg-surface-3",
    iconColor: "text-text-secondary",
    title: "Solved 'Quantum Bitmask'",
    meta: "Daily practice sandbox run • 2d ago",
  },
];

export default function DashboardAuditLog() {
  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary text-[18px]">
            notifications_active
          </span>
          <h3 className="font-card-title text-base font-bold text-text-primary">
            System Audit Log
          </h3>
        </div>
        <span className="font-system-eyebrow text-[10px] text-text-muted uppercase font-mono">
          REALTIME
        </span>
      </div>

      <div className="flex flex-col gap-3 font-code-snippet text-xs">
        {AUDIT_LOG.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-2 rounded hover:bg-surface-2 transition-colors"
          >
            <div
              className={`p-1 rounded ${item.iconBg} ${item.iconColor} shrink-0 mt-0.5`}
            >
              <span className="material-symbols-outlined text-[16px] block">
                {item.icon}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary font-medium">{item.title}</span>
              <span className="text-text-muted text-[11px] font-mono">
                {item.meta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
