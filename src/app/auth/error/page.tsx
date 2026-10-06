import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import FormContainer from "@/src/components/auth/FormContainer";
import { getAuthErrorMessage } from "@/src/lib/authErrors";
import { ROUTES } from "@/src/constant/routes";
import type { AuthErrorPageProps } from "@/src/types/types";

export const metadata: Metadata = { title: "Sign-in problem" };

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;
  const message = error ? getAuthErrorMessage(error) : null;
  return (
    <FormContainer>
      <div className="space-y-5 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle size={24} className="text-red-500" />
        </span>
        <h1 className="text-xl font-black text-navy">Something went wrong</h1>
        <p className="rounded-xl bg-mist p-4 text-sm text-navy-500">
          {message ?? "An unspecified error occurred. Please try again or contact support."}
        </p>
        <div className="flex flex-col gap-2">
          <Link href={ROUTES.home} className="btn-primary w-full">
            Go to homepage
          </Link>
          <Link href={ROUTES.login} className="btn-outline w-full">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </div>
    </FormContainer>
  );
}
