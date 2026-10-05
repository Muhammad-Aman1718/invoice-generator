import {
  BarChart3,
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
import type { FeatureItem, TemplateUse } from "@/src/types/types";

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
