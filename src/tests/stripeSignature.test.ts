import crypto from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyStripeSignature } from "@/src/lib/stripeSignature";

const SECRET = "whsec_test";
const PAYLOAD = JSON.stringify({ id: "evt_1" });
const TIMESTAMP = 1_750_000_000;
const NOW_MS = TIMESTAMP * 1000;

function sign(timestamp: number, payload = PAYLOAD, secret = SECRET): string {
  return crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
}

describe("verifyStripeSignature", () => {
  it("accepts a valid v1 signature", () => {
    const header = `t=${TIMESTAMP},v1=${sign(TIMESTAMP)}`;
    expect(verifyStripeSignature({ payload: PAYLOAD, header, secret: SECRET, now: NOW_MS })).toBe(true);
  });

  it("accepts the header when any of several v1 signatures matches", () => {
    const header = `t=${TIMESTAMP},v1=${"0".repeat(64)},v1=${sign(TIMESTAMP)}`;
    expect(verifyStripeSignature({ payload: PAYLOAD, header, secret: SECRET, now: NOW_MS })).toBe(true);
  });

  it("rejects a tampered payload", () => {
    const header = `t=${TIMESTAMP},v1=${sign(TIMESTAMP)}`;
    const input = { payload: `${PAYLOAD} `, header, secret: SECRET, now: NOW_MS };
    expect(verifyStripeSignature(input)).toBe(false);
  });

  it("rejects a signature made with another secret", () => {
    const header = `t=${TIMESTAMP},v1=${sign(TIMESTAMP, PAYLOAD, "whsec_other")}`;
    expect(verifyStripeSignature({ payload: PAYLOAD, header, secret: SECRET, now: NOW_MS })).toBe(false);
  });

  it("rejects old timestamps to prevent replays", () => {
    const header = `t=${TIMESTAMP},v1=${sign(TIMESTAMP)}`;
    const tenMinutesLater = NOW_MS + 10 * 60 * 1000;
    const input = { payload: PAYLOAD, header, secret: SECRET, now: tenMinutesLater };
    expect(verifyStripeSignature(input)).toBe(false);
  });

  it("rejects a missing or malformed header", () => {
    expect(verifyStripeSignature({ payload: PAYLOAD, header: null, secret: SECRET, now: NOW_MS })).toBe(
      false,
    );
    expect(verifyStripeSignature({ payload: PAYLOAD, header: "garbage", secret: SECRET, now: NOW_MS })).toBe(
      false,
    );
  });
});
