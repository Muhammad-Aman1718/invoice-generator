import Link from "next/link";
import { Menu, Plus } from "lucide-react";
import BrandLogo from "@/src/components/layout/BrandLogo";
import { ROUTES } from "@/src/constant/routes";
import type { MobileTopBarProps } from "@/src/types/types";

export default function MobileTopBar({ onMenuOpen }: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 bg-navy px-4 shadow-lg lg:hidden">
      <button
        onClick={onMenuOpen}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </button>
      <BrandLogo href={ROUTES.dashboard} size="sm" />
      <Link
        href={ROUTES.newInvoice}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-navy"
        aria-label="New invoice"
      >
        <Plus size={18} />
      </Link>
    </header>
  );
}
