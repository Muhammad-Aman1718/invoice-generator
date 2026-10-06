import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata, getBlogPostPath } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import { BLOG_POSTS } from "@/src/constant/blog";
import { CARD_STAGGER_MS } from "@/src/constant/theme";

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
      <div className="mx-auto grid max-w-5xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-3">
        {BLOG_POSTS.map((post, index) => (
          <Link
            key={post.slug}
            href={getBlogPostPath(post)}
            className="panel group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift motion-safe:animate-fade-up"
            style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
          >
            <div className="mb-3 flex items-center gap-3 text-xs font-semibold">
              <span className="rounded-full bg-gold/20 px-2.5 py-1 text-navy">{post.tag}</span>
              <time dateTime={post.publishedAt} className="text-navy-500">
                {post.date}
              </time>
            </div>
            <h2 className="mb-2 text-lg font-bold leading-snug text-navy">{post.title}</h2>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-navy-500">{post.excerpt}</p>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
              Read guide
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
