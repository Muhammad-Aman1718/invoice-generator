import type { ApiEndpointGroup, HttpMethod } from "@/src/types/types";

export const API_ENDPOINT_GROUPS: ApiEndpointGroup[] = [
  {
    title: "Invoices",
    endpoints: [
      {
        method: "GET",
        path: "/api/invoices",
        desc: "List invoices. Query: status, q (client name), limit (≤500), offset.",
      },
      {
        method: "POST",
        path: "/api/invoices",
        desc: "Create an invoice. Returns 402 PLAN_LIMIT when the Free plan monthly limit is reached.",
        body: `{
  "invoiceNumber": 42,
  "currency": "USD",
  "businessName": "Acme Studio",
  "clientName": "Globex Ltd",
  "issueDate": "2026-10-05",
  "dueDate": "2026-10-19",
  "lineItems": [{ "description": "Design", "quantity": 10, "rate": 80, "discount": 0, "amount": 800 }],
  "subtotal": 800, "overallDiscount": 0, "taxRate": 20, "totalAmount": 960,
  "status": "pending"
}`,
      },
      { method: "GET", path: "/api/invoices/:id", desc: "Fetch one invoice with all fields." },
      { method: "PATCH", path: "/api/invoices/:id", desc: 'Update any fields, e.g. { "status": "paid" }.' },
      { method: "DELETE", path: "/api/invoices/:id", desc: "Delete an invoice." },
      {
        method: "POST",
        path: "/api/invoices/:id/duplicate",
        desc: "Copy an invoice with the next number and today's date.",
      },
      { method: "GET", path: "/api/invoices/next", desc: "Next sequential invoice number for the account." },
      { method: "GET", path: "/api/invoices/export", desc: "Download all invoices as CSV (Pro & Business)." },
    ],
  },
  {
    title: "Clients",
    endpoints: [
      { method: "GET", path: "/api/clients", desc: "List saved clients." },
      {
        method: "POST",
        path: "/api/clients",
        desc: "Create a client.",
        body: `{ "name": "Globex Ltd", "email": "ap@globex.com", "address": "…", "taxId": "GB123" }`,
      },
      { method: "PATCH", path: "/api/clients/:id", desc: "Update a client." },
      {
        method: "DELETE",
        path: "/api/clients/:id",
        desc: "Delete a client (invoices keep their copy of the details).",
      },
    ],
  },
  {
    title: "Account",
    endpoints: [
      { method: "GET", path: "/api/profile", desc: "Profile, business defaults and current subscription." },
      { method: "PATCH", path: "/api/profile", desc: "Update profile and invoice defaults." },
      { method: "GET", path: "/api/account/export", desc: "Download all your data as JSON." },
      { method: "DELETE", path: "/api/account", desc: "Permanently delete the account and all data." },
    ],
  },
  {
    title: "Billing",
    endpoints: [
      {
        method: "POST",
        path: "/api/billing/checkout",
        desc: "Start a Stripe Checkout session.",
        body: `{ "plan": "pro", "interval": "month" }`,
      },
      { method: "POST", path: "/api/billing/portal", desc: "Open the Stripe customer portal." },
    ],
  },
  {
    title: "Public",
    endpoints: [
      { method: "GET", path: "/api/health", desc: "Service health for monitors." },
      { method: "POST", path: "/api/contact", desc: "Send a message to support." },
    ],
  },
];

export const METHOD_BADGE_STYLES: Record<HttpMethod, string> = {
  GET: "bg-emerald-100 text-emerald-800",
  POST: "bg-blue-100 text-blue-800",
  PATCH: "bg-amber-100 text-amber-900",
  DELETE: "bg-red-100 text-red-700",
};
