import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ApiError, unwrapResult, withErrorHandling } from "@/src/lib/server/apiError";
import { requireAdmin } from "@/src/lib/server/auth";
import { getRouteId, parseRequestBody } from "@/src/lib/server/parseRequest";
import { adminUserPatchSchema } from "@/src/lib/validation";
import { ENTITY_NAMES, HTTP_STATUS } from "@/src/constant/http";
import type { AdminUserUpdate, RouteContext } from "@/src/types/types";

async function updateAccess(supabase: SupabaseClient, userId: string, input: AdminUserUpdate) {
  const update: Record<string, unknown> = {};
  if (input.role !== undefined) update.role = input.role;
  if (input.isSuspended !== undefined) update.is_suspended = input.isSuspended;
  if (Object.keys(update).length === 0) return;
  unwrapResult(await supabase.from("profiles").update(update).eq("id", userId));
}

async function updatePlan(supabase: SupabaseClient, userId: string, input: AdminUserUpdate) {
  if (input.plan === undefined) return;
  const row = {
    user_id: userId,
    plan: input.plan,
    status: "active",
    provider: "manual",
    billing_interval: input.billingInterval ?? "month",
    current_period_end: input.plan === "free" ? null : (input.currentPeriodEnd ?? null),
    cancel_at_period_end: false,
  };
  unwrapResult(await supabase.from("subscriptions").upsert(row, { onConflict: "user_id" }));
}

// PATCH /api/admin/users/:id { role?, isSuspended?, plan?, billingInterval?, currentPeriodEnd? }
export const PATCH = withErrorHandling(async (request: Request, context: RouteContext) => {
  const userId = await getRouteId(context, ENTITY_NAMES.user);
  const { supabase, user } = await requireAdmin();
  const input = await parseRequestBody(request, adminUserPatchSchema);

  if (userId === user.id && (input.role === "user" || input.isSuspended)) {
    throw new ApiError(HTTP_STATUS.badRequest, "You can't remove your own admin access.");
  }
  await updateAccess(supabase, userId, input);
  await updatePlan(supabase, userId, input);
  return NextResponse.json({ ok: true });
});
