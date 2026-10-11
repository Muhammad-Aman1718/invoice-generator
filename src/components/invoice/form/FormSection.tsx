import type { FormSectionProps } from "@/src/types/types";

/** One titled card of the invoice form (fields grouped by meaning). */
export default function FormSection({ title, description, children }: FormSectionProps) {
  const headingId = `${title.replace(/\W+/g, "")}Heading`;
  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl border border-navy/[0.08] bg-white p-5 shadow-card sm:p-6"
    >
      <div className="mb-5">
        <h2 id={headingId} className="text-base font-bold text-navy">
          {title}
        </h2>
        {description && <p className="mt-0.5 text-sm text-navy-500">{description}</p>}
      </div>
      {children}
    </section>
  );
}
