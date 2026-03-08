"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Plus,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect, Suspense } from "react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/invoices/new",
    label: "New Invoice",
    icon: Plus,
    exact: false,
  },
];

function NavContent({
  pathname,
  onClose,
  onLogout,
}: {
  pathname: string;
  onClose?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#191970" }}>
      <div
        className="flex items-center justify-between px-5 flex-shrink-0"
        style={{
          height: "60px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#FFC107" }}
          >
            <FileText size={15} style={{ color: "#191970" }} />
          </div>
          <span className="font-black text-base text-white tracking-tight">
            Invoice<span style={{ color: "#FFC107" }}>Gen</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all bg-white/10 text-white/60 hover:text-white"
              aria-label="close navigation menu"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[9px] font-black uppercase tracking-widest px-3 mb-3 text-white/30">
          Menu
        </p>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive ? "rgba(255,193,7,0.12)" : "transparent",
                color: isActive ? "#FFC107" : "rgba(255,255,255,0.55)",
                borderLeft: isActive
                  ? "2px solid #FFC107"
                  : "2px solid transparent",
              }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 flex-shrink-0 border-t border-white/5">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-white/40 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </div>
  );
}

// Hooks wali saari logic yahan move kar di
function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <aside
        className="hidden lg:block sticky top-0 h-screen flex-shrink-0"
        style={{ width: "220px" }}
      >
        <NavContent pathname={pathname || ""} onLogout={handleLogout} />
      </aside>

      <button
        className="lg:hidden fixed z-[70] flex items-center justify-center rounded-xl transition-all"
        style={{
          top: "12px",
          left: "12px",
          width: "36px",
          height: "36px",
          background: "#191970",
          color: "#FFC107",
          boxShadow:
            "0 2px 8px rgba(25,25,112,0.4), 0 0 0 2px rgba(255,193,7,0.3)",
        }}
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu size={17} />
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[65] bg-[#191970]/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className="lg:hidden fixed top-0 left-0 h-full z-[70] flex-shrink-0 transition-transform duration-300 ease-out"
        style={{
          width: "240px",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          boxShadow: open ? "8px 0 40px rgba(25,25,112,0.3)" : "none",
        }}
      >
        <NavContent
          pathname={pathname || ""}
          onClose={() => setOpen(false)}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
}

// Final Export wrapped in Suspense
export function AppSidebar() {
  return (
    <Suspense
      fallback={
        <div className="w-[220px] hidden lg:flex h-screen items-center justify-center bg-[#191970]">
          <Loader2 className="animate-spin text-amber-400" size={20} />
        </div>
      }
    >
      <SidebarContent />
    </Suspense>
  );
}
