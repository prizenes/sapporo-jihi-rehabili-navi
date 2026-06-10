export default function OperatorSection() {
  return (
    <section id="operator" className="bg-white py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-3 inline-block rounded-full bg-sora-soft px-4 py-1 text-xs font-bold tracking-widest text-sora-deep">
            OPERATOR
          </p>
          <h2 className="font-display text-2xl font-bold">運営者情報</h2>
        </div>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-line bg-paper p-7 sm:flex-row sm:p-8">
          <div
            aria-hidden="true"
            className="grid h-16 w-16 flex-none place-items-center rounded-2xl bg-gradient-to-br from-wakaba to-sora text-3xl text-white"
          >
            🌿
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">
              リハビリジム プライズネス
            </h3>
            <p className="mb-2 text-sm text-ink-soft">本サイト運営</p>
            <p className="text-[15px] leading-relaxed">
              札幌市西区で理学療法士による運動支援・自費リハビリ・転倒予防・健康づくり支援を行っています。地域の方が安心して身体の専門職に相談できる環境づくりを目的に、本サイトを運営しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
