import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import PageHero from "@/src/components/marketing/PageHero";
import JsonLd from "@/src/components/seo/JsonLd";
import FaqList from "@/src/components/marketing/FaqList";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import CountryCard from "@/src/components/countries/CountryCard";
import CountryChecklist from "@/src/components/countries/CountryChecklist";
import CountryFacts from "@/src/components/countries/CountryFacts";
import { buildBreadcrumbJsonLd, buildCountryMetadata, buildFaqJsonLd, getCountryPath } from "@/src/lib/seo";
import {
  COUNTRY_GUIDES,
  COUNTRY_GUIDES_REVIEWED,
  COUNTRY_GUIDES_REVIEWED_LABEL,
  findCountryGuide,
  getCountryLabel,
} from "@/src/constant/countries";
import type { CountryPageProps } from "@/src/types/types";

export function generateStaticParams() {
  return COUNTRY_GUIDES.map((guide) => ({ country: guide.slug }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const guide = findCountryGuide((await params).country);
  return guide ? buildCountryMetadata(guide) : {};
}

export default async function CountryPage({ params }: CountryPageProps) {
  const guide = findCountryGuide((await params).country);
  if (!guide) notFound();
  const label = getCountryLabel(guide);
  const others = COUNTRY_GUIDES.filter((other) => other.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd("countries", { name: label, path: getCountryPath(guide) })} />
      <JsonLd data={buildFaqJsonLd(guide.faqs)} />
      <PageHero
        eyebrow={`${guide.currency} · ${guide.taxName}`}
        title={`Free invoice generator for ${guide.name}`}
        description={guide.intro}
      >
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <Link href={`/?country=${guide.slug}#builder`} className="btn-primary px-5 py-3 text-base">
            Create a {label} invoice
          </Link>
          <Link href="/invoice-generator" className="btn-outline px-5 py-3 text-base">
            Other countries
          </Link>
        </div>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <div className="min-w-0">
          <h2 className="mb-2 text-2xl font-bold text-navy">What a {label} invoice must include</h2>
          <p className="mb-6 text-sm text-navy-500">
            Reviewed <time dateTime={COUNTRY_GUIDES_REVIEWED}>{COUNTRY_GUIDES_REVIEWED_LABEL}</time>. General
            guidance, not tax advice.
          </p>
          <CountryChecklist items={guide.mustInclude} />
          <h2 className="mb-4 mt-12 text-2xl font-bold text-navy">Good to know</h2>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed text-navy-500 marker:text-gold-dark">
            {guide.goodToKnow.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <a
            href={guide.authority.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
          >
            Official rules: {guide.authority.name}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <CountryFacts guide={guide} />
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="countryFaqTitle">
        <h2 id="countryFaqTitle" className="mb-6 text-2xl font-bold text-navy">
          Questions about invoicing in {label}
        </h2>
        <FaqList items={guide.faqs} />
      </section>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8" aria-labelledby="otherCountriesTitle">
        <h2 id="otherCountriesTitle" className="mb-6 text-xl font-bold text-navy">
          Invoicing elsewhere?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <CountryCard key={other.slug} guide={other} />
          ))}
        </div>
      </section>
      <TryBuilderCta />
    </>
  );
}
