import type { MetadataRoute } from "next";
import { getAbsoluteUrl, getBlogPostPath } from "@/src/lib/seo";
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
  return [...pages, ...posts];
}
