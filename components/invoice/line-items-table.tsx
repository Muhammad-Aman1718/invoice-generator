// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { LineItemsTableProps } from "@/types/invoice-types";
// import useLineItemsTable from "@/hooks/useLineItemsTable";

// export function LineItemsTable({
//   currency = "$",
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const {
//     lineItems,
//     handleQtyChange,
//     handleRateChange,
//     handleDiscountChange,
//     canRemove,
//     inp,
//     addLineItem,
//     removeLineItem,
//     updateLineItem,
//     fmt,
//     calculateLineItemAmount,
//   } = useLineItemsTable();

//   return (
//     <div
//       className="rounded-2xl overflow-hidden w-full"
//       style={{
//         border: "1px solid rgba(25,25,112,0.1)",
//         boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
//       }}
//     >
//       {/* ── Section label ── */}
//       <div
//         className="px-4 sm:px-5 py-3 flex items-center justify-between"
//         style={{ background: "#191970" }}
//       >
//         <div className="flex items-center gap-2">
//           <div
//             className="w-1 h-4 rounded-full"
//             style={{ background: "#FFC107" }}
//           />
//           <span
//             className="text-[10px] font-black uppercase tracking-widest"
//             style={{ color: "rgba(255,255,255,0.65)" }}
//           >
//             Line Items
//           </span>
//         </div>
//         <span
//           className="text-[10px] font-bold px-2 py-0.5 rounded-full"
//           style={{
//             background: "rgba(255,193,7,0.15)",
//             color: "#FFC107",
//           }}
//         >
//           {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       {/* Responsive scroll wrapper */}
//       <div className="overflow-x-auto">
//         <table
//           className="w-full text-sm border-collapse"
//           style={{ minWidth: "520px" }}
//         >
//           {/* ── Table Header ── */}
//           <thead>
//             <tr
//               style={{
//                 background: "rgba(25,25,112,0.04)",
//                 borderBottom: "2px solid rgba(25,25,112,0.08)",
//               }}
//             >
//               <th
//                 className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "rgba(25,25,112,0.45)", width: "38%" }}
//               >
//                 Description
//               </th>
//               <th
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "rgba(25,25,112,0.45)", width: "10%" }}
//               >
//                 Qty
//               </th>
//               <th
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "rgba(25,25,112,0.45)", width: "16%" }}
//               >
//                 Rate
//               </th>
//               {showDiscount && (
//                 <th
//                   className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                   style={{ color: "rgba(25,25,112,0.45)", width: "12%" }}
//                 >
//                   Disc %
//                 </th>
//               )}
//               <th
//                 className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "rgba(25,25,112,0.45)", width: "16%" }}
//               >
//                 Amount
//               </th>
//               <th style={{ width: "8%" }} />
//             </tr>
//           </thead>

//           {/* ── Table Body ── */}
//           <tbody style={{ background: "#ECEFF1" }}>
//             {lineItems.map((item, idx) => (
//               <tr
//                 key={item.id || idx}
//                 style={{
//                   background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
//                   borderBottom: "1px solid rgba(25,25,112,0.05)",
//                   transition: "background 0.15s",
//                 }}
//               >
//                 {/* Description */}
//                 <td className="px-3 sm:px-4 py-2.5 ">
//                   <input
//                     value={item.description}
//                     onChange={(e) =>
//                       updateLineItem(item.id!, "description", e.target.value)
//                     }
//                     placeholder="Item description..."
//                     className={inp}
//                   />
//                 </td>

//                 {/* Qty */}
//                 <td className="px-2 sm:px-3 py-2.5 min-w-[60px]">
//                   <input
//                     type="number"
//                     min={0}
//                     value={item.quantity || ""}
//                     onChange={(e) => handleQtyChange(item.id!, e.target.value)}
//                     placeholder="0"
//                     className={inp + " text-center"}
//                   />
//                 </td>

//                 {/* Rate */}
//                 <td className="px-1 sm:px-3 py-2.5 min-w-[80px]">
//                   <div className="relative flex items-center">
//                     <span
//                       className="absolute left-2.5 text-xs font-bold pointer-events-none select-none"
//                       style={{ color: "rgba(25,25,112,0.3)" }}
//                     >
//                       {currency}
//                     </span>
//                     <input
//                       type="number"
//                       min={0}
//                       step={0.01}
//                       value={item.rate || ""}
//                       onChange={(e) =>
//                         handleRateChange(item.id!, e.target.value)
//                       }
//                       placeholder="0.00"
//                       className={inp + " text-right pl-7"}
//                     />
//                   </div>
//                 </td>

