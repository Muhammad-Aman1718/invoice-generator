"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  Shield,
  Users,
  UserCog,
  X,
  Receipt,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/src/lib/supabase/client";
import { cn } from "@/src/lib/utils";
import { useInvoiceStore } from "@/src/lib/invoice-store";

export interface ShellViewer {
  email: string;
  name: string;
  role: "user" | "admin";
  planName: string;
  isPaid: boolean;
  usage: { used: number; limit: number | null };
}

const MAIN_NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt, exact: false, notIn: ["/dashboard/invoices/new"] },
  { href: "/dashboard/clients", label: "Clients", icon: Users, exact: false },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3, exact: false },
];

const ACCOUNT_NAV = [
  { href: "/dashboard/billing", label: "Billing & Plan", icon: CreditCard, exact: false },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

const ADMIN_NAV = [
  { href: "/dashboard/admin", label: "Admin overview", icon: Shield, exact: true },
  { href: "/dashboard/admin/users", label: "Users & plans", icon: UserCog, exact: false },
];

type NavItem = (typeof MAIN_NAV)[number] | (typeof ACCOUNT_NAV)[number];

function isActive(pathname: string, item: NavItem & { notIn?: string[] }) {
  if (item.notIn?.includes(pathname)) return false;
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavSection({ title, items, pathname }: { title: string; items: NavItem[]; pathname: string }) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-widest text-white/40">{title}</p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item);
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

function SidebarBody({
  viewer,
  pathname,
  onClose,
  onLogout,
}: {
  viewer: ShellViewer;
  pathname: string;
  onClose?: () => void;
  onLogout: () => void;
}) {
  const { used, limit } = viewer.usage;
  const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <div className="flex h-full flex-col bg-navy">
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/[0.07] px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold">
            <FileText size={15} className="text-navy" />
          </span>
          <span className="text-base font-black tracking-tight text-white">
            Invoice<span className="text-gold">Gen</span>
          </span>
        </Link>
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
        <Link href="/dashboard/invoices/new" className="btn-primary w-full">
          <Plus size={16} /> New invoice
        </Link>
      </div>

      <nav className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="Dashboard">
        <NavSection title="Workspace" items={MAIN_NAV} pathname={pathname} />
        <NavSection title="Account" items={ACCOUNT_NAV} pathname={pathname} />
        {viewer.role === "admin" && <NavSection title="Admin" items={ADMIN_NAV} pathname={pathname} />}
      </nav>

      <div className="flex-shrink-0 space-y-3 border-t border-white/[0.07] p-3">
        <div className="rounded-xl bg-white/[0.06] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-black text-white">{viewer.planName} plan</span>
            {!viewer.isPaid && (
              <Link href="/dashboard/billing" className="flex items-center gap-1 text-[11px] font-black text-gold hover:underline">
                <Sparkles size={11} /> Upgrade
              </Link>
            )}
          </div>
          {limit ? (
            <>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn("h-full rounded-full", pct >= 90 ? "bg-red-400" : "bg-gold")}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-white/60">
                {used} / {limit} invoices this month
              </p>
            </>
          ) : (
            <p className="text-[11px] text-white/60">Unlimited invoices</p>
          )}
        </div>

        <div className="flex items-center gap-2.5 px-1">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-black uppercase text-gold">
            {(viewer.name || viewer.email).slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">{viewer.name || "My account"}</p>
            <p className="truncate text-[11px] text-white/50">{viewer.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg p-2 text-white/50 transition hover:bg-red-500/15 hover:text-red-300"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function DashboardShell({ viewer, children }: { viewer: ShellViewer; children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const resetInvoice = useInvoiceStore((s) => s.resetInvoice);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    resetInvoice();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-[100dvh] bg-mist">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100dvh] w-64 flex-shrink-0 lg:block">
        <SidebarBody viewer={viewer} pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[65] bg-navy/50 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-[70] h-full w-[272px] max-w-[85vw] transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
        aria-hidden={!open}
      >
        <SidebarBody viewer={viewer} pathname={pathname} onClose={() => setOpen(false)} onLogout={handleLogout} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 bg-navy px-4 shadow-lg lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold">
              <FileText size={13} className="text-navy" />
            </span>
            <span className="font-black text-white">
              Invoice<span className="text-gold">Gen</span>
            </span>
          </Link>
          <Link
            href="/dashboard/invoices/new"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-navy"
            aria-label="New invoice"
          >
            <Plus size={18} />
          </Link>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
