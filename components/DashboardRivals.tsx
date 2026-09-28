"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface RivalItem {
  initials: string;
  initialsColor: string;
  name: string;
  elo: number;
  h2h: string;
  h2hColor: string;
}

const RIVALS: RivalItem[] = [
  {
    initials: "AR",
    initialsColor: "text-text-primary",
    name: "axion_root",
    elo: 1310,
    h2h: "1-2",
    h2hColor: "text-status-failure",
  },
  {
    initials: "SX",
    initialsColor: "text-secondary",
    name: "synapse_x",
    elo: 1255,
    h2h: "2-2",
    h2hColor: "text-primary-container",
  },
  {
    initials: "VD",
    initialsColor: "text-status-success",
    name: "v0rtex_dev",
    elo: 1260,
    h2h: "3-1",
    h2hColor: "text-status-success",
  },
  {
    initials: "0N",
    initialsColor: "text-text-muted",
    name: "0xNull",
    elo: 1215,
    h2h: "4-0",
    h2hColor: "text-status-success",
  },
];

export default function DashboardRivals() {
  const router = useRouter();
  const [challenged, setChallenged] = useState<string | null>(null);

  const handleChallenge = (name: string) => {
    setChallenged(name);
    setTimeout(() => {
      router.push("/board/arena");
    }, 700);
  };

  return (
    <div className="bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary text-[18px]">
            swords
          </span>
          <h3 className="font-card-title text-base font-bold text-text-primary">
            Tracked Rivals
          </h3>
        </div>
        <span className="font-system-eyebrow text-[10px] text-text-muted uppercase font-mono">
          ELO PARITY
        </span>
      </div>

      <div className="flex flex-col gap-2.5 font-code-snippet text-xs">
        {RIVALS.map((rival) => (
          <div
            key={rival.name}
            className="p-2.5 rounded bg-surface-2 border border-border-subtle flex items-center justify-between hover:bg-surface-3 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded bg-surface-3 border border-border-subtle flex items-center justify-center font-bold ${rival.initialsColor}`}
              >
                {rival.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-primary">{rival.name}</span>
                <span className="text-text-muted text-[11px] font-mono">
                  {rival.elo} ELO • H2H:{" "}
                  <span className={rival.h2hColor}>{rival.h2h}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => handleChallenge(rival.name)}
              className="px-2 py-1 rounded bg-surface-1 hover:bg-surface-2 border border-border-subtle text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              type="button"
            >
              {challenged === rival.name ? "Queuing..." : "Challenge"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
