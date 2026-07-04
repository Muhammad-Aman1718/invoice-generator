import { Metadata } from "next";
import { Check, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Status - Invoice Gen",
  description: "View system status and uptime information for Invoice Gen.",
  keywords: ["status", "uptime", "system health"],
  openGraph: {
    title: "Status | Invoice Gen",
    description: "Check service health and operational notices.",
    url: "https://invoice-generator1718.vercel.app/status",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const services = [
  { name: "API", status: "operational", uptime: "99.99%" },
  { name: "Authentication", status: "operational", uptime: "99.98%" },
  { name: "Web App", status: "operational", uptime: "99.99%" },
  { name: "PDF Generation", status: "operational", uptime: "99.97%" },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            System Status
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            All systems operational. Real-time status updates below.
          </p>
        </header>

        <article className="space-y-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="p-4 sm:p-6 rounded-xl border flex items-center justify-between"
              style={{
                background: "#fff",
                borderColor: service.status === "operational" ? "#10b981" : "#ef4444",
              }}
            >
              <div className="flex items-center gap-4">
                {service.status === "operational" ? (
                  <Check size={24} style={{ color: "#10b981" }} />
                ) : (
                  <AlertCircle size={24} style={{ color: "#ef4444" }} />
                )}
                <div>
                  <h2 className="font-black" style={{ color: "#191970" }}>
                    {service.name}
                  </h2>
                  <p className="text-sm" style={{ color: "rgb(25,25,112,0.6)" }}>
                    {service.uptime} uptime
                  </p>
                </div>
              </div>
              <span
                className="px-4 py-2 rounded-full text-sm font-bold text-white capitalize"
                style={{
                  background: service.status === "operational" ? "#10b981" : "#ef4444",
                }}
              >
                {service.status}
              </span>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
