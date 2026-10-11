import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/src/components/ui/Reveal";
import StatusBadge from "@/src/components/ui/StatusBadge";
import { BENTO_CURRENCY_PREVIEW, BENTO_TAX_PREVIEW, HOME_HIGHLIGHTS } from "@/src/constant/marketing";
import { CURRENCIES } from "@/src/constant/currencies";
import { TAX_TYPES } from "@/src/constant/taxTypes";
import { INVOICE_STATUSES } from "@/src/constant/invoice";
import { CARD_STAGGER_MS } from "@/src/constant/theme";
import { ROUTES } from "@/src/constant/routes";

const [currencies, taxes, clients, dashboard] = HOME_HIGHLIGHTS;

/** Four-cell bento: each cell shows real data or real components from the app. */
export default function HomeHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="whyTitle">
      <h2 id="whyTitle" className="mb-10 max-w-xl text-3xl font-bold text-navy sm:text-4xl">
        Built for small businesses everywhere
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Reveal className="rounded-2xl bg-navy p-7 text-white md:col-span-2">
          <h3 className="mb-1 text-xl font-bold">{currencies.title}</h3>
          <p className="mb-6 max-w-md text-navy-100">{currencies.body}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Some supported currencies">
            {CURRENCIES.slice(0, BENTO_CURRENCY_PREVIEW).map((currency) => (
              <li
                key={currency.code}
                className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold tabular-nums"
              >
                <span className="text-gold">{currency.symbol}</span> {currency.code}
              </li>
            ))}
            <li className="rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-navy-100">
              +{CURRENCIES.length - BENTO_CURRENCY_PREVIEW} more
            </li>
          </ul>
        </Reveal>
        <Reveal className="rounded-2xl bg-gold/15 p-7" delayMs={CARD_STAGGER_MS}>
          <h3 className="mb-1 text-xl font-bold text-navy">{taxes.title}</h3>
          <p className="mb-5 text-navy-500">{taxes.body}</p>
          <ul className="space-y-2 text-sm" aria-label="Some tax presets">
            {TAX_TYPES.slice(0, BENTO_TAX_PREVIEW).map((tax) => (
              <li key={tax.label} className="flex justify-between gap-3 text-navy">
                <span>{tax.label}</span>
                <span className="font-semibold tabular-nums">{tax.rate}%</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="flex flex-col rounded-2xl border border-navy/[0.08] bg-white p-7">
          <h3 className="mb-1 text-xl font-bold text-navy">{clients.title}</h3>
          <p className="mb-6 flex-1 text-navy-500">{clients.body}</p>
          <Link
            href={ROUTES.signUp}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
          >
            Sign up free <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal
          className="rounded-2xl bg-gradient-to-br from-white to-mist-dark p-7 md:col-span-2"
          delayMs={CARD_STAGGER_MS}
        >
          <h3 className="mb-1 text-xl font-bold text-navy">{dashboard.title}</h3>
          <p className="mb-5 max-w-md text-navy-500">{dashboard.body}</p>
          <div className="mb-6 flex flex-wrap gap-2" aria-label="Invoice statuses">
            {INVOICE_STATUSES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
          >
            See all features <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
