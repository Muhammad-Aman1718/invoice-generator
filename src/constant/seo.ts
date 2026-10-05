import type { SitemapPage } from "@/src/types/types";

export const SITEMAP_PAGES: SitemapPage[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/templates", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/help-center", priority: 0.6, changeFrequency: "monthly" },
  { path: "/changelog", priority: 0.4, changeFrequency: "monthly" },
  { path: "/api-docs", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/status", priority: 0.3, changeFrequency: "daily" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/gdpr-compliance", priority: 0.2, changeFrequency: "yearly" },
];
