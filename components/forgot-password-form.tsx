// "use client";

// import { cn } from "@/lib/utils";
// import { createClient } from "@/lib/supabase/client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { useState } from "react";

// export function ForgotPasswordForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"div">) {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const supabase = createClient();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/auth/update-password`,
//       });
//       if (error) throw error;
//       setSuccess(true);
//     } catch (error: unknown) {
//       setError(error instanceof Error ? error.message : "An error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       {success ? (
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl">Check Your Email</CardTitle>
//             <CardDescription>Password reset instructions sent</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               If you registered using your email and password, you will receive
//               a password reset email.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl">Reset Your Password</CardTitle>
//             <CardDescription>
//               Type in your email and we&apos;ll send you a link to reset your
//               password
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleForgotPassword}>
//               <div className="flex flex-col gap-6">
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="m@example.com"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 {error && <p className="text-sm text-red-500">{error}</p>}
//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Sending..." : "Send reset email"}
//                 </Button>
//               </div>
//               <div className="mt-4 text-center text-sm">
//                 Already have an account?{" "}
//                 <Link
//                   href="/auth/login"
//                   className="underline underline-offset-4"
//                 >
//                   Login
//                 </Link>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }






"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────
//  COLOR THEME  (60 · 30 · 10)
//  60% → #ECEFF1  background
//  30% → #191970  midnight blue
//  10% → #FFC107  amber accent
// ─────────────────────────────────────────────

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className={cn("w-full rounded-2xl overflow-hidden", className)}
        style={{
          background: "#fff",
          border: "1px solid rgba(25,25,112,0.08)",
          boxShadow: "0 8px 32px rgba(25,25,112,0.08)",
        }}
        {...props}
      >
        {/* Top stripe */}
        <div className="h-1 w-full" style={{ background: "#FFC107" }} />

        <div className="p-8 text-center">
          {/* Success icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(255,193,7,0.12)" }}
          >
            <CheckCircle2 size={32} style={{ color: "#FFC107" }} />
          </div>

          <h2 className="text-xl font-black mb-2" style={{ color: "#191970" }}>
            Check your inbox
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(25,25,112,0.55)" }}>
            Password reset instructions have been sent to{" "}
            <span className="font-bold" style={{ color: "#191970" }}>{email}</span>.
            Check your spam folder if you don't see it.
          </p>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: "#191970", color: "#fff" }}
          >
            Back to Login
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full rounded-2xl overflow-hidden", className)}
      style={{
        background: "#fff",
        border: "1px solid rgba(25,25,112,0.08)",
        boxShadow: "0 8px 32px rgba(25,25,112,0.08)",
      }}
      {...props}
    >
      {/* Top amber stripe */}
      <div className="h-1 w-full" style={{ background: "#FFC107" }} />

      {/* Header */}
      <div className="px-8 pt-8 pb-6" style={{ background: "#191970" }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(255,193,7,0.15)" }}
        >
          <Mail size={18} style={{ color: "#FFC107" }} />
        </div>
        <h2 className="text-xl font-black text-white mb-1">Reset Password</h2>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {/* Form body */}
      <div className="p-8">
        <form onSubmit={handleForgotPassword} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: "rgba(25,25,112,0.5)" }}
            >
              Email Address
            </label>
            <div className="relative">
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "rgba(25,25,112,0.3)" }}
              >
                <Mail size={15} />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all border"
                style={{
                  background: "#ECEFF1",
                  borderColor: "rgba(25,25,112,0.1)",
                  color: "#191970",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#FFC107";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,193,7,0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(25,25,112,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#EF4444",
              }}
            >
              <AlertCircle size={13} />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "#FFC107",
              color: "#191970",
              boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.background = "#FFD54F";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FFC107";
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p
          className="mt-5 text-center text-xs"
          style={{ color: "rgba(25,25,112,0.45)" }}
        >
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-black transition-colors"
            style={{ color: "#191970" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#FFC107"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#191970"; }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}