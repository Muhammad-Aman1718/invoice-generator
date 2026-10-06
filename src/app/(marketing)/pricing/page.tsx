import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import Link from "next/link";
import PageHero from "@/src/components/marketing/PageHero";
import FaqList from "@/src/components/marketing/FaqList";
import PlanGrid from "@/src/components/billing/PlanGrid";
import { PRICING_FAQS } from "@/src/constant/faq";

export const metadata: Metadata = buildPageMetadata("pricing");

export default function PricingPage() {
  return (
    <>
      <PageJsonLd page="pricing" faqs={PRICING_FAQS} />
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
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="faqTitle">
        <h2 id="faqTitle" className="mb-6 text-center text-2xl font-bold text-navy">
          Frequently asked questions
        </h2>
        <FaqList items={PRICING_FAQS} />
      </section>
    </>
  );
}
