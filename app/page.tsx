import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RehabFacilitySearch } from "@/components/RehabFacilitySearch";
import { Section } from "@/components/Section";
import { facilities, purposes, wards } from "@/data/facilities";
import { pageDescription, pageTitle, siteName } from "@/lib/rehab-directory";
import { organizationJsonLd, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: ["https://prizenes.com/images/convert/prizenescom/20221202101242.jpg/image.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["https://prizenes.com/images/convert/prizenescom/20221202101242.jpg/image.webp"]
  }
};

const aboutCards = [
  {
    title: "探しにくい相談先を整理",
    body: "整体、整骨院、パーソナルジム、リハビリ施設。似た看板が多い中で、専門職が関わる自費リハビリ・運動支援施設を目的別に整理します。"
  },
  {
    title: "国家資格者が関わる施設を掲載",
    body: "理学療法士・作業療法士・言語聴覚士など、身体機能や生活動作を専門に見る国家資格者が在籍または監修する施設を掲載対象にしています。"
  },
  {
    title: "目的・エリアで比較",
    body: "病院リハビリ後の運動継続、脳卒中後、転倒予防、膝痛・腰痛、訪問対応など、必要な条件から施設を探せます。"
  }
];

const recruitTargets = [
  "理学療法士・作業療法士・言語聴覚士のいずれかが在籍または監修している",
  "自費リハビリ、運動支援、コンディショニング、生活動作支援を提供している",
  "札幌市内で店舗型・訪問型・オンライン対応のいずれかを提供している",
  "利用者がサービス内容・料金・相談範囲を事前に確認できる"
];

