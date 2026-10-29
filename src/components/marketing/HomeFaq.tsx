import Link from "next/link";
import FaqList from "./FaqList";
import { HOME_FAQS } from "@/src/constant/faq";
import { COUNTRY_GUIDES, getCountryLabel } from "@/src/constant/countries";
import { getCountryPath } from "@/src/lib/seo";

/** FAQ plus links to the country guides (internal links for search engines and people). */
export default function HomeFaq() {
  return (
    <section
      className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8"
      aria-labelledby="homeFaqTitle"
    >
      <div>
        <h2 id="homeFaqTitle" className="mb-3 text-3xl font-bold text-navy sm:text-4xl">
          Free invoice generator questions
        </h2>
        <p className="mb-8 text-navy-500">Everything you need to know before your first invoice.</p>
        <h3 className="mb-3 text-sm font-semibold text-navy">Invoice rules by country</h3>
        <ul className="flex flex-wrap gap-2">
          {COUNTRY_GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={getCountryPath(guide)}
                className="inline-flex min-h-[2.25rem] items-center rounded-full border border-navy/15 bg-white px-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-mist"
              >
                {getCountryLabel(guide)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <FaqList items={HOME_FAQS} />
      </div>
    </section>
  );
}
