// "use client";

// import Link from "next/link";
// import { createClient } from "@/lib/supabase/client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { showToast } from "@/utils/showToast";
// import { Eye, EyeOff, FileText } from "lucide-react";
// import useSignUpForm from "@/hooks/useSignUpForm";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// const INPUT =
//   "w-full h-11 px-4 rounded-xl border text-sm outline-none transition-all bg-white " +
//   "border-[#191970]/15 text-[#191970] font-medium placeholder:text-[#191970]/30 " +
//   "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

// export function SignUpForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     repeatPassword,
//     setRepeatPassword,
//     showPass,
//     setShowPass,
//     showRepeat,
//     setShowRepeat,
//     error,
//     setError,
//     isLoading,
//     setIsLoading,
//     handleSignUp,
//     handleOAuth,
//     passwordsMatch,
//     passwordsMismatch,
//     queryString,
//   } = useSignUpForm();
//   return (
//     <div
//       className={cn("w-full rounded-2xl border overflow-hidden", className)}
//       style={{
//         background: "#ffffff",
//         borderColor: "rgba(25,25,112,0.08)",
//         boxShadow: "0 8px 40px rgba(25,25,112,0.1)",
//       }}
//       {...props}
//     >
//       {/* Amber top bar */}
//       <div className="h-1 w-full" style={{ background: "#FFC107" }} />

//       <div className="p-7 sm:p-8 flex flex-col gap-5">
//         {/* ── Heading ── */}
//         <div className="text-center space-y-1">
//           {/* Logo mark */}
//           <div
//             className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
//             style={{ background: "#191970" }}
//           >
//             <FileText size={18} style={{ color: "#FFC107" }} />
//           </div>
//           <h1
//             className="text-2xl font-black tracking-tight"
//             style={{ color: "#191970" }}
//           >
//             Create account
//           </h1>
//           <p className="text-sm" style={{ color: "rgba(25,25,112,0.5)" }}>
//             Start creating invoices for free
//           </p>
//         </div>

//         {/* ── OAuth Buttons ── */}
//         <div className="grid gap-2.5">
//           {/* Google */}
//           <button
//             type="button"
//             onClick={() => handleOAuth("google")}
//             className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold transition-all"
//             style={{
//               background: "#ECEFF1",
//               borderColor: "rgba(25,25,112,0.1)",
//               color: "#191970",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#e4e8ed";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#ECEFF1";
//             }}
//           >
//             <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>

//           {/* GitHub */}
//           <button
//             type="button"
//             onClick={() => handleOAuth("github")}
//             className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold transition-all"
//             style={{
//               background: "#ECEFF1",
//               borderColor: "rgba(25,25,112,0.1)",
//               color: "#191970",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#e4e8ed";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#ECEFF1";
//             }}
//           >
//             <svg
//               className="h-4 w-4 shrink-0"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//             </svg>
//             Continue with GitHub
//           </button>
//         </div>

//         {/* ── Divider ── */}
//         <div className="relative flex items-center gap-3">
//           <div
//             className="flex-1 border-t"
//             style={{ borderColor: "rgba(25,25,112,0.08)" }}
//           />
//           <span
//             className="text-[10px] font-black uppercase tracking-widest flex-shrink-0"
//             style={{ color: "rgba(25,25,112,0.35)" }}
//           >
//             or email
//           </span>
//           <div
//             className="flex-1 border-t"
//             style={{ borderColor: "rgba(25,25,112,0.08)" }}
//           />
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSignUp} className="space-y-4">
//           {/* Email */}
//           <div className="space-y-1.5">
//             <label
//               htmlFor="email"
//               className="block text-[10px] font-black uppercase tracking-widest"
//               style={{ color: "rgba(25,25,112,0.45)" }}
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={INPUT}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-1.5">
//             <label
//               htmlFor="password"
//               className="block text-[10px] font-black uppercase tracking-widest"
//               style={{ color: "rgba(25,25,112,0.45)" }}
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPass ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={INPUT + " pr-11"}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPass(!showPass)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
//                 style={{ color: "rgba(25,25,112,0.35)" }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.color = "#FFC107";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.color = "rgba(25,25,112,0.35)";
//                 }}
//               >
//                 {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
//               </button>
//             </div>
//           </div>

