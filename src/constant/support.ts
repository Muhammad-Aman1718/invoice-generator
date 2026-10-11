import { SITE_CONFIG } from "@/src/constant/site";

/** Response times promised on each plan (see PLANS features). */
export const SUPPORT_LEVELS = {
  standard: { title: "Email support", detail: "We reply within 2 business days." },
  priority: {
    title: "Priority support",
    detail: "Your messages jump the queue, with a reply within 24 hours.",
  },
};

/** Prefix that marks Business-plan messages so they are answered first. */
export const PRIORITY_SUBJECT_PREFIX = "[Priority]";

/** Booking link for the Business onboarding call; falls back to email. */
export const ONBOARDING_BOOKING_URL =
  process.env.NEXT_PUBLIC_ONBOARDING_BOOKING_URL ||
  `mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent("Book my onboarding call")}`;

/** Features Business customers get before everyone else. */
export const EARLY_ACCESS_FEATURES = [
  {
    title: "Payment reminders",
    detail: "Copy a polite, ready-to-send reminder for any pending or overdue invoice from the ⋯ menu.",
  },
];
