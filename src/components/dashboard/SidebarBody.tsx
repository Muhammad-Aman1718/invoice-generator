import Link from "next/link";
import { Plus, X } from "lucide-react";
import BrandLogo from "@/src/components/layout/BrandLogo";
import NavSection from "./NavSection";
import PlanUsageCard from "./PlanUsageCard";
import SidebarUser from "./SidebarUser";
import { SIDEBAR_ACCOUNT_NAV, SIDEBAR_ADMIN_NAV, SIDEBAR_WORKSPACE_NAV } from "@/src/constant/navigation";
import { ROUTES } from "@/src/constant/routes";
import type { SidebarBodyProps } from "@/src/types/types";

export default function SidebarBody({ viewer, pathname, onClose, onLogout }: SidebarBodyProps) {
  return (
    <div className="flex h-full flex-col bg-navy">
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/[0.07] px-5">
        <BrandLogo href={ROUTES.dashboard} size="sm" />
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="px-3 pt-4">
        <Link href={ROUTES.newInvoice} className="btn-primary w-full">
          <Plus size={16} /> New invoice
        </Link>
      </div>
      <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="Dashboard">
        <NavSection title="Workspace" items={SIDEBAR_WORKSPACE_NAV} pathname={pathname} />
        <NavSection title="Account" items={SIDEBAR_ACCOUNT_NAV} pathname={pathname} />
        {viewer.role === "admin" && (
          <NavSection title="Admin" items={SIDEBAR_ADMIN_NAV} pathname={pathname} />
        )}
      </nav>
      <div className="flex-shrink-0 space-y-3 border-t border-white/[0.07] p-3">
        <PlanUsageCard viewer={viewer} />
        <SidebarUser viewer={viewer} onLogout={onLogout} />
      </div>
    </div>
  );
}