//           {/* Repeat Password */}
//           <div className="space-y-1.5">
//             <label
//               htmlFor="repeat-password"
//               className="block text-[10px] font-black uppercase tracking-widest"
//               style={{ color: "rgba(25,25,112,0.45)" }}
//             >
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 id="repeat-password"
//                 type={showRepeat ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={repeatPassword}
//                 onChange={(e) => setRepeatPassword(e.target.value)}
//                 className={
//                   INPUT +
//                   " pr-11 " +
//                   (passwordsMatch
//                     ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-100"
//                     : passwordsMismatch
//                       ? "border-red-400 focus:border-red-400 focus:ring-red-100"
//                       : "")
//                 }
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowRepeat(!showRepeat)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
//                 style={{ color: "rgba(25,25,112,0.35)" }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.color = "#FFC107";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.color = "rgba(25,25,112,0.35)";
//                 }}
//               >
//                 {showRepeat ? <EyeOff size={15} /> : <Eye size={15} />}
//               </button>
//             </div>
//             {passwordsMatch && (
//               <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
//                 <span>✓</span> Passwords match
//               </p>
//             )}
//             {passwordsMismatch && (
//               <p className="text-[11px] font-bold text-red-500 flex items-center gap-1">
//                 <span>✗</span> Passwords do not match
//               </p>
//             )}
//           </div>

//           {/* Error */}
//           {error && (
//             <div
//               className="text-xs px-3 py-2.5 rounded-xl border flex items-center gap-2"
//               style={{
//                 color: "#DC2626",
//                 background: "#FEF2F2",
//                 borderColor: "rgba(220,38,38,0.15)",
//               }}
//             >
//               <span className="font-black">!</span>
//               {error}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full h-11 rounded-xl text-sm font-black transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//             style={{
//               background: "#191970",
//               color: "#ffffff",
//               boxShadow: "0 4px 14px rgba(25,25,112,0.2)",
//             }}
//             onMouseEnter={(e) => {
//               if (!isLoading) {
//                 e.currentTarget.style.background = "#FFC107";
//                 e.currentTarget.style.color = "#191970";
//                 e.currentTarget.style.boxShadow =
//                   "0 4px 14px rgba(255,193,7,0.3)";
//               }
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#191970";
//               e.currentTarget.style.color = "#ffffff";
//               e.currentTarget.style.boxShadow =
//                 "0 4px 14px rgba(25,25,112,0.2)";
//             }}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg
//                   className="animate-spin h-4 w-4"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                   />
//                 </svg>
//                 Creating account...
//               </span>
//             ) : (
//               "Create account"
//             )}
//           </button>
//         </form>

//         {/* ── Footer ── */}
//         <p
//           className="text-center text-xs border-t pt-4"
//           style={{
//             color: "rgba(25,25,112,0.45)",
//             borderColor: "rgba(25,25,112,0.07)",
//           }}
//         >
//           Already have an account?{" "}
//           <Link
//             href={`/auth/login${queryString ? `?${queryString}` : ""}`}
//             className="font-black hover:underline"
//             style={{ color: "#191970" }}
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }











"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { showToast } from "@/utils/showToast";
import { Eye, EyeOff, FileText } from "lucide-react";
import useSignUpForm from "@/hooks/useSignUpForm";

// ─────────────────────────────────────────────
//  COLOR THEME (Optimized for Contrast)
// ─────────────────────────────────────────────

