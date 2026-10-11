"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import HeaderAuthActions from "./HeaderAuthActions";
import MobileMenu from "./MobileMenu";
import useIsSignedIn from "@/src/hooks/useIsSignedIn";
import { MARKETING_NAV } from "@/src/constant/site";
import { cn } from "@/src/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const signedIn = useIsSignedIn();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="glass-bar sticky top-0 z-50 border-b border-navy/[0.07]">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <BrandLogo tone="onLight" />
        <ul className="hidden items-center gap-1 md:flex">
          {MARKETING_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  pathname === item.href
                    ? "bg-navy/[0.06] text-navy"
                    : "text-navy-500 hover:bg-navy/5 hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <HeaderAuthActions signedIn={signedIn} />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy/5 text-navy md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} signedIn={signedIn} pathname={pathname} />
    </header>
  );
}
