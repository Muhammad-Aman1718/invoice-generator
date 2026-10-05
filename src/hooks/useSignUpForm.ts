"use client";
import { createClient } from "@/src/lib/supabase/client";
import { showToast } from "@/src/utils/showToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { buildCallbackUrl, safeNextPath } from "./useLogin";

const useSignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      showToast.warning("Password too short", "Use at least 8 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      showToast.warning("Check passwords", "Passwords must be identical.");
      return;
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms and Privacy Policy");
      showToast.warning("One more step", "Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const { error, data } = await createClient().auth.signUp({
        email,
        password,
        options: { emailRedirectTo: buildCallbackUrl(searchParams) },
      });
      if (error) throw error;

      // Supabase returns a user with no identities when the email is already registered.
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        showToast.info("Account already exists", "Please sign in with your existing account.");
        router.push(`/auth/login${queryString ? `?${queryString}` : ""}`);
        return;
      }

      if (data.user && !data.session) {
        showToast.success("Check your inbox!", "We've sent you a verification link.");
        router.push("/auth/sign-up-success");
        return;
      }

      showToast.success("Account created!");
      router.replace(safeNextPath(searchParams.get("next")));
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
      showToast.error("Sign-up error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const { error } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: buildCallbackUrl(searchParams) },
    });
    if (error) showToast.error("Sign-up failed", error.message);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    acceptedTerms,
    setAcceptedTerms,
    error,
    isLoading,
    handleSignUp,
    handleOAuth,
    passwordsMatch: repeatPassword.length > 0 && password === repeatPassword,
    passwordsMismatch: repeatPassword.length > 0 && password !== repeatPassword,
    queryString,
  };
};

export default useSignUpForm;
