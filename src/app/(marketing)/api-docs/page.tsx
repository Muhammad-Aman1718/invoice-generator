import type { Metadata } from "next";
import { PageHero } from "@/src/components/marketing/page-hero";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: "API Reference",
  description: `REST API reference for ${siteConfig.name}: invoices, clients, profile, billing and account endpoints.`,
  alternates: { canonical: "/api-docs" },
};

type Endpoint = { method: "GET" | "POST" | "PATCH" | "DELETE"; path: string; desc: string; body?: string };

const groups: { title: string; endpoints: Endpoint[] }[] = [
  {
    title: "Invoices",
    endpoints: [
      { method: "GET", path: "/api/invoices", desc: "List invoices. Query: status, q (client name), limit (≤500), offset." },
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
      { method: "PATCH", path: "/api/invoices/:id", desc: "Update any fields, e.g. { \"status\": \"paid\" }." },
      { method: "DELETE", path: "/api/invoices/:id", desc: "Delete an invoice." },
      { method: "POST", path: "/api/invoices/:id/duplicate", desc: "Copy an invoice with the next number and today's date." },
      { method: "GET", path: "/api/invoices/next-number", desc: "Next sequential invoice number for the account." },
      { method: "GET", path: "/api/invoices/export", desc: "Download all invoices as CSV (Pro & Business)." },
    ],
  },
  {
    title: "Clients",
    endpoints: [
      { method: "GET", path: "/api/clients", desc: "List saved clients." },
      { method: "POST", path: "/api/clients", desc: "Create a client.", body: `{ "name": "Globex Ltd", "email": "ap@globex.com", "address": "…", "taxId": "GB123" }` },
      { method: "PATCH", path: "/api/clients/:id", desc: "Update a client." },
      { method: "DELETE", path: "/api/clients/:id", desc: "Delete a client (invoices keep their copy of the details)." },
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
      { method: "POST", path: "/api/billing/checkout", desc: "Start a Stripe Checkout session.", body: `{ "plan": "pro", "interval": "month" }` },
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

const METHOD_STYLE: Record<Endpoint["method"], string> = {
  GET: "bg-emerald-100 text-emerald-800",
  POST: "bg-blue-100 text-blue-800",
  PATCH: "bg-amber-100 text-amber-900",
  DELETE: "bg-red-100 text-red-700",
};

export default function ApiDocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="API reference"
        description="The same JSON API that powers the dashboard. Requests are authenticated with your session cookie."
      />
      <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 sm:px-6">
        <section className="panel p-6 text-sm leading-relaxed text-navy-500">
          <h2 className="mb-2 text-lg font-black text-navy">Conventions</h2>
          <ul className="list-disc space-y-1.5 pl-5 marker:text-gold-dark">
            <li>All bodies are JSON. Dates use <code>YYYY-MM-DD</code>; percentages are 0–100.</li>
            <li>
              Errors return <code>{`{ "error": "message", "code"?: "PLAN_LIMIT" }`}</code> with status 400, 401, 402, 403,
              404 or 500.
            </li>
            <li>Every request is scoped to the signed-in user by database row-level security.</li>
          </ul>
        </section>

        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`api-${g.title}`}>
            <h2 id={`api-${g.title}`} className="mb-4 text-xl font-black text-navy">
              {g.title}
            </h2>
            <ul className="space-y-3">
              {g.endpoints.map((e) => (
                <li key={e.method + e.path} className="panel p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-black ${METHOD_STYLE[e.method]}`}>
                      {e.method}
                    </span>
                    <code className="break-all font-mono text-sm font-bold text-navy">{e.path}</code>
                  </div>
                  <p className="text-sm text-navy-500">{e.desc}</p>
                  {e.body && (
                    <pre className="custom-scrollbar mt-3 overflow-x-auto rounded-xl bg-navy p-4 text-xs leading-relaxed text-navy-100">
                      {e.body}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