//                 {/* Discount */}
//                 {showDiscount && (
//                   <td className="px-2 sm:px-3 py-2.5 min-w-[70px]">
//                     <div className="relative flex items-center">
//                       <input
//                         type="number"
//                         min={0}
//                         max={100}
//                         value={item.discount || ""}
//                         onChange={(e) =>
//                           handleDiscountChange(item.id!, e.target.value)
//                         }
//                         placeholder="0"
//                         className={inp + " text-center pr-5"}
//                       />
//                       <span
//                         className="absolute right-2.5 text-xs pointer-events-none select-none font-bold"
//                         style={{ color: "rgba(25,25,112,0.3)" }}
//                       >
//                         %
//                       </span>
//                     </div>
//                   </td>
//                 )}

//                 {/* Amount — read only */}
//                 <td className="px-3 sm:px-4 py-2.5 text-right">
//                   <div
//                     className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right"
//                     style={{
//                       background: "rgba(255,193,7,0.1)",
//                       color: "#191970",
//                       border: "1px solid rgba(255,193,7,0.2)",
//                     }}
//                   >
//                     {currency}
//                     {fmt(item.amount)}
//                   </div>
//                 </td>

//                 {/* Delete */}
//                 <td className="px-2 py-2.5 text-center">
//                   <button
//                     type="button"
//                     onClick={() => removeLineItem(item.id!)}
//                     disabled={!canRemove}
//                     className="p-1.5 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"
//                     style={{ color: "rgba(239,68,68,0.6)" }}
//                     onMouseEnter={(e) => {
//                       if (canRemove) {
//                         e.currentTarget.style.background = "#FEF2F2";
//                         e.currentTarget.style.color = "#EF4444";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background = "transparent";
//                       e.currentTarget.style.color = "rgba(239,68,68,0.6)";
//                     }}
//                     aria-label="Remove item"
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           {/* ── Footer: Add Item ── */}
//           <tfoot>
//             <tr
//               style={{
//                 background: "#ffffff",
//                 borderTop: "1px solid rgba(25,25,112,0.06)",
//               }}
//             >
//               <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
//                 <button
//                   type="button"
//                   onClick={addLineItem}
//                   className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl transition-all"
//                   style={{
//                     color: "#191970",
//                     background: "rgba(255,193,7,0.1)",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(255,193,7,0.2)";
//                     e.currentTarget.style.color = "#191970";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "rgba(255,193,7,0.1)";
//                     e.currentTarget.style.color = "#191970";
//                   }}
//                 >
//                   <Plus size={13} style={{ color: "#FFC107" }} />
//                   Add Item
//                 </button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//       <style jsx global>{`
//         /* Main Scrollbar Container */
//         .custom-scrollbar::-webkit-scrollbar {
//           height: 6px; /* Horizontal scrollbar ki height */
//           width: 6px;
//         }

