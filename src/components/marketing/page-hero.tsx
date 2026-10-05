export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
      {eyebrow && (
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </span>
      )}
      <h1 className="mb-4 text-3xl font-black leading-tight text-navy sm:text-5xl">{title}</h1>
      {description && <p className="mx-auto max-w-2xl text-base leading-relaxed text-navy-500 sm:text-lg">{description}</p>}
      {children}
    </section>
  );
}
