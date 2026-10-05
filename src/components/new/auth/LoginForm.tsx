"use client";

import React from "react";
import AuthInput from "./AuthInput";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import AuthRedirect from "./AuthRedirect";
import useLogin from "@/src/hooks/useLogin";
import FormContainer from "./FormContainer";
import SocialOAuthButton from "./SocialOAuthButton";
import Loader from "./Loader";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    handleOAuth,
    queryString,
    verified,
  } = useLogin();

  return (
    <FormContainer>
      <AuthHeader
        title="Welcome back"
        discription="Sign in to manage your invoices"
      />
      {verified && (
        <p className="rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-800">
          Email verified — sign in to continue.
        </p>
      )}
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
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          forgotLink="/auth/forgot-password"
          isPassword
          label="Password"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton
          isLoading={isLoading}
          title={
            isLoading ? (
              <Loader className="w-6 h-6 border-2 border-white " />
            ) : (
              "Sign In"
            )
          }
        />
      </form>

      <AuthRedirect
        text="New to our platform?"
        linkText="Create account"
        href={`/auth/sign-up${queryString ? `?${queryString}` : ""}`}
      />
    </FormContainer>
  );
};

export default LoginForm;
