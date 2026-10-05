import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  Globe,
  Image as ImageIcon,
  Lock,
  Percent,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Features",
  description: `Everything ${siteConfig.name} does: live preview, PDF export, 40+ currencies, VAT/GST presets, clients, reports and more.`,
  alternates: { canonical: "/features" },
};

const features = [
  { icon: Zap, title: "Live preview", body: "Every keystroke updates a print-ready preview, side by side on desktop or in a tab on mobile." },
  { icon: Download, title: "One-click PDF", body: "Crisp A4 PDFs with page numbers and repeating headers — even for 100+ line items." },
  { icon: Globe, title: "40+ currencies", body: "USD, EUR, GBP, PKR, INR, AED and many more, formatted the way each locale expects." },
  { icon: Percent, title: "VAT, GST & sales tax", body: "Presets for common rates worldwide, custom rates, per-line and overall discounts." },
  { icon: ImageIcon, title: "Your branding", body: "Add your logo and signature or stamp. Save business details once, reuse forever." },
  { icon: Users, title: "Client book", body: "Save clients and fill “Bill To” in one click. See what each client has been billed." },
  { icon: BarChart3, title: "Dashboard & reports", body: "Track paid, outstanding and overdue amounts with monthly revenue charts." },
  { icon: FileSpreadsheet, title: "CSV export", body: "Export every invoice to CSV for your accountant or spreadsheet (Pro)." },
  { icon: Lock, title: "Private by design", body: "Row-level security, essential cookies only, one-click data export and deletion." },
  { icon: Smartphone, title: "Works everywhere", body: "Fully responsive — create and send invoices from your phone, tablet or desktop." },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything you need to get paid"
        description="Professional invoices without the bloat. Built for freelancers, agencies and small businesses."
      />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title} className="panel p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                <Icon size={20} className="text-gold" aria-hidden="true" />
              </span>
              <h2 className="mb-1.5 text-lg font-black text-navy">{title}</h2>
              <p className="text-sm leading-relaxed text-navy-500">{body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6">
        <div className="rounded-3xl bg-navy p-8 sm:p-12">
          <h2 className="mb-3 text-2xl font-black text-white sm:text-3xl">Try it now — no sign-up needed</h2>
          <p className="mb-6 text-navy-200">Build an invoice in the browser and download the PDF in under a minute.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#builder" className="btn-primary">
              Open the free builder
            </Link>
            <Link href="/pricing" className="btn border border-white/20 text-white hover:bg-white/10">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
