"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { api } from "@/src/lib/api-client";
import { showToast } from "@/src/utils/showToast";

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="btn-outline"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const { url } = await api.billing.portal();
          window.location.href = url;
        } catch (err) {
          showToast.error("Billing portal unavailable", err instanceof Error ? err.message : undefined);
          setLoading(false);
        }
      }}
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : <ExternalLink size={15} />}
      Manage billing
    </button>
  );
}
