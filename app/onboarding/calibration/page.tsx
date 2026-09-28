"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CALIBRATION_OPTIONS } from "@/lib/calibration";
import CalibrationSidebar from "@/components/CalibrationSidebar";
import CalibrationHeader from "@/components/CalibrationHeader";
import CalibrationCard from "@/components/CalibrationCard";

export default function OnboardingCalibrationPage() {
  const router = useRouter();
  const [selectedCalibration, setSelectedCalibration] = useState<string>("problem-solver");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_calibration", selectedCalibration);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/mission");
    }, 600);
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
            
            {/* Standardized Left Setup Panel (5 Cols, Step 05 Active) */}
            <CalibrationSidebar />

            {/* Right Task Area (7 Cols) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-surface-1 p-6 sm:p-7 xl:p-8 rounded-2xl shadow-xl border border-border-subtle flex flex-col gap-6">
                {/* Header */}
                <CalibrationHeader />

                {/* 4 Selectable Experience Cards (2x2 Grid) */}
                <div
                  role="radiogroup"
                  aria-label="Competitive Coding Experience"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  id="calibration-group"
                >
                  {CALIBRATION_OPTIONS.map((option) => (
                    <CalibrationCard
                      key={option.id}
                      option={option}
                      isSelected={selectedCalibration === option.id}
                      onSelect={(id) => setSelectedCalibration(id)}
                    />
                  ))}
                </div>

                {/* Technical Explanation Callout Strip */}
                <div className="p-4 sm:p-5 rounded-xl bg-surface-2 flex items-start gap-4 border border-border-subtle">
                  <div className="p-2 rounded-lg bg-surface-1 text-primary-fixed shrink-0 mt-0.5 border border-border-subtle">
                    <span className="material-symbols-outlined text-[22px]">info</span>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="font-mono text-[12px] text-text-primary font-bold uppercase tracking-wider block">
                      THIS DOES NOT SET YOUR ELO
                    </span>
                    <p className="font-body-muted text-body-muted text-text-secondary text-[13.5px] leading-relaxed">
                      Your ranked rating starts as provisional and is determined through placement matches. Initial problem sets will adapt dynamically based on runtime, test passes, and submission latency.
                    </p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border-subtle/50">
                  <Link
                    href="/onboarding/loadout"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary font-mono text-[13px] transition-all duration-200 border border-border-subtle cursor-pointer font-semibold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">west</span>
                    <span>BACK</span>
                  </Link>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <span className="font-mono text-[11.5px] text-text-muted hidden sm:inline uppercase tracking-wider">
                      AUTO-SAVES PROTOCOL
                    </span>
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary-fixed text-[#080A0B] font-bold text-[14px] font-mono shadow-[0_0_24px_rgba(228,255,63,0.3)] active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2.5 hover:brightness-105"
                    >
                      <span>{isSubmitting ? "SAVING..." : "CONTINUE"}</span>
                      <span className="material-symbols-outlined text-[20px] font-bold">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
