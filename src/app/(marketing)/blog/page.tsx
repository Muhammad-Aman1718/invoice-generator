import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata, getBlogPostPath } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import { BLOG_POSTS } from "@/src/constant/blog";
import { CARD_STAGGER_MS } from "@/src/constant/theme";
import { cn } from "@/src/lib/utils";

export const metadata: Metadata = buildPageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <PageJsonLd page="blog" />
      <PageHero
        eyebrow="Blog"
        title="Invoicing, simplified"
        description="Practical guides for freelancers and small businesses."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:px-8">
        {BLOG_POSTS.map((post, index) => (
          <Link
            key={post.slug}
            href={getBlogPostPath(post)}
            className={cn(
              "panel group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift motion-safe:animate-fade-up",
              index === 0 && "bg-navy text-white md:row-span-2 md:p-10",
            )}
            style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
          >
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold">
              <span
                className={cn(
                  "rounded-full px-2.5 py-1",
                  index === 0 ? "bg-gold text-navy" : "bg-gold/20 text-navy",
                )}
              >
                {post.tag}
              </span>
              <time dateTime={post.publishedAt} className={index === 0 ? "text-navy-100" : "text-navy-500"}>
                {post.date}
              </time>
            </div>
            <h2
              className={cn(
                "mb-2 font-bold leading-snug",
                index === 0 ? "text-3xl text-white" : "text-lg text-navy",
              )}
            >
              {post.title}
            </h2>
            <p
              className={cn(
                "mb-5 flex-1 leading-relaxed",
                index === 0 ? "text-lg text-navy-100" : "text-sm text-navy-500",
              )}
            >
              {post.excerpt}
            </p>
            <span
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold",
                index === 0 ? "text-gold" : "text-navy",
              )}
            >
              Read guide
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
