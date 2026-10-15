import Link from "next/link";
import ContentLayout, { Breadcrumbs } from "@/components/ContentLayout";
import { NEWS } from "@/data/news";
import { formatDate, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "新着情報・お知らせ",
  "札幌 自費リハビリナビの更新情報。新しい読みものや施設検索の更新をお知らせします。",
  "/news",
);
export default function NewsPage() {
  return (
    <ContentLayout>
      <Breadcrumbs items={[{ label: "新着情報", href: "/news" }]} />
      <h1 className="font-display text-3xl font-bold">新着情報</h1>
      <p className="mt-4 text-base text-ink-soft">
        読みものの公開や、サイトからのお知らせをお届けします。
      </p>
      <ul className="my-9 divide-y divide-line border-y border-line">
        {NEWS.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/news/${item.slug}`}
              className="block py-7 hover:text-sora-deep"
            >
              <div className="flex flex-wrap gap-4 text-sm">
                <time dateTime={item.date}>{formatDate(item.date)}</time>
                <span className="font-bold text-wakaba-deep">
                  {item.category}
                </span>
              </div>
              <h2 className="mt-3 font-display text-xl font-bold">
                {item.title}
              </h2>
              <p className="mt-2 text-base text-ink-soft">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
}
