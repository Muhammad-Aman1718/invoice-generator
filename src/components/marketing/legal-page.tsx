import Link from "next/link";
import { siteConfig } from "@/src/config/site";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/gdpr-compliance", label: "GDPR" },
];

export function LegalPage({
  title,
  intro,
  sections,
  current,
}: {
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
  current: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="mb-3 text-3xl font-black text-navy sm:text-5xl">{title}</h1>
        <p className="text-sm font-semibold text-navy-500">Last updated: {siteConfig.legalUpdated}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page" className="panel p-4">
            <p className="eyebrow mb-3">On this page</p>
            <ol className="space-y-1.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 text-navy-500 transition hover:text-navy">
                    <span className="w-5 flex-shrink-0 text-xs font-black text-gold-dark">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <nav aria-label="Legal documents" className="mt-4 hidden flex-wrap gap-2 lg:flex">
            {LEGAL_LINKS.filter((l) => l.href !== current).map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy hover:bg-gold/20">
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="prose-legal panel min-w-0 p-6 sm:p-10">
          <div className="[&>p:first-child]:text-base">{intro}</div>
          {sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
          <hr className="my-10 border-navy/10" />
          <p>
            Questions about this document? Email{" "}
            <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a> or use our{" "}
            <Link href="/contact">contact form</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
