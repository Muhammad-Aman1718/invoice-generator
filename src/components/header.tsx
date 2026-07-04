"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#191970",
        boxShadow: "0 2px 20px rgba(25,25,112,0.3)",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between"
        style={{ height: "60px" }}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Invoice Gen - Home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
            style={{ background: "#FFC107" }}
          >
            <FileText
              size={15}
              style={{ color: "#191970" }}
              aria-hidden="true"
            />
          </div>
          <span className="font-black text-lg text-white tracking-tight max-xs:hidden">
            Invoice<span style={{ color: "#FFC107" }}>Gen</span>
          </span>
        </Link>

        {/* Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl transition-all text-white/65 hover:text-white hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.65)" }}
            aria-label="Sign in to your account"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-xs sm:text-sm font-black text-[#191970] px-4 py-2 rounded-xl transition-all active:scale-95"
            style={{
              backgroundColor: "#FFC107",
              boxShadow: "0 4px 14px rgba(255,193,7,0.35)",
            }}
            aria-label="Sign up for free account"
          >
            Sign up free
          </Link>
        </div>
      </nav>
    </header>
  );
}
