import type { Metadata } from "next";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { pageDescription, siteName } from "@/lib/rehab-directory";
import "./globals.css";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://sapporo-jihi-rehabili-navi.vercel.app"),
  title: {
    default: siteName,
    template: `%s｜${siteName}`
  },
  description: pageDescription,
  robots: {
    index: true,
    follow: true
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification
      }
    : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
