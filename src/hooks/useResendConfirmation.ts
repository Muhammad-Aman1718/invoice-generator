"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { buildAuthCallbackUrl } from "@/src/lib/redirects";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { showToast } from "@/src/utils/showToast";

/** Re-send the sign-up confirmation email for an account that isn't verified yet. */
export default function useResendConfirmation(email: string) {
  const [isSending, setIsSending] = useState(false);
  const searchParams = useSearchParams();

  const resend = async () => {
    setIsSending(true);
    try {
      const { error } = await createClient().auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: buildAuthCallbackUrl(searchParams, window.location.origin) },
      });
      if (error) throw error;
      showToast.success("Confirmation email sent", `Check ${email} (and your spam folder).`);
    } catch (error) {
      showToast.error("Could not resend email", getAuthErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, resend };
}
