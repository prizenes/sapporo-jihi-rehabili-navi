import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-white">
      <Image
        src="/images/movement.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-20"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-white/70" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm font-bold text-wakaba-deep">
          リハビリ・運動施設の総合ガイド
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[26px] font-bold leading-relaxed sm:text-4xl sm:leading-relaxed">
          <span className="block">札幌で、あなたに合う</span>
          <span className="block">リハビリ・運動施設を。</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-loose sm:text-lg">
          退院後の運動から、足腰の体力づくり、姿勢改善、スポーツまで。札幌の自費リハビリ・運動支援施設を、目的・地域・サービスから探せます。
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-loose text-ink-soft">
          ご本人にも、ご家族にも。理学療法士などの専門スタッフのサポートをご紹介。直接の指導と、プログラムの監修・作成は分けてご案内します。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="#purpose"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sora-deep px-5 py-3 font-bold text-white hover:bg-sora"
          >
            目的から探す
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#area"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-wakaba-deep bg-white px-5 py-3 font-bold text-wakaba-deep hover:bg-wakaba-soft"
          >
            <MapPin size={18} aria-hidden="true" />
            地域から探す
          </a>
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          背景写真は運動のイメージです。掲載施設の写真ではありません。
        </p>
      </div>
    </section>
  );
}
