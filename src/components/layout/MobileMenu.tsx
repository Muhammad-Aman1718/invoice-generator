import Link from "next/link";
import { MARKETING_NAV } from "@/src/constant/site";
import { ROUTES } from "@/src/constant/routes";
import { cn } from "@/src/lib/utils";
import type { MobileMenuProps } from "@/src/types/types";

export default function MobileMenu({ open, signedIn, pathname }: MobileMenuProps) {
  const links = signedIn ? MARKETING_NAV : [...MARKETING_NAV, { href: ROUTES.login, label: "Sign in" }];
  return (
    <div
      id="mobile-menu"
      className={cn(
        "overflow-hidden transition-all md:hidden",
        open ? "max-h-96 border-t border-navy/[0.07]" : "max-h-0",
      )}
    >
      <ul className="space-y-1 px-4 py-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block rounded-xl px-3 py-2.5 text-sm font-semibold",
                pathname === item.href ? "bg-navy/[0.06] text-navy" : "text-navy-500",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
