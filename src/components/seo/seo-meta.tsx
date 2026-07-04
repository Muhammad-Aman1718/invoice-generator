import type { Metadata } from "next";

export interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

/**
 * Dedicated SEO component. Use in layout.tsx or page-level metadata exports.
 */
export function createSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
}: SEOMetaProps): Metadata {
  const baseUrl =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "Invoice Generator",
      locale: "en_US",
      type: "website",
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
