import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "決済がキャンセルされました",
  description: "オンライン運動サポートの決済キャンセルページです。"
};

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-paper px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-md bg-white p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-coral">Payment canceled</p>
        <h1 className="mt-4 text-3xl font-black text-ink sm:text-4xl">決済がキャンセルされました</h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          お申し込みはまだ完了していません。内容を確認して、もう一度申込フォームから決済へお進みください。
        </p>
        <Link href="/#apply" className="mt-8 inline-flex rounded-md bg-sea px-6 py-3 font-bold text-white hover:bg-ink">
          申込フォームへ戻る
        </Link>
      </div>
    </main>
  );
}
