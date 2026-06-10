export const siteUrl = "https://sapporo-jihi-rehabili-navi.vercel.app";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "リハビリジムプライズネス",
  url: "https://prizenes.com/",
  email: "mail@prizenes.com",
  telephone: "011-600-6048",
  image: "https://prizenes.com/common/upload_data/prizenescom/image/20221202101242.jpg",
  address: {
    "@type": "PostalAddress",
    postalCode: "063-0812",
    addressCountry: "JP",
    addressRegion: "北海道",
    addressLocality: "札幌市西区",
    streetAddress: "琴似2条3-1-1 チェストオオイビル3階"
  },
  areaServed: ["札幌市", "北海道"],
  availableLanguage: ["ja"]
};

export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}
