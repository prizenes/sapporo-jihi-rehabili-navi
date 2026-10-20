import type { Metadata } from "next";
import Script from "next/script";
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-HB1Z9BRRJ3";
const analyticsEnabled =
  process.env.NODE_ENV === "production" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") &&
  /^G-[A-Z0-9]+$/.test(gaId);

const display = Zen_Maru_Gothic({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sapporo-jihi-rehabili-navi.vercel.app/"),
  title:
    "札幌 自費リハビリナビ｜あなたに合うリハビリ・運動施設を探す",
  description:
    "退院後の運動から、足腰の体力づくり、姿勢改善、スポーツまで。札幌の自費リハビリ・運動支援施設を目的・地域・サービスから比較できます。指導・サポート体制、料金・体験、通いやすさを見て、ご本人やご家族に合う相談先を探せます。",
  keywords: [
    "札幌 自費リハビリ",
    "札幌 理学療法士 整体",
    "札幌 作業療法士 自費",
    "札幌 ピラティス 理学療法士",
    "札幌 パーソナルジム 国家資格",
    "病院リハビリ 終了後 札幌",
    "札幌 転倒予防",
    "札幌 脳卒中 自費リハビリ",
  ],
  openGraph: {
    siteName: "札幌 自費リハビリナビ",
    images: [{ url: "/images/training.jpg", width: 1200, alt: "運動支援のイメージ" }],
    title: "札幌 自費リハビリナビ｜あなたに合うリハビリ・運動施設を。",
    description:
      "札幌の自費リハビリ・運動支援施設を目的・地域・サービスから比較。料金・体験、指導・サポート体制、通いやすさをまとめた総合ガイドです。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image", images: ["/images/training.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "札幌 自費リハビリナビ",
  url: "https://sapporo-jihi-rehabili-navi.vercel.app/",
  description:
    "札幌市内で身体の専門職が関わる自費リハビリ・整体・ピラティス・ジム・運動支援施設を探せる情報サイト",
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {analyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
