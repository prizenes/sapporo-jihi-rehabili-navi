import Link from "next/link";
import ContentLayout, { Breadcrumbs } from "@/components/ContentLayout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "運営者・掲載と編集の方針",
  "札幌 自費リハビリナビの運営者、施設情報の取り扱い、記事の編集方針、運営者の関連施設について説明します。",
  "/about",
);
export default function AboutPage() {
  const sections = [
    {
      title: "札幌で、相談先を探すための地域案内",
      text: "身体の専門職が関わる自費サービスの情報を整理し、利用を検討する方やご家族が、目的とエリアに合う相談先を探せるようにすることを目的としています。医療機関の診断・治療の代わりとなるサービスを案内するものではありません。",
    },
    {
      title: "運営者と関連施設",
      text: "サイト運営はリハビリジム プライズネス（札幌市西区）です。プライズネスはパーソナルトレーニングジムとして掲載しています。運営者の関連施設も他施設と同じ形式で掲載し、掲載順はエリア順・施設名順としています。掲載順はサービスの優劣やおすすめ順位を意味しません。",
    },
    {
      title: "施設情報の掲載方針",
      text: "施設の公式サイトなどの公開情報、または提供された情報をもとに作成します。「公開情報をもとに掲載」という表示は、施設による内容確認や推薦を示すものではありません。情報確認日以降に内容が変わる場合があるため、利用前に各施設へ最新情報をご確認ください。効果の保証や施設の順位付けは行いません。",
    },
    {
      title: "記事の編集方針",
      text: "読みものは、施設選びや問い合わせ準備に役立つ情報を編集部名義で提供します。記事原稿の作成にはAIを利用しています。実施していない取材・体験談や、受けていない専門家の監修を記載しません。参考にした公的・専門団体の情報がある場合は記事内に明記し、公開日と更新日を表示します。個別の診断や運動処方は行いません。",
    },
    {
      title: "修正・削除とお問い合わせ",
      text: "掲載内容の誤り、古い情報、掲載の修正・削除のご希望を受け付けています。お問い合わせページから適切な窓口をご利用ください。各施設のサービスの予約や料金については施設へ直接ご連絡ください。",
    },
  ];
  return (
    <ContentLayout>
      <Breadcrumbs items={[{ label: "運営者・編集方針", href: "/about" }]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold leading-relaxed">
          運営者・掲載と編集の方針
        </h1>
        {sections.map((section) => (
          <section
            key={section.title}
            className="mt-9 border-t border-line pt-6"
          >
            <h2 className="font-display text-xl font-bold">{section.title}</h2>
            <p className="mt-4 text-base leading-loose">{section.text}</p>
          </section>
        ))}
        <Link
          href="/contact"
          className="mt-8 inline-block text-sora-deep underline underline-offset-4"
        >
          お問い合わせ・修正依頼はこちら
        </Link>
      </div>
    </ContentLayout>
  );
}
