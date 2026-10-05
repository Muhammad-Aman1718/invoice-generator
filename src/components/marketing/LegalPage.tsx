import Link from "next/link";
import LegalNav from "./LegalNav";
import { SITE_CONFIG } from "@/src/constant/site";
import type { LegalPageProps } from "@/src/types/types";

export default function LegalPage({ title, intro, sections, current }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="mb-3 text-3xl font-black text-navy sm:text-5xl">{title}</h1>
        <p className="text-sm font-semibold text-navy-500">Last updated: {SITE_CONFIG.legalUpdated}</p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <LegalNav sections={sections} current={current} />
        <article className="prose-legal panel min-w-0 p-6 sm:p-10">
          {intro}
          {sections.map((section, index) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>
                {index + 1}. {section.title}
              </h2>
              {section.body}
            </section>
          ))}
          <hr className="my-10 border-navy/10" />
          <p>
            Questions about this document? Email{" "}
            <a href={`mailto:${SITE_CONFIG.privacyEmail}`}>{SITE_CONFIG.privacyEmail}</a> or use our{" "}
            <Link href="/contact">contact form</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
