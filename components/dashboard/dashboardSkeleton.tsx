// export function DashboardSkeleton() {
//   return (
//     <div className="space-y-8 animate-pulse">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="h-32 bg-slate-500 rounded-xl" />
//         ))}
//       </div>
//       <div className="space-y-4">
//         <div className="h-8 w-48 bg-slate-100 rounded" />
//         <div className="h-64 bg-slate-100 rounded-xl" />
//       </div>
//     </div>
//   );
// }

// ─────────────────────────────────────────────
//  DashboardSkeleton — matches #ECEFF1 / #191970 / #FFC107 theme
//  Correct pulse animation, no slate-500 blocks
// ─────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-4 sm:p-6 md:p-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(25,25,112,0.07)",
            }}
          >
            {/* Left accent bar placeholder */}
            <div
              className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
              style={{ background: "rgba(25,25,112,0.08)" }}
            />
            <div className="pl-3">
              <div
                className="h-2.5 w-20 rounded mb-3"
                style={{ background: "rgba(25,25,112,0.08)" }}
              />
              <div
                className="h-7 w-28 rounded-lg"
                style={{ background: "rgba(25,25,112,0.08)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="h-3 w-28 rounded"
            style={{ background: "rgba(25,25,112,0.08)" }}
          />
          <div
            className="h-5 w-14 rounded-full"
            style={{ background: "rgba(255,193,7,0.15)" }}
          />
        </div>

        {/* Table card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(25,25,112,0.07)",
          }}
        >
          {/* Table header */}
          <div
            className="px-4 py-3 flex gap-4"
            style={{ borderBottom: "2px solid rgba(25,25,112,0.06)" }}
          >
            {[40, 20, 15, 15, 10].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded"
                style={{ width: `${w}%`, background: "rgba(25,25,112,0.06)" }}
              />
            ))}
          </div>

          {/* Table rows */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="px-4 py-3.5 flex items-center gap-4"
              style={{
                borderBottom: "1px solid rgba(25,25,112,0.04)",
                background: i % 2 !== 0 ? "#ECEFF1" : "#ffffff",
              }}
            >
              {/* Invoice # */}
              <div style={{ width: "40%" }}>
                <div
                  className="h-3 w-16 rounded mb-1.5"
                  style={{ background: "rgba(25,25,112,0.09)" }}
                />
              </div>
              {/* Client */}
              <div
                className="h-3 rounded"
                style={{ width: "20%", background: "rgba(25,25,112,0.07)" }}
              />
              {/* Date */}
              <div
                className="h-3 rounded"
                style={{ width: "15%", background: "rgba(25,25,112,0.06)" }}
              />
              {/* Amount */}
              <div
                className="h-3 rounded ml-auto"
                style={{ width: "12%", background: "rgba(25,25,112,0.09)" }}
              />
              {/* Action dot */}
              <div
                className="w-5 h-5 rounded-full"
                style={{ background: "rgba(25,25,112,0.06)", flexShrink: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
