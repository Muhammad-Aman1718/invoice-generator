import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import { getFeatureGroups } from "@/src/lib/featureGroups";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import FeatureList from "@/src/components/marketing/FeatureList";
import FeatureSpotlight from "@/src/components/marketing/FeatureSpotlight";
import FeatureRow from "@/src/components/marketing/FeatureRow";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";

export const metadata: Metadata = buildPageMetadata("features");

export default function FeaturesPage() {
  const [create, taxes, business] = getFeatureGroups();
  return (
    <>
      <PageJsonLd page="features" />
      <PageHero
        eyebrow="Features"
        title="Everything you need to get paid"
        description="Professional invoices without the bloat. Built for freelancers, agencies and small businesses."
      />
      <FeatureList group={create} />
      <FeatureSpotlight group={taxes} />
      <FeatureRow group={business} />
      <TryBuilderCta />
    </>
  );
}
