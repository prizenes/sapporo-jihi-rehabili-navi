import ContentLayout, {
  Breadcrumbs,
  FindFacilityLink,
} from "@/components/ContentLayout";
import ArticleCard from "@/components/ArticleCard";
import { ARTICLES } from "@/data/articles";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "自費リハビリ・運動支援の読みもの",
  "札幌で自費リハビリ・運動支援施設を探す方とご家族へ。施設の選び方、料金の確認、病院リハビリ後の相談準備、冬の通いやすさを紹介します。",
  "/blog",
);

export default function BlogPage() {
  return (
    <ContentLayout>
      <Breadcrumbs items={[{ label: "読みもの", href: "/blog" }]} />
      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold text-wakaba-deep">
          施設探しの、その前に。
        </p>
        <h1 className="font-display text-3xl font-bold leading-relaxed sm:text-4xl">
          自費リハビリ・運動支援の読みもの
        </h1>
        <p className="mt-5 text-base leading-loose text-ink-soft">
          はじめて利用する方にも、ご家族と相談したい方にも。施設の選び方や、予約前に確かめたいことをまとめました。
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <ArticleCard article={article} key={article.slug} headingLevel="h2" />
        ))}
      </div>
      <FindFacilityLink />
    </ContentLayout>
  );
}
