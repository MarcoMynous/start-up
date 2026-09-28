"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialEmail = searchParams.get("email") || "nano@example.com";
  const [recipientEmail, setRecipientEmail] = useState(initialEmail);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState("");

  // Verification state
  const [isValidating, setIsValidating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Expiration & Resend countdown timers
  const [expirySeconds, setExpirySeconds] = useState(14 * 60 + 42); // 14:42
  const [resendCountdown, setResendCountdown] = useState(48);
  const [copiedToken, setCopiedToken] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Live timer for expiration and resend
  useEffect(() => {
    const timer = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatExpiry = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s} remaining`;
  };

  const handleVerify = () => {
    if (isVerified) {
      // Proceed to step 2: Identity
      router.push("/onboarding/identify");
      return;
    }

    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsVerified(true);
    }, 1000);
  };

  const handleResend = () => {
    if (resendCountdown > 0) return;
    setResendSuccess(true);
    setResendCountdown(60);
    setTimeout(() => setResendSuccess(false), 3500);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText("7f90c4a92e104fba28").then(() => {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 1800);
    });
  };

  const handleChangeEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempEmail && tempEmail.includes("@")) {
      setRecipientEmail(tempEmail);
      setIsChangingEmail(false);
      setResendCountdown(60);
    }
  };

  return (
    <div className="w-full min-h-screen bg-surface-container-lowest text-text-primary flex flex-col selection:bg-surface-tint selection:text-surface-1 relative overflow-x-hidden">
      {/* Subtle Ambient High-Tech Backdrop Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(228,255,63,0.06),rgba(0,0,0,0))] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171B1F_1px,transparent_1px),linear-gradient(to_bottom,#171B1F_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_65%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-1/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-border-subtle">
        <div className="h-16 max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-space-sm group">
            <img
              alt="CodeClash Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
            />
            <span className="font-system-eyebrow text-system-eyebrow uppercase tracking-widest text-text-muted select-none group-hover:text-text-primary transition-colors">
              {"// SYS_INIT"}
            </span>
          </Link>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider uppercase hidden sm:inline">
                SYSTEM INITIALIZATION // SECURE PROTOCOL
              </span>
              <span className="font-system-eyebrow text-system-eyebrow text-text-muted tracking-wider uppercase sm:hidden">
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

      {/* MAIN CONTAINER */}
      <main className="w-full pt-24 pb-16 sm:py-28 min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-7xl xl:max-w-[1440px] w-full mx-auto px-6 sm:px-8 lg:px-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
            
            {/* LEFT SETUP PANEL (5 cols) */}
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
                    STEP 01 / 06
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
                  {/* STEP 01 - ACTIVE */}
                  <div className="group flex items-center justify-between bg-surface-2 px-4 py-3.5 rounded-xl relative shadow-md border border-border-subtle hover:border-primary-fixed/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-6 rounded-full bg-primary-fixed"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-primary tracking-wider font-bold">
                        01 // VERIFY EMAIL
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isVerified ? (
                        <span className="font-system-eyebrow text-[12px] text-status-success uppercase tracking-wider flex items-center gap-1 font-semibold">
                          <span className="material-symbols-outlined text-[15px]">done</span>
                          COMPLETED
                        </span>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                          <span className="font-system-eyebrow text-[12px] text-primary-fixed uppercase tracking-wider font-semibold">
                            ACTIVE
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* STEP 02 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-45 hover:opacity-70 transition-opacity">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-surface-3"></span>
                      <span className="font-system-eyebrow text-[13px] text-text-secondary tracking-wider">
                        02 // IDENTITY
                      </span>
                    </div>
                    <span className="font-system-eyebrow text-[11.5px] text-text-muted uppercase">
                      LOCKED
                    </span>
                  </div>

                  {/* STEP 03 - PENDING */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-45 hover:opacity-70 transition-opacity">
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
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-45 hover:opacity-70 transition-opacity">
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
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-45 hover:opacity-70 transition-opacity">
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
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl opacity-45 hover:opacity-70 transition-opacity">
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
                      {isVerified ? "33.3% COMPLETE" : "16.6% COMPLETE"}
                    </span>
                    <span className="font-mono text-text-secondary text-[12.5px]">
                      EST_TIME: ~180s remaining
                    </span>
                  </div>
                  {/* Inline Minimal Progress Ring SVG */}
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
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
                        strokeDashoffset={isVerified ? "83.7" : "104.6"}
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                    <span className="absolute font-system-eyebrow text-[12px] text-primary-fixed font-mono font-bold">
                      {isVerified ? "2/6" : "1/6"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footnote Terminal Strip */}
              <div className="mt-8 pt-5 bg-surface-2/40 -mx-6 sm:-mx-8 lg:-mx-9 -mb-6 sm:-mb-8 lg:-mb-9 px-6 sm:px-8 lg:px-9 pb-6 flex flex-col gap-2 border-t border-border-subtle font-mono">
                <div className="flex items-center justify-between font-system-eyebrow text-[11px] text-text-muted">
                  <span>YOUR ELO IS EARNED IN MATCHES</span>
                  <span className="text-text-primary">v1.0.4-PROD</span>
                </div>
                <div className="flex items-center justify-between font-code-snippet text-text-secondary text-[12px]">
                  <span>SECURITY PROTOCOL: SHA-256</span>
                  <span className="text-status-success flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> NODE ONLINE
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT TASK AREA (7 cols) */}
            <div className="lg:col-span-7 bg-surface-1 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 shadow-2xl relative border border-border-subtle">
              <div className="flex flex-col gap-7 sm:gap-8">
                {/* Top Bar: Monospace Eyebrow & Status Flag */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-system-eyebrow text-primary-fixed tracking-widest uppercase font-semibold text-[12px]">
                      {"// DISPATCH_ID: CC-99482-AUTH"}
                    </span>
                  </div>
                  <div className="bg-surface-2 px-3.5 py-1.5 rounded-lg flex items-center gap-2 border border-border-subtle font-mono text-[12px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isVerified ? "bg-status-success animate-pulse" : "bg-status-warning"
                      }`}
                    ></span>
                    <span className="font-system-eyebrow text-text-secondary uppercase">
                      {isVerified ? "HANDSHAKE VERIFIED" : "AWAITING HANDSHAKE"}
                    </span>
                  </div>
                </div>

                {/* Title & Context */}
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-[34px] sm:text-[42px] lg:text-[46px] text-text-primary tracking-tight font-bold leading-tight">
                    Check your inbox.
                  </h1>
                  <p className="text-[16px] sm:text-[17px] text-text-secondary leading-relaxed max-w-2xl">
                    We sent a cryptographic verification packet to register your terminal handle.
                    Confirm receipt to unlock rank profiling.
                  </p>
                </div>

                {/* Transmission Telemetry Card */}
                <div className="bg-surface-2 rounded-2xl p-6 sm:p-7 flex flex-col gap-6 shadow-md border border-border-subtle">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Encrypted Dispatch Icon Graphic */}
                      <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center text-primary-fixed shadow-sm border border-border-subtle shrink-0">
                        <span className="material-symbols-outlined text-[30px]">
                          mark_email_unread
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-system-eyebrow text-text-muted uppercase font-mono text-[11.5px] tracking-wider">
                          RECIPIENT IDENTITY
                        </span>
                        <span className="font-mono text-[17px] sm:text-[19px] text-text-primary tracking-tight font-semibold">
                          {recipientEmail}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="px-3 py-1.5 bg-surface-3 text-status-success rounded-lg font-system-eyebrow uppercase flex items-center gap-2 border border-border-subtle text-[12px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                        EMAIL SENT
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Data Stream Rows */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono">
                    <div className="bg-surface-3 p-4 rounded-xl flex flex-col border border-border-subtle">
                      <span className="font-system-eyebrow text-text-muted text-[11px] tracking-wider">
                        DISPATCH TIME
                      </span>
                      <span className="font-code-snippet text-text-primary mt-1 font-semibold text-[14px]">
                        14:02:18 UTC
                      </span>
                    </div>
                    <div className="bg-surface-3 p-4 rounded-xl flex flex-col border border-border-subtle">
                      <span className="font-system-eyebrow text-text-muted text-[11px] tracking-wider">
                        EXPIRATION
                      </span>
                      <span className="font-code-snippet text-status-warning mt-1 font-semibold text-[14px]">
                        {formatExpiry(expirySeconds)}
                      </span>
                    </div>
                    <div className="bg-surface-3 p-4 rounded-xl flex flex-col border border-border-subtle">
                      <span className="font-system-eyebrow text-text-muted text-[11px] tracking-wider">
                        CIPHER
                      </span>
                      <span className="font-code-snippet text-text-primary mt-1 font-semibold text-[14px]">
                        TLS 1.3 / E2E
                      </span>
                    </div>
                    <div className="bg-surface-3 p-4 rounded-xl flex flex-col border border-border-subtle">
                      <span className="font-system-eyebrow text-text-muted text-[11px] tracking-wider">
                        ATTEMPTS
                      </span>
                      <span className="font-code-snippet text-text-primary mt-1 font-semibold text-[14px]">
                        01 OF 05
                      </span>
                    </div>
                  </div>

                  {/* Interactive Diagnostic Terminal Prompt */}
                  <div className="bg-surface-1 p-3.5 sm:p-4 rounded-xl flex items-center justify-between text-code-snippet font-code-snippet text-text-secondary border border-border-subtle gap-3">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-primary-fixed select-none font-bold text-[15px]">&gt;</span>
                      <span className="truncate font-mono text-[13.5px]">
                        POST /v1/auth/verify?token=7f90c4a...
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="text-primary-fixed hover:text-text-primary transition-colors flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg bg-surface-2 text-[12px] font-system-eyebrow border border-border-subtle cursor-pointer font-mono font-semibold"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {copiedToken ? "done" : "content_copy"}
                      </span>
                      <span>{copiedToken ? "COPIED" : "TOKEN"}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Change Email Form Modal/Toggle */}
                {isChangingEmail && (
                  <form
                    onSubmit={handleChangeEmailSubmit}
                    className="p-5 bg-surface-2 rounded-2xl border border-border-subtle flex flex-col gap-3.5 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="new-recipient-email"
                        className="font-system-eyebrow text-[12px] text-text-secondary uppercase tracking-wider font-mono font-semibold"
                      >
                        UPDATE RECIPIENT TRANSMISSION EMAIL
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsChangingEmail(false)}
                        className="text-text-muted hover:text-text-primary text-[12.5px] font-mono cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        id="new-recipient-email"
                        type="email"
                        required
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        placeholder="operative@domain.com"
                        className="flex-1 h-12 px-4 rounded-xl bg-surface-1 border border-border-subtle text-text-primary text-[14.5px] font-mono outline-none focus:border-primary-fixed"
                        style={{ backgroundColor: "#0D1012", color: "#F3F5F2" }}
                      />
                      <button
                        type="submit"
                        className="px-6 h-12 rounded-xl bg-primary-fixed text-[#080A0B] font-bold font-mono text-[13px] hover:brightness-105 cursor-pointer shrink-0"
                      >
                        UPDATE
                      </button>
                    </div>
                  </form>
                )}

                {/* Resend Success Notice */}
                {resendSuccess && (
                  <div className="p-4 bg-surface-2 border border-status-success/30 rounded-xl flex items-center gap-2.5 text-status-success font-mono text-[13px] animate-fadeIn">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span>DISPATCH RE-SENT TO {recipientEmail}. PLEASE CHECK INBOX.</span>
                  </div>
                )}

                {/* Action Panel: Primary Volt CTA & Secondaries */}
                <div className="flex flex-col gap-3.5 pt-1">
                  {/* Primary Tactical CTA */}
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isValidating}
                    className={`w-full h-14 sm:h-16 text-[16px] sm:text-[17px] rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all duration-150 cursor-pointer font-bold ${
                      isVerified
                        ? "bg-status-success text-[#080A0B] hover:brightness-105 shadow-[0_0_24px_rgba(34,197,94,0.35)]"
                        : "bg-primary-fixed hover:bg-[#F0FF70] active:scale-[0.99] text-on-primary-fixed shadow-[0_0_24px_rgba(228,255,63,0.3)]"
                    }`}
                  >
                    {isValidating ? (
                      <>
                        <span className="material-symbols-outlined text-[22px] animate-spin">
                          refresh
                        </span>
                        <span>VALIDATING HANDSHAKE...</span>
                      </>
                    ) : isVerified ? (
                      <>
                        <span>PROCEED TO STEP 02</span>
                        <span className="material-symbols-outlined text-[22px] font-bold">
                          arrow_forward
                        </span>
                      </>
                    ) : (
                      <>
                        <span>I&apos;VE VERIFIED MY EMAIL</span>
                        <span className="material-symbols-outlined text-[22px] font-bold">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>

                  {/* Secondary Operational Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCountdown > 0}
                      className={`h-12 bg-surface-2 hover:bg-surface-3 active:scale-[0.99] text-[12.5px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 border border-border-subtle cursor-pointer font-mono ${
                        resendCountdown === 0
                          ? "text-primary-fixed border-primary-fixed/40 font-bold"
                          : "text-text-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[19px]">sync</span>
                      <span>
                        {resendCountdown > 0
                          ? `RESEND DISPATCH (${resendCountdown}s)`
                          : "RESEND DISPATCH NOW"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTempEmail(recipientEmail);
                        setIsChangingEmail(!isChangingEmail);
                      }}
                      className="h-12 bg-surface-2 hover:bg-surface-3 active:scale-[0.99] text-text-secondary hover:text-text-primary text-[12.5px] uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 border border-border-subtle cursor-pointer font-mono"
                    >
                      <span className="material-symbols-outlined text-[19px]">edit</span>
                      <span>CHANGE RECIPIENT</span>
                    </button>
                  </div>
                </div>

                {/* Verified Success State Banner */}
                {isVerified && (
                  <div className="bg-status-success/10 border border-status-success/30 p-4 sm:p-5 rounded-xl flex items-center justify-between transition-all duration-300 animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-status-success flex items-center justify-center text-surface-1 shadow-md">
                        <span className="material-symbols-outlined text-[22px] font-bold text-black">
                          done_all
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] text-text-primary font-bold">
                          EMAIL VERIFIED — Access Confirmed
                        </span>
                        <span className="text-text-secondary text-[13.5px]">
                          Token accepted. Proceeding to Player Identity calibration...
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-status-success/20 text-status-success rounded font-mono text-[12px] uppercase font-bold">
                      SUCCESS
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Guidance & Help Strip */}
              <div className="p-4 bg-surface-2 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-text-secondary border border-border-subtle mt-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-text-muted">
                    info
                  </span>
                  <span className="text-[13.5px]">
                    Didn&apos;t receive the packet? Check your junk or spam repository.
                  </span>
                </div>
                <a
                  className="text-primary-fixed hover:underline uppercase tracking-wider shrink-0 font-mono text-[12px] font-semibold"
                  href="#support"
                >
                  SYS_LOG / HELP
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-surface-container-lowest flex items-center justify-center text-text-primary font-mono text-[14px]">
          INITIALIZING SECURE PROTOCOL...
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
