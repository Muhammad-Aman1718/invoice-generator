import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

// Only these areas need a signed-in user; every other page is public.
const PROTECTED_PREFIXES = ["/dashboard"];
const ADMIN_PREFIX = "/dashboard/admin";
// Signed-in users skip these and land in the dashboard instead.
const GUEST_ONLY = ["/auth/login", "/auth/sign-up"];

function isSafeRedirect(path: string | null): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//");
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!hasEnvVars) return supabaseResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() also refreshes an expiring session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const { pathname } = url;

  const redirect = (path: string) => {
    const target = new URL(path, request.url);
    const response = NextResponse.redirect(target);
    // Keep refreshed auth cookies on the redirect.
    supabaseResponse.cookies.getAll().forEach((c) => response.cookies.set(c));
    return response;
  };

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!user && isProtected) {
    const login = new URL("/auth/login", request.url);
    login.searchParams.set("next", pathname + url.search);
    return redirect(login.pathname + login.search);
  }

  if (user && (pathname === "/" || GUEST_ONLY.includes(pathname))) {
    const next = url.searchParams.get("next");
    // Visitors who explicitly want the free builder can still open it.
    if (pathname === "/" && url.searchParams.has("builder")) return supabaseResponse;
    return redirect(isSafeRedirect(next) ? next : "/dashboard");
  }

  if (user && (pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (profile?.role !== "admin") return redirect("/dashboard");
  }

  return supabaseResponse;
}
