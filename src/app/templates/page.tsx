import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates - Invoice Gen",
  description:
    "Browse and choose from a variety of beautifully designed invoice templates.",
  keywords: ["invoice templates", "PDF templates", "design"],
  openGraph: {
    title: "Templates | Invoice Gen",
    description: "Select a template that matches your brand and style.",
    url: "https://invoice-generator1718.vercel.app/templates",
    siteName: "Invoice Gen",
    type: "article",
  },
};

const templates = [
  { name: "Minimalist Modern", description: "Clean, simple design perfect for professionals." },
  { name: "Corporate Bold", description: "Professional dark theme with strong accents." },
  { name: "Colorful Creative", description: "Vibrant design that stands out and impresses." },
  { name: "Elegant Classic", description: "Traditional layout with sophisticated styling." },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#ECEFF1]">
      <section className="max-w-5xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4" style={{ color: "#191970" }}>
            Invoice Templates
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "rgb(25,25,112,0.7)" }}>
            Choose from professionally designed, fully customizable templates.
          </p>
        </header>

        <article className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {templates.map((template) => (
            <div
              key={template.name}
              className="p-6 sm:p-8 rounded-2xl border cursor-pointer transition-all hover:shadow-lg hover:border-[#FFC107]"
              style={{
                background: "#fff",
                borderColor: "rgba(25,25,112,0.1)",
              }}
            >
              <h2 className="text-xl font-black mb-2" style={{ color: "#191970" }}>
                {template.name}
              </h2>
              <p style={{ color: "rgb(25,25,112,0.6)" }}>{template.description}</p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
