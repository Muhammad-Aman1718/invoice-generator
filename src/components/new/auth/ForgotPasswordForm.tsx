"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import useForgotPasswordForm from "@/src/hooks/useForgotPasswordForm";
import AuthInput from "@/src/components/new/auth/AuthInput";
import AuthButton from "@/src/components/new/auth/AuthButton";
import AuthHeader from "@/src/components/new/auth/AuthHeader";
import AuthRedirect from "@/src/components/new/auth/AuthRedirect";
import FormContainer from "@/src/components/new/auth/FormContainer";
import Loader from "../Loader";

export function ForgotPasswordForm() {
  const { email, setEmail, success, isLoading, handleForgotPassword } =
    useForgotPasswordForm();

  if (success) {
    return (
      <FormContainer>
        <div className="p-2 text-center">
          {/* Success Animated Circle Graphic */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-[#FFC107]/10">
            <CheckCircle2 size={32} className="text-[#FFC107]" />
          </div>

          <h2 className="text-xl font-black mb-2 text-[#191970]">
            Check your inbox
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-slate-500">
            Password reset instructions have been sent to{" "}
            <span className="font-bold text-[#191970]">{email}</span>. Check
            your spam folder if you don&apos;t see it.
          </p>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all bg-[#191970] text-white hover:bg-[#191970]/90"
          >
            Back to Login
            <ArrowRight size={14} />
          </Link>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <AuthHeader
        title="Reset Password"
        discription="Enter your email and we'll send you a reset link"
      />

      <form onSubmit={handleForgotPassword} className="space-y-4">
        {/* Reusable AuthInput component binding matching theme */}
        <AuthInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Action Button carrying custom Loader */}
        <AuthButton
          title={
            isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader className="w-5 h-5 border-2 border-white" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                Send reset link
                <ArrowRight size={15} />
              </span>
            )
          }
        />
      </form>

      {/* Redirect Footer Module */}
      <AuthRedirect
        text="Remember your password?"
        linkText="Sign in"
        href="/auth/login"
      />
    </FormContainer>
  );
}

export default ForgotPasswordForm;
