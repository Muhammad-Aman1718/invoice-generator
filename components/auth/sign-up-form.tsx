"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { showToast } from "@/utils/showToast";

// ─────────────────────────────────────────────
//  COLOR THEME — Corporate Navy  (60 · 30 · 10)
//  60% → #F5F7FA  page background
//  30% → #1B2A4A  navy — headings, labels, borders
//  10% → #3A7BD5  accent — buttons, links, focus rings
// ─────────────────────────────────────────────

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      showToast.warning("Check Passwords", "Passwords must be identical.");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const nextPath = searchParams.get("next") || "/dashboard";
      const action = searchParams.get("action");

      // Callback URL setup
      const params = new URLSearchParams();
      params.set("next", nextPath);
      if (action) params.set("action", action);
      const callbackUrl = `${window.location.origin}/auth/callback?${params.toString()}`;

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: callbackUrl },
      });

      if (error) throw error;

      // CASE: Email Confirmation ON hai
      if (data.user && !data.session) {
        showToast.success(
          "Check your inbox!",
          "We've sent a verification link to your email.",
        );
        router.push("/auth/sign-up-success");
        return;
      }

      // CASE: Auto-confirm ON hai (Immediate Login)
      showToast.success("Account created successfully!");
      router.refresh();
      router.push(nextPath);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An error occurred during sign up";
      setError(msg);
      showToast.error("Sign Up Error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  // ── Shared input style ────────────────────────────────────────────────────
  const inputCls =
    "w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all bg-white " +
    "border-[#1B2A4A]/20 text-[#1B2A4A] placeholder:text-[#1B2A4A]/30 " +
    "focus:border-[#3A7BD5] focus:ring-2 focus:ring-[#3A7BD5]/15";

  return (
    // 60% background card
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-sm mx-auto p-8 rounded-2xl shadow-lg border",
        className,
      )}
      style={{ background: "#F5F7FA", borderColor: "#1B2A4A10" }}
      {...props}
    >
      {/* ── Heading ── */}
      <div className="text-center space-y-1">
        {/* 10% accent stripe */}
        <div
          className="w-10 h-[3px] rounded-full mx-auto mb-3"
          style={{ background: "#3A7BD5" }}
        />
        <h1
          className="text-2xl font-black tracking-tight"
          style={{ color: "#1B2A4A" }}
        >
          Create an account
        </h1>
        <p className="text-sm" style={{ color: "#1B2A4A60" }}>
          Get started with your free account
        </p>
      </div>

      {/* ── OAuth Buttons ── */}
      <div className="grid gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border text-sm font-medium transition-all bg-white hover:bg-[#F5F7FA]"
          style={{ borderColor: "#1B2A4A20", color: "#1B2A4A" }}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleOAuth("github")}
          className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border text-sm font-medium transition-all bg-white hover:bg-[#F5F7FA]"
          style={{ borderColor: "#1B2A4A20", color: "#1B2A4A" }}
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span
            className="w-full border-t"
            style={{ borderColor: "#1B2A4A15" }}
          />
        </div>
        <div className="relative flex justify-center">
          <span
            className="px-3 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "#F5F7FA", color: "#1B2A4A50" }}
          >
            Or continue with
          </span>
        </div>
      </div>

      {/* ── Sign Up Form ── */}
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "#1B2A4A70" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "#1B2A4A70" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
            required
          />
        </div>

        {/* Repeat Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="repeat-password"
            className="block text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "#1B2A4A70" }}
          >
            Repeat Password
          </label>
          <input
            id="repeat-password"
            type="password"
            placeholder="••••••••"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={inputCls}
            required
          />
          {/* Password match indicator */}
          {repeatPassword.length > 0 && (
            <p
              className="text-[11px] font-medium mt-1"
              style={{
                color: password === repeatPassword ? "#16a34a" : "#DC2626",
              }}
            >
              {password === repeatPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <p
            className="text-xs px-3 py-2 rounded-lg border"
            style={{
              color: "#DC2626",
              background: "#FEF2F2",
              borderColor: "#FCA5A520",
            }}
          >
            {error}
          </p>
        )}

        {/* Submit — 10% accent filled */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          style={{ background: "#3A7BD5" }}
          onMouseEnter={(e) => {
            if (!isLoading)
              (e.currentTarget as HTMLButtonElement).style.background =
                "#2C62B0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#3A7BD5";
          }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Creating account...
            </span>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      {/* ── Footer link ── */}
      <p className="text-center text-xs" style={{ color: "#1B2A4A60" }}>
        Already have an account?{" "}
        <Link
          href={`/auth/login${queryString ? `?${queryString}` : ""}`}
          className="font-bold transition-all hover:underline"
          style={{ color: "#3A7BD5" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
