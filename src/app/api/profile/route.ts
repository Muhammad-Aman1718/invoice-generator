import { NextResponse } from "next/server";
import { rowToProfile } from "@/src/lib/mappers";
import {
  ApiError,
  check,
  getProfile,
  getSubscription,
  handle,
  readJson,
  requireUser,
} from "@/src/lib/server/auth";
import { firstIssue, profileSchema } from "@/src/lib/validation";

// GET /api/profile → profile, business defaults and current plan
export const GET = handle(async () => {
  const session = await requireUser();
  const [profile, subscription] = await Promise.all([
    getProfile(session),
    getSubscription(session),
  ]);
  return NextResponse.json({ profile, subscription });
});

// PATCH /api/profile
export const PATCH = handle(async (request: Request) => {
  const { supabase, user } = await requireUser();
  const parsed = profileSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const p = parsed.data;

  const update = Object.fromEntries(
    Object.entries({
      full_name: p.fullName,
      company_name: p.companyName,
      business_info: p.businessInfo,
      logo_data_url: p.logoDataUrl,
      default_currency: p.defaultCurrency,
      default_tax_rate: p.defaultTaxRate,
      default_notes: p.defaultNotes,
      default_terms: p.defaultTerms,
      payment_terms_days: p.paymentTermsDays,
    }).filter(([, v]) => v !== undefined),
  );

  const data = check(
    await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email, ...update })
      .select("*")
      .single(),
  );
  return NextResponse.json({ profile: rowToProfile(data) });
});
