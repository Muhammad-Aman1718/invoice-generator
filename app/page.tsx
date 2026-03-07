import Link from "next/link";
import { FileText, Zap, Globe, Shield } from "lucide-react";
import { Suspense } from "react";
import { InvoiceLanding } from "@/components/invoice/invoice-landing";
// import { AdSlot } from "@/components/ads/ad-slot";
import Footer from "@/components/footer";

import { Metadata } from "next";

const defaultUrl = "https://invoice-gen.vercel.app";

export const metadata: Metadata = {
  title: "Invoice Gen",
  description:
    "Create professional invoices for USA and Europe. PDF Invoice Maker with VAT, GST support. Free to use.",
  keywords: [
    "Invoice Generator",
    "PDF Invoice Maker",
    "VAT Compliant",
    "Tax Compliant",
    "USA",
    "Europe",
  ],
  openGraph: {
    title: "Invoice SaaS | Professional PDF Invoice Maker",
    description:
      "Create VAT and tax compliant invoices. Export to PDF instantly.",
    url: defaultUrl,
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#ECEFF1" }}>
      {/* ══ HEADER / NAV ═══════════════════════════════════════════════ */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Ad Slot */}
        {/* <div className="mb-8">
          <AdSlot variant="header" />
        </div> */}

        {/* ══ HERO SECTION ═══════════════════════════════════════════════ */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border"
            style={{
              background: "rgba(255,193,7,0.1)",
              borderColor: "rgba(255,193,7,0.3)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#FFC107" }}
            />
            <span
              className="text-xs font-black uppercase tracking-widest"
              style={{ color: "#191970" }}
            >
              Free · No sign-up required
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-black mb-4 leading-tight"
            style={{ color: "#191970" }}
          >
            Create Professional
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #191970 0%, #3a3a9e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Invoices in Seconds
            </span>
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(25,25,112,0.6)" }}
          >
            Free invoice generator for USA and Europe. VAT and tax compliant.
            Export to PDF instantly — no account needed.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { icon: <Globe size={12} />, text: "Multi-currency" },
              { icon: <Shield size={12} />, text: "VAT Compliant" },
              { icon: <Zap size={12} />, text: "Instant PDF" },
            ].map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  background: "#fff",
                  borderColor: "rgba(25,25,112,0.1)",
                  color: "#191970",
                  boxShadow: "0 2px 8px rgba(25,25,112,0.05)",
                }}
              >
                <span style={{ color: "#FFC107" }}>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </section>

        {/* ══ INVOICE BUILDER ════════════════════════════════════════════ */}
        <Suspense
          fallback={
            <div
              className="text-center py-24 rounded-2xl font-semibold text-sm"
              style={{
                background: "#fff",
                color: "rgba(25,25,112,0.4)",
                border: "1px solid rgba(25,25,112,0.08)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent mx-auto mb-3 animate-spin"
                style={{
                  borderColor: "#FFC107",
                  borderTopColor: "transparent",
                }}
              />
              Loading workspace...
            </div>
          }
        >
          <InvoiceLanding />
        </Suspense>

        {/* Ad Slot bottom */}
        {/* <div className="mt-10">
          <AdSlot variant="success-modal" />
        </div> */}
      </div>

      <Footer />
    </main>
  );
}
