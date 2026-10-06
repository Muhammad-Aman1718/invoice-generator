import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import FeatureGrid from "@/src/components/marketing/FeatureGrid";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import { FEATURES } from "@/src/constant/marketing";

export const metadata: Metadata = buildPageMetadata("features");

export default function FeaturesPage() {
  return (
    <>
      <PageJsonLd page="features" />
      <PageHero
        eyebrow="Features"
        title="Everything you need to get paid"
        description="Professional invoices without the bloat. Built for freelancers, agencies and small businesses."
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <FeatureGrid items={FEATURES} />
      </section>
      <TryBuilderCta />
    </>
  );
}
