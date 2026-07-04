import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - Invoice Gen",
  description:
    "Read about the latest updates, bug fixes, and new features in Invoice Gen.",
  keywords: ["changelog", "updates", "release notes"],
  openGraph: {
    title: "Changelog | Invoice Gen",
    description: "Stay up to date with what's new in Invoice Gen.",
    url: "https://invoice-generator1718.vercel.app/changelog",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const releases = [
  {
    version: "v1.3.0",
    date: "March 2026",
    items: ["Added SEO-friendly footer pages", "Improved dashboard responsiveness", "Enhanced mobile navigation"],
  },
  {
    version: "v1.2.0",
    date: "February 2026",
    items: ["Added GDPR compliance page", "Improved template selector", "Better error handling"],
  },
  {
    version: "v1.1.0",
    date: "January 2026",
    items: ["Introduced pricing tiers", "Added team management", "Enhanced export options"],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Changelog
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            See what's new and improved in Invoice Gen.
          </p>
        </header>

        <article className="space-y-8">
          {releases.map((release) => (
            <div key={release.version} className="border-l-4" style={{ borderColor: "#FFC107" }}>
              <div className="pl-6">
                <h2 className="text-2xl font-black" style={{ color: "#191970" }}>
                  {release.version}
                </h2>
                <p className="text-sm mb-4" style={{ color: "rgb(25,25,112,0.5)" }}>
                  {release.date}
                </p>
                <ul className="space-y-2">
                  {release.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: "#FFC107" }}>✓</span>
                      <span style={{ color: "rgb(25,25,112,0.7)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
