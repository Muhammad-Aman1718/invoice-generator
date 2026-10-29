import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import { Suspense } from "react";
import LazyInvoiceLanding from "@/src/components/invoice/LazyInvoiceLanding";
import HomeHero from "@/src/components/marketing/HomeHero";
import HowItWorks from "@/src/components/marketing/HowItWorks";
import HomeHighlights from "@/src/components/marketing/HomeHighlights";
import PricingTeaser from "@/src/components/marketing/PricingTeaser";
import HomeFaq from "@/src/components/marketing/HomeFaq";
import Loader from "@/src/components/auth/Loader";
import { HOME_FAQS } from "@/src/constant/faq";

export const metadata: Metadata = buildPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <PageJsonLd page="home" faqs={HOME_FAQS} />
      <HomeHero />
      <section
        id="builder"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8"
        aria-labelledby="builderTitle"
      >
        <div className="mb-6">
          <h2 id="builderTitle" className="mb-2 text-3xl font-bold text-navy sm:text-4xl">
            Create your invoice
          </h2>
          <p className="text-navy-500">
            Free and private: your draft is saved in this browser until you download or save it.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="panel py-24">
              <Loader text="Loading workspace…" />
            </div>
          }
        >
          <LazyInvoiceLanding />
        </Suspense>
      </section>
      <HowItWorks />
      <HomeHighlights />
      <PricingTeaser />
      <HomeFaq />
    </>
  );
}
