import Link from "next/link";
import { getCountryLabel } from "@/src/constant/countries";
import { getDocumentTitleLabel } from "@/src/constant/invoice";
import type { CountryCardProps } from "@/src/types/types";

/** Side card: the tax at a glance and how to set the builder up. */
export default function CountryFacts({ guide }: CountryCardProps) {
  const facts = [
    { label: "Tax", value: guide.taxName },
    { label: "Rates", value: guide.rates },
    { label: "Currency", value: guide.currency },
  ];
  const steps = [
    `Document type: ${getDocumentTitleLabel(guide.setup.documentTitle)}`,
    `Currency: ${guide.currency}`,
    `Tax: ${guide.setup.presetText}`,
    "Your tax number in Your business details",
  ];
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl bg-navy p-6 text-white">
        <h2 className="mb-4 text-lg font-bold">At a glance</h2>
        <dl className="space-y-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                {fact.label}
              </dt>
              <dd className="font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="panel p-6">
        <h2 className="mb-3 text-lg font-bold text-navy">Set up in one click</h2>
        <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-sm text-navy-500 marker:font-semibold marker:text-navy">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <Link href={`/?country=${guide.slug}#builder`} className="btn-primary w-full">
          Create a {getCountryLabel(guide)} invoice
        </Link>
      </div>
    </aside>
  );
}
