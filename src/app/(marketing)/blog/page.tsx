import type { Metadata } from "next";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Invoicing tips, tax basics and cash-flow advice from the ${siteConfig.name} team.`,
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    title: "What every invoice must include",
    date: "September 2026",
    tag: "Basics",
    body: [
      "A unique, sequential invoice number, the issue date and a due date.",
      "Your business name and address — plus a VAT/GST number if you are registered.",
      "Your client’s name and address, a clear description of each item, quantity, unit price and line total.",
      "The subtotal, any discount, the tax rate and tax amount, and the total due with its currency.",
      "How to pay: bank details or a payment link, and your payment terms.",
    ],
  },
  {
    title: "Five habits that get invoices paid faster",
    date: "August 2026",
    tag: "Cash flow",
    body: [
      "Send the invoice the day the work is delivered — not at month end.",
      "Use short, explicit terms such as “Due in 14 days” instead of “Net 30”.",
      "Name a contact person on the client side and address the invoice to them.",
      "Follow up politely the day after the due date; overdue invoices are highlighted in your dashboard.",
      "Offer more than one way to pay.",
    ],
  },
  {
    title: "VAT vs GST vs sales tax in one minute",
    date: "July 2026",
    tag: "Tax",
    body: [
      "VAT (EU, UK, Gulf) and GST (India, Australia, Canada, NZ) are charged at each step of the supply chain; registered businesses reclaim the tax they pay.",
      "US sales tax is charged only on the final sale and varies by state and city.",
      "Always show the tax separately from the subtotal, and check local rules or an accountant for your exact obligations.",
    ],
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Invoicing, simplified" description="Practical guides for freelancers and small businesses." />
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        {posts.map((p) => (
          <article key={p.title} className="panel p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-3 text-xs font-bold">
              <span className="rounded-full bg-gold/20 px-2.5 py-1 text-navy">{p.tag}</span>
              <span className="text-navy-500">{p.date}</span>
            </div>
            <h2 className="mb-4 text-xl font-black text-navy sm:text-2xl">{p.title}</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-500 marker:text-gold-dark">
              {p.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
