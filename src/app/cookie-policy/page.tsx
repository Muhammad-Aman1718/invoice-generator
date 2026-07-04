import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Invoice Gen",
  description:
    "Understand how and why we use cookies on the Invoice Gen website.",
  keywords: ["cookie policy", "cookies", "tracking"],
  openGraph: {
    title: "Cookie Policy | Invoice Gen",
    description: "Details on cookie usage and user choices.",
    url: "https://invoice-generator1718.vercel.app/cookie-policy",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const cookieTypes = [
  {
    type: "Essential Cookies",
    description: "Required for core functionality like authentication and security.",
    required: true,
  },
  {
    type: "Analytics Cookies",
    description: "Help us understand how you use Invoice Gen to improve the service.",
    required: false,
  },
  {
    type: "Preference Cookies",
    description: "Remember your settings and preferences for a better experience.",
    required: false,
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Transparency about how we use cookies and tracking technologies.
          </p>
        </header>

        <article className="space-y-8">
          <p style={{ color: "rgb(25,25,112,0.7)" }}>
            Invoice Gen uses cookies to improve site functionality, remember your preferences, and analyze traffic. You have full control over cookie settings through your browser.
          </p>
          <div className="space-y-4">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.type}
                className="p-6 rounded-xl border"
                style={{
                  background: "#fff",
                  borderColor: cookie.required ? "#FFC107" : "rgba(25,25,112,0.1)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-black" style={{ color: "#191970" }}>
                    {cookie.type}
                  </h2>
                  {cookie.required && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#FFC107" }}>
                      Required
                    </span>
                  )}
                </div>
                <p style={{ color: "rgb(25,25,112,0.7)" }}>{cookie.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