const INPUT =
  "w-full h-12 px-4 rounded-xl border text-sm outline-none transition-all bg-white " +
  "border-[#191970]/20 text-[#191970] font-medium placeholder:text-[#191970]/50 " +
  "focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    showPass,
    setShowPass,
    showRepeat,
    setShowRepeat,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleSignUp,
    handleOAuth,
    passwordsMatch,
    passwordsMismatch,
    queryString,
  } = useSignUpForm();

  return (
    <main
      className={cn("w-full rounded-2xl border overflow-hidden", className)}
      style={{
        background: "#ffffff",
        borderColor: "rgba(25,25,112,0.12)", // Contrast increased
        boxShadow: "0 8px 40px rgba(25,25,112,0.1)",
      }}
      {...props}
    >
      {/* Amber top bar */}
      <div className="h-1.5 w-full" style={{ background: "#FF9800" }} /> {/* Darker Amber for contrast */}

      <div className="p-7 sm:p-8 flex flex-col gap-6">
        {/* ── Heading ── */}
        <div className="text-center space-y-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "#191970" }}
            aria-hidden="true"
          >
            <FileText size={22} style={{ color: "#FFC107" }} />
          </div>
          <h1
            className="text-2xl font-black tracking-tight"
            style={{ color: "#191970" }}
          >
            Create account
          </h1>
          <p className="text-sm font-medium" style={{ color: "#455A64" }}> {/* Improved contrast */}
            Start creating invoices for free
          </p>
        </div>

        {/* ── OAuth Buttons ── */}
        <div className="grid gap-3">
          <button
            type="button"
            aria-label="Continue with Google"
            onClick={() => handleOAuth("google")}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border text-sm font-bold transition-all"
            style={{
              background: "#F5F7F9",
              borderColor: "rgba(25,25,112,0.15)",
              color: "#191970",
            }}
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            aria-label="Continue with GitHub"
            onClick={() => handleOAuth("github")}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border text-sm font-bold transition-all"
            style={{
              background: "#F5F7F9",
              borderColor: "rgba(25,25,112,0.15)",
              color: "#191970",
            }}
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="relative flex items-center gap-3 py-2">
          <div className="flex-1 border-t border-[#191970]/10" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#191970]/80">
            or email
          </span>
          <div className="flex-1 border-t border-[#191970]/10" />
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[11px] font-black uppercase tracking-widest text-[#191970]/70"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[11px] font-black uppercase tracking-widest text-[#191970]/70"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(INPUT, "pr-12")}
                required
              />
              <button
                type="button"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 top-0 h-full px-4 flex items-center text-[#191970]/40 hover:text-[#FFC107] transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Repeat Password */}
          <div className="space-y-2">
            <label
              htmlFor="repeat-password"
              className="block text-[11px] font-black uppercase tracking-widest text-[#191970]/70"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="repeat-password"
                name="repeat-password"
                type={showRepeat ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-label="Confirm Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className={cn(
                  INPUT,
                  "pr-12",
                  passwordsMatch && "border-emerald-500 focus:ring-emerald-500/20",
                  passwordsMismatch && "border-red-500 focus:ring-red-500/20"
                )}
                required
              />
              <button
                type="button"
                aria-label={showRepeat ? "Hide confirm password" : "Show confirm password"}
                onClick={() => setShowRepeat(!showRepeat)}
                className="absolute right-0 top-0 h-full px-4 flex items-center text-[#191970]/40 hover:text-[#FFC107] transition-colors"
              >
                {showRepeat ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordsMatch && (
              <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1" role="alert">
                <span>✓</span> Passwords match
              </p>
            )}
            {passwordsMismatch && (
              <p className="text-[11px] font-bold text-red-600 flex items-center gap-1" role="alert">
                <span>✗</span> Passwords do not match
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="text-xs font-bold px-4 py-3 rounded-xl border flex items-center gap-2"
              style={{
                color: "#B91C1C",
                background: "#FEF2F2",
                borderColor: "rgba(185,28,28,0.2)",
              }}
            >
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full h-12 rounded-xl text-sm font-black transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            style={{
              background: "#191970",
              color: "#ffffff",
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* ── Footer ── */}
        <p className="text-center text-xs font-medium border-t pt-5 border-[#191970]/5 text-[#191970]/60">
          Already have an account?{" "}
          <Link
            href={`/auth/login${queryString ? `?${queryString}` : ""}`}
            className="font-black text-[#191970] hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}