import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import JsonLd from "@/src/components/seo/JsonLd";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import {
  buildArticleJsonLd,
  buildBlogPostMetadata,
  buildBreadcrumbJsonLd,
  getBlogPostPath,
} from "@/src/lib/seo";
import { BLOG_POSTS } from "@/src/constant/blog";
import { PAGE_SEO } from "@/src/constant/seo";
import type { BlogPostPageProps } from "@/src/types/types";

function findPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = findPost((await params).slug);
  return post ? buildBlogPostMetadata(post) : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={buildArticleJsonLd(post)} />
      <JsonLd data={buildBreadcrumbJsonLd("blog", { name: post.title, path: getBlogPostPath(post) })} />
      <article className="mx-auto max-w-2xl px-4 pb-16 pt-12 motion-safe:animate-fade-up sm:px-6 sm:pt-16">
        <Link
          href={PAGE_SEO.blog.path}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-500 hover:text-navy"
        >
          <ArrowLeft size={14} aria-hidden="true" /> All guides
        </Link>
        <div className="mb-4 flex items-center gap-3 text-xs font-semibold">
          <span className="rounded-full bg-gold/20 px-2.5 py-1 text-navy">{post.tag}</span>
          <time dateTime={post.publishedAt} className="text-navy-500">
            {post.date}
          </time>
        </div>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">{post.title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-navy-500">{post.intro}</p>
        <ol className="space-y-4">
          {post.body.map((point, index) => (
            <li key={point} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                {index + 1}
              </span>
              <p className="pt-1 leading-relaxed text-navy">{point}</p>
            </li>
          ))}
        </ol>
      </article>
      <TryBuilderCta />
    </>
  );
}
