import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Invoice Gen",
  description:
    "Read articles, tips, and news about invoicing, small business finance, and more.",
  keywords: ["blog", "articles", "invoicing tips"],
  openGraph: {
    title: "Blog | Invoice Gen",
    description: "Helpful posts on invoices, taxes, and business growth.",
    url: "https://invoice-generator1718.vercel.app/blog",
    siteName: "Invoice Gen",
    type: "website",
  },
};

const posts = [
  {
    title: "VAT Compliance Guide for EU Businesses",
    date: "March 2026",
    excerpt: "Everything you need to know about VAT compliance and how Invoice Gen helps you stay compliant.",
  },
  {
    title: "Top 5 Invoicing Mistakes to Avoid",
    date: "February 2026",
    excerpt: "Learn the common invoicing errors and how to prevent them with proper invoice management.",
  },
  {
    title: "Growing Your Business with Better Invoicing",
    date: "January 2026",
    excerpt: "How professional invoicing practices can improve cash flow and customer relationships.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-4xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Blog
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Tips, tutorials, and insights for growing your invoice business.
          </p>
        </header>

        <article className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.title}
              className="p-6 sm:p-8 rounded-2xl border transition-all hover:shadow-lg cursor-pointer"
              style={{
                background: "#fff",
                borderColor: "rgba(25,25,112,0.1)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <h2 className="text-xl sm:text-2xl font-black" style={{ color: "#191970" }}>
                  {post.title}
                </h2>
                <span className="text-sm font-medium" style={{ color: "rgb(25,25,112,0.5)" }}>
                  {post.date}
                </span>
              </div>
              <p style={{ color: "rgb(25,25,112,0.6)" }}>{post.excerpt}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
