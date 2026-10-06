export const ROUTES = {
  home: "/",
  login: "/auth/login",
  signUp: "/auth/sign-up",
  signUpSuccess: "/auth/sign-up-success",
  forgotPassword: "/auth/forgot-password",
  updatePassword: "/auth/update-password",
  authCallback: "/auth/callback",
  authConfirm: "/auth/confirm",
  authError: "/auth/error",
  dashboard: "/dashboard",
  invoices: "/dashboard/invoices",
  newInvoice: "/dashboard/invoices/new",
  clients: "/dashboard/clients",
  reports: "/dashboard/reports",
  billing: "/dashboard/billing",
  settings: "/dashboard/settings",
  admin: "/dashboard/admin",
  adminUsers: "/dashboard/admin/users",
} as const;

/** Pages that need a signed-in user. */
export const PROTECTED_PREFIXES = [ROUTES.dashboard];

/** Signed-in users skip these and land in the dashboard. */
export const GUEST_ONLY_ROUTES: string[] = [ROUTES.login, ROUTES.signUp];
