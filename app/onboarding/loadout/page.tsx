"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ALL_LANGUAGES } from "@/lib/languages";
import LoadoutSidebar from "@/components/LoadoutSidebar";
import LoadoutHeader from "@/components/LoadoutHeader";
import LanguageGrid from "@/components/LanguageGrid";
import PrimarySelector from "@/components/PrimarySelector";
import LoadoutActions from "@/components/LoadoutActions";

export default function OnboardingLoadoutPage() {
  const router = useRouter();

  // Selected languages list (default: python, rust, cpp)
  const [selectedLangs, setSelectedLangs] = useState<string[]>(["python", "rust", "cpp"]);
  // Primary language (default: python)
  const [primaryLang, setPrimaryLang] = useState<string>("python");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle selection
  const toggleLanguage = (langId: string) => {
    if (selectedLangs.includes(langId)) {
      if (selectedLangs.length <= 1) return;
      const filtered = selectedLangs.filter((id) => id !== langId);
      setSelectedLangs(filtered);
      if (primaryLang === langId) {
        setPrimaryLang(filtered[0]);
      }
    } else {
      if (selectedLangs.length >= 6) return;
      setSelectedLangs([...selectedLangs, langId]);
    }
  };

  const handleSelectPrimary = (langId: string) => {
    if (!selectedLangs.includes(langId)) {
      setSelectedLangs([...selectedLangs, langId]);
    }
    setPrimaryLang(langId);
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_languages", JSON.stringify(selectedLangs));
      sessionStorage.setItem("codeclash_primary_lang", primaryLang);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/calibration");
    }, 600);
  };

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("codeclash_languages", JSON.stringify(["python"]));
      sessionStorage.setItem("codeclash_primary_lang", "python");
    }
    router.push("/onboarding/calibration");
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
            
            {/* Modular Sidebar (5 Cols) */}
            <LoadoutSidebar />

            {/* Modular Right Task Area (7 Cols) */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              <LoadoutHeader />
              <LanguageGrid
                languages={ALL_LANGUAGES}
                selectedLangs={selectedLangs}
                primaryLang={primaryLang}
                onToggle={toggleLanguage}
              />
              <PrimarySelector
                languages={ALL_LANGUAGES}
                selectedLangs={selectedLangs}
                primaryLang={primaryLang}
                onSelectPrimary={handleSelectPrimary}
              />
              <LoadoutActions
                isSubmitting={isSubmitting}
                onContinue={handleContinue}
                onSkip={handleSkip}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
