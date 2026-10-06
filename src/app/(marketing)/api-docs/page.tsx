import type { Metadata } from "next";
import { buildPageMetadata } from "@/src/lib/seo";
import PageJsonLd from "@/src/components/seo/PageJsonLd";
import PageHero from "@/src/components/marketing/PageHero";
import ApiEndpointCard from "@/src/components/marketing/ApiEndpointCard";
import { API_ENDPOINT_GROUPS } from "@/src/constant/apiDocs";

export const metadata: Metadata = buildPageMetadata("apiDocs");

export default function ApiDocsPage() {
  return (
    <>
      <PageJsonLd page="apiDocs" />
      <PageHero
        eyebrow="Developers"
        title="API reference"
        description="The same JSON API that powers the dashboard. Requests are authenticated with your session cookie."
      />
      <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 sm:px-6">
        <section className="panel p-6 text-sm leading-relaxed text-navy-500">
          <h2 className="mb-2 text-lg font-black text-navy">Conventions</h2>
          <ul className="list-disc space-y-1.5 pl-5 marker:text-gold-dark">
            <li>
              All bodies are JSON. Dates use <code>YYYY-MM-DD</code>; percentages are 0–100.
            </li>
            <li>
              Errors return <code>{`{ "error": "message", "code"?: "PLAN_LIMIT" }`}</code> with status 400,
              401, 402, 403, 404 or 500.
            </li>
            <li>Every request is scoped to the signed-in user by database row-level security.</li>
          </ul>
        </section>
        {API_ENDPOINT_GROUPS.map((group, index) => (
          <section key={group.title} aria-labelledby={`apiGroup${index}`}>
            <h2 id={`apiGroup${index}`} className="mb-4 text-xl font-black text-navy">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.endpoints.map((endpoint) => (
                <ApiEndpointCard key={endpoint.method + endpoint.path} endpoint={endpoint} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
