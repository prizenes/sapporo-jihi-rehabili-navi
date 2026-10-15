import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/articles";
import { NEWS } from "@/data/news";
import { sortedPublicFacilities } from "@/data/facilities";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/contact", "/blog", "/news", "/faq", "/about"].map((path) => ({
      url: `${SITE_URL}${path}`,
    })),
    ...ARTICLES.map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}`,
      lastModified: `${article.updatedAt}T09:00:00+09:00`,
    })),
    ...NEWS.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: `${item.date}T09:00:00+09:00`,
    })),
    ...sortedPublicFacilities().map((facility) => ({
      url: `${SITE_URL}/facilities/${facility.id}`,
    })),
  ];
}
