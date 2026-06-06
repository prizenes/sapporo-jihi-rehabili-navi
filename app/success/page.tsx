import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お申し込みありがとうございます",
  description: "オンライン運動サポートの決済完了ページです。"
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-mist px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Payment completed</p>
        <h1 className="mt-4 text-3xl font-black text-ink sm:text-4xl">お申し込みありがとうございます</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          Stripe決済が完了しました。確認後、Zoom URLと事前確認フォームをメールでお送りします。
        </p>
        <p className="mt-4 text-lg leading-8 text-ink/75">
          強い痛み、しびれ、麻痺、急な症状悪化、転倒後の痛みなどがある場合は、相談日を待たずに現地医療機関を受診してください。
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-ink">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
