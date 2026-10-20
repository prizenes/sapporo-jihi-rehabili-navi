import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import ContentLayout, { Breadcrumbs } from "@/components/ContentLayout";
import StructuredData from "@/components/StructuredData";
import FacilityWebsiteLink from "@/components/FacilityWebsiteLink";
import FacilityMedia from "@/components/FacilityMedia";
import { sortedPublicFacilities, categoryLabel } from "@/data/facilities";
import { facilityGuide } from "@/data/facility-guide";
import { SITE_URL, formatDate, pageMetadata } from "@/lib/site";

type Props = { params: { id: string } };
const findFacility = (id: string) =>
  sortedPublicFacilities().find((f) => f.id === id);
export const dynamicParams = false;
export const generateStaticParams = () =>
  sortedPublicFacilities().map(({ id }) => ({ id }));
export function generateMetadata({ params }: Props) {
  const f = findFacility(params.id);
  return f
    ? pageMetadata(
        `${f.name}｜特徴・料金・アクセス`,
        `${f.name}（札幌市${f.ward}）のサービス、指導・サポート体制、料金・体験、通いやすさを紹介。${f.tagline}`,
        `/facilities/${f.id}`,
      )
    : {};
}

export default function FacilityDetailPage({ params }: Props) {
  const f = findFacility(params.id);
  if (!f) notFound();
  const guide = facilityGuide(f);
  return (
    <ContentLayout>
      <Breadcrumbs
        items={[
          { label: "掲載施設", href: "/#facilities" },
          { label: f.name, href: `/facilities/${f.id}` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <header>
          <p className="text-sm font-bold text-wakaba-deep">
            {f.ward} · {f.categories.map(categoryLabel).join(" / ")}
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold leading-relaxed sm:text-3xl">
            {f.name}
          </h1>
          <p className="mt-4 text-base leading-loose">{f.tagline}</p>
          {guide.reception && <aside className="mt-5 border-l-2 border-sora bg-sora-soft p-4 text-sm leading-loose" aria-label="受付状況">
            <a href={guide.reception.url} target="_blank" rel="noopener noreferrer" className="font-bold text-sora-deep underline underline-offset-4">{guide.reception.message}</a>
            <p>受付状況の確認日：<time dateTime={guide.reception.checkedAt}>{formatDate(guide.reception.checkedAt)}</time>。最新の受付状況は施設へお問い合わせください。</p>
          </aside>}
          <FacilityMedia name={f.name} photo={guide.photo} large />
        </header>
        <section className="detail-section" aria-labelledby="recommend-heading">
          <h2 id="recommend-heading">こんな方におすすめ</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {f.targets.map((t) => (
              <li key={t} className="border-l-2 border-wakaba pl-4 text-base">
                {t}
              </li>
            ))}
          </ul>
        </section>
        <section className="detail-section" aria-labelledby="services-heading">
          <h2 id="services-heading">受けられるサービス</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            {guide.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <dl className="mt-5">
            <dt className="text-sm font-bold text-ink-soft">ご利用方法</dt>
            <dd className="mt-2">{f.serviceTypes.join(" / ")}</dd>
          </dl>
        </section>
        <section className="detail-section" aria-labelledby="support-heading">
          <h2 id="support-heading">指導・サポート体制</h2>
          <p className="mt-4 leading-loose">{guide.support}</p>
          <dl className="mt-4 space-y-3">
            {guide.staffQualifications.length > 0 && (
              <div>
                <dt className="text-sm font-bold text-ink-soft">
                  スタッフの保有資格
                </dt>
                <dd className="mt-1">{guide.staffQualifications.join("・")}</dd>
              </div>
            )}
            {guide.otherQualifications && (
              <div>
                <dt className="text-sm font-bold text-ink-soft">
                  {guide.otherQualifications.label}
                </dt>
                <dd className="mt-1">
                  {guide.otherQualifications.values.join("・")}
                </dd>
              </div>
            )}
          </dl>
        </section>
        <section className="detail-section" aria-labelledby="price-heading">
          <h2 id="price-heading">料金・体験案内</h2>
          <dl className="mt-4 divide-y divide-line">
            {guide.prices.map((p) => (
              <div key={p.label} className="py-4">
                <dt className="text-sm text-ink-soft">{p.label}</dt>
                <dd className="mt-2 text-lg font-bold text-sora-deep">
                  {p.value}
                </dd>
                {p.note && (
                  <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.note}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>
        <section className="detail-section" aria-labelledby="access-heading">
          <h2 id="access-heading">アクセス・通いやすさ</h2>
          <p className="mt-4 flex items-start gap-2 leading-loose">
            <MapPin
              size={20}
              className="mt-1 shrink-0 text-wakaba-deep"
              aria-hidden="true"
            />
            {f.address}
          </p>
          {guide.access?.length ? (
            <dl className="mt-4 divide-y divide-line">
              {guide.access.map((a) => (
                <div
                  key={a.label}
                  className="grid gap-2 py-3 sm:grid-cols-[120px_1fr]"
                >
                  <dt className="font-bold">{a.label}</dt>
                  <dd className="leading-relaxed">{a.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-base text-ink-soft">
              {guide.accessSummary}
            </p>
          )}
          <p className="mt-4 text-sm leading-loose text-ink-soft">
            段差・エレベーター・送迎など、ご利用に必要な設備については施設にご相談ください。
          </p>
        </section>
        <section className="detail-section" aria-labelledby="contact-heading">
          <h2 id="contact-heading">公式サイト・お問い合わせ</h2>
          <p className="mt-4 text-base">
            相談したいことや通える日時を、施設へ直接お伝えください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {f.site && (
              <FacilityWebsiteLink
                href={f.site}
                facilityId={f.id}
                placement="facility_detail"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sora-deep px-6 py-3 font-bold text-white hover:bg-sora"
              >
                公式サイトへ
                <ArrowUpRight size={18} aria-hidden="true" />
              </FacilityWebsiteLink>
            )}
            {f.contact && (
              <a
                href={f.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-wakaba-deep px-6 py-3 font-bold text-wakaba-deep hover:bg-wakaba-soft"
              >
                施設に問い合わせる
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
        <footer className="border-t border-line py-6 text-sm leading-loose text-ink-soft">
          {f.checkedAt && (
            <p>
              情報確認日：
              <time dateTime={f.checkedAt}>{formatDate(f.checkedAt)}</time>
            </p>
          )}
          <p>{f.displayStatus}</p>
          <p>料金・サービスの最新情報は、各施設へご確認ください。</p>
          {f.site && (
            <a
              href={f.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 text-sora-deep underline underline-offset-4"
            >
              公式サイト
            </a>
          )}
        </footer>
        <nav
          aria-label="施設情報の関連リンク"
          className="flex flex-wrap gap-5 border-t border-line py-5 text-sm text-sora-deep"
        >
          <Link
            href="/#facilities"
            className="py-2 underline underline-offset-4"
          >
            掲載施設一覧へ
          </Link>
          <Link
            href="/blog/sapporo-private-rehab-guide"
            className="py-2 underline underline-offset-4"
          >
            施設選びのポイント
          </Link>
          <Link
            href="/contact#fix"
            className="py-2 underline underline-offset-4"
          >
            掲載内容の修正・削除依頼
          </Link>
        </nav>
      </article>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: f.name,
          url: `${SITE_URL}/facilities/${f.id}`,
          description: f.tagline,
          about: {
            "@type": "Place",
            name: f.name,
            address: f.address,
            ...(f.site ? { url: f.site } : {}),
            ...(guide.photo ? { image: `${SITE_URL}${guide.photo.src}` } : {}),
          },
        }}
      />
    </ContentLayout>
  );
}
