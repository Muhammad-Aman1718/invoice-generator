import { serializeJsonLd } from "@/src/lib/seo";
import type { JsonLdProps } from "@/src/types/types";

export default function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
