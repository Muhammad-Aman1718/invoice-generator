import { CUSTOM_TAX_LABEL, NO_TAX_LABEL, TAX_TYPES } from "@/src/constant/taxTypes";
import { DEFAULT_TAX_LABEL } from "@/src/constant/invoice";

/** Name printed on the invoice for a preset: "VAT (Standard)" → "VAT", "GST (India)" → "GST". */
export function getTaxDisplayName(presetLabel: string): string {
  if (presetLabel === CUSTOM_TAX_LABEL || presetLabel === NO_TAX_LABEL) return DEFAULT_TAX_LABEL;
  return presetLabel.replace(/\s*\(.*\)$/, "");
}

/** Best preset for a stored rate and tax name (presets first, otherwise "Custom Tax"). */
export function getTaxLabelForRate(rate: number, taxName?: string): string {
  if (!rate) return NO_TAX_LABEL;
  const presets = TAX_TYPES.filter((tax) => tax.rate === rate && tax.label !== CUSTOM_TAX_LABEL);
  const byName = taxName ? presets.find((tax) => getTaxDisplayName(tax.label) === taxName) : undefined;
  // A preset prints its own name, so a stored name that matches none (incl. plain "Tax") is custom.
  if (taxName && !byName) return CUSTOM_TAX_LABEL;
  return (byName ?? presets[0])?.label ?? CUSTOM_TAX_LABEL;
}

export function isPresetLabel(label: string, rate: number): boolean {
  return TAX_TYPES.some((tax) => tax.label === label && tax.rate === rate);
}
