import type { Metadata } from "next";
import PageHero from "@/src/components/marketing/PageHero";
import FeatureGrid from "@/src/components/marketing/FeatureGrid";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import { FEATURES } from "@/src/constant/marketing";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = {
  title: "Features",
  description: `Everything ${SITE_CONFIG.name} does: live preview, PDF export, 40+ currencies, VAT/GST presets, clients, reports and more.`,
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
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
