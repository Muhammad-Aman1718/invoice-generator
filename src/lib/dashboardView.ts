import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/src/lib/format";
import { ROUTES } from "@/src/constant/routes";
import { FULL_PERCENT } from "@/src/constant/app";
import type {
  AdminStats,
  DashboardStats,
  ReportKpi,
  SetupChecklistInput,
  SetupChecklistProps,
  StatItem,
} from "@/src/types/types";

function pluralize(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

/** The four KPI cards on the overview page. */
export function buildOverviewStatItems(stats: DashboardStats, invoiceCount: number): StatItem[] {
  const money = (amount: number) => formatCurrency(amount, stats.currency);
  return [
    {
      label: "Total invoiced",
      value: money(stats.totalInvoiced),
      hint: pluralize(invoiceCount, "invoice"),
      icon: TrendingUp,
    },
    {
      label: "Paid",
      value: money(stats.totalPaid),
      hint: `${stats.counts.paid} paid`,
      icon: CheckCircle2,
      tone: "green",
    },
    {
      label: "Outstanding",
      value: money(stats.outstanding),
      hint: `${stats.counts.pending + stats.counts.overdue} awaiting payment`,
      icon: Clock,
      tone: "amber",
    },
    {
      label: "Overdue",
      value: money(stats.overdue),
      hint: `${stats.counts.overdue} past due date`,
      icon: AlertTriangle,
      tone: "red",
    },
  ];
}

export function buildSetupChecklist(input: SetupChecklistInput): SetupChecklistProps["items"] {
  return [
    { done: Boolean(input.profile.companyName), label: "Add your business details", href: ROUTES.settings },
    { done: input.clientCount > 0, label: "Save your first client", href: ROUTES.clients },
    { done: input.invoiceCount > 0, label: "Create your first invoice", href: ROUTES.newInvoice },
    { done: input.stats.counts.paid > 0, label: "Mark an invoice as paid", href: ROUTES.invoices },
  ];
}

/** KPI tiles for the reports page. */
export function buildReportKpis(stats: DashboardStats, billableCount: number): ReportKpi[] {
  const money = (amount: number) => formatCurrency(amount, stats.currency);
  const collectionRate = stats.totalInvoiced
    ? Math.round((stats.totalPaid / stats.totalInvoiced) * FULL_PERCENT)
    : 0;
  const average = billableCount ? stats.totalInvoiced / billableCount : 0;
  return [
    { label: "Invoiced", value: money(stats.totalInvoiced) },
    { label: "Collected", value: money(stats.totalPaid) },
    { label: "Collection rate", value: `${collectionRate}%` },
    { label: "Average invoice", value: money(average) },
  ];
}

/** KPI tiles for the admin overview. */
export function buildAdminStatItems(stats: AdminStats): StatItem[] {
  const paid = stats.byPlan.pro + stats.byPlan.business;
  const conversion = stats.totalUsers
    ? `${Math.round((paid / stats.totalUsers) * FULL_PERCENT)}% conversion`
    : "—";
  return [
    {
      label: "Users",
      value: String(stats.totalUsers),
      hint: `${stats.newUsers30d} new in 30 days`,
      icon: Users,
    },
    { label: "Paying customers", value: String(paid), hint: conversion, icon: CreditCard, tone: "green" },
    {
      label: "Est. MRR",
      value: `$${stats.mrr.toFixed(2)}`,
      hint: "Yearly plans counted ÷ 12",
      icon: UserPlus,
      tone: "amber",
    },
    {
      label: "Invoices",
      value: String(stats.invoiceTotal),
      hint: `${stats.invoiceMonth} this month`,
      icon: FileText,
    },
  ];
}
