"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import FloatingNav from "@/components/FloatingNav";
import CreateRoomModal from "@/components/arena/CreateRoomModal";
import JoinRoomModal from "@/components/arena/JoinRoomModal";
import SquadRelayModal from "@/components/arena/SquadRelayModal";
import ArenaMatchInspectModal from "@/components/arena/ArenaMatchInspectModal";
import { MatchRecord } from "@/types/matches";

// Audio telemetry sound synthesizer (Web Audio API)
function playAudioBlip(type: "click" | "lock" | "cancel") {
  try {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "lock") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "cancel") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {
    // Ignore audio permission or context restrictions
  }
}

interface ArenaMatchItem {
  id: string;
  protocol: string;
  opponent: {
    name: string;
    initials: string;
    elo: number;
  };
  result: "VICTORY" | "DEFEAT";
  solveTime: string;
  ratingDelta: string;
  problemTitle: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  runtime: string;
  testsPassed: number;
  testsTotal: number;
}

const RECENT_ARENA_MATCHES: ArenaMatchItem[] = [
  {
    id: "CC-10482",
    protocol: "Ranked 1v1",
    opponent: { name: "BYTEGHOST", initials: "BG", elo: 1260 },
    result: "VICTORY",
    solveTime: "08:24",
    ratingDelta: "+18 ELO",
    problemTitle: "Circular Packet Route",
    difficulty: "MEDIUM",
    runtime: "PYTHON 3.12",
    testsPassed: 40,
    testsTotal: 40,
  },
  {
    id: "CC-10471",
    protocol: "Casual 1v1",
    opponent: { name: "NULLVECTOR", initials: "NV", elo: 1190 },
    result: "DEFEAT",
    solveTime: "11:02",
    ratingDelta: "—",
    problemTitle: "Graph Relay Protocol",
    difficulty: "HARD",
    runtime: "RUST 1.77",
    testsPassed: 37,
    testsTotal: 40,
  },
  {
    id: "CC-10468",
    protocol: "Private Duel",
    opponent: { name: "STACKZERO", initials: "SZ", elo: 1310 },
    result: "VICTORY",
    solveTime: "06:48",
    ratingDelta: "—",
    problemTitle: "Bitmask State Transposition",
    difficulty: "MEDIUM",
    runtime: "C++20",
    testsPassed: 32,
    testsTotal: 32,
  },
  {
    id: "CC-10452",
    protocol: "Ranked 1v1",
    opponent: { name: "KAZE_DEV", initials: "KD", elo: 1232 },
    result: "VICTORY",
    solveTime: "07:15",
    ratingDelta: "+22 ELO",
    problemTitle: "Subtree Isomorphism Check",
    difficulty: "MEDIUM",
    runtime: "PYTHON 3.12",
    testsPassed: 35,
    testsTotal: 35,
  },
  {
    id: "CC-10439",
    protocol: "Ranked 1v1",
    opponent: { name: "CIPHER_MIND", initials: "CM", elo: 1280 },
    result: "DEFEAT",
    solveTime: "14:12",
    ratingDelta: "-15 ELO",
    problemTitle: "Quantum Telemetry Packet Sort",
    difficulty: "HARD",
    runtime: "TYPESCRIPT 5.4",
    testsPassed: 28,
    testsTotal: 36,
  },
];

const AVAILABLE_RUNTIMES = [
  "PYTHON 3.12",
  "RUST 1.77",
  "C++20",
  "TYPESCRIPT 5.4",
  "GO 1.22",
];