//         /* Track (Background) */
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(
//             25,
//             25,
//             112,
//             0.03
//           ); /* Midnight blue ka halka touch */
//           border-radius: 10px;
//           margin-inline: 10px; /* Side se thoda gap */
//         }

//         /* Thumb (The moving part) */
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(25, 25, 112, 0.15); /* Midnight blue default */
//           border-radius: 10px;
//           border: 1px solid transparent;
//           background-clip: padding-box;
//           transition: all 0.2s ease;
//         }

//         /* Hover State */
//         .custom-scrollbar:hover::-webkit-scrollbar-thumb {
//           background: rgba(25, 25, 112, 0.3); /* Darker on hover */
//         }

//         /* Active/Click State */
//         .custom-scrollbar::-webkit-scrollbar-thumb:active {
//           background: #ffc107; /* Amber on drag - feedback milta hai user ko */
//         }

//         /* Firefox Support */
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(25, 25, 112, 0.2) transparent;
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { LineItemsTableProps } from "@/types/invoice-types";
// import useLineItemsTable from "@/hooks/useLineItemsTable";

// export function LineItemsTable({
//   currency = "$",
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const {
//     lineItems,
//     handleQtyChange,
//     handleRateChange,
//     handleDiscountChange,
//     canRemove,
//     inp,
//     addLineItem,
//     removeLineItem,
//     updateLineItem,
//     fmt,
//   } = useLineItemsTable();

//   return (
//     <section
//       className="rounded-2xl overflow-hidden w-full"
//       aria-labelledby="items-heading" // Section ko heading se connect kiya
//       style={{
//         border: "1px solid rgba(25,25,112,0.1)",
//         boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
//       }}
//     >
//       {/* ── Section label ── */}
//       <div
//         className="px-4 sm:px-5 py-3 flex items-center justify-between"
//         style={{ background: "#191970" }}
//       >
//         <div className="flex items-center gap-2">
//           <div
//             className="w-1 h-4 rounded-full"
//             style={{ background: "#FFC107" }}
//           />
//           <h2 // Span ki jagah semantic H2 use kiya screen readers ke liye
//             // id="items-heading"
//             className="text-[10px] font-black uppercase tracking-widest"
//             style={{ color: "#C8C8E8" }} // Contrast improve kiya (was 0.65 opacity)
//           >
//             Line Items
//           </h2>
//         </div>
//         <span
//           className="text-[10px] font-bold px-2 py-0.5 rounded-full"
//           aria-live="polite" // Jab items add/remove hon to SR update dega
//           style={{
//             background: "rgba(255,193,7,0.15)",
//             color: "#FFC107",
//           }}
//         >
//           {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       <div className="overflow-x-auto custom-scrollbar">
//         <table
//           className="w-full text-sm border-collapse"
//           style={{ minWidth: "520px" }}
//         >
//           <thead>
//             <tr
//               style={{
//                 background: "rgba(25,25,112,0.04)",
//                 borderBottom: "2px solid rgba(25,25,112,0.08)",
//               }}
//             >
//               <th
//                 scope="col" // SEO/A11y standard
//                 className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "38%" }} // Contrast fix
//               >
//                 Description
//               </th>
//               <th
//                 scope="col"
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "10%" }}
//               >
//                 Qty
//               </th>
//               <th
//                 scope="col"
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "16%" }}
//               >
//                 Rate
//               </th>
//               {showDiscount && (
//                 <th
//                   scope="col"
//                   className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                   style={{ color: "#3D3D6B", width: "12%" }}
//                 >
//                   Disc %
//                 </th>
//               )}
//               <th
//                 scope="col"
//                 className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "16%" }}
//               >
//                 Amount
//               </th>
//               <th scope="col" style={{ width: "8%" }}>
//                 <span className="sr-only">Actions</span>
//               </th>
//             </tr>
//           </thead>

//           <tbody style={{ background: "#ECEFF1" }}>
//             {lineItems.map((item, idx) => (
//               <tr
//                 key={item.id || idx}
//                 className="group"
//                 style={{
//                   background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
//                   borderBottom: "1px solid rgba(25,25,112,0.05)",
//                 }}
//               >
//                 <td className="px-3 sm:px-4 py-2.5">
//                   <input
//                     value={item.description}
//                     aria-label={`Description for item ${idx + 1}`}
//                     onChange={(e) =>
//                       updateLineItem(item.id!, "description", e.target.value)
//                     }
//                     placeholder="Item description..."
//                     className={inp}
//                   />
//                 </td>

//                 <td className="px-2 sm:px-3 py-2.5 min-w-[60px]">
//                   <input
//                     type="number"
//                     min={0}
//                     value={item.quantity || ""}
//                     aria-label={`Quantity for item ${idx + 1}`}
//                     onChange={(e) => handleQtyChange(item.id!, e.target.value)}
//                     placeholder="0"
//                     className={`${inp} text-center`}
//                   />
//                 </td>

//                 <td className="px-1 sm:px-3 py-2.5 min-w-[80px]">
//                   <div className="relative flex items-center">
//                     <span
//                       className="absolute left-2.5 text-xs font-bold pointer-events-none"
//                       aria-hidden="true"
//                       style={{ color: "#3D3D6B" }}
//                     >
//                       {currency}
//                     </span>
//                     <input
//                       type="number"
//                       min={0}
//                       step={0.01}
//                       value={item.rate || ""}
//                       aria-label={`Rate per unit for item ${idx + 1}`}
//                       onChange={(e) =>
//                         handleRateChange(item.id!, e.target.value)
//                       }
//                       placeholder="0.00"
//                       className={`${inp} text-right pl-7`}
//                     />
//                   </div>
//                 </td>

