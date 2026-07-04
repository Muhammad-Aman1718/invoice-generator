import { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance - Invoice Gen",
  description:
    "How Invoice Gen complies with the General Data Protection Regulation (GDPR).",
  keywords: ["GDPR", "compliance", "data protection"],
  openGraph: {
    title: "GDPR Compliance | Invoice Gen",
    description: "Our commitment to GDPR and user data rights.",
    url: "https://invoice-generator1718.vercel.app/gdpr-compliance",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const gdprRights = [
  "Right to access your personal data",
  "Right to correct inaccurate information",
  "Right to delete your data (Right to be Forgotten)",
  "Right to restrict processing",
  "Right to data portability",
  "Right to object to processing",
];

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            GDPR Compliance
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Your data rights and how we protect them.
          </p>
        </header>

        <article className="space-y-8">
          <p style={{ color: "rgb(25,25,112,0.7)" }}>
            We take GDPR seriously. Users in the EU have the right to access, modify, or delete their data. Our systems are built to satisfy these requirements.
          </p>
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#FFC10710" }}>
            <h2 className="text-2xl font-black mb-6" style={{ color: "#191970" }}>
              Your GDPR Rights
            </h2>
            <ul className="space-y-4">
              {gdprRights.map((right) => (
                <li key={right} className="flex items-start gap-3">
                  <CheckCircle size={20} style={{ color: "#FFC107", flexShrink: 0 }} />
                  <span style={{ color: "rgb(25,25,112,0.7)" }}>{right}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-black mb-4" style={{ color: "#191970" }}>
              Our Commitments
            </h2>
            <ul className="space-y-3 pl-4 border-l-4" style={{ borderColor: "#FFC107" }}>
              <li style={{ color: "rgb(25,25,112,0.7)" }}>Data processing transparency and clear consent mechanisms</li>
              <li style={{ color: "rgb(25,25,112,0.7)" }}>Encryption of data in transit and at rest</li>
              <li style={{ color: "rgb(25,25,112,0.7)" }}>Regular security audits and compliance checks</li>
              <li style={{ color: "rgb(25,25,112,0.7)" }}>Dedicated Data Protection Officer for inquiries</li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
}
