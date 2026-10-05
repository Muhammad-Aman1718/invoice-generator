import type { FaqListProps } from "@/src/types/types";

export default function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="panel group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
            {item.q}
            <span className="text-xl text-gold-dark transition group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-navy-500">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