export default function ArenaPage() {
  // Player state
  const [handle, setHandle] = useState<string>("NANO");
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCoGXcEBXybDC7E145Yb6StDPdHtjV34vHFrsLR6r_OGVOROgyUYE3vE28gHKHHGhnSI_Pavs24-_Ltf5D3k7wqlNK987PFmo6LjE3T8iYa8peGADa8E4JImobag-hTUqL8V0J3mT_HfJazoih4TuAVHwLh-08MJnzKUruKMM5efT1kIqdlsq6cwvwh75yjydAxawgCvrx-kgyWGBiYPQRY3BPDPpSptYHqhhGBgjSwcEbLyiCGio6wfQ"
  );
  const [selectedRuntime, setSelectedRuntime] = useState<string>("PYTHON 3.12");
  const [isRuntimeDropdownOpen, setIsRuntimeDropdownOpen] = useState<boolean>(false);

  // Live telemetry metrics with dynamic fluctuation
  const [searchingCount, setSearchingCount] = useState<number>(124);
  const [activeDuelsCount, setActiveDuelsCount] = useState<number>(38);
  const [privateHubsCount] = useState<number>(7);
  const [squadRelaysCount] = useState<number>(2);

  // Ranked Matchmaking Interactive State Machine
  const [isMatchmaking, setIsMatchmaking] = useState<boolean>(false);
  const [queueSeconds, setQueueSeconds] = useState<number>(0);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [foundOpponent, setFoundOpponent] = useState<{
    name: string;
    elo: number;
    runtime: string;
  } | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // Casual Queue State
  const [isCasualSearching, setIsCasualSearching] = useState<boolean>(false);
  const [casualSeconds, setCasualSeconds] = useState<number>(0);

  // Modals state
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState<boolean>(false);
  const [isSquadRelayOpen, setIsSquadRelayOpen] = useState<boolean>(false);
  const [inspectedMatch, setInspectedMatch] = useState<MatchRecord | null>(null);

  // Notification Banner
  const [arenaNotification, setArenaNotification] = useState<string | null>(null);

  const matchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const casualTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hydrate player profile from sessionStorage
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

  // Subtle live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchingCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(118, Math.min(135, prev + delta));
      });
      setActiveDuelsCount((prev) => {
        const delta = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(34, Math.min(42, prev + delta));
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Handle Ranked Matchmaking Toggle
  const handleToggleRanked = () => {
    if (!isMatchmaking) {
      // Start Queue
      playAudioBlip("click");
      setIsMatchmaking(true);
      setMatchFound(false);
      setFoundOpponent(null);
      setQueueSeconds(0);

      matchTimerRef.current = setInterval(() => {
        setQueueSeconds((prev) => {
          const next = prev + 1;
          // Target locked after 4 seconds for immediate, satisfying esports demo
          if (next === 4) {
            if (matchTimerRef.current) clearInterval(matchTimerRef.current);
            playAudioBlip("lock");
            setMatchFound(true);
            setFoundOpponent({
              name: "VOID_WALKER",
              elo: 1265,
              runtime: "RUST 1.77",
            });
            setArenaNotification(
              "OPPONENT LOCKED: VOID_WALKER [1,265 ELO] • ALLOCATING ARENA CLUSTER // 0x4F92"
            );

            // Trigger simulated redirection countdown
            setTimeout(() => {
              setIsRedirecting(true);
            }, 1400);
          }
          return next;
        });
      }, 1000);
    } else {
      // Cancel Queue
      playAudioBlip("cancel");
      if (matchTimerRef.current) clearInterval(matchTimerRef.current);
      setIsMatchmaking(false);
      setMatchFound(false);
      setFoundOpponent(null);
      setQueueSeconds(0);
      setIsRedirecting(false);
      setArenaNotification(null);
    }
  };

  // Handle Casual Matchmaking Toggle
  const handleToggleCasual = () => {
    if (!isCasualSearching) {
      playAudioBlip("click");
      setIsCasualSearching(true);
      setCasualSeconds(0);
      casualTimerRef.current = setInterval(() => {
        setCasualSeconds((prev) => {
          const next = prev + 1;
          if (next === 3) {
            if (casualTimerRef.current) clearInterval(casualTimerRef.current);
            playAudioBlip("lock");
            setArenaNotification("CASUAL OPPONENT LOCKED: NEON_DEV [1,180 ELO] • INITIALIZING SANDBOX");
            setTimeout(() => {
              setIsCasualSearching(false);
            }, 2000);
          }
          return next;
        });
      }, 1000);
    } else {
      playAudioBlip("cancel");
      if (casualTimerRef.current) clearInterval(casualTimerRef.current);
      setIsCasualSearching(false);
      setCasualSeconds(0);
    }
  };

  // Convert row item to MatchRecord for inspection modal
  const handleInspectRow = (item: ArenaMatchItem) => {
    playAudioBlip("click");
    const record: MatchRecord = {
      id: item.id,
      outcome: item.result === "VICTORY" ? "WIN" : "LOSS",
      mode: item.protocol.toLowerCase().includes("ranked")
        ? "ranked"
        : item.protocol.toLowerCase().includes("private")
        ? "private"
        : "casual",
      opponent: {
        name: item.opponent.name,
        handle: item.opponent.name.toLowerCase(),
        initials: item.opponent.initials,
        rankTitle: "CONTENDER",
        elo: item.opponent.elo,
      },
      problem: {
        id: item.id,
        title: item.problemTitle,
        difficulty: item.difficulty,
        topic: "algorithms",
      },
      runtime: item.runtime,
      duration: item.solveTime,
      testsPassed: item.testsPassed,
      testsTotal: item.testsTotal,
      eloDelta:
        item.ratingDelta === "—"
          ? 0
          : parseInt(item.ratingDelta.replace(/[^0-9-]/g, "") || "0"),
      date: "2024-09-22",
      timestamp: "SEP 22 · 21:14",
      groupKey: "today",
      groupLabel: "TODAY — 22 SEP 2024",
    };
    setInspectedMatch(record);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (matchTimerRef.current) clearInterval(matchTimerRef.current);
      if (casualTimerRef.current) clearInterval(casualTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#080A0B] text-text-primary selection:bg-primary-container selection:text-on-primary-container antialiased flex flex-col relative font-body-default">
      {/* 1. FIXED TOP HEADER */}
      <DashboardHeader />

      {/* 2. MAIN ARENA CONTENT */}
      <main className="w-full pt-14 pb-28 min-h-screen bg-[#080A0B] flex-1 flex flex-col">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-6 max-w-[1720px] mx-auto space-y-8">
          {/* Notification Alert Toast (if triggered) */}
          {arenaNotification && (
            <div className="p-3 bg-surface-1 border border-primary-container/40 rounded-lg flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(228,255,63,0.12)] animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                <span className="font-code-snippet text-xs text-primary-container font-bold tracking-wide">
                  {arenaNotification}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setArenaNotification(null)}
                className="text-text-muted hover:text-text-primary p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* ARENA PROTOCOL HEADER */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border-subtle/70">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-primary-container"></span>
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-widest uppercase">
                  ARENA // COMPETITIVE SYSTEM
                </span>
                <span className="text-border-subtle font-code-snippet">/</span>
                <span className="font-code-snippet text-code-snippet text-text-muted">
                  NODE.APX-9
                </span>
              </div>
              <h1 className="font-display-hero text-display-hero text-text-primary tracking-tight font-bold leading-none">
                Arena
              </h1>
              <p className="font-body-default text-body-default text-text-secondary max-w-xl">
                Choose how you want to compete. Execute low-latency algorithms against distributed opponents under tournament telemetry.
              </p>
            </div>

            {/* Player State Telemetry Capsule */}
            <div className="flex flex-wrap items-center gap-3 p-3 bg-surface-1 rounded-xl shadow-lg border border-border-subtle">
              <div className="flex items-center gap-3 pr-4 border-r border-border-subtle">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10 h-10 rounded-lg object-cover bg-surface-2 border border-border-subtle"
                    alt={`${handle} avatar portrait`}
                    src={avatarSrc}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-status-success rounded-full ring-2 ring-surface-1"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-card-title text-card-title text-text-primary font-bold">
                      {handle}
                    </span>
                    <span className="font-system-eyebrow text-[10px] px-1.5 py-0.5 rounded bg-surface-3 text-text-secondary border border-border-subtle uppercase">
                      STACK HUNTER
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 relative">
                    <span className="font-system-eyebrow text-[11px] text-text-muted font-mono">
                      ID: #9904-PX
                    </span>
                    <span className="text-border-subtle text-[10px]">•</span>

                    {/* Interactive Runtime Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsRuntimeDropdownOpen(!isRuntimeDropdownOpen)}
                        className="font-code-snippet text-code-snippet text-text-secondary hover:text-primary-container font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{selectedRuntime}</span>
                        <span className="material-symbols-outlined text-[12px]">expand_more</span>
                      </button>

                      {isRuntimeDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1.5 w-36 bg-surface-2 border border-border-subtle rounded-lg shadow-xl py-1 z-30">
                          {AVAILABLE_RUNTIMES.map((rt) => (
                            <button
                              key={rt}
                              type="button"
                              onClick={() => {
                                setSelectedRuntime(rt);
                                setIsRuntimeDropdownOpen(false);
                                playAudioBlip("click");
                              }}
                              className={`w-full text-left px-2.5 py-1.5 text-xs font-mono transition-colors cursor-pointer flex items-center justify-between ${
                                selectedRuntime === rt
                                  ? "bg-primary-container/15 text-primary-container font-bold"
                                  : "text-text-secondary hover:bg-surface-3 hover:text-text-primary"
                              }`}
                            >
                              <span>{rt}</span>
                              {selectedRuntime === rt && (
                                <span className="material-symbols-outlined text-[12px]">check</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 px-2">
                <div className="text-left">
                  <span className="font-system-eyebrow text-[10px] text-text-muted uppercase block leading-none">
                    RATING
                  </span>
                  <span className="font-mono-metric-sm text-mono-metric-sm text-primary-container font-bold tracking-tight">
                    1,248
                  </span>
                </div>
                <div className="h-6 w-px bg-border-subtle"></div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
                  </span>
                  <span className="font-system-eyebrow text-[11px] text-text-secondary uppercase">
                    SERVER ONLINE
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* LIVE TELEMETRY STRIP (COMPACT KPI STRIP) */}
          <section className="grid grid-cols-2 md:grid-cols-4 bg-surface-1 rounded-xl border border-border-subtle overflow-hidden">
            <div className="p-4 border-r border-b md:border-b-0 border-border-subtle flex flex-col justify-between group hover:bg-surface-2 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                  SEARCHING
                </span>
                <span className="material-symbols-outlined text-text-muted text-[18px]">
                  travel_explore
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">
                  {searchingCount}
                </span>
                <span className="font-system-eyebrow text-[11px] text-status-success font-medium">
                  ONLINE NOW
                </span>
              </div>
            </div>

            <div className="p-4 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between group hover:bg-surface-2 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                  ACTIVE DUELS
                </span>
                <span className="material-symbols-outlined text-text-muted text-[18px]">
                  terminal
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">
                  {activeDuelsCount}
                </span>
                <span className="font-system-eyebrow text-[11px] text-primary-container font-mono">
                  {activeDuelsCount * 2} OPERATORS
                </span>
              </div>
            </div>

            <div className="p-4 border-r border-border-subtle flex flex-col justify-between group hover:bg-surface-2 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                  PRIVATE HUBS
                </span>
                <span className="material-symbols-outlined text-text-muted text-[18px]">
                  lock
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">
                  {String(privateHubsCount).padStart(2, "0")}
                </span>
                <span className="font-system-eyebrow text-[11px] text-text-muted">
                  HOSTED
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between group hover:bg-surface-2 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                  SQUAD RELAYS
                </span>
                <span className="material-symbols-outlined text-text-muted text-[18px]">
                  groups
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary font-bold">
                  {String(squadRelaysCount).padStart(2, "0")}
                </span>
                <span className="font-system-eyebrow text-[11px] text-secondary font-mono">
                  16 PLAYERS
                </span>
              </div>
            </div>
          </section>

          {/* CORE OPERATIONAL MODES: ASYMMETRIC GRID (12 Cols: 7 left, 5 right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: DOMINANT RANKED 1V1 BREACH COMMAND CONSOLE (7 Cols) */}
            <section className="lg:col-span-7 h-full bg-surface-1 rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between relative overflow-hidden shadow-2xl">
              {/* Glow hairline aesthetic */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary-container/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Header and Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary-container/10 border border-primary-container/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                      <span className="font-system-eyebrow text-[11px] font-bold text-primary-container uppercase tracking-wider">
                        ELO ON THE LINE
                      </span>
                    </div>
                    <div className="font-system-eyebrow text-system-eyebrow text-text-muted flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-text-secondary">
                        verified_user
                      </span>
                      <span>COMPETITIVE TIER V</span>
                    </div>
                  </div>

                  <h2 className="font-section-heading text-section-heading text-text-primary font-bold tracking-tight mb-2">
                    Standard Breach // 1v1
                  </h2>
                  <p className="font-body-default text-body-default text-text-secondary max-w-xl mb-6">
                    Head-to-head synchronous code duel. First operator to execute all deterministic edge test suites with lower runtime complexity gains rank.
                  </p>

                  {/* Match Parameters Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-surface-2 rounded-lg border border-border-subtle mb-6">
                    <div>
                      <span className="font-system-eyebrow text-[10px] text-text-muted block uppercase">
                        TIMELIMIT
                      </span>
                      <span className="font-code-snippet text-code-snippet text-text-primary font-bold">
                        15 MIN MAX
                      </span>
                    </div>
                    <div>
                      <span className="font-system-eyebrow text-[10px] text-text-muted block uppercase">
                        QUEUE EST.
                      </span>
                      <span className="font-code-snippet text-code-snippet text-primary-container font-mono font-bold">
                        00:08
                      </span>
                    </div>
                    <div>
                      <span className="font-system-eyebrow text-[10px] text-text-muted block uppercase">
                        RATING RANGE
                      </span>
                      <span className="font-code-snippet text-code-snippet text-text-primary font-mono">
                        1173 - 1323 (±75)
                      </span>
                    </div>
                    <div>
                      <span className="font-system-eyebrow text-[10px] text-text-muted block uppercase">
                        RUNTIME
                      </span>
                      <span className="font-code-snippet text-code-snippet text-text-primary font-mono">
                        {selectedRuntime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Player VS Searching Preview Module */}
                <div className="p-5 sm:p-6 bg-surface-2/60 rounded-xl border border-border-subtle my-auto relative">
                  <div className="flex items-center justify-between text-xs font-system-eyebrow text-text-muted mb-4 uppercase tracking-wider">
                    <span>ACTIVE CONSOLE SLOT</span>
                    <span className="font-mono text-text-secondary">
                      {isMatchmaking
                        ? matchFound
                          ? "PAIRING STATUS: TARGET LOCKED"
                          : "PAIRING PROTOCOL: SYN-ACK SEARCHING"
                        : "PAIRING PROTOCOL: STANDBY"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-11 items-center gap-4">
                    {/* Player Card */}
                    <div className="sm:col-span-5 p-3.5 bg-surface-3 rounded-lg border border-border-subtle flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-12 h-12 rounded object-cover border border-border-subtle"
                        alt={`${handle} tactical portrait`}
                        src={avatarSrc}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-card-title text-[16px] text-text-primary font-bold truncate">
                            {handle}
                          </span>
                          <span className="material-symbols-outlined text-primary-container text-[16px]">
                            verified
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-code-snippet text-xs text-primary-container font-mono font-bold">
                            1,248 ELO
                          </span>
                          <span className="text-border-subtle">•</span>
                          <span className="font-system-eyebrow text-[10px] text-text-secondary uppercase">
                            STACK HUNTER
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* VS Badge */}
                    <div className="sm:col-span-1 flex justify-center py-1 sm:py-0">
                      <div
                        className={`w-8 h-8 rounded-full bg-surface-1 border border-border-subtle flex items-center justify-center font-system-eyebrow text-[11px] font-bold text-text-muted shadow-sm ${
                          isMatchmaking ? "border-primary-container/50 text-primary-container" : ""
                        }`}
                      >
                        VS
                      </div>
                    </div>

                    {/* Searching Target Card */}
                    <div
                      className={`sm:col-span-5 p-3.5 rounded-lg border flex items-center gap-3 relative overflow-hidden transition-all duration-300 ${
                        matchFound
                          ? "border-status-success/70 bg-status-success/10 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                          : isMatchmaking
                          ? "border-primary-container/40 bg-surface-3"
                          : "border-dashed border-border-subtle bg-surface-1/70"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded flex items-center justify-center relative transition-colors ${
                          matchFound
                            ? "bg-status-success/20 border border-status-success/40 text-status-success"
                            : isMatchmaking
                            ? "bg-primary-container/15 border border-primary-container/30 text-primary-container"
                            : "bg-surface-3 border border-border-subtle text-text-muted"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[22px] ${
                            isMatchmaking && !matchFound ? "animate-spin" : ""
                          }`}
                          style={{ animationDuration: isMatchmaking ? "1.5s" : "4s" }}
                        >
                          {matchFound ? "check_circle" : "radar"}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-card-title text-[15px] font-mono tracking-tight font-bold ${
                              matchFound
                                ? "text-status-success"
                                : isMatchmaking
                                ? "text-primary-container"
                                : "text-text-secondary"
                            }`}
                          >
                            {matchFound && foundOpponent
                              ? foundOpponent.name
                              : isMatchmaking
                              ? `LOCKING TARGET (${String(
                                  Math.floor(queueSeconds / 60)
                                ).padStart(2, "0")}:${String(
                                  queueSeconds % 60
                                ).padStart(2, "0")})`
                              : "SEARCHING..."}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-system-eyebrow text-[10px] text-text-muted uppercase">
                            {matchFound && foundOpponent
                              ? `${foundOpponent.elo} ELO • ${foundOpponent.runtime}`
                              : isMatchmaking
                              ? "MATCHING VOLATILITY ENVELOPE"
                              : "ELO DELTA: MATCHING"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTA Strip */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border-subtle mt-6">
                <div className="flex items-center gap-2 text-text-muted font-code-snippet text-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    info
                  </span>
                  <span>Unsportsmanlike disconnect yields instant -25 Elo default.</span>
                </div>

                <div className="flex items-center gap-2">
                  {matchFound && (
                    <Link
                      href="/board/practice"
                      className="h-12 px-5 rounded-lg bg-status-success hover:bg-emerald-400 text-[#080A0B] font-body-default font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-lg shadow-status-success/20 animate-pulse"
                    >
                      <span>LAUNCH DUEL</span>
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                    </Link>
                  )}

                  <button
                    onClick={handleToggleRanked}
                    type="button"
                    className={`h-12 px-8 rounded-lg font-body-default font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer ${
                      isMatchmaking
                        ? matchFound
                          ? "bg-status-success text-[#080A0B] hover:bg-emerald-400"
                          : "bg-status-failure/15 text-status-failure border border-status-failure/30 hover:bg-status-failure/25"
                        : "bg-primary-container hover:bg-[#F0FF70] text-[#080A0B] shadow-lg shadow-primary-container/10"
                    }`}
                  >
                    <span>
                      {matchFound
                        ? isRedirecting
                          ? "CONNECTING..."
                          : "OPPONENT LOCKED"
                        : isMatchmaking
                        ? "CANCEL QUEUE"
                        : "ENTER RANKED"}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        matchFound && isRedirecting ? "animate-spin" : ""
                      }`}
                    >
                      {matchFound
                        ? isRedirecting
                          ? "sync"
                          : "check"
                        : isMatchmaking
                        ? "close"
                        : "arrow_forward"}
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* RIGHT: COMPANION ASYMMETRIC GRID (5 Cols) */}
            <section className="lg:col-span-5 h-full flex flex-col justify-between gap-6">
              {/* CASUAL 1V1 PROTOCOL */}
              <div className="bg-surface-1 rounded-xl p-6 border border-border-subtle hover:border-[#353E45] transition-all duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-3 text-text-secondary border border-border-subtle">
                      <span className="font-system-eyebrow text-[10px] uppercase font-semibold">
                        UNRATED
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-xs text-text-muted font-mono">
                      {isCasualSearching ? `QUEUE: 00:0${casualSeconds}` : "QUEUE: 00:03"}
                    </span>
                  </div>
                  <h3 className="font-card-title text-card-title text-text-primary font-bold mb-1.5">
                    Casual 1v1 Protocol
                  </h3>
                  <p className="font-body-default text-sm text-text-secondary mb-4 leading-relaxed">
                    Same competitive telemetry without Elo volatility. Test unorthodox data structures, new language runtimes, and algorithmic templates risk-free.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle mt-2">
                  <span className="font-code-snippet text-xs text-text-muted">
                    Standard 15m timer • Edge suite
                  </span>
                  <button
                    onClick={handleToggleCasual}
                    type="button"
                    className={`h-9 px-4 rounded font-body-default text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                      isCasualSearching
                        ? "bg-status-failure/15 text-status-failure border-status-failure/30 hover:bg-status-failure/25"
                        : "bg-surface-2 hover:bg-surface-3 text-text-primary border-border-subtle hover:border-[#353E45]"
                    }`}
                  >
                    <span>{isCasualSearching ? "CANCEL" : "PLAY CASUAL"}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {isCasualSearching ? "close" : "arrow_forward"}
                    </span>
                  </button>
                </div>
              </div>

              {/* PLAY WITH A FRIEND (PRIVATE LOBBY) */}
              <div className="bg-surface-1 rounded-xl p-6 border border-border-subtle hover:border-[#353E45] transition-all duration-200 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-3 text-text-secondary border border-border-subtle">
                      <span className="font-system-eyebrow text-[10px] uppercase font-semibold">
                        PRIVATE LOBBY
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-xs text-text-muted font-mono">
                      P2P TUNNEL
                    </span>
                  </div>
                  <h3 className="font-card-title text-card-title text-text-primary font-bold mb-1.5">
                    Play With A Peer
                  </h3>
                  <p className="font-body-default text-sm text-text-secondary mb-4 leading-relaxed">
                    Spawn an isolated room with customizable problem categories, time dials, and memory constraints. Share a 6-character breach code.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-subtle mt-2">
                  <button
                    onClick={() => {
                      playAudioBlip("click");
                      setIsCreateRoomOpen(true);
                    }}
                    type="button"
                    className="h-9 px-3 rounded bg-surface-2 hover:bg-surface-3 text-text-primary font-body-default text-xs font-semibold flex items-center justify-center gap-1.5 border border-border-subtle hover:border-[#353E45] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">
                      add_circle
                    </span>
                    <span>CREATE ROOM</span>
                  </button>
                  <button
                    onClick={() => {
                      playAudioBlip("click");
                      setIsJoinRoomOpen(true);
                    }}
                    type="button"
                    className="h-9 px-3 rounded bg-surface-2 hover:bg-surface-3 text-text-primary font-body-default text-xs font-semibold flex items-center justify-center gap-1.5 border border-border-subtle hover:border-[#353E45] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-text-secondary">
                      key
                    </span>
                    <span>JOIN ROOM</span>
                  </button>
                </div>
              </div>

              {/* SQUAD BREACH (TEAM RELAY) */}
              <div className="bg-surface-1 rounded-xl p-6 border border-border-subtle hover:border-[#353E45] transition-all duration-200 relative flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-system-eyebrow text-[10px] px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20 uppercase font-bold">
                        3V3 // 5V5
                      </span>
                      <span className="font-system-eyebrow text-[10px] px-2 py-0.5 rounded bg-surface-3 text-text-muted border border-border-subtle uppercase">
                        RELAY PROTOCOL
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-xs text-text-muted font-mono">
                      WEEKLY CUP OPEN
                    </span>
                  </div>
                  <h3 className="font-card-title text-card-title text-text-primary font-bold mb-1.5">
                    Squad Breach // Co-op Relay
                  </h3>
                  <p className="font-body-default text-sm text-text-secondary mb-4 leading-relaxed">
                    Collaborative team matches. Code execution passes consecutively between team members every 3 minutes. Clean modular design wins the tie-break.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle mt-2">
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-surface-3 border border-surface-1 flex items-center justify-center text-[10px] text-text-muted font-mono font-bold">
                      S1
                    </div>
                    <div className="w-6 h-6 rounded-full bg-surface-3 border border-surface-1 flex items-center justify-center text-[10px] text-text-muted font-mono font-bold">
                      S2
                    </div>
                    <div className="w-6 h-6 rounded-full bg-surface-3 border border-surface-1 flex items-center justify-center text-[10px] text-text-muted font-mono font-bold">
                      S3
                    </div>
                    <span className="pl-2 font-code-snippet text-[11px] text-text-muted">
                      3 Slots / Team
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      playAudioBlip("click");
                      setIsSquadRelayOpen(true);
                    }}
                    type="button"
                    className="h-9 px-4 rounded bg-surface-2 hover:bg-surface-3 text-text-primary font-body-default text-xs font-semibold flex items-center gap-1.5 border border-border-subtle hover:border-[#353E45] transition-colors cursor-pointer"
                  >
                    <span>ENTER SQUAD</span>
                    <span className="material-symbols-outlined text-[14px]">groups</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* LOWER SECTION: RECENT ARENA TELEMETRY & MATCH ARCHIVE */}
          <section className="bg-surface-1 rounded-xl border border-border-subtle p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-muted text-[20px]">
                  history_edu
                </span>
                <h2 className="font-card-title text-card-title text-text-primary font-bold">
                  Recent Arena Activity
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                  SYSTEM LOG // PAST 24H
                </span>
                <Link
                  className="font-system-eyebrow text-xs text-primary-container hover:underline uppercase flex items-center gap-1"
                  href="/board/matches"
                >
                  <span>FULL LOGS</span>
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </div>
            </div>

            {/* Compact Technical Match Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle text-text-muted font-system-eyebrow text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">PROTOCOL</th>
                    <th className="py-2.5 px-3">OPPONENT</th>
                    <th className="py-2.5 px-3">RESULT</th>
                    <th className="py-2.5 px-3">SOLVE TIME</th>
                    <th className="py-2.5 px-3 text-right">RATING DELTA</th>
                    <th className="py-2.5 px-3 text-right">INSPECT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/50 font-body-default text-sm">
                  {RECENT_ARENA_MATCHES.map((row) => {
                    const isWin = row.result === "VICTORY";
                    const isRanked = row.protocol.includes("Ranked");
                    const isPrivate = row.protocol.includes("Private");

                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-surface-2/60 transition-colors group"
                      >
                        {/* Protocol */}
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1.5 font-code-snippet text-xs text-text-primary font-medium">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isRanked
                                  ? "bg-primary-container"
                                  : isPrivate
                                  ? "bg-secondary"
                                  : "bg-border-subtle"
                              }`}
                            ></span>
                            {row.protocol}
                          </span>
                        </td>

                        {/* Opponent */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-surface-3 border border-border-subtle flex items-center justify-center font-mono text-[10px] text-text-secondary">
                              {row.opponent.initials}
                            </div>
                            <span className="font-card-title text-[14px] text-text-primary font-medium">
                              {row.opponent.name}
                            </span>
                            <span className="font-system-eyebrow text-[10px] text-text-muted font-mono">
                              {row.opponent.elo.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* Result */}
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-system-eyebrow font-bold border ${
                              isWin
                                ? "bg-status-success/10 text-status-success border-status-success/20"
                                : "bg-status-failure/10 text-status-failure border-status-failure/20"
                            }`}
                          >
                            {row.result}
                          </span>
                        </td>

                        {/* Solve Time */}
                        <td className="py-3 px-3">
                          <span className="font-code-snippet text-xs text-text-secondary font-mono">
                            {row.solveTime}
                          </span>
                        </td>

                        {/* Rating Delta */}
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`font-code-snippet text-xs font-mono font-bold ${
                              row.ratingDelta.startsWith("+")
                                ? "text-status-success"
                                : row.ratingDelta.startsWith("-")
                                ? "text-status-failure"
                                : "text-text-muted"
                            }`}
                          >
                            {row.ratingDelta}
                          </span>
                        </td>

                        {/* Inspect Terminal Button */}
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleInspectRow(row)}
                            type="button"
                            title="Inspect forensic telemetry"
                            className="text-text-muted group-hover:text-text-primary transition-colors p-1 hover:bg-surface-3 rounded cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              terminal
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* 3. INTERACTIVE MODALS */}
      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onStartRoom={(code) => {
          setArenaNotification(`PRIVATE CHAMBER CREATED: [${code}] • WAITING FOR PEER HANDSHAKE`);
        }}
      />

      <JoinRoomModal
        isOpen={isJoinRoomOpen}
        onClose={() => setIsJoinRoomOpen(false)}
        onJoinSuccess={(code) => {
          setArenaNotification(`SYNCHRONIZED WITH PEER CHAMBER [${code}] • PREPARING ENVIRONMENT`);
        }}
      />

      <SquadRelayModal
        isOpen={isSquadRelayOpen}
        onClose={() => setIsSquadRelayOpen(false)}
        playerHandle={handle}
      />

      <ArenaMatchInspectModal
        match={inspectedMatch}
        onClose={() => setInspectedMatch(null)}
      />

      {/* 4. FLOATING BOTTOM NAVIGATION DOCK */}
      <FloatingNav />
    </div>
  );
}
