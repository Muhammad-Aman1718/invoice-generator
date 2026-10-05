"use client";

import { useSearchParams } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { buildAuthCallbackUrl } from "@/src/lib/redirects";
import { showToast } from "@/src/utils/showToast";
import type { OAuthProvider } from "@/src/types/types";

/** Start Google/GitHub sign-in, returning to the current `next` page afterwards. */
export default function useOAuthSignIn() {
  const searchParams = useSearchParams();

  return async function signInWith(provider: OAuthProvider) {
    const { error } = await createClient().auth.signInWithOAuth({
      provider,
      options: { redirectTo: buildAuthCallbackUrl(searchParams, window.location.origin) },
    });
    if (error) showToast.error("Sign-in failed", error.message);
  };
}
