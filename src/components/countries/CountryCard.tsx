import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCountryLabel } from "@/src/constant/countries";
import { getCountryPath } from "@/src/lib/seo";
import type { CountryCardProps } from "@/src/types/types";

export default function CountryCard({ guide }: CountryCardProps) {
  return (
    <Link
      href={getCountryPath(guide)}
      className="panel group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span className="mb-3 inline-flex w-fit rounded-lg bg-navy px-2 py-1 font-display text-xs font-bold text-gold">
        {guide.currency}
      </span>
      <h3 className="mb-1 text-lg font-bold text-navy">Invoice generator for {getCountryLabel(guide)}</h3>
      <p className="mb-4 flex-1 text-sm text-navy-500">
        {guide.taxName}: {guide.rates}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
        See requirements
        <ArrowRight size={14} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
