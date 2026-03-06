import { createClient } from "@/lib/supabase/client";
import { showToast } from "@/utils/showToast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const useSignUpForm = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
  
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== repeatPassword) {
        setError("Passwords do not match");
        showToast.warning("Check Passwords", "Passwords must be identical.");
        return;
      }
      const supabase = createClient();
      setIsLoading(true);
      try {
        const nextPath = searchParams.get("next") || "/dashboard";
        const action = searchParams.get("action");
        const params = new URLSearchParams();
        params.set("next", nextPath);
        if (action) params.set("action", action);
        const callbackUrl = `${window.location.origin}/auth/callback?${params.toString()}`;
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: callbackUrl },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          showToast.success(
            "Check your inbox!",
            "We've sent a verification link.",
          );
          router.push("/auth/sign-up-success");
          return;
        }
        showToast.success("Account created successfully!");
        router.refresh();
        router.push(nextPath);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "An error occurred";
        setError(msg);
        showToast.error("Sign Up Error", msg);
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
  
    const passwordsMatch =
      repeatPassword.length > 0 && password === repeatPassword;
    const passwordsMismatch =
      repeatPassword.length > 0 && password !== repeatPassword;
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    showPass,
    setShowPass,
    showRepeat,
    setShowRepeat,
    error,
    setError,
    isLoading,
    setIsLoading,
    handleSignUp,
    handleOAuth,
    passwordsMatch,
    passwordsMismatch,
    queryString,
  };
};

export default useSignUpForm;
