# InvoiceGen

A full invoicing SaaS built with **Next.js 16 (App Router)**, **React 19**, **Supabase** and **Tailwind CSS**.
Create professional invoices in the browser, save clients, track payments on a dashboard, and sell
Pro/Business subscriptions.

Theme: 60·30·10 — mist `#ECEFF1`, navy `#191970`, amber `#FFC107`.

## Features

| Area              | What's included                                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Free builder**  | Live preview, PDF export, 40+ currencies, VAT/GST presets, logo & signature — no account needed (draft saved in the browser)                         |
| **Dashboard**     | Overview with KPIs, 6‑month revenue chart, setup checklist, recent invoices                                                                          |
| **Invoices**      | Search, status filters, sort, pagination, duplicate, mark paid/pending/cancelled, PDF download, CSV export (Pro), automatic _overdue_ status         |
| **Clients**       | Client book with CRUD; pick a client in the editor to fill "Bill To"                                                                                 |
| **Reports** (Pro) | 12‑month trend, collection rate, average invoice, top clients, date ranges                                                                           |
| **Billing**       | Free / Pro / Business plans, usage meters, Stripe Checkout + customer portal, manual upgrades when Stripe isn't configured                           |
| **Settings**      | Profile, business details & logo, invoice defaults (currency, tax, payment terms, notes, terms), password change, GDPR data export, account deletion |
| **Roles**         | `user` / `admin`. Admin area: platform KPIs, est. MRR, users table with plan/role changes and suspension                                             |
| **Legal**         | Privacy Policy, Terms of Service, Refund Policy, Cookie Policy, GDPR page, cookie notice, terms checkbox on sign‑up                                  |
| **API**           | Validated JSON REST API (`/api/...`) documented at `/api-docs`                                                                                       |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + publishable key
npm run dev
```

### 1. Database (required)

Open **Supabase → SQL Editor**, paste and run
[`src/supabase/migrations/002CompleteSchema.sql`](src/supabase/migrations/002CompleteSchema.sql).

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

Plan prices/limits live in [`src/constant/plans.ts`](src/constant/plans.ts) — keep the Free limits in
sync with `enforce_plan_limits()` in the SQL migration.

## Project structure

```
src/
├── app/                  Next.js routes (App Router)
│   ├── (marketing)/      Public site: landing + builder, pricing, features, legal pages, contact…
│   ├── auth/             Login, sign-up, password reset, OAuth/email callback
│   ├── dashboard/        Overview, invoices, clients, reports, billing, settings, admin/
│   └── api/              REST API (invoices, clients, profile, account, billing, admin, contact, health)
├── components/           React components, one folder per feature (invoice/, dashboard/, billing/, ui/…)
├── constant/             Every named constant: plans, routes, currencies, theme, nav, page content…
├── hooks/                Client-side React hooks (useInvoiceList, useInvoiceSave…)
├── lib/
│   ├── server/           Auth helpers, data loaders, API error handling, Stripe client (server-only)
│   ├── supabase/         Browser/server/admin clients and the session proxy
│   ├── invoiceStore.ts   Zustand store for the invoice being edited
│   ├── invoiceCalculations.ts  Line, discount, tax and total math
│   ├── mappers.ts        DB row ⇄ app object conversions
│   └── validation.ts     zod schemas for every API input
├── tests/                Vitest unit tests for the logic in lib/
├── types/types.ts        All shared types and component props
├── utils/                Small UI utilities (toasts)
└── supabase/migrations/  SQL schema (001InvoiceSchema.sql, 002CompleteSchema.sql)
src/proxy.ts              Session refresh + route protection (/dashboard, admin)
```

## Code conventions

- **Components:** folders are camelCase; component files are PascalCase (`InvoiceTable.tsx`).
  Each file has one default-exported component whose props type is `<ComponentName>Props`.
- **File names** contain no `-` or `_`. The only exceptions are names Next.js requires
  (`not-found.tsx`) and route folders whose names are public URLs (`privacy-policy`, `sign-up`…).
- **Types** live in `src/types/types.ts`; **constants** (UPPER_CASE) live in `src/constant/`.
  Magic numbers and strings belong there too.
- **API routes** validate input with zod and wrap handlers in `withErrorHandling`, so every error
  returns `{ error, code }` with a proper HTTP status.
- **Secrets** come only from environment variables; never commit `.env.local`.
- **Git:** small conventional commits (`feat:`, `fix:`, `refactor:`, `test:`…) on a feature branch,
  merged through a reviewed pull request. CI must be green before merging.

## Scripts

```bash
npm run dev           # development server
npm run build         # production build
npm run lint          # ESLint
npm run typecheck     # TypeScript, no emit
npm test              # unit tests (Vitest)
npm run test:watch    # unit tests in watch mode
npm run format        # format with Prettier
npm run format:check  # verify formatting (used in CI)
```

GitHub Actions (`.github/workflows/ci.yml`) runs format check, lint, typecheck, tests and build on
every pull request and on pushes to `main`.

## Updating SEO

All search settings live in [`src/constant/seo.ts`](src/constant/seo.ts):

- **`PAGE_SEO`** — title, description, keywords and sitemap priority for every public page.
  Keep titles under ~50 characters and descriptions between 120 and 160 (a unit test enforces it).
- **`SEO_KEYWORDS`**, **`SEO_DEFAULT_TITLE`**, **`SEO_TAGLINE`** — site-wide keywords and the text on
  the link-preview image.
- **`SEO_SAME_AS`** — add your real social profile URLs.
- **`SEO_LAST_UPDATED`** — bump it when page content changes (used as `lastmod` in the sitemap).

What the site generates from it:

| URL                                    | Purpose                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `/sitemap.xml`, `/robots.txt`          | Crawling (dashboard, auth and API are excluded)                             |
| `/opengraph-image`, `/twitter-image`   | 1200×630 preview for WhatsApp, Facebook, X, LinkedIn, Slack                 |
| `/apple-icon`, `/manifest.webmanifest` | Home-screen icon and installable web-app manifest                           |
| JSON-LD in every page                  | Organization, WebSite, WebApplication, breadcrumbs, and FAQ on Pricing/Help |

After deploying: add the site to [Google Search Console](https://search.google.com/search-console) and
[Bing Webmaster Tools](https://www.bing.com/webmasters), set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` /
`NEXT_PUBLIC_BING_SITE_VERIFICATION`, redeploy, then submit `https://YOUR-DOMAIN/sitemap.xml`.
Check structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

## Before going live

- Update company name and support/privacy emails in `src/constant/site.ts`.
- Have the legal pages reviewed for your jurisdiction — they are a solid starting point, not legal advice.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain.

## License

MIT
