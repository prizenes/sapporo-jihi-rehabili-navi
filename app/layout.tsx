import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "海外在住日本人のためのオンライン運動サポート | プライズネス",
    template: "%s | プライズネス"
  },
  description:
    "海外在住の日本人向けに、理学療法士が日本語で腰痛・膝痛・歩行不安などのオンライン身体相談と運動継続支援を行います。USD建てStripe決済に対応。",
  openGraph: {
    title: "海外在住日本人のためのオンライン運動サポート",
    description:
      "腰痛・膝痛・歩行不安を、日本語で理学療法士に相談。現地医療・診断後のセルフケア支援としてオンライン運動サポートを提供します。",
    locale: "ja_JP",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
