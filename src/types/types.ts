import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import type { SupabaseClient, User } from "@supabase/supabase-js";

/* ───────────────────────────── Domain ───────────────────────────── */

export type CurrencyCode = string;

export type Tab = "edit" | "preview";

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export type UserRole = "user" | "admin";

export type PlanId = "free" | "pro" | "business";

export type BillingInterval = "month" | "year";

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
  locale: string;
}

export interface ImageSize {
  maxWidth: number;
  maxHeight: number;
}

export interface TaxType {
  label: string;
  rate: number;
}

export interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  rate: number;
  /** Percentage discount on this line only. */
  discount: number;
  amount: number;
}

export interface InvoiceData {
  id?: string;
  userId?: string;
  clientId?: string | null;
  logoDataUrl: string | null;
  stampUrl: string | null;
  invoiceNumber: number;
  currency: CurrencyCode;
  businessName: string;
  /** Spelling kept to match the existing `bussiness_info` database column. */
  bussinessInfo: string;
  issueDate: string;
  dueDate: string;
  poNumber?: string;
  clientName: string;
  clientAddress: string;
  shipTo?: string;
  lineItems: LineItem[];
  notes: string;
  terms: string;
  subtotal: number;
  /** Percentage applied to the subtotal. */
  overallDiscount: number;
  /** Percentage applied after the overall discount. */
  taxRate: number;
  totalAmount: number;
  status: InvoiceStatus;
  currencySymbol?: string;
  createdAt?: string;
  updatedAt?: string;
  paidAt?: string | null;
}

/** Lightweight row used by lists, dashboards and reports. */
export type InvoiceSummary = Pick<
  InvoiceData,
  | "id"
  | "clientId"
  | "invoiceNumber"
  | "clientName"
  | "issueDate"
  | "dueDate"
  | "currency"
  | "totalAmount"
  | "status"
  | "createdAt"
>;

export type InvoiceSummaryRow = InvoiceSummary & { shownStatus: InvoiceStatus };

export interface InvoiceTotals {
  lineItems: LineItem[];
  subtotal: number;
  totalAmount: number;
}

export interface TotalsBreakdown {
  discountAmount: number;
  taxAmount: number;
}

export interface DBInvoiceRow {
  id?: string;
  user_id: string;
  client_id?: string | null;
  logo_data_url: string | null;
  stamp_url: string | null;
  invoice_number: number;
  currency: string;
  business_name: string | null;
  bussiness_info: string | null;
  issue_date: string | null;
  due_date: string | null;
  po_number: string | null;
  client_name: string | null;
  client_address: string | null;
  ship_to: string | null;
  line_items: LineItem[] | null;
  notes: string | null;
  terms: string | null;
  subtotal: number | string;
  overall_discount: number | string;
  tax_rate: number | string;
  total_amount: number | string;
  status: string;
  paid_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** Untyped Supabase row before mapping (validated field by field in mappers). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DbRow = Record<string, any>;

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  notes: string | null;
  createdAt: string;
}

export type ClientFormValues = Record<"name" | "email" | "phone" | "address" | "taxId" | "notes", string>;

export interface ClientWithStats extends Client {
  invoiceCount: number;
  total: number;
  currency: string;
}

export interface Profile {
  id: string;
  email: string | null;
  fullName: string | null;
  role: UserRole;
  companyName: string | null;
  businessInfo: string | null;
  logoDataUrl: string | null;
  defaultCurrency: string;
  defaultTaxRate: number;
  defaultNotes: string | null;
  defaultTerms: string | null;
  paymentTermsDays: number;
  isSuspended: boolean;
  createdAt: string;
}

export interface ProfileFormValues {
  fullName: string;
  companyName: string;
  businessInfo: string;
  logoDataUrl: string | null;
  defaultCurrency: string;
  defaultTaxRate: number;
  paymentTermsDays: number;
  defaultNotes: string;
  defaultTerms: string;
}

export interface Subscription {
  plan: PlanId;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  provider: string;
  hasBillingPortal: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: Record<BillingInterval, number>;
  limits: {
    /** null = unlimited */
    invoicesPerMonth: number | null;
    clients: number | null;
  };
  perks: {
    csvExport: boolean;
    removeBranding: boolean;
    prioritySupport: boolean;
  };
  features: string[];
  highlighted?: boolean;
}

