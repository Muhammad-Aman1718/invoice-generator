import { SignUpForm } from "@/components/auth/sign-up-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="text-center text-slate-700">
              Loading sign-up form...
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
