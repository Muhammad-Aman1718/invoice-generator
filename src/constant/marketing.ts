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
import type { AboutValue, FeatureItem, TemplateUse } from "@/src/types/types";

export const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: "Live preview",
    body: "Every keystroke updates a print-ready preview, side by side on desktop or in a tab on mobile.",
  },
  {
    icon: Download,
    title: "One-click PDF",
    body: "Crisp A4 PDFs with page numbers and repeating headers — even for 100+ line items.",
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
    body: "Fully responsive — create and send invoices from your phone, tablet or desktop.",
  },
];

export const HOW_IT_WORKS_STEPS: FeatureItem[] = [
  {
    icon: PenLine,
    title: "Fill in the details",
    body: "Your business, your client, line items, tax and discounts.",
  },
  { icon: Download, title: "Download the PDF", body: "A clean, printer-friendly A4 invoice — instantly." },
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
export const TEMPLATE_MOCKUP_LINES = [
  { description: "Brand identity", amount: "£1,200.00" },
  { description: "Website design", amount: "£2,400.00" },
  { description: "Hosting (12 mo)", amount: "£180.00" },
];
export const TEMPLATE_MOCKUP_TOTAL = "£4,536.00";

/** Plan features shown per card in the home-page pricing teaser. */
export const TEASER_FEATURE_COUNT = 3;

export const ABOUT_MISSION =
  "Invoicing should take a minute, not an afternoon. We build simple tools that help freelancers and " +
  "small businesses look professional, stay tax-ready and get paid on time.";

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
