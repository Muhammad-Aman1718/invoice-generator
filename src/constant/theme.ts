/** Brand palette (60 · 30 · 10): mist background, navy, amber accent. */
export const BRAND_COLORS = {
  mist: "#ECEFF1",
  navy: "#191970",
  amber: "#FFC107",
} as const;

/** Print-friendly tints of navy used in generated PDFs. */
export const PDF_COLORS = {
  navy: "#191970",
  amber: "#FFC107",
  white: "#ffffff",
  mist: "#F3F5F7", // mist at ~70% on white
  muted: "#6B6B9A", // navy at ~65%
  muted2: "#8C8CB5", // navy at ~45%
  border: "#E4E4EF", // navy at ~8%
  green: "#047857",
  greenBg: "#ECFDF5",
  onNavyMuted: "#A9A9CC", // white at ~60% on navy
};

/** Accent classes for KPI cards. */
export const STAT_TONES = {
  navy: { bar: "bg-gold", icon: "bg-gold/10 text-gold-dark" },
  green: { bar: "bg-emerald-500", icon: "bg-emerald-50 text-emerald-600" },
  amber: { bar: "bg-amber-500", icon: "bg-amber-50 text-amber-600" },
  red: { bar: "bg-red-500", icon: "bg-red-50 text-red-600" },
} as const;

/** Shared class names for dropdown menu items and section labels. */
export const MENU_ITEM_CLASS =
  "flex cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-navy outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-mist data-[disabled]:opacity-50";
export const MENU_LABEL_CLASS =
  "px-2.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-navy-500";

export const COMPACT_SELECT_CLASS =
  "rounded-lg border border-navy/10 bg-white px-2 py-1.5 text-xs font-bold text-navy";

/** Borderless input used inside the line-items table. */
export const LINE_ITEM_INPUT_CLASS =
  "w-full rounded-lg border border-transparent bg-white px-2.5 py-2 text-sm font-medium text-navy outline-none transition placeholder:text-navy/25 hover:border-navy/15 focus:border-gold focus:ring-2 focus:ring-gold/20";

/** Delay between stat cards fading in, so they appear one after another. */
export const STAT_CARD_STAGGER_MS = 60;

/** Delay between content cards (blog, values) fading in. */
export const CARD_STAGGER_MS = 80;
