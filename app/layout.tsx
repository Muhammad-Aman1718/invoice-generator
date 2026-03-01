import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Invoice SaaS | Professional PDF Invoice Maker | VAT & Tax Compliant",
  description:
    "Create professional invoices for USA and Europe. PDF Invoice Maker with VAT, GST support. Free to use.",
  keywords: [
    "Invoice Generator",
    "PDF Invoice Maker",
    "VAT Compliant",
    "Tax Compliant",
    "USA",
    "Europe",
  ],
  openGraph: {
    title: "Invoice SaaS | Professional PDF Invoice Maker",
    description:
      "Create VAT and tax compliant invoices. Export to PDF instantly.",
    url: defaultUrl,
    siteName: "Invoice SaaS",
    locale: "en_US",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
