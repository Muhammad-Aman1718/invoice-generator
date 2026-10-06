import Reveal from "@/src/components/ui/Reveal";
import { HOW_IT_WORKS_STEPS } from "@/src/constant/marketing";
import { CARD_STAGGER_MS } from "@/src/constant/theme";

export default function HowItWorks() {
  return (
    <section className="bg-white py-20" aria-labelledby="howTitle">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="howTitle" className="mb-4 text-3xl font-bold text-navy sm:text-4xl">
            How it works
          </h2>
          <p className="max-w-[40ch] text-base leading-relaxed text-navy-500">
            From a blank page to a paid invoice without leaving your browser.
          </p>
        </div>
        <ol className="divide-y divide-navy/[0.08]">
          {HOW_IT_WORKS_STEPS.map(({ icon: Icon, title, body }, index) => (
            <li key={title}>
              <Reveal className="flex gap-5 py-7 first:pt-0" delayMs={index * CARD_STAGGER_MS}>
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 text-xl font-bold text-navy">{title}</h3>
                  <p className="text-base leading-relaxed text-navy-500">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
