import Link from "next/link";
import { notFound } from "next/navigation";
import ContentLayout, { Breadcrumbs } from "@/components/ContentLayout";
import StructuredData from "@/components/StructuredData";
import FacilityWebsiteLink from "@/components/FacilityWebsiteLink";
import FacilitySourceCheck from "@/components/FacilitySourceCheck";
import { sortedPublicFacilities, categoryLabel } from "@/data/facilities";
import { SITE_URL, formatDate, pageMetadata } from "@/lib/site";

type Props = { params: { id: string } };
const findFacility = (id: string) =>
  sortedPublicFacilities().find((facility) => facility.id === id);
export const dynamicParams = false;
export const generateStaticParams = () =>
  sortedPublicFacilities().map(({ id }) => ({ id }));
export function generateMetadata({ params }: Props) {
  const facility = findFacility(params.id);
  return facility
    ? pageMetadata(
        `${facility.name}（札幌市${facility.ward}）`,
        `${facility.name}の所在地、資格者の関わり方、サービス種別、料金目安、公式サイトを紹介。${facility.tagline}`,
        `/facilities/${facility.id}`,
      )
    : {};
}

export default function FacilityDetailPage({ params }: Props) {
  const facility = findFacility(params.id);
  if (!facility) notFound();
  const rows = [
    ["所在地", facility.address],
    ["エリア", facility.ward],
    ["カテゴリ", facility.categories.map(categoryLabel).join("・")],
    [
      "在籍・関与する資格",
      facility.qualifications.join("・") || "公式情報でご確認ください",
    ],
    ["資格者の関わり方", facility.involvement],
    ["主な対象", facility.targets.join("・")],
    ["サービス種別", facility.serviceTypes.join("・")],
    ["料金目安", facility.priceNote],
    ["掲載情報", facility.displayStatus],
    [
      "情報確認日",
      facility.checkedAt ? formatDate(facility.checkedAt) : "未記録",
    ],
  ];
  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { label: "掲載施設", href: "/#facilities" },
          { label: facility.name, href: `/facilities/${facility.id}` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-line pb-7">
          <p className="text-sm font-bold text-wakaba-deep">
            {facility.ward} /{" "}
            {facility.categories.map(categoryLabel).join("・")}
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold leading-relaxed sm:text-3xl">
            {facility.name}
          </h1>
          <p className="mt-4 text-base leading-loose">{facility.tagline}</p>
          <p className="mt-4 text-sm text-ink-soft">
            {facility.displayStatus} · 掲載データ確認日{" "}
            {facility.checkedAt ? (
              <time dateTime={facility.checkedAt}>
                {formatDate(facility.checkedAt)}
              </time>
            ) : (
              "未記録"
            )}
          </p>
        </header>
        <section className="py-8">
          <h2 className="mb-5 font-display text-xl font-bold">
            施設情報（掲載時のデータ）
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 py-4 text-base sm:grid-cols-[160px_1fr]"
              >
                <dt className="font-bold">{label}</dt>
                <dd className="min-w-0 break-words leading-loose">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <FacilitySourceCheck facilityId={facility.id} />
        <aside className="border-l-4 border-wakaba bg-wakaba-soft p-5">
          <h2 className="font-bold">利用前に、最新情報をご確認ください</h2>
          <p className="mt-2 text-sm leading-loose">
            掲載内容は情報確認日時点の公開情報等に基づきます。現在の資格者在籍、料金、予約、対応可否は施設へ直接ご確認ください。当サイトでの掲載は、施設の確認・推薦やサービスの効果を保証するものではありません。
          </p>
        </aside>
        <div className="my-7 flex flex-wrap gap-3">
          {facility.site && (
            <FacilityWebsiteLink
              href={facility.site}
              facilityId={facility.id}
              placement="facility_detail"
              className="rounded-lg bg-sora-deep px-6 py-3 text-base font-bold text-white hover:bg-sora"
            >
              公式サイトへ（外部）
            </FacilityWebsiteLink>
          )}
          {facility.contact && (
            <a
              href={facility.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-wakaba-deep px-6 py-3 text-base font-bold text-wakaba-deep hover:bg-wakaba-soft"
            >
              施設に問い合わせる（外部）
            </a>
          )}
        </div>
        <section className="mt-9 border-t border-line py-6">
          <h2 className="font-display text-lg font-bold">
            相談前に確認したいこと
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
            <li>希望する運動支援への対応可否と、当日の担当者</li>
            <li>初回に必要な総額・持ち物・所要時間</li>
            <li>入口の段差や駐車場、予約変更の条件</li>
          </ul>
          <Link
            href="/blog/sapporo-private-rehab-guide"
            className="mt-4 inline-block text-sora-deep underline underline-offset-4"
          >
            施設選びのチェックリストを読む →
          </Link>
        </section>
        <nav
          aria-label="施設情報の関連リンク"
          className="flex flex-wrap gap-5 border-t border-line pt-6 text-sm text-sora-deep"
        >
          <Link href="/#facilities" className="underline underline-offset-4">
            掲載施設一覧へ
          </Link>
          <Link href="/contact#fix" className="underline underline-offset-4">
            掲載内容の修正・削除依頼
          </Link>
          <Link href="/about" className="underline underline-offset-4">
            掲載方針
          </Link>
        </nav>
      </article>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: facility.name,
          url: `${SITE_URL}/facilities/${facility.id}`,
          description: facility.tagline,
          about: {
            "@type": "Place",
            name: facility.name,
            address: facility.address,
            ...(facility.site ? { url: facility.site } : {}),
          },
        }}
      />
    </ContentLayout>
  );
}
