"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Validation states
  const [hasLength, setHasLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

  // Interactive buttons / dispatch state
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  // Live timer on the match simulator
  const [seconds, setSeconds] = useState(8 * 60 + 39);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (s: number) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Password rules validation
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setHasLength(val.length >= 8);
    setHasUpper(/[A-Z]/.test(val));
    setHasNumber(/[0-9]/.test(val));
    setHasSymbol(/[^A-Za-z0-9]/.test(val));

    if (confirmPassword.length > 0) {
      setPasswordsMatch(val === confirmPassword);
    } else {
      setPasswordsMatch(null);
    }
  };

  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);
    if (val.length > 0) {
      setPasswordsMatch(val === password);
    } else {
      setPasswordsMatch(null);
    }
  };

  const handleGoogleAuth = () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setIsCreated(true);
    }, 1200);
  };

  const handleGithubAuth = () => {
    if (githubLoading) return;
    setGithubLoading(true);
    setTimeout(() => {
      setGithubLoading(false);
      setIsCreated(true);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed || !hasLength) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreated(true);
      setTimeout(() => {
        router.push(`/auth/verify?email=${encodeURIComponent(email || "nano@example.com")}`);
      }, 1200);
    }, 1100);
  };

  return (
    <main className="w-full min-h-screen bg-[#080A0B] text-text-primary flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      <div className="w-full min-h-screen bg-[#080A0B] flex flex-col lg:flex-row antialiased">
        {/* LEFT COLUMN: AUTHENTICATION INTERACTION (42-44% Desktop) */}
        <div className="w-full lg:w-[44%] xl:w-[42%] min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-border-subtle bg-[#080A0B] relative z-10">
          {/* Centered Form Wrapper */}
          <div className="w-full max-w-[460px] mx-auto my-auto flex flex-col justify-center">
            {/* Top Brand Anchor */}
            <div className="flex items-center justify-between pb-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border-subtle p-1.5 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-primary-fixed/50 transition-colors">
                  <img
                    alt="CodeClash Logo"
                    className="w-full h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1VsyDU9urjEIUMjFuyGaqU8kPhjpYg89_3_7uqiOx4ShogFelrT2SotEOAlF0pb80l-uZ-TcaBoDrfFgBwbKlcIonqFhxfkXYncchEWruDmb4nmlMAT-UDtQ70hC48BZYitdEdJmgE9CoOoRYgLbjgMrsPdbomY5AZc21nlRrcBMW_W854ELAjk1eheouYwLjwT0eAJSa9GCzkluM-OthEZ9K0tfrZSN4ktJSQVmgzssJuQNz6XCp1gHkQ"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-card-title text-[18px] tracking-tight font-bold text-text-primary group-hover:text-primary-fixed transition-colors">
                    CODECLASH
                  </span>
                  <span className="font-system-eyebrow text-[11px] text-text-muted px-2 py-0.5 rounded bg-surface-2 border border-border-subtle font-mono">
                    {"// SYS_AUTH"}
                  </span>
                </div>
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border-subtle font-system-eyebrow text-[11.5px] text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>
                CLUSTER_ONLINE
              </span>
            </div>

            {/* Heading Context */}
            <div className="flex flex-col gap-2 pt-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-primary-fixed"></span>
                <span className="font-system-eyebrow text-[11.5px] sm:text-[12px] uppercase text-primary-fixed tracking-widest font-semibold">
                  ARENA ACCESS // CREATE ACCOUNT
                </span>
              </div>
              <h1 className="font-section-heading text-[30px] sm:text-[34px] text-text-primary font-bold tracking-tight">
                Enter the competition.
              </h1>
              <p className="font-body-default text-[15px] sm:text-[16px] text-text-secondary">
                Create your CodeClash account and build your competitive developer identity.
              </p>
            </div>

            {/* OAuth Social Stack */}
            <div className="flex flex-col gap-3.5 mb-6">
              {/* Google Auth */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                className="w-full h-[52px] px-4 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle transition-all duration-150 flex items-center justify-center gap-3 text-text-primary font-medium text-body-default group active:scale-[0.99] cursor-pointer disabled:opacity-75"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="tracking-wide">
                  {googleLoading ? "CONNECTING TO GOOGLE..." : "CONTINUE WITH GOOGLE"}
                </span>
              </button>

              {/* GitHub Auth */}
              <button
                type="button"
                onClick={handleGithubAuth}
                disabled={githubLoading}
                className="w-full h-[52px] px-4 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle transition-all duration-150 flex items-center justify-center gap-3 text-text-primary font-medium text-body-default group active:scale-[0.99] cursor-pointer disabled:opacity-75"
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
                  {githubLoading ? "CONNECTING TO GITHUB..." : "CONTINUE WITH GITHUB"}
                </span>
              </button>
            </div>

            {/* Section Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-border-subtle"></div>
              <span className="absolute px-3 bg-[#080A0B] font-system-eyebrow text-[11.5px] text-text-muted uppercase tracking-wider font-mono">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            {/* Email Sign Up Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="font-system-eyebrow text-[11.5px] text-text-secondary tracking-wider uppercase font-semibold font-mono"
                  >
                    EMAIL
                  </label>
                  <span className="font-system-eyebrow text-[10.5px] text-text-muted font-mono">
                    VERIFIED RUNTIME
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-[52px] px-4 rounded-lg bg-surface-2 border border-border-subtle text-text-primary placeholder:text-text-muted font-body-default text-[15px] outline-none transition-colors duration-150 focus:border-primary-fixed focus:bg-surface-3"
                  style={{ backgroundColor: "#12161A", color: "#F3F5F2" }}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="font-system-eyebrow text-[11.5px] text-text-secondary tracking-wider uppercase font-semibold font-mono"
                  >
                    PASSWORD
                  </label>
                  <span className="font-system-eyebrow text-[10.5px] text-text-muted font-mono">
                    MIN. 8 CHARS
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-[52px] pl-4 pr-11 rounded-lg bg-surface-2 border border-border-subtle text-text-primary placeholder:text-text-muted font-mono text-[15px] outline-none transition-colors duration-150 focus:border-primary-fixed focus:bg-surface-3"
                    style={{ backgroundColor: "#12161A", color: "#F3F5F2" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer p-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="font-system-eyebrow text-[11.5px] text-text-secondary tracking-wider uppercase font-semibold font-mono"
                  >
                    CONFIRM PASSWORD
                  </label>
                  <span
                    className={`font-system-eyebrow text-[11px] font-mono font-semibold ${
                      passwordsMatch === true
                        ? "text-status-success"
                        : passwordsMatch === false
                        ? "text-status-failure"
                        : "text-text-muted"
                    }`}
                  >
                    {passwordsMatch === true
                      ? "PASSWORDS MATCH ✓"
                      : passwordsMatch === false
                      ? "MISMATCH"
                      : "MATCH ENFORCED"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-[52px] pl-4 pr-11 rounded-lg bg-surface-2 border border-border-subtle text-text-primary placeholder:text-text-muted font-mono text-[15px] outline-none transition-colors duration-150 focus:border-primary-fixed focus:bg-surface-3"
                    style={{ backgroundColor: "#12161A", color: "#F3F5F2" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label="Toggle confirm password visibility"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer p-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Real-time Password Strength Tags */}
              <div className="grid grid-cols-4 gap-2 pt-0.5">
                <div
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 border rounded text-[11.5px] font-system-eyebrow font-mono transition-colors ${
                    hasLength
                      ? "bg-status-success/10 text-status-success border-status-success/30"
                      : "bg-surface-2 border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {hasLength ? "check_box" : "check_box_outline_blank"}
                  </span>
                  <span>8+ chars</span>
                </div>
                <div
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 border rounded text-[11.5px] font-system-eyebrow font-mono transition-colors ${
                    hasUpper
                      ? "bg-status-success/10 text-status-success border-status-success/30"
                      : "bg-surface-2 border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {hasUpper ? "check_box" : "check_box_outline_blank"}
                  </span>
                  <span>uppercase</span>
                </div>
                <div
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 border rounded text-[11.5px] font-system-eyebrow font-mono transition-colors ${
                    hasNumber
                      ? "bg-status-success/10 text-status-success border-status-success/30"
                      : "bg-surface-2 border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {hasNumber ? "check_box" : "check_box_outline_blank"}
                  </span>
                  <span>number</span>
                </div>
                <div
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-1 border rounded text-[11.5px] font-system-eyebrow font-mono transition-colors ${
                    hasSymbol
                      ? "bg-status-success/10 text-status-success border-status-success/30"
                      : "bg-surface-2 border-border-subtle text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {hasSymbol ? "check_box" : "check_box_outline_blank"}
                  </span>
                  <span>symbol</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 pt-2 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  required
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded bg-surface-2 border-border-subtle text-primary-fixed focus:ring-0 cursor-pointer accent-[#E4FF3F]"
                />
                <span className="font-body-muted text-[13.5px] text-text-secondary leading-snug group-hover:text-text-primary transition-colors">
                  I agree to the{" "}
                  <a
                    className="text-text-primary underline decoration-border-subtle hover:decoration-primary-fixed"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-text-primary underline decoration-border-subtle hover:decoration-primary-fixed"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {/* Primary Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !termsAgreed}
                className={`w-full h-[52px] mt-2 rounded-lg font-bold text-[15px] font-body-default tracking-wide transition-all shadow-[0_0_18px_rgba(228,255,63,0.2)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  isCreated
                    ? "bg-status-success text-black"
                    : "bg-primary-fixed text-[#080A0B] hover:brightness-105 active:scale-[0.99]"
                }`}
              >
                <span>
                  {isSubmitting
                    ? "DISPATCHING TELEMETRY..."
                    : isCreated
                    ? "ACCOUNT CREATED"
                    : "CREATE ACCOUNT"}
                </span>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isSubmitting ? "animate-spin" : ""
                  }`}
                >
                  {isSubmitting ? "progress_activity" : isCreated ? "check" : "arrow_forward"}
                </span>
              </button>
            </form>

            {/* Notification Banner Container */}
            {isCreated && (
              <div className="mt-4 p-4 rounded-lg bg-surface-2 border border-border-subtle flex flex-col gap-2 transition-all animate-fadeIn">
                <div className="flex items-center gap-2 text-status-success font-system-eyebrow text-[12px] font-semibold font-mono">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>DISPATCH CONFIRMED</span>
                </div>
                <p className="font-body-muted text-[13px] text-text-secondary">
                  A verification telemetry handshake has been routed to your inbox. Check your mail to activate your handle.
                </p>
                <Link
                  href={`/auth/verify?email=${encodeURIComponent(email || "nano@example.com")}`}
                  className="mt-1 inline-flex items-center gap-1.5 font-mono text-[12px] text-primary-fixed hover:underline font-semibold"
                >
                  <span>PROCEED TO VERIFICATION HANDSHAKE</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            )}

            {/* Bottom Auth Navigation */}
            <div className="pt-8 mt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-body-muted">
              <span className="text-text-muted text-[13.5px]">
                Already registered on the arena?
              </span>
              <Link
                href="/auth/sign-in"
                className="font-system-eyebrow text-[12px] font-semibold tracking-wider text-primary-fixed hover:text-text-primary flex items-center gap-1 group transition-colors font-mono"
              >
                <span>SIGN IN</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-STAKES COMPETITIVE PRODUCT PREVIEW (56-58% Desktop) */}
        <div className="hidden lg:flex lg:w-[56%] xl:w-[58%] min-h-screen bg-surface-1 p-8 sm:p-10 xl:p-14 flex-col justify-between relative overflow-hidden select-none">
          {/* Architectural Subtle Grid Background Overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #F3F5F2 1px, transparent 1px), linear-gradient(to bottom, #F3F5F2 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          {/* Ambient Glow Behind Code Telemetry */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/5 blur-3xl pointer-events-none"></div>

          {/* Top Technical Context Meta - Centered Container */}
          <div className="relative z-10 w-full max-w-[800px] mx-auto flex items-center justify-between border-b border-border-subtle pb-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-2 border border-border-subtle font-system-eyebrow text-[11px] text-text-secondary font-mono">
                01
              </span>
              <span className="font-system-eyebrow text-[12px] tracking-wider text-text-secondary uppercase font-mono">
                ARENA ENGINE // SUB-MILLISECOND OBSERVABILITY
              </span>
            </div>
            <div className="flex items-center gap-4 font-system-eyebrow text-[12px] text-text-muted font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>{" "}
                120 FPS JUDGE
              </span>
              <span>US-EAST // AWS-GRAVITON</span>
            </div>
          </div>

          {/* Centerpiece: Live Match Arena Simulator Card - Placed in the Middle & Scaled */}
          <div className="relative z-10 w-full max-w-[800px] mx-auto my-auto py-6 flex flex-col gap-6">
            {/* Live Match Card Shell */}
            <div className="w-full bg-surface-1 border border-border-subtle rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Terminal / Match Bar Header */}
              <div className="px-6 py-4 bg-surface-2 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse"></span>
                  <span className="font-system-eyebrow text-[12px] text-text-primary tracking-wider font-semibold font-mono">
                    LIVE MATCH TELEMETRY // RANKED 1V1
                  </span>
                </div>
                <div className="flex items-center gap-3 font-system-eyebrow text-[11.5px] font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-surface-3 text-text-secondary border border-border-subtle">
                    MATCH ID: #8849-BRX
                  </span>
                  <span className="text-primary-fixed font-bold tracking-wider">
                    STANDARD BREACH • 15 MIN
                  </span>
                </div>
              </div>

              {/* Dual Combatants Duel Strip */}
              <div className="grid grid-cols-12 items-center p-6 sm:p-7 border-b border-border-subtle gap-4 bg-surface-1">
                {/* Player 1 (Nano) */}
                <div className="col-span-5 flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-surface-3 border border-border-subtle flex items-center justify-center font-mono text-[13px] font-bold text-primary-fixed shadow-inner">
                      N1
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-card-title text-[18px] font-bold text-text-primary tracking-tight">
                          NANO
                        </span>
                        <span className="font-system-eyebrow text-[11px] text-text-muted px-1.5 py-0.5 rounded bg-surface-2 border border-border-subtle font-mono">
                          1,248 ELO
                        </span>
                      </div>
                      <span className="font-system-eyebrow text-[12px] text-text-secondary font-mono">
                        Stack Hunter • Python 3.12
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1.5 text-[12.5px] font-mono">
                    <span className="text-status-success font-semibold">14ms latency</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-secondary">42 wpm input</span>
                  </div>
                </div>

                {/* Match Status & Timer Core */}
                <div className="col-span-2 flex flex-col items-center justify-center border-x border-border-subtle py-2 px-2 text-center">
                  <span className="font-system-eyebrow text-[11px] text-text-muted uppercase tracking-widest font-mono">
                    VS
                  </span>
                  <span className="font-mono text-[26px] sm:text-[30px] font-extrabold text-text-primary tracking-tighter my-0.5">
                    {formatTimer(seconds)}
                  </span>
                  <span className="font-system-eyebrow text-[11.5px] text-primary-fixed font-semibold tracking-wider font-mono">
                    12 / 15 PASSED
                  </span>
                </div>

                {/* Player 2 (Byteghost) */}
                <div className="col-span-5 flex flex-col items-end gap-1.5 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-system-eyebrow text-[11px] text-text-muted px-1.5 py-0.5 rounded bg-surface-2 border border-border-subtle font-mono">
                          1,273 ELO
                        </span>
                        <span className="font-card-title text-[18px] font-bold text-text-primary tracking-tight">
                          BYTEGHOST
                        </span>
                      </div>
                      <span className="font-system-eyebrow text-[12px] text-text-secondary font-mono">
                        Architect • Rust 1.76
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-surface-3 border border-border-subtle flex items-center justify-center font-mono text-[13px] font-bold text-secondary shadow-inner">
                      BG
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1.5 text-[12.5px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-surface-2 text-status-warning font-system-eyebrow text-[10.5px] tracking-wider animate-pulse font-semibold">
                      CODING...
                    </span>
                    <span className="text-text-secondary">18ms latency</span>
                  </div>
                </div>
              </div>

              {/* Problem Metadata Strip */}
              <div className="px-6 py-3.5 bg-surface-2 border-b border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-3 font-system-eyebrow text-[12.5px] font-mono">
                  <span className="text-text-muted uppercase tracking-wider">PROBLEM:</span>
                  <span className="text-text-primary font-bold">Graph Relay</span>
                  <span className="px-2 py-0.5 rounded bg-status-warning/10 text-status-warning border border-status-warning/20 text-[11px] font-semibold">
                    Medium
                  </span>
                  <span className="text-text-secondary hidden sm:inline">
                    Graphs / BFS / Shortest-Path
                  </span>
                </div>
                <div className="font-system-eyebrow text-[11.5px] text-text-muted font-mono">
                  TARGET CONSTRAINT: &lt; 120ms
                </div>
              </div>

              {/* Real-Time Code Telemetry Terminal Body */}
              <div className="p-6 bg-[#080A0B] font-code-snippet text-code-snippet text-text-secondary flex flex-col gap-3.5">
                <div className="flex items-center justify-between text-text-muted font-system-eyebrow text-[11.5px] border-b border-border-subtle pb-2.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-text-muted">
                      terminal
                    </span>
                    <span>TEST_SUITE_EXECUTION_STREAM (PASS 80%)</span>
                  </div>
                  <span className="text-text-primary font-mono text-[12.5px] font-semibold">
                    81ms / 18.2MB
                  </span>
                </div>

                {/* Code Execution Trace */}
                <div className="flex flex-col gap-2 font-mono text-[13.5px] leading-relaxed text-text-primary/90">
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-text-secondary">
                      <span className="text-status-success font-bold">✓</span> [TEST 01/15] CyclicNodeRouting
                    </span>
                    <span className="font-mono text-text-muted text-[12px]">
                      0.42ms <span className="text-status-success font-semibold">PASSED</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-text-secondary">
                      <span className="text-status-success font-bold">✓</span> [TEST 02/15] DisjointSubclusterBoundaries
                    </span>
                    <span className="font-mono text-text-muted text-[12px]">
                      1.18ms <span className="text-status-success font-semibold">PASSED</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-text-secondary">
                      <span className="text-status-success font-bold">✓</span> [TEST 03/15] NegativeWeightEdgeCase
                    </span>
                    <span className="font-mono text-text-muted text-[12px]">
                      0.89ms <span className="text-status-success font-semibold">PASSED</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-surface-2/70 px-3 py-1.5 rounded border-l-2 border-primary-fixed">
                    <span className="text-text-primary">
                      <span className="text-primary-fixed font-bold">❯</span> [TEST 13/15] StressTest_100k_Nodes (EXECUTING)
                    </span>
                    <span className="font-mono text-primary-fixed text-[12px] font-semibold animate-pulse">
                      RUNNING...
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="pt-2 flex flex-col gap-1.5">
                  <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-status-success h-full transition-all duration-300" style={{ width: "80%" }}></div>
                    <div className="bg-primary-fixed h-full animate-pulse" style={{ width: "7%" }}></div>
                  </div>
                  <div className="flex justify-between text-[11.5px] font-system-eyebrow text-text-muted pt-1 font-mono">
                    <span className="text-text-secondary">SUITE 13 IN FLIGHT</span>
                    <span className="text-text-secondary">MEM ALLOC: 18.2MB / 256MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Platform Feature Badges / Pillars - Centered Container */}
          <div className="relative z-10 w-full max-w-[800px] mx-auto pt-6 border-t border-border-subtle grid grid-cols-2 xl:grid-cols-4 gap-3.5">
            <div className="p-3.5 bg-surface-1 border border-border-subtle rounded-xl flex flex-col gap-1 hover:border-[#353E45] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-primary-fixed">bolt</span>
              <span className="font-system-eyebrow text-[11.5px] font-bold tracking-wider text-text-primary font-mono">
                REAL-TIME MATCHES
              </span>
              <span className="font-body-muted text-[12.5px] text-text-muted">
                Sub-30ms socket relay
              </span>
            </div>
            <div className="p-3.5 bg-surface-1 border border-border-subtle rounded-xl flex flex-col gap-1 hover:border-[#353E45] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-status-success">verified_user</span>
              <span className="font-system-eyebrow text-[11.5px] font-bold tracking-wider text-text-primary font-mono">
                DETERMINISTIC JUDGING
              </span>
              <span className="font-body-muted text-[12.5px] text-text-muted">
                Isolated Firecracker VM
              </span>
            </div>
            <div className="p-3.5 bg-surface-1 border border-border-subtle rounded-xl flex flex-col gap-1 hover:border-[#353E45] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-secondary">military_tech</span>
              <span className="font-system-eyebrow text-[11.5px] font-bold tracking-wider text-text-primary font-mono">
                ELO RANKED
              </span>
              <span className="font-body-muted text-[12.5px] text-text-muted">
                Global competitive ladder
              </span>
            </div>
            <div className="p-3.5 bg-surface-1 border border-border-subtle rounded-xl flex flex-col gap-1 hover:border-[#353E45] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-text-primary">code</span>
              <span className="font-system-eyebrow text-[11.5px] font-bold tracking-wider text-text-primary font-mono">
                MULTI-LANGUAGE RUNTIMES
              </span>
              <span className="font-body-muted text-[12.5px] text-text-muted">
                C++, Rust, Go, Python, TS
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
