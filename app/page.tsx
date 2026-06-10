import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RehabFacilitySearch } from "@/components/RehabFacilitySearch";
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
    icon: "?",
    title: "どこに相談すればいいか\n分かりにくい",
    body: "整体、整骨院、パーソナルジム、リハビリ施設。似たような看板が多く、自分に合う相談先を見つけるのは大変です。"
  },
  {
    icon: "資",
    title: "国家資格者が関わる\n施設だけを掲載",
    body: "このサイトには、理学療法士・作業療法士・言語聴覚士などの国家資格者が在籍・監修している自費リハビリ・運動支援施設を掲載しています。"
  },
  {
    icon: "札",
    title: "地域の方が\n安心して選べるように",
    body: "目的・エリア・資格・サービス種別から比べて探せます。地域の方が安心して施設を選べることが、このサイトの目的です。"
  }
];

const recruitTargets = [
  "理学療法士・作業療法士・言語聴覚士のいずれかが在籍または監修している",
  "医療保険・介護保険外の自費サービスを提供している",
  "札幌市内または札幌近郊に対応している",
  "料金・所在地・サービス内容が明確である",
  "過度な誇大表現をしていない"
];

const recruitItems = ["施設名・所在地・対応エリア", "在籍資格・対象者", "料金", "公式サイト・問い合わせ先", "施設紹介文"];

