// // // @/lib/supabase/proxy.ts

// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";
// import { hasEnvVars } from "../utils";

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   if (!hasEnvVars) {
//     return supabaseResponse;
//   }

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value),
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   // IMPORTANT: getUser() session ko refresh karta hai.
//   // Agar session purana ho jaye toh ye naya token mangwa leta hai.
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Route Protection Logic
//   const isAuthPage =
//     request.nextUrl.pathname.startsWith("/auth") ||
//     request.nextUrl.pathname.startsWith("/login");
//   const isHomePage = request.nextUrl.pathname === "/";

//   // Case 1: Agar user nahi hai aur woh protected route (Dashboard) par jane ki koshish kare
//   if (!user && !isAuthPage && !isHomePage) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/auth/login"; // Ensure karein ke path sahi hai
//     return NextResponse.redirect(url);
//   }

//   // Case 2: Agar user login hai aur login page par jane ki koshish kare, toh dashboard bhej dein
//   if (user && isAuthPage) {
//     console.log("User is already logged in, redirecting to dashboard.", user);
//     const url = request.nextUrl.clone();
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   return supabaseResponse;
// }

// @/lib/supabase/proxy.ts

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Parameters check karein
  const nextParam = url.searchParams.get("next");
  const actionParam = url.searchParams.get("action");

  const isAuthPage =
    pathname.startsWith("/auth") || pathname.startsWith("/login");
  const isHomePage = pathname === "/";

  // CASE 1: Logged-in user agar Home Page ya Auth Pages par jaye
  if (user && (isHomePage || isAuthPage)) {
    // Priority: Agar 'next' parameter hai (Save Invoice wala case), toh wahan bheinjein
    if (nextParam) {
      const redirectUrl = new URL(nextParam, request.url);
      if (actionParam) redirectUrl.searchParams.set("action", actionParam);
      return NextResponse.redirect(redirectUrl);
    }

    // Default: Hamesha dashboard par bheinjein (Home page par nahi jane dena)
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // CASE 2: Guest user (Logged-out) agar protected routes par jane ki koshish kare
  if (!user && !isAuthPage && !isHomePage) {
    url.pathname = "/auth/login";
    // Current path save karein taake login ke baad wapas aa sake
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
