import { ArrowUpRight } from "lucide-react";

export default function RecruitSection() {
  return (
    <section
      id="recruit"
      className="border-t border-line bg-wakaba-soft py-10 sm:py-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold">
            施設を運営されている方へ
          </h2>
          <p className="mt-4 text-base leading-loose">
            札幌の自費リハビリ・運動支援の相談先を、地域の皆さまへ。施設の特徴、スタッフのサポート内容、料金などの無料掲載を受け付けています。
          </p>
          <a
            href="/contact#fix"
            className="mt-3 inline-block min-h-11 py-2 text-sm text-sora-deep underline underline-offset-4"
          >
            掲載情報の修正・削除をご希望の方はこちら
          </a>
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfIAWPbtHTRThPm2jBwK_4tMikH6F3DZC04GfOPF60UyBdc1w/viewform?usp=sharing&ouid=115747545040909322048"
          className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-wakaba-deep px-6 py-3 text-base font-bold text-white hover:bg-sora-deep"
        >
          無料掲載を申し込む
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
