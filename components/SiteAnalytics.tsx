import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-HB1Z9BRRJ3";
const isProduction = process.env.VERCEL_ENV === "production";
const isVercelAnalyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === "true";

export function SiteAnalytics() {
  return (
    <>
      {isProduction && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {isProduction && isVercelAnalyticsEnabled ? <Analytics /> : null}
    </>
  );
}
