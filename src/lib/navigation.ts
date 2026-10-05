import type { SidebarNavItem } from "@/src/types/types";

export function isNavItemActive(pathname: string, item: SidebarNavItem): boolean {
  if (item.excludes?.includes(pathname)) return false;
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
