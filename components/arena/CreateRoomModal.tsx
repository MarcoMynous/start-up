"use client";

import React, { useState } from "react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRoom?: (roomCode: string) => void;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  onStartRoom,
}: CreateRoomModalProps) {
  const [roomCode, setRoomCode] = useState("CC-8492");
  const [difficulty, setDifficulty] = useState<"TIER I" | "TIER II" | "TIER III">("TIER II");
  const [domain, setDomain] = useState("DYNAMIC_PROGRAMMING");
  const [timeLimit, setTimeLimit] = useState("15");
  const [copied, setCopied] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  if (!isOpen) return null;

  const handleRegenCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "CC-";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRoomCode(code);
    setCopied(false);
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://codeclash.dev/arena/join?room=${roomCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
      if (onStartRoom) {
        onStartRoom(roomCode);
      }
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-surface-1 border border-border-subtle rounded-xl p-6 sm:p-7 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
              P2P TUNNEL // SPAWN PRIVATE DUEL CHAMBER
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

        {/* Chamber Code Strip */}
        <div className="p-4 bg-surface-2 rounded-lg border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block">
              ROOM ACCESS CODE
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-result-title text-2xl sm:text-3xl text-primary-container font-mono font-bold tracking-widest">
                {roomCode}
              </span>
              <button
                onClick={handleRegenCode}
                className="p-1.5 rounded bg-surface-3 hover:bg-surface-container-high border border-border-subtle text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                title="Generate new breach code"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">sync</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="h-10 px-4 rounded bg-surface-3 hover:bg-surface-container-high text-text-primary font-code-snippet text-xs font-semibold flex items-center justify-center gap-2 border border-border-subtle hover:border-[#353E45] transition-colors cursor-pointer shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-primary-container">
              {copied ? "check" : "content_copy"}
            </span>
            <span>{copied ? "COPIED LINK" : "COPY INVITE LINK"}</span>
          </button>
        </div>

        {/* Parameter Customization Controls */}
        <div className="space-y-4">
          {/* Difficulty Tier */}
          <div>
            <label className="font-system-eyebrow text-xs text-text-muted uppercase block mb-2">
              DIFFICULTY CALIBRATION
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["TIER I", "TIER II", "TIER III"] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setDifficulty(tier)}
                  className={`py-2.5 px-3 rounded text-xs font-code-snippet font-semibold border transition-all cursor-pointer ${
                    difficulty === tier
                      ? "bg-primary-container/10 border-primary-container text-primary-container"
                      : "bg-surface-2 border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-3"
                  }`}
                >
                  {tier === "TIER I" ? "Warmup (Easy)" : tier === "TIER II" ? "Standard (Med)" : "Hardcore (Hard)"}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Domain */}
          <div>
            <label className="font-system-eyebrow text-xs text-text-muted uppercase block mb-2">
              PROBLEM DOMAIN
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "DYNAMIC_PROGRAMMING", label: "Dynamic Programming" },
                { id: "GRAPH_THEORY", label: "Graph Routing & Trees" },
                { id: "BIT_MANIPULATION", label: "Bitmask & Math" },
                { id: "STRING_PARSING", label: "String Tokenizers" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDomain(item.id)}
                  className={`py-2 px-3 rounded text-xs font-body-default text-left border transition-all cursor-pointer ${
                    domain === item.id
                      ? "bg-secondary/10 border-secondary text-secondary font-medium"
                      : "bg-surface-2 border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-3"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Limit Dial */}
          <div>
            <label className="font-system-eyebrow text-xs text-text-muted uppercase block mb-2">
              MATCH TIME DIAL
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "10", label: "10 Minutes (Blitz)" },
                { val: "15", label: "15 Minutes (Standard)" },
                { val: "30", label: "30 Minutes (Deep)" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setTimeLimit(item.val)}
                  className={`py-2 px-3 rounded text-xs font-code-snippet border transition-all cursor-pointer ${
                    timeLimit === item.val
                      ? "bg-surface-3 border-primary-container text-text-primary font-bold"
                      : "bg-surface-2 border-border-subtle text-text-muted hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-text-muted text-xs font-code-snippet">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping"></span>
            <span>CHAMBER PING: 12ms</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="h-10 px-4 rounded bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary font-body-default text-xs font-semibold border border-border-subtle transition-colors cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              type="button"
              className="h-10 px-6 rounded bg-primary-container hover:bg-[#F0FF70] text-[#080A0B] font-body-default font-bold text-xs flex items-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-lg shadow-primary-container/10 disabled:opacity-70"
            >
              {isDeploying ? (
                <>
                  <span>DEPLOYING...</span>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                </>
              ) : deployed ? (
                <>
                  <span>ROOM ACTIVE</span>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </>
              ) : (
                <>
                  <span>SPAWN CHAMBER</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
