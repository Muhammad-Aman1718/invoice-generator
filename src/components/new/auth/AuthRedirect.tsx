import Link from "next/link";
import React from "react";

interface AuthRedirectProps {
  text?: string;
  linkText?: string;
  href: string;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({
  text,
  linkText,
  href,
}) => {
  return (
    <footer className="text-center text-xs border-t border-slate-100 pt-5">
      <p className="text-[#191970]/70 font-medium">
        {text}
        <Link
          // href={`/auth/sign-up${queryString ? `?${queryString}` : ""}`}
          href={href}
          className="font-black text-[#191970] hover:underline"
        >
          {" "}
          {linkText}
        </Link>
      </p>
    </footer>
  );
};

export default AuthRedirect;
