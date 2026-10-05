import type { FeatureGridProps } from "@/src/types/types";

export default function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title} className="panel p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
            <Icon size={20} className="text-gold" aria-hidden="true" />
          </span>
          <h2 className="mb-1.5 text-lg font-black text-navy">{title}</h2>
          <p className="text-sm leading-relaxed text-navy-500">{body}</p>
        </li>
      ))}
    </ul>
  );
}
