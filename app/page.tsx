"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [secondsLeft, setSecondsLeft] = useState(8 * 60 + 42);
  const [activeTab, setActiveTab] = useState<"overview" | "diff" | "autopsy" | "profiling">("overview");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [runMessage, setRunMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDock, setActiveDock] = useState<string>("arena");

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const remSecs = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${remSecs}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("#A9F2-BREACH");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setRunMessage("Executing sandbox test suite...");
    setTimeout(() => {
      setIsRunningTests(false);
      setRunMessage("Executed 3 tests: 2 passed, 1 failed (Cyclic backpressure threshold exceeded)");
      setTimeout(() => setRunMessage(null), 5000);
    }, 850);
  };

  return (
    <div className="bg-[#080A0B] text-text-primary font-body-default min-h-screen selection:bg-primary-container selection:text-on-primary-container relative pb-24 md:pb-28">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#080A0B]/90 backdrop-blur-md border-b border-border-subtle">
        <div className="h-16 w-full px-4 sm:px-6 md:px-8 lg:px-margin flex items-center justify-between gap-space-md">
          {/* Logo & Telemetry Indicator */}
          <div className="flex items-center gap-space-md">
            <a href="#" className="flex items-center gap-space-sm group">
              <img
                alt="CodeClash Brand Logo"
                className="h-7 sm:h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
              />
              <span className="font-display-hero font-bold text-card-title text-text-primary tracking-tight">
                CodeClash
              </span>
            </a>
            <div className="hidden xl:flex items-center gap-space-xs pl-space-sm border-l border-border-subtle">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase">
                TELEMETRY RUNTIME
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-space-lg">
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#arena-experience"
            >
              Arena
            </a>
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#combat-modes"
            >
              Practice
            </a>
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#rank-ladder"
            >
              Leaderboard
            </a>
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#spectate-section"
            >
              Tournaments
            </a>
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#teams-section"
            >
              For Teams
            </a>
            <a
              className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors py-1"
              href="#engine-section"
            >
              Docs
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-space-md">
            <a
              className="hidden sm:inline-block font-system-eyebrow text-system-eyebrow uppercase text-text-secondary hover:text-text-primary transition-colors px-space-xs py-space-xs"
              href="/auth/sign-in"
            >
              SIGN IN
            </a>
            <a
              className="inline-flex items-center justify-center font-display-hero font-semibold text-[13px] sm:text-body-muted h-9 sm:h-10 px-3 sm:px-space-md rounded-lg bg-[#E4FF3F] text-[#080A0B] hover:bg-[#F0FF70] transition-all active:scale-[0.99] shadow-[0_0_12px_rgba(228,255,63,0.15)] whitespace-nowrap"
              href="#arena-experience"
            >
              <span>ENTER THE ARENA</span>
              <span className="hidden sm:inline ml-1">→</span>
            </a>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary rounded bg-surface-2 border border-surface-3 flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-surface-2 border-b border-surface-3 px-4 py-4 flex flex-col gap-3 transition-all animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-surface-3 text-system-eyebrow text-text-muted">
              <span>NAVIGATION MENU</span>
              <span className="text-status-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                ONLINE
              </span>
            </div>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#arena-experience"
            >
              Arena
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#combat-modes"
            >
              Practice
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#rank-ladder"
            >
              Leaderboard
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#spectate-section"
            >
              Tournaments
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#teams-section"
            >
              For Teams
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded text-text-primary hover:bg-surface-3 font-semibold text-body-default"
              href="#engine-section"
            >
              Documentation
            </a>
            <div className="pt-2 border-t border-surface-3 flex items-center justify-between">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="font-system-eyebrow uppercase text-text-secondary hover:text-text-primary"
                href="/auth/sign-in"
              >
                Sign In to Account
              </a>
              <span className="text-[11px] text-text-muted font-mono">14ms latency</span>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-16 bg-[#080A0B]">
        <div className="flex flex-col w-full">
          {/* SECTION 01: HERO & LIVE ARENA EXPERIENCE */}
          <section
            id="arena-experience"
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl relative overflow-hidden bg-surface-1/40"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              {/* Editorial Header Content */}
              <div className="flex flex-col gap-space-md max-w-4xl">
                <div className="flex items-center gap-space-sm">
                  <span className="inline-block w-2 h-2 rounded-sm bg-primary-container animate-pulse"></span>
                  <span className="font-system-eyebrow text-system-eyebrow uppercase text-primary-container tracking-widest text-[11px] sm:text-system-eyebrow">
                    REAL-TIME COMPETITIVE PROGRAMMING // 1V1 BREACH PROTOCOL
                  </span>
                </div>
                <h1 className="font-display-hero text-display-hero text-text-primary uppercase tracking-tighter leading-[1.05]">
                  YOUR CODE.
                  <br />
                  YOUR RANK.
                  <br />
                  <span className="text-primary-container">YOUR ARENA.</span>
                </h1>
                <p className="font-body-default text-card-title text-text-secondary max-w-2xl text-[16px] sm:text-card-title">
                  Face real developers in timed coding battles. Solve correctly,
                  survive hidden stress tests, and climb the deterministic Elo
                  ladder. Zero arbiters. Total latency transparency.
                </p>

                {/* CTA Cluster */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-space-md pt-space-sm">
                  <a
                    className="h-12 px-6 sm:px-space-xl rounded-lg bg-primary-container text-on-primary font-display-hero font-bold text-body-default inline-flex items-center justify-center gap-space-sm hover:bg-[#F0FF70] transition-all active:scale-[0.99] shadow-[0_0_24px_rgba(213,239,46,0.22)] w-full sm:w-auto"
                    href="#arena-experience"
                  >
                    <span>ENTER THE ARENA</span>
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_forward
                    </span>
                  </a>
                  <a
                    className="h-12 px-space-lg rounded-lg bg-surface-2 text-text-primary font-display-hero font-semibold text-body-default inline-flex items-center justify-center gap-space-sm hover:bg-surface-3 transition-colors border border-surface-3 w-full sm:w-auto"
                    href="#spectate-section"
                  >
                    <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
                    <span>WATCH A LIVE CLASH</span>
                  </a>
                  <div className="flex items-center gap-space-xs text-text-muted font-system-eyebrow text-system-eyebrow pt-1 sm:pt-0 sm:pl-space-md">
                    <span className="material-symbols-outlined text-[16px] text-primary-container">
                      verified_user
                    </span>
                    <span>KERNEL ISOLATED // ANTI-CHEAT VERIFIED</span>
                  </div>
                </div>

                {/* Supported Runtimes Ribbon */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase mr-1 text-[11px] sm:text-system-eyebrow">
                    EXECUTION RUNTIMES:
                  </span>
                  {[
                    "Python 3.12",
                    "C++ 23 (LLVM)",
                    "Rust 1.78",
                    "Go 1.22",
                    "Java 21",
                    "Node.js 20 LTS",
                  ].map((runtime) => (
                    <div
                      key={runtime}
                      className="px-2.5 py-1 rounded bg-surface-2 flex items-center gap-1.5 border border-surface-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                      <span className="font-code-snippet text-code-snippet text-text-primary text-[12px]">
                        {runtime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Live Arena Surface */}
              <div className="w-full rounded-xl bg-surface-1 overflow-hidden shadow-2xl flex flex-col border border-surface-3">
                {/* Arena Control Header */}
                <div className="p-3 sm:px-space-lg sm:h-14 bg-surface-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-surface-3">
                  <div className="flex items-center gap-space-md min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-surface-3 font-system-eyebrow text-system-eyebrow text-primary-container uppercase text-[11px] sm:text-system-eyebrow">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                      MATCH #CL-9842
                    </span>
                    <div className="flex items-center gap-space-xs font-system-eyebrow text-system-eyebrow text-text-muted text-[11px] sm:text-system-eyebrow">
                      <span>STANDARD BREACH</span>
                      <span>{"//"}</span>
                      <span className="text-text-primary">
                        GRAPH RELAY (MEDIUM)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-space-xl">
                    {/* Head-to-Head Micro Summary */}
                    <div className="flex items-center gap-space-md font-mono-metric-sm text-mono-metric-sm">
                      <div className="flex items-center gap-space-xs text-text-primary">
                        <span className="text-primary-container font-bold">
                          NANO
                        </span>
                        <span className="text-text-muted text-[11px] sm:text-system-eyebrow font-system-eyebrow">
                          1,248 ELO
                        </span>
                      </div>
                      <span className="font-code-snippet text-text-muted uppercase text-system-eyebrow">
                        VS
                      </span>
                      <div className="flex items-center gap-space-xs text-text-secondary">
                        <span className="text-text-primary font-bold">
                          BYTEGHOST
                        </span>
                        <span className="text-text-muted text-[11px] sm:text-system-eyebrow font-system-eyebrow">
                          1,273 ELO
                        </span>
                      </div>
                    </div>
                    {/* Clock Telemetry */}
                    <div className="px-space-md py-1 rounded bg-surface-3 flex items-center gap-space-xs text-primary-container font-mono-metric-sm">
                      <span className="material-symbols-outlined text-[18px]">
                        timer
                      </span>
                      <span className="font-bold tracking-wider" id="live-timer">
                        {formatTime(secondsLeft)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arena Main Interactive Split (~62% Editor, ~38% Opponent Telemetry) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
                  {/* Left Workspace: Nano's Editor & Runner (8 cols on lg) */}
                  <div className="lg:col-span-8 flex flex-col bg-[#080A0B] lg:border-r border-surface-3">
                    {/* Editor Subheader */}
                    <div className="h-10 px-space-md bg-surface-1 flex items-center justify-between border-b border-surface-3">
                      <div className="flex items-center gap-space-xs">
                        <span className="px-space-sm py-1 bg-surface-2 text-primary-container font-code-snippet text-code-snippet rounded-t border-t border-x border-surface-3">
                          solution.py
                        </span>
                        <span className="hidden sm:inline font-system-eyebrow text-system-eyebrow text-text-muted px-space-xs">
                          PYTHON 3.12 (ISOLATED)
                        </span>
                      </div>
                      <div className="flex items-center gap-space-md font-code-snippet text-code-snippet text-text-muted text-[11px] sm:text-code-snippet">
                        <span>MEM: 18.4 MB</span>
                        <span>CPU: 4%</span>
                      </div>
                    </div>

                    {/* Editor Lines Code Canvas */}
                    <div className="flex-1 p-space-md font-code-snippet text-code-snippet leading-relaxed overflow-x-auto text-text-secondary select-none">
                      <div className="flex gap-space-md min-w-[500px]">
                        <div className="text-text-muted text-right select-none opacity-40">
                          01
                          <br />
                          02
                          <br />
                          03
                          <br />
                          04
                          <br />
                          05
                          <br />
                          06
                          <br />
                          07
                          <br />
                          08
                          <br />
                          09
                          <br />
                          10
                          <br />
                          11
                          <br />
                          12
                          <br />
                          13
                          <br />
                          14
                          <br />
                          15
                          <br />
                          16
                        </div>
                        <div className="font-code-snippet text-text-primary flex-1 font-mono">
                          <span className="text-text-muted">
                            # Problem: Find shortest non-overlapping acyclic path with dynamic capacity
                          </span>
                          <br />
                          <span className="text-secondary">from</span>{" "}
                          collections <span className="text-secondary">import</span>{" "}
                          deque, defaultdict
                          <br />
                          <br />
                          <span className="text-secondary">def</span>{" "}
                          <span className="text-primary-container">
                            solve_breach_relay
                          </span>
                          (nodes: <span className="text-secondary">int</span>, edges:{" "}
                          <span className="text-secondary">list</span>[
                          <span className="text-secondary">list</span>[
                          <span className="text-secondary">int</span>]], k_hops:{" "}
                          <span className="text-secondary">int</span>) -&gt;{" "}
                          <span className="text-secondary">int</span>:
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;graph = defaultdict(dict)
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-secondary">for</span> u, v, weight{" "}
                          <span className="text-secondary">in</span> edges:
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;graph[u][v] = min(graph[u].get(v,{" "}
                          <span className="text-primary-container">float</span>(
                          <span className="text-primary-container">&apos;inf&apos;</span>
                          )), weight)
                          <br />
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-text-muted">
                            # Initialize priority frontier with edge backpressure control
                          </span>
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;frontier = [(0, 0, 0)] &nbsp;
                          <span className="text-text-muted"># (cost, node, hops)</span>
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;visited = {"{}"}
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-secondary">while</span> frontier:
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;curr_cost, curr_node, hops = frontier.pop(0)
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-secondary">if</span> curr_node == nodes - 1{" "}
                          <span className="text-secondary">and</span> hops &lt;= k_hops:
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-secondary">return</span> curr_cost
                          <br />
                          <span className="inline-block w-2 h-4 bg-primary-container animate-pulse align-middle"></span>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Test Suite Output & Execution Drawer */}
                    <div className="bg-surface-2 p-space-md flex flex-col gap-space-sm border-t border-surface-3">
                      <div className="flex items-center justify-between">
                        <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted text-[11px] sm:text-system-eyebrow">
                          VISIBLE TEST SUITE VERIFICATION
                        </span>
                        <span className="font-code-snippet text-code-snippet text-status-warning font-semibold">
                          2 / 3 PASSING
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs font-code-snippet text-code-snippet">
                        <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                          <span className="text-status-success flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-[16px]">
                              check_circle
                            </span>
                            TEST 01
                          </span>
                          <span className="text-text-muted font-mono-metric-sm text-[12px]">
                            18ms
                          </span>
                        </div>
                        <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                          <span className="text-status-success flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-[16px]">
                              check_circle
                            </span>
                            TEST 02
                          </span>
                          <span className="text-text-muted font-mono-metric-sm text-[12px]">
                            11ms
                          </span>
                        </div>
                        <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                          <span className="text-status-failure flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-[16px]">
                              cancel
                            </span>
                            TEST 03
                          </span>
                          <span className="text-status-failure font-mono-metric-sm text-[12px] font-bold">
                            WRONG ANS
                          </span>
                        </div>
                      </div>

                      {/* Terminal Diagnostic String */}
                      <div className="px-space-sm py-2 rounded bg-[#080A0B] text-status-failure font-code-snippet text-code-snippet flex items-center gap-space-sm border border-surface-3">
                        <span className="material-symbols-outlined text-[16px] shrink-0">
                          warning
                        </span>
                        <span className="text-[12px] sm:text-code-snippet">
                          {runMessage ||
                            "FAIL: Cyclic graph input #03 exceeded threshold. Re-entrant cycle backpressure triggered."}
                        </span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-space-sm pt-space-xs">
                        <button
                          onClick={handleRunTests}
                          disabled={isRunningTests}
                          className="px-space-md h-10 rounded bg-surface-3 text-text-primary font-display-hero font-semibold text-body-muted hover:bg-surface-variant transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 border border-surface-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isRunningTests ? "hourglass_empty" : "play_arrow"}
                          </span>
                          {isRunningTests ? "RUNNING..." : "RUN VISIBLE TESTS"}
                        </button>
                        <button
                          onClick={() => alert("Submission sent to deterministic kernel judge isolates!")}
                          className="px-space-lg h-10 rounded bg-primary-container text-on-primary font-display-hero font-bold text-body-muted hover:bg-[#F0FF70] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(213,239,46,0.18)] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            send
                          </span>
                          SUBMIT TO JUDGE
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Workspace: Opponent Live Telemetry (4 cols on lg) */}
                  <div className="lg:col-span-4 bg-surface-1 flex flex-col p-4 sm:p-space-lg justify-between gap-space-lg border-t lg:border-t-0 border-surface-3">
                    <div className="flex flex-col gap-space-lg">
                      {/* Opponent Persona Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-space-md">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-surface-3 flex items-center justify-center font-mono-metric-sm text-secondary font-bold border border-surface-2">
                            BG
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-space-xs">
                              <span className="font-card-title text-card-title text-text-primary">
                                Byteghost
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-surface-3 text-[10px] font-system-eyebrow text-secondary uppercase font-semibold">
                                RUST
                              </span>
                            </div>
                            <span className="font-body-muted text-body-muted text-text-muted text-[13px]">
                              Rank: Stack Hunter (1,273 Elo)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-surface-2 text-status-warning font-system-eyebrow text-system-eyebrow uppercase text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-status-warning animate-ping"></span>
                          RUNNING TESTS
                        </div>
                      </div>

                      {/* Opponent Status Telemetry Blocks */}
                      <div className="grid grid-cols-2 gap-space-sm">
                        <div className="p-3 sm:p-space-md rounded-lg bg-surface-2 flex flex-col gap-1 border border-surface-3">
                          <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted text-[11px]">
                            Visible Progress
                          </span>
                          <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary">
                            11 / 15
                          </span>
                          <span className="font-code-snippet text-code-snippet text-status-success text-[12px]">
                            Tests Verified
                          </span>
                        </div>
                        <div className="p-3 sm:p-space-md rounded-lg bg-surface-2 flex flex-col gap-1 border border-surface-3">
                          <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted text-[11px]">
                            Attempts Made
                          </span>
                          <span className="font-mono-metric-lg text-mono-metric-lg text-text-primary">
                            02
                          </span>
                          <span className="font-code-snippet text-code-snippet text-text-muted text-[12px]">
                            Penalty: 0s
                          </span>
                        </div>
                      </div>

                      {/* Confidential Code Obfuscation State */}
                      <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm relative overflow-hidden border border-surface-3">
                        <div className="flex items-center justify-between">
                          <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                            LIVE RUNTIME STREAM
                          </span>
                          <span className="font-code-snippet text-code-snippet text-text-muted flex items-center gap-1 text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">
                              lock
                            </span>
                            SOURCE ENCRYPTED
                          </span>
                        </div>
                        {/* Obfuscated Visual Representation */}
                        <div className="space-y-1.5 filter blur-[3px] select-none opacity-40 pointer-events-none">
                          <div className="h-3 w-5/6 bg-text-secondary rounded"></div>
                          <div className="h-3 w-3/4 bg-text-secondary rounded"></div>
                          <div className="h-3 w-full bg-text-secondary rounded"></div>
                          <div className="h-3 w-2/3 bg-text-secondary rounded"></div>
                          <div className="h-3 w-4/5 bg-text-secondary rounded"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-surface-2/75 backdrop-blur-[2px]">
                          <p className="font-code-snippet text-code-snippet text-text-secondary text-center px-space-md text-[12px]">
                            Opponent source is hidden until match finalization.
                            Telemetry updates in real-time.
                          </p>
                        </div>
                      </div>

                      {/* Real-time Activity Telemetry Feed */}
                      <div className="flex flex-col gap-space-xs font-code-snippet text-code-snippet text-text-muted text-[12px]">
                        <div className="flex items-center justify-between py-1 border-b border-surface-3/50">
                          <span className="text-text-secondary">
                            08:12 — Byteghost compiled Rust release target
                          </span>
                          <span className="text-status-success font-semibold">
                            SUCCESS
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-surface-3/50">
                          <span className="text-text-secondary">
                            08:29 — Test 08 encountered memory overflow
                          </span>
                          <span className="text-status-failure font-semibold">
                            OOM
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-text-secondary">
                            08:38 — Byteghost triggered visible suite #02
                          </span>
                          <span className="text-primary-container font-semibold">
                            EVALUATING
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Telemetry Meta */}
                    <div className="pt-space-md flex items-center justify-between font-system-eyebrow text-system-eyebrow text-text-muted border-t border-surface-3 text-[11px]">
                      <span>SECURITY: SANDBOX_V4</span>
                      <span>PING: 14ms (EU-CENTRAL)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 02: LIVE SYSTEM / CREDIBILITY STRIP */}
          <section className="w-full bg-surface-2 py-space-sm px-4 sm:px-6 md:px-8 lg:px-margin overflow-x-auto border-y border-surface-3">
            <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-space-lg whitespace-nowrap font-mono-metric-sm text-[12px] sm:text-[13px] text-text-muted min-w-[700px]">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                <span className="text-text-primary font-bold">1,284</span>
                <span>PLAYERS ONLINE</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs">
                <span className="text-text-primary font-bold">312</span>
                <span>ACTIVE MATCHES</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs">
                <span className="text-text-primary font-bold">24</span>
                <span>EDGE REGIONS</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs">
                <span className="text-primary-container font-bold">6</span>
                <span>RUNTIME COMPILERS</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs">
                <span>EU-WEST:</span>
                <span className="text-status-success font-bold">14ms</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs">
                <span>MATCH SERVER:</span>
                <span className="text-status-success font-bold">99.98% HEALTHY</span>
              </div>
              <span className="text-border-subtle">•</span>
              <div className="flex items-center gap-space-xs text-text-secondary">
                <span className="material-symbols-outlined text-[15px] text-status-success">
                  security
                </span>
                <span>JUDGE ISOLATES OPERATIONAL</span>
              </div>
            </div>
          </section>

          {/* SECTION 03: INTERACTIVE ARENA PREVIEW */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1">
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                  ARCHITECTURE OF COMBAT
                </span>
                <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                  THE ARENA IS THE PRODUCT.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary">
                  No multiple-choice trivia. No AI picking arbitrary winners.
                  Your code compiles in kernel-isolated containers. Your test
                  vector efficiency decides who climbs.
                </p>
              </div>

              {/* 3-Stage Progression Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-space-lg">
                {/* Stage 01: Matchmaking */}
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg relative overflow-hidden group hover:bg-surface-3 transition-colors border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-0.5 rounded bg-surface-1 font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                        STAGE 01
                      </span>
                      <span className="font-system-eyebrow text-system-eyebrow text-primary-container text-[11px]">
                        MATCHMAKING FOUND
                      </span>
                    </div>
                    <h3 className="font-card-title text-card-title text-text-primary">
                      Instant Low-Latency Pairing
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Deterministic matchmaking matches you within ±50 Elo in
                      under 12 seconds with latency-optimized routing.
                    </p>
                    <div className="p-space-md rounded bg-surface-1 flex flex-col gap-space-sm mt-space-sm border border-surface-3">
                      <div className="flex items-center justify-between">
                        <span className="font-code-snippet text-code-snippet text-text-primary">
                          Nano (You)
                        </span>
                        <span className="font-system-eyebrow text-system-eyebrow text-text-muted">
                          1,248 ELO
                        </span>
                      </div>
                      <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container w-4/5 animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-code-snippet text-code-snippet text-secondary">
                          Byteghost
                        </span>
                        <span className="font-system-eyebrow text-system-eyebrow text-text-muted">
                          1,273 ELO [RUST]
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="font-system-eyebrow text-system-eyebrow text-text-muted flex items-center gap-space-xs text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-status-success">
                      radar
                    </span>
                    <span>MATCH READY // COMMENCING IN 03s</span>
                  </div>
                </div>

                {/* Stage 02: Live Match */}
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg relative overflow-hidden group hover:bg-surface-3 transition-colors border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-0.5 rounded bg-surface-1 font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                        STAGE 02
                      </span>
                      <span className="font-system-eyebrow text-system-eyebrow text-status-warning text-[11px]">
                        PRESSURE PROTOCOL
                      </span>
                    </div>
                    <h3 className="font-card-title text-card-title text-text-primary">
                      The 15-Minute Breaching Run
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Continuous live stress telemetry. Code editor with hot
                      compiler feedback and zero client runtime execution
                      leakage.
                    </p>
                    <div className="p-space-md rounded bg-surface-1 flex flex-col gap-space-xs font-code-snippet text-code-snippet border border-surface-3">
                      <div className="flex items-center justify-between text-status-success">
                        <span>✓ 15 VISIBLE PASSED</span>
                        <span>84ms</span>
                      </div>
                      <div className="flex items-center justify-between text-status-warning">
                        <span>⚡ 40 HIDDEN IN PROGRESS</span>
                        <span>THREAD 04</span>
                      </div>
                      <div className="flex items-center justify-between text-text-muted">
                        <span>OPPONENT ATTEMPT 02</span>
                        <span className="text-status-failure">REJECTED</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-system-eyebrow text-system-eyebrow text-text-muted flex items-center gap-space-xs text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-status-warning">
                      bolt
                    </span>
                    <span>40 ADVERSARIAL HIDDEN SUITES RUNNING</span>
                  </div>
                </div>

                {/* Stage 03: Victory */}
                <div className="p-4 sm:p-space-lg rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg relative overflow-hidden group hover:bg-surface-3 transition-colors shadow-lg border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-0.5 rounded bg-surface-1 font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                        STAGE 03
                      </span>
                      <span className="font-system-eyebrow text-system-eyebrow text-status-success text-[11px]">
                        DECISIVE VERDICT
                      </span>
                    </div>
                    <h3 className="font-card-title text-card-title text-text-primary">
                      Instant Elo Settlement
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Judged on absolute correctness first, runtime efficiency
                      second. Zero margin for hand-waving code.
                    </p>
                    <div className="p-space-md rounded bg-surface-1 flex flex-col gap-space-xs border border-surface-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-metric-lg text-status-success font-bold">
                          VICTORY
                        </span>
                        <span className="font-mono-metric-sm text-primary-container font-bold">
                          +18 ELO
                        </span>
                      </div>
                      <div className="font-code-snippet text-code-snippet text-text-secondary flex justify-between">
                        <span>1,248 → 1,266 Elo</span>
                        <span className="text-text-primary">
                          40/40 Hidden (100%)
                        </span>
                      </div>
                      <span className="font-system-eyebrow text-[10px] sm:text-[11px] text-text-muted mt-1">
                        DECIDING FACTOR: CORRECTNESS ON HIDDEN EDGE CASES
                      </span>
                    </div>
                  </div>
                  <div className="font-system-eyebrow text-system-eyebrow text-status-success flex items-center gap-space-xs text-[11px]">
                    <span className="material-symbols-outlined text-[16px]">
                      military_tech
                    </span>
                    <span>RESULT SECURED ON JUDGE RUNTIME</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04: GAME MODES (Asymmetric Editorial Grid) */}
          <section
            id="combat-modes"
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1/30"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                  DEPLOYMENT VECTORS
                </span>
                <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                  ENGAGE ACROSS THREE PROTOCOLS
                </h2>
                <p className="font-body-default text-body-default text-text-secondary">
                  Choose your stake: Solo ranked glory, private team skirmishes,
                  or cooperative multi-operator squad relays.
                </p>
              </div>

              {/* Asymmetric Grid: 60% Dominant / 20% / 20% */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-space-lg">
                {/* Dominant Card: Ranked 1v1 (7 cols on lg, approx 60%) */}
                <div className="lg:col-span-7 rounded-xl bg-surface-2 p-4 sm:p-space-xl flex flex-col justify-between gap-6 sm:gap-space-xl relative overflow-hidden border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="px-space-sm py-1 rounded bg-primary-container/10 text-primary-container font-system-eyebrow text-system-eyebrow uppercase font-semibold text-[11px]">
                        COMPETITIVE STANDARD
                      </span>
                      <span className="font-code-snippet text-code-snippet text-status-warning text-[12px]">
                        STAKES: ±75 ELO DELTA
                      </span>
                    </div>
                    <h3 className="font-display-hero text-section-heading text-text-primary uppercase">
                      RANKED 1V1 BREACH
                    </h3>
                    <p className="font-body-default text-text-secondary max-w-xl">
                      15-minute high-pressure algorithmic duel. Opponents matched
                      strictly by rating. Both submit against hidden deterministic
                      vectors under relentless execution constraints.
                    </p>

                    {/* Radar Matchmaking Graphic Simulation */}
                    <div className="p-4 sm:p-space-lg rounded-lg bg-surface-1 flex flex-col gap-space-md my-space-sm border border-surface-3">
                      <div className="flex items-center justify-between font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                        <span>RADAR SEARCH // ACTIVE POOL</span>
                        <span className="text-status-success font-semibold">
                          312 DUELS IN PROGRESS
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-around py-4 gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-14 h-14 rounded-full bg-surface-3 flex items-center justify-center border-2 border-primary-container">
                            <span className="font-mono-metric-sm text-primary-container font-bold">
                              YOU
                            </span>
                          </div>
                          <span className="font-code-snippet text-code-snippet text-text-primary">
                            Nano
                          </span>
                          <span className="font-system-eyebrow text-[11px] text-text-muted">
                            1,248 Elo
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="material-symbols-outlined text-[32px] text-primary-container animate-spin">
                            cyclone
                          </span>
                          <span className="font-code-snippet text-[11px] text-text-muted">
                            SEARCHING ±25 ELO
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-70">
                          <div className="w-14 h-14 rounded-full bg-surface-3 flex items-center justify-center border-2 border-secondary">
                            <span className="font-mono-metric-sm text-secondary font-bold">
                              ???
                            </span>
                          </div>
                          <span className="font-code-snippet text-code-snippet text-text-secondary">
                            Rival Node
                          </span>
                          <span className="font-system-eyebrow text-[11px] text-text-muted">
                            1,250~1,280 Elo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-space-md border-t border-surface-3 gap-3">
                    <span className="font-code-snippet text-code-snippet text-text-muted text-[12px]">
                      15 MIN MATCH • HIDDEN TESTS • ELO RATED
                    </span>
                    <button
                      onClick={() => alert("Initiating 1v1 matchmaking radar...")}
                      className="px-6 sm:px-space-xl h-11 sm:h-12 rounded bg-primary-container text-on-primary font-display-hero font-bold text-body-default hover:bg-[#F0FF70] transition-colors flex items-center justify-center gap-space-xs cursor-pointer w-full sm:w-auto"
                    >
                      <span>ENTER RANKED</span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Supporting Card: Private Uplink (3 cols on lg) */}
                <div className="lg:col-span-3 rounded-xl bg-surface-2 p-4 sm:p-space-lg flex flex-col justify-between gap-space-lg border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-1 rounded bg-surface-3 font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                        SPARRING
                      </span>
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                        UNRATED
                      </span>
                    </div>
                    <h3 className="font-card-title text-card-title text-text-primary">
                      Secure Uplink
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Create an isolated private duel. Share a direct breach link
                      with colleagues or friends. Custom time limits and custom
                      problem domains.
                    </p>
                    <div className="p-space-md rounded bg-surface-1 flex flex-col gap-space-xs font-code-snippet text-code-snippet border border-surface-3">
                      <span className="text-text-muted text-[11px] uppercase">
                        ROOM CODE
                      </span>
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="font-bold text-secondary">
                          #A9F2-BREACH
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="material-symbols-outlined text-[18px] cursor-pointer hover:text-text-primary text-text-muted"
                          title="Copy code"
                        >
                          {copiedCode ? "check" : "content_copy"}
                        </button>
                      </div>
                      <span className="text-status-success text-[11px]">
                        {copiedCode ? "COPIED TO CLIPBOARD!" : "SLOT 1/2 OCCUPIED"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Private Uplink Created! Code: #A9F2-BREACH")}
                    className="w-full h-11 rounded bg-surface-3 text-text-primary font-display-hero font-semibold text-body-muted hover:bg-surface-variant transition-colors flex items-center justify-center gap-space-xs cursor-pointer border border-surface-2"
                  >
                    <span>CREATE UPLINK</span>
                    <span className="material-symbols-outlined text-[16px]">
                      link
                    </span>
                  </button>
                </div>

                {/* Supporting Card: Squad Breach (2 cols on lg) */}
                <div className="lg:col-span-2 rounded-xl bg-surface-2 p-4 sm:p-space-lg flex flex-col justify-between gap-space-lg border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-1 rounded bg-secondary/10 text-secondary font-system-eyebrow text-system-eyebrow uppercase font-semibold text-[11px]">
                        TEAM
                      </span>
                      <span className="font-system-eyebrow text-system-eyebrow text-secondary font-semibold text-[11px]">
                        3V3 / 5V5
                      </span>
                    </div>
                    <h3 className="font-card-title text-card-title text-text-primary">
                      Squad Relay
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Pass execution tokens in relay mode. One member codes, two
                      optimize tests concurrently.
                    </p>
                    <div className="flex flex-col gap-1.5 font-code-snippet text-[11px]">
                      <div className="p-1.5 rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <span>Nano</span>
                        <span className="text-status-success font-semibold">
                          READY
                        </span>
                      </div>
                      <div className="p-1.5 rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <span>Voidrunner</span>
                        <span className="text-primary-container font-semibold">
                          CODING
                        </span>
                      </div>
                      <div className="p-1.5 rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <span>StackZero</span>
                        <span className="text-secondary font-semibold">
                          TESTING
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Joining Squad Relay Queue...")}
                    className="w-full h-11 rounded bg-surface-3 text-text-primary font-display-hero font-semibold text-body-muted hover:bg-surface-variant transition-colors flex items-center justify-center gap-space-xs cursor-pointer border border-surface-2"
                  >
                    <span>ENTER SQUAD</span>
                    <span className="material-symbols-outlined text-[16px]">
                      groups
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 05: ELO RANK LADDER ('CLIMB THE SYSTEM') */}
          <section
            id="rank-ladder"
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                    RATING INFRASTRUCTURE
                  </span>
                  <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                    CLIMB THE SYSTEM
                  </h2>
                  <p className="font-body-default text-body-default text-text-secondary">
                    Six disciplined engineering tiers. No artificial decay
                    forgiveness. Your rating directly correlates to algorithmic
                    execution speed and problem complexity mastery.
                  </p>
                </div>
                {/* Current Player Pin Card */}
                <div className="p-space-md rounded-lg bg-surface-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-space-lg border border-surface-3">
                  <div className="flex flex-col">
                    <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                      ACTIVE OPERATOR
                    </span>
                    <span className="font-card-title text-card-title text-text-primary font-semibold">
                      Nano
                    </span>
                    <span className="font-code-snippet text-code-snippet text-primary-container text-[12px]">
                      Stack Hunter (1,248 Elo)
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                      NEXT TARGET
                    </span>
                    <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary">
                      Kernel (1,500)
                    </span>
                    <span className="font-code-snippet text-[11px] sm:text-[12px] text-status-warning">
                      252 Elo remaining
                    </span>
                  </div>
                </div>
              </div>

              {/* Rank Tier Horizontal Ladder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-space-md">
                {/* Tier 1 */}
                <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm opacity-60 hover:opacity-100 transition-opacity border border-surface-3">
                  <span className="font-mono-metric-sm text-mono-metric-sm text-text-muted">
                    01
                  </span>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-text-primary font-semibold">
                      Scripter
                    </span>
                    <span className="font-code-snippet text-code-snippet text-text-secondary">
                      800 - 999 Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    Syntax mastery, basic arrays, two-pointer fundamentals.
                  </span>
                </div>

                {/* Tier 2 */}
                <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm opacity-70 hover:opacity-100 transition-opacity border border-surface-3">
                  <span className="font-mono-metric-sm text-mono-metric-sm text-text-muted">
                    02
                  </span>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-text-primary font-semibold">
                      Packet Runner
                    </span>
                    <span className="font-code-snippet text-code-snippet text-text-secondary">
                      1,000 - 1,249 Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    Binary search, trees, hash mapping, sub-quadratic traversal.
                  </span>
                </div>

                {/* Tier 3: CURRENT OPERATOR TIER */}
                <div className="p-space-md rounded-lg bg-surface-3 flex flex-col gap-space-sm relative shadow-md border-2 border-primary-container">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-metric-sm text-mono-metric-sm text-primary-container font-bold">
                      03
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-system-eyebrow text-[10px] uppercase font-bold">
                      YOU ARE HERE
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-primary-container font-bold">
                      Stack Hunter
                    </span>
                    <span className="font-code-snippet text-code-snippet text-text-primary">
                      1,250 - 1,499 Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-secondary">
                    Dynamic programming, graph BFS/DFS, priority queues.
                  </span>
                  <div className="w-full bg-surface-1 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-primary-container h-full w-[85%]"></div>
                  </div>
                </div>

                {/* Tier 4 */}
                <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm opacity-90 hover:opacity-100 transition-opacity border border-surface-3">
                  <span className="font-mono-metric-sm text-mono-metric-sm text-secondary font-bold">
                    04
                  </span>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-text-primary font-semibold">
                      Kernel
                    </span>
                    <span className="font-code-snippet text-code-snippet text-secondary">
                      1,500 - 1,899 Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    Segment trees, bit manipulation, advanced memoization.
                  </span>
                </div>

                {/* Tier 5 */}
                <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm opacity-80 hover:opacity-100 transition-opacity border border-surface-3">
                  <span className="font-mono-metric-sm text-mono-metric-sm text-text-primary font-bold">
                    05
                  </span>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-text-primary font-semibold">
                      Architect
                    </span>
                    <span className="font-code-snippet text-code-snippet text-text-primary">
                      1,900 - 2,299 Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    Network flow, heavy-light decomposition, adversarial games.
                  </span>
                </div>

                {/* Tier 6 */}
                <div className="p-space-md rounded-lg bg-surface-2 flex flex-col gap-space-sm opacity-90 hover:opacity-100 transition-opacity border border-surface-3">
                  <span className="font-mono-metric-sm text-mono-metric-sm text-primary-container font-bold">
                    06
                  </span>
                  <div className="flex flex-col">
                    <span className="font-card-title text-body-default text-text-primary font-semibold">
                      Neural God
                    </span>
                    <span className="font-code-snippet text-code-snippet text-primary-container">
                      2,300+ Elo
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[11px] text-text-muted">
                    Top 0.1% worldwide. Zero algorithmic concessions.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 06: EXECUTION & JUDGING INFRASTRUCTURE ('YOUR CODE ACTUALLY RUNS') */}
          <section
            id="engine-section"
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1/40"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                  DETERMINISTIC EVALUATION ENGINE
                </span>
                <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                  YOUR CODE ACTUALLY RUNS.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary">
                  No simulated scoring. Every submission executes inside a
                  secure Linux micro-VM isolate with nanosecond CPU counter
                  throttling and fixed seed pseudo-random vectors.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-space-lg items-stretch">
                {/* Pipeline Stage Visualizer (7 cols) */}
                <div className="lg:col-span-7 p-4 sm:p-space-lg rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                        EXECUTION PIPELINE // ISOLATE-V4
                      </span>
                      <span className="font-code-snippet text-code-snippet text-status-success font-semibold text-[12px]">
                        HARDWARE NORMALIZED
                      </span>
                    </div>
                    <div className="space-y-space-sm font-code-snippet text-code-snippet text-[12px] sm:text-code-snippet">
                      {/* Pipeline Step 1 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-6 h-6 rounded bg-surface-3 flex items-center justify-center font-bold text-text-muted text-[11px]">
                            01
                          </span>
                          <span className="text-text-primary">
                            Submission Received & Sanitized
                          </span>
                        </div>
                        <span className="text-status-success">0.2ms</span>
                      </div>
                      {/* Pipeline Step 2 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-6 h-6 rounded bg-surface-3 flex items-center justify-center font-bold text-text-muted text-[11px]">
                            02
                          </span>
                          <span className="text-text-primary">
                            Kernel Micro-VM Spawn & Compilation
                          </span>
                        </div>
                        <span className="text-status-success">14.1ms</span>
                      </div>
                      {/* Pipeline Step 3 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-6 h-6 rounded bg-surface-3 flex items-center justify-center font-bold text-text-muted text-[11px]">
                            03
                          </span>
                          <span className="text-text-primary">
                            Visible Sample Tests Evaluation (15/15)
                          </span>
                        </div>
                        <span className="text-status-success">PASSED</span>
                      </div>
                      {/* Pipeline Step 4 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-6 h-6 rounded bg-primary-container/20 text-primary-container flex items-center justify-center font-bold text-[11px]">
                            04
                          </span>
                          <span className="text-primary-container font-semibold">
                            40 Adversarial Hidden Test Vectors
                          </span>
                        </div>
                        <span className="text-primary-container font-bold">
                          40/40 PASSED
                        </span>
                      </div>
                      {/* Pipeline Step 5 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-6 h-6 rounded bg-surface-3 flex items-center justify-center font-bold text-text-muted text-[11px]">
                            05
                          </span>
                          <span className="text-text-primary">
                            Memory & Cycles Normalization
                          </span>
                        </div>
                        <span className="text-status-success">
                          81.4ms (Total)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md rounded bg-[#080A0B] flex items-center justify-between border border-surface-3 text-[11px] sm:text-code-snippet">
                    <span className="font-code-snippet text-text-muted">
                      VERDICT:
                    </span>
                    <span className="font-code-snippet text-primary-container font-bold">
                      100% CORRECT // ZERO FLUIDITY PENALTY
                    </span>
                  </div>
                </div>

                {/* Deterministic Judging Rules (5 cols) */}
                <div className="lg:col-span-5 p-4 sm:p-space-lg rounded-xl bg-surface-2 flex flex-col justify-between gap-space-md border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-wider font-semibold text-[11px]">
                      ABSOLUTE METRIC CRITERIA
                    </span>
                    <h3 className="font-card-title text-card-title text-text-primary font-bold">
                      NO AI DECIDES THE WINNER.
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Judged strictly by mathematical priority hierarchy.
                      Subjective stylistic opinions are rejected at compile time.
                    </p>
                    <div className="flex flex-col gap-space-sm pt-space-xs font-body-muted text-body-muted">
                      <div className="flex items-start gap-space-sm">
                        <span className="font-mono-metric-sm text-primary-container font-bold">
                          01
                        </span>
                        <div>
                          <span className="text-text-primary font-bold">
                            Correctness:
                          </span>
                          <p className="text-text-secondary">
                            Pass all hidden edge-case vectors. Even 1 failed
                            hidden case forfeits to an opponent who solved all.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-sm">
                        <span className="font-mono-metric-sm text-secondary font-bold">
                          02
                        </span>
                        <div>
                          <span className="text-text-primary font-bold">
                            Normalized Runtime:
                          </span>
                          <p className="text-text-secondary">
                            If correctness is equal, lowest total instruction
                            cycle time across all test suites secures the victory.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-sm">
                        <span className="font-mono-metric-sm text-text-muted font-bold">
                          03
                        </span>
                        <div>
                          <span className="text-text-primary font-bold">
                            Clock Submission Timestamp:
                          </span>
                          <p className="text-text-secondary">
                            If both correctness and normalized runtime tie,
                            earliest judge submission timestamp takes the Elo
                            delta.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Runtime Head-to-Head Compare Badge */}
                  <div className="p-space-md rounded bg-surface-1 flex items-center justify-between font-code-snippet text-code-snippet border border-surface-3">
                    <div>
                      <span className="text-text-muted block text-[11px]">
                        NANO RUNTIME
                      </span>
                      <span className="text-status-success font-bold text-mono-metric-sm">
                        81 ms
                      </span>
                    </div>
                    <span className="text-text-muted font-bold text-[18px]">
                      vs
                    </span>
                    <div className="text-right">
                      <span className="text-text-muted block text-[11px]">
                        BYTEGHOST RUNTIME
                      </span>
                      <span className="text-text-secondary font-bold text-mono-metric-sm">
                        96 ms
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 07: SYNDICATE HUB & COMPETITIVE ECOSYSTEM */}
          <section
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1"
            id="spectate-section"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                    TOURNAMENT NETWORK
                  </span>
                  <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                    MORE THAN 1V1
                  </h2>
                  <p className="font-body-default text-body-default text-text-secondary">
                    Global syndicated brackets, corporate team championships, and
                    live high-frequency spectator feeds.
                  </p>
                </div>
                <a
                  className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase inline-flex items-center gap-1 hover:underline text-[12px]"
                  href="#"
                >
                  <span>VIEW ALL ACTIVE TOURNAMENTS</span>
                  <span className="material-symbols-outlined text-[16px]">
                    north_east
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-space-lg">
                {/* Syndicate Open Season 04 Feature Card (8 cols) */}
                <div className="lg:col-span-8 rounded-xl bg-surface-2 p-4 sm:p-space-xl flex flex-col justify-between gap-space-lg border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="px-space-sm py-1 rounded bg-surface-3 font-system-eyebrow text-system-eyebrow text-primary-container uppercase font-semibold text-[11px]">
                        CHAMPIONSHIP OPEN // SEASON 04
                      </span>
                      <div className="flex items-center gap-space-xs text-status-warning font-mono-metric-sm text-[12px] sm:text-[13px]">
                        <span className="material-symbols-outlined text-[16px]">
                          schedule
                        </span>
                        <span>LOCK IN: 00:14:22</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                      <div>
                        <h3 className="font-display-hero text-section-heading text-text-primary">
                          SYNDICATE PRIME CUP
                        </h3>
                        <p className="font-body-muted text-body-muted text-text-secondary">
                          Single-elimination breach tournament. 128 verified
                          programmers.
                        </p>
                      </div>
                      <div className="p-space-md rounded bg-surface-1 text-left sm:text-right border border-surface-3 shrink-0">
                        <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase block text-[11px]">
                          PRIZE POOL
                        </span>
                        <span className="font-mono-metric-lg text-primary-container font-bold">
                          $25,000 USD
                        </span>
                      </div>
                    </div>

                    {/* Quarterfinals Bracket Visualizer Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-space-sm font-code-snippet text-code-snippet">
                      <div className="p-space-sm rounded bg-surface-1 flex flex-col gap-1 border border-surface-3">
                        <span className="text-text-muted text-[10px] uppercase">
                          MATCH 01 (LIVE)
                        </span>
                        <span className="text-primary-container font-semibold">
                          k0de_x (2140)
                        </span>
                        <span className="text-text-secondary">vs d4rk (2080)</span>
                      </div>
                      <div className="p-space-sm rounded bg-surface-1 flex flex-col gap-1 border border-surface-3">
                        <span className="text-text-muted text-[10px] uppercase">
                          MATCH 02 (LIVE)
                        </span>
                        <span className="text-text-primary font-semibold">
                          neuro (2290)
                        </span>
                        <span className="text-text-secondary">vs void_0 (2210)</span>
                      </div>
                      <div className="p-space-sm rounded bg-surface-1 flex flex-col gap-1 border border-surface-3">
                        <span className="text-text-muted text-[10px] uppercase">
                          MATCH 03 (NEXT)
                        </span>
                        <span className="text-text-muted">syn_prime</span>
                        <span className="text-text-muted">vs zero_day</span>
                      </div>
                      <div className="p-space-sm rounded bg-surface-1 flex flex-col gap-1 border border-surface-3">
                        <span className="text-text-muted text-[10px] uppercase">
                          MATCH 04 (NEXT)
                        </span>
                        <span className="text-text-muted">quantum</span>
                        <span className="text-text-muted">vs rust_ace</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-space-md border-t border-surface-3 gap-3">
                    <span className="font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                      128 OPERATORS REGISTERED // 8 MATCHES IN FLIGHT
                    </span>
                    <button
                      onClick={() => alert("Joining spectator stream...")}
                      className="px-space-lg h-10 rounded bg-surface-3 text-text-primary font-display-hero font-semibold text-body-muted hover:bg-surface-variant transition-colors cursor-pointer border border-surface-2 w-full sm:w-auto text-center"
                    >
                      WATCH SPECTATOR FEED →
                    </button>
                  </div>
                </div>

                {/* Syndicate Squad Leaderboard Preview (4 cols) */}
                <div className="lg:col-span-4 rounded-xl bg-surface-2 p-4 sm:p-space-lg flex flex-col justify-between gap-space-md border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                        TOP SYNDICATE SQUADS
                      </span>
                      <span className="font-code-snippet text-code-snippet text-secondary font-semibold text-[12px]">
                        GLOBAL CLUSTERS
                      </span>
                    </div>
                    <div className="flex flex-col gap-space-xs font-code-snippet text-code-snippet">
                      {/* Squad 1 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="text-primary-container font-bold">
                            #1
                          </span>
                          <div>
                            <span className="text-text-primary block font-bold">
                              NULL SECTOR
                            </span>
                            <span className="text-text-muted text-[11px]">
                              5 Members • 94% Win Rate
                            </span>
                          </div>
                        </div>
                        <span className="font-mono-metric-sm text-text-primary text-[14px]">
                          2,412 Elo
                        </span>
                      </div>
                      {/* Squad 2 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="text-text-secondary font-bold">
                            #2
                          </span>
                          <div>
                            <span className="text-text-primary block font-bold">
                              HEX FORGE
                            </span>
                            <span className="text-text-muted text-[11px]">
                              5 Members • 89% Win Rate
                            </span>
                          </div>
                        </div>
                        <span className="font-mono-metric-sm text-text-primary text-[14px]">
                          2,380 Elo
                        </span>
                      </div>
                      {/* Squad 3 */}
                      <div className="p-space-sm rounded bg-surface-1 flex items-center justify-between border border-surface-3">
                        <div className="flex items-center gap-space-sm">
                          <span className="text-text-muted font-bold">#3</span>
                          <div>
                            <span className="text-text-primary block font-bold">
                              BYTE PROTOCOL
                            </span>
                            <span className="text-text-muted text-[11px]">
                              4 Members • 86% Win Rate
                            </span>
                          </div>
                        </div>
                        <span className="font-mono-metric-sm text-text-primary text-[14px]">
                          2,315 Elo
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Register Squad modal opened!")}
                    className="w-full h-10 rounded bg-surface-3 text-text-primary font-display-hero font-semibold text-body-muted hover:bg-surface-variant transition-colors flex items-center justify-center gap-1 cursor-pointer border border-surface-2"
                  >
                    <span>REGISTER A SQUAD</span>
                    <span className="material-symbols-outlined text-[16px]">
                      add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 08: DEVELOPERS VS TEAMS / CLUBS */}
          <section
            id="teams-section"
            className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1/30"
          >
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                  ECOSYSTEM SEGREGATION
                </span>
                <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                  ENGINEERED FOR INDIVIDUALS AND TEAMS
                </h2>
                <p className="font-body-default text-body-default text-text-secondary">
                  Whether you want raw personal Elo validation or
                  enterprise-grade hackathon infrastructure for hiring and
                  calibration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-space-lg">
                {/* Individual Developers Card */}
                <div className="p-6 sm:p-space-xl rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg relative overflow-hidden border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <span className="px-space-sm py-1 rounded bg-surface-3 text-primary-container font-system-eyebrow text-system-eyebrow uppercase w-fit font-semibold text-[11px]">
                      FOR INDIVIDUAL DEVELOPERS
                    </span>
                    <h3 className="font-card-title text-card-title text-text-primary font-bold">
                      Sharpen Under Fire.
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Stop solving sterile interview problems in isolation.
                      Enter real combat where actual time constraints and
                      unpredictable rivals expose algorithm weak spots.
                    </p>
                    <ul className="space-y-space-sm font-body-muted text-body-muted text-text-secondary pt-space-xs">
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary-container text-[18px]">
                          check_circle
                        </span>
                        <span>Authentic, unassisted 1v1 Elo rating</span>
                      </li>
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary-container text-[18px]">
                          check_circle
                        </span>
                        <span>
                          Deep post-game execution profiling (CPU, memory, cycles)
                        </span>
                      </li>
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-primary-container text-[18px]">
                          check_circle
                        </span>
                        <span>
                          Direct translation to technical screening confidence
                        </span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="font-display-hero font-bold text-body-muted text-primary-container inline-flex items-center gap-1 hover:underline pt-2"
                    href="#arena-experience"
                  >
                    <span>START COMPETING FREE →</span>
                  </a>
                </div>

                {/* Teams / Bootcamps / Tech Orgs Card */}
                <div className="p-6 sm:p-space-xl rounded-xl bg-surface-2 flex flex-col justify-between gap-space-lg relative overflow-hidden border border-surface-3">
                  <div className="flex flex-col gap-space-md">
                    <span className="px-space-sm py-1 rounded bg-surface-3 text-secondary font-system-eyebrow text-system-eyebrow uppercase w-fit font-semibold text-[11px]">
                      FOR TEAMS, CLUBS & ORGS
                    </span>
                    <h3 className="font-card-title text-card-title text-text-primary font-bold">
                      Host High-Stakes Internal Leagues.
                    </h3>
                    <p className="font-body-muted text-body-muted text-text-secondary">
                      Run company-wide hackathon showdowns, student engineering
                      leagues, or blind recruitment screening rounds with
                      automated zero-bias deterministic scoring.
                    </p>
                    <ul className="space-y-space-sm font-body-muted text-body-muted text-text-secondary pt-space-xs">
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          verified
                        </span>
                        <span>
                          Private dedicated tenant rooms with custom problem
                          creation
                        </span>
                      </li>
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          verified
                        </span>
                        <span>
                          Anti-cheat telemetry & code copy-paste detection
                          forensics
                        </span>
                      </li>
                      <li className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          verified
                        </span>
                        <span>
                          Aggregated team skill matrix and analytics exports
                        </span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="font-display-hero font-bold text-body-muted text-secondary inline-flex items-center gap-1 hover:underline pt-2"
                    href="#"
                  >
                    <span>EXPLORE FOR TEAMS →</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 09: POST MATCH FORENSICS ('THE MATCH ENDS. THE DATA DOESN'T.') */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1">
            <div className="max-w-[1720px] mx-auto flex flex-col gap-8 sm:gap-space-xl">
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <span className="font-system-eyebrow text-system-eyebrow text-primary-container uppercase tracking-widest text-[11px] sm:text-system-eyebrow">
                  TELEMETRY ARCHIVE
                </span>
                <h2 className="font-display-hero text-section-heading text-text-primary uppercase tracking-tight">
                  THE MATCH ENDS. THE DATA DOESN&apos;T.
                </h2>
                <p className="font-body-default text-body-default text-text-secondary">
                  Every battle generates a comprehensive forensic autopsy.
                  Compare line-by-line syntax, adversarial edge cases, and cycle
                  consumption metrics.
                </p>
              </div>

              {/* Large Match Report Preview Surface */}
              <div className="w-full rounded-xl bg-surface-2 p-4 sm:p-space-lg flex flex-col gap-space-lg border border-surface-3">
                {/* Post-Match Nav Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-3 pb-space-sm gap-3">
                  <div className="flex items-center gap-2 font-code-snippet text-code-snippet overflow-x-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`px-3 sm:px-space-md py-1.5 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap text-[12px] sm:text-code-snippet ${
                        activeTab === "overview"
                          ? "bg-surface-3 text-primary-container border border-surface-1"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      01 OVERVIEW
                    </button>
                    <button
                      onClick={() => setActiveTab("diff")}
                      className={`px-3 sm:px-space-md py-1.5 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap text-[12px] sm:text-code-snippet ${
                        activeTab === "diff"
                          ? "bg-surface-3 text-primary-container border border-surface-1"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      02 CODE DIFF
                    </button>
                    <button
                      onClick={() => setActiveTab("autopsy")}
                      className={`px-3 sm:px-space-md py-1.5 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap text-[12px] sm:text-code-snippet ${
                        activeTab === "autopsy"
                          ? "bg-surface-3 text-primary-container border border-surface-1"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      03 TEST AUTOPSY
                    </button>
                    <button
                      onClick={() => setActiveTab("profiling")}
                      className={`px-3 sm:px-space-md py-1.5 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap text-[12px] sm:text-code-snippet ${
                        activeTab === "profiling"
                          ? "bg-surface-3 text-primary-container border border-surface-1"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      04 PROFILING
                    </button>
                  </div>
                  <div className="font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                    MATCH RECORD:{" "}
                    <span className="text-text-primary">#CL-9842-ARCHIVE</span>
                  </div>
                </div>

                {/* Comparative Metrics Grid */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-space-lg">
                    {/* Winner: Nano */}
                    <div className="p-4 sm:p-space-lg rounded-lg bg-surface-1 flex flex-col gap-space-md border border-surface-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-sm">
                          <span className="px-2 py-0.5 rounded bg-status-success/20 text-status-success font-system-eyebrow text-[11px] font-bold">
                            VICTOR
                          </span>
                          <span className="font-card-title text-card-title text-text-primary font-bold">
                            Nano
                          </span>
                        </div>
                        <span className="font-mono-metric-sm text-status-success font-bold">
                          +18 ELO
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-code-snippet text-code-snippet">
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            TEST SCORE
                          </span>
                          <span className="text-status-success font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            40/40
                          </span>
                        </div>
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            AVG LATENCY
                          </span>
                          <span className="text-text-primary font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            81 ms
                          </span>
                        </div>
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            PEAK MEM
                          </span>
                          <span className="text-text-primary font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            18.4 MB
                          </span>
                        </div>
                      </div>
                      <p className="font-body-muted text-body-muted text-text-secondary text-[13px] sm:text-body-muted">
                        Key edge cases passed: Empty cyclic adjacency graph,
                        10^5 boundary traversal, disconnected subgraphs.
                      </p>
                    </div>

                    {/* Defeated: Byteghost */}
                    <div className="p-4 sm:p-space-lg rounded-lg bg-surface-1 flex flex-col gap-space-md opacity-80 border border-surface-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-sm">
                          <span className="px-2 py-0.5 rounded bg-status-failure/20 text-status-failure font-system-eyebrow text-[11px] font-bold">
                            DEFEAT
                          </span>
                          <span className="font-card-title text-card-title text-text-primary font-bold">
                            Byteghost
                          </span>
                        </div>
                        <span className="font-mono-metric-sm text-status-failure font-bold">
                          -16 ELO
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-code-snippet text-code-snippet">
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            TEST SCORE
                          </span>
                          <span className="text-status-warning font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            37/40
                          </span>
                        </div>
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            AVG LATENCY
                          </span>
                          <span className="text-text-primary font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            73 ms
                          </span>
                        </div>
                        <div className="p-2 sm:p-space-sm rounded bg-surface-2 border border-surface-3">
                          <span className="text-text-muted block text-[10px] sm:text-[11px]">
                            PEAK MEM
                          </span>
                          <span className="text-text-primary font-bold text-mono-metric-sm text-[16px] sm:text-mono-metric-sm">
                            12.1 MB
                          </span>
                        </div>
                      </div>
                      <p className="font-body-muted text-body-muted text-text-secondary text-[13px] sm:text-body-muted">
                        Failed test vectors: Suite #38 (Dynamic backpressure
                        overflow) and Suite #40 (Memory leak during recursion).
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "diff" && (
                  <div className="p-4 rounded-lg bg-surface-1 font-code-snippet text-code-snippet text-text-secondary font-mono border border-surface-3 overflow-x-auto text-[12px] sm:text-code-snippet">
                    <div className="text-text-muted pb-2 border-b border-surface-3 mb-2 flex flex-col sm:flex-row justify-between gap-1">
                      <span>NANO (Python 3.12) vs BYTEGHOST (Rust 1.78)</span>
                      <span className="text-status-success font-semibold">ALGORITHMIC DIVERGENCE AT L24</span>
                    </div>
                    <div className="space-y-1.5 min-w-[500px]">
                      <div className="text-status-success bg-status-success/10 px-2.5 py-1 rounded">
                        + Nano: Memoized Dijkstra with hop-budget state pruning: (cost, node, hops)
                      </div>
                      <div className="text-status-failure bg-status-failure/10 px-2.5 py-1 rounded">
                        - Byteghost: Recursive Bellman-Ford variant without cycle-backpressure guard
                      </div>
                      <div className="text-text-muted px-2.5 py-1">
                        {"// Result: Byteghost timed out on dense graph vectors with k_hops > 14"}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "autopsy" && (
                  <div className="p-4 rounded-lg bg-surface-1 font-code-snippet text-code-snippet border border-surface-3 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-3 text-text-muted text-[11px] sm:text-code-snippet">
                      <span>ADVERSARIAL SUITE BREAKDOWN (40 VECTORS)</span>
                      <span className="text-primary-container font-semibold">ISOLATE VALIDATED</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[12px]">
                      <div className="p-2.5 rounded bg-surface-2 border border-surface-3">
                        <span className="text-[10px] text-text-muted block">VECTOR #37 (DENSE MESH)</span>
                        <span className="text-status-success font-bold">Both Passed (42ms vs 38ms)</span>
                      </div>
                      <div className="p-2.5 rounded bg-surface-2 border border-surface-3">
                        <span className="text-[10px] text-text-muted block">VECTOR #38 (CYCLE BACKPRESSURE)</span>
                        <span className="text-status-failure font-bold">Byteghost Failed (Timeout)</span>
                      </div>
                      <div className="p-2.5 rounded bg-surface-2 border border-surface-3">
                        <span className="text-[10px] text-text-muted block">VECTOR #39 (NEGATIVE HOP SIM)</span>
                        <span className="text-status-success font-bold">Both Passed (61ms vs 52ms)</span>
                      </div>
                      <div className="p-2.5 rounded bg-surface-2 border border-surface-3">
                        <span className="text-[10px] text-text-muted block">VECTOR #40 (EXTREME CAPACITY)</span>
                        <span className="text-status-failure font-bold">Byteghost Failed (OOM)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "profiling" && (
                  <div className="p-4 rounded-lg bg-surface-1 font-code-snippet text-code-snippet border border-surface-3 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-3 text-text-muted text-[11px] sm:text-code-snippet">
                      <span>HARDWARE CYCLE PROFILING (x86-64 HARDENED)</span>
                      <span className="text-status-success font-semibold">NANOSECOND ACCURACY</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                      <div className="p-2.5 sm:p-3 rounded bg-surface-2 border border-surface-3">
                        <span className="text-text-muted text-[10px] sm:text-[11px] block">NANO INSTRUCTIONS</span>
                        <span className="text-text-primary font-bold text-mono-metric-sm text-[15px] sm:text-mono-metric-sm">412,890,120</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded bg-surface-2 border border-surface-3">
                        <span className="text-text-muted text-[10px] sm:text-[11px] block">BYTEGHOST INSTRUCTIONS</span>
                        <span className="text-text-primary font-bold text-mono-metric-sm text-[15px] sm:text-mono-metric-sm">628,140,880</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded bg-surface-2 border border-surface-3">
                        <span className="text-text-muted text-[10px] sm:text-[11px] block">L1 CACHE MISSES</span>
                        <span className="text-status-success font-bold text-mono-metric-sm text-[15px] sm:text-mono-metric-sm">0.8% vs 2.4%</span>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded bg-surface-2 border border-surface-3">
                        <span className="text-text-muted text-[10px] sm:text-[11px] block">BRANCH MISPREDICTIONS</span>
                        <span className="text-status-success font-bold text-mono-metric-sm text-[15px] sm:text-mono-metric-sm">0.3% vs 1.1%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Post Match Drill Action Bridge */}
                <div className="p-4 sm:p-space-md rounded-lg bg-surface-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-surface-2">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary-container text-[24px] shrink-0">
                      model_training
                    </span>
                    <div>
                      <span className="font-card-title text-body-default text-text-primary font-bold block">
                        PRACTICE SIMILAR DRILL
                      </span>
                      <span className="font-body-muted text-body-muted text-text-secondary text-[13px] sm:text-body-muted">
                        Master dynamic graph backpressure with targeted isolated
                        exercises.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Launching targeted dynamic graph drill sandbox...")}
                    className="px-space-lg h-10 rounded bg-primary-container text-on-primary font-display-hero font-bold text-body-muted hover:bg-[#F0FF70] transition-colors whitespace-nowrap cursor-pointer w-full sm:w-auto text-center"
                  >
                    LAUNCH DRILL →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: FINAL CALL TO ARMS */}
          <section className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl bg-surface-1/20 border-b border-surface-3">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-space-lg py-4 sm:py-space-lg">
              {/* System Pre-Flight Telemetry Check */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-space-md px-3 sm:px-space-md py-1.5 rounded-full bg-surface-2 font-system-eyebrow text-system-eyebrow text-text-muted border border-surface-3 text-[11px]">
                <span className="flex items-center gap-1 text-status-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>{" "}
                  IDENTITY: [READY]
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-status-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>{" "}
                  RUNTIMES: [6 ONLINE]
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-status-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>{" "}
                  ARENA: [OPEN]
                </span>
              </div>

              <h2 className="font-display-hero text-display-hero text-text-primary uppercase tracking-tighter max-w-2xl leading-tight">
                READY TO ENTER THE ARENA?
              </h2>
              <p className="font-body-default text-card-title text-text-secondary max-w-lg text-[15px] sm:text-card-title">
                Write the code. Survive the adversarial tests. Earn your
                position on the global ladder.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-space-md pt-space-sm w-full sm:w-auto">
                <a
                  className="h-12 px-6 sm:px-space-xl rounded-lg bg-primary-container text-on-primary font-display-hero font-bold text-body-default inline-flex items-center justify-center gap-space-sm hover:bg-[#F0FF70] transition-all shadow-[0_0_24px_rgba(213,239,46,0.25)] cursor-pointer w-full sm:w-auto"
                  href="/auth/sign-up"
                >
                  <span>CREATE YOUR ACCOUNT</span>
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="h-12 px-space-lg rounded-lg bg-surface-2 text-text-primary font-display-hero font-semibold text-body-default inline-flex items-center justify-center hover:bg-surface-3 transition-colors border border-surface-3 w-full sm:w-auto"
                  href="#rank-ladder"
                >
                  VIEW LEADERBOARD
                </a>
              </div>

              {/* Auth Fast Pass Providers */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-space-sm pt-space-xs font-system-eyebrow text-system-eyebrow text-text-muted text-[11px] sm:text-system-eyebrow">
                <span>AUTHENTICATE VIA:</span>
                <button
                  onClick={() => alert("GitHub OAuth initialized...")}
                  className="px-space-sm py-1 rounded bg-surface-2 hover:bg-surface-3 text-text-primary flex items-center gap-1 transition-colors border border-surface-3 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    terminal
                  </span>{" "}
                  GitHub
                </button>
                <button
                  onClick={() => alert("Email Magic Link initialized...")}
                  className="px-space-sm py-1 rounded bg-surface-2 hover:bg-surface-3 text-text-primary flex items-center gap-1 transition-colors border border-surface-3 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    mail
                  </span>{" "}
                  Email
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-1 border-t border-border-subtle mt-12 sm:mt-space-xl">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-margin py-8 sm:py-space-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-space-xl mb-8 sm:mb-space-xl">
            <div className="col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img
                  alt="Brand logo"
                  className="h-7 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
                />
                <span className="font-display-hero font-bold text-card-title text-text-primary">
                  CodeClash
                </span>
              </div>
              <p className="font-body-default text-body-muted text-text-secondary max-w-sm text-[13px] sm:text-body-muted">
                High-performance algorithmic combat infrastructure. Built for
                elite competitive programmers, esports telemetry, and
                zero-latency engineering duels.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                <span className="font-system-eyebrow text-system-eyebrow uppercase text-text-muted text-[11px]">
                  MATCH SERVER ONLINE • 14ms PING
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                Product
              </span>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#arena-experience"
              >
                Arena
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#combat-modes"
              >
                Practice
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#spectate-section"
              >
                Matches
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#rank-ladder"
              >
                Leaderboard
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#spectate-section"
              >
                Tournaments
              </a>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                Compete
              </span>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#combat-modes"
              >
                Ranked Elo
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#combat-modes"
              >
                Squads
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#combat-modes"
              >
                Private Rooms
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#spectate-section"
              >
                Championships
              </a>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                Resources
              </span>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#engine-section"
              >
                Documentation
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#engine-section"
              >
                System Status
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#"
              >
                Support / Discord
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#engine-section"
              >
                Telemetry API
              </a>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                Legal
              </span>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#"
              >
                Terms of Combat
              </a>
              <a
                className="font-body-default text-body-muted text-text-secondary hover:text-text-primary transition-colors text-[13px]"
                href="#"
              >
                Security & Anti-Cheat
              </a>
            </div>
          </div>

          <div className="pt-space-lg border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <span className="font-code-snippet text-code-snippet text-text-muted text-[11px] sm:text-code-snippet">
              © 2025 CodeClash Inc. All telemetry and execution runtimes reserved.
            </span>
            <div className="flex items-center gap-space-md font-code-snippet text-code-snippet text-text-muted text-[11px] sm:text-code-snippet">
              <span>CLUSTER_ID // US-EAST-01-V4</span>
              <span>•</span>
              <span>KERNEL V4.19-SEC</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BOTTOM NAVIGATION DOCK (Specified in DESIGN.md lines 235-239) */}
      <aside
        className="fixed bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 bg-[#0D1012]/95 backdrop-blur-md border border-[#23292D] rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        aria-label="Quick Navigation Dock"
      >
        <a
          href="#arena-experience"
          onClick={() => setActiveDock("arena")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-xs font-mono group ${
            activeDock === "arena"
              ? "bg-[#171B1F] text-[#E4FF3F] border border-[#23292D]"
              : "text-[#8A9297] hover:text-[#F3F5F2]"
          }`}
          title="Arena Experience"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span className="hidden sm:inline font-semibold">Arena</span>
        </a>

        <a
          href="#combat-modes"
          onClick={() => setActiveDock("modes")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-xs font-mono group ${
            activeDock === "modes"
              ? "bg-[#171B1F] text-[#E4FF3F] border border-[#23292D]"
              : "text-[#8A9297] hover:text-[#F3F5F2]"
          }`}
          title="Combat Modes"
        >
          <span className="material-symbols-outlined text-[18px]">swords</span>
          <span className="hidden sm:inline font-semibold">Modes</span>
        </a>

        <a
          href="#rank-ladder"
          onClick={() => setActiveDock("ladder")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-xs font-mono group ${
            activeDock === "ladder"
              ? "bg-[#171B1F] text-[#E4FF3F] border border-[#23292D]"
              : "text-[#8A9297] hover:text-[#F3F5F2]"
          }`}
          title="Elo Ladder"
        >
          <span className="material-symbols-outlined text-[18px]">leaderboard</span>
          <span className="hidden sm:inline font-semibold">Ladder</span>
        </a>

        <a
          href="#spectate-section"
          onClick={() => setActiveDock("tournaments")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-xs font-mono group ${
            activeDock === "tournaments"
              ? "bg-[#171B1F] text-[#E4FF3F] border border-[#23292D]"
              : "text-[#8A9297] hover:text-[#F3F5F2]"
          }`}
          title="Tournaments & Spectate"
        >
          <span className="material-symbols-outlined text-[18px]">visibility</span>
          <span className="hidden sm:inline font-semibold">Live</span>
        </a>

        <div className="w-[1px] h-5 bg-[#23292D] mx-1"></div>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-8 h-8 rounded-full bg-surface-3 hover:bg-surface-2 text-text-primary flex items-center justify-center transition-colors cursor-pointer border border-surface-2"
          title="Return to top"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
        </button>
      </aside>
    </div>
  );
}
