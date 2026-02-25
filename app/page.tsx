import Link from "next/link";
import { Suspense } from "react";
import { InvoiceLanding } from "@/components/invoice/invoice-landing";
import { AdSlot } from "@/components/ads/ad-slot";
import Footer from "@/components/footer";

export default function Home() {
  return (
    // Main Background: #F5F7FA (60%)
    <main className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      {/* Header: #1B2A4A (30%) */}
      <header
        className="sticky top-0 z-10 shadow-md"
        style={{ backgroundColor: "#1B2A4A" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-white">
            Invoice <span style={{ color: "#3A7BD5" }}>SaaS</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            {/* CTA/Accent: #3A7BD5 (10%) */}
            <Link
              href="/auth/sign-up"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#3A7BD5" }}
            >
              Sign up free
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <AdSlot variant="header" />
        </div>

        <section className="text-center max-w-3xl mx-auto mb-16">
          {/* Main Heading in Navy for Contrast */}
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-6"
            style={{ color: "#1B2A4A" }}
          >
            Create Professional Invoices
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            Free invoice generator for USA and Europe. VAT and tax compliant.
            <br className="hidden sm:block" /> Export to PDF instantly.
          </p>
        </section>

        <Suspense
          fallback={
            <div className="text-center py-20 font-medium text-slate-400">
              Loading your workspace...
            </div>
          }
        >
          {/* Landing component will inherit the global feel */}
          <div className=" overflow-hidden">
            <InvoiceLanding />
          </div>
        </Suspense>

        <div className="mt-12">
          <AdSlot variant="success-modal" />
        </div>
      </div>

      {/* Footer also using the Navy theme for consistency */}
      <Footer />
    </main>
  );
}
