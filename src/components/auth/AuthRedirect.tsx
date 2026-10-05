import Link from "next/link";
import type { AuthRedirectProps } from "@/src/types/types";

export default function AuthRedirect({ text, linkText, href }: AuthRedirectProps) {
  return (
    <footer className="border-t border-slate-100 pt-5 text-center text-xs">
      <p className="font-medium text-navy/70">
        {text}{" "}
        <Link href={href} className="font-black text-navy hover:underline">
          {linkText}
        </Link>
      </p>
    </footer>
  );
}
