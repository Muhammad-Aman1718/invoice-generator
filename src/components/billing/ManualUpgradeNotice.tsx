import { SITE_CONFIG } from "@/src/constant/site";

export default function ManualUpgradeNotice() {
  return (
    <p className="mx-auto mb-6 max-w-2xl rounded-2xl border border-gold/40 bg-gold/10 p-4 text-center text-sm text-navy">
      Online card payments are being set up. To upgrade today, email{" "}
      <a
        className="font-bold underline"
        href={`mailto:${SITE_CONFIG.supportEmail}?subject=Upgrade%20request`}
      >
        {SITE_CONFIG.supportEmail}
      </a>{" "}
      and we&apos;ll activate your plan manually.
    </p>
  );
}
