"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import FormContainer from "./FormContainer";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthRedirect from "./AuthRedirect";
import usePasswordReset from "@/src/hooks/usePasswordReset";
import { ROUTES } from "@/src/constant/routes";

export default function ForgotPasswordForm() {
  const { email, setEmail, isSent, isLoading, handleSubmit } = usePasswordReset();

  if (isSent) {
    return (
      <FormContainer>
        <div className="space-y-4 text-center">
          <CheckCircle2 size={40} className="mx-auto text-gold-dark" />
          <h1 className="text-xl font-black text-navy">Check your inbox</h1>
          <p className="text-sm leading-relaxed text-navy-500">
            Reset instructions were sent to <strong className="text-navy">{email}</strong>. Check your spam
            folder if you don&apos;t see it.
          </p>
          <Link href={ROUTES.login} className="btn-navy">
            <ArrowLeft size={15} /> Back to sign in
          </Link>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <AuthHeader
        title="Reset your password"
        description="Enter your email and we'll send you a reset link."
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <AuthButton isLoading={isLoading} label="Send reset link" />
      </form>
      <AuthRedirect text="Remembered it?" linkText="Sign in" href={ROUTES.login} />
    </FormContainer>
  );
}
