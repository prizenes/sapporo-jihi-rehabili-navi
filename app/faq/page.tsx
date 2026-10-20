import Link from "next/link";
import ContentLayout, {
  Breadcrumbs,
  FindFacilityLink,
} from "@/components/ContentLayout";
import { FAQS } from "@/data/faq";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "自費リハビリ・施設検索のよくある質問",
  "施設選び、費用、指導・サポート体制、利用方法についての質問にお答えします。札幌で自費の運動支援を探す方とご家族へ。",
  "/faq",
);
export default function FaqPage() {
  return (
    <ContentLayout>
      <Breadcrumbs items={[{ label: "よくある質問", href: "/faq" }]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold">よくある質問</h1>
        <p className="mt-5 text-base text-ink-soft">
          自費サービスや、このサイトでの施設探しについて。
        </p>
        <dl className="my-8 divide-y divide-line border-y border-line">
          {FAQS.map((item, index) => (
            <div
              key={item.question}
              id={`question-${index + 1}`}
              className="scroll-mt-28 py-7"
            >
              <dt className="font-display text-lg font-bold leading-relaxed">
                {item.question}
              </dt>
              <dd className="mt-4 text-base leading-loose">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="text-base">
          解決しない場合は、
          <Link
            href="/contact"
            className="text-sora-deep underline underline-offset-4"
          >
            お問い合わせ窓口
          </Link>
          へご連絡ください。
        </p>
        <FindFacilityLink />
      </div>
    </ContentLayout>
  );
}
