"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { ROUTES } from "@/src/constant/routes";

const TABS = [
  { href: ROUTES.settings, label: "General" },
  { href: ROUTES.notesSettings, label: "Notes & terms" },
];

export default function SettingsTabs() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Settings sections"
      className="flex gap-1 rounded-xl border border-navy/[0.08] bg-white p-1"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-[2.5rem] flex-1 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors sm:flex-none",
              active ? "bg-navy text-white" : "text-navy-500 hover:bg-mist hover:text-navy",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
