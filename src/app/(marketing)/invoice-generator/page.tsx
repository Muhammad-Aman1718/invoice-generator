import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/src/components/marketing/PageHero";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import FaqList from "@/src/components/marketing/FaqList";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import CountryCard from "@/src/components/countries/CountryCard";
import CountryChecklist from "@/src/components/countries/CountryChecklist";
import { buildPageMetadata } from "@/src/lib/seo";
import { COUNTRY_GUIDES } from "@/src/constant/countries";
import { COUNTRY_HUB_FAQS, UNIVERSAL_INVOICE_FIELDS } from "@/src/constant/marketing";

export const metadata: Metadata = buildPageMetadata("countries");

export default function CountriesPage() {
  return (
    <>
      <PageJsonLd page="countries" faqs={COUNTRY_HUB_FAQS} />
      <PageHero
        eyebrow="Free invoice generator"
        title="Free invoice generator for your country"
        description="What a valid invoice needs where you work, the tax name and rate to use, and a free builder that is set up for you in one click."
      >
        <Link href="/#builder" className="btn-primary mt-8 px-5 py-3 text-base">
          Create a free invoice
        </Link>
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="countriesTitle">
        <h2 id="countriesTitle" className="mb-6 text-2xl font-bold text-navy sm:text-3xl">
          Choose your country
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRY_GUIDES.map((guide) => (
            <CountryCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-navy">What every invoice needs</h2>
          <p className="mb-6 text-navy-500">
            Rules differ, but almost every tax authority asks for the same core details. InvoiceGen has a
            field for each one.
          </p>
          <CountryChecklist items={UNIVERSAL_INVOICE_FIELDS} />
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-bold text-navy">Questions</h2>
          <FaqList items={COUNTRY_HUB_FAQS} />
        </div>
      </section>
      <TryBuilderCta />
    </>
  );
}