export interface AdminUser extends Profile {
  subscription: Subscription;
  invoiceCount: number;
}

export interface AdminUserUpdate {
  role?: UserRole;
  isSuspended?: boolean;
  plan?: PlanId;
  billingInterval?: BillingInterval;
  currentPeriodEnd?: string | null;
}

export interface AdminStats {
  users: AdminUser[];
  totalUsers: number;
  newUsers30d: number;
  admins: number;
  suspended: number;
  byPlan: Record<PlanId, number>;
  mrr: number;
  invoiceTotal: number;
  invoiceMonth: number;
}

export interface MonthlyPoint {
  label: string;
  invoiced: number;
  paid: number;
}

export type MonthBucket = MonthlyPoint & { key: string };

export type InvoiceComparator = (a: InvoiceSummaryRow, b: InvoiceSummaryRow) => number;

export interface TopClient {
  name: string;
  total: number;
  count: number;
}

export interface DashboardStats {
  currency: string;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  overdue: number;
  counts: Record<InvoiceStatus, number>;
  monthly: MonthlyPoint[];
  topClients: TopClient[];
  mixedCurrencies: boolean;
}

export interface InvoiceIdResponse {
  invoice: { id: string };
}

export type OAuthProvider = "google" | "github";

export interface SignUpValues {
  email: string;
  password: string;
  repeatPassword: string;
  acceptedTerms: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ───────────────────────────── Server ───────────────────────────── */

export interface Session {
  supabase: SupabaseClient;
  user: User;
}

export interface RouteContext {
  params: Promise<{ id: string }>;
}

export interface Viewer extends Session {
  profile: Profile;
  subscription: Subscription;
  plan: Plan;
}

export type StripeParams = Record<string, string | number | boolean | undefined>;

export interface CheckoutInput {
  userId: string;
  email?: string;
  customerId?: string | null;
  plan: PlanId;
  interval: BillingInterval;
  price: string;
  origin: string;
}

/** Subset of a Stripe Subscription object that the webhook reads. */
export interface StripeSubscriptionObject {
  id: string;
  status: string;
  customer: string | { id: string };
  cancel_at_period_end?: boolean;
  current_period_end?: number;
  metadata?: Record<string, string>;
  items?: {
    data?: { current_period_end?: number; price?: { recurring?: { interval?: string } } }[];
  };
}

export interface SubscriptionRow {
  plan: PlanId;
  status: SubscriptionStatus;
  billing_interval: BillingInterval;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  provider: "stripe";
  provider_customer_id: string;
  provider_subscription_id: string;
}

export interface StripeRequest {
  method: "GET" | "POST";
  path: string;
  params?: StripeParams;
}

export interface StripeSignatureInput {
  payload: string;
  header: string | null;
  secret: string;
  /** Current time in ms (injectable for tests). */
  now?: number;
}

/* ─────────────────────────── Config / content ─────────────────────────── */

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SidebarNavItem extends NavLink {
  icon: LucideIcon;
  exact: boolean;
  /** Paths that start with `href` but should not highlight this item. */
  excludes?: string[];
}

export interface StatItem {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: "navy" | "green" | "amber" | "red";
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface TemplateUse {
  title: string;
  body: string;
}

export interface Release {
  version: string;
  date: string;
  items: string[];
}

export interface BlogPost {
  title: string;
  date: string;
  tag: string;
  body: string[];
}

export interface SitemapPage {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export interface ContactChannel {
  icon: LucideIcon;
  title: string;
  body: string;
  href?: string;
}

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  desc: string;
  body?: string;
}

export interface ApiEndpointGroup {
  title: string;
  endpoints: ApiEndpoint[];
}

export interface ShellViewer {
  email: string;
  name: string;
  role: UserRole;
  planName: string;
  isPaid: boolean;
  usage: { used: number; limit: number | null };
}

export type InvoiceSortKey = "newest" | "oldest" | "amount-desc" | "amount-asc" | "due";

export type InvoiceFilter = "all" | InvoiceStatus;

export interface InvoiceListQuery {
  filter: InvoiceFilter;
  query: string;
  sort: InvoiceSortKey;
}

export type ReportRangeKey = "30d" | "90d" | "12m" | "all";

export interface ReportRange {
  label: string;
  /** null = all time */
  days: number | null;
}

/* ───────────────────────────── Store ───────────────────────────── */

export interface InvoiceStore extends InvoiceData {
  setField: <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => void;
  setLogo: (dataUrl: string | null) => void;
  setStampUrl: (dataUrl: string | null) => void;
  addLineItem: () => void;
  removeLineItem: (id: string) => void;
  updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
  resetInvoice: () => void;
  loadInvoice: (data: Partial<InvoiceData>) => void;
}

/* ───────────────────────────── Component props ───────────────────────────── */

// ui
export interface FieldProps {
  label: string;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface SearchInputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

// layout
export interface LayoutProps {
  children: ReactNode;
}

export interface BrandLogoProps {
  href?: string;
  size?: "sm" | "md";
}

export interface MobileMenuProps {
  open: boolean;
  signedIn: boolean;
  pathname: string;
}

export interface HeaderAuthActionsProps {
  signedIn: boolean;
}

// auth
export interface AuthButtonProps {
  isLoading?: boolean;
  label: string;
}

export interface AuthDividerProps {
  text: string;
}

export interface AuthHeaderProps {
  title: string;
  description: string;
}

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  isPassword?: boolean;
  forgotLink?: string;
  hasError?: boolean;
  isValidMatch?: boolean;
}

export interface AuthRedirectProps {
  text: string;
  linkText: string;
  href: string;
}

export interface FormContainerProps {
  children?: ReactNode;
}

export interface LoaderProps {
  className?: string;
  text?: string;
}

export interface ResendConfirmationNoticeProps {
  email: string;
}

export interface UpdatePasswordOptions {
  /** Where to go after a successful change (e.g. after a reset link). */
  redirectTo?: string;
}

export interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface PasswordFieldsProps {
  password: string;
  confirmation: string;
  onPasswordChange: (value: string) => void;
  onConfirmationChange: (value: string) => void;
}

export interface SocialOAuthButtonProps {
  provider: OAuthProvider;
  title: string;
  onClick: () => void;
}

// billing
export interface PlanGridProps {
  /** Signed-in plan; omitted on the public pricing page. */
  currentPlan?: PlanId;
  mode: "public" | "dashboard";
}

export interface PlanCardProps {
  plan: Plan;
  interval: BillingInterval;
  action: ReactNode;
}

export interface PlanActionProps {
  plan: Plan;
  mode: "public" | "dashboard";
  currentPlan?: PlanId;
  isLoading: boolean;
  disabled: boolean;
  onUpgrade: (plan: PlanId) => void;
}

export interface BillingIntervalToggleProps {
  value: BillingInterval;
  onChange: (interval: BillingInterval) => void;
}

export interface CheckoutBannerProps {
  checkout?: string;
  isPastDue: boolean;
  planName: string;
}

export interface CurrentPlanCardProps {
  plan: Plan;
  subscription: Subscription;
}

export interface UsageCardProps {
  plan: Plan;
  invoicesUsed: number;
  clientsUsed: number;
}

export interface UsageMeterProps {
  label: string;
  used: number;
  limit: number | null;
}

// dashboard
export interface DashboardShellProps {
  viewer: ShellViewer;
  children: ReactNode;
}

export interface SidebarBodyProps {
  viewer: ShellViewer;
  pathname: string;
  onClose?: () => void;
  onLogout: () => void;
}

export interface NavSectionProps {
  title: string;
  items: SidebarNavItem[];
  pathname: string;
}

export interface PlanUsageCardProps {
  viewer: ShellViewer;
}

export interface SidebarUserProps {
  viewer: ShellViewer;
  onLogout: () => void;
}

export interface MobileTopBarProps {
  onMenuOpen: () => void;
}

export interface StatsCardsProps {
  items: StatItem[];
}

export interface RevenueChartProps {
  data: MonthlyPoint[];
  currency: string;
}

export interface RevenueTableProps {
  data: MonthlyPoint[];
  currency: string;
}

export interface RevenueBarsProps {
  data: MonthlyPoint[];
  currency: string;
  max: number;
}

export interface RevenueTooltipProps {
  point: MonthlyPoint;
  currency: string;
}

export interface ChartYAxisProps {
  ticks: number[];
}

export interface SetupChecklistInput {
  profile: Profile;
  clientCount: number;
  stats: DashboardStats;
  invoiceCount: number;
}

export interface ReportKpi {
  label: string;
  value: string;
}

export interface ReportKpisProps {
  items: ReportKpi[];
}

export interface ReportRangeTabsProps {
  current: ReportRangeKey;
}

export interface TopClientsTableProps {
  clients: TopClient[];
  currency: string;
}

export interface UpgradePromptProps {
  title: string;
  description: string;
}

export interface SetupChecklistProps {
  items: { done: boolean; label: string; href: string }[];
}

export interface TopClientsCardProps {
  clients: TopClient[];
  currency: string;
}

export interface RecentInvoicesProps {
  invoices: InvoiceSummary[];
}

export interface StatusBreakdownProps {
  counts: Record<InvoiceStatus, number>;
  total: number;
}

// invoices list
export interface InvoiceListProps {
  invoices: InvoiceSummary[];
  canExportCsv: boolean;
  pdfBranding: boolean;
}

export interface InvoiceToolbarProps {
  listQuery: InvoiceListQuery;
  counts: Partial<Record<InvoiceFilter, number>>;
  canExportCsv: boolean;
  onChange: (changes: Partial<InvoiceListQuery>) => void;
}

export interface StatusFilterTabsProps {
  value: InvoiceFilter;
  counts: Partial<Record<InvoiceFilter, number>>;
  onChange: (filter: InvoiceFilter) => void;
}

export interface SortSelectProps {
  value: InvoiceSortKey;
  onChange: (sort: InvoiceSortKey) => void;
}

export interface CsvExportButtonProps {
  enabled: boolean;
}

export interface InvoiceActions {
  onDownload: (invoice: InvoiceSummary) => void;
  onDuplicate: (invoice: InvoiceSummary) => void;
  onStatusChange: (invoice: InvoiceSummary, status: InvoiceStatus) => void;
  onDelete: (invoice: InvoiceSummary) => void;
}

export interface InvoiceActionMenuProps {
  invoice: InvoiceSummaryRow;
  actions: InvoiceActions;
}

export interface InvoiceTableProps {
  invoices: InvoiceSummaryRow[];
  actions: InvoiceActions;
}

export type InvoiceCardListProps = InvoiceTableProps;

export interface InvoiceTableRowProps {
  invoice: InvoiceSummaryRow;
  actions: InvoiceActions;
}

// clients
export interface ClientsManagerProps {
  clients: ClientWithStats[];
  limit: number | null;
}

export interface ClientCardProps {
  client: ClientWithStats;
  onEdit: (client: ClientWithStats) => void;
  onDelete: (client: ClientWithStats) => void;
}

export interface ClientFormModalProps {
  open: boolean;
  isNew: boolean;
  values: ClientFormValues;
  saving: boolean;
  onChange: (values: ClientFormValues) => void;
  onSubmit: () => void;
  onClose: () => void;
}

// settings
export interface SettingsSectionProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export interface ProfileSettingsFormProps {
  profile: Profile;
  email: string;
}

export interface SettingsFieldsProps {
  values: ProfileFormValues;
  onChange: <K extends keyof ProfileFormValues>(key: K, value: ProfileFormValues[K]) => void;
}

export interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

// admin
export interface AdminUsersTableProps {
  users: AdminUser[];
  currentUserId: string;
}

export interface AdminUserRowProps {
  user: AdminUser;
  isSelf: boolean;
  busy: boolean;
  onUpdate: (user: AdminUser, data: AdminUserUpdate, success: string) => void;
}

export interface RecentSignupsProps {
  users: AdminUser[];
}

export interface PlanDistributionProps {
  byPlan: Record<PlanId, number>;
  totalUsers: number;
}

// invoice editor
export interface InvoiceEditorProps {
  mode: "new" | "edit";
  invoiceId?: string;
  clients: Client[];
  profile: Profile;
  pdfBranding: boolean;
}

export interface EditorToolbarProps {
  title: string;
  subtitle: string;
  tab: Tab;
  showPreviewPanel: boolean;
  isSaving: boolean;
  isDownloading: boolean;
  onTabChange: (tab: Tab) => void;
  onTogglePreview: () => void;
  onDownload: () => void;
  onSave: () => void;
}

export interface EditorInitOptions {
  mode: "new" | "edit";
  invoiceId?: string;
  clients: Client[];
  profile: Profile;
  onLoaded: () => void;
  onNotFound: () => void;
}

export interface InvoiceSaveOptions {
  mode: "new" | "edit";
  invoiceId?: string;
  onSaved: () => void;
}

export interface PreviewPanelProps {
  id: string;
  /** Responsive visibility classes chosen by the editor. */
  className: string;
}

export interface StatusSelectProps {
  className?: string;
}

export interface PlanLimitModalProps {
  message: string | null;
  onClose: () => void;
}

export interface InvoiceFormProps {
  /** Saved clients (signed-in users) — enables the "pick a client" menu. */
  clients?: Client[];
}

export type BillToSectionProps = InvoiceFormProps;

export interface ClientPickerProps {
  clients: Client[];
}

export interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface TaxSelectProps {
  taxLabel: string;
  onSelect: (tax: TaxType) => void;
}

export interface PercentInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export interface TotalRowProps {
  label: ReactNode;
  value: string;
  className?: string;
}

export interface LineItemsTableProps {
  currencySymbol: string;
}

export interface LineItemRowProps {
  item: LineItem;
  index: number;
  currencySymbol: string;
  canRemove: boolean;
}

export interface InvoicePreviewProps {
  id?: string;
  className?: string;
}

export interface PreviewSectionProps {
  invoice: InvoiceData;
  formatMoney: (amount: number) => string;
}

export type PreviewHeaderProps = Pick<PreviewSectionProps, "invoice">;
export type PreviewPartiesProps = Pick<PreviewSectionProps, "invoice">;
export type PreviewNotesProps = Pick<PreviewSectionProps, "invoice">;
export type PreviewFooterProps = Pick<PreviewSectionProps, "invoice">;
export type PreviewLineItemsProps = PreviewSectionProps;
export type PreviewTotalsProps = PreviewSectionProps;

export interface PreviewLabelProps {
  children: ReactNode;
  accent?: "gold" | "muted";
}

export interface InvoicePdfDocumentProps {
  invoice: InvoiceData;
  /** Adds a small "Made with InvoiceGen" footer (Free plan / guests). */
  branding: boolean;
}

export interface PdfHeaderProps {
  invoice: InvoiceData;
}

export interface PdfPartiesProps {
  invoice: InvoiceData;
}

export interface PdfLineItemsProps {
  invoice: InvoiceData;
  formatMoney: (amount: number) => string;
}

export interface PdfTotalsProps {
  invoice: InvoiceData;
  formatMoney: (amount: number) => string;
}

export interface PdfNotesProps {
  invoice: InvoiceData;
}

export type PdfFooterProps = InvoicePdfDocumentProps;

export interface LogoUploadProps {
  id?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
}

export interface UploadedImageProps {
  src: string;
  onReplace: () => void;
  onRemove: () => void;
}

export interface UploadDropzoneProps {
  onBrowse: () => void;
}

export interface LandingToolbarProps {
  isSaving: boolean;
  isDownloading: boolean;
  onPreview: () => void;
  onDownload: () => void;
  onSave: () => void;
}

export interface LandingPreviewModalProps {
  open: boolean;
  isDownloading: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export interface EditPreviewTabsProps {
  tab: Tab;
  onChange: (tab: Tab) => void;
  className?: string;
}

// marketing
export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export interface LegalPageProps {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  current: string;
}

export interface LegalNavProps {
  sections: LegalSection[];
  current: string;
}

export interface FeatureGridProps {
  items: FeatureItem[];
}

export interface ApiEndpointCardProps {
  endpoint: ApiEndpoint;
}

export interface DatabaseSetupNoticeProps {
  missingTables: string[];
}

export interface SchemaProbe {
  table: string;
  columns: string;
}

export type ServiceHealth = "operational" | "missing-env" | "unreachable" | "schema-missing";

export interface DatabaseHealth {
  status: ServiceHealth;
  /** Tables whose expected columns could not be read. */
  missingTables: string[];
}

export interface HealthReport {
  auth: ServiceHealth;
  database: DatabaseHealth;
}

export interface ServiceStatus {
  name: string;
  ok: boolean;
  note: string;
}

export interface ContactSuccessProps {
  name: string;
  email: string;
}

export interface FaqListProps {
  items: FaqItem[];
}

export interface ReportsPageProps {
  searchParams: Promise<{ range?: string }>;
}

export interface BillingPageProps {
  searchParams: Promise<{ checkout?: string }>;
}

export interface EditInvoicePageProps {
  params: Promise<{ id: string }>;
}

export interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}
