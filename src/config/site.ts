// Single source of truth for site-wide values (name, URL, contact, navigation).

function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "InvoiceGen",
  shortName: "Invoice Gen",
  url: resolveSiteUrl(),
  description:
    "Create professional, tax-ready invoices in seconds. Multi-currency, VAT/GST support, client management and instant PDF export.",
  supportEmail: "support@invoicegen.app",
  privacyEmail: "privacy@invoicegen.app",
  legalUpdated: "October 5, 2026",
  company: "InvoiceGen",
  social: {
    twitter: "https://twitter.com",
    github: "https://github.com/muhammad-aman1718/invoice-generator",
    linkedin: "https://linkedin.com",
  },
};

export const marketingNav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/help-center", label: "Help" },
];

export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/templates", label: "Templates" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/help-center", label: "Help Center" },
      { href: "/blog", label: "Blog" },
      { href: "/api-docs", label: "API Docs" },
      { href: "/status", label: "Status" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/gdpr-compliance", label: "GDPR Compliance" },
    ],
  },
];
