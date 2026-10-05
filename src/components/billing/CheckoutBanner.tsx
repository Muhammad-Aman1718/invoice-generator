import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { CheckoutBannerProps } from "@/src/types/types";

export default function CheckoutBanner({ checkout, isPastDue, planName }: CheckoutBannerProps) {
  if (checkout === "success") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
        Payment received — thank you! Your plan updates as soon as our payment provider confirms it (usually
        within a few seconds). Refresh this page if it hasn&apos;t changed yet.
      </div>
    );
  }
  if (checkout === "cancelled") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-sm text-navy-500">
        <Info size={18} className="mt-0.5 flex-shrink-0" /> Checkout was cancelled. You have not been charged.
      </div>
    );
  }
  if (isPastDue) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
        Your last payment failed. Update your payment method to keep your {planName} features.
      </div>
    );
  }
  return null;
}
