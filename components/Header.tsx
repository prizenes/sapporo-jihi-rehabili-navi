export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="/#top" className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-sora to-wakaba text-lg text-white"
          >
            🍀
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-sora-deep sm:text-lg">
              札幌 自費リハビリナビ
            </span>
            <span className="hidden text-[11px] leading-tight text-ink-soft sm:block">
              身体の専門職が関わる施設さがし
            </span>
          </span>
        </a>
        <nav aria-label="メインメニュー" className="flex items-center gap-1">
          <a
            href="/#categories"
            className="hidden rounded-full px-3 py-2 text-sm font-medium hover:bg-sora-soft lg:block"
          >
            探せる施設
          </a>
          <a
            href="/#purpose"
            className="hidden rounded-full px-3 py-2 text-sm font-medium hover:bg-sora-soft lg:block"
          >
            目的別
          </a>
          <a
            href="/#area"
            className="hidden rounded-full px-3 py-2 text-sm font-medium hover:bg-sora-soft lg:block"
          >
            エリア別
          </a>
          <a
            href="/#facilities"
            className="shrink-0 whitespace-nowrap rounded-full bg-sora px-4 py-2 font-display text-sm font-bold text-white hover:bg-sora-deep"
          >
            施設を探す
          </a>
        </nav>
      </div>
      <nav aria-label="読みものとサイト情報" className="border-t border-line/60 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-1 px-4 py-2 text-sm font-medium text-sora-deep sm:px-6">
          <a href="/blog" className="py-1 hover:underline">読みもの</a>
          <a href="/news" className="py-1 hover:underline">新着情報</a>
          <a href="/faq" className="py-1 hover:underline">よくある質問</a>
          <a href="/about" className="py-1 hover:underline">運営・編集方針</a>
        </div>
      </nav>
    </header>
  );
}
