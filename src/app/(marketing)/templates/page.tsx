import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Invoice Templates",
  description: `Free professional invoice template with logo, tax and discounts. Fill it online and download as PDF with ${siteConfig.name}.`,
  alternates: { canonical: "/templates" },
};

const uses = [
  { title: "Freelancer invoice", body: "Hourly or fixed-price work with a clear payment due date." },
  { title: "Service business invoice", body: "Agencies, consultants and contractors billing multiple services." },
  { title: "Product / sales invoice", body: "Quantities, unit prices, ship-to address and PO numbers." },
  { title: "VAT / GST invoice", body: "Tax rate presets with the tax shown separately from the subtotal." },
];

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Templates"
        title="A clean, professional invoice template"
        description="One carefully designed, printer-friendly layout that adapts to freelancers, agencies and shops."
      />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Mini mock of the classic template */}
        <div className="panel mx-auto w-full max-w-md p-6 font-serif text-navy" aria-hidden="true">
          <div className="mb-4 flex items-start justify-between border-b-2 border-navy pb-3">
            <div>
              <div className="mb-1 h-6 w-16 rounded bg-navy/10" />
              <p className="text-sm font-bold">Acme Studio</p>
              <p className="text-[10px] text-navy-500">12 Market St · London</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold tracking-widest">INVOICE</p>
              <div className="ml-auto my-1 h-0.5 w-12 bg-gold" />
              <p className="font-mono text-xs font-bold">#1042</p>
            </div>
          </div>
          {["Brand identity", "Website design", "Hosting (12 mo)"].map((d, i) => (
            <div key={d} className="flex justify-between border-b border-navy/5 py-1.5 text-xs">
              <span>{d}</span>
              <span className="font-mono">£{[1200, 2400, 180][i].toLocaleString()}.00</span>
            </div>
          ))}
          <div className="mt-3 flex justify-end">
            <div className="w-40 border-t-2 border-navy pt-1.5 text-xs">
              <div className="flex justify-between font-bold">
                <span>TOTAL DUE</span>
                <span className="font-mono">£4,536.00</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-black text-navy">Works for every kind of invoice</h2>
          <ul className="mb-8 space-y-4">
            {uses.map((u) => (
              <li key={u.title} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/25">
                  <Check size={12} strokeWidth={3} className="text-navy" />
                </span>
                <span>
                  <strong className="block text-navy">{u.title}</strong>
                  <span className="text-sm text-navy-500">{u.body}</span>
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
