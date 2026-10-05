import { LOCAL_DEV_URL } from "@/src/constant/app";

/** Absolute site URL without a trailing slash, accepting env values with or without a protocol. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    LOCAL_DEV_URL;
  const withProtocol = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}
