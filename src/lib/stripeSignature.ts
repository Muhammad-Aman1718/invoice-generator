import crypto from "node:crypto";
import { STRIPE_SIGNATURE_TOLERANCE_SECONDS } from "@/src/constant/app";
import type { StripeSignatureInput } from "@/src/types/types";

function parseSignatureHeader(header: string) {
  const parts = header.split(",").map((part) => part.trim());
  const timestamp = Number(parts.find((p) => p.startsWith("t="))?.slice(2));
  const signatures = parts.filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  return { timestamp, signatures };
}

function safeEqualHex(a: string, b: string): boolean {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

/** Verify a `Stripe-Signature` header (v1 HMAC-SHA256 with replay tolerance). */
export function verifyStripeSignature({
  payload,
  header,
  secret,
  now = Date.now(),
}: StripeSignatureInput): boolean {
  if (!header) return false;
  const { timestamp, signatures } = parseSignatureHeader(header);
  const ageSeconds = Math.abs(now / 1000 - timestamp);
  if (!timestamp || ageSeconds > STRIPE_SIGNATURE_TOLERANCE_SECONDS) return false;

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signatures.some((signature) => safeEqualHex(signature, expected));
}
