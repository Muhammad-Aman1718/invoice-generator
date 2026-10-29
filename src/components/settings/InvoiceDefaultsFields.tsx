import TextField from "@/src/components/ui/TextField";
import Link from "next/link";
import { CURRENCIES } from "@/src/constant/currencies";
import { MAX_PAYMENT_TERMS_DAYS } from "@/src/constant/app";
import { MAX_PERCENT } from "@/src/constant/limits";
import type { SettingsFieldsProps } from "@/src/types/types";
import { ROUTES } from "@/src/constant/routes";

export default function InvoiceDefaultsFields({ values, onChange }: SettingsFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <label htmlFor="defaultCurrency" className="label">
          Currency
        </label>
        <select
          id="defaultCurrency"
          className="input cursor-pointer"
          value={values.defaultCurrency}
          onChange={(event) => onChange("defaultCurrency", event.target.value)}
        >
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.label}
            </option>
          ))}
        </select>
      </div>
      <TextField
        id="defaultTaxRate"
        label="Tax rate (%)"
        type="number"
        min={0}
        max={MAX_PERCENT}
        step={0.01}
        value={values.defaultTaxRate}
        onChange={(event) => onChange("defaultTaxRate", Number(event.target.value))}
      />
      <TextField
        id="paymentTermsDays"
        label="Payment terms (days)"
        type="number"
        min={0}
        max={MAX_PAYMENT_TERMS_DAYS}
        value={values.paymentTermsDays}
        onChange={(event) => onChange("paymentTermsDays", Number(event.target.value))}
      />
      <p className="rounded-xl bg-mist px-4 py-3 text-sm text-navy-500 sm:col-span-3">
        Default notes, terms & conditions and payment details live on the{" "}
        <Link
          href={ROUTES.notesSettings}
          className="font-semibold text-navy underline decoration-gold underline-offset-4"
        >
          Notes & terms
        </Link>{" "}
        tab.
      </p>
    </div>
  );
}
