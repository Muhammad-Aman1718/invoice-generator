import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Answers to common questions about creating invoices, plans, billing and your data in ${siteConfig.name}.`,
  alternates: { canonical: "/help-center" },
};

const groups = [
  {
    title: "Getting started",
    items: [
      {
        q: "Do I need an account?",
        a: "No. The builder on the home page works without one — your draft is saved in your browser and you can download the PDF. Create a free account to save invoices, clients and track payments.",
      },
      {
        q: "How do I create my first invoice?",
        a: "Go to Dashboard → New invoice. Fill in “From”, pick or type a client under “Bill To”, add line items, then click Save. Use PDF to download it.",
      },
      {
        q: "Can I set my business details once?",
        a: "Yes. In Settings → Business details add your name, address and logo, plus default currency, tax rate, payment terms, notes and terms. Every new invoice starts with them.",
      },
    ],
  },
  {
    title: "Invoices",
    items: [
      {
        q: "How are totals calculated?",
        a: "Each line is quantity × rate minus its line discount. The overall discount is applied to the subtotal, then tax is applied to the discounted amount.",
      },
      {
        q: "What do the statuses mean?",
        a: "Draft — not sent yet. Pending — sent and awaiting payment. Paid — settled. Cancelled — void. Pending invoices past their due date show as Overdue automatically.",
      },
      {
        q: "Can I copy an invoice?",
        a: "Yes. In Invoices, open the ⋯ menu and choose Duplicate. The copy gets the next number and today’s date.",
      },
      {
        q: "Which currencies are supported?",
        a: "Over 40 currencies. In the PDF, currencies whose symbol isn’t supported by the PDF font are shown with their ISO code (e.g. AED 1,200.00).",
      },
    ],
  },
  {
    title: "Plans & billing",
    items: [
      {
        q: "What are the Free plan limits?",
        a: "10 saved invoices per calendar month and 5 saved clients. PDF downloads are unlimited.",
      },
      {
        q: "How do I upgrade or cancel?",
        a: "Go to Dashboard → Billing & Plan. Upgrades apply immediately; cancellations take effect at the end of the paid period.",
      },
    ],
  },
  {
    title: "Account & privacy",
    items: [
      {
        q: "How do I export or delete my data?",
        a: "Settings → Your data. “Export” downloads everything as JSON; “Delete account” permanently removes your account and data.",
      },
      {
        q: "I forgot my password.",
        a: "Use “Forgot?” on the sign-in page to receive a reset link by email.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <>
      <PageHero eyebrow="Help Center" title="How can we help?" description="Quick answers to the most common questions." />
      <div className="mx-auto max-w-3xl space-y-10 px-4 pb-20 sm:px-6">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`h-${g.title}`}>
            <h2 id={`h-${g.title}`} className="mb-4 text-xl font-black text-navy">
              {g.title}
            </h2>
            <div className="space-y-3">
              {g.items.map((item) => (
                <details key={item.q} className="panel group p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                    {item.q}
                    <span className="text-xl text-gold-dark transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{item.a}</p>
                </details>
              ))}
            </div>
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
