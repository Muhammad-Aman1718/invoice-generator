"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { buildNextUrl } from "@/src/lib/redirects";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await createClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      showToast.success("Welcome back!", "Redirecting you now…");
      router.replace(buildNextUrl(searchParams, window.location.origin));
      router.refresh();
    } catch (error) {
      showToast.error("Sign-in failed", getErrorMessage(error, "Invalid credentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    queryString: searchParams.toString(),
    isVerified: searchParams.get("verified") === "true",
  };
}
