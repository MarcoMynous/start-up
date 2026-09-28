"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MISSION_OPTIONS } from "@/lib/mission";
import MissionSidebar from "@/components/MissionSidebar";
import MissionHeader from "@/components/MissionHeader";
import MissionCard from "@/components/MissionCard";

export default function OnboardingMissionPage() {
  const router = useRouter();
  const [selectedMission, setSelectedMission] = useState<string>("compete");
  const [isInitializing, setIsInitializing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleInitialize = () => {
    setIsInitializing(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_mission", selectedMission);
      sessionStorage.setItem("codeclash_onboarding_complete", "true");
    }
    setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        router.push("/onboarding/complete");
      }, 700);
    }, 900);
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_onboarding_complete", "true");
    }
    router.push("/");
  };

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
                FINAL COMMITTAL // PROTOCOL COMPLETE
              </span>
              <span className="font-system-eyebrow text-text-muted tracking-wider uppercase text-[11px] sm:hidden font-mono">
                COMPLETE
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
          
          {/* Top Telemetry Metabar */}
          <div className="w-full bg-surface-1 rounded-xl p-3 sm:p-3.5 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-md border border-border-subtle font-mono text-[12px]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-2 border border-border-subtle">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-ping"></span>
                <span className="text-text-primary font-bold tracking-wider">NET_ONLINE</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-text-muted uppercase text-[11.5px]">
                <span>PIPELINE: ONBOARDING</span>
                <span className="text-border-subtle">/</span>
                <span className="text-text-secondary">PHASE_06: MISSION_DIRECTIVE</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="text-text-secondary">
                LATENCY: <span className="text-status-success font-bold">18ms</span>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-surface-2 text-primary-fixed font-bold border border-border-subtle">
                BUILD: v1.0.4-PROD
              </span>
            </div>
          </div>

          {/* Dual-Column Master Composition (5 Cols Left, 7 Cols Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
            
            {/* Standardized Left Setup Panel (5 Cols, Step 06 Active) */}
            <MissionSidebar />

            {/* Right Task Area (7 Cols) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle flex flex-col gap-6">
                {/* Header */}
                <MissionHeader />

                {/* 2x2 Mission Grid */}
                <div
                  role="radiogroup"
                  aria-label="Select Primary Mission Intention"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {MISSION_OPTIONS.map((option) => (
                    <MissionCard
                      key={option.id}
                      option={option}
                      isSelected={selectedMission === option.id}
                      onSelect={(id) => setSelectedMission(id)}
                    />
                  ))}
                </div>

                {/* Reassurance Notice */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-2 border border-border-subtle">
                  <span className="material-symbols-outlined text-[22px] text-primary-fixed shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <p className="font-body-muted text-body-muted text-text-secondary text-[13.5px] leading-relaxed">
                    Selecting a primary focus highlights relevant modules without locking out any features. You can shift directives inside settings anytime.
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-subtle/50">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href="/onboarding/calibration"
                      className="px-5 py-3.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary font-mono text-[12.5px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-border-subtle font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      <span>BACK</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSkip}
                      className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-surface-2 text-text-muted hover:text-text-primary font-mono text-[12px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SKIP FOR NOW
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleInitialize}
                    disabled={isInitializing}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-fixed text-[#080A0B] font-bold text-[15px] font-mono shadow-[0_0_28px_rgba(228,255,63,0.35)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-3 hover:brightness-105"
                  >
                    {isDone ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] font-bold">check</span>
                        <span>SYSTEM READY</span>
                      </>
                    ) : isInitializing ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-[#080A0B] border-t-transparent rounded-full animate-spin"></span>
                        <span>DEPLOYING ARENA...</span>
                      </>
                    ) : (
                      <>
                        <span>INITIALIZE ARENA</span>
                        <span className="material-symbols-outlined text-[20px] font-bold">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Secondary Telemetry Status Band */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-text-muted font-mono text-[11px]">
                <div className="p-3.5 rounded-xl bg-surface-1 border border-border-subtle flex flex-col gap-1">
                  <span className="text-text-muted/70 uppercase text-[10px]">PROVISIONED MATCH SERVER</span>
                  <span className="text-text-primary font-bold text-[12px]">US-EAST-04 // ASHBURN</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-1 border border-border-subtle flex flex-col gap-1">
                  <span className="text-text-muted/70 uppercase text-[10px]">ACTIVE RATED LADDERS</span>
                  <span className="text-text-primary font-bold text-[12px]">SEASON 04 [CALIBRATING]</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-1 border border-border-subtle flex flex-col gap-1">
                  <span className="text-text-muted/70 uppercase text-[10px]">ALLOCATED WORKSPACE</span>
                  <span className="text-text-primary font-bold text-[12px]">PYTHON / RUST / TS / C++</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-1 border border-border-subtle flex flex-col gap-1">
                  <span className="text-text-muted/70 uppercase text-[10px]">PROFILE STATUS</span>
                  <span className="text-status-success font-bold text-[12px]">READY FOR DISPATCH</span>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
