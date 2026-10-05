"use client";

import { usePathname } from "next/navigation";
import SidebarBody from "./SidebarBody";
import MobileTopBar from "./MobileTopBar";
import useMobileDrawer from "@/src/hooks/useMobileDrawer";
import useSignOut from "@/src/hooks/useSignOut";
import { cn } from "@/src/lib/utils";
import type { DashboardShellProps } from "@/src/types/types";

export default function DashboardShell({ viewer, children }: DashboardShellProps) {
  const pathname = usePathname() || "";
  const { open, setOpen } = useMobileDrawer(pathname);
  const signOut = useSignOut();

  return (
    <div className="flex min-h-[100dvh] bg-mist">
      <aside className="sticky top-0 hidden h-[100dvh] w-64 flex-shrink-0 lg:block">
        <SidebarBody viewer={viewer} pathname={pathname} onLogout={signOut} />
      </aside>

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
        <SidebarBody viewer={viewer} pathname={pathname} onClose={() => setOpen(false)} onLogout={signOut} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar onMenuOpen={() => setOpen(true)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
