import { NextResponse } from "next/server";
import { ApiError, check, handle, readJson, requireAdmin } from "@/src/lib/server/auth";
import { adminUserPatchSchema, firstIssue } from "@/src/lib/validation";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/users/:id { role?, isSuspended?, plan?, billingInterval?, currentPeriodEnd? }
export const PATCH = handle(async (request: Request, ctx: Ctx) => {
  const { id } = await ctx.params;
  const { supabase, user } = await requireAdmin();
  const parsed = adminUserPatchSchema.safeParse(await readJson(request));
  if (!parsed.success) throw new ApiError(400, firstIssue(parsed.error));
  const { role, isSuspended, plan, billingInterval, currentPeriodEnd } = parsed.data;

  if (id === user.id && (role === "user" || isSuspended)) {
    throw new ApiError(400, "You can't remove your own admin access.");
  }

  if (role !== undefined || isSuspended !== undefined) {
    const update: Record<string, unknown> = {};
    if (role !== undefined) update.role = role;
    if (isSuspended !== undefined) update.is_suspended = isSuspended;
    check(await supabase.from("profiles").update(update).eq("id", id));
  }

  if (plan !== undefined) {
    check(
      await supabase.from("subscriptions").upsert(
        {
          user_id: id,
          plan,
          status: "active",
          provider: "manual",
          billing_interval: billingInterval ?? "month",
          current_period_end: plan === "free" ? null : (currentPeriodEnd ?? null),
          cancel_at_period_end: false,
        },
        { onConflict: "user_id" },
      ),
    );
  }

  return NextResponse.json({ ok: true });
});
