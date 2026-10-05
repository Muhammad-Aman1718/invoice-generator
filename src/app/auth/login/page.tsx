import type { Metadata } from "next";
import LoginForm from "@/src/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage your invoices, clients and payments.",
};

export default function LoginPage() {
  return <LoginForm />;
}
