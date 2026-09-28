"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingIdentifyPage() {
  const router = useRouter();

  // State for handle and display name
  const [handle, setHandle] = useState("NANO");
  const [displayName, setDisplayName] = useState("Nano");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllocated, setIsAllocated] = useState(false);

  // Suggestions
  const suggestions = ["NANO_DEV", "NANO404", "VOIDNANO"];

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, "");
    setHandle(cleaned);
  };

  const handleSuggestionClick = (val: string) => {
    setHandle(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || handle.length < 3) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAllocated(true);
      setTimeout(() => {
        router.push("/onboarding/avatar");
      }, 700);
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary flex flex-col selection:bg-surface-tint selection:text-surface-1 antialiased">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-1/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-border-subtle">
        <div className="h-14 max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-space-sm group">
            <img
              alt="CodeClash Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
            />
            <span className="font-system-eyebrow text-system-eyebrow uppercase tracking-widest text-text-muted select-none group-hover:text-text-primary transition-colors font-mono">
              // SYS_INIT
            </span>
          </Link>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider uppercase hidden sm:inline font-mono">
                SYSTEM INITIALIZATION // SECURE PROTOCOL
              </span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider uppercase sm:hidden font-mono">
                SECURE PROTOCOL
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT (EXPANSIVE COMMAND CONSOLE) */}
      <main className="w-full pt-20 sm:pt-22 pb-16 bg-surface-container-lowest min-h-screen flex items-center justify-center">
        <div className="w-[94%] max-w-[1720px] mx-auto py-2">
          
          {/* Telemetry Status Bar */}
          <div className="w-full flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-3 font-mono text-[12px]">
              <span className="font-system-eyebrow text-system-eyebrow tracking-widest text-text-muted uppercase">
                SYS.PROTO // ONBOARDING_SEQ
              </span>
              <span className="text-text-muted text-[11px] font-mono">::</span>
              <span className="font-system-eyebrow text-system-eyebrow text-primary-fixed tracking-wider uppercase font-semibold">
                NODE_02: IDENTITY_ALLOCATION
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11.5px]">
              <span className="font-code-snippet text-code-snippet text-text-muted hidden sm:inline">
                LATENCY: <span className="text-status-success font-mono font-bold">18MS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-surface-2 text-text-secondary text-[11px] font-system-eyebrow tracking-widest border border-border-subtle">
                TLS 1.3 SECURE
              </span>
            </div>
          </div>

          {/* Centered Dual-Column Grid System (5 Cols Left, 7 Cols Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* LEFT SETUP PANEL (5 Cols - EXACT DESIGN FROM VERIFY PAGE) */}
            <div className="lg:col-span-5 bg-surface-1 rounded-2xl p-6 sm:p-8 lg:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-border-subtle">
              {/* Ambient subtle corner illumination */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none"></div>

              <div className="flex flex-col gap-6 sm:gap-7 relative z-10">
                {/* Eyebrow & Step Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
                    <span className="font-system-eyebrow text-[12px] uppercase text-text-primary tracking-widest font-mono">
                      PLAYER SETUP
                    </span>
                  </div>
                  <span className="font-system-eyebrow text-[12px] text-primary-fixed bg-surface-2 px-3 py-1 rounded-lg shadow-sm border border-border-subtle font-mono font-semibold">
                    STEP 02 / 06
                  </span>
                </div>

                {/* Panel Header */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[26px] sm:text-[28px] lg:text-[30px] text-text-primary tracking-tight font-bold">
                    Onboarding Vector
                  </h2>
                  <p className="text-[14.5px] sm:text-[15px] text-text-secondary leading-relaxed">
                    Initialize your competitive identity across the tactical cluster.
                  </p>
                </div>

                {/* 6 Step Progression List */}
                <div className="flex flex-col gap-2.5 my-1 font-mono">
                  {/* STEP 01 - RESOLVED */}
                  <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-mono font-bold">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary font-semibold">
                        01 // VERIFY EMAIL
                      </span>
                    </div>
                    <span className="font-code-snippet text-code-snippet text-status-success tracking-wide uppercase text-[11.5px] font-bold">
                      RESOLVED
                    </span>
                  </div>

                  {/* STEP 02 - ACTIVE */}
                  <div className="group flex items-center justify-between bg-surface-2 px-4 py-3.5 rounded-xl relative shadow-md border border-border-subtle">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-6 rounded-full bg-primary-fixed"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-primary tracking-wider font-bold">
                        02 // IDENTITY
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                      <span className="font-system-eyebrow text-[12px] text-primary-fixed uppercase tracking-wider font-bold">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* STEP 03 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary tracking-wider">
                        03 // AVATAR
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase">
                      LOCKED
                    </span>
                  </div>

                  {/* STEP 04 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary tracking-wider">
                        04 // LOADOUT
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase">
                      LOCKED
                    </span>
                  </div>

                  {/* STEP 05 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary tracking-wider">
                        05 // CALIBRATION
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase">
                      LOCKED
                    </span>
                  </div>

                  {/* STEP 06 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary tracking-wider">
                        06 // MISSION
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase">
                      LOCKED
                    </span>
                  </div>
                </div>

                {/* Telemetry Progress Metric Ring & Diagnostic */}
                <div className="bg-surface-2 p-5 sm:p-6 rounded-2xl flex items-center justify-between shadow-sm border border-border-subtle">
                  <div className="flex flex-col gap-1">
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase tracking-wider font-mono">
                      PROTOCOL INTEGRITY
                    </span>
                    <span className="font-mono text-[20px] sm:text-[22px] text-text-primary font-bold">
                      33.3% COMPLETE
                    </span>
                    <span className="font-mono text-code-snippet text-text-secondary text-[12px]">
                      EST_TIME: ~150s remaining
                    </span>
                  </div>
                  {/* Inline Minimal Progress Ring SVG */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 48 48">
                      <circle
                        className="text-surface-3 fill-none"
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <circle
                        className="text-primary-fixed fill-none transition-all duration-500"
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="currentColor"
                        strokeDasharray="125.6"
                        strokeDashoffset="83.7"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                    <span className="absolute font-system-eyebrow text-system-eyebrow text-primary-fixed font-mono font-bold text-[13px]">
                      2/6
                    </span>
                  </div>
                </div>
              </div>

              {/* Footnote Terminal Strip */}
              <div className="mt-8 pt-5 bg-surface-2/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-9 lg:-mb-9 px-6 sm:px-8 lg:px-9 pb-6 sm:pb-8 lg:pb-9 flex flex-col gap-1.5 border-t border-border-subtle font-mono">
                <div className="flex items-center justify-between font-system-eyebrow text-system-eyebrow text-text-muted text-[11px]">
                  <span>YOUR ELO IS EARNED IN MATCHES</span>
                  <span className="text-text-primary">v1.0.4-PROD</span>
                </div>
                <div className="flex items-center justify-between font-code-snippet text-code-snippet text-text-secondary text-[11.5px]">
                  <span>SECURITY PROTOCOL: SHA-256</span>
                  <span className="text-status-success flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>{" "}
                    NODE ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT TASK AREA (7 Cols) */}
            <main className="lg:col-span-7 bg-surface-1 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xl border border-border-subtle">
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
                <div>
                  {/* Eyebrow & Title Hierarchy */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-2 mb-3 border border-border-subtle font-mono text-[11.5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                      <span className="font-system-eyebrow text-system-eyebrow text-text-secondary tracking-widest uppercase font-semibold">
                        02 — IDENTITY PROTOCOL
                      </span>
                    </div>
                    <h1 className="font-section-heading text-section-heading text-text-primary tracking-tight font-bold text-[30px] sm:text-[34px] leading-tight">
                      Choose your Arena identity.
                    </h1>
                    <p className="font-body-default text-body-default text-text-secondary mt-2 text-[15.5px] leading-relaxed">
                      Your handle is how other players will know you inside CodeClash. It will appear on match telemetry, leaderboard snapshots, and code diff logs.
                    </p>
                  </div>

                  {/* INPUT FORM WORKSPACE */}
                  <div className="space-y-6">
                    {/* CLASH HANDLE Field */}
                    <div className="bg-surface-2 rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle">
                      <div className="flex items-center justify-between mb-2.5">
                        <label
                          htmlFor="clash-handle"
                          className="font-system-eyebrow text-system-eyebrow tracking-wider text-text-primary uppercase flex items-center gap-2 font-mono text-[12px] font-bold"
                        >
                          <span>CLASH HANDLE</span>
                          <span className="text-status-failure text-[11px] font-system-eyebrow font-mono">
                            *REQUIRED
                          </span>
                        </label>
                        <span
                          className="font-code-snippet text-code-snippet text-text-muted text-[11.5px] font-mono"
                          id="handle-counter"
                        >
                          {handle.length} / 16 CHARS
                        </span>
                      </div>

                      {/* Input High Fidelity Field */}
                      <div className="relative flex items-center">
                        <div className="absolute left-4 flex items-center pointer-events-none text-text-muted font-mono font-bold text-[18px]">
                          @
                        </div>
                        <input
                          id="clash-handle"
                          type="text"
                          required
                          maxLength={16}
                          value={handle}
                          onChange={handleHandleChange}
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="HANDLE"
                          className="w-full h-13 pl-10 pr-36 rounded-xl text-text-primary font-mono text-[17px] font-bold tracking-wider uppercase focus:outline-none focus:border-primary-fixed border border-border-subtle transition-colors placeholder:text-text-muted shadow-inner"
                          style={{ backgroundColor: "#0c0e0f", color: "#F3F5F2" }}
                        />
                        {/* Live Availability Badge */}
                        <div className="absolute right-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-system-eyebrow tracking-wider pointer-events-none border border-status-success/20 font-mono font-bold">
                          <span
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span className="font-system-eyebrow text-system-eyebrow">
                            AVAILABLE
                          </span>
                        </div>
                      </div>

                      {/* Rules & Live Status Guidance */}
                      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-text-muted font-mono text-[12px]">
                        <p className="font-code-snippet text-code-snippet">
                          Must be unique. 3–16 characters. Letters, numbers and underscore only.
                        </p>
                        <div className="inline-flex items-center gap-1 text-[11px] font-system-eyebrow text-text-secondary bg-surface-3 px-2.5 py-0.5 rounded border border-border-subtle">
                          <span className="text-text-muted">STATUS:</span>
                          <span className="text-status-success font-code-snippet font-bold">
                            HASH // 0x489B
                          </span>
                        </div>
                      </div>

                      {/* Live Suggestion Tags if Taken */}
                      <div className="mt-4 pt-3.5 bg-surface-3/30 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 px-5 sm:px-6 py-3.5 rounded-b-2xl flex flex-wrap items-center gap-2 border-t border-border-subtle font-mono">
                        <span className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[11px]">
                          If taken:
                        </span>
                        {suggestions.map((sug) => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => handleSuggestionClick(sug)}
                            className="handle-suggestion font-code-snippet text-code-snippet text-text-secondary hover:text-text-primary px-3 py-1 rounded-lg bg-surface-1 hover:bg-surface-3 border border-border-subtle text-[12px] transition-colors cursor-pointer"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* DISPLAY NAME Field */}
                    <div className="bg-surface-2 rounded-2xl p-5 sm:p-6 shadow-sm border border-border-subtle">
                      <div className="flex items-center justify-between mb-2.5">
                        <label
                          htmlFor="display-name"
                          className="font-system-eyebrow text-system-eyebrow tracking-wider text-text-secondary uppercase font-mono text-[12px] font-semibold"
                        >
                          DISPLAY NAME (OPTIONAL)
                        </label>
                        <span className="font-code-snippet text-code-snippet text-text-muted text-[11px] font-mono">
                          UTF-8 CASING OK
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          id="display-name"
                          type="text"
                          maxLength={32}
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          autoComplete="off"
                          placeholder="e.g. Nano"
                          className="w-full h-12 px-4 rounded-xl text-text-primary font-body-default text-[15.5px] focus:outline-none focus:border-primary-fixed border border-border-subtle transition-colors placeholder:text-text-muted shadow-inner"
                          style={{ backgroundColor: "#0c0e0f", color: "#F3F5F2" }}
                        />
                      </div>
                      <p className="font-code-snippet text-code-snippet text-text-muted text-[12px] mt-2.5 font-mono">
                        Used on your profile and global notifications. Your Clash Handle remains your competitive identity.
                      </p>
                    </div>

                    {/* COMPETITIVE PREVIEW CARD (Telemetry Hologram Spec) */}
                    <div className="bg-surface-2 rounded-2xl p-5 sm:p-6 shadow-lg relative overflow-hidden border border-border-subtle">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                            badge
                          </span>
                          <span className="font-system-eyebrow text-system-eyebrow tracking-widest text-text-secondary uppercase font-mono text-[11.5px] font-semibold">
                            ARENA HUD IDENTITY PREVIEW
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[11.5px]">
                          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                          <span className="font-system-eyebrow text-system-eyebrow text-status-success uppercase font-bold">
                            PLAYER IDENTITY READY
                          </span>
                        </div>
                      </div>

                      {/* Matchmaking Badge Card Representation */}
                      <div className="bg-surface-1 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-border-subtle">
                        <div className="flex items-center gap-4">
                          {/* Tactical Avatar Placeholder Matrix */}
                          <div className="relative w-16 h-16 rounded-xl bg-surface-3 flex items-center justify-center overflow-hidden shadow-inner border border-border-subtle shrink-0">
                            <img
                              className="w-full h-full object-cover opacity-90"
                              alt="Tactical Cyberpunk Avatar"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUGE7KaiIf9ybkpX1laF86lwYFjFhDgrxtS6zWRxzOMit7pMEUbyqfeWCJDIgHKkESe3nlg8symgPrCOjh17ynGI1tp9Dpo-zE-oswK_RV7MCXXS7I1kyWos-k_deaHWcK2yqolausoxisw7ugBH19UQZ_rGdjaTMUq5722iD0hPz_i0xtxN6xq91ifd7h-czgp5rDYV94HCmHvrFC62__uLjh-sNtIFCaYeim6ThGNBgD9Xyap3wlmw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-1/90 via-transparent to-transparent"></div>
                            <span className="absolute bottom-1 right-1 font-mono text-[10px] text-primary-fixed font-bold bg-[#080A0B]/85 px-1.5 py-0.5 rounded">
                              LVL.1
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span
                                className="font-card-title text-card-title text-text-primary font-bold text-[18px]"
                                id="preview-display"
                              >
                                {displayName.trim().length > 0 ? displayName : "Operative"}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-surface-3 text-text-muted font-mono text-[11px] border border-border-subtle font-semibold">
                                PROVISIONAL
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 font-mono text-[12.5px]">
                              <span
                                className="font-system-eyebrow text-system-eyebrow text-primary-fixed font-bold"
                                id="preview-handle"
                              >
                                {handle.length > 0 ? `@${handle}` : "@ANON_NODE"}
                              </span>
                              <span className="text-text-muted text-xs">•</span>
                              <span className="font-code-snippet text-code-snippet text-text-secondary">
                                REGION: GL-WEST-1
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Live Metrics Strip in Card */}
                        <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end bg-surface-2/80 px-5 py-2.5 rounded-xl border border-border-subtle font-mono">
                          <div>
                            <div className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[10.5px]">
                              CURRENT RANK
                            </div>
                            <div className="font-mono text-mono-metric-sm text-text-primary font-bold text-[16px]">
                              UNRANKED
                            </div>
                          </div>
                          <div className="w-px h-8 bg-border-subtle"></div>
                          <div>
                            <div className="font-system-eyebrow text-system-eyebrow text-text-muted uppercase text-[10.5px]">
                              INITIAL ELO
                            </div>
                            <div className="font-mono text-mono-metric-sm text-primary-fixed font-bold text-[16px]">
                              1200 [P]
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS ROW */}
                <div className="mt-8 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-surface-2 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-6 sm:p-8 lg:p-10 rounded-b-2xl border-t border-border-subtle">
                  <Link
                    href="/auth/verify"
                    className="w-full sm:w-auto h-12 px-6 rounded-xl bg-surface-3 hover:bg-surface-2 text-text-secondary hover:text-text-primary font-body-default text-body-default transition-all flex items-center justify-center gap-2 active:scale-95 border border-border-subtle cursor-pointer font-mono"
                  >
                    <span className="material-symbols-outlined text-[18px]">west</span>
                    <span className="font-system-eyebrow text-system-eyebrow uppercase tracking-wider text-[12px] font-semibold">
                      BACK TO STEP 01
                    </span>
                  </Link>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span className="font-code-snippet text-code-snippet text-text-muted text-[12px] hidden md:inline font-mono">
                      ENTER TO CONFIRM ↵
                    </span>
                    <button
                      id="submit-identity-btn"
                      type="submit"
                      disabled={isSubmitting || handle.length < 3}
                      className="w-full sm:w-auto h-12 sm:h-13 px-8 rounded-xl bg-primary-fixed hover:bg-[#F0FF70] text-[#080A0B] font-body-default font-bold transition-all shadow-[0_0_18px_rgba(228,255,63,0.25)] flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-mono text-[13px]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">
                            progress_activity
                          </span>
                          <span className="font-system-eyebrow text-system-eyebrow tracking-wider uppercase font-bold">
                            RESERVING HANDLE...
                          </span>
                        </>
                      ) : isAllocated ? (
                        <>
                          <span className="material-symbols-outlined text-[18px]">check</span>
                          <span className="font-system-eyebrow text-system-eyebrow tracking-wider uppercase font-bold">
                            ALLOCATED // PROCEEDING
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-system-eyebrow text-system-eyebrow tracking-wider uppercase font-bold">
                            CONTINUE TO AVATAR
                          </span>
                          <span className="material-symbols-outlined text-[18px] font-bold">east</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </main>

          </div>
        </div>
      </main>
    </div>
  );
}