//                 {showDiscount && (
//                   <td className="px-2 sm:px-3 py-2.5 min-w-[70px]">
//                     <div className="relative flex items-center">
//                       <input
//                         type="number"
//                         min={0}
//                         max={100}
//                         value={item.discount || ""}
//                         aria-label={`Discount percentage for item ${idx + 1}`}
//                         onChange={(e) =>
//                           handleDiscountChange(item.id!, e.target.value)
//                         }
//                         placeholder="0"
//                         className={`${inp} text-center pr-5`}
//                       />
//                       <span
//                         className="absolute right-2.5 text-xs font-bold pointer-events-none"
//                         aria-hidden="true"
//                         style={{ color: "#3D3D6B" }}
//                       >
//                         %
//                       </span>
//                     </div>
//                   </td>
//                 )}

//                 <td className="px-3 sm:px-4 py-2.5 text-right">
//                   <div
//                     role="status" // Screen reader ko total update batayega
//                     className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right border"
//                     style={{
//                       background: "rgba(255,193,7,0.1)",
//                       color: "#191970",
//                       borderColor: "rgba(255,193,7,0.2)",
//                     }}
//                   >
//                     <span className="sr-only">
//                       Total amount for item {idx + 1}:
//                     </span>
//                     {currency}
//                     {fmt(item.amount)}
//                   </div>
//                 </td>

//                 <td className="px-2 py-2.5 text-center">
//                   <button
//                     type="button"
//                     onClick={() => removeLineItem(item.id!)}
//                     disabled={!canRemove}
//                     aria-label={`Delete item ${idx + 1}`}
//                     className="p-1.5 rounded-lg transition-all disabled:opacity-20"
//                     style={{ color: "rgba(239,68,68,0.8)" }}
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           <tfoot>
//             <tr
//               style={{
//                 background: "#ffffff",
//                 borderTop: "1px solid rgba(25,25,112,0.06)",
//               }}
//             >
//               <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
//                 <button
//                   type="button"
//                   onClick={addLineItem}
//                   aria-label="Add new line item"
//                   className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm"
//                   style={{
//                     color: "#191970",
//                     background: "rgba(255,193,7,0.15)",
//                   }}
//                 >
//                   <Plus
//                     size={14}
//                     strokeWidth={3}
//                     style={{ color: "#B8860B" }}
//                   />
//                   Add New Item
//                 </button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { Plus, Trash2 } from "lucide-react";
// import { LineItemsTableProps } from "@/types/invoice-types";
// import useLineItemsTable from "@/hooks/useLineItemsTable";

// export function LineItemsTable({
//   currency = "$",
//   showDiscount = false,
// }: LineItemsTableProps) {
//   const {
//     lineItems,
//     handleQtyChange,
//     handleRateChange,
//     handleDiscountChange,
//     canRemove,
//     inp,
//     addLineItem,
//     removeLineItem,
//     updateLineItem,
//     fmt,
//   } = useLineItemsTable();

//   return (
//     <section
//       className="rounded-2xl overflow-hidden w-full"
//       aria-labelledby="items-heading"
//       style={{
//         border: "1px solid rgba(25,25,112,0.1)",
//         boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
//       }}
//     >
//       {/* ── Section label ── */}
//       <div
//         className="px-4 sm:px-5 py-3 flex items-center justify-between"
//         style={{ background: "#191970" }}
//       >
//         <div className="flex items-center gap-2">
//           <div
//             className="w-1 h-4 rounded-full"
//             style={{ background: "#FFC107" }}
//           />
//           <h2
//             id="items-heading"
//             className="text-[10px] font-black uppercase tracking-widest"
//             style={{ color: "#C8C8E8" }}
//           >
//             Line Items
//           </h2>
//         </div>
//         <span
//           className="text-[10px] font-bold px-2 py-0.5 rounded-full"
//           aria-live="polite"
//           style={{
//             background: "rgba(255,193,7,0.15)",
//             color: "#FFC107",
//           }}
//         >
//           {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       <div className="overflow-x-auto custom-scrollbar">
//         <table
//           className="w-full text-sm border-collapse"
//           style={{ minWidth: "520px" }}
//         >
//           <thead>
//             <tr
//               style={{
//                 background: "rgba(25,25,112,0.04)",
//                 borderBottom: "2px solid rgba(25,25,112,0.08)",
//               }}
//             >
//               <th
//                 scope="col"
//                 className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "38%" }}
//               >
//                 Description
//               </th>
//               <th
//                 scope="col"
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "10%" }}
//               >
//                 Qty
//               </th>
//               <th
//                 scope="col"
//                 className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "16%" }}
//               >
//                 Rate
//               </th>
//               {showDiscount && (
//                 <th
//                   scope="col"
//                   className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
//                   style={{ color: "#3D3D6B", width: "12%" }}
//                 >
//                   Disc %
//                 </th>
//               )}
//               <th
//                 scope="col"
//                 className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
//                 style={{ color: "#3D3D6B", width: "16%" }}
//               >
//                 Amount
//               </th>
//               <th scope="col" style={{ width: "8%" }}>
//                 <span className="sr-only">Actions</span>
//               </th>
//             </tr>
//           </thead>

