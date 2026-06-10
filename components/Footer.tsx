export default function Footer() {
  return (
    <footer className="bg-sora-deep py-10 text-sora-soft">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-display text-lg font-bold text-white">
          札幌 自費リハビリナビ
        </p>
        <p className="mt-1 text-sm opacity-85">
          理学療法士・作業療法士が関わる整体・ピラティス・ジム・運動支援施設検索
        </p>
        <nav
          aria-label="フッターメニュー"
          className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm"
        >
          <a href="#categories" className="hover:underline">
            探せる施設
          </a>
          <a href="#purpose" className="hover:underline">
            目的別に探す
          </a>
          <a href="#area" className="hover:underline">
            エリア別に探す
          </a>
          <a href="#facilities" className="hover:underline">
            施設一覧
          </a>
          <a href="#recruit" className="hover:underline">
            無料掲載について
          </a>
          <a href="#notice" className="hover:underline">
            注意事項
          </a>
          <a href="#operator" className="hover:underline">
            運営者情報
          </a>
        </nav>
        <p className="mt-6 text-xs opacity-60">
          © 2026 札幌 自費リハビリナビ（運営：リハビリジム プライズネス）
        </p>
      </div>
    </footer>
  );
}
