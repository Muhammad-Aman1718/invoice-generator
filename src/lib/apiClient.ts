// Typed fetch helpers for the app's own /api routes (browser side).

import type {
  AdminUserUpdate,
  BillingInterval,
  Client,
  ContactMessage,
  InvoiceIdResponse,
  InvoiceData,
  InvoiceSummary,
  PlanId,
  Profile,
  Subscription,
} from "@/src/types/types";

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
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "same-origin",
  });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await response.json() : null;
  if (!response.ok) {
    throw new ApiRequestError(
      body?.error ?? `Request failed (${response.status})`,
      response.status,
      body?.code,
    );
  }
  return body as T;
}

const send = (method: string, data?: unknown): RequestInit => ({
  method,
  body: data === undefined ? undefined : JSON.stringify(data),
});

export const api = {
  invoices: {
    list: () => request<{ invoices: InvoiceSummary[] }>("/api/invoices"),
    get: (id: string) => request<{ invoice: InvoiceData }>(`/api/invoices/${id}`),
    create: (data: InvoiceData) => request<InvoiceIdResponse>("/api/invoices", send("POST", data)),
    update: (id: string, data: Partial<InvoiceData>) =>
      request<InvoiceIdResponse>(`/api/invoices/${id}`, send("PATCH", data)),
    remove: (id: string) => request<{ ok: true }>(`/api/invoices/${id}`, send("DELETE")),
    duplicate: (id: string) => request<InvoiceIdResponse>(`/api/invoices/${id}/duplicate`, send("POST")),
    getNextNumber: () => request<{ next: number }>("/api/invoices/next"),
  },
  clients: {
    create: (data: Partial<Client>) => request<{ client: Client }>("/api/clients", send("POST", data)),
    update: (id: string, data: Partial<Client>) =>
      request<{ client: Client }>(`/api/clients/${id}`, send("PATCH", data)),
    remove: (id: string) => request<{ ok: true }>(`/api/clients/${id}`, send("DELETE")),
  },
  profile: {
    get: () => request<{ profile: Profile; subscription: Subscription }>("/api/profile"),
    update: (data: Partial<Profile>) => request<{ profile: Profile }>("/api/profile", send("PATCH", data)),
  },
  account: {
    remove: () => request<{ ok: true }>("/api/account", send("DELETE")),
  },
  billing: {
    startCheckout: (plan: PlanId, interval: BillingInterval) =>
      request<{ url: string }>("/api/billing/checkout", send("POST", { plan, interval })),
    openPortal: () => request<{ url: string }>("/api/billing/portal", send("POST")),
  },
  admin: {
    updateUser: (id: string, data: AdminUserUpdate) =>
      request<{ ok: true }>(`/api/admin/users/${id}`, send("PATCH", data)),
  },
  sendContactMessage: (data: ContactMessage) =>
    request<{ ok: true; mailto?: string }>("/api/contact", send("POST", data)),
};
