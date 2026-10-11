import {
  BarChart3,
  Eye,
  Feather,
  HandCoins,
  ShieldCheck,
  Download,
  FileSpreadsheet,
  Globe,
  Image as ImageIcon,
  Lock,
  PenLine,
  Percent,
  Send,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import type { AboutValue, FeatureItem, InvoiceData, TemplateUse } from "@/src/types/types";

export const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: "Live preview",
    body: "Every keystroke updates a print-ready preview, side by side on desktop or in a tab on mobile.",
  },
  {
    icon: Download,
    title: "One-click PDF",
    body: "Crisp A4 PDFs with page numbers and repeating headers, even for 100+ line items.",
  },
  {
    icon: Globe,
    title: "40+ currencies",
    body: "USD, EUR, GBP, PKR, INR, AED and many more, formatted the way each locale expects.",
  },
  {
    icon: Percent,
    title: "VAT, GST & sales tax",
    body: "Presets for common rates worldwide, custom rates, per-line and overall discounts.",
  },
  {
    icon: ImageIcon,
    title: "Your branding",
    body: "Add your logo and signature or stamp. Save business details once, reuse forever.",
  },
  {
    icon: Users,
    title: "Client book",
    body: "Save clients and fill “Bill To” in one click. See what each client has been billed.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & reports",
    body: "Track paid, outstanding and overdue amounts with monthly revenue charts.",
  },
  {
    icon: FileSpreadsheet,
    title: "CSV export",
    body: "Export every invoice to CSV for your accountant or spreadsheet (Pro).",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "Row-level security, essential cookies only, one-click data export and deletion.",
  },
  {
    icon: Smartphone,
    title: "Works everywhere",
    body: "Fully responsive: create and send invoices from your phone, tablet or desktop.",
  },
];

export const HOW_IT_WORKS_STEPS: FeatureItem[] = [
  {
    icon: PenLine,
    title: "Fill in the details",
    body: "Your business, your client, line items, tax and discounts.",
  },
  { icon: Download, title: "Download the PDF", body: "A clean, printer-friendly A4 invoice, instantly." },
  {
    icon: Send,
    title: "Track payment",
    body: "Save it to your dashboard and mark it paid when the money lands.",
  },
];

export const HOME_HIGHLIGHTS: FeatureItem[] = [
  {
    icon: Globe,
    title: "40+ currencies",
    body: "Local formatting for USD, EUR, GBP, PKR, INR, AED and more.",
  },
  {
    icon: Shield,
    title: "VAT & GST ready",
    body: "Tax presets for the EU, UK, US, India, Australia, Gulf and others.",
  },
  { icon: Users, title: "Client book", body: "Save clients once and fill invoices in one click." },
  { icon: BarChart3, title: "Live dashboard", body: "See paid, outstanding and overdue totals at a glance." },
];

export const TEMPLATE_USES: TemplateUse[] = [
  { title: "Freelancer invoice", body: "Hourly or fixed-price work with a clear payment due date." },
  {
    title: "Service business invoice",
    body: "Agencies, consultants and contractors billing multiple services.",
  },
  { title: "Product / sales invoice", body: "Quantities, unit prices, ship-to address and PO numbers." },
  { title: "VAT / GST invoice", body: "Tax rate presets with the tax shown separately from the subtotal." },
];

/** Sample rows shown in the template preview on /templates. */

/** Plan features shown per card in the home-page pricing teaser. */
export const TEASER_FEATURE_COUNT = 3;

export const ABOUT_MISSION =
  "Invoicing should take a minute, not an afternoon. We build simple tools that help small businesses get paid on time.";

export const ABOUT_STORY = [
  "InvoiceGen started as a free, no-sign-up invoice builder for people who just needed a clean PDF fast.",
  "As more freelancers and studios used it every month, we added what they asked for: saved clients, " +
    "payment tracking, revenue reports and plans that grow with the business.",
  "The builder is still free and still works without an account. That promise is not going away.",
];

export const ABOUT_VALUES: AboutValue[] = [
  {
    icon: Feather,
    title: "Simple by default",
    body: "Every screen should be obvious the first time you see it. If a feature needs a manual, we redesign it.",
  },
  {
    icon: HandCoins,
    title: "Honest pricing",
    body: "A real free plan, clear limits, no hidden fees, and a 14-day money-back guarantee on paid plans.",
  },
  {
    icon: ShieldCheck,
    title: "Your data is yours",
    body: "We never sell data, we keep only what we need, and you can export or delete everything at any time.",
  },
  {
    icon: Eye,
    title: "Built in the open",
    body: "Our code is on GitHub and our changelog lists every improvement, so you always know what changed.",
  },
];

/** Number of real currency codes / tax presets shown in the home bento. */
export const BENTO_CURRENCY_PREVIEW = 24;
export const BENTO_TAX_PREVIEW = 6;

/** Example invoice shown on marketing pages (rendered with the real preview component). */
export const SAMPLE_INVOICE_DRAFT: Partial<InvoiceData> = {
  invoiceNumber: 1047,
  currency: "GBP",
  businessName: "Harborlane Design Studio",
  bussinessInfo: "Unit 4, Canal Works, Leeds LS10 1PJ\nhello@harborlane.studio",
  clientName: "Meridian Freight Co.",
  clientAddress: "18 Dock Street, Hull HU1 3DL\naccounts@meridianfreight.co.uk",
  issueDate: "2026-10-02",
  dueDate: "2026-10-16",
  poNumber: "MF-2291",
  taxRate: 20,
  overallDiscount: 0,
  notes: "Thank you for working with us. Please pay by bank transfer.",
  terms: "Payment due within 14 days.",
  status: "pending",
  lineItems: [
    { id: "s1", description: "Brand identity refresh", quantity: 1, rate: 2850, discount: 0, amount: 0 },
    { id: "s2", description: "Website design, 5 pages", quantity: 1, rate: 3400, discount: 10, amount: 0 },
    { id: "s3", description: "Copywriting (hours)", quantity: 7.5, rate: 85, discount: 0, amount: 0 },
  ],
};

/** Features page clusters (titles must match FEATURES). */
export const FEATURE_GROUPS = [
  {
    title: "Create invoices fast",
    body: "Everything happens on one screen, with the PDF exactly as you see it.",
    features: ["Live preview", "One-click PDF", "Your branding", "Works everywhere"],
  },
  {
    title: "Any currency, any tax",
    body: "Bill clients at home or abroad with the right symbol, format and tax.",
    features: ["40+ currencies", "VAT, GST & sales tax"],
  },
  {
    title: "Run the business side",
    body: "Keep clients, payments and numbers in one place.",
    features: ["Client book", "Dashboard & reports", "CSV export", "Private by design"],
  },
];
