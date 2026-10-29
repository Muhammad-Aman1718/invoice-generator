import { Check } from "lucide-react";
import type { CountryChecklistProps } from "@/src/types/types";

export default function CountryChecklist({ items }: CountryChecklistProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold/25">
            <Check size={12} strokeWidth={3} className="text-navy" aria-hidden="true" />
          </span>
          <span className="leading-relaxed text-navy">{item}</span>
        </li>
      ))}
    </ul>
  );
}
