// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Suspense } from "react";

// async function ErrorContent({
//   searchParams,
// }: {
//   searchParams: Promise<{ error: string }>;
// }) {
//   const params = await searchParams;

//   return (
//     <>
//       {params?.error ? (
//         <p className="text-sm text-muted-foreground">
//           Code error: {params.error}
//         </p>
//       ) : (
//         <p className="text-sm text-muted-foreground">
//           An unspecified error occurred.
//         </p>
//       )}
//     </>
//   );
// }

// export default function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{ error: string }>;
// }) {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <div className="flex flex-col gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">
//                 Sorry, something went wrong.
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Suspense>
//                 <ErrorContent searchParams={searchParams} />
//               </Suspense>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }






import Link from "next/link";
import { Suspense } from "react";
import { FileText, AlertTriangle, ArrowLeft } from "lucide-react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  return (
    <p className="text-sm leading-relaxed" style={{ color: "rgba(25,25,112,0.55)" }}>
      {params?.error ? (
        <>
          Error code:{" "}
          <code
            className="text-xs px-2 py-0.5 rounded-lg font-mono font-bold"
            style={{ background: "rgba(239,68,68,0.08)", color: "#EF4444" }}
          >
            {params.error}
          </code>
        </>
      ) : (
        "An unspecified error occurred. Please try again or contact support."
      )}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div
      className="flex min-h-svh w-full flex-col items-center justify-center p-4 sm:p-6"
      style={{ background: "#ECEFF1" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#191970" }}
        >
          <FileText size={16} style={{ color: "#FFC107" }} />
        </div>
        <span className="font-black text-xl" style={{ color: "#191970" }}>
          Invoice<span style={{ color: "#FFC107" }}>Gen</span>
        </span>
      </Link>

      <div className="w-full max-w-sm">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(25,25,112,0.08)",
            boxShadow: "0 8px 32px rgba(25,25,112,0.08)",
          }}
        >
          {/* Red top stripe */}
          <div className="h-1 w-full" style={{ background: "#EF4444" }} />

          {/* Header */}
          <div className="px-8 pt-8 pb-6" style={{ background: "#191970" }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: "rgba(239,68,68,0.15)" }}
            >
              <AlertTriangle size={18} style={{ color: "#F87171" }} />
            </div>
            <h2 className="text-xl font-black text-white mb-1">
              Something went wrong
            </h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              We encountered an unexpected error
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-5">
            <div
              className="p-4 rounded-xl"
              style={{ background: "#ECEFF1", border: "1px solid rgba(25,25,112,0.06)" }}
            >
              <Suspense
                fallback={
                  <p className="text-sm" style={{ color: "rgba(25,25,112,0.4)" }}>
                    Loading error details...
                  </p>
                }
              >
                <ErrorContent searchParams={searchParams} />
              </Suspense>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black transition-all"
                style={{
                  background: "#FFC107",
                  color: "#191970",
                  boxShadow: "0 4px 14px rgba(255,193,7,0.3)",
                }}
              >
                Go to Homepage
              </Link>
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                style={{
                  color: "#191970",
                  borderColor: "rgba(25,25,112,0.12)",
                  background: "transparent",
                }}
              >
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}