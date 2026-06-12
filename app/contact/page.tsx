import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "お問い合わせ｜札幌 自費リハビリナビ",
  description:
    "札幌 自費リハビリナビへのお問い合わせ、掲載情報の修正・削除依頼、無料掲載のお申し込みはこちらから。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
          <h1 className="text-center font-display text-2xl font-bold sm:text-3xl">
            お問い合わせ
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-ink-soft">
            サイトに関するご質問、掲載情報の修正・削除依頼、無料掲載のお申し込みは、以下よりご連絡ください。
          </p>

          {/* 一般のお問い合わせ */}
          <section className="mt-10 rounded-2xl border border-line bg-white p-7 sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span aria-hidden="true">✉️</span>
              ご利用の方からのお問い合わせ
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              掲載内容に関するご質問などがありましたら、お気軽にご連絡ください。各施設のサービス内容・料金・予約については、お手数ですが各施設へ直接お問い合わせください。
            </p>
            {/*
              ▼ 連絡先はここを書き換えてください ▼
              ・Googleフォーム: href="https://forms.gle/xxxxx"
              ・メール:        href="mailto:info@example.com"
            */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8JcXETDke0A5TvUpif6Z6YkxY--TG6byphiYS2s50D9RTvw/viewform?usp=sharing&ouid=115747545040909322048"
              className="mt-5 inline-block rounded-full bg-sora px-7 py-3 font-display text-sm font-bold text-white transition hover:bg-sora-deep"
            >
              お問い合わせフォームへ
            </a>
          </section>

          {/* 掲載情報の修正・削除依頼 */}
          <section
            id="fix"
            className="mt-6 rounded-2xl border border-line bg-white p-7 sm:p-8"
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span aria-hidden="true">📝</span>
              掲載情報の修正・削除をご希望の施設様へ
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              掲載内容の修正、削除、無料掲載のご希望がある場合は、お問い合わせフォームよりご連絡ください。内容を確認のうえ、すみやかに対応いたします。掲載内容に変更がある場合もお知らせください。
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSea313vMagsEOigcMRXrLZ6Gl1yP-SmC3wP9bLxDl044DGQlQ/viewform?usp=sharing&ouid=115747545040909322048"
              className="mt-5 inline-block rounded-full border-2 border-sora px-7 py-3 font-display text-sm font-bold text-sora transition hover:bg-sora-soft"
            >
              掲載情報の修正・削除を依頼する
            </a>
          </section>

          {/* 無料掲載 */}
          <section className="mt-6 rounded-2xl border border-line bg-white p-7 sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span aria-hidden="true">🆓</span>
              無料掲載について
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              理学療法士・作業療法士・言語聴覚士など、身体の専門職が関わる自費リハビリ・整体・ピラティス・ジム・運動支援施設の情報掲載を無料で受け付けています。詳しくはトップページの案内をご覧ください。
            </p>
            <a
              href="/#recruit"
              className="mt-5 inline-block rounded-full border-2 border-wakaba px-7 py-3 font-display text-sm font-bold text-wakaba-deep transition hover:bg-wakaba-soft"
            >
              無料掲載の案内を見る
            </a>
          </section>

          {/* 注意事項・運営者情報 */}
          <section className="mt-6 rounded-2xl border border-line bg-white p-7 sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <span aria-hidden="true">ℹ️</span>
              注意事項
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              掲載情報は、各施設の公式サイトなどの公開情報、または施設から提供された情報をもとに作成しています。サービス内容、料金、対応可否などの最新情報は、必ず各施設へ直接ご確認ください。当サイトは医療機関の紹介、診断、治療の代替を目的としたものではありません。症状が強い場合や医学的な判断が必要な場合は、医療機関へご相談ください。
            </p>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-soft">
              サイト運営：リハビリジム プライズネス（札幌市西区）。運営者の関連施設も、他の施設と同じ基準・同じ形式で掲載しています。掲載順はエリア順・五十音順であり、運営者による優先表示は行っていません。
            </p>
          </section>

          <p className="mt-8 text-center">
            <a
              href="/"
              className="text-sm font-medium text-sora underline-offset-2 hover:underline"
            >
              ← トップページへ戻る
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
