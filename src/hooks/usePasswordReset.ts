"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { showToast } from "@/src/utils/showToast";
import { ROUTES } from "@/src/constant/routes";

/** Send a password-reset email that returns through /auth/callback to the update page. */
export default function usePasswordReset() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const redirectTo = `${window.location.origin}${ROUTES.authCallback}?next=${ROUTES.updatePassword}`;
      const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (error) throw error;
      setIsSent(true);
    } catch (error) {
      showToast.error("Could not send reset email", getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, isSent, isLoading, handleSubmit };
}
