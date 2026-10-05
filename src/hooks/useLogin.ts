"use client";
import { createClient } from "@/src/lib/supabase/client";
import { showToast } from "@/src/utils/showToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function safeNextPath(value: string | null, fallback = "/dashboard") {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

/** Callback URL that returns the user to `next` (and `action`) after OAuth/email links. */
export function buildCallbackUrl(searchParams: URLSearchParams) {
  const params = new URLSearchParams({ next: safeNextPath(searchParams.get("next")) });
  const action = searchParams.get("action");
  if (action) params.set("action", action);
  return `${window.location.origin}/auth/callback?${params}`;
}

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error, data } = await createClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) {
        showToast.success("Welcome back!", "Redirecting you now…");
        const target = new URL(safeNextPath(searchParams.get("next")), window.location.origin);
        const action = searchParams.get("action");
        if (action) target.searchParams.set("action", action);
        router.replace(target.pathname + target.search);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
      showToast.error("Sign-in failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const { error } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: buildCallbackUrl(searchParams) },
    });
    if (error) showToast.error("Sign-in failed", error.message);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
    handleOAuth,
    queryString,
    verified: searchParams.get("verified") === "true",
  };
};

export default useLogin;
