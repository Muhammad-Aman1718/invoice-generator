"use client";
import React from "react";
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
        {/* Email Field with standard required flags */}
        <AuthInput
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Primary Password Input validation tracker hook layer */}
        <AuthInput
          isPassword
          label="Password"
          id="password"
          placeholder="••••••••"
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

        <AuthButton
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
