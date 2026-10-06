import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/src/lib/seo";
import { PAGE_SEO, SEO_LAST_UPDATED } from "@/src/constant/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_SEO).map((page) => ({
    url: getAbsoluteUrl(page.path),
    lastModified: SEO_LAST_UPDATED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
