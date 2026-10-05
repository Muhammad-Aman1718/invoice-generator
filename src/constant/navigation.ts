import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Receipt,
  Settings,
  Shield,
  UserCog,
  Users,
} from "lucide-react";
import { ROUTES } from "@/src/constant/routes";
import type { SidebarNavItem } from "@/src/types/types";

export const SIDEBAR_WORKSPACE_NAV: SidebarNavItem[] = [
  { href: ROUTES.dashboard, label: "Overview", icon: LayoutDashboard, exact: true },
  { href: ROUTES.invoices, label: "Invoices", icon: Receipt, exact: false, excludes: [ROUTES.newInvoice] },
  { href: ROUTES.clients, label: "Clients", icon: Users, exact: false },
  { href: ROUTES.reports, label: "Reports", icon: BarChart3, exact: false },
];

export const SIDEBAR_ACCOUNT_NAV: SidebarNavItem[] = [
  { href: ROUTES.billing, label: "Billing & Plan", icon: CreditCard, exact: false },
  { href: ROUTES.settings, label: "Settings", icon: Settings, exact: false },
];

export const SIDEBAR_ADMIN_NAV: SidebarNavItem[] = [
  { href: ROUTES.admin, label: "Admin overview", icon: Shield, exact: true },
  { href: ROUTES.adminUsers, label: "Users & plans", icon: UserCog, exact: false },
];
