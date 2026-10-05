# InvoiceGen

A full invoicing SaaS built with **Next.js 16 (App Router)**, **React 19**, **Supabase** and **Tailwind CSS**.
Create professional invoices in the browser, save clients, track payments on a dashboard, and sell
Pro/Business subscriptions.

Theme: 60·30·10 — mist `#ECEFF1`, navy `#191970`, amber `#FFC107`.

## Features

| Area | What's included |
|---|---|
| **Free builder** | Live preview, PDF export, 40+ currencies, VAT/GST presets, logo & signature — no account needed (draft saved in the browser) |
| **Dashboard** | Overview with KPIs, 6‑month revenue chart, setup checklist, recent invoices |
| **Invoices** | Search, status filters, sort, pagination, duplicate, mark paid/pending/cancelled, PDF download, CSV export (Pro), automatic *overdue* status |
| **Clients** | Client book with CRUD; pick a client in the editor to fill "Bill To" |
| **Reports** (Pro) | 12‑month trend, collection rate, average invoice, top clients, date ranges |
| **Billing** | Free / Pro / Business plans, usage meters, Stripe Checkout + customer portal, manual upgrades when Stripe isn't configured |
| **Settings** | Profile, business details & logo, invoice defaults (currency, tax, payment terms, notes, terms), password change, GDPR data export, account deletion |
| **Roles** | `user` / `admin`. Admin area: platform KPIs, est. MRR, users table with plan/role changes and suspension |
| **Legal** | Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, GDPR page, cookie notice, terms checkbox on sign‑up |
| **API** | Validated JSON REST API (`/api/...`) documented at `/api-docs` |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev
```

### 1. Database (required)

Open **Supabase → SQL Editor**, paste and run
[`src/supabase/migrations/002_complete_schema.sql`](src/supabase/migrations/002_complete_schema.sql).

It is idempotent (safe to re-run, safe on an existing database) and creates/updates:

- `profiles` (role, business defaults, suspension), `clients`, `invoices`, `subscriptions`
- Row Level Security: users only see their own rows; admins can read all
- Triggers: new user → profile + free subscription; users cannot change their own role;
  **Free plan limits enforced in the database** (10 invoices / month, 5 clients)
- RPCs: `get_next_invoice_number`, `is_admin`, `effective_plan`, `delete_my_account`

### 2. Make yourself an admin

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

Then open **Dashboard → Admin**.

### 3. Supabase Auth URLs

In **Authentication → URL Configuration** add your site URL and the redirect
`https://YOUR-DOMAIN/auth/callback` (used by Google/GitHub login, email confirmation and password reset).

### 4. Payments (optional)

Without Stripe keys the app runs fine: the billing page tells users to email support and an admin
upgrades them from **Admin → Users & plans** (31‑day manual period).

To enable self‑serve billing:

1. Create Pro and Business products in Stripe with monthly and yearly prices.
2. Set `STRIPE_SECRET_KEY`, the four `STRIPE_PRICE_*` IDs and `SUPABASE_SERVICE_ROLE_KEY`.
3. Add a webhook to `https://YOUR-DOMAIN/api/billing/webhook` for
   `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`,
   and set `STRIPE_WEBHOOK_SECRET`.
4. Enable the customer portal in Stripe (Settings → Billing → Customer portal).

Plan prices/limits live in [`src/config/plans.ts`](src/config/plans.ts) — keep the Free limits in
sync with `enforce_plan_limits()` in the SQL migration.

## Project structure

```
src/
├── app/
│   ├── (marketing)/      Public site: landing + builder, pricing, features, legal pages, contact…
│   ├── auth/             Login, sign-up, password reset, OAuth/email callback
│   ├── dashboard/        Overview, invoices, clients, reports, billing, settings, admin/
│   └── api/              REST API (invoices, clients, profile, account, billing, admin, contact, health)
├── components/           UI: dashboard shell, invoice editor/form/preview, billing, marketing
├── config/               site.ts (name, URL, emails, nav) · plans.ts (pricing & limits)
├── lib/
│   ├── server/           auth helpers, data loaders, Stripe client (server-only)
│   ├── supabase/         browser/server/admin clients, session proxy
│   ├── invoice-store.ts  Zustand store + totals math
│   ├── pdf-generator.tsx @react-pdf invoice document
│   ├── mappers.ts        DB row ⇄ app object conversions
│   └── validation.ts     zod schemas for every API input
└── supabase/migrations/  SQL schema
proxy.ts                  Session refresh + route protection (/dashboard, admin)
```

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run lint    # ESLint
```

## Before going live

- Update company name and support/privacy emails in `src/config/site.ts`.
- Have the legal pages reviewed for your jurisdiction — they are a solid starting point, not legal advice.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain.

## License

MIT
