import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/src/constant/site";
import { SITEMAP_PAGES } from "@/src/constant/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SITEMAP_PAGES.map((page) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
