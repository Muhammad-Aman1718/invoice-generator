"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const KEY = "invoicegen-cookie-notice";

/** We only use strictly necessary storage, so this is a notice, not a consent wall. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {}
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, new Date().toISOString());
    } catch {}
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-lift sm:flex-row sm:items-center"
    >
      <Cookie size={20} className="hidden flex-shrink-0 text-gold-dark sm:block" aria-hidden="true" />
      <p className="flex-1 text-xs leading-relaxed text-navy-500">
        We use only essential cookies and local storage to keep you signed in and save your invoice drafts — no ads,
        no tracking. Read our{" "}
        <Link href="/cookie-policy" className="font-bold text-navy underline decoration-gold underline-offset-2">
          Cookie Policy
        </Link>
        .
      </p>
      <button onClick={dismiss} className="btn-navy btn-sm">
        Got it
      </button>
    </div>
  );
}
