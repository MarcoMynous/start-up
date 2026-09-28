"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { TelemetryProfile } from "@/lib/types";
import DiagnosticTelemetryLog from "@/components/DiagnosticTelemetryLog";
import PlayerDossierCard from "@/components/PlayerDossierCard";
import RatingCalibrationCallout from "@/components/RatingCalibrationCallout";
import CompletionActions from "@/components/CompletionActions";

export default function OnboardingCompletePage() {
  const [profile, setProfile] = useState<TelemetryProfile>({
    handle: "NANO",
    avatarSrc: "/avatars/avatar-1.jpg",
    avatarHash: "HASH_9F2A",
    primaryLang: "python",
    primaryRuntime: "PYTHON 3.12 (CPYTHON)",
    experience: "PROBLEM SOLVER",
    mission: "COMPETE [LADDER_Q1]",
    uid: "9812-4091",
    ping: "18ms",
    cluster: "US-EAST",
    ratingTier: "PROVISIONAL",
    placementsDone: 0,
    placementsTotal: 3,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedHandle = sessionStorage.getItem("codeclash_handle");
    const savedAvatar = sessionStorage.getItem("codeclash_avatar");
    const savedPrimaryLang = sessionStorage.getItem("codeclash_primary_lang");
    const savedCalibration = sessionStorage.getItem("codeclash_calibration");
    const savedMission = sessionStorage.getItem("codeclash_mission");

    const runtimeMap: Record<string, string> = {
      python: "PYTHON 3.12 (CPYTHON)",
      typescript: "TYPESCRIPT 5.4 (NODE 20)",
      cpp: "C++20 (GCC 13.2)",
      rust: "RUST 1.77 (RUSTC)",
      go: "GO 1.22 (GC)",
      java: "JAVA 21 (OPENJDK)",
    };

    const calibrationMap: Record<string, string> = {
      "new-blood": "NEW BLOOD",
      "problem-solver": "PROBLEM SOLVER",
      "contest-regular": "CONTEST REGULAR",
      competitive: "COMPETITIVE ARENA",
    };

    const missionMap: Record<string, string> = {
      compete: "COMPETE [LADDER_Q1]",
      interview: "INTERVIEW PREP [TECH_LEET]",
      practice: "DRILLS & PRACTICE [SOLO]",
      events: "TOURNEYS & CLASHES [SEASONAL]",
    };

    setProfile((prev) => ({
      ...prev,
      handle: savedHandle && savedHandle.trim() ? savedHandle.toUpperCase() : prev.handle,
      avatarSrc: savedAvatar || prev.avatarSrc,
      primaryLang: savedPrimaryLang || prev.primaryLang,
      primaryRuntime:
        (savedPrimaryLang && runtimeMap[savedPrimaryLang]) || prev.primaryRuntime,
      experience:
        (savedCalibration && calibrationMap[savedCalibration]) || prev.experience,
      mission: (savedMission && missionMap[savedMission]) || prev.mission,
    }));
  }, []);

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary flex flex-col selection:bg-surface-tint selection:text-surface-1 antialiased">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-1/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-border-subtle h-14">
        <div className="h-full w-[94%] max-w-[1280px] xl:max-w-[1400px] mx-auto px-2 sm:px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
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
              <span className="font-system-eyebrow text-text-muted tracking-wider uppercase text-[12px] sm:hidden font-mono">
                SECURE PROTOCOL
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden border border-border-subtle shadow-sm">
              {profile.avatarSrc ? (
                <Image
                  src={profile.avatarSrc}
                  alt={profile.handle}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-14 flex-1 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Atmospheric subtle background depth */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none -z-10"></div>

        <div className="w-[94%] max-w-[1140px] xl:max-w-[1240px] mx-auto py-8 sm:py-12 flex flex-col items-center">
          {/* Top Eyebrow & Status Header */}
          <div className="flex flex-col items-center text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-border-subtle text-text-secondary shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
              <span className="font-system-eyebrow text-[11px] tracking-widest text-text-muted uppercase font-mono">
                SYSTEM CHECK // INITIALIZATION VECTOR
              </span>
              <span className="text-primary-fixed font-code-snippet text-[12px] ml-1 font-mono font-bold">
                07/07
              </span>
            </div>

            <h1 className="font-display-hero text-[36px] sm:text-[46px] md:text-[54px] lg:text-[56px] text-text-primary tracking-tight font-bold leading-tight">
              Arena initialization complete.
            </h1>

            <p className="font-body-default text-[15px] sm:text-[16px] text-text-secondary max-w-xl leading-relaxed">
              Your competitive terminal environment is verified and operational.
              System link calibrated for low-latency matchmaking.
            </p>
          </div>

          {/* Central Telemetry Diagnostics & Dossier Grid (7-col + 5-col) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
            <div className="md:col-span-7">
              <DiagnosticTelemetryLog profile={profile} />
            </div>
            <div className="md:col-span-5">
              <PlayerDossierCard profile={profile} />
            </div>
          </div>

          {/* Rating Calibration Explanation Callout */}
          <RatingCalibrationCallout />

          {/* Primary Destination Pathways (3 Action Buttons) */}
          <CompletionActions />

          {/* Terminal Footer telemetry note */}
          <div className="text-center font-code-snippet text-[12px] text-text-muted font-mono pt-2 flex items-center justify-center gap-2 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
            <span>
              NODE: DAL-04 // LATENCY: 12ms // ALL PROTOCOLS VALIDATED
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
