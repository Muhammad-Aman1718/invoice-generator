// Typed fetch helpers for the app's own /api routes (browser side).

import type {
  Client,
  InvoiceData,
  InvoiceSummary,
  Profile,
  Subscription,
} from "@/src/types/invoice-types";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "same-origin",
  });
  const body = res.headers.get("content-type")?.includes("application/json")
    ? await res.json()
    : null;
  if (!res.ok) {
    throw new ApiRequestError(
      body?.error ?? `Request failed (${res.status})`,
      res.status,
      body?.code,
    );
  }
  return body as T;
}

const json = (data: unknown) => JSON.stringify(data);

export const api = {
  invoices: {
    list: (params?: Record<string, string>) =>
      request<{ invoices: InvoiceSummary[] }>(
        `/api/invoices${params ? `?${new URLSearchParams(params)}` : ""}`,
      ),
    get: (id: string) => request<{ invoice: InvoiceData }>(`/api/invoices/${id}`),
    create: (data: InvoiceData) =>
      request<{ invoice: { id: string } }>("/api/invoices", { method: "POST", body: json(data) }),
    update: (id: string, data: Partial<InvoiceData>) =>
      request<{ invoice: { id: string } }>(`/api/invoices/${id}`, {
        method: "PATCH",
        body: json(data),
      }),
    remove: (id: string) => request<{ ok: true }>(`/api/invoices/${id}`, { method: "DELETE" }),
    duplicate: (id: string) =>
      request<{ invoice: { id: string } }>(`/api/invoices/${id}/duplicate`, { method: "POST" }),
    nextNumber: () => request<{ next: number }>("/api/invoices/next-number"),
  },
  clients: {
    list: () => request<{ clients: Client[] }>("/api/clients"),
    create: (data: Partial<Client>) =>
      request<{ client: Client }>("/api/clients", { method: "POST", body: json(data) }),
    update: (id: string, data: Partial<Client>) =>
      request<{ client: Client }>(`/api/clients/${id}`, { method: "PATCH", body: json(data) }),
    remove: (id: string) => request<{ ok: true }>(`/api/clients/${id}`, { method: "DELETE" }),
  },
  profile: {
    get: () =>
      request<{ profile: Profile; subscription: Subscription }>("/api/profile"),
    update: (data: Partial<Profile>) =>
      request<{ profile: Profile }>("/api/profile", { method: "PATCH", body: json(data) }),
  },
  account: {
    remove: () => request<{ ok: true }>("/api/account", { method: "DELETE" }),
  },
  billing: {
    checkout: (plan: string, interval: string) =>
      request<{ url: string }>("/api/billing/checkout", {
        method: "POST",
        body: json({ plan, interval }),
      }),
    portal: () => request<{ url: string }>("/api/billing/portal", { method: "POST" }),
  },
  admin: {
    updateUser: (
      id: string,
      data: {
        role?: string;
        isSuspended?: boolean;
        plan?: string;
        billingInterval?: string;
        currentPeriodEnd?: string | null;
      },
    ) => request<{ ok: true }>(`/api/admin/users/${id}`, { method: "PATCH", body: json(data) }),
  },
  contact: (data: { name: string; email: string; subject: string; message: string }) =>
    request<{ ok: true; mailto?: string }>("/api/contact", { method: "POST", body: json(data) }),
};
