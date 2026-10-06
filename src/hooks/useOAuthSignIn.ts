"use client";

import { useSearchParams } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { buildAuthCallbackUrl } from "@/src/lib/redirects";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { showToast } from "@/src/utils/showToast";
import type { OAuthProvider } from "@/src/types/types";

/** Start Google/GitHub sign-in, returning to the current `next` page afterwards. */
export default function useOAuthSignIn() {
  const searchParams = useSearchParams();

  return async function signInWith(provider: OAuthProvider) {
    try {
      const { error } = await createClient().auth.signInWithOAuth({
        provider,
        options: { redirectTo: buildAuthCallbackUrl(searchParams, window.location.origin) },
      });
      if (error) throw error;
    } catch (error) {
      showToast.error("Sign-in failed", getAuthErrorMessage(error));
    }
  };
}
