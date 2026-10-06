import type { PageHeroProps } from "@/src/types/types";

export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 motion-safe:animate-fade-up sm:px-6 sm:pt-20 lg:px-8">
      <div className="max-w-3xl">
        {eyebrow && (
          <span className="mb-5 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">
            {eyebrow}
          </span>
        )}
        <h1 className="mb-4 text-4xl font-extrabold leading-[1.08] text-navy sm:text-5xl">{title}</h1>
        {description && <p className="max-w-[60ch] text-lg leading-relaxed text-navy-500">{description}</p>}
        {children}
      </div>
    </section>
  );
}