//           <tbody style={{ background: "#ECEFF1" }}>
//             {lineItems.map((item, idx) => (
//               <tr
//                 key={item.id || idx}
//                 className="group"
//                 style={{
//                   background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
//                   borderBottom: "1px solid rgba(25,25,112,0.05)",
//                 }}
//               >
//                 <td className="px-3 sm:px-4 py-2.5">
//                   {/* FIX: unique id har input pe */}
//                   <label
//                     htmlFor={`item-description-${item.id}`}
//                     className="sr-only"
//                   >
//                     Description for item {idx + 1}
//                   </label>
//                   <input
//                     id={`item-description-${item.id}`}
//                     name={`item-description-${item.id}`}
//                     value={item.description}
//                     aria-label={`Description for item ${idx + 1}`}
//                     onChange={(e) =>
//                       updateLineItem(item.id!, "description", e.target.value)
//                     }
//                     placeholder="Item description..."
//                     className={inp}
//                   />
//                 </td>

//                 <td className="px-2 sm:px-3 py-2.5 min-w-[60px]">
//                   <label
//                     htmlFor={`item-qty-${item.id}`}
//                     className="sr-only"
//                   >
//                     Quantity for item {idx + 1}
//                   </label>
//                   <input
//                     id={`item-qty-${item.id}`}
//                     name={`item-qty-${item.id}`}
//                     type="number"
//                     min={0}
//                     value={item.quantity || ""}
//                     aria-label={`Quantity for item ${idx + 1}`}
//                     onChange={(e) => handleQtyChange(item.id!, e.target.value)}
//                     placeholder="0"
//                     className={`${inp} text-center`}
//                   />
//                 </td>

//                 <td className="px-1 sm:px-3 py-2.5 min-w-[80px]">
//                   <div className="relative flex items-center">
//                     <span
//                       className="absolute left-2.5 text-xs font-bold pointer-events-none"
//                       aria-hidden="true"
//                       style={{ color: "#3D3D6B" }}
//                     >
//                       {currency}
//                     </span>
//                     <label
//                       htmlFor={`item-rate-${item.id}`}
//                       className="sr-only"
//                     >
//                       Rate per unit for item {idx + 1}
//                     </label>
//                     <input
//                       id={`item-rate-${item.id}`}
//                       name={`item-rate-${item.id}`}
//                       type="number"
//                       min={0}
//                       step={0.01}
//                       value={item.rate || ""}
//                       aria-label={`Rate per unit for item ${idx + 1}`}
//                       onChange={(e) =>
//                         handleRateChange(item.id!, e.target.value)
//                       }
//                       placeholder="0.00"
//                       className={`${inp} text-right pl-7`}
//                     />
//                   </div>
//                 </td>

//                 {showDiscount && (
//                   <td className="px-2 sm:px-3 py-2.5 min-w-[70px]">
//                     <div className="relative flex items-center">
//                       <label
//                         htmlFor={`item-discount-${item.id}`}
//                         className="sr-only"
//                       >
//                         Discount percentage for item {idx + 1}
//                       </label>
//                       <input
//                         id={`item-discount-${item.id}`}
//                         name={`item-discount-${item.id}`}
//                         type="number"
//                         min={0}
//                         max={100}
//                         value={item.discount || ""}
//                         aria-label={`Discount percentage for item ${idx + 1}`}
//                         onChange={(e) =>
//                           handleDiscountChange(item.id!, e.target.value)
//                         }
//                         placeholder="0"
//                         className={`${inp} text-center pr-5`}
//                       />
//                       <span
//                         className="absolute right-2.5 text-xs font-bold pointer-events-none"
//                         aria-hidden="true"
//                         style={{ color: "#3D3D6B" }}
//                       >
//                         %
//                       </span>
//                     </div>
//                   </td>
//                 )}

