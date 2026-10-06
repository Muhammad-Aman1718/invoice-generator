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
      <section
        className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:px-8"
        aria-labelledby="storyTitle"
      >
        <h2 id="storyTitle" className="text-3xl font-bold text-navy">
          Our story
        </h2>
        <div className="max-w-[65ch] space-y-4 text-lg leading-relaxed text-navy-500">
          {ABOUT_STORY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="border-t border-navy/[0.07] bg-white py-16" aria-labelledby="valuesTitle">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="valuesTitle" className="mb-10 text-3xl font-bold text-navy">
            What we care about
          </h2>
          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {ABOUT_VALUES.map(({ icon: Icon, title, body }, index) => (
              <li
                key={title}
                className="flex gap-4 motion-safe:animate-fade-up"
                style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
                  <p className="leading-relaxed text-navy-500">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TryBuilderCta />
    </>
  );
}
