import Reveal from "@/src/components/ui/Reveal";
import { CARD_STAGGER_MS } from "@/src/constant/theme";
import type { FeatureSectionProps } from "@/src/types/types";

/** Heading on the left, features in a 2-column list on the right (no card boxes). */
export default function FeatureList({ group }: FeatureSectionProps) {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:px-8">
      <div>
        <h2 className="mb-3 text-3xl font-bold text-navy">{group.title}</h2>
        <p className="max-w-[40ch] text-navy-500">{group.body}</p>
      </div>
      <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {group.features.map(({ icon: Icon, title, body }, index) => (
          <li key={title}>
            <Reveal delayMs={index * CARD_STAGGER_MS}>
              <Icon size={22} className="mb-3 text-gold-dark" aria-hidden="true" />
              <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
              <p className="leading-relaxed text-navy-500">{body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