const recruitItems = ["施設名・所在地・対応エリア", "在籍資格・対象者", "料金目安", "サービス種別", "施設紹介文", "公式サイト・問い合わせ先"];

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: pageDescription,
    url: siteUrl,
    inLanguage: "ja"
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "札幌市内の自費リハビリ・運動支援施設",
    itemListElement: facilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: facility.name,
      item: {
        "@type": "LocalBusiness",
        name: facility.name,
        address: facility.address,
        areaServed: `札幌市${facility.ward}`,
        url: facility.officialUrl
      }
    }))
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <header className="sticky top-0 z-50 border-b border-sea/15 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#" className="flex items-center gap-3 text-ink no-underline">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-sea text-sm font-black text-white">札</span>
            <span className="grid leading-tight">
              <span className="font-black text-sea">{siteName}</span>
              <span className="text-xs font-bold text-ink/55">身体の専門職が関わる施設さがし</span>
            </span>
          </a>
          <nav aria-label="メインメニュー" className="hidden items-center gap-2 md:flex">
            <a className="rounded-md px-3 py-2 text-sm font-bold text-ink hover:bg-mist" href="#about">
              このサイト
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-bold text-ink hover:bg-mist" href="#purpose">
              目的別
            </a>
            <a className="rounded-md px-3 py-2 text-sm font-bold text-ink hover:bg-mist" href="#list">
              施設一覧
            </a>
            <a className="rounded-md bg-leaf px-4 py-2 text-sm font-bold text-white hover:bg-ink" href="#recruit">
              掲載希望
            </a>
          </nav>
          <a className="rounded-md bg-leaf px-4 py-2 text-sm font-bold text-white md:hidden" href="#list">
            探す
          </a>
        </div>
      </header>

      <section className="overflow-hidden bg-white px-5 pb-10 pt-12 sm:px-8 lg:pb-16 lg:pt-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-md border border-leaf/30 bg-mist px-4 py-2 text-sm font-black text-leaf">
              身体の専門職が関わる施設を掲載
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
              札幌で自費リハビリ・運動支援施設を探すなら
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink/75 sm:text-xl sm:leading-9">
              病院リハビリ後の運動継続、転倒予防、膝・腰の不安、脳卒中後の自費リハビリなど、目的に合った相談先を探せます。
              プライズネス以外は掲載準備中または情報確認中として表示しています。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#list"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-sea px-6 py-3 text-base font-bold text-white transition hover:bg-ink"
              >
                施設一覧を見る
              </a>
              <a
                href="#recruit"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-sea bg-white px-6 py-3 text-base font-bold text-sea transition hover:bg-mist"
              >
                掲載を希望する
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                [`${facilities.length}件`, "掲載施設"],
                [`${wards.length}区`, "札幌市内"],
                [`${purposes.length}種`, "目的別"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-md bg-paper p-4">
                  <p className="text-2xl font-black text-sea">{value}</p>
                  <p className="mt-1 text-xs font-bold text-ink/55">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://prizenes.com/images/convert/prizenescom/20221202101242.jpg/image.webp"
              alt="理学療法士による運動サポートの様子"
              className="aspect-[4/3] w-full rounded-md object-cover shadow-soft"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-md bg-white/95 p-5 shadow-soft">
              <p className="text-sm font-black text-sea">選び方の目安</p>
              <p className="mt-2 text-lg font-bold leading-7 text-ink">
                医療機関で行う判断や処置の代わりではなく、身体機能の維持・改善や運動継続を支える相談先を探すサイトです。
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" title="このサイトについて" tone="paper">
        <div className="grid gap-5 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article key={card.title} className="rounded-md bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black leading-7 text-ink">{card.title}</h3>
              <p className="mt-4 leading-7 text-ink/75">{card.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-md border border-coral/30 bg-coral/10 p-5">
          <p className="font-bold leading-8 text-ink">
            掲載施設はいずれも、医療保険・介護保険外で、身体機能の改善・運動の継続・再発予防・生活動作の改善を支援する施設です。
            医療機関で行う判断や処置の代わりとなるものではありません。
          </p>
        </div>
      </Section>

      <Section id="purpose" title="目的別に探す" description="気になる目的を確認してから、施設一覧で条件を組み合わせて探せます。" tone="mist">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {purposes.map((purpose) => (
            <a key={purpose.id} href="#list" className="group rounded-md bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-mist text-sm font-black text-sea">
                {purpose.shortLabel}
              </span>
              <h3 className="mt-4 text-lg font-black leading-7 text-ink">{purpose.label}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{purpose.description}</p>
              <p className="mt-4 text-sm font-black text-sea group-hover:text-ink">施設一覧へ</p>
            </a>
          ))}
        </div>
      </Section>

      <Section id="area" title="エリア別に探す" description="札幌市の区ごとに、掲載施設数を確認できます。" tone="white">
        <div className="flex flex-wrap gap-3">
          {wards.map((ward) => {
            const count = facilities.filter((facility) => facility.ward === ward).length;

            return (
              <a
                key={ward}
                href="#list"
                className="rounded-md border border-sea/20 bg-paper px-4 py-3 text-sm font-bold text-ink transition hover:bg-mist"
              >
                {ward}
                <span className="ml-2 text-sea">{count}件</span>
              </a>
            );
          })}
        </div>
      </Section>

      <Section
        id="list"
        title="施設一覧"
        description="エリア、目的、資格、サービス形式を組み合わせて、ご自身に合った相談先を探せます。"
        tone="mist"
      >
        <RehabFacilitySearch />
      </Section>

      <Section id="recruit" title="掲載希望の施設様へ" tone="white">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-md bg-paper p-6 shadow-sm sm:p-8">
            <p className="text-lg font-bold leading-8 text-ink">
              {siteName}では、理学療法士・作業療法士・言語聴覚士など国家資格者が在籍・監修する自費リハビリ、運動支援、コンディショニング施設の無料掲載を受け付けています。
            </p>
            <h3 className="mt-8 text-xl font-black text-ink">掲載対象</h3>
            <ul className="mt-4 grid gap-3">
              {recruitTargets.map((item) => (
                <li key={item} className="rounded-md bg-white p-4 font-semibold leading-7 text-ink/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-md bg-sea p-6 text-white shadow-soft sm:p-8">
            <h3 className="text-2xl font-black leading-tight">掲載内容</h3>
            <ul className="mt-5 grid gap-3">
              {recruitItems.map((item) => (
                <li key={item} className="rounded-md bg-white/12 px-4 py-3 font-bold">
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-5 py-3 text-center font-black text-sea transition hover:bg-mist"
            >
              無料掲載を申し込む
            </a>
            <p className="mt-4 text-sm leading-6 text-white/75">公開時にGoogleフォームまたは正式な受付メールに差し替えてください。</p>
          </aside>
        </div>
      </Section>

      <Section id="notice" title="注意事項" tone="paper">
        <ul className="grid gap-4 rounded-md bg-white p-6 shadow-sm">
          {[
            "掲載情報は、各施設からの情報または公開情報をもとに作成しています。",
            "サービス内容・料金・対応可否などの最新情報は、必ず各施設に直接ご確認ください。",
            "当サイトは、医療機関で行う判断や処置の代替を目的としたものではありません。",
            "症状が強い場合や医学的な判断が必要な場合は、医療機関にご相談ください。"
          ].map((item) => (
            <li key={item} className="font-semibold leading-8 text-ink/75">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="operator" title="運営者情報" tone="white">
        <div className="grid gap-6 rounded-md bg-paper p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <img
            src="https://prizenes.com/images/convert/prizenescom/20221111170823.jpg/image.webp"
            alt="リハビリジムプライズネスの施設内"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-black text-sea">運営</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-ink">リハビリジム プライズネス</h2>
            <p className="mt-5 text-lg leading-8 text-ink/75">
              札幌市西区で理学療法士による運動支援・自費リハビリ・転倒予防・健康づくり支援を行っています。地域の方が安心して身体の専門職に相談できる環境づくりを目的に、本サイトを運営しています。
            </p>
            <a
              href="https://prizenes.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-sea px-6 py-3 font-bold text-white transition hover:bg-ink"
            >
              公式サイトを見る
            </a>
          </div>
        </div>
      </Section>

      <footer className="bg-ink px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xl font-black">{siteName}</p>
          <p className="mt-2 text-sm leading-6 text-white/70">理学療法士・作業療法士など国家資格者が関わる、札幌市内の自費リハビリ・運動支援施設の情報サイト</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-bold text-white/80">
            <a href="#about">このサイトについて</a>
            <a href="#list">施設一覧</a>
            <a href="#recruit">掲載希望</a>
            <a href="#notice">注意事項</a>
            <a href="#operator">運営者情報</a>
          </div>
          <p className="mt-6 text-xs text-white/50">© 2026 札幌 自費リハビリナビ（運営：リハビリジム プライズネス）</p>
        </div>
      </footer>
    </main>
  );
}
