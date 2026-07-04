import { Metadata } from "next";
import { Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "API Docs - Invoice Gen",
  description:
    "Developer documentation for the Invoice Gen API, including endpoints and example requests.",
  keywords: ["API docs", "invoice API", "developer"],
  openGraph: {
    title: "API Docs | Invoice Gen",
    description: "Integrate Invoice Gen into your own systems with our API.",
    url: "https://invoice-generator1718.vercel.app/api-docs",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/invoices",
    description: "Create a new invoice",
  },
  {
    method: "GET",
    path: "/api/v1/invoices/2",
    description: "Fetch an existing invoice",
  },
  {
    method: "PUT",
    path: "/api/v1/invoices/3",
    description: "Update an invoice",
  },
  {
    method: "DELETE",
    path: "/api/v1/invoices/4",
    description: "Delete an invoice",
  },
];

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#191970" }}
          >
            API Documentation
          </h1>
          <p
            className="text-base sm:text-lg"
            style={{ color: "rgb(25,25,112,0.7)" }}
          >
            Build powerful integrations with Invoice Gen&apos;s RESTful API.
          </p>
        </header>

        <article className="space-y-8">
          <div
            className="rounded-2xl"
            style={{
              background: "#fff",
              border: "1px solid rgba(25,25,112,0.1)",
            }}
          >
            <div
              className="p-6 sm:p-8 border-b"
              style={{ borderColor: "rgba(25,25,112,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Code2 size={24} style={{ color: "#FFC107" }} />
                <h2
                  className="text-2xl font-black"
                  style={{ color: "#191970" }}
                >
                  Available Endpoints
                </h2>
              </div>
              <p style={{ color: "rgb(25,25,112,0.6)" }}>
                All requests require authentication via API key in the
                Authorization header.
              </p>
            </div>
            <div className="space-y-0">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.path}
                  className="p-4 sm:p-6 border-b last:border-b-0"
                  style={{ borderColor: "rgba(25,25,112,0.1)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{
                          background:
                            endpoint.method === "POST" ? "#FFC107" : "#191970",
                        }}
                      >
                        {endpoint.method}
                      </span>
                      <code
                        className="font-mono text-sm"
                        style={{ color: "#191970" }}
                      >
                        {endpoint.path}
                      </code>
                    </div>
                  </div>
                  <p style={{ color: "rgb(25,25,112,0.6)" }}>
                    {endpoint.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
