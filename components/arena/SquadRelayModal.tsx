"use client";

import React, { useState } from "react";

interface SquadRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerHandle?: string;
}

export default function SquadRelayModal({
  isOpen,
  onClose,
  playerHandle = "NANO",
}: SquadRelayModalProps) {
  const [squadSlots, setSquadSlots] = useState([
    {
      slot: "S1",
      role: "Lead Architect (00:00 - 03:00)",
      task: "Data structure scaffolding & base recursion templates",
      player: playerHandle,
      elo: 1248,
      status: "READY",
      isUser: true,
    },
    {
      slot: "S2",
      role: "Optimization Specialist (03:00 - 06:00)",
      task: "Algorithm complexity reduction & memory profiling",
      player: "CYBER_VIPER",
      elo: 1310,
      status: "LOCKED",
      isUser: false,
    },
    {
      slot: "S3",
      role: "Edge-Case Finisher (06:00 - 09:00)",
      task: "Boundary condition unit testing & null safety passes",
      player: "KAIZEN_99",
      elo: 1285,
      status: "READY",
      isUser: false,
    },
  ]);

  const [isQueueing, setIsQueueing] = useState(false);
  const [queueElapsed, setQueueElapsed] = useState(0);

  if (!isOpen) return null;

  const handleQueueSquad = () => {
    setIsQueueing(true);
    const interval = setInterval(() => {
      setQueueElapsed((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-1 border border-border-subtle rounded-xl p-6 sm:p-7 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient top glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              SQUAD BREACH // 3V3 RELAY ROSTER PREVIEW
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors cursor-pointer"
            type="button"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tournament Callout */}
        <div className="p-3.5 bg-surface-2 border border-border-subtle rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </div>
            <div>
              <span className="font-card-title text-sm font-bold text-text-primary block">
                WEEKLY SQUAD CUP: QUALIFIER 04
              </span>
              <span className="font-code-snippet text-xs text-text-muted">
                Prize Pool: 1,500 Elo Vault Points • Round starts every 15 mins
              </span>
            </div>
          </div>
          <span className="font-system-eyebrow text-xs text-secondary font-mono px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 hidden sm:inline-block">
            ACTIVE REGISTRATION
          </span>
        </div>

        {/* Squad 3 Slots Matrix */}
        <div className="space-y-3">
          <span className="font-system-eyebrow text-xs text-text-muted uppercase block">
            RELAY CHAIN ROSTER (HANDOFF EVERY 3 MINUTES)
          </span>

          <div className="grid grid-cols-1 gap-2.5">
            {squadSlots.map((slot) => (
              <div
                key={slot.slot}
                className="p-3.5 bg-surface-2/80 rounded-lg border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#353E45] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-surface-3 border border-border-subtle flex items-center justify-center font-mono text-xs font-bold text-text-primary">
                    {slot.slot}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-card-title text-sm font-bold text-text-primary">
                        {slot.player}
                      </span>
                      {slot.isUser && (
                        <span className="font-system-eyebrow text-[9px] px-1.5 py-0.2 rounded bg-primary-container/15 text-primary-container border border-primary-container/30 uppercase">
                          YOU
                        </span>
                      )}
                      <span className="font-mono text-xs text-text-muted">
                        [{slot.elo} ELO]
                      </span>
                    </div>
                    <span className="font-code-snippet text-xs text-secondary block mt-0.5">
                      {slot.role}
                    </span>
                    <span className="font-body-default text-[11px] text-text-muted">
                      {slot.task}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-3 border border-border-subtle font-system-eyebrow text-[10px] text-status-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                    <span>{slot.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Summary */}
        <div className="p-3 bg-surface-2/40 rounded border border-border-subtle text-xs text-text-muted space-y-1 font-body-default">
          <div className="flex items-center gap-1.5 text-text-secondary font-code-snippet font-semibold">
            <span className="material-symbols-outlined text-[14px] text-secondary">info</span>
            <span>RELAY EXECUTION RULES</span>
          </div>
          <p>
            When time expires for Slot 1, editor write access is immediately locked and transferred to Slot 2. The entire commit history and execution console is preserved seamlessly.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
          <span className="font-code-snippet text-xs text-text-muted">
            {isQueueing ? `QUEUE TIME: 00:0${queueElapsed}` : "SQUAD SYNC: 3/3 READY"}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="h-10 px-4 rounded bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary font-body-default text-xs font-semibold border border-border-subtle transition-colors cursor-pointer"
            >
              DISBAND
            </button>
            <button
              onClick={handleQueueSquad}
              disabled={isQueueing}
              type="button"
              className="h-10 px-6 rounded bg-secondary hover:bg-[#a2eeff] text-[#00363e] font-body-default font-bold text-xs flex items-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-lg shadow-secondary/15 disabled:opacity-75"
            >
              {isQueueing ? (
                <>
                  <span>MATCHING SQUAD RELAY...</span>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                </>
              ) : (
                <>
                  <span>QUEUE SQUAD RELAY</span>
                  <span className="material-symbols-outlined text-[16px]">groups</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
