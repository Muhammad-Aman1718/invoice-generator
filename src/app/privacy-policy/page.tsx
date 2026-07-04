import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Invoice Gen",
  description:
    "Learn how Invoice Gen collects, uses, and protects your personal data.",
  keywords: ["privacy policy", "data protection", "personal data"],
  openGraph: {
    title: "Privacy Policy | Invoice Gen",
    description: "Understand our commitment to user privacy.",
    url: "https://invoice-generator1718.vercel.app/privacy-policy",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const sections = [
  {
    title: "Information We Collect",
    items: ["Account information (email, name, company)", "Invoice data (customer details, amounts)", "Usage analytics and error logs"],
  },
  {
    title: "How We Use Your Data",
    items: ["To provide and improve our service", "To prevent fraud and security issues", "To send important updates and notifications"],
  },
  {
    title: "Your Rights",
    items: ["Right to access your data", "Right to correct inaccurate data", "Right to delete your account and data"],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Last updated: March 2026
          </p>
        </header>

        <article className="space-y-8">
          <p style={{ color: "rgb(25,25,112,0.7)" }}>
            Invoice Gen is committed to protecting your privacy. We only collect data necessary to provide our service and we never sell your information to third parties.
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-black mb-4" style={{ color: "#191970" }}>
                {section.title}
              </h2>
              <ul className="space-y-2 pl-4 border-l-4" style={{ borderColor: "#FFC107" }}>
                {section.items.map((item) => (
                  <li key={item} style={{ color: "rgb(25,25,112,0.7)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
