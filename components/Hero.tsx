const heroChips = [
  { icon: "📍", label: "札幌市内" },
  { icon: "🪪", label: "国家資格者が関わる施設" },
  { icon: "🗺", label: "エリア別でさがせる" },
  { icon: "🎯", label: "目的別でさがせる" },
  { icon: "🆓", label: "無料掲載受付中" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* やわらかい背景のにじみ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sora-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-wakaba-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/3 h-56 w-56 rounded-full bg-kinari-soft blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-20">
        {/* 左：コピーとCTA */}
        <div className="text-center lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-wakaba bg-white px-4 py-1.5 text-sm font-bold text-wakaba-deep">
            🍀 札幌の地域案内サイト
          </p>
          <h1 className="font-display text-[1.85rem] font-bold leading-snug sm:text-4xl lg:text-[2.6rem] lg:leading-[1.4]">
            札幌で、
            <span className="bg-gradient-to-t from-wakaba-soft from-40% to-transparent to-40%">
              身体の専門職
            </span>
            に<br className="hidden sm:block" />
            相談できる場所を探す
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink sm:text-lg lg:mx-0">
            理学療法士・作業療法士など国家資格者が関わる、自費リハビリ・整体・ピラティス・ジム・運動支援施設を目的やエリアから探せます。
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#facilities"
              className="w-full rounded-full bg-sora px-9 py-4 text-center font-display text-lg font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sora-deep sm:w-auto"
            >
              施設を探す
            </a>
            <a
              href="#recruit"
              className="w-full rounded-full border-2 border-wakaba bg-white px-8 py-[14px] text-center font-display text-base font-bold text-wakaba-deep transition hover:-translate-y-0.5 hover:bg-wakaba-soft sm:w-auto"
            >
              無料掲載を希望する施設様へ
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink-soft lg:mx-0">
            病院リハビリ後の運動継続、転倒予防、膝・腰の不安、脳卒中後の自費リハビリ、姿勢改善、スポーツのコンディショニングなど、目的に合った相談先を見つけるための情報サイトです。
          </p>
        </div>

        {/* 右：検索カード風ビジュアル */}
        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-sm sm:block">
          <div className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft backdrop-blur">
            <p className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-sora-deep">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sora-soft">🔍</span>
              さがす条件のイメージ
            </p>
            <div className="space-y-2.5">
              {heroChips.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-[15px] font-medium"
                >
                  <span className="text-lg">{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </div>
          {/* 重ねた小カード */}
          <div className="absolute -right-4 -top-5 rotate-3 rounded-2xl bg-wakaba px-4 py-2 font-display text-sm font-bold text-white shadow-card">
            目的別 ✓
          </div>
          <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-kinari px-4 py-2 font-display text-sm font-bold text-kinari-deep shadow-card">
            札幌市10区に対応
          </div>
        </div>
      </div>
    </section>
  );
}
