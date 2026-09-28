"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AvatarOption {
  id: string;
  name: string;
  code: string;
  category: "NETRUNNER" | "TACTICAL MECH" | "SHADOW OPS" | "SYNTH AI";
  src: string;
  defaultTint: string;
  specialty: string;
}

const AVATAR_PRESETS: AvatarOption[] = [
  {
    id: "avatar-1",
    name: "CYBER_SPEC",
    code: "0xCC-7049",
    category: "NETRUNNER",
    src: "/avatars/avatar-1.jpg",
    defaultTint: "#E4FF3F",
    specialty: "ALGORITHMIC INFILTRATION",
  },
  {
    id: "avatar-2",
    name: "SECURITY_DEV",
    code: "0xCC-3180",
    category: "NETRUNNER",
    src: "/avatars/avatar-2.jpg",
    defaultTint: "#22D3EE",
    specialty: "CRYPTOGRAPHIC HARDENING",
  },
  {
    id: "avatar-3",
    name: "CORE_HACKER",
    code: "0xCC-9912",
    category: "NETRUNNER",
    src: "/avatars/avatar-3.jpg",
    defaultTint: "#F59E0B",
    specialty: "REVERSE ENGINEERING",
  },
  {
    id: "avatar-4",
    name: "SHADOW_OPS",
    code: "0xCC-4001",
    category: "SHADOW OPS",
    src: "/avatars/avatar-4.jpg",
    defaultTint: "#EF4444",
    specialty: "LOW-LATENCY EXPLOITATION",
  },
  {
    id: "avatar-5",
    name: "QUANTUM_OPS",
    code: "0xCC-8821",
    category: "SYNTH AI",
    src: "/avatars/avatar-5.jpg",
    defaultTint: "#FFFFFF",
    specialty: "PARALLEL CONCURRENCY",
  },
  {
    id: "avatar-6",
    name: "VOID_HUNTER",
    code: "0xCC-1567",
    category: "SHADOW OPS",
    src: "/avatars/avatar-6.jpg",
    defaultTint: "#A855F7",
    specialty: "ZERO-DAY EXECUTIONS",
  },
  {
    id: "avatar-7",
    name: "TITAN_MECH",
    code: "0xCC-6204",
    category: "TACTICAL MECH",
    src: "/avatars/avatar-7.jpg",
    defaultTint: "#F59E0B",
    specialty: "HEAVY RUNTIME REFACTORING",
  },
  {
    id: "avatar-8",
    name: "MATRIX_GLITCH",
    code: "0xCC-5319",
    category: "SYNTH AI",
    src: "/avatars/avatar-8.jpg",
    defaultTint: "#22C55E",
    specialty: "BINARY HEURISTIC INJECTION",
  },
  {
    id: "avatar-9",
    name: "NEON_ARCADE",
    code: "0xCC-2481",
    category: "NETRUNNER",
    src: "/avatars/avatar-9.jpg",
    defaultTint: "#22D3EE",
    specialty: "MULTI-MONITOR OVERCLOCK",
  },
  {
    id: "avatar-10",
    name: "CYBORG_TACTICIAN",
    code: "0xCC-6119",
    category: "TACTICAL MECH",
    src: "/avatars/avatar-10.jpg",
    defaultTint: "#F59E0B",
    specialty: "RECURSION DEFENSE",
  },
  {
    id: "avatar-11",
    name: "CRIMSON_SPECTER",
    code: "0xCC-8094",
    category: "SHADOW OPS",
    src: "/avatars/avatar-11.jpg",
    defaultTint: "#EF4444",
    specialty: "STEALTH SPECTRAL PROFILING",
  },
  {
    id: "avatar-12",
    name: "ULTRAVIOLET_ARCHITECT",
    code: "0xCC-4390",
    category: "SYNTH AI",
    src: "/avatars/avatar-12.jpg",
    defaultTint: "#A855F7",
    specialty: "HIGH-DIMENSIONAL LOGIC",
  },
];

