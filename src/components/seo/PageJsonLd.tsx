import JsonLd from "./JsonLd";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/src/lib/seo";
import type { PageJsonLdProps } from "@/src/types/types";

/** Breadcrumb (and optional FAQ) structured data for a public page. */
export default function PageJsonLd({ page, faqs }: PageJsonLdProps) {
  return (
    <>
      {page !== "home" && <JsonLd data={buildBreadcrumbJsonLd(page)} />}
      {faqs?.length ? <JsonLd data={buildFaqJsonLd(faqs)} /> : null}
    </>
  );
}
