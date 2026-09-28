"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("nano@example.com");
  const [password, setPassword] = useState("MasterClash2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Interaction / Loading states
  const [googleStatus, setGoogleStatus] = useState<string | null>(null);
  const [githubStatus, setGithubStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState("SIGN IN");
  const [submitIcon, setSubmitIcon] = useState("arrow_forward");
  const [feedback, setFeedback] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [queueState, setQueueState] = useState<"idle" | "searching" | "locked">("idle");

  const showFeedback = (message: string, isError = true) => {
    setFeedback({ message, isError });
    setTimeout(() => {
      setFeedback(null);
    }, 6000);
  };

  const handleGoogleAuth = () => {
    if (googleStatus) return;
    setGoogleStatus("CONNECTING TO GOOGLE...");
    setTimeout(() => {
      setGoogleStatus("REDIRECTING TO ARENA...");
      setTimeout(() => {
        setGoogleStatus(null);
        showFeedback("GOOGLE AUTH HANDSHAKE COMPLETE. REDIRECTING...", false);
        router.push("/board/dashboard");
      }, 700);
    }, 800);
  };

  const handleGithubAuth = () => {
    if (githubStatus) return;
    setGithubStatus("CONNECTING TO GITHUB...");
    setTimeout(() => {
      setGithubStatus("AUTHENTICATING OAUTH KEY...");
      setTimeout(() => {
        setGithubStatus(null);
        showFeedback("GITHUB SECURE CLUSTER VERIFIED. REDIRECTING...", false);
        router.push("/board/dashboard");
      }, 700);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitText("AUTHENTICATING...");
    setSubmitIcon("progress_activity");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitText("ACCESS GRANTED");
      setSubmitIcon("check_circle");
      showFeedback("SESSION KEY REFRESHED. LOADING COMMAND CENTER...", false);

      setTimeout(() => {
        router.push("/board/dashboard");
      }, 600);
    }, 900);
  };

  const handleForgotPwd = () => {
    showFeedback("RESET INJECTION SENT TO OPERATIVE RECOVERY CHANNEL.", false);
  };

  const handleReadyToClash = () => {
    if (queueState === "idle") {
      setQueueState("searching");
      showFeedback("INITIALIZING 1V1 BREACH MATCHMAKER... SCANNING POOL", false);
      setTimeout(() => {
        setQueueState("locked");
        showFeedback("RIVAL NODE ACQUIRED // COMMENCING IN 03s", false);
        setTimeout(() => {
          setQueueState("idle");
          router.push("/board/dashboard");
        }, 1500);
      }, 2000);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#080A0B] text-text-primary flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      <div className="w-full min-h-screen bg-[#080A0B] flex flex-col lg:flex-row antialiased">
        {/* LEFT COLUMN: AUTHENTICATION INTERFACE (42-44% width on desktop) */}
        <div className="w-full lg:w-[44%] xl:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-border-subtle bg-[#080A0B] relative z-10">
          {/* Centered Form Wrapper */}
          <div className="w-full max-w-[460px] mx-auto my-auto flex flex-col justify-center">
            {/* Top Brand Anchor */}
            <div className="flex items-center justify-between pb-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-surface-1 border border-border-subtle p-1.5 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-primary-fixed/50 transition-colors">
                  <img
                    alt="CodeClash Tactical Brand Emblem"
                    className="w-full h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-card-title text-text-primary font-bold tracking-tight text-[18px] leading-tight group-hover:text-primary-fixed transition-colors">
                    CODECLASH
                  </span>
                  <span className="font-system-eyebrow text-[11px] text-text-muted tracking-widest leading-none">
                    TELEMETRY RUNTIME
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed shadow-[0_0_8px_rgba(228,255,63,0.8)] animate-pulse"></span>
                <span className="font-system-eyebrow text-text-muted text-[11.5px] font-mono tracking-wider">
                  {"// SYS_AUTH"}
                </span>
              </div>
            </div>

            {/* Section Eyebrow & Titles */}
            <div className="mt-2 sm:mt-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-sm bg-primary-fixed"></span>
                <span className="font-system-eyebrow text-text-secondary uppercase tracking-widest text-[11.5px] sm:text-[12px]">
                  ARENA ACCESS // RETURNING PLAYER
                </span>
              </div>
              <h1 className="font-section-heading text-[30px] sm:text-[34px] text-text-primary tracking-tight font-bold">
                Welcome back.
              </h1>
              <p className="font-body-default text-[15px] sm:text-[16px] text-text-secondary mt-1">
                Sign in and continue where you left off.
              </p>
            </div>

            {/* OAuth Providers */}
            <div className="flex flex-col gap-3.5 mb-6">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={!!googleStatus}
                className="w-full h-[52px] px-4 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-[#353E45] transition-all duration-150 flex items-center justify-center gap-3 text-text-primary font-medium text-body-default group active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              >
                <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    fill="#34A853"
                  />
                </svg>
                <span className="tracking-wide">
                  {googleStatus || "CONTINUE WITH GOOGLE"}
                </span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={handleGithubAuth}
                disabled={!!githubStatus}
                className="w-full h-[52px] px-4 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle hover:border-[#353E45] transition-all duration-150 flex items-center justify-center gap-3 text-text-primary font-medium text-body-default group active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
              >
                <svg
                  className="w-4 h-4 fill-current text-text-primary flex-shrink-0 transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="tracking-wide">
                  {githubStatus || "CONTINUE WITH GITHUB"}
                </span>
              </button>
            </div>

            {/* Hairline Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="w-full border-t border-border-subtle"></div>
              <span className="absolute bg-[#080A0B] px-3 font-system-eyebrow text-[11.5px] uppercase tracking-wider text-text-muted font-mono">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            {/* Form Element */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
              {/* Inline Notification / Error Feedback State */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-lg border text-[12.5px] font-mono flex items-center gap-2.5 transition-all ${
                    feedback.isError
                      ? "border-status-failure/30 bg-status-failure/10 text-status-failure"
                      : "border-status-success/30 bg-status-success/10 text-status-success"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] shrink-0">
                    {feedback.isError ? "error" : "check_circle"}
                  </span>
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="email"
                    className="font-system-eyebrow text-[11.5px] text-text-secondary tracking-widest font-mono"
                  >
                    OPERATIVE EMAIL
                  </label>
                  <span className="font-system-eyebrow text-[10.5px] text-text-muted font-mono">
                    AUTH_V2_ENABLED
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nano@example.com"
                    className="w-full h-[52px] bg-surface-1 border border-border-subtle text-text-primary font-mono text-[15px] px-4 pr-11 rounded-lg focus:outline-none focus:border-primary-fixed transition-colors duration-150"
                    style={{ backgroundColor: "#0D1012", color: "#F3F5F2" }}
                  />
                  <span className="material-symbols-outlined text-text-muted absolute right-3.5 top-3.5 text-[20px]">
                    terminal
                  </span>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="font-system-eyebrow text-[11.5px] text-text-secondary tracking-widest font-mono"
                  >
                    ACCESS KEY / PASSWORD
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full h-[52px] bg-surface-1 border border-border-subtle text-text-primary font-mono text-[15px] px-4 pr-11 rounded-lg focus:outline-none focus:border-primary-fixed transition-colors duration-150"
                    style={{ backgroundColor: "#0D1012", color: "#F3F5F2" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-text-muted hover:text-text-primary transition-colors focus:outline-none cursor-pointer p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between pt-1 pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4.5 h-4.5 rounded-sm bg-surface-1 border border-border-subtle peer-checked:bg-primary-fixed peer-checked:border-primary-fixed flex items-center justify-center transition-colors">
                    <svg
                      className="w-3.5 h-3.5 text-[#080A0B] fill-current opacity-0 peer-checked:opacity-100 transition-opacity font-bold"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-system-eyebrow text-[11.5px] text-text-secondary group-hover:text-text-primary tracking-wider transition-colors font-mono">
                    REMEMBER ME
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPwd}
                  className="font-system-eyebrow text-[11.5px] text-text-secondary hover:text-primary-fixed transition-colors tracking-wider font-mono cursor-pointer"
                >
                  FORGOT PASSWORD?
                </button>
              </div>

              {/* Primary CTA Button (Volt Luminescence) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] rounded-lg bg-primary-fixed text-[#080A0B] font-body-default font-bold text-[15px] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(228,255,63,0.2)] cursor-pointer mt-3 disabled:opacity-80 disabled:pointer-events-none"
              >
                <span className="tracking-wide">{submitText}</span>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isSubmitting ? "animate-spin" : ""
                  }`}
                >
                  {submitIcon}
                </span>
              </button>
            </form>

            {/* Bottom Footnote & Routing */}
            <div className="pt-8 border-t border-border-subtle mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="font-body-muted text-body-muted text-text-secondary text-[13.5px]">
                New to CodeClash?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary-fixed font-semibold hover:underline ml-1 font-mono tracking-tight"
                >
                  CREATE ACCOUNT →
                </Link>
              </div>
              <div className="font-system-eyebrow text-[10.5px] text-text-muted font-mono tracking-widest">
                SEC_LEVEL_3 // TLS 1.3
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RETURNING PLAYER COMPETITIVE SNAPSHOT (56-58% width on desktop) */}
        <div className="hidden lg:flex lg:w-[56%] xl:w-[58%] min-h-screen bg-surface-1 p-8 sm:p-10 xl:p-14 flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Vector Grid / Diagonal Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#e4ff3f_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-fixed/5 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Section Top Eyebrow Bar - Centered Container */}
          <div className="relative z-10 w-full max-w-[780px] mx-auto flex items-center justify-between border-b border-border-subtle pb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping"></span>
              <span className="font-system-eyebrow text-text-secondary text-[12px] font-mono tracking-widest">
                COMPETITIVE DOSSIER // OPERATIVE SYNCED
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-surface-2 border border-border-subtle font-mono text-[11.5px] text-text-muted">
                SESSION_ID #892-NY
              </span>
              <span className="font-mono text-[12px] text-status-success flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>{" "}
                RE-AUTHENTICATED
              </span>
            </div>
          </div>

          {/* Main Dossier Content Stack - Placed in the Middle & Scaled Up */}
          <div className="relative z-10 w-full max-w-[780px] mx-auto my-auto py-8 space-y-6 sm:space-y-7">
            {/* Player Hero Card */}
            <div className="bg-surface-2 border border-border-subtle rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-sm hover:border-[#353E45] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-border-subtle">
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Player Tactical Avatar Badge */}
                  <div className="w-16 h-16 rounded-xl bg-[#080A0B] border border-border-subtle flex items-center justify-center relative font-mono font-bold text-2xl text-primary-fixed shadow-inner shrink-0">
                    N
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-status-success border-2 border-surface-2 rounded-full"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[21px] sm:text-[23px] font-bold tracking-tight text-text-primary">
                        NANO
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-primary-fixed/10 border border-primary-fixed/30 text-primary-fixed text-[11px] font-mono font-semibold tracking-wider">
                        TIER II
                      </span>
                    </div>
                    <div className="font-system-eyebrow text-text-secondary text-[12px] tracking-wider mt-1">
                      STACK HUNTER DIVISION
                    </div>
                  </div>
                </div>
                {/* ELO Badge (Volt Monospace) */}
                <div className="sm:text-right flex sm:flex-col items-baseline sm:items-end justify-between">
                  <span className="font-system-eyebrow text-text-muted text-[11px] tracking-wider font-mono">
                    RATING INDEX
                  </span>
                  <div className="font-mono text-[34px] sm:text-[38px] font-extrabold text-primary-fixed tracking-tight leading-none mt-1">
                    1,248{" "}
                    <span className="text-[13px] font-normal text-text-secondary ml-0.5">
                      ELO
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Metas Under Hero Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-5 text-[13.5px] font-mono">
                <div>
                  <span className="text-text-muted text-[11px] uppercase block tracking-wider mb-1">
                    GLOBAL STANDING
                  </span>
                  <span className="text-text-primary font-semibold text-[14px]">
                    #1,842{" "}
                    <span className="text-primary-fixed font-normal">
                      (TOP 7.4%)
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-text-muted text-[11px] uppercase block tracking-wider mb-1">
                    PRIMARY COMPILER
                  </span>
                  <span className="text-text-primary font-semibold text-[14px] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
                    PYTHON 3.12
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-text-muted text-[11px] uppercase block tracking-wider mb-1">
                    CLUSTER PROXIMITY
                  </span>
                  <span className="text-status-success font-semibold text-[14px] flex items-center gap-1.5">
                    US-EAST-1{" "}
                    <span className="text-text-muted font-normal">• 14ms</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Stat Vitals Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              <div className="bg-surface-2 border border-border-subtle p-4 sm:p-5 rounded-xl flex flex-col justify-between">
                <span className="font-system-eyebrow text-text-muted text-[11px] uppercase tracking-wider font-mono">
                  CURRENT STREAK
                </span>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success"></span>
                  <span className="font-mono text-[17px] font-bold text-status-success">
                    3 WINS
                  </span>
                </div>
              </div>
              <div className="bg-surface-2 border border-border-subtle p-4 sm:p-5 rounded-xl flex flex-col justify-between">
                <span className="font-system-eyebrow text-text-muted text-[11px] uppercase tracking-wider font-mono">
                  SEASON DELTA
                </span>
                <div className="flex items-center gap-1 mt-3">
                  <span className="material-symbols-outlined text-status-success text-[20px]">
                    arrow_drop_up
                  </span>
                  <span className="font-mono text-[17px] font-bold text-text-primary">
                    +73 ELO
                  </span>
                </div>
              </div>
              <div className="bg-surface-2 border border-border-subtle p-4 sm:p-5 rounded-xl flex flex-col justify-between">
                <span className="font-system-eyebrow text-text-muted text-[11px] uppercase tracking-wider font-mono">
                  WIN RATIO
                </span>
                <div className="mt-3">
                  <span className="font-mono text-[17px] font-bold text-text-primary">
                    61.8%
                  </span>
                  <span className="font-mono text-[11.5px] text-text-muted ml-1.5">
                    42W-27L
                  </span>
                </div>
              </div>
              <div className="bg-surface-2 border border-border-subtle p-4 sm:p-5 rounded-xl flex flex-col justify-between">
                <span className="font-system-eyebrow text-text-muted text-[11px] uppercase tracking-wider font-mono">
                  AVG EXEC TIME
                </span>
                <div className="mt-3">
                  <span className="font-mono text-[17px] font-bold text-text-primary">
                    08:42
                  </span>
                  <span className="font-mono text-[11.5px] text-text-muted ml-1.5">
                    MIN
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Clash Outcome Card */}
            <div className="bg-surface-2 border border-border-subtle rounded-xl p-5 sm:p-5.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-status-success/15 border border-status-success/30 text-status-success font-mono text-[11px] font-bold tracking-wider">
                    VICTORY // +18 ELO
                  </span>
                  <span className="font-mono text-[13px] text-text-secondary">
                    vs BYTEGHOST
                  </span>
                </div>
                <div className="font-card-title text-[15.5px] sm:text-[16px] font-semibold text-text-primary flex items-center gap-2">
                  Circular Packet Route
                  <span className="text-text-muted text-[12.5px] font-normal font-mono">
                    • Graphs / Medium
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border-subtle pt-2 sm:pt-0">
                <div className="text-right">
                  <span className="font-system-eyebrow text-[10.5px] text-text-muted block font-mono">
                    SOLVE DURATION
                  </span>
                  <span className="font-mono text-[14px] text-text-primary font-semibold">
                    08:24.19
                  </span>
                </div>
                <div className="w-9 h-9 rounded bg-surface-1 border border-border-subtle flex items-center justify-center text-status-success">
                  <span className="material-symbols-outlined text-[20px]">
                    verified
                  </span>
                </div>
              </div>
            </div>

            {/* Next Matchmaking Queue Ready Container */}
            <div className="bg-surface-2/70 border border-primary-fixed/30 rounded-xl p-5 sm:p-6 relative overflow-hidden bg-gradient-to-r from-surface-2 to-surface-1 shadow-[0_0_24px_rgba(228,255,63,0.06)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-system-eyebrow text-primary-fixed text-[12px] font-mono tracking-wider font-semibold">
                      NEXT MATCH // STANDARD BREACH
                    </span>
                    <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
                  </div>
                  <p className="font-body-default text-[13.5px] text-text-secondary font-mono">
                    15 MIN • ±75 ELO STAKES • 1v1 DIRECT INJECTION
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-2 rounded bg-surface-1 border border-border-subtle font-mono text-[12px] text-text-muted flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-status-success"></span>
                    SERVER SHARD READY
                  </div>
                  <button
                    type="button"
                    onClick={handleReadyToClash}
                    className="px-4 py-2 rounded bg-primary-fixed text-[#080A0B] font-mono text-[12px] font-bold tracking-wider flex items-center gap-2 shadow-[0_0_14px_rgba(228,255,63,0.35)] hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-[#080A0B] ${
                        queueState === "searching" ? "animate-spin" : "animate-pulse"
                      }`}
                    ></span>
                    {queueState === "idle" && "READY TO CLASH"}
                    {queueState === "searching" && "QUEUE ACTIVE..."}
                    {queueState === "locked" && "MATCH FOUND!"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer Strip - Centered Container */}
          <div className="relative z-10 w-full max-w-[780px] mx-auto border-t border-border-subtle pt-4 flex items-center justify-between font-mono text-[12px] text-text-muted">
            <div className="flex items-center gap-5">
              <span>REGION: N.VIRGINIA</span>
              <span>LATENCY: 14MS</span>
              <span>REVISION: v4.2.8</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
              ENCRYPTED LINK ESTABLISHED
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
