import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
  title:
    "札幌 自費リハビリナビ｜理学療法士・作業療法士が関わる整体・ピラティス・ジム・運動支援施設検索",
  description:
    "札幌市内で理学療法士・作業療法士・言語聴覚士など身体の専門職が関わる、自費リハビリ・整体・ピラティス・ジム・運動支援施設を探せる情報サイトです。病院リハビリ後の運動継続、転倒予防、膝・腰の不安、脳卒中後の自費リハビリなど、目的やエリアから相談先を探せます。",
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
    title: "札幌 自費リハビリナビ｜身体の専門職に相談できる場所を探す",
    description:
      "理学療法士・作業療法士など国家資格者が関わる、札幌市内の自費リハビリ・整体・ピラティス・ジム・運動支援施設を目的やエリアから探せます。",
    type: "website",
    locale: "ja_JP",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "札幌 自費リハビリナビ",
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
        <Analytics />
      </body>
    </html>
  );
}
