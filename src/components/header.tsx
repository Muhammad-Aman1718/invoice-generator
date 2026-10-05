"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { marketingNav } from "@/src/config/site";
import { createClient } from "@/src/lib/supabase/client";
import { cn } from "@/src/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-[0_2px_20px_rgba(25,25,112,0.3)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="InvoiceGen home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold transition group-hover:scale-105">
            <FileText size={15} className="text-navy" aria-hidden="true" />
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            Invoice<span className="text-gold">Gen</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {marketingNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  pathname === item.href ? "text-gold" : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <Link href="/dashboard" className="btn-primary btn-sm">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white xs:inline-flex"
              >
                Sign in
              </Link>
              <Link href="/auth/sign-up" className="btn-primary btn-sm">
                Sign up free
              </Link>
            </>
          )}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn("overflow-hidden border-t border-white/10 transition-all md:hidden", open ? "max-h-96" : "max-h-0 border-t-0")}
      >
        <ul className="space-y-1 px-4 py-3">
          {marketingNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-xl px-3 py-2.5 text-sm font-semibold",
                  pathname === item.href ? "bg-white/10 text-gold" : "text-white/80",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {!signedIn && (
            <li>
              <Link href="/auth/login" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white/80">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
