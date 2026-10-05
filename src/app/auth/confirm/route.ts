import type { EmailOtpType } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import { getSafeRedirectPath } from "@/src/lib/redirects";
import { ROUTES } from "@/src/constant/routes";

// Email links that use token_hash (instead of PKCE `code`) are verified here.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!tokenHash || !type) {
    redirect(`${ROUTES.authError}?error=${encodeURIComponent("Missing token")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) redirect(`${ROUTES.authError}?error=${encodeURIComponent(error.message)}`);
  redirect(getSafeRedirectPath(searchParams.get("next")));
}
