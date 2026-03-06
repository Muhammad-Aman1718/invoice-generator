import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/utils/showToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.session) {
        showToast.success("Welcome back!", "Redirecting you now...");
        const nextPath = searchParams.get("next") || "/dashboard";
        const action = searchParams.get("action");
        const finalUrl = action ? `${nextPath}?action=${action}` : nextPath;
        router.refresh();
        setTimeout(() => router.push(finalUrl), 100);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
      showToast.error("Login Failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    showPass,
    setShowPass,
    error,
    isLoading,
    handleLogin,
    handleOAuth,
    queryString,
  };
};

export default useLoginForm;
