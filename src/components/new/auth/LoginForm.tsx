"use client";

import React from "react";
import Loader from "../Loader";
import AuthInput from "./AuthInput";
import AuthHeader from "./AuthHeader";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import AuthRedirect from "./AuthRedirect";
import useLogin from "@/src/hooks/useLogin";
import FormContainer from "./FormContainer";
import SocialOAuthButton from "./SocialOAuthButton";

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
  } = useLogin();

  return (
    <FormContainer>
      <AuthHeader
        title="Welcome back"
        discription="Sign in to manage your invoices"
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
      <form onSubmit={handleLogin} className="space-y-4">
        <AuthInput
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          forgotLink="/auth/forget-password"
          isPassword
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton
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
        // href={`/auth/sign-up`}
      />
    </FormContainer>
  );
};

export default LoginForm;
