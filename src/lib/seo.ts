import type { Metadata } from "next";
import type { FaqItem, JsonLdData, SeoPageKey } from "@/src/types/types";
import { SITE_CONFIG } from "@/src/constant/site";
import { PLANS } from "@/src/constant/plans";
import {
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  PAGE_SEO,
  SEO_DEFAULT_TITLE,
  SEO_KEYWORDS,
  SEO_LOCALE,
  SEO_SAME_AS,
} from "@/src/constant/seo";

const SCHEMA_CONTEXT = "https://schema.org";

// A page's own `openGraph` replaces the root one, so the shared preview image is set explicitly.
const OG_IMAGE = { url: "/opengraph-image", alt: OG_IMAGE_ALT, ...OG_IMAGE_SIZE };
const TWITTER_IMAGE = { url: "/twitter-image", alt: OG_IMAGE_ALT, ...OG_IMAGE_SIZE };

export function getAbsoluteUrl(path: string): string {
  return path === "/" ? SITE_CONFIG.url : `${SITE_CONFIG.url}${path}`;
}

/** Title, description, canonical URL and social tags (with preview image) for a public page. */
export function buildPageMetadata(page: SeoPageKey): Metadata {
  const { path, title, description, keywords = [] } = PAGE_SEO[page];
  const fullTitle = page === "home" ? `${SITE_CONFIG.name} — ${title}` : `${title} | ${SITE_CONFIG.name}`;
  return {
    title: page === "home" ? { absolute: fullTitle } : title,
    description,
    keywords: [...keywords, ...SEO_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: SEO_LOCALE,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [TWITTER_IMAGE] },
  };
}

function buildOrganizationJsonLd(): JsonLdData {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.company,
    url: SITE_CONFIG.url,
    logo: getAbsoluteUrl("/apple-icon"),
    email: SITE_CONFIG.supportEmail,
    sameAs: SEO_SAME_AS,
  };
}

function buildWebsiteJsonLd(): JsonLdData {
  return {
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    inLanguage: "en",
  };
}

function buildApplicationJsonLd(): JsonLdData {
  return {
    "@type": "WebApplication",
    "@id": `${SITE_CONFIG.url}/#app`,
    name: `${SITE_CONFIG.name} — ${SEO_DEFAULT_TITLE}`,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    offers: Object.values(PLANS).map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} plan`,
      price: String(plan.price.month),
      priceCurrency: "USD",
    })),
    featureList: [
      "PDF invoice generation",
      "VAT/GST tax presets",
      "40+ currencies",
      "Client management",
      "Payment tracking and revenue reports",
    ],
    publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
  };
}

/** Site-wide structured data, rendered once in the root layout. */
export function buildSiteJsonLd(): JsonLdData {
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildApplicationJsonLd()],
  };
}

/** Home › Page breadcrumb trail for search results. */
export function buildBreadcrumbJsonLd(page: SeoPageKey): JsonLdData {
  const { path, title } = PAGE_SEO[page];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: title.split(" — ")[0], path },
  ];
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: getAbsoluteUrl(crumb.path),
    })),
  };
}

/** FAQ rich results (questions shown directly in Google). */
export function buildFaqJsonLd(faqs: FaqItem[]): JsonLdData {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** JSON for a <script type="application/ld+json">; `<` is escaped so content can't close the tag. */
export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
