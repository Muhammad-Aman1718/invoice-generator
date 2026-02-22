import Link from "next/link";
import { Suspense } from "react";
import { InvoiceLanding } from "@/components/invoice/invoice-landing";
import { AdSlot } from "@/components/ads/ad-slot";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg text-indigo-600">
            Invoice SaaS
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign in
            </Link>
            <Link href="/auth/sign-up" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <AdSlot variant="header" />
        </div>

        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Create Professional Invoices
          </h1>
          <p className="text-lg text-slate-500">
            Free invoice generator for USA and Europe. VAT and tax compliant. Export to PDF instantly.
          </p>
        </section>

        <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading...</div>}>
          <InvoiceLanding />
        </Suspense>

        <div className="mt-12">
          <AdSlot variant="success-modal" />
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Invoice SaaS. Free to use.</p>
        </div>
      </footer>
    </main>
  );
}
