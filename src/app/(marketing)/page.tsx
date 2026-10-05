import type { Metadata } from "next";
import { Suspense } from "react";
import InvoiceLanding from "@/src/components/invoice/InvoiceLanding";
import HomeHero from "@/src/components/marketing/HomeHero";
import HowItWorks from "@/src/components/marketing/HowItWorks";
import HomeHighlights from "@/src/components/marketing/HomeHighlights";
import PricingTeaser from "@/src/components/marketing/PricingTeaser";
import Loader from "@/src/components/auth/Loader";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE_CONFIG.name} — Free Invoice Generator & PDF Invoice Maker` },
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section
        id="builder"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:px-8"
        aria-label="Invoice builder"
      >
        <Suspense
          fallback={
            <div className="panel py-24">
              <Loader text="Loading workspace…" />
            </div>
          }
        >
          <InvoiceLanding />
        </Suspense>
      </section>
      <HowItWorks />
      <HomeHighlights />
      <PricingTeaser />
    </>
  );
}
