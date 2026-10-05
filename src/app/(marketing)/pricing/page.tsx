import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/src/components/marketing/page-hero";
import { PlanGrid } from "@/src/components/billing/plan-grid";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Simple pricing for ${siteConfig.name}. Start free, upgrade to Pro or Business when you need unlimited invoices.`,
  alternates: { canonical: "/pricing" },
};

const faqs = [
  {
    q: "Is the Free plan really free?",
    a: "Yes. No card required. You can create and download unlimited PDFs with the builder, and save up to 10 invoices per month to your account.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes — cancel from Billing in one click. You keep paid features until the end of the period you paid for, then drop to Free without losing data.",
  },
  {
    q: "Do you offer refunds?",
    a: "Your first payment is covered by a 14-day money-back guarantee. See the refund policy for details.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All major cards, plus wallets such as Apple Pay and Google Pay where available, processed securely by Stripe.",
  },
  {
    q: "What happens to my invoices if I downgrade?",
    a: "Nothing is deleted. You can still view, edit and download every invoice; only the Free plan’s monthly saving limit applies again.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing"
        description="Start free. Upgrade when invoicing becomes part of your day. Cancel anytime."
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <PlanGrid mode="public" />
        <p className="mt-6 text-center text-xs text-navy-500">
          Prices in USD, excluding applicable taxes. By subscribing you agree to our{" "}
          <Link href="/terms-of-service" className="font-bold underline decoration-gold underline-offset-4">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/refund-policy" className="font-bold underline decoration-gold underline-offset-4">
            Refund Policy
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="faq-title">
        <h2 id="faq-title" className="mb-6 text-center text-2xl font-black text-navy">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="panel group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                {f.q}
                <span className="text-xl text-gold-dark transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
