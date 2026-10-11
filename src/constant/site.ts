import { Clock, Github, Mail, ShieldCheck } from "lucide-react";
import type { ContactChannel, FooterColumn, NavLink } from "@/src/types/types";
import { getSiteUrl } from "@/src/lib/siteUrl";

export const SITE_CONFIG = {
  name: "InvoiceGen",
  shortName: "Invoice Gen",
  url: getSiteUrl(),
  description:
    "Create professional, tax-ready invoices in seconds. Multi-currency, VAT/GST support, client management and instant PDF export.",
  supportEmail: "support@invoicegen.app",
  privacyEmail: "privacy@invoicegen.app",
  legalUpdated: "October 5, 2026",
  company: "InvoiceGen",
  // Only real profiles belong here; add X/LinkedIn once those accounts exist.
  social: {
    github: "https://github.com/muhammad-aman1718/invoice-generator",
  },
};

export const MARKETING_NAV: NavLink[] = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/help-center", label: "Help" },
];

export const FOOTER_NAV: FooterColumn[] = [
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
      { href: "/about", label: "About" },
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

export const SOCIAL_LINKS = [{ icon: Github, label: "GitHub", href: SITE_CONFIG.social.github }];

export const LEGAL_LINKS: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/gdpr-compliance", label: "GDPR" },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Mail,
    title: "Support & billing",
    body: SITE_CONFIG.supportEmail,
    href: `mailto:${SITE_CONFIG.supportEmail}`,
  },
  {
    icon: ShieldCheck,
    title: "Privacy requests",
    body: SITE_CONFIG.privacyEmail,
    href: `mailto:${SITE_CONFIG.privacyEmail}`,
  },
  { icon: Clock, title: "Response time", body: "Within 2 business days (24h on Business)" },
];

export const EMPTY_CONTACT_MESSAGE = { name: "", email: "", subject: "", message: "" };
