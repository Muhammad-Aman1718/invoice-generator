import Link from "next/link";
import { LEGAL_LINKS } from "@/src/constant/site";
import type { LegalNavProps } from "@/src/types/types";

export default function LegalNav({ sections, current }: LegalNavProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav aria-label="On this page" className="panel p-4">
        <p className="eyebrow mb-3">On this page</p>
        <ol className="space-y-1.5 text-sm">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="flex gap-2 text-navy-500 transition hover:text-navy">
                <span className="w-5 flex-shrink-0 text-xs font-bold text-gold-dark">{index + 1}.</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <nav aria-label="Legal documents" className="mt-4 hidden flex-wrap gap-2 lg:flex">
        {LEGAL_LINKS.filter((link) => link.href !== current).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-white px-3 py-1 text-xs font-bold text-navy hover:bg-gold/20"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
