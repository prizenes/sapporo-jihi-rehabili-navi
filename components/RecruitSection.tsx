const targets = [
  { icon: "🤲", label: "理学療法士が関わる整体・コンディショニング" },
  { icon: "🍳", label: "作業療法士による生活動作支援" },
  { icon: "🧘", label: "理学療法士監修のピラティス・ジム" },
  { icon: "🚪", label: "訪問型の自費運動支援" },
  { icon: "🧠", label: "脳卒中後の自費リハビリ" },
  { icon: "🏢", label: "企業向け健康経営サポート" },
];

export default function RecruitSection() {
  return (
    <section id="recruit" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-wakaba-soft via-sora-soft to-kinari-soft p-7 sm:p-12">
          <div className="text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-1.5 font-display text-sm font-bold text-wakaba-deep shadow-card">
              🆓 掲載は無料です
            </p>
            <h2 className="font-display text-2xl font-bold leading-snug sm:text-3xl">
              国家資格者が関わる施設の
              <br className="sm:hidden" />
              無料掲載を受付中です
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink">
              札幌 自費リハビリナビでは、理学療法士・作業療法士・言語聴覚士など身体の専門職が関わる自費リハビリ、整体、ピラティス、ジム、運動支援施設の情報掲載を受け付けています。掲載は無料です。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {targets.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3.5 text-[15px] font-medium shadow-card"
              >
                <span aria-hidden="true" className="text-xl">
                  {t.icon}
                </span>
                {t.label}
              </div>
            ))}
          </div>

          <div className="mt-9 text-center">
            {/*
              ▼ 申し込み導線はここを書き換えてください ▼
              ・Googleフォーム: href="https://forms.gle/xxxxx"
              ・メール:        href="mailto:info@example.com?subject=無料掲載の申し込み"
            */}
            <a
              href="mailto:mail@prizenes.com?subject=無料掲載の申し込み（札幌 自費リハビリナビ）"
              className="inline-block rounded-full bg-wakaba px-10 py-4 font-display text-lg font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-wakaba-deep"
            >
              無料掲載を申し込む
            </a>
            <p className="mt-3 text-sm text-ink-soft">
              内容を確認のうえ、順次掲載いたします。掲載内容の修正・削除もいつでもご相談いただけます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
