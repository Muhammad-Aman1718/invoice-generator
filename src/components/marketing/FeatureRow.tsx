import Reveal from "@/src/components/ui/Reveal";
import { CARD_STAGGER_MS } from "@/src/constant/theme";
import type { FeatureSectionProps } from "@/src/types/types";

/** Heading on top, features in one row underneath, separated by a single top rule. */
export default function FeatureRow({ group }: FeatureSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-3 text-3xl font-bold text-navy">{group.title}</h2>
      <p className="mb-10 max-w-[48ch] text-navy-500">{group.body}</p>
      <ul className="grid gap-8 border-t border-navy/[0.1] pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {group.features.map(({ icon: Icon, title, body }, index) => (
          <li key={title}>
            <Reveal delayMs={index * CARD_STAGGER_MS}>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
              <p className="leading-relaxed text-navy-500">{body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
