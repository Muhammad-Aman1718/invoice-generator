import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import { BLOG_POSTS } from "@/src/constant/blog";

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
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        {BLOG_POSTS.map((post) => (
          <article key={post.title} className="panel p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-3 text-xs font-bold">
              <span className="rounded-full bg-gold/20 px-2.5 py-1 text-navy">{post.tag}</span>
              <span className="text-navy-500">{post.date}</span>
            </div>
            <h2 className="mb-4 text-xl font-black text-navy sm:text-2xl">{post.title}</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-navy-500 marker:text-gold-dark">
              {post.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
