// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <div className="flex flex-col gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">
//                 Thank you for signing up!
//               </CardTitle>
//               <CardDescription>Check your email to confirm</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">
//                 You&apos;ve successfully signed up. Please check your email to
//                 confirm your account before signing in.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }







import Link from "next/link";
import { FileText, MailCheck } from "lucide-react";

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full flex-col"
      style={{ background: "#ECEFF1" }}
    >
      {/* ── Minimal Nav ── */}
      <header style={{ background: "#191970" }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#FFC107" }}
            >
              <FileText size={13} style={{ color: "#191970" }} />
            </div>
            <span className="text-white font-black text-base tracking-tight">
              Invoice<span style={{ color: "#FFC107" }}>Gen</span>
            </span>
          </Link>
        </div>
      </header>

      {/* ── Success Card ── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div
          className="w-full max-w-sm rounded-2xl border overflow-hidden"
          style={{
            background: "#ffffff",
            borderColor: "rgba(25,25,112,0.08)",
            boxShadow: "0 8px 40px rgba(25,25,112,0.1)",
          }}
        >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: "#FFC107" }} />

          <div className="p-8 text-center space-y-5">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: "rgba(255,193,7,0.12)" }}
            >
              <MailCheck size={28} style={{ color: "#FFC107" }} />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h1
                className="text-xl font-black tracking-tight"
                style={{ color: "#191970" }}
              >
                Check your inbox!
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(25,25,112,0.55)" }}>
                We've sent a verification link to your email address. Click the link to activate your account.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: "rgba(25,25,112,0.07)" }} />

            {/* Action */}
            <p className="text-xs" style={{ color: "rgba(25,25,112,0.45)" }}>
              Already confirmed?{" "}
              <Link
                href="/auth/login"
                className="font-black hover:underline"
                style={{ color: "#191970" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}