"use client";

import FormContainer from "./FormContainer";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import AuthRedirect from "./AuthRedirect";
import SocialLoginButtons from "./SocialLoginButtons";
import useLogin from "@/src/hooks/useLogin";
import { ROUTES } from "@/src/constant/routes";

export default function LoginForm() {
  const { email, setEmail, password, setPassword, isLoading, handleLogin, queryString, isVerified } =
    useLogin();

  return (
    <FormContainer>
      <AuthHeader title="Welcome back" description="Sign in to manage your invoices" />
      {isVerified && (
        <p className="rounded-xl bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-800">
          Email verified — sign in to continue.
        </p>
      )}
      <SocialLoginButtons />
      <AuthDivider text="Or email" />
      <form onSubmit={handleLogin} className="space-y-4">
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
        <AuthInput
          label="Password"
          id="password"
          isPassword
          forgotLink={ROUTES.forgotPassword}
          autoComplete="current-password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthButton isLoading={isLoading} label="Sign In" />
      </form>
      <AuthRedirect
        text="New to our platform?"
        linkText="Create account"
        href={`${ROUTES.signUp}${queryString ? `?${queryString}` : ""}`}
      />
    </FormContainer>
  );
}