const TINT_COLORS = [
  { name: "VOLT", hex: "#E4FF3F" },
  { name: "CYAN", hex: "#22D3EE" },
  { name: "WHITE", hex: "#FFFFFF" },
  { name: "AMBER", hex: "#F59E0B" },
  { name: "RED", hex: "#EF4444" },
  { name: "PURPLE", hex: "#A855F7" },
];

const CATEGORIES = ["ALL", "NETRUNNER", "TACTICAL MECH", "SHADOW OPS", "SYNTH AI"] as const;
const PAGE_SIZE = 3;

export default function OnboardingAvatarPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatars, setAvatars] = useState<AvatarOption[]>(AVATAR_PRESETS);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(AVATAR_PRESETS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [currentTint, setCurrentTint] = useState("#E4FF3F");
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [combatHandle, setCombatHandle] = useState("NANO");
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Read saved handle from identity step
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("codeclash_handle");
      if (saved) {
        setCombatHandle(saved);
      }
    }
  }, []);

  const filteredAvatars =
    activeCategory === "ALL"
      ? avatars
      : avatars.filter((a) => a.category === activeCategory);

  const totalSlides = Math.max(1, Math.ceil(filteredAvatars.length / PAGE_SIZE));

  useEffect(() => {
    setSlideIndex(0);
  }, [activeCategory]);

  const syncSlideWithAvatar = (targetAvatar: AvatarOption) => {
    const idx = filteredAvatars.findIndex((a) => a.id === targetAvatar.id);
    if (idx !== -1) {
      const targetSlide = Math.floor(idx / PAGE_SIZE);
      setSlideIndex(targetSlide);
    }
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleRandomize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * filteredAvatars.length);
      const chosen = filteredAvatars[randomIdx];
      setSelectedAvatar(chosen);
      setCurrentTint(chosen.defaultTint);
      syncSlideWithAvatar(chosen);
      setIsSynthesizing(false);
    }, 200);
  };

  const handleRegenerateCodes = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const updated = avatars.map((item) => ({
        ...item,
        code: `0xCC-${Math.floor(1000 + Math.random() * 9000)}`,
      }));
      setAvatars(updated);
      const updatedSelected = updated.find((a) => a.id === selectedAvatar.id) || updated[0];
      setSelectedAvatar(updatedSelected);
      setIsSynthesizing(false);
    }, 250);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const customSrc = event.target?.result as string;
      const customOption: AvatarOption = {
        id: `custom-${Date.now()}`,
        name: "CUSTOM_NODE",
        code: `0xCC-${Math.floor(1000 + Math.random() * 9000)}`,
        category: "NETRUNNER",
        src: customSrc,
        defaultTint: currentTint,
        specialty: "USER_CUSTOM_OPERATIVE",
      };
      setAvatars([customOption, ...avatars.filter((a) => !a.id.startsWith("custom-"))]);
      setSelectedAvatar(customOption);
      setActiveCategory("ALL");
      setSlideIndex(0);
    };
    reader.readAsDataURL(file);
  };

  const handleUseAvatar = () => {
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_avatar", selectedAvatar.src);
      sessionStorage.setItem("codeclash_avatar_code", selectedAvatar.code);
      sessionStorage.setItem("codeclash_tint", currentTint);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/loadout");
    }, 600);
  };

  const currentVisibleAvatars = filteredAvatars.slice(
    slideIndex * PAGE_SIZE,
    slideIndex * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary flex flex-col selection:bg-surface-tint selection:text-surface-1 antialiased">
      {/* FIXED TOP HEADER - FULL WIDTH */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-1/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-border-subtle h-15">
        <div className="h-full w-[94%] max-w-[1720px] mx-auto px-2 sm:px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              alt="CodeClash Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
            />
            <span className="font-system-eyebrow text-[12px] uppercase tracking-widest text-text-muted select-none group-hover:text-text-primary transition-colors font-mono">
              // SYS_INIT
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              <span className="font-system-eyebrow text-text-muted tracking-wider uppercase text-[12px] hidden sm:inline font-mono">
                SYSTEM INITIALIZATION // SECURE PROTOCOL
              </span>
              <span className="font-system-eyebrow text-text-muted tracking-wider uppercase text-[11px] sm:hidden font-mono">
                SECURE
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

      {/* MAIN VIEWPORT - EXPANSIVE COMMAND CONSOLE (94% SCREEN WIDTH) */}
      <main className="w-full pt-20 sm:pt-22 pb-12 flex-1 flex flex-col justify-center">
        <div className="w-[94%] max-w-[1720px] mx-auto py-2">
          
          {/* Top Telemetry Status Bar */}
          <div className="w-full flex items-center justify-between mb-4 px-1 font-mono text-[12px]">
            <div className="flex items-center gap-3">
              <span className="text-primary-fixed uppercase font-bold tracking-widest">
                // PROTOCOL.INIT
              </span>
              <span className="text-text-muted">
                SESSION_ID#0x99F4A
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-2 text-status-success font-bold text-[11px] border border-status-success/30">
                ONLINE
              </span>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="text-text-secondary">
                NET_LATENCY:{" "}
                <span className="text-status-success font-bold">12ms</span>
              </span>
              <span className="px-3 py-1 rounded bg-surface-2 text-text-secondary text-[11.5px] border border-border-subtle hidden sm:inline">
                TLS_CIPHER: AES_256_GCM
              </span>
            </div>
          </div>

          {/* Dual-Column Master Composition (5 Cols Left, 7 Cols Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
            
            {/* LEFT SETUP PANEL (5 Cols - STANDARDIZED VERIFY DESIGN, EXPANDED & STATELY) */}
            <div className="lg:col-span-5 bg-surface-1 rounded-2xl p-6 sm:p-8 xl:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-border-subtle">
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none"></div>

              <div className="flex flex-col gap-6 relative z-10">
                {/* Eyebrow & Step Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
                    <span className="text-[12.5px] uppercase text-text-primary tracking-widest font-mono font-bold">
                      PLAYER SETUP
                    </span>
                  </div>
                  <span className="text-[12px] text-primary-fixed bg-surface-2 px-3 py-1 rounded-lg border border-border-subtle font-mono font-bold">
                    STEP 03 / 06
                  </span>
                </div>

                {/* Panel Header */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-[26px] sm:text-[28px] xl:text-[30px] text-text-primary tracking-tight font-bold">
                    Onboarding Vector
                  </h2>
                  <p className="text-[14.5px] sm:text-[15px] text-text-secondary leading-relaxed">
                    Initialize your competitive identity across the tactical cluster.
                  </p>
                </div>

                {/* 6 Step Progression List */}
                <div className="flex flex-col gap-2.5 font-mono text-[13px]">
                  {/* Step 01 - RESOLVED */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      </span>
                      <span className="text-text-secondary font-semibold">
                        01 // VERIFY EMAIL
                      </span>
                    </div>
                    <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
                      RESOLVED
                    </span>
                  </div>

                  {/* Step 02 - RESOLVED */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2/60 border border-border-subtle/60">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded flex items-center justify-center bg-status-success/15 text-status-success text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check
                        </span>
                      </span>
                      <span className="text-text-secondary font-semibold">
                        02 // IDENTITY
                      </span>
                    </div>
                    <span className="text-status-success tracking-wide uppercase text-[11.5px] font-bold">
                      RESOLVED
                    </span>
                  </div>

                  {/* Step 03 - ACTIVE (AVATAR) */}
                  <div className="group flex items-center justify-between bg-surface-2 px-4 py-3.5 rounded-xl relative shadow-md border border-border-subtle">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-6 rounded-full bg-primary-fixed"></span>
                      <span className="text-text-primary tracking-wider font-bold">
                        03 // AVATAR
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                      <span className="text-[12px] text-primary-fixed uppercase tracking-wider font-bold">
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Step 04 - LOCKED */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="text-text-secondary">04 // LOADOUT</span>
                    </div>
                    <span className="text-[11.5px] text-text-muted uppercase">LOCKED</span>
                  </div>

                  {/* Step 05 - LOCKED */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="text-text-secondary">05 // CALIBRATION</span>
                    </div>
                    <span className="text-[11.5px] text-text-muted uppercase">LOCKED</span>
                  </div>

                  {/* Step 06 - LOCKED */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-40 hover:opacity-60 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="text-text-secondary">06 // MISSION</span>
                    </div>
                    <span className="text-[11.5px] text-text-muted uppercase">LOCKED</span>
                  </div>
                </div>

                {/* Telemetry Progress Metric Ring */}
                <div className="bg-surface-2 p-5 sm:p-6 rounded-2xl flex items-center justify-between border border-border-subtle shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11.5px] text-text-muted uppercase tracking-wider font-mono">
                      PROTOCOL INTEGRITY
                    </span>
                    <span className="font-mono text-[20px] sm:text-[22px] text-text-primary font-bold">
                      50.0% COMPLETE
                    </span>
                    <span className="font-mono text-text-secondary text-[12px]">
                      EST_TIME: ~120s remaining
                    </span>
                  </div>
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
                        strokeDashoffset="62.8"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                    <span className="absolute text-primary-fixed font-mono font-bold text-[13px]">
                      3/6
                    </span>
                  </div>
                </div>
              </div>

              {/* Footnote Terminal Strip */}
              <div className="mt-8 pt-5 bg-surface-2/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 xl:-mx-9 xl:-mb-9 px-6 sm:px-8 xl:px-9 pb-6 sm:pb-8 xl:pb-9 flex flex-col gap-1.5 border-t border-border-subtle font-mono text-[11.5px]">
                <div className="flex items-center justify-between text-text-muted">
                  <span>YOUR ELO IS EARNED IN MATCHES</span>
                  <span className="text-text-primary font-semibold">v1.0.4-PROD</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>SECURITY PROTOCOL: SHA-256</span>
                  <span className="text-status-success flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                    NODE ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT TASK AREA (7 Cols - WIDE, ROOMY & HIGH-IMPACT) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Expansive Section Header */}
              <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle">
                <div className="flex items-center gap-2 mb-2 font-mono text-[11.5px]">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)]"></span>
                  <span className="text-primary-fixed uppercase tracking-widest font-bold">
                    03 — AVATAR CONFIGURATION
                  </span>
                </div>
                <h1 className="text-text-primary tracking-tight font-bold text-[28px] sm:text-[32px] leading-tight">
                  Choose your player mark.
                </h1>
                <p className="text-text-secondary mt-1.5 text-[15px] leading-relaxed">
                  Your avatar appears in live 1v1 matchmaking, terminal leaderboards, and telemetry match reports. Choose an operative picture, filter by tactical archetype, or upload your custom profile picture.
                </p>
              </div>

              {/* Upper Section: Large Master Preview & Live Spec Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle items-center">
                {/* Hero Avatar Preview Container */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-surface-container-lowest rounded-xl relative overflow-hidden group border border-border-subtle">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8A9297_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Viewfinder crosshairs */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-text-muted select-none">
                    [+] 0x0
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-text-muted select-none">
                    [+] 100%
                  </div>

                  <div
                    className="relative z-10 w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden p-1.5 transition-all duration-300 shadow-2xl flex items-center justify-center"
                    style={{
                      boxShadow: `0 0 32px ${currentTint}33`,
                      border: `2px solid ${currentTint}`,
                    }}
                  >
                    <img
                      src={selectedAvatar.src}
                      alt={selectedAvatar.name}
                      className={`w-full h-full object-cover rounded-xl transition-all duration-300 ${
                        isSynthesizing ? "scale-95 blur-sm" : "scale-100 blur-0 group-hover:scale-105"
                      }`}
                    />
                  </div>

                  {/* Micro Badge Overlay */}
                  <div className="relative z-10 mt-3 flex items-center gap-2 bg-surface-2 px-3 py-1 rounded-lg border border-border-subtle font-mono text-[12px]">
                    <span className="text-text-muted">NODE_ID:</span>
                    <span className="font-bold tracking-wider" style={{ color: currentTint }}>
                      {selectedAvatar.code}
                    </span>
                  </div>
                </div>

                {/* Telemetry Details & Accent Tint Selector */}
                <div className="md:col-span-7 flex flex-col justify-between gap-3.5">
                  {/* Handle & ELO */}
                  <div className="flex items-center justify-between font-mono">
                    <div>
                      <span className="text-text-muted uppercase text-[11px]">
                        COMBAT_HANDLE
                      </span>
                      <div className="font-bold text-[30px] sm:text-[34px] text-text-primary tracking-tight leading-none">
                        {combatHandle}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-text-muted uppercase text-[11px]">
                        INITIAL_ELO
                      </span>
                      <div
                        className="font-mono tracking-tight font-bold text-[18px]"
                        style={{ color: currentTint }}
                      >
                        PROVISIONAL
                      </div>
                    </div>
                  </div>

                  {/* Specialty Pill */}
                  <div className="bg-surface-2 p-3.5 rounded-xl flex flex-col gap-1.5 border border-border-subtle font-mono text-[12px]">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary uppercase font-semibold">
                        SPECIALTY //
                      </span>
                      <span className="font-bold text-text-primary text-[11.5px] tracking-wide">
                        {selectedAvatar.specialty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-border-subtle/60 pt-1.5">
                      <span className="text-text-muted text-[11px] uppercase">TIER STATUS</span>
                      <span className="text-status-warning flex items-center gap-1 font-bold text-[11px]">
                        <span className="material-symbols-outlined text-[15px]">lock</span>
                        STACK HUNTER (LOCKED UNTIL RANKED)
                      </span>
                    </div>
                  </div>

                  {/* Accent Tint Color Chips */}
                  <div>
                    <div className="flex items-center justify-between mb-2 font-mono text-[11px]">
                      <label className="text-text-muted uppercase tracking-wider font-semibold">
                        ACCENT TINT SELECTOR
                      </label>
                      <span className="text-text-secondary uppercase">
                        ACTIVE: <span className="font-bold" style={{ color: currentTint }}>{currentTint}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5" id="tint-picker">
                      {TINT_COLORS.map((tint) => (
                        <button
                          key={tint.name}
                          type="button"
                          onClick={() => setCurrentTint(tint.hex)}
                          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110 shadow-sm border border-border-subtle cursor-pointer"
                          style={{ backgroundColor: tint.hex }}
                          title={`${tint.name} ${tint.hex}`}
                        >
                          {currentTint === tint.hex && (
                            <span className="material-symbols-outlined text-[#080A0B] text-[18px] font-bold">
                              check
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: 3-IMAGE HORIZONTAL SLIDER / CAROUSEL (WIDE, MAXED OUT & ROOMY) */}
              <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle flex flex-col gap-4">
                
                {/* Control Header for Carousel */}
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[12px]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-text-primary uppercase tracking-wider font-bold text-[13px]">
                      OPERATIVE AVATARS
                    </span>
                    <span className="text-text-secondary bg-surface-2 px-2.5 py-0.5 rounded text-[11.5px] border border-border-subtle font-bold">
                      SLIDE {slideIndex + 1} OF {totalSlides} ({filteredAvatars.length} TOTAL)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCustomUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-surface-3 text-text-primary rounded-lg text-[12px] transition-colors border border-border-subtle cursor-pointer font-semibold"
                      title="Upload custom image file"
                    >
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      <span>UPLOAD PHOTO</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRandomize}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-surface-3 text-text-primary rounded-lg text-[12px] transition-colors border border-border-subtle cursor-pointer font-semibold"
                      title="Pick a random operative"
                    >
                      <span className="material-symbols-outlined text-[16px]">shuffle</span>
                      <span>RANDOMIZE</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRegenerateCodes}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-surface-3 rounded-lg text-[12px] transition-colors border border-border-subtle cursor-pointer font-bold"
                      style={{ color: currentTint }}
                      title="Regenerate node IDs"
                    >
                      <span className="material-symbols-outlined text-[16px]">autorenew</span>
                      <span>REGENERATE →</span>
                    </button>

                    {/* Carousel Prev & Next Controls */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-9 h-9 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-primary flex items-center justify-center border border-border-subtle cursor-pointer transition-colors active:scale-95 shadow-sm"
                        title="Previous 3 avatars"
                      >
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-9 h-9 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-primary flex items-center justify-center border border-border-subtle cursor-pointer transition-colors active:scale-95 shadow-sm"
                        title="Next 3 avatars"
                      >
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Archetype Filter Tabs */}
                <div className="flex items-center gap-1.5 border-b border-border-subtle pb-3 overflow-x-auto">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[11.5px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-surface-3 text-text-primary border border-border-subtle shadow-sm"
                            : "text-text-muted hover:text-text-secondary hover:bg-surface-2/60"
                        }`}
                        style={{
                          borderColor: isActive ? currentTint : undefined,
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* 3-IMAGE CAROUSEL ROW - FULL WIDTH & GENEROUS CARD SIZES */}
                <div className="relative overflow-hidden w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-5 w-full" id="avatar-carousel-grid">
                    {currentVisibleAvatars.map((avatar) => {
                      const isSelected = selectedAvatar.id === avatar.id;
                      return (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(avatar);
                            if (!avatar.id.startsWith("custom-")) {
                              setCurrentTint(avatar.defaultTint);
                            }
                          }}
                          className={`group relative flex flex-col items-center justify-center p-4 xl:p-5 rounded-2xl shadow-md transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? "bg-surface-3 border-2"
                              : "bg-surface-2 hover:bg-surface-3 border-border-subtle hover:border-[#353E45]"
                          }`}
                          style={{
                            borderColor: isSelected ? currentTint : undefined,
                          }}
                        >
                          {isSelected && (
                            <div
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10"
                              style={{ backgroundColor: currentTint }}
                            >
                              <span className="material-symbols-outlined text-[#080A0B] text-[15px] font-bold">
                                check
                              </span>
                            </div>
                          )}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 rounded-xl overflow-hidden shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform bg-[#080A0B]">
                            <img
                              src={avatar.src}
                              alt={avatar.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span
                            className={`mt-3 font-mono text-[12.5px] font-bold tracking-wider ${
                              isSelected ? "" : "text-text-muted"
                            }`}
                            style={{ color: isSelected ? currentTint : undefined }}
                          >
                            {avatar.code}
                          </span>
                          <span className="text-[11px] font-mono text-text-muted uppercase mt-0.5 font-semibold">
                            {avatar.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination Dots Indicator */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        slideIndex === idx ? "w-8 bg-primary-fixed" : "w-2 bg-surface-3 hover:bg-text-muted"
                      }`}
                      style={{
                        backgroundColor: slideIndex === idx ? currentTint : undefined,
                      }}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

              {/* Action Footer Strip (Wide & Prominent) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Link
                  href="/onboarding/identify"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary font-mono text-[13px] transition-all duration-200 border border-border-subtle cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">west</span>
                  <span>BACK</span>
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-text-muted hidden sm:inline uppercase font-mono text-[11.5px]">
                    STEP 03 LOCKED IN PROVISIONAL RUN
                  </span>
                  <button
                    type="button"
                    onClick={handleUseAvatar}
                    disabled={isSubmitting}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[#080A0B] font-bold text-[14px] font-mono shadow-[0_0_24px_rgba(228,255,63,0.3)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60"
                    style={{ backgroundColor: currentTint }}
                  >
                    <span>{isSubmitting ? "SAVING AVATAR..." : "USE THIS AVATAR"}</span>
                    <span className="material-symbols-outlined text-[20px] font-bold">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