//                 <td className="px-3 sm:px-4 py-2.5 text-right">
//                   <div
//                     role="status"
//                     className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right border"
//                     style={{
//                       background: "rgba(255,193,7,0.1)",
//                       color: "#191970",
//                       borderColor: "rgba(255,193,7,0.2)",
//                     }}
//                   >
//                     <span className="sr-only">
//                       Total amount for item {idx + 1}:
//                     </span>
//                     {currency}
//                     {fmt(item.amount)}
//                   </div>
//                 </td>

//                 <td className="px-2 py-2.5 text-center">
//                   <button
//                     type="button"
//                     onClick={() => removeLineItem(item.id!)}
//                     disabled={!canRemove}
//                     aria-label={`Delete item ${idx + 1}`}
//                     className="p-1.5 rounded-lg transition-all disabled:opacity-20"
//                     style={{ color: "rgba(239,68,68,0.8)" }}
//                   >
//                     <Trash2 size={14} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//           <tfoot>
//             <tr
//               style={{
//                 background: "#ffffff",
//                 borderTop: "1px solid rgba(25,25,112,0.06)",
//               }}
//             >
//               <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
//                 <button
//                   type="button"
//                   onClick={addLineItem}
//                   aria-label="Add new line item"
//                   className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm"
//                   style={{
//                     color: "#191970",
//                     background: "rgba(255,193,7,0.15)",
//                   }}
//                 >
//                   <Plus
//                     size={14}
//                     strokeWidth={3}
//                     style={{ color: "#B8860B" }}
//                   />
//                   Add New Item
//                 </button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </section>
//   );
// }

"use client";

import { Plus, Trash2 } from "lucide-react";
import { LineItemsTableProps } from "@/types/invoice-types";
import useLineItemsTable from "@/hooks/useLineItemsTable";

