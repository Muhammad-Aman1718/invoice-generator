import type { Metadata } from "next";
import SignUpForm from "@/src/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create your free account",
  description: "Create a free InvoiceGen account to save invoices, clients and track payments.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
