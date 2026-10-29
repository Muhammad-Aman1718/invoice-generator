import type { MetadataRoute } from "next";
import { getAbsoluteUrl, getBlogPostPath, getCountryPath } from "@/src/lib/seo";
import { COUNTRY_GUIDES, COUNTRY_GUIDES_REVIEWED } from "@/src/constant/countries";
import { PAGE_SEO, SEO_LAST_UPDATED } from "@/src/constant/seo";
import { BLOG_POSTS } from "@/src/constant/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(PAGE_SEO).map((page) => ({
    url: getAbsoluteUrl(page.path),
    lastModified: SEO_LAST_UPDATED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  const posts = BLOG_POSTS.map((post) => ({
    url: getAbsoluteUrl(getBlogPostPath(post)),
    lastModified: post.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  const countries = COUNTRY_GUIDES.map((guide) => ({
    url: getAbsoluteUrl(getCountryPath(guide)),
    lastModified: COUNTRY_GUIDES_REVIEWED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...countries, ...posts];
}
