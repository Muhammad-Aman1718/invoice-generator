import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_CONFIG } from "@/src/constant/site";
import { PLANS } from "@/src/constant/plans";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Professional PDF Invoice Maker`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "invoice generator",
    "PDF invoice maker",
    "free invoice template",
    "VAT invoice",
    "GST invoice",
    "invoice software",
    "freelancer invoice",
    "small business invoicing",
  ],
  authors: [{ name: `${SITE_CONFIG.name} Team` }],
  creator: SITE_CONFIG.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: `${SITE_CONFIG.name} — Professional PDF Invoice Maker`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Professional PDF Invoice Maker`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: "#191970",
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({ variable: "--font-geist-sans", display: "swap", subsets: ["latin"] });

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: Object.values(PLANS).map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.price.month),
    priceCurrency: "USD",
  })),
  featureList: [
    "PDF invoice generation",
    "VAT/GST tax presets",
    "Multi-currency support",
    "Client management",
    "Revenue reports",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
