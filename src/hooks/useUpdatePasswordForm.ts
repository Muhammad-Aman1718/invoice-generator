"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { showToast } from "@/src/utils/showToast"; // Agar aap toast use kar rahe hain toh

const useUpdatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frontend validation check
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      if (typeof showToast !== "undefined") {
        showToast.warning("Check Passwords", "Passwords must be identical.");
      }
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      if (typeof showToast !== "undefined") {
        showToast.success("Success", "Password updated successfully!");
      }

      router.push("/auth/login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setError(msg);
      if (typeof showToast !== "undefined") {
        showToast.error("Error", msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordsMatch =
    repeatPassword.length > 0 && password === repeatPassword;
  const passwordsMismatch =
    repeatPassword.length > 0 && password !== repeatPassword;

  return {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    error,
    isLoading,
    handleUpdatePassword,
    passwordsMatch,
    passwordsMismatch,
  };
};

export default useUpdatePasswordForm;
