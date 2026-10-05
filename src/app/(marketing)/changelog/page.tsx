import type { Metadata } from "next";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: `What's new in ${siteConfig.name}: features, improvements and fixes.`,
  alternates: { canonical: "/changelog" },
};

const releases = [
  {
    version: "v2.0.0",
    date: "October 2026",
    items: [
      "New dashboard with revenue chart, overdue tracking and setup checklist",
      "Client book: save clients and fill invoices in one click",
      "Pro & Business plans with Stripe billing, usage meters and CSV export",
      "Reports page with 12-month trends and collection rate",
      "Settings: business defaults, password change, data export and account deletion",
      "Admin area for user, role and plan management",
      "Duplicate invoices, paid stamp and page numbers in PDFs",
      "Rewritten Privacy Policy, Terms, Refund, Cookie and GDPR pages",
    ],
  },
  {
    version: "v1.3.0",
    date: "March 2026",
    items: ["SEO-friendly public pages", "Improved dashboard responsiveness", "Better mobile navigation"],
  },
  {
    version: "v1.0.0",
    date: "January 2026",
    items: ["Invoice builder with live preview", "PDF export", "Email, Google and GitHub sign-in"],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <PageHero eyebrow="Changelog" title="What's new" description={`Every improvement to ${siteConfig.name}, newest first.`} />
      <ol className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        {releases.map((r) => (
          <li key={r.version} className="panel relative overflow-hidden p-6 sm:p-8">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-gold" />
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-black text-navy">{r.version}</h2>
              <span className="text-sm font-semibold text-navy-500">{r.date}</span>
            </div>
            <ul className="space-y-2">
              {r.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-navy-500">
                  <span className="text-gold-dark">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
