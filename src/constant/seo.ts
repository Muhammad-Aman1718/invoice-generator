// ─────────────────────────────────────────────────────────────────────────────
//  SEO settings — edit this file to change titles, descriptions, keywords and
//  the sitemap. Every public page reads its metadata from PAGE_SEO.
//
//  Tips: keep titles under ~50 characters (" | InvoiceGen" is appended) and
//  descriptions between 120 and 160 characters.
// ─────────────────────────────────────────────────────────────────────────────

import type { PageSeo, SeoPageKey } from "@/src/types/types";

/** Bump when page content changes; used as `lastmod` in the sitemap. */
export const SEO_LAST_UPDATED = "2026-10-06";

/** Default title used on the home page, in link previews and the OG image. */
export const SEO_DEFAULT_TITLE = "Free Invoice Generator & PDF Invoice Maker";

export const SEO_TAGLINE = "Create professional invoices in seconds. Free, no sign-up needed.";

/** Site-wide keywords, merged with each page's own keywords. */
export const SEO_KEYWORDS = [
  "invoice generator",
  "free invoice generator",
  "PDF invoice maker",
  "online invoice maker",
  "invoice template",
  "VAT invoice",
  "GST invoice",
  "freelancer invoice",
  "small business invoicing",
];

export const SEO_LOCALE = "en_US";

/**
 * Public profiles of the business, shown to search engines as `sameAs`.
 * Add your real X/Twitter, LinkedIn or Facebook page URLs here.
 */
export const SEO_SAME_AS = ["https://github.com/muhammad-aman1718/invoice-generator"];

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const APPLE_ICON_SIZE = { width: 180, height: 180 };
export const OG_IMAGE_ALT = "InvoiceGen, the free invoice generator and PDF invoice maker";

export const PAGE_SEO: Record<SeoPageKey, PageSeo> = {
  home: {
    path: "/",
    title: SEO_DEFAULT_TITLE,
    description:
      "Create professional invoices online in seconds. Free invoice generator with PDF download, " +
      "40+ currencies, VAT/GST presets, logo upload and client management.",
    keywords: ["create invoice online", "invoice maker free", "bill generator"],
    priority: 1,
    changeFrequency: "weekly",
  },
  about: {
    path: "/about",
    title: "About Us",
    description:
      "InvoiceGen helps freelancers and small businesses send professional invoices and get paid " +
      "on time. Learn who we are and what we care about.",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  features: {
    path: "/features",
    title: "Features: Invoicing Made Simple",
    description:
      "Live preview, instant PDF export, 40+ currencies, VAT/GST presets, saved clients, payment " +
      "tracking and revenue reports. Everything you need to invoice clients.",
    keywords: ["invoice software features", "invoice tracking", "payment tracking"],
    priority: 0.8,
    changeFrequency: "monthly",
  },
  pricing: {
    path: "/pricing",
    title: "Pricing: Free, Pro & Business Plans",
    description:
      "Start free with no card required. Upgrade to Pro or Business for unlimited invoices, clients, " +
      "reports and CSV export. Cancel anytime.",
    keywords: ["invoice software pricing", "free invoicing app"],
    priority: 0.9,
    changeFrequency: "monthly",
  },
  templates: {
    path: "/templates",
    title: "Free Invoice Template: Download as PDF",
    description:
      "Free professional invoice template with your logo, taxes and discounts. Fill it in online and " +
      "download a print-ready PDF in seconds.",
    keywords: ["free invoice template", "invoice template PDF", "invoice format", "invoice sample"],
    priority: 0.8,
    changeFrequency: "monthly",
  },
  blog: {
    path: "/blog",
    title: "Invoicing Tips & Guides",
    description:
      "Practical guides on what an invoice must include, getting paid faster, and VAT, GST and sales " +
      "tax basics for freelancers and small businesses.",
    keywords: ["how to write an invoice", "invoice tips", "get paid faster"],
    priority: 0.6,
    changeFrequency: "weekly",
  },
  helpCenter: {
    path: "/help-center",
    title: "Help Center: Invoicing FAQ",
    description:
      "Answers to common questions about creating invoices, PDF downloads, taxes, plans, billing and " +
      "your data in InvoiceGen.",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  changelog: {
    path: "/changelog",
    title: "Changelog: What's New",
    description: "New features, improvements and fixes in InvoiceGen, newest first.",
    priority: 0.4,
    changeFrequency: "monthly",
  },
  apiDocs: {
    path: "/api-docs",
    title: "API Reference",
    description:
      "REST API reference for InvoiceGen: invoices, clients, profile, billing and account endpoints " +
      "with request and response examples.",
    keywords: ["invoice API", "invoicing REST API"],
    priority: 0.4,
    changeFrequency: "monthly",
  },
  contact: {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with the InvoiceGen team for product support, billing questions or privacy " +
      "requests. We reply within 2 business days, or 24 hours on Business.",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  status: {
    path: "/status",
    title: "System Status",
    description: "Live status of InvoiceGen services: the invoice builder, accounts, database and payments.",
    priority: 0.3,
    changeFrequency: "daily",
  },
  privacyPolicy: {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "How InvoiceGen collects, uses, shares and protects your personal data, and your rights.",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  termsOfService: {
    path: "/terms-of-service",
    title: "Terms of Service",
    description:
      "The terms that govern your use of InvoiceGen, including accounts, subscriptions and acceptable use.",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  refundPolicy: {
    path: "/refund-policy",
    title: "Refund & Cancellation Policy",
    description: "How cancellations, refunds, renewals and plan changes work for InvoiceGen subscriptions.",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  cookiePolicy: {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description: "The cookies and browser storage InvoiceGen uses, and how you can control them.",
    priority: 0.2,
    changeFrequency: "yearly",
  },
  gdprCompliance: {
    path: "/gdpr-compliance",
    title: "GDPR Compliance",
    description: "How InvoiceGen supports GDPR and UK GDPR obligations for you and your customers.",
    priority: 0.2,
    changeFrequency: "yearly",
  },
};
