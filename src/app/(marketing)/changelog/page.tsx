import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import { RELEASES } from "@/src/constant/changelog";
import { SITE_CONFIG } from "@/src/constant/site";

export const metadata: Metadata = buildPageMetadata("changelog");

export default function ChangelogPage() {
  return (
    <>
      <PageJsonLd page="changelog" />
      <PageHero
        eyebrow="Changelog"
        title="What's new"
        description={`Every improvement to ${SITE_CONFIG.name}, newest first.`}
      />
      <ol className="mx-auto max-w-3xl space-y-6 px-4 pb-20 sm:px-6">
        {RELEASES.map((release) => (
          <li key={release.version} className="panel relative overflow-hidden p-6 sm:p-8">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-gold" />
            <div className="mb-4 flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-black text-navy">{release.version}</h2>
              <span className="text-sm font-semibold text-navy-500">{release.date}</span>
            </div>
            <ul className="space-y-2">
              {release.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-navy-500">
                  <span className="text-gold-dark">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </>
  );
}