function SectionHead({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <span className="inline-block rounded-full bg-[#EAF5EF] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#3A7A61]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-black leading-snug text-[#2E3A40] sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-8 text-[#5A6B73]">{description}</p> : null}
    </div>
  );
}

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
    <main id="top" className="min-h-screen bg-[#FBFDFE] text-[#2E3A40]">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <header className="sticky top-0 z-50 border-b border-[#D9E6EC] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#top" className="flex items-center gap-3 text-[#2C5F80] no-underline">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#3D7EA6] to-[#4D9B7C] text-sm font-black text-white">
              札
            </span>
            <span className="grid leading-tight">
              <span className="font-black">{siteName}</span>
              <span className="text-[11px] font-bold tracking-[0.04em] text-[#5A6B73]">理学療法士・作業療法士が関わる施設さがし</span>
            </span>
          </a>
          <nav aria-label="メインメニュー" className="hidden flex-wrap items-center gap-1 md:flex">
            {[
              ["#about", "このサイトについて"],
              ["#purpose", "目的別に探す"],
              ["#area", "エリア別に探す"],
              ["#list", "施設一覧"]
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-3 py-2 text-sm font-bold text-[#2E3A40] hover:bg-[#EAF4F9]">
                {label}
              </a>
            ))}
            <a href="#recruit" className="rounded-full bg-[#4D9B7C] px-4 py-2 text-sm font-black text-white hover:bg-[#3A7A61]">
              掲載希望の施設様へ
            </a>
          </nav>
          <a href="#list" className="rounded-full bg-[#4D9B7C] px-4 py-2 text-sm font-black text-white md:hidden">
            施設を探す
          </a>
        </div>
      </header>

      <section className="overflow-hidden bg-[radial-gradient(ellipse_90%_70%_at_85%_10%,#EAF5EF_0%,transparent_60%),radial-gradient(ellipse_90%_80%_at_10%_90%,#EAF4F9_0%,transparent_65%),#FFFFFF] px-5 pt-16 text-center">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center rounded-full border-2 border-[#4D9B7C] bg-white px-5 py-2 text-sm font-black text-[#3A7A61]">
            国家資格者が在籍・監修する施設を掲載
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.45] text-[#2E3A40] sm:text-5xl">
            札幌で
            <span className="bg-gradient-to-t from-[#CDE8DB] from-40% to-transparent to-40% px-1">
              自費リハビリ・運動支援施設
            </span>
            を
            <br className="hidden sm:block" />
            探すなら
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#5A6B73] sm:text-lg">
            理学療法士・作業療法士など、身体の専門職が関わる施設を分かりやすく紹介。病院リハビリ後の運動継続、転倒予防、膝・腰の不安、脳卒中後の自費リハビリなど、目的に合った相談先を探せます。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#list" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3D7EA6] px-8 py-3 text-lg font-black text-white shadow-[0_6px_16px_rgba(61,126,166,.30)] hover:bg-[#2C5F80]">
              施設一覧を見る
            </a>
            <a href="#recruit" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#4D9B7C] bg-white px-8 py-3 text-lg font-black text-[#3A7A61] hover:bg-[#EAF5EF]">
              掲載を希望する施設様へ
            </a>
          </div>
        </div>
        <svg className="mt-10 block h-[60px] w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,30 C240,60 480,0 720,20 C960,40 1200,10 1440,35 L1440,60 L0,60 Z" fill="#FFFFFF" />
        </svg>
      </section>

      <section id="about" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="ABOUT" title="このサイトについて" />
          <div className="grid gap-5 md:grid-cols-3">
            {aboutCards.map((card, index) => (
              <article key={card.title} className="rounded-[18px] border border-[#D9E6EC] bg-[#FBFDFE] px-6 py-7 text-center">
                <div className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full text-xl font-black ${index === 1 ? "bg-[#EAF5EF] text-[#3A7A61]" : "bg-[#EAF4F9] text-[#2C5F80]"}`}>
                  {card.icon}
                </div>
                <h3 className="whitespace-pre-line text-lg font-black leading-7 text-[#2E3A40]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5A6B73]">{card.body}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-7 flex max-w-4xl gap-3 rounded-[18px] bg-[#EAF5EF] px-6 py-5 text-[#3A7A61]">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-white text-sm font-black">i</span>
            <p className="text-sm font-bold leading-7">
              掲載施設はいずれも、医療保険・介護保険外で、身体機能の維持・改善、運動の継続、再発予防、生活動作の改善を支援する施設です。医療機関で行う判断や処置の代わりとなるものではありません。
            </p>
          </div>
        </div>
      </section>

      <section id="purpose" className="bg-[#EAF4F9] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="PURPOSE" title="目的別に探す" description="気になる目的を確認してから、施設一覧で条件を組み合わせて探せます。" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {purposes.map((purpose) => (
              <a key={purpose.id} href="#list" className="rounded-[18px] border border-[#D9E6EC] bg-white px-5 py-6 text-center transition hover:-translate-y-1 hover:border-[#3D7EA6] hover:shadow-[0_4px_18px_rgba(61,126,166,.10)]">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#EAF5EF] text-sm font-black text-[#3A7A61]">
                  {purpose.shortLabel}
                </div>
                <h3 className="text-base font-black leading-7 text-[#2E3A40]">{purpose.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5A6B73]">{purpose.description}</p>
                <span className="mt-3 inline-block text-sm font-black text-[#3D7EA6]">施設を見る</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="area" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="AREA" title="エリア別に探す" description="札幌市の区を選ぶ目安として、掲載施設数を確認できます。" />
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {wards.map((ward) => {
              const count = facilities.filter((facility) => facility.ward === ward).length;

              return (
                <a key={ward} href="#list" className="rounded-full border-2 border-[#D9E6EC] bg-[#FBFDFE] px-6 py-3 text-base font-black text-[#2E3A40] transition hover:border-[#4D9B7C] hover:bg-[#EAF5EF] hover:text-[#3A7A61]">
                  {ward}
                  <span className="ml-1 text-sm font-bold text-[#5A6B73]">{count}件</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="list" className="bg-[#EAF5EF] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="SEARCH" title="施設一覧" description="条件を組み合わせて、ご自身に合った施設を探せます。" />
          <RehabFacilitySearch />
        </div>
      </section>

      <section id="recruit" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="FOR FACILITIES" title="掲載希望の施設様へ" />
          <div className="mx-auto max-w-4xl rounded-[24px] bg-gradient-to-br from-[#EAF4F9] to-[#EAF5EF] px-6 py-10 sm:px-9">
            <p className="mx-auto max-w-3xl text-center text-base font-bold leading-8 text-[#2E3A40]">
              {siteName}では、理学療法士・作業療法士・言語聴覚士など国家資格者が在籍・監修する自費リハビリ、運動支援、コンディショニング施設の
              <strong>無料掲載</strong>を受け付けています。
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="rounded-[18px] bg-white p-6">
                <h3 className="text-lg font-black text-[#3A7A61]">掲載対象</h3>
                <ul className="mt-4 grid gap-2">
                  {recruitTargets.map((item) => (
                    <li key={item} className="relative pl-6 text-sm font-semibold leading-7 text-[#2E3A40] before:absolute before:left-0 before:text-[#4D9B7C] before:content-['✓']">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] bg-white p-6">
                <h3 className="text-lg font-black text-[#3A7A61]">掲載内容</h3>
                <ul className="mt-4 grid gap-2">
                  {recruitItems.map((item) => (
                    <li key={item} className="relative pl-6 text-sm font-semibold leading-7 text-[#2E3A40] before:absolute before:left-0 before:text-[#4D9B7C] before:content-['✓']">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a href="#recruit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3D7EA6] px-8 py-3 text-lg font-black text-white shadow-[0_6px_16px_rgba(61,126,166,.30)] hover:bg-[#2C5F80]">
                無料掲載を申し込む
              </a>
              <p className="mt-3 text-sm font-semibold text-[#5A6B73]">掲載は無料です。Googleフォーム公開後にリンクを差し替えます。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="notice" className="bg-[#FBFDFE] px-5 py-16">
        <div className="mx-auto max-w-4xl rounded-[18px] border border-[#D9E6EC] bg-white px-6 py-8">
          <h2 className="text-xl font-black text-[#2E3A40]">ご利用にあたっての注意事項</h2>
          <ul className="mt-4 grid gap-2">
            {[
              "掲載情報は、各施設からの情報または公開情報をもとに作成しています。",
              "サービス内容・料金・対応可否などの最新情報は、必ず各施設に直接ご確認ください。",
              "当サイトは、医療機関で行う判断や処置の代替を目的としたものではありません。",
              "症状が強い場合や医学的な判断が必要な場合は、医療機関にご相談ください。"
            ].map((item) => (
              <li key={item} className="relative pl-6 text-sm font-semibold leading-7 text-[#5A6B73] before:absolute before:left-0 before:text-[#3D7EA6] before:content-['※']">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="operator" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="OPERATOR" title="運営者情報" />
          <div className="mx-auto flex max-w-4xl flex-col gap-5 rounded-[18px] border border-[#D9E6EC] bg-[#FBFDFE] p-8 sm:flex-row">
            <div className="grid h-20 w-20 flex-none place-items-center rounded-[20px] bg-gradient-to-br from-[#4D9B7C] to-[#3D7EA6] text-xl font-black text-white">
              P
            </div>
            <div>
              <h3 className="text-xl font-black text-[#2E3A40]">リハビリジム プライズネス</h3>
              <p className="mt-1 text-sm font-bold text-[#5A6B73]">本サイト運営</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#2E3A40]">
                札幌市西区で理学療法士による運動支援・自費リハビリ・転倒予防・健康づくり支援を行っています。地域の方が安心して身体の専門職に相談できる環境づくりを目的に、本サイトを運営しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2C5F80] px-5 py-10 text-[#DCEAF2]">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-lg font-black text-white">{siteName}</p>
          <p className="mt-2 text-sm leading-6">理学療法士・作業療法士など国家資格者が関わる、札幌市内の自費リハビリ・運動支援施設の情報サイト</p>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-bold">
            <a href="#about">このサイトについて</a>
            <a href="#list">施設一覧</a>
            <a href="#recruit">掲載希望の施設様へ</a>
            <a href="#notice">注意事項</a>
            <a href="#operator">運営者情報</a>
          </div>
          <p className="mt-5 text-xs opacity-70">© 2026 札幌 自費リハビリナビ（運営：リハビリジム プライズネス）</p>
        </div>
      </footer>
    </main>
  );
}
