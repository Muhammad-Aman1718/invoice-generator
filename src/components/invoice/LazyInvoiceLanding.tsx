"use client";

import dynamic from "next/dynamic";
import LoadWhenVisible from "@/src/components/ui/LoadWhenVisible";
import Loader from "@/src/components/auth/Loader";

function BuilderPlaceholder() {
  return (
    <div className="panel flex min-h-[640px] items-center justify-center">
      <Loader text="Loading invoice builder…" />
    </div>
  );
}

// The builder is the heaviest part of the home page; loading it on demand keeps the first paint fast.
const InvoiceLanding = dynamic(() => import("./InvoiceLanding"), { ssr: false, loading: BuilderPlaceholder });

export default function LazyInvoiceLanding() {
  return (
    <LoadWhenVisible id="builder" fallback={<BuilderPlaceholder />}>
      <InvoiceLanding />
    </LoadWhenVisible>
  );
}
