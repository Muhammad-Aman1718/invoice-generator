import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/src/components/marketing/PageHero";
import FaqList from "@/src/components/marketing/FaqList";
import { HELP_CENTER_GROUPS } from "@/src/constant/faq";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Answers to common questions about creating invoices, plans, billing and your data in ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/help-center" },
};

export default function HelpCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        description="Quick answers to the most common questions."
      />
      <div className="mx-auto max-w-3xl space-y-10 px-4 pb-20 sm:px-6">
        {HELP_CENTER_GROUPS.map((group, index) => (
          <section key={group.title} aria-labelledby={`helpGroup${index}`}>
            <h2 id={`helpGroup${index}`} className="mb-4 text-xl font-black text-navy">
              {group.title}
            </h2>
            <FaqList items={group.items} />
          </section>
        ))}
        <div className="panel p-6 text-center">
          <p className="mb-3 font-bold text-navy">Still stuck?</p>
          <Link href="/contact" className="btn-primary">
            Contact support
          </Link>
        </div>
      </div>
    </>
  );
}
