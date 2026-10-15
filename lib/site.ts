import type { Metadata } from "next";

export const SITE_URL = "https://sapporo-jihi-rehabili-navi.vercel.app";
export const SITE_NAME = "札幌 自費リハビリナビ";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/training.jpg",
): Metadata {
  return {
    title: `${title}｜${SITE_NAME}`,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "website",
      images: [{ url: image, width: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function formatDate(date: string) {
  return date.split("-").map(Number).join(".");
}
