import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import type { SetupChecklistProps } from "@/src/types/types";

export default function SetupChecklist({ items }: SetupChecklistProps) {
  const doneCount = items.filter((item) => item.done).length;
  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="setupTitle">
      <h2 id="setupTitle" className="mb-1 text-base font-bold text-navy">
        Get set up
      </h2>
      <p className="mb-4 text-xs text-navy-500">
        {doneCount} of {items.length} done
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-mist"
            >
              {item.done ? (
                <CheckCircle2 size={18} className="flex-shrink-0 text-emerald-600" />
              ) : (
                <Circle size={18} className="flex-shrink-0 text-navy-300" />
              )}
              <span className={item.done ? "text-navy-400 line-through" : ""}>{item.label}</span>
              {!item.done && <ArrowRight size={14} className="ml-auto text-navy-400" />}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
