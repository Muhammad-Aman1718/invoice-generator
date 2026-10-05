import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";

// OAuth, email-confirmation and password-reset links land here with ?code=…
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const action = searchParams.get("action");

  if (!code) {
    const reason = searchParams.get("error_description") ?? "Missing authorization code";
    return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(reason)}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(error.message)}`);
  }

  // Only allow same-site relative redirects.
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const target = new URL(safeNext, origin);
  if (action) target.searchParams.set("action", action);
  return NextResponse.redirect(target);
}
