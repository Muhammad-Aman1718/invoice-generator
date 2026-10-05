import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Download,
  Globe,
  PenLine,
  Send,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { InvoiceLanding } from "@/src/components/invoice/invoice-landing";
import { PLANS, PLAN_ORDER } from "@/src/config/plans";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Free Invoice Generator & PDF Invoice Maker` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const steps = [
  { icon: PenLine, title: "Fill in the details", body: "Your business, your client, line items, tax and discounts." },
  { icon: Download, title: "Download the PDF", body: "A clean, printer-friendly A4 invoice — instantly." },
  { icon: Send, title: "Track payment", body: "Save it to your dashboard and mark it paid when the money lands." },
];

const highlights = [
  { icon: Globe, title: "40+ currencies", body: "Local formatting for USD, EUR, GBP, PKR, INR, AED and more." },
  { icon: Shield, title: "VAT & GST ready", body: "Tax presets for the EU, UK, US, India, Australia, Gulf and others." },
  { icon: Users, title: "Client book", body: "Save clients once and fill invoices in one click." },
  { icon: BarChart3, title: "Live dashboard", body: "See paid, outstanding and overdue totals at a glance." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Free · No sign-up required
        </span>
        <h1 className="mb-4 text-3xl font-black leading-tight text-navy sm:text-5xl">
          Create professional
          <span className="mt-1 block bg-gradient-to-br from-navy to-[#3a3a9e] bg-clip-text text-transparent">
            invoices in seconds
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-navy-500 sm:text-base">
          Fill, preview and export tax-ready PDF invoices right in your browser. Create a free account to save
          clients, track payments and see your revenue.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 xs:flex-row">
          <a href="#builder" className="btn-primary">
            <Zap size={16} /> Start invoicing
          </a>
          <Link href="/auth/sign-up" className="btn-outline">
            Create free account <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Builder */}
      <section id="builder" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:px-8" aria-label="Invoice builder">
        <Suspense
          fallback={
            <div className="panel py-24 text-center text-sm font-semibold text-navy-400">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              Loading workspace…
            </div>
          }
        >
          <InvoiceLanding />
        </Suspense>
      </section>

      {/* How it works */}
      <section className="bg-white py-16" aria-labelledby="how-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="how-title" className="mb-10 text-center text-2xl font-black text-navy sm:text-3xl">
            Invoicing in three steps
          </h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rounded-2xl border border-navy/[0.07] bg-mist/60 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
                    <Icon size={18} className="text-gold" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-navy-400">Step {i + 1}</span>
                </div>
                <h3 className="mb-1 text-lg font-black text-navy">{title}</h3>
                <p className="text-sm text-navy-500">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="why-title">
        <h2 id="why-title" className="mb-10 text-center text-2xl font-black text-navy sm:text-3xl">
          Built for small businesses everywhere
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="panel p-6">
              <Icon size={22} className="mb-3 text-gold-dark" />
              <h3 className="mb-1 font-black text-navy">{title}</h3>
              <p className="text-sm text-navy-500">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/features" className="inline-flex items-center gap-1 text-sm font-black text-navy hover:underline">
            See all features <ArrowRight size={14} />
          </Link>
        </p>
      </section>

      {/* Pricing teaser */}
      <section className="bg-navy py-16" aria-labelledby="pricing-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="pricing-title" className="mb-2 text-center text-2xl font-black text-white sm:text-3xl">
            Start free, grow when you&apos;re ready
          </h2>
          <p className="mb-10 text-center text-navy-200">No credit card needed. Cancel paid plans anytime.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {PLAN_ORDER.map((id) => {
              const plan = PLANS[id];
              return (
                <div
                  key={id}
                  className={
                    plan.highlighted
                      ? "rounded-2xl border-2 border-gold bg-white p-6"
                      : "rounded-2xl border border-white/10 bg-white/[0.06] p-6"
                  }
                >
                  <p className={plan.highlighted ? "font-black text-navy" : "font-black text-white"}>{plan.name}</p>
                  <p className={plan.highlighted ? "mb-4 text-3xl font-black text-navy" : "mb-4 text-3xl font-black text-gold"}>
                    ${plan.price.month}
                    <span className="text-sm font-semibold opacity-70">/mo</span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className={plan.highlighted ? "flex gap-2 text-sm text-navy-500" : "flex gap-2 text-sm text-navy-100"}
                      >
                        <Check size={15} className="mt-0.5 flex-shrink-0 text-gold-dark" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/pricing" className="btn-primary">
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
