export default function Footer() {
  return (
    <footer className="bg-sora-deep py-10 text-sora-soft">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <section id="notice" aria-labelledby="notice-heading" className="mx-auto mb-8 max-w-3xl border-b border-white/30 pb-7 text-left">
          <h2 id="notice-heading" className="text-base font-bold text-white">ご利用にあたって</h2>
          <p className="mt-3 text-sm leading-loose">当サイトは、各施設の公式サイト等で公開されている情報をもとに、運営者が独自に編集した施設ガイドです。掲載は、各施設との提携・推薦関係を示すものではありません。掲載内容の修正・削除については、<a href="/contact#fix" className="underline underline-offset-4">お問い合わせください</a>。</p>
          <p className="mt-3 text-sm leading-loose">各サービスは医療機関での診断・治療の代わりではなく、掲載は効果やサービス品質を保証するものではありません。医学的な判断が必要な場合は医療機関にご相談ください。予約・料金・担当者については各施設へ直接お問い合わせください。</p>
        </section>
        <p className="font-display text-lg font-bold text-white">
          札幌 自費リハビリナビ
        </p>
        <p className="mt-1 text-sm opacity-85">
          リハビリ・運動施設の総合ガイド
        </p>
        <nav
          aria-label="フッターメニュー"
          className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm"
        >
          <a href="/#categories" className="hover:underline">
            探せる施設
          </a>
          <a href="/#purpose" className="hover:underline">
            目的別に探す
          </a>
          <a href="/#area" className="hover:underline">
            エリア別に探す
          </a>
          <a href="/#facilities" className="hover:underline">
            施設一覧
          </a>
        </nav>
        <nav
          aria-label="サイト情報"
          className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs opacity-75"
        >
          <a href="/contact" className="hover:underline">
            お問い合わせ
          </a>
          <a href="/contact#fix" className="hover:underline">
            掲載情報の修正・削除依頼
          </a>
          <a href="/#recruit" className="hover:underline">
            無料掲載について
          </a>
          <a href="/#notice" className="hover:underline">
            注意事項
          </a>
        </nav>
        <nav aria-label="読みものと運営情報" className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <a href="/blog" className="hover:underline">読みもの</a>
          <a href="/news" className="hover:underline">新着情報</a>
          <a href="/faq" className="hover:underline">よくある質問</a>
          <a href="/about" className="hover:underline">運営者・編集方針</a>
        </nav>
        <p className="mt-6 text-xs opacity-60">© 2026 札幌 自費リハビリナビ</p>
      </div>
    </footer>
  );
}
