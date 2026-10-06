import type { Metadata } from "next";
import PageHero from "@/src/components/marketing/PageHero";
import TryBuilderCta from "@/src/components/marketing/TryBuilderCta";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import { buildPageMetadata } from "@/src/lib/seo";
import { ABOUT_MISSION, ABOUT_STORY, ABOUT_VALUES } from "@/src/constant/marketing";
import { CARD_STAGGER_MS } from "@/src/constant/theme";

export const metadata: Metadata = buildPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageJsonLd page="about" />
      <PageHero eyebrow="About us" title="We make getting paid simple" description={ABOUT_MISSION} />
      <section className="mx-auto max-w-3xl px-4 pb-14 sm:px-6" aria-labelledby="storyTitle">
        <div className="panel p-6 sm:p-10">
          <h2 id="storyTitle" className="mb-4 text-2xl font-bold text-navy">
            Our story
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-navy-500">
            {ABOUT_STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6" aria-labelledby="valuesTitle">
        <h2 id="valuesTitle" className="mb-8 text-center text-2xl font-bold text-navy sm:text-3xl">
          What we care about
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2">
          {ABOUT_VALUES.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              className="panel flex gap-4 p-6 motion-safe:animate-fade-up"
              style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1 font-bold text-navy">{title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <TryBuilderCta />
    </>
  );
}
