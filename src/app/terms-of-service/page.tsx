import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Invoice Gen",
  description:
    "Read the terms and conditions for using Invoice Gen's services.",
  keywords: ["terms of service", "terms", "conditions"],
  openGraph: {
    title: "Terms of Service | Invoice Gen",
    description: "The legal agreement between you and Invoice Gen.",
    url: "https://invoice-generator1718.vercel.app/terms-of-service",
    siteName: "Invoice Gen",
    type: "article",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Last updated: March 2026
          </p>
        </header>

        <article className="space-y-8">
          <p style={{ color: "rgb(25,25,112,0.7)" }}>
            By using Invoice Gen you agree to the following terms. Please read them carefully; they govern your access to and use of our platform.
          </p>
          {[
            { title: "Eligibility", description: "You must be at least 18 years old to use Invoice Gen. By signing up, you confirm you meet this requirement." },
            { title: "Account Ownership", description: "Your account is personal and non-transferable. You are responsible for maintaining the confidentiality of your login credentials." },
            { title: "Acceptable Use", description: "You agree not to use Invoice Gen for illegal activities, fraud, or any content that violates applicable laws." },
            { title: "Termination", description: "We may suspend or terminate accounts that violate these terms or pose a risk to our platform and users." },
          ].map((term, idx) => (
            <div key={term.title}>
              <h2 className="text-xl sm:text-2xl font-black mb-3" style={{ color: "#191970" }}>
                {idx + 1}. {term.title}
              </h2>
              <p style={{ color: "rgb(25,25,112,0.7)" }}>{term.description}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
