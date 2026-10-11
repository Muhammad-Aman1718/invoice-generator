import Reveal from "@/src/components/ui/Reveal";
import { TAX_TYPES } from "@/src/constant/taxTypes";
import { BENTO_TAX_PREVIEW } from "@/src/constant/marketing";
import type { FeatureSectionProps } from "@/src/types/types";

/** Full-width tinted band for a small group, with the real tax presets as proof. */
export default function FeatureSpotlight({ group }: FeatureSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Reveal className="grid gap-10 rounded-2xl bg-gold/15 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="mb-3 text-3xl font-bold text-navy">{group.title}</h2>
          <p className="mb-8 max-w-[48ch] text-navy-500">{group.body}</p>
          <div className="grid gap-8 sm:grid-cols-2">
            {group.features.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon size={22} className="mb-3 text-navy" aria-hidden="true" />
                <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
                <p className="leading-relaxed text-navy-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
        <ul className="self-center rounded-2xl bg-white p-6 shadow-card" aria-label="Some tax presets">
          {TAX_TYPES.slice(0, BENTO_TAX_PREVIEW).map((tax) => (
            <li key={tax.label} className="flex justify-between gap-4 py-2 text-navy">
              <span>{tax.label}</span>
              <span className="font-semibold tabular-nums">{tax.rate}%</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
