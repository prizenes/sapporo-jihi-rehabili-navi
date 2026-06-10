const notices = [
  "掲載情報は、各施設からの情報または公開情報をもとに作成しています。",
  "サービス内容・料金・対応可否などの最新情報は、必ず各施設に直接ご確認ください。",
  "当サイトは、医療機関の紹介・診断・治療の代替を目的としたものではありません。",
  "症状が強い場合や医学的な判断が必要な場合は、医療機関にご相談ください。",
];

export default function NoticeSection() {
  return (
    <section id="notice" className="bg-paper py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-2xl border border-line bg-white p-7 sm:p-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
            <span aria-hidden="true">ℹ️</span>
            ご利用にあたっての注意事項
          </h2>
          <ul className="space-y-2">
            {notices.map((n) => (
              <li key={n} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="flex-none text-sora">
                  ※
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
