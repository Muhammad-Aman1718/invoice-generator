import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_HIGHLIGHTS } from "@/src/constant/marketing";

export default function HomeHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="whyTitle">
      <h2 id="whyTitle" className="mb-10 text-center text-2xl font-black text-navy sm:text-3xl">
        Built for small businesses everywhere
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
          <li key={title} className="panel p-6">
            <Icon size={22} className="mb-3 text-gold-dark" />
            <h3 className="mb-1 font-black text-navy">{title}</h3>
            <p className="text-sm text-navy-500">{body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link
          href="/features"
          className="inline-flex items-center gap-1 text-sm font-black text-navy hover:underline"
        >
          See all features <ArrowRight size={14} />
        </Link>
      </p>
    </section>
  );
}
