"use client";
import React from "react";
import Link from "next/link";
import useSignUpForm from "@/src/hooks/useSignUpForm";
import AuthInput from "@/src/components/new/auth/AuthInput";
import AuthButton from "@/src/components/new/auth/AuthButton";
import AuthHeader from "@/src/components/new/auth/AuthHeader";
import AuthDivider from "@/src/components/new/auth/AuthDivider";
import AuthRedirect from "@/src/components/new/auth/AuthRedirect";
import FormContainer from "@/src/components/new/auth/FormContainer";
import SocialOAuthButton from "@/src/components/new/auth/SocialOAuthButton";
import Loader from "../new/auth/Loader";

const SignUpForm: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    isLoading,
    handleSignUp,
    handleOAuth,
    passwordsMatch,
    passwordsMismatch,
    acceptedTerms,
    setAcceptedTerms,
    queryString,
  } = useSignUpForm();

  return (
    <FormContainer>
      <AuthHeader
        title="Create Account"
        discription="Sign up to manage your invoices"
      />

      <div className="grid gap-3" aria-label="Social Login">
        <SocialOAuthButton
          title="Continue with Google"
          provider="google"
          onClick={() => handleOAuth("google")}
        />
        <SocialOAuthButton
          title="Continue with GitHub"
          provider="github"
          onClick={() => handleOAuth("github")}
        />
      </div>

      <AuthDivider text="OR EMAIL" />

      <form onSubmit={handleSignUp} className="space-y-4">
        <AuthInput
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          isPassword
          label="Password"
          id="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
          required
        />

        <AuthInput
          isPassword
          label="Confirm Password"
          id="confirm-password"
          placeholder="••••••••"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          hasError={passwordsMismatch}
          isValidMatch={passwordsMatch}
          required
        />

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-navy-500">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#191970]"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            required
          />
          <span>
            I agree to the{" "}
            <Link href="/terms-of-service" target="_blank" className="font-bold text-navy underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" target="_blank" className="font-bold text-navy underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <AuthButton
          isLoading={isLoading}
          title={
            isLoading ? (
              <Loader className="w-6 h-6 border-2 border-white " />
            ) : (
              "Create Account"
            )
          }
        />
      </form>

      <AuthRedirect
        text="Already have an account?"
        linkText="Sign in"
        href={`/auth/login${queryString ? `?${queryString}` : ""}`}
      />
    </FormContainer>
  );
};

export default SignUpForm;
