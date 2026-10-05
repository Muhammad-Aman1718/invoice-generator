import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { isNavItemActive } from "@/src/lib/navigation";
import type { NavSectionProps } from "@/src/types/types";

export default function NavSection({ title, items, pathname }: NavSectionProps) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-widest text-white/40">{title}</p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active = isNavItemActive(pathname, item);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border-l-2 px-3 py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "border-gold bg-gold/[0.12] text-gold"
                    : "border-transparent text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
