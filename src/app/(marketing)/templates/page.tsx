import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHero from "@/src/components/marketing/PageHero";
import TemplateMockup from "@/src/components/marketing/TemplateMockup";
import { TEMPLATE_USES } from "@/src/constant/marketing";

export const metadata: Metadata = buildPageMetadata("templates");

export default function TemplatesPage() {
  return (
    <>
      <PageJsonLd page="templates" />
      <PageHero
        eyebrow="Templates"
        title="A clean, professional invoice template"
        description="One carefully designed, printer-friendly layout that adapts to freelancers, agencies and shops."
      />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <TemplateMockup />
        <div>
          <h2 className="mb-4 text-2xl font-bold text-navy">Works for every kind of invoice</h2>
          <ul className="mb-8 space-y-4">
            {TEMPLATE_USES.map((use) => (
              <li key={use.title} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/25">
                  <Check size={12} strokeWidth={3} className="text-navy" />
                </span>
                <span>
                  <strong className="block text-navy">{use.title}</strong>
                  <span className="text-sm text-navy-500">{use.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/#builder" className="btn-primary">
            Use this template free
          </Link>
        </div>
      </section>
    </>
  );
}