export function LineItemsTable({
  currency = "$",
  showDiscount = false,
}: LineItemsTableProps) {
  const {
    lineItems,
    handleQtyChange,
    handleRateChange,
    handleDiscountChange,
    canRemove,
    inp,
    addLineItem,
    removeLineItem,
    updateLineItem,
    fmt,
  } = useLineItemsTable();

  return (
    <section
      className="rounded-2xl overflow-hidden w-full"
      aria-labelledby="items-heading"
      style={{
        border: "1px solid rgba(25,25,112,0.1)",
        boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
      }}
    >
      {/* ── Section label ── */}
      <div
        className="px-4 sm:px-5 py-3 flex items-center justify-between"
        style={{ background: "#191970" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-4 rounded-full"
            style={{ background: "#FFC107" }}
          />
          <h2
            id="items-heading"
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: "#C8C8E8" }}
          >
            Line Items
          </h2>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          aria-live="polite"
          style={{
            background: "rgba(255,193,7,0.15)",
            color: "#FFC107",
          }}
        >
          {lineItems.length} item{lineItems.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table
          className="w-full text-sm border-collapse"
          style={{ minWidth: "520px" }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(25,25,112,0.04)",
                borderBottom: "2px solid rgba(25,25,112,0.08)",
              }}
            >
              <th
                scope="col"
                className="text-left px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "38%" }}
              >
                Description
              </th>
              <th
                scope="col"
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "10%" }}
              >
                Qty
              </th>
              <th
                scope="col"
                className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "16%" }}
              >
                Rate
              </th>
              {showDiscount && (
                <th
                  scope="col"
                  className="text-center px-2 sm:px-3 py-3 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: "#3D3D6B", width: "12%" }}
                >
                  Disc %
                </th>
              )}
              <th
                scope="col"
                className="text-right px-3 sm:px-4 py-3 text-[10px] font-black uppercase tracking-widest"
                style={{ color: "#3D3D6B", width: "16%" }}
              >
                Amount
              </th>
              <th scope="col" style={{ width: "8%" }}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody style={{ background: "#ECEFF1" }}>
            {lineItems.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="group"
                style={{
                  background: idx % 2 === 0 ? "#ECEFF1" : "#ffffff",
                  borderBottom: "1px solid rgba(25,25,112,0.05)",
                }}
              >
                <td className="px-3 sm:px-4 py-2.5">
                  <label
                    htmlFor={`item-description-${idx}`}
                    className="sr-only"
                  >
                    Description for item {idx + 1}
                  </label>
                  <input
                    id={`item-description-${idx}`}
                    name={`item-description-${idx}`}
                    value={item.description}
                    aria-label={`Description for item ${idx + 1}`}
                    onChange={(e) =>
                      updateLineItem(item.id!, "description", e.target.value)
                    }
                    placeholder="Item description..."
                    className={inp}
                  />
                </td>

                <td className="px-2 sm:px-3 py-2.5 min-w-[60px]">
                  <label htmlFor={`item-qty-${idx}`} className="sr-only">
                    Quantity for item {idx + 1}
                  </label>
                  <input
                    id={`item-qty-${idx}`}
                    name={`item-qty-${idx}`}
                    type="number"
                    min={0}
                    value={item.quantity || ""}
                    aria-label={`Quantity for item ${idx + 1}`}
                    onChange={(e) => handleQtyChange(item.id!, e.target.value)}
                    placeholder="0"
                    className={`${inp} text-center`}
                  />
                </td>

                <td className="px-1 sm:px-3 py-2.5 min-w-[80px]">
                  <div className="relative flex items-center">
                    <span
                      className="absolute left-2.5 text-xs font-bold pointer-events-none"
                      aria-hidden="true"
                      style={{ color: "#3D3D6B" }}
                    >
                      {currency}
                    </span>
                    <label htmlFor={`item-rate-${idx}`} className="sr-only">
                      Rate per unit for item {idx + 1}
                    </label>
                    <input
                      id={`item-rate-${idx}`}
                      name={`item-rate-${idx}`}
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate || ""}
                      aria-label={`Rate per unit for item ${idx + 1}`}
                      onChange={(e) =>
                        handleRateChange(item.id!, e.target.value)
                      }
                      placeholder="0.00"
                      className={`${inp} text-right pl-7`}
                    />
                  </div>
                </td>

                {showDiscount && (
                  <td className="px-2 sm:px-3 py-2.5 min-w-[70px]">
                    <div className="relative flex items-center">
                      <label
                        htmlFor={`item-discount-${idx}`}
                        className="sr-only"
                      >
                        Discount percentage for item {idx + 1}
                      </label>
                      <input
                        id={`item-discount-${idx}`}
                        name={`item-discount-${idx}`}
                        type="number"
                        min={0}
                        max={100}
                        value={item.discount || ""}
                        aria-label={`Discount percentage for item ${idx + 1}`}
                        onChange={(e) =>
                          handleDiscountChange(item.id!, e.target.value)
                        }
                        placeholder="0"
                        className={`${inp} text-center pr-5`}
                      />
                      <span
                        className="absolute right-2.5 text-xs font-bold pointer-events-none"
                        aria-hidden="true"
                        style={{ color: "#3D3D6B" }}
                      >
                        %
                      </span>
                    </div>
                  </td>
                )}

                <td className="px-3 sm:px-4 py-2.5 text-right">
                  <div
                    role="status"
                    className="px-2.5 py-2 rounded-xl text-sm font-black tabular-nums text-right border"
                    style={{
                      background: "rgba(255,193,7,0.1)",
                      color: "#191970",
                      borderColor: "rgba(255,193,7,0.2)",
                    }}
                  >
                    <span className="sr-only">
                      Total amount for item {idx + 1}:
                    </span>
                    {currency}
                    {fmt(item.amount)}
                  </div>
                </td>

                <td className="px-2 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id!)}
                    disabled={!canRemove}
                    aria-label={`Delete item ${idx + 1}`}
                    className="p-1.5 rounded-lg transition-all disabled:opacity-20"
                    style={{ color: "rgba(239,68,68,0.8)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr
              style={{
                background: "#ffffff",
                borderTop: "1px solid rgba(25,25,112,0.06)",
              }}
            >
              <td colSpan={showDiscount ? 6 : 5} className="px-3 sm:px-4 py-3">
                <button
                  type="button"
                  onClick={addLineItem}
                  aria-label="Add new line item"
                  className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  style={{
                    color: "#191970",
                    background: "rgba(255,193,7,0.15)",
                  }}
                >
                  <Plus
                    size={14}
                    strokeWidth={3}
                    style={{ color: "#B8860B" }}
                  />
                  Add New Item
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
